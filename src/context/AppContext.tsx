import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserProfile {
  grade: number;
  subjects: string[];
  language: string;
}

interface StudyMaterial {
  id: string;
  title: string;
  type: 'notes' | 'pdf' | 'ppt';
  subject: string;
  content: string;
  isBookmarked: boolean;
}

interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  isBookmarked: boolean;
}

interface QuizAttempt {
  id: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  timestamp: number;
  subject: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  studyMaterials: StudyMaterial[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  bookmarks: string[];
  currentLanguage: string;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER_PROFILE'; payload: UserProfile }
  | { type: 'RESET_PROFILE' }
  | { type: 'TOGGLE_BOOKMARK'; payload: string }
  | { type: 'ADD_QUIZ_ATTEMPT'; payload: QuizAttempt }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'LOAD_DATA'; payload: Partial<AppState> };

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  userProfile: null,
  studyMaterials: [],
  quizzes: [],
  quizAttempts: [],
  bookmarks: [],
  currentLanguage: 'en',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...initialState, currentLanguage: state.currentLanguage };
    case 'SET_USER_PROFILE':
      return { ...state, userProfile: action.payload };
    case 'RESET_PROFILE':
      return { ...state, userProfile: null };
    case 'TOGGLE_BOOKMARK':
      const isBookmarked = state.bookmarks.includes(action.payload);
      return {
        ...state,
        bookmarks: isBookmarked
          ? state.bookmarks.filter(id => id !== action.payload)
          : [...state.bookmarks, action.payload],
      };
    case 'ADD_QUIZ_ATTEMPT':
      return {
        ...state,
        quizAttempts: [...state.quizAttempts, action.payload],
      };
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload };
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load data from localStorage
    const authData = localStorage.getItem('educonnect_auth');
    const savedData = localStorage.getItem('educonnect_data');
    
    if (authData) {
      try {
        const user = JSON.parse(authData);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Error loading auth data:', error);
      }
    }
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage
    if (state.user) {
      localStorage.setItem('educonnect_auth', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('educonnect_auth');
    }
    
    localStorage.setItem('educonnect_data', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}