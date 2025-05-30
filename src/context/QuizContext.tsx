import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { mockData } from '@/lib/mockData';
import { Quiz, Question, UserResponse, QuizResult, Mood } from '@/types/quiz';
import { quizzes as initialQuizzes } from '@/data/quizzes';

interface QuizContextType {
  currentQuiz: Quiz | null;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  userResponses: UserResponse[];
  quizResults: QuizResult[];
  detectedMood: Mood | null;
  aiMoodSummary: string | null;
  isLoading: boolean;
  setCurrentQuiz: (quiz: Quiz) => void;
  submitResponse: (response: UserResponse) => void;
  resetQuiz: () => void;
  generateNewQuiz: (topic: string) => Promise<void>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [currentQuiz, setCurrentQuizState] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [detectedMood, setDetectedMood] = useState<Mood | null>(null);
  const [aiMoodSummary, setAiMoodSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalQuestions = currentQuiz?.questions.length || 0;

  const handleSetCurrentQuiz = (quiz: Quiz) => {
    setCurrentQuizState(quiz);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(quiz.questions[0]);
    setUserResponses([]);
    setAiMoodSummary(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!currentQuiz && quizzes.length > 0) {
      handleSetCurrentQuiz(quizzes[0]);
    }
  }, [currentQuiz, quizzes]);

  useEffect(() => {
    const subscription = supabase
      .channel('quiz_results')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'results' }, (payload) => {
        try {
          const newResult = payload.new as QuizResult;
          setQuizResults(prev => {
            const filtered = prev.filter(r => r.quizId !== newResult.quizId);
            return [...filtered, newResult];
          });
        } catch (error) {
          console.error('Error processing real-time update:', error);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const submitResponse = async (response: UserResponse) => {
    try {
      setUserResponses(prev => [...prev, response]);

      const nextIndex = currentQuestionIndex + 1;
      const nextQuestion = currentQuiz?.questions[nextIndex];

      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        setCurrentQuestionIndex(nextIndex);
      } else if (currentQuiz) {
        setIsLoading(true);
        setCurrentQuestion(null);

        const allResponses = [...userResponses, response];

        try {
          const res = await fetch('/api/ai-mood', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quizTitle: currentQuiz.title, answers: allResponses }),
          });

          if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
          }

          const data = await res.json();
          setDetectedMood(data.mood);

          const result: QuizResult = {
            quizId: currentQuiz!.id,
            userId: (await supabase.auth.getUser()).data.user?.id ?? null,
            responses: allResponses,
            detectedMood: null,
            timestamp: new Date().toISOString()
          };

          try {
            const { error } = await supabase
              .from('results')
              .upsert([result]);

            if (error) throw error;

            setQuizResults(prev => {
               const filtered = prev.filter(r => r.quizId !== result.quizId);
               return [...filtered, result];
            });

          } catch (error) {
            console.error('Error saving to Supabase:', error);
            mockData.updateVibeResult(result);
            setQuizResults(mockData.getQuizResults());
          }

        } catch (aiError) {
            console.error('Error getting AI mood summary:', aiError);
            setAiMoodSummary('Could not generate mood summary.');
        } finally {
            setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error submitting response:', error);
       setIsLoading(false);
    }
  };

  const resetCurrentQuiz = () => {
    if (currentQuiz) {
        setCurrentQuestionIndex(0);
        setCurrentQuestion(currentQuiz.questions[0]);
        setUserResponses([]);
        setAiMoodSummary(null);
        setIsLoading(false);
    }
  };

  const generateNewQuiz = async (topic: string) => {
    setIsLoading(true);
    setAiMoodSummary(null);
    setCurrentQuizState(null);
    setCurrentQuestion(null);
    setUserResponses([]);
    setCurrentQuestionIndex(0);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: topic }),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`API error: ${res.status} - ${errorBody}`);
      }

      const data = await res.json();
      const newQuiz = data.quiz as Quiz;

      setQuizzes(prevQuizzes => [...prevQuizzes, newQuiz]);

      handleSetCurrentQuiz(newQuiz);

    } catch (error) {
      console.error('Error generating new quiz:', error);
      setAiMoodSummary(`Failed to generate quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
      setCurrentQuizState(null);
      setQuizzes(initialQuizzes);
    } finally {
    }
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuiz,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        userResponses,
        quizResults,
        detectedMood,
        aiMoodSummary,
        isLoading,
        setCurrentQuiz: handleSetCurrentQuiz,
        submitResponse,
        resetQuiz: resetCurrentQuiz,
        generateNewQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 