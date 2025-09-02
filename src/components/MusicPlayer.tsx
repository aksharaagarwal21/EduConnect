import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';

const motivationalTracks = [
  { id: 1, title: 'Focus Flow', artist: 'Study Beats', duration: 180 },
  { id: 2, title: 'Learning Rhythm', artist: 'Brain Waves', duration: 200 },
  { id: 3, title: 'Concentration Mode', artist: 'Study Focus', duration: 165 },
  { id: 4, title: 'Knowledge Quest', artist: 'Motivation Mix', duration: 190 },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const track = motivationalTracks[currentTrack];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= track.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, track.duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % motivationalTracks.length);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + motivationalTracks.length) % motivationalTracks.length);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isExpanded) {
    return (
      <div className="fixed top-16 right-4 z-40">
        <button
          onClick={() => setIsExpanded(true)}
          className="p-3 bg-emerald-500 rounded-full shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-105"
        >
          <Music className="w-5 h-5 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-16 left-4 right-4 z-40 bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700">
      <div className="flex items-center gap-4">
        {/* Album Art */}
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
          <Music className="w-6 h-6 text-white" />
        </div>

        {/* Track Info */}
        <div className="flex-1">
          <h4 className="font-semibold text-white truncate">{track.title}</h4>
          <p className="text-xs text-gray-400">{track.artist}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
            <div
              className="bg-emerald-400 h-1 rounded-full transition-all duration-1000"
              style={{ width: `${(currentTime / track.duration) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}