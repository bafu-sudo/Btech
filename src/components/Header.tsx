import React from 'react';
import { Volume2, VolumeX, Sparkles, User, Award } from 'lucide-react';
import { brassAudio } from '../audio/brassAudio';

interface HeaderProps {
  activeTab: 'academy' | 'scales' | 'percussion' | 'quiz' | 'about';
  setActiveTab: (tab: 'academy' | 'scales' | 'percussion' | 'quiz' | 'about') => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted
}) => {
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    brassAudio.setMuted(next);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Zone 1: Brand title, one line wordmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('academy')}
            className="flex items-center gap-2 text-left transition-opacity hover:opacity-90"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-amber-400">
              btech
            </span>
            <span className="hidden text-xs text-slate-400 sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="hidden text-xs font-medium text-slate-400 sm:inline">
              British Brass Band Academy
            </span>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="flex items-center gap-2 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('academy')}
            className={`whitespace-nowrap pb-1 pt-1 transition-colors ${
              activeTab === 'academy'
                ? 'border-b-2 border-amber-400 font-semibold text-amber-400'
                : 'hover:text-amber-200'
            }`}
          >
            Instruments & Clefs
          </button>

          <button
            onClick={() => setActiveTab('scales')}
            className={`whitespace-nowrap pb-1 pt-1 transition-colors ${
              activeTab === 'scales'
                ? 'border-b-2 border-amber-400 font-semibold text-amber-400'
                : 'hover:text-amber-200'
            }`}
          >
            Scales & Valves
          </button>

          <button
            onClick={() => setActiveTab('percussion')}
            className={`whitespace-nowrap pb-1 pt-1 transition-colors ${
              activeTab === 'percussion'
                ? 'border-b-2 border-amber-400 font-semibold text-amber-400'
                : 'hover:text-amber-200'
            }`}
          >
            Rhythm & Percussion
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap pb-1 pt-1 transition-colors ${
              activeTab === 'quiz'
                ? 'border-b-2 border-amber-400 font-semibold text-amber-400'
                : 'hover:text-amber-200'
            }`}
          >
            Theory & Ear Quiz
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`whitespace-nowrap pb-1 pt-1 transition-colors ${
              activeTab === 'about'
                ? 'border-b-2 border-amber-400 font-semibold text-amber-400'
                : 'hover:text-amber-200'
            }`}
          >
            About Founder
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute brass sound' : 'Mute brass sound'}
            title={isMuted ? 'Unmute Brass Audio' : 'Mute Brass Audio'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-slate-700 hover:text-amber-400"
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-500/20 whitespace-nowrap"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Nokuvimba Bafu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
