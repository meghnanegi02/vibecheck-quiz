import { motion } from 'framer-motion';
import { useQuiz } from '@/context/QuizContext';
import { questions } from '@/data/questions';

export function LiveUpdates() {
  const { responses, vibeResult } = useQuiz();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm w-full"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Live Updates</h3>
      
      {/* Responses Counter */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Responses: {responses.length} / {questions.length}
        </p>
      </div>

      {/* Latest Response */}
      {responses.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Latest Response:</p>
          <p className="text-sm text-gray-600">
            {questions.find(q => q.id === responses[responses.length - 1].questionId)?.text}
          </p>
        </div>
      )}

      {/* Current Vibe Results */}
      {vibeResult && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Current Vibe:</p>
          <div className="space-y-2">
            {Object.entries(vibeResult).map(([vibe, value]) => (
              <div key={vibe} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 capitalize w-24">{vibe}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / 20) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
} 