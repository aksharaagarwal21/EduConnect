import React from 'react';
import { Bookmark, FileText, FileImage, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockStudyMaterials, mockQuizzes } from '../../data/mockData';
import { translations } from '../../utils/translations';

export default function BookmarksScreen() {
  const { state, dispatch } = useApp();
  const t = translations[state.currentLanguage] || translations.en;

  const bookmarkedMaterials = mockStudyMaterials.filter(m => 
    state.bookmarks.includes(m.id)
  );

  const bookmarkedQuestions = mockQuizzes
    .flatMap(quiz => quiz.questions)
    .filter(q => state.bookmarks.includes(q.id));

  const handleRemoveBookmark = (id: string) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: id });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return FileImage;
      case 'ppt':
        return FileImage;
      case 'question':
        return HelpCircle;
      default:
        return FileText;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">{t.bookmarks}</h2>

      {state.bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400 mb-2">{t.noBookmarks}</h3>
          <p className="text-gray-500">{t.bookmarkHint}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Study Materials */}
          {bookmarkedMaterials.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.studyMaterials}</h3>
              <div className="space-y-3">
                {bookmarkedMaterials.map((material) => {
                  const IconComponent = getTypeIcon(material.type);
                  
                  return (
                    <div
                      key={material.id}
                      className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500 rounded-lg">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{material.title}</h4>
                          <p className="text-sm text-gray-400">{material.subject} • {material.type}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveBookmark(material.id)}
                          className="p-2 rounded-lg bg-amber-500 hover:bg-amber-600 transition-colors"
                        >
                          <Bookmark className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quiz Questions */}
          {bookmarkedQuestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.savedQuestions}</h3>
              <div className="space-y-3">
                {bookmarkedQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-500 rounded-lg">
                        <HelpCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2">{question.question}</h4>
                        <p className="text-sm text-emerald-400">{question.options[question.correctAnswer]}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveBookmark(question.id)}
                        className="p-2 rounded-lg bg-amber-500 hover:bg-amber-600 transition-colors"
                      >
                        <Bookmark className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}