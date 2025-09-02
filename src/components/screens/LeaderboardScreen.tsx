import React from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';

export default function LeaderboardScreen() {
  const { state } = useApp();
  const t = translations[state.currentLanguage] || translations.en;

  // Get top scores by subject
  const getTopScoresBySubject = () => {
    const scoresBySubject: Record<string, any[]> = {};
    
    state.quizAttempts.forEach(attempt => {
      const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
      if (!scoresBySubject[attempt.subject]) {
        scoresBySubject[attempt.subject] = [];
      }
      scoresBySubject[attempt.subject].push({
        ...attempt,
        percentage,
      });
    });

    // Sort and take top 3 for each subject
    Object.keys(scoresBySubject).forEach(subject => {
      scoresBySubject[subject] = scoresBySubject[subject]
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 3);
    });

    return scoresBySubject;
  };

  // Get recent attempts
  const getRecentAttempts = () => {
    return state.quizAttempts
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5)
      .map(attempt => ({
        ...attempt,
        percentage: Math.round((attempt.score / attempt.totalQuestions) * 100),
      }));
  };

  const topScores = getTopScoresBySubject();
  const recentAttempts = getRecentAttempts();

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">{t.leaderboard}</h2>

      {state.quizAttempts.length === 0 ? (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">{t.noScoresYet}</h3>
          <p className="text-gray-500">{t.takeQuizToSeeScores}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Scores by Subject */}
          {Object.entries(topScores).map(([subject, scores]) => (
            <div key={subject} className="bg-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-4">{subject} {t.topScores}</h3>
              <div className="space-y-3">
                {scores.map((score, index) => (
                  <div key={score.id} className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                    <div className="flex-shrink-0">
                      {getRankIcon(index)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">#{index + 1}</span>
                        <span className="text-emerald-400 font-bold">{score.percentage}%</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {new Date(score.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Recent Attempts */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-4">{t.recentAttempts}</h3>
            <div className="space-y-3">
              {recentAttempts.map((attempt, index) => (
                <div key={attempt.id} className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
                    {attempt.percentage}%
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{attempt.subject}</h4>
                    <p className="text-xs text-gray-400">
                      {attempt.score}/{attempt.totalQuestions} • {new Date(attempt.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}