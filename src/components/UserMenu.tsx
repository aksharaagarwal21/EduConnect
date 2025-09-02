import React, { useState } from 'react';
import { User, Settings, LogOut, RefreshCw, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import LanguageSelector from './LanguageSelector';

interface UserMenuProps {
  onClose: () => void;
}

export default function UserMenu({ onClose }: UserMenuProps) {
  const { state, dispatch } = useApp();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    onClose();
  };

  const handleResetProfile = () => {
    dispatch({ type: 'RESET_PROFILE' });
    onClose();
  };

  if (showLanguageSelector) {
    return <LanguageSelector onClose={() => setShowLanguageSelector(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Account Settings</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-gray-700 rounded-lg">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-white">{state.user?.name}</h4>
            <p className="text-sm text-gray-400">{state.user?.email}</p>
            {state.userProfile && (
              <p className="text-xs text-emerald-400">Grade {state.userProfile.grade}</p>
            )}
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-2">
          <button
            onClick={() => setShowLanguageSelector(true)}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-left"
          >
            <Settings className="w-5 h-5 text-gray-400" />
            <span>Change Language</span>
          </button>

          <button
            onClick={handleResetProfile}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-left"
          >
            <RefreshCw className="w-5 h-5 text-gray-400" />
            <span>Change Grade & Subjects</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-left"
          >
            <LogOut className="w-5 h-5 text-white" />
            <span className="text-white">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}