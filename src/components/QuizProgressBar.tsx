import { motion } from 'framer-motion';

interface QuizProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function QuizProgressBar({ currentStep, totalSteps }: QuizProgressBarProps) {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <motion.div
        className="bg-blue-600 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      ></motion.div>
    </div>
  );
} 