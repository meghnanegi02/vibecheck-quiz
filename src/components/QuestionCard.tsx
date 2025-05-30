import { useQuiz } from '@/context/QuizContext';
import { Question } from '@/types/quiz';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { submitResponse } = useQuiz();

  const handleOptionClick = (optionId: string, value: number) => {
    submitResponse({
      questionId: question.id,
      optionId,
      value,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-8 bg-white rounded-lg shadow-xl border border-gray-200 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{question.text}</h2>
      <div className="space-y-4">
        {question.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => handleOptionClick(option.id, option.value)}
            whileHover={{ scale: 1.03, backgroundColor: '#EBF8FF' }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 text-left rounded-lg border border-gray-300 hover:border-blue-500 transition-all"
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
} 