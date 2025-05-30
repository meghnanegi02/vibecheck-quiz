import { motion } from 'framer-motion';
import { VibeResult as VibeResultType } from '@/types/quiz';

type VibeResultProps = {
  result: VibeResultType;
};

export function VibeResult({ result }: VibeResultProps) {
  const vibes = Object.entries(result) as [keyof VibeResultType, number][];
  const maxValue = Math.max(...Object.values(result));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Vibe Check Results</h2>
      <div className="space-y-4">
        {vibes.map(([vibe, value]) => (
          <div key={vibe} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700 capitalize">{vibe}</span>
              <span className="text-gray-500">{value}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(value / maxValue) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
} 