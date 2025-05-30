import type { NextApiRequest, NextApiResponse } from 'next';
import { Quiz } from '@/types/quiz';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt: userPrompt } = req.body; // Renamed to avoid conflict

  if (!userPrompt) {
    return res.status(400).json({ message: 'Missing prompt' });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    console.error('OpenAI API Key not configured.');
    return res.status(500).json({ message: 'Server configuration error: OpenAI API key not set.' });
  }

  const aiPrompt = `
You are a quiz generator. Create a short quiz based on the following topic: ${userPrompt}.

The quiz should have exactly 3 questions.
Each question should have at least 3 multiple-choice options.
Each option should have an 'id', 'text', 'value' (integer score, higher for more intense mood/vibe), 'vibe' (string, e.g., 'energetic', 'calm'), and 'mood' (one of: 'happy', 'calm', 'energetic', 'focused', 'creative', 'relaxed', 'stressed', 'tired').
Provide the output as a JSON object that matches the TypeScript interface 'Quiz':
{
  id: string; // unique id for the quiz, lowercase, hyphenated (e.g., 'my-awesome-quiz')
  title: string; // title of the quiz
  description: string; // short description
  questions: Array<{
    id: string; // unique id for the question, lowercase (e.g., 'q1')
    text: string; // question text
    category: string; // category (e.g., 'mood', 'personality', 'preference')
    options: Array<{
      id: string; // unique id for the option, lowercase (e.g., 'q1a1')
      text: string; // option text
      value: number; // integer value for scoring (e.g., 1-5)
      vibe: string; // vibe label
      mood: string; // mood label (must be one of the specified Mood types)
    }>;
  }>;
  moodThresholds: { // Thresholds for mood calculation (sum of option values for a mood) - provide reasonable estimates
    happy: number;
    calm: number;
    energetic: number;
    focused: number;
    creative: number;
    relaxed: number;
    stressed: number;
    tired: number;
  };
  icon?: string; // Optional emoji icon relevant to the quiz topic
  image?: string; // Optional placeholder image URL (use a generic one like '/images/default-quiz.jpg')
}

Ensure the response is valid JSON and contains only the JSON object. Do not include any other text or markdown.
`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Or 'gpt-4' if you have access and prefer
        messages: [{ role: 'user', content: aiPrompt }],
        response_format: { type: "json_object" }, // Request JSON object output
        max_tokens: 800, // Adjust as needed for quiz complexity
        temperature: 0.7, // Adjust for creativity (0.7 is balanced)
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`OpenAI API Error: ${response.status} - ${errorBody}`);
      return res.status(response.status).json({ message: `OpenAI API error: ${response.status}` });
    }

    const data = await response.json();

    // Extract and parse the JSON from the response content
    // The AI should return a JSON object directly with response_format, but sometimes needs cleanup
    const responseContent = data.choices?.[0]?.message?.content;

    if (!responseContent) {
        console.error('OpenAI response content was empty.');
        return res.status(500).json({ message: 'Failed to get quiz data from AI.' });
    }

    try {
        const generatedQuiz: Quiz = JSON.parse(responseContent);
        // Basic validation (optional but recommended)
        if (!generatedQuiz.id || !generatedQuiz.title || !generatedQuiz.questions || generatedQuiz.questions.length === 0) {
             throw new Error('Invalid quiz structure from AI');
        }
        // Assign a unique ID if AI didn't provide one, or ensure uniqueness
        generatedQuiz.id = generatedQuiz.id.toLowerCase().replace(/\s+/g, '-');
         if (!generatedQuiz.icon) generatedQuiz.icon = '❓'; // Default icon
         if (!generatedQuiz.image) generatedQuiz.image = '/images/default-quiz.jpg'; // Default image

        res.status(200).json({ quiz: generatedQuiz });

    } catch (parseError) {
        console.error('Failed to parse AI response as JSON:', parseError, 'Content:', responseContent);
        return res.status(500).json({ message: 'Failed to parse AI response.' });
    }


  } catch (error) {
    console.error('Error generating quiz:', error);
    res.status(500).json({ message: 'Failed to generate quiz.' });
  }
} 