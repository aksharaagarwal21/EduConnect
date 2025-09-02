import React, { useState } from 'react';
import { Home, BookOpen, Bookmark, Trophy, TrendingUp } from 'lucide-react';
import HomeScreen from './screens/HomeScreen';
import StudyScreen from './screens/StudyScreen';
import QuizScreen from './screens/QuizScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProgressScreen from './screens/ProgressScreen';

type Screen = 'home' | 'study' | 'quiz' | 'bookmarks' | 'leaderboard' | 'progress';

export default function MainApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigateToStudy={setSelectedSubject} />;
      case 'study':
        return <StudyScreen subject={selectedSubject} />;
      case 'quiz':
        return <QuizScreen subject={selectedSubject} />;
      case 'bookmarks':
        return <BookmarksScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'progress':
        return <ProgressScreen />;
      default:
        return <HomeScreen onNavigateToStudy={setSelectedSubject} />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="grid grid-cols-5 h-16">
          <NavButton
            icon={Home}
            label="Study"
            isActive={currentScreen === 'home'}
            onClick={() => setCurrentScreen('home')}
          />
          <NavButton
            icon={BookOpen}
            label="Quizzes"
            isActive={currentScreen === 'quiz'}
            onClick={() => setCurrentScreen('quiz')}
          />
          <NavButton
            icon={Bookmark}
            label="Bookmarks"
            isActive={currentScreen === 'bookmarks'}
            onClick={() => setCurrentScreen('bookmarks')}
          />
          <NavButton
            icon={Trophy}
            label="Leaderboard"
            isActive={currentScreen === 'leaderboard'}
            onClick={() => setCurrentScreen('leaderboard')}
          />
          <NavButton
            icon={TrendingUp}
            label="Tracker"
            isActive={currentScreen === 'progress'}
            onClick={() => setCurrentScreen('progress')}
          />
        </div>
      </nav>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ icon: Icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 transition-colors ${
        isActive ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-300'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}