import React from 'react';
import { Calculator, Microscope, Globe, BookOpen, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import LanguageSelector from '../LanguageSelector';
import { translations } from '../../utils/translations';

const subjectIcons = {
  Math: Calculator,
  Science: Microscope,
  English: BookOpen,
  'Regional Language': Globe,
  History: Globe,
  Geography: Globe,
};

const subjectColors = {
  Math: 'from-blue-500 to-blue-600',
  Science: 'from-green-500 to-green-600',
  English: 'from-purple-500 to-purple-600',
  'Regional Language': 'from-orange-500 to-orange-600',
  History: 'from-red-500 to-red-600',
  Geography: 'from-teal-500 to-teal-600',
};

interface HomeScreenProps {
  onNavigateToStudy: (subject: string) => void;
}

export default function HomeScreen({ onNavigateToStudy }: HomeScreenProps) {
  const { state } = useApp();
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
  
  const t = translations[state.currentLanguage] || translations.en;
  const userSubjects = state.userProfile?.subjects || [];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{t.exploreSubjects}</h2>
          <p className="text-gray-400">{t.gradeLevel} {state.userProfile?.grade}</p>
        </div>
        <button
          onClick={() => setShowLanguageSelector(true)}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-2 gap-4">
        {userSubjects.map((subject) => {
          const IconComponent = subjectIcons[subject as keyof typeof subjectIcons] || BookOpen;
          const colorClass = subjectColors[subject as keyof typeof subjectColors] || 'from-gray-500 to-gray-600';
          
          return (
            <button
              key={subject}
              onClick={() => onNavigateToStudy(subject)}
              className={`aspect-square rounded-2xl bg-gradient-to-br ${colorClass} p-6 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <IconComponent className="w-12 h-12 mb-3" />
                <h3 className="text-lg font-semibold text-center">{subject}</h3>
                <p className="text-sm opacity-90 mt-1">{t.exploreSubject}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-3">{t.todayProgress}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">
              {state.quizAttempts.filter(a => 
                new Date(a.timestamp).toDateString() === new Date().toDateString()
              ).length}
            </div>
            <p className="text-xs text-gray-400">{t.quizzesToday}</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {state.bookmarks.length}
            </div>
            <p className="text-xs text-gray-400">{t.bookmarked}</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">
              {state.quizAttempts.length > 0 
                ? Math.round(state.quizAttempts.reduce((acc, a) => acc + (a.score / a.totalQuestions * 100), 0) / state.quizAttempts.length)
                : 0}%
            </div>
            <p className="text-xs text-gray-400">{t.avgScore}</p>
          </div>
        </div>
      </div>

      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <LanguageSelector onClose={() => setShowLanguageSelector(false)} />
      )}
    </div>
  );
}