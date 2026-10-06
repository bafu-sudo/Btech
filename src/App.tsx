import React, { useState } from 'react';
import { Header } from './components/Header';
import { BrassAcademy } from './components/BrassAcademy';
import { ScaleStudio } from './components/ScaleStudio';
import { TromboneSlideStudio } from './components/TromboneSlideStudio';
import { PercussionLab } from './components/PercussionLab';
import { QuizStudio } from './components/QuizStudio';
import { AboutFounder } from './components/AboutFounder';

export default function App() {
  const [activeTab, setActiveTab] = useState<'academy' | 'scales' | 'trombone' | 'percussion' | 'quiz' | 'about'>('academy');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Top Bar adhering to Universal Frontend Design Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'academy' && <BrassAcademy />}
        {activeTab === 'scales' && <ScaleStudio />}
        {activeTab === 'trombone' && <TromboneSlideStudio />}
        {activeTab === 'percussion' && <PercussionLab />}
        {activeTab === 'quiz' && <QuizStudio />}
        {activeTab === 'about' && <AboutFounder />}
      </main>

      {/* Founder Tribute Banner before footer */}
      <section className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-serif text-base sm:text-lg font-semibold text-amber-300 italic">
            "I struggled to teach myself brass music, so I want to make it easier for the next person."
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>Founded by <strong>Nokuvimba Bafu</strong></span>
            <span aria-hidden="true">·</span>
            <span>Zimbabwe</span>
            <span aria-hidden="true">·</span>
            <span>Dedicated to Salvation Army & British Brass Band Learners Worldwide</span>
          </div>
        </div>
      </section>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950 py-6 px-4 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-slate-300">btech</span>
            <span aria-hidden="true">·</span>
            <span>British Brass Band Academy</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Cornet to BBb Bass & Percussion</span>
            <span aria-hidden="true">·</span>
            <span>Treble Clef Transposition</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Web Audio Synthesizer</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
