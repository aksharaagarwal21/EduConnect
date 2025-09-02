import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const subjects = ['Math', 'Science', 'English', 'Regional Language', 'History', 'Geography'];
const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'bn', name: 'বাংলা' },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { state, dispatch } = useApp();
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const t = translations[state.currentLanguage] || translations.en;

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleContinue = () => {
    if (selectedGrade && selectedSubjects.length > 0) {
      dispatch({
        type: 'SET_USER_PROFILE',
        payload: {
          grade: selectedGrade,
          subjects: selectedSubjects,
          language: selectedLanguage,
        },
      });
      dispatch({ type: 'SET_LANGUAGE', payload: selectedLanguage });
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{t.personalizeYourLearning}</h2>
          <p className="text-gray-400">{t.onboardingSubtitle}</p>
        </div>

        {/* Language Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">{t.selectLanguage}</h3>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLanguage(lang.code);
                  dispatch({ type: 'SET_LANGUAGE', payload: lang.code });
                }}
                className={`p-3 rounded-lg border transition-all ${
                  selectedLanguage === lang.code
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grade Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">{t.selectYourGrade}</h3>
          <div className="grid grid-cols-3 gap-3">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`aspect-square rounded-full border-2 transition-all flex items-center justify-center text-lg font-semibold ${
                  selectedGrade === grade
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">{t.chooseYourSubjects}</h3>
          <div className="space-y-3">
            {subjects.map((subject) => (
              <label
                key={subject}
                className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-750 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subject)}
                  onChange={() => handleSubjectToggle(subject)}
                  className="w-5 h-5 text-emerald-500 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
                />
                <span className="text-gray-300">{subject}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedGrade || selectedSubjects.length === 0}
          className="w-full bg-emerald-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-all"
        >
          {t.continue}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}