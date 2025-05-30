import type { NextApiRequest, NextApiResponse } from 'next';
import { quizzes } from '@/data/quizzes'; // Import quizzes data

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API route /api/ai-mood called');
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).end();
  }

  const { quizTitle, answers } = req.body;
  console.log('Received data:', { quizTitle, answers });

  // Find the quiz data
  const quiz = quizzes.find(q => q.title === quizTitle);

  if (!quiz) {
    console.error('Quiz not found:', quizTitle);
    return res.status(404).json({ message: 'Quiz not found' });
  }

  // Calculate mood scores based on answers
  const moodScores: { [key: string]: number } = {};

  for (const answer of answers) {
    const question = quiz.questions.find(q => q.id === answer.questionId);
    if (question) {
      const option = question.options.find(o => o.id === answer.optionId);
      if (option && option.mood) {
        if (moodScores[option.mood]) {
          moodScores[option.mood] += option.value || 0;
        } else {
          moodScores[option.mood] = option.value || 0;
        }
      }
    }
  }

  console.log('Calculated mood scores:', moodScores);

  // Determine the dominant mood based on thresholds
  let detectedMood = 'neutral'; // Default mood
  let highestScore = 0;

  for (const mood in moodScores) {
    if (moodScores[mood] > (quiz.moodThresholds[mood] || 0) && moodScores[mood] > highestScore) {
      highestScore = moodScores[mood];
      detectedMood = mood;
    }
  }

  // If no mood crossed its threshold, check for the highest score regardless of threshold
   if (detectedMood === 'neutral' && Object.keys(moodScores).length > 0) {
    let maxScore = -1;
    let potentialMood = 'neutral';
     for (const mood in moodScores) {
      if (moodScores[mood] > maxScore) {
        maxScore = moodScores[mood];
        potentialMood = mood;
      }
    }
    detectedMood = potentialMood;
  }

  console.log('Detected Mood:', detectedMood);

  // Return the detected mood
  res.status(200).json({ mood: detectedMood });
} 