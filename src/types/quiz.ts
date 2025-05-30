export type Mood = 'happy' | 'calm' | 'energetic' | 'focused' | 'creative' | 'relaxed' | 'stressed' | 'tired' | 'neutral' | 'introverted' | 'sad' | 'intense' | 'distracted';

export interface Question {
  id: string;
  text: string;
  category: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  text: string;
  value: number;
  vibe: string;
  mood: Mood;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  moodThresholds: Record<Mood, number>;
  icon?: string;
  image?: string;
}

export interface UserResponse {
  questionId: string;
  optionId: string;
  value: number;
  timestamp: string;
}

export interface QuizResult {
  quizId: string;
  userId: string | null;
  responses: UserResponse[];
  detectedMood: Mood | null;
  timestamp: string;
} 