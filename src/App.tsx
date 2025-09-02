import React, { useState, useEffect } from 'react';
import { GraduationCap, Volume2, VolumeX } from 'lucide-react';
import OnboardingScreen from './components/OnboardingScreen';
import MainApp from './components/MainApp';
import MusicPlayer from './components/MusicPlayer';
import { AppProvider } from './context/AppContext';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);

  useEffect(() => {
    const onboarding = localStorage.getItem('educonnect_onboarded');
    if (onboarding) {
      setIsOnboarded(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('educonnect_onboarded', 'true');
    setIsOnboarded(true);
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-emerald-400" />
            <h1 className="text-xl font-bold">EduConnect</h1>
          </div>
          <button
            onClick={() => setIsMusicEnabled(!isMusicEnabled)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {isMusicEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </header>

        {/* Music Player */}
        {isMusicEnabled && <MusicPlayer />}

        {/* Main Content */}
        {!isOnboarded ? (
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        ) : (
          <MainApp />
        )}
      </div>
    </AppProvider>
  );
}

export default App;