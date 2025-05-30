import { useQuiz } from '@/context/QuizContext';
import { quizzes } from '@/data/quizzes';
import { QuestionCard } from './QuestionCard';
import { QuizResult } from './QuizResult';
import { QuizProgressBar } from './QuizProgressBar';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function QuizSelector() {
  const { 
    currentQuiz,
    setCurrentQuiz,
    quizResults,
    detectedMood,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    userResponses,
    aiMoodSummary,
    isLoading,
    resetQuiz,
    generateNewQuiz
  } = useQuiz();

  const [quizTopic, setQuizTopic] = useState('');
  const [showTopicInput, setShowTopicInput] = useState(false);

  // Determine if the quiz is complete (no more questions) and not loading AI result
  const isQuizComplete = currentQuiz && !currentQuestion && userResponses.length > 0 && !isLoading;
  // Determine if we should show the quiz questions or the result
  const showQuizContent = currentQuiz && (currentQuestion || isLoading || aiMoodSummary !== null);

  const handleGenerateClick = () => {
      if (quizTopic.trim()) {
          generateNewQuiz(quizTopic);
          setQuizTopic('');
          setShowTopicInput(false);
      } else {
          alert('Please enter a topic for the quiz.');
      }
  };

  return (
    <div className="space-y-8">
      {/* Quiz Selection Grid */}
      <AnimatePresence mode="wait">
        {!currentQuiz && (
          <motion.div
            key="quiz-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Select a Quiz or Generate a New One!</h2>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                {!showTopicInput && (
                    <button
                        onClick={() => setShowTopicInput(true)}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors"
                    >
                        🎲 Generate New Quiz
                    </button>
                )}

                {showTopicInput && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-grow flex space-x-2"
                    >
                        <input
                            type="text"
                            placeholder="Enter a topic (e.g., your favorite hobbies)"
                            value={quizTopic}
                            onChange={(e) => setQuizTopic(e.target.value)}
                            onKeyPress={(e) => { if (e.key === 'Enter') handleGenerateClick(); }}
                            className="flex-grow p-2 rounded-lg border border-gray-300"
                        />
                         <button
                            onClick={handleGenerateClick}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
                        >
                            Generate
                        </button>
                         <button
                            onClick={() => { setShowTopicInput(false); setQuizTopic(''); }}
                            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-400 transition-colors"
                        >
                            Cancel
                        </button>
                    </motion.div>
                )}
                 {isLoading && showTopicInput && <p className="text-blue-600">Generating quiz...</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <motion.button
                  key={quiz.id}
                  onClick={() => setCurrentQuiz(quiz)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={
                    `relative w-full h-48 rounded-lg overflow-hidden shadow-md text-left p-6 transition-all bg-center bg-cover ` +
                    `${
                      currentQuiz?.id === quiz.id
                        ? 'border-4 border-blue-500'
                        : 'border-2 border-gray-200 hover:border-blue-300'
                    }`
                  }
                  style={{ backgroundImage: `url(${quiz.image || ''})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="relative z-10 text-white space-y-2">
                    {quiz.icon && <span className="text-4xl">{quiz.icon}</span>}
                    <h3 className="font-bold text-xl leading-tight">{quiz.title}</h3>
                    <p className="text-sm opacity-90">{quiz.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Question or AI Result */}
      <AnimatePresence mode="wait">
        {showQuizContent && (
          <motion.div
            key="quiz-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            {/* Progress Bar */}
            {!isQuizComplete && currentQuiz && (
              <QuizProgressBar currentStep={currentQuestionIndex + 1} totalSteps={totalQuestions} />
            )}

            {/* Question Card */}
            {currentQuestion && <QuestionCard question={currentQuestion} />}

            {/* AI Result */}
            {isQuizComplete && currentQuiz && (
                <QuizResult quizTitle={currentQuiz.title} answers={userResponses} />
            )}

            {/* Retake Quiz Button */}
            {isQuizComplete && (
                <div className="text-center mt-6">
                    <button 
                        onClick={resetQuiz}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
                    >
                        Retake Quiz
                    </button>
                </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* Your Past Results */}
      {quizResults.length > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-bold">Your Past Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizResults.map((result) => {
              const quiz = quizzes.find((q) => q.id === result.quizId);
              return (
                <div
                  key={result.quizId}
                  className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm"
                >
                  <h3 className="font-semibold">{quiz?.title}</h3>
                  <p className="text-sm text-gray-600">
                    Completed: {new Date(result.timestamp).toLocaleDateString()}
                  </p>
                  {result.detectedMood && (
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                        Mood: {result.detectedMood}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {detectedMood && (
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 mt-8">
          <h3 className="font-semibold text-blue-800">Your Latest Detected Mood</h3>
          <p className="text-blue-600">{detectedMood}</p>
        </div>
      )}

        {isLoading && !showTopicInput && (
             <div className="text-center text-blue-600 mt-8">Generating quiz...</div>
        )}

    </div>
  );
} 