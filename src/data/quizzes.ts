import { Quiz } from '@/types/quiz';

export const quizzes: Quiz[] = [
  {
    id: 'daily-vibe',
    title: 'Daily Vibe Check',
    description: 'How are you feeling today? Let\'s check your current vibe!',
    icon: '🌞',
    image: '/images/daily-vibe.jpg',
    questions: [
      {
        id: 'q1',
        text: 'How did you sleep last night?',
        category: 'mood',
        options: [
          {
            id: 'q1a1',
            text: 'Great! I feel well-rested',
            value: 5,
            vibe: 'energetic',
            mood: 'energetic'
          },
          {
            id: 'q1a2',
            text: 'Okay, but could be better',
            value: 3,
            vibe: 'calm',
            mood: 'calm'
          },
          {
            id: 'q1a3',
            text: 'Not great, feeling tired',
            value: 1,
            vibe: 'calm',
            mood: 'tired'
          }
        ]
      },
      {
        id: 'q2',
        text: 'What\'s your energy level right now?',
        category: 'mood',
        options: [
          {
            id: 'q2a1',
            text: 'Full of energy!',
            value: 5,
            vibe: 'energetic',
            mood: 'energetic'
          },
          {
            id: 'q2a2',
            text: 'Moderate, feeling balanced',
            value: 3,
            vibe: 'calm',
            mood: 'calm'
          },
          {
            id: 'q2a3',
            text: 'Low, need a boost',
            value: 1,
            vibe: 'calm',
            mood: 'tired'
          }
        ]
      },
      {
        id: 'q3',
        text: 'How are you approaching your tasks for the day?',
        category: 'mood',
        options: [
          {
            id: 'q3a1',
            text: 'Enthusiastic and ready to go!',
            value: 5,
            vibe: 'energetic',
            mood: 'energetic'
          },
          {
            id: 'q3a2',
            text: 'Steady and focused',
            value: 4,
            vibe: 'focused',
            mood: 'focused'
          },
          {
            id: 'q3a3',
            text: 'Taking it slow and relaxed',
            value: 2,
            vibe: 'calm',
            mood: 'relaxed'
          },
          {
            id: 'q3a4',
            text: 'Feeling overwhelmed',
            value: 1,
            vibe: 'calm',
            mood: 'stressed'
          }
        ]
      }
    ],
    moodThresholds: {
      happy: 5,
      calm: 8,
      energetic: 15,
      focused: 4,
      creative: 0,
      relaxed: 2,
      stressed: 1,
      tired: 2
    }
  },
  {
    id: 'work-vibe',
    title: 'Work Vibe Check',
    description: 'Let\'s check your work mood and productivity level!',
    icon: '💼',
    image: '/images/work-vibe.jpg',
    questions: [
      {
        id: 'q1',
        text: 'How focused do you feel at work?',
        category: 'mood',
        options: [
          {
            id: 'q1a1',
            text: 'Very focused and productive',
            value: 5,
            vibe: 'analytical',
            mood: 'focused'
          },
          {
            id: 'q1a2',
            text: 'Somewhat focused',
            value: 3,
            vibe: 'analytical',
            mood: 'calm'
          },
          {
            id: 'q1a3',
            text: 'Having trouble concentrating',
            value: 1,
            vibe: 'calm',
            mood: 'stressed'
          }
        ]
      },
      {
        id: 'q2',
        text: 'How creative do you feel?',
        category: 'mood',
        options: [
          {
            id: 'q2a1',
            text: 'Full of creative ideas!',
            value: 5,
            vibe: 'creative',
            mood: 'creative'
          },
          {
            id: 'q2a2',
            text: 'Somewhat creative',
            value: 3,
            vibe: 'creative',
            mood: 'calm'
          },
          {
            id: 'q2a3',
            text: 'Not feeling very creative',
            value: 1,
            vibe: 'calm',
            mood: 'tired'
          }
        ]
      },
      {
        id: 'q3',
        text: 'How do you handle workplace challenges?',
        category: 'mood',
        options: [
          {
            id: 'q3a1',
            text: 'Analyze them logically and find solutions',
            value: 5,
            vibe: 'analytical',
            mood: 'focused'
          },
          {
            id: 'q3a2',
            text: 'Collaborate with colleagues to brainstorm ideas',
            value: 4,
            vibe: 'social',
            mood: 'happy'
          },
          {
            id: 'q3a3',
            text: 'Take a break and come back with a fresh perspective',
            value: 2,
            vibe: 'calm',
            mood: 'relaxed'
          },
          {
            id: 'q3a4',
            text: 'Feel stressed and overwhelmed',
            value: 1,
            vibe: 'calm',
            mood: 'stressed'
          }
        ]
      }
    ],
    moodThresholds: {
      happy: 4,
      calm: 6,
      energetic: 0,
      focused: 10,
      creative: 8,
      relaxed: 2,
      stressed: 2,
      tired: 1
    }
  },
  {
    id: 'social-vibe',
    title: 'Social Vibe Check',
    description: 'How are you feeling in social situations?',
    icon: '🧑‍🤝‍🧑',
    image: '/images/social-vibe.jpg',
    questions: [
      {
        id: 'q1',
        text: 'How do you feel about social interactions?',
        category: 'personality',
        options: [
          {
            id: 'q1a1',
            text: 'Excited to meet new people!',
            value: 5,
            vibe: 'social',
            mood: 'energetic'
          },
          {
            id: 'q1a2',
            text: 'Comfortable with familiar faces',
            value: 3,
            vibe: 'social',
            mood: 'calm'
          },
          {
            id: 'q1a3',
            text: 'Prefer smaller groups',
            value: 2,
            vibe: 'introspective',
            mood: 'relaxed'
          }
        ]
      },
      {
        id: 'q2',
        text: 'How do you feel in group settings?',
        category: 'personality',
        options: [
          {
            id: 'q2a1',
            text: 'Love being the center of attention',
            value: 5,
            vibe: 'social',
            mood: 'energetic'
          },
          {
            id: 'q2a2',
            text: 'Enjoy participating in discussions',
            value: 3,
            vibe: 'social',
            mood: 'happy'
          },
          {
            id: 'q2a3',
            text: 'Prefer listening to others',
            value: 2,
            vibe: 'introspective',
            mood: 'calm'
          }
        ]
      },
      {
        id: 'q3',
        text: 'How do you typically recharge after social events?',
        category: 'personality',
        options: [
          {
            id: 'q3a1',
            text: 'Energized and ready for more!',
            value: 5,
            vibe: 'energetic',
            mood: 'energetic'
          },
          {
            id: 'q3a2',
            text: 'Relaxing alone or with close friends',
            value: 3,
            vibe: 'introspective',
            mood: 'relaxed'
          },
          {
            id: 'q3a3',
            text: 'Reading or engaging in a quiet hobby',
            value: 2,
            vibe: 'introspective',
            mood: 'calm'
          },
          {
            id: 'q3a4',
            text: 'Feeling drained and needing significant alone time',
            value: 1,
            vibe: 'calm',
            mood: 'tired'
          }
        ]
      }
    ],
    moodThresholds: {
      happy: 3,
      calm: 7,
      energetic: 15,
      focused: 0,
      creative: 0,
      relaxed: 5,
      stressed: 0,
      tired: 1
    }
  },
  {
    id: 'general-vibe',
    title: 'General Vibe Check',
    description: 'A quick check of your overall mood and feelings.',
    icon: '✨',
    image: '/images/general-vibe.jpg',
    questions: [
      {
        id: 'q4',
        text: "What's the first thing you do when you wake up?",
        category: 'mood',
        options: [
          { id: 'q4a1', text: 'Check my phone', value: 2, vibe: 'calm', mood: 'neutral' },
          { id: 'q4a2', text: 'Meditate or stretch', value: 4, vibe: 'calm', mood: 'relaxed' },
          { id: 'q4a3', text: 'Hit snooze 3 times', value: 1, vibe: 'calm', mood: 'tired' },
          { id: 'q4a4', text: 'Coffee. Immediately.', value: 3, vibe: 'energetic', mood: 'tired' }
        ]
      },
      {
        id: 'q5',
        text: 'Pick a weather forecast that fits your mood today:',
        category: 'mood',
        options: [
          { id: 'q5a1', text: 'Sunny and bright ☀️', value: 5, vibe: 'energetic', mood: 'happy' },
          { id: 'q5a2', text: 'Cloudy with a chance of overthinking ☁️', value: 2, vibe: 'calm', mood: 'stressed' },
          { id: 'q5a3', text: 'Stormy and dramatic ⛈️', value: 1, vibe: 'intense', mood: 'stressed' },
          { id: 'q5a4', text: 'Calm and breezy 🌬️', value: 4, vibe: 'calm', mood: 'relaxed' }
        ]
      },
      {
        id: 'q6',
        text: "How's your energy level right now?",
        category: 'mood',
        options: [
          { id: 'q6a1', text: 'On fire 🔥', value: 5, vibe: 'energetic', mood: 'energetic' },
          { id: 'q6a2', text: 'Meh 😐', value: 2, vibe: 'calm', mood: 'neutral' },
          { id: 'q6a3', text: 'Totally drained 😩', value: 1, vibe: 'calm', mood: 'tired' },
          { id: 'q6a4', text: 'Chill and relaxed 🧘', value: 4, vibe: 'calm', mood: 'relaxed' }
        ]
      },
      {
        id: 'q7',
        text: 'Choose a comfort activity:',
        category: 'mood',
        options: [
          { id: 'q7a1', text: 'Binge-watching my favorite show', value: 2, vibe: 'introspective', mood: 'relaxed' },
          { id: 'q7a2', text: 'Taking a walk alone', value: 4, vibe: 'introspective', mood: 'calm' },
          { id: 'q7a3', text: 'Dancing in my room', value: 5, vibe: 'energetic', mood: 'happy' },
          { id: 'q7a4', text: 'Venting to my best friend', value: 3, vibe: 'social', mood: 'stressed' }
        ]
      },
      {
        id: 'q8',
        text: 'If your mood were a color, what would it be?',
        category: 'mood',
        options: [
          { id: 'q8a1', text: 'Bright yellow', value: 5, vibe: 'energetic', mood: 'happy' },
          { id: 'q8a2', text: 'Deep blue', value: 2, vibe: 'calm', mood: 'calm' },
          { id: 'q8a3', text: 'Fiery red', value: 4, vibe: 'intense', mood: 'energetic' },
          { id: 'q8a4', text: 'Soft lavender', value: 3, vibe: 'calm', mood: 'relaxed' }
        ]
      },
      {
        id: 'q9',
        text: "How social do you feel today?",
        category: 'mood',
        options: [
          { id: 'q9a1', text: "Let's party 🎉", value: 5, vibe: 'social', mood: 'energetic' },
          { id: 'q9a2', text: 'Small talk is fine', value: 3, vibe: 'social', mood: 'calm' },
          { id: 'q9a3', text: 'Leave me alone 🙃', value: 1, vibe: 'introspective', mood: 'introverted' },
          { id: 'q9a4', text: 'One-on-one convos only', value: 2, vibe: 'social', mood: 'calm' }
        ]
      },
      {
        id: 'q10',
        text: 'Which meme best matches your vibe right now?',
        category: 'mood',
        options: [
          { id: 'q10a1', text: '"This is fine" dog 🐶🔥', value: 1, vibe: 'intense', mood: 'stressed' },
          { id: 'q10a2', text: 'SpongeBob imagination 🌈', value: 5, vibe: 'creative', mood: 'happy' },
          { id: 'q10a3', text: 'Sad cat 😿', value: 2, vibe: 'calm', mood: 'sad' },
          { id: 'q10a4', text: 'Shrek dancing 🕺', value: 4, vibe: 'energetic', mood: 'energetic' }
        ]
      },
      {
        id: 'q11',
        text: 'How do you feel about the future today?',
        category: 'mood',
        options: [
          { id: 'q11a1', text: 'Super hopeful 💫', value: 5, vibe: 'energetic', mood: 'happy' },
          { id: 'q11a2', text: 'Uncertain but open 🤷‍♀️', value: 3, vibe: 'calm', mood: 'neutral' },
          { id: 'q11a3', text: 'Dreading it 😅', value: 1, vibe: 'calm', mood: 'stressed' },
          { id: 'q11a4', text: 'Living in the moment 🌀', value: 4, vibe: 'calm', mood: 'relaxed' }
        ]
      },
      {
        id: 'q12',
        text: "Which song title feels right today?",
        category: 'mood',
        options: [
          { id: 'q12a1', text: "Happy – Pharrell", value: 5, vibe: 'energetic', mood: 'happy' },
          { id: 'q12a2', text: "Stressed Out – Twenty One Pilots", value: 1, vibe: 'intense', mood: 'stressed' },
          { id: 'q12a3', text: "good 4 u – Olivia Rodrigo", value: 3, vibe: 'intense', mood: 'energetic' },
          { id: 'q12a4', text: "Let It Be – The Beatles", value: 4, vibe: 'calm', mood: 'relaxed' }
        ]
      },
      {
        id: 'q13',
        text: "You open a fortune cookie. What's inside?",
        category: 'mood',
        options: [
          { id: 'q13a1', text: "Adventure awaits.", value: 5, vibe: 'energetic', mood: 'happy' },
          { id: 'q13a2', text: "You need a nap.", value: 1, vibe: 'calm', mood: 'tired' },
          { id: 'q13a3', text: "Big feelings incoming.", value: 3, vibe: 'intense', mood: 'stressed' },
          { id: 'q13a4', text: "Just go with the flow.", value: 4, vibe: 'calm', mood: 'relaxed' }
        ]
      }
    ],
    moodThresholds: {
      happy: 20,
      calm: 15,
      energetic: 20,
      focused: 0,
      creative: 5,
      relaxed: 15,
      stressed: 10,
      tired: 5,
      introverted: 3,
      neutral: 5,
      intense: 8,
      sad: 2,
      distracted: 2
    }
  }
];