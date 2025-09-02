import React, { useState } from 'react';
import { ArrowLeft, FileText, FileImage, Download, Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockStudyMaterials } from '../../data/mockData';
import { translations } from '../../utils/translations';

interface StudyScreenProps {
  subject: string | null;
}

export default function StudyScreen({ subject }: StudyScreenProps) {
  const { state, dispatch } = useApp();
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  
  const t = translations[state.currentLanguage] || translations.en;
  
  if (!subject) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-400">{t.selectSubjectFirst}</p>
      </div>
    );
  }

  const materials = mockStudyMaterials.filter(m => m.subject === subject);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return FileImage;
      case 'ppt':
        return FileImage;
      default:
        return FileText;
    }
  };

  const handleBookmark = (materialId: string) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: materialId });
  };

  if (selectedMaterial) {
    const material = materials.find(m => m.id === selectedMaterial);
    if (!material) return null;

    return (
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setSelectedMaterial(null)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">{material.title}</h2>
          <button
            onClick={() => handleBookmark(material.id)}
            className={`p-2 rounded-lg transition-colors ${
              state.bookmarks.includes(material.id)
                ? 'bg-amber-500 text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <div className="prose prose-invert max-w-none">
            {material.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeft className="w-6 h-6" />
        <h2 className="text-xl font-bold">{t.studyMaterials}</h2>
      </div>

      <h3 className="text-lg font-semibold mb-4">{subject}</h3>

      <div className="space-y-4">
        {materials.map((material) => {
          const IconComponent = getTypeIcon(material.type);
          
          return (
            <div
              key={material.id}
              className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors cursor-pointer"
              onClick={() => setSelectedMaterial(material.id)}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500 rounded-lg">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{material.title}</h4>
                  <p className="text-sm text-gray-400 capitalize">{material.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(material.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      state.bookmarks.includes(material.id)
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}