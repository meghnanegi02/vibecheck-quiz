import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface QuizResultProps {
  quizTitle: string;
  answers: any[];
}

export function QuizResult({ quizTitle, answers }: QuizResultProps) {
  const [aiMood, setAIMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMood() {
      try {
        setLoading(true);
        const res = await fetch('/api/ai-mood', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quizTitle, answers }),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        setAIMood(data.mood);
      } catch (err) {
        console.error('Error fetching AI mood:', err);
        setError('Could not load mood summary.');
      } finally {
        setLoading(false);
      }
    }
    fetchMood();
  }, [quizTitle, answers]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-blue-50 rounded-lg shadow-md text-center"
      >
        Loading your mood summary...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-red-50 rounded-lg shadow-md text-center text-red-700"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Animation from below
      animate={{ opacity: 1, y: 0 }} // Fade in and move up
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
      className="p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg shadow-xl text-center space-y-4" // Enhanced styling with gradient
    >
      <h2 className="text-3xl font-bold text-gray-800">Your Mood Summary</h2>
      {aiMood && <p className="text-xl text-gray-700">{aiMood}</p>}
    </motion.div>
  );
} 