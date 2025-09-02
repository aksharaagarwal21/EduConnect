import React from 'react';
import { TrendingUp, Award, Target, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';

export default function ProgressScreen() {
  const { state } = useApp();
  const t = translations[state.currentLanguage] || translations.en;

  const calculateSubjectProgress = (subject: string) => {
    const subjectAttempts = state.quizAttempts.filter(a => a.subject === subject);
    if (subjectAttempts.length === 0) return 0;
    
    const averageScore = subjectAttempts.reduce((acc, attempt) => 
      acc + (attempt.score / attempt.totalQuestions * 100), 0
    ) / subjectAttempts.length;
    
    return Math.round(averageScore);
  };

  const getCompletionPercentage = (subject: string) => {
    // Mock completion based on quiz attempts
    const attempts = state.quizAttempts.filter(a => a.subject === subject).length;
    return Math.min(attempts * 20, 100); // 20% per quiz attempt, max 100%
  };

  const getBadgesEarned = () => {
    const badges = [];
    
    state.quizAttempts.forEach(attempt => {
      const percentage = (attempt.score / attempt.totalQuestions) * 100;
      if (percentage >= 90) {
        badges.push({
          id: `excellence-${attempt.subject}`,
          title: `${attempt.subject} Excellence`,
          icon: Award,
          color: 'text-yellow-400',
        });
      } else if (percentage >= 80) {
        badges.push({
          id: `achiever-${attempt.subject}`,
          title: `${attempt.subject} Achiever`,
          icon: Target,
          color: 'text-blue-400',
        });
      }
    });

    // Remove duplicates
    return badges.filter((badge, index, self) => 
      index === self.findIndex(b => b.id === badge.id)
    ).slice(0, 6);
  };

  const userSubjects = state.userProfile?.subjects || [];
  const badges = getBadgesEarned();

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl font-bold">{t.myProgress}</h2>
      </div>

      {/* Overall Progress */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">{t.overallProgress}</h3>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((state.quizAttempts.length / userSubjects.length) * 20, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {Math.min((state.quizAttempts.length / userSubjects.length) * 20, 100).toFixed(0)}% {t.complete}
        </p>
      </div>

      {/* Content Completion */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">{t.contentCompletion}</h3>
        <div className="space-y-4">
          {userSubjects.map((subject) => {
            const completion = getCompletionPercentage(subject);
            
            return (
              <div key={subject} className="flex items-center gap-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{subject}</span>
                    <span className="text-sm text-gray-400">{completion}% {t.complete}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Scores */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">{t.quizScores}</h3>
        <div className="space-y-4">
          {userSubjects.map((subject) => {
            const subjectAttempts = state.quizAttempts.filter(a => a.subject === subject);
            const avgScore = subjectAttempts.length > 0 
              ? calculateSubjectProgress(subject)
              : 0;
            
            return (
              <div key={subject} className="flex items-center gap-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-emerald-400">{avgScore}%</span>
                      <div className="w-12 h-12 rounded-full border-4 border-gray-700 flex items-center justify-center relative">
                        <svg className="w-full h-full transform -rotate-90 absolute">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeDasharray={`${avgScore * 1.26} 126`}
                            className="text-emerald-400 transition-all duration-500"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {t.averageScore}: {avgScore}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Earned */}
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">{t.badgesEarned}</h3>
        {badges.length === 0 ? (
          <div className="text-center py-6">
            <Award className="w-12 h-12 text-gray-600 mx-auto mb-2" />
            <p className="text-gray-400">{t.noBadgesYet}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              
              return (
                <div key={badge.id} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-2">
                    <IconComponent className={`w-8 h-8 ${badge.color}`} />
                  </div>
                  <h4 className="text-sm font-medium">{badge.title}</h4>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}