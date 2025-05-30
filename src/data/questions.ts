type Question = {
  text: string;
  options: {
    text: string;
    scores: { [mood: string]: number };
  }[];
};

type MoodResult = {
  mood: string;
  score: number;
};

type MoodThreshold = {
  mood: string;
  minScore: number;
  description: string;
};

// Define your quiz questions
const questions: Question[] = [
  {
    text: "How do you feel when you wake up?",
    options: [
      { text: "Excited and ready to go!", scores: { Energetic: 2, Confident: 1 } },
      { text: "Calm and at peace", scores: { Chill: 2 } },
      { text: "Tired and unmotivated", scores: { Low: 2 } },
    ],
  },
  {
    text: "How do you spend your lunch break?",
    options: [
      { text: "Chatting with friends", scores: { Social: 2 } },
      { text: "Going for a walk alone", scores: { Chill: 1, Reflective: 1 } },
      { text: "Working through lunch", scores: { Focused: 2 } },
    ],
  },
  {
    text: "How's your energy level right now?",
    options: [
      { text: "I'm bouncing off the walls!", scores: { Energetic: 2 } },
      { text: "I'm calm and steady", scores: { Chill: 2 } },
      { text: "I'm dragging my feet", scores: { Low: 2 } },
    ],
  },
  {
    text: "What sounds most appealing right now?",
    options: [
      { text: "A solo adventure", scores: { Independent: 2 } },
      { text: "Hanging out with close friends", scores: { Social: 2 } },
      { text: "Curling up with a good book", scores: { Reflective: 2 } },
    ],
  },
];

// Define mood thresholds and descriptions
const moodThresholds: MoodThreshold[] = [
  {
    mood: "Chill",
    minScore: 4,
    description: "You're feeling relaxed and laid-back today. Time to go with the flow 🌊",
  },
  {
    mood: "Energetic",
    minScore: 4,
    description: "You're buzzing with energy! It's a great day to be productive 💪",
  },
  {
    mood: "Low",
    minScore: 4,
    description: "You're feeling a bit low. Be gentle with yourself today 💙",
  },
  {
    mood: "Social",
    minScore: 4,
    description: "You're craving connection and fun with others 🤝",
  },
  {
    mood: "Reflective",
    minScore: 4,
    description: "You're in a thoughtful mood, perfect for journaling or deep convos 📓",
  },
  {
    mood: "Focused",
    minScore: 4,
    description: "You're dialed in and ready to tackle your tasks 🎯",
  },
  {
    mood: "Independent",
    minScore: 4,
    description: "You're in your own lane and loving it 🛣️",
  },
  {
    mood: "Confident",
    minScore: 3,
    description: "You're radiating confidence. Nothing can stop you 🔥",
  },
];

// Calculate scores from user answers
function calculateScores(answers: number[]): { [mood: string]: number } {
  const scores: { [mood: string]: number } = {};

  answers.forEach((answerIndex, questionIndex) => {
    const selectedOption = questions[questionIndex].options[answerIndex];
    for (const [mood, score] of Object.entries(selectedOption.scores)) {
      scores[mood] = (scores[mood] || 0) + score;
    }
  });

  return scores;
}

// Get top 3 moods by score
function getTopMoods(scoreMap: { [mood: string]: number }): MoodResult[] {
  return Object.entries(scoreMap)
    .map(([mood, score]) => ({ mood, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

// Get moods that pass threshold
function getThresholdMoods(scoreMap: { [mood: string]: number }): MoodThreshold[] {
  return moodThresholds.filter(threshold => {
    return scoreMap[threshold.mood] >= threshold.minScore;
  });
}

// Run quiz logic
function runQuiz(answers: number[]) {
  const scores = calculateScores(answers);
  const topMoods = getTopMoods(scores);
  const passingMoods = getThresholdMoods(scores);

  console.log("💡 Your top moods:");
  topMoods.forEach(result => {
    console.log(`- ${result.mood}: ${result.score}`);
  });

  console.log("\n🧠 Mood interpretations:");
  passingMoods.forEach(threshold => {
    console.log(`- ${threshold.mood}: ${threshold.description}`);
  });

  if (passingMoods.length === 0) {
    console.log("🤔 No strong mood detected. Maybe take the quiz again with fresh vibes.");
  }
}

// === Example usage ===
// User's answer choices (index of selected option for each question)
const sampleAnswers = [0, 1, 0, 2]; // adjust based on user input
runQuiz(sampleAnswers);
