import React, { useState } from 'react';
import { ArrowLeft, X, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockQuizzes } from '../../data/mockData';
import { translations } from '../../utils/translations';

interface QuizScreenProps {
  subject: string | null;
}

export default function QuizScreen({ subject }: QuizScreenProps) {
  const { state, dispatch } = useApp();
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const t = translations[state.currentLanguage] || translations.en;
  
  if (!subject) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-400">{t.selectSubjectFirst}</p>
      </div>
    );
  }

  const quizzes = mockQuizzes.filter(q => q.subject === subject);
  const currentQuiz = selectedQuiz ? quizzes.find(q => q.id === selectedQuiz) : null;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuiz) return;
    
    const isCorrect = selectedAnswer === currentQuiz.questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (!currentQuiz) return;
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      const finalScore = score + (selectedAnswer === currentQuiz.questions[currentQuestionIndex].correctAnswer ? 1 : 0);
      
      dispatch({
        type: 'ADD_QUIZ_ATTEMPT',
        payload: {
          id: Date.now().toString(),
          quizId: currentQuiz.id,
          score: finalScore,
          totalQuestions: currentQuiz.questions.length,
          timestamp: Date.now(),
          subject: currentQuiz.subject,
        },
      });
      
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setScore(0);
  };

  if (quizCompleted && currentQuiz) {
    const finalScore = score;
    const percentage = Math.round((finalScore / currentQuiz.questions.length) * 100);
    
    return (
      <div className="p-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{t.quizCompleted}</h2>
          <p className="text-gray-400 mb-6">{t.greatJob}</p>
          
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold text-emerald-400 mb-2">{percentage}%</div>
            <p className="text-gray-300">{finalScore} out of {currentQuiz.questions.length} correct</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
            >
              {t.tryAgain}
            </button>
            <button
              onClick={() => setSelectedQuiz(null)}
              className="w-full bg-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
            >
              {t.backToQuizzes}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentQuiz) {
    const question = currentQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

    return (
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={resetQuiz}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold">{t.quiz}</h2>
          <div className="text-sm text-gray-400">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-2">
            {t.question} {currentQuestionIndex + 1}/{currentQuiz.questions.length}
          </p>
          <h3 className="text-xl font-semibold">{question.question}</h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && handleAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                showExplanation
                  ? index === question.correctAnswer
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : selectedAnswer === index
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-gray-800 text-gray-400 border-gray-700'
                  : selectedAnswer === index
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
              } border`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  showExplanation && index === question.correctAnswer
                    ? 'border-white bg-white'
                    : showExplanation && selectedAnswer === index && index !== question.correctAnswer
                    ? 'border-white bg-white'
                    : selectedAnswer === index
                    ? 'border-white bg-white'
                    : 'border-gray-500'
                }`}>
                  {showExplanation && index === question.correctAnswer && (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  )}
                  {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-gray-800 rounded-xl p-4 mb-6">
            <h4 className="font-semibold mb-2">{t.explanation}</h4>
            <p className="text-gray-300">{question.explanation}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-3">
          {!showExplanation ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
            >
              {t.submit}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
            >
              {currentQuestionIndex < currentQuiz.questions.length - 1 ? t.next : t.finish}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft className="w-6 h-6" />
        <h2 className="text-xl font-bold">{subject} {t.quizzes}</h2>
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <button
            key={quiz.id}
            onClick={() => setSelectedQuiz(quiz.id)}
            className="w-full bg-gray-800 rounded-xl p-4 text-left hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">{quiz.title}</h3>
                <p className="text-sm text-gray-400">
                  {quiz.questions.length} {t.questions}
                </p>
              </div>
              <div className="text-emerald-400 font-semibold">
                {t.start}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}