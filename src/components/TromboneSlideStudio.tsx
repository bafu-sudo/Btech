import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Zap, 
  RotateCcw, 
  ArrowRight, 
  Play, 
  Square,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { TROMBONE_SLIDE_POSITIONS } from '../data/brassData';
import { brassAudio } from '../audio/brassAudio';

interface TromboneScaleStep {
  step: number;
  noteTreble: string;
  noteBass: string;
  position: number;
  freqHz: number;
  partial: number;
  landmark: string;
}

const TROMBONE_C_SCALE_STEPS: TromboneScaleStep[] = [
  { step: 1, noteTreble: 'C4', noteBass: 'Bb2', position: 1, freqHz: 116.54, partial: 2, landmark: '1st Pos (Closed)' },
  { step: 2, noteTreble: 'D4', noteBass: 'C3', position: 6, freqHz: 130.81, partial: 2, landmark: '6th Pos (Full Reach)' },
  { step: 3, noteTreble: 'E4', noteBass: 'D3', position: 4, freqHz: 146.83, partial: 2, landmark: '4th Pos (Past Bell)' },
  { step: 4, noteTreble: 'F4', noteBass: 'Eb3', position: 3, freqHz: 155.56, partial: 2, landmark: '3rd Pos (Bell Rim)' },
  { step: 5, noteTreble: 'G4', noteBass: 'F3', position: 1, freqHz: 174.61, partial: 3, landmark: '1st Pos (Closed 3rd P)' },
  { step: 6, noteTreble: 'A4', noteBass: 'G3', position: 4, freqHz: 196.00, partial: 3, landmark: '4th Pos (Harmonic)' },
  { step: 7, noteTreble: 'B4', noteBass: 'A3', position: 2, freqHz: 220.00, partial: 3, landmark: '2nd Pos (3" out)' },
  { step: 8, noteTreble: 'C5', noteBass: 'Bb3', position: 1, freqHz: 233.08, partial: 4, landmark: '1st Pos (Octave C)' }
];

export const TromboneSlideStudio: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<number>(1);
  const [selectedPartial, setSelectedPartial] = useState<number>(4); // 4th partial = Bb3 (middle register)
  const [clefView, setClefView] = useState<'treble' | 'bass'>('treble');
  const [isGlissandoPlaying, setIsGlissandoPlaying] = useState<boolean>(false);
  const [activeScaleIndex, setActiveScaleIndex] = useState<number | null>(null);
  const [isScalePlaying, setIsScalePlaying] = useState<boolean>(false);
  const scaleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (scaleTimerRef.current) clearTimeout(scaleTimerRef.current);
    };
  }, []);

  const playScaleStep = (index: number) => {
    const step = TROMBONE_C_SCALE_STEPS[index];
    setActiveScaleIndex(index);
    setCurrentPosition(step.position);
    setSelectedPartial(step.partial);
    brassAudio.playBrassTone(step.freqHz, 0.65, 'trombone');
  };

  const togglePlayFullScale = () => {
    if (isScalePlaying) {
      if (scaleTimerRef.current) clearTimeout(scaleTimerRef.current);
      setIsScalePlaying(false);
      setActiveScaleIndex(null);
      return;
    }

    setIsScalePlaying(true);
    let idx = 0;

    const runStep = () => {
      if (idx >= TROMBONE_C_SCALE_STEPS.length) {
        setIsScalePlaying(false);
        setActiveScaleIndex(null);
        return;
      }
      playScaleStep(idx);
      idx++;
      scaleTimerRef.current = window.setTimeout(runStep, 680);
    };

    runStep();
  };

  // Partial fundamentals on 1st position (Bb Tenor Trombone)
  // 1st partial (pedal): Bb1 = 58.27 Hz
  // 2nd partial: Bb2 = 116.54 Hz
  // 3rd partial: F3 = 174.61 Hz
  // 4th partial: Bb3 = 233.08 Hz (Middle octave)
  // 5th partial: D4 = 293.66 Hz
  // 6th partial: F4 = 349.23 Hz
  // 8th partial: Bb4 = 466.16 Hz
  const partials = [
    { partial: 2, label: 'Low 2nd Partial (Bb2)', rootFreq: 116.54, trebleNote: 'C4', bassNote: 'Bb2' },
    { partial: 3, label: '3rd Partial 5th (F3)', rootFreq: 174.61, trebleNote: 'G4', bassNote: 'F3' },
    { partial: 4, label: 'Standard 4th Partial (Bb3)', rootFreq: 233.08, trebleNote: 'C5', bassNote: 'Bb3' },
    { partial: 5, label: 'High 5th Partial (D4)', rootFreq: 293.66, trebleNote: 'E5', bassNote: 'D4' },
    { partial: 6, label: 'High 6th Partial (F4)', rootFreq: 349.23, trebleNote: 'G5', bassNote: 'F4' }
  ];

  const currentPartialObj = partials.find(p => p.partial === selectedPartial) || partials[2];

  // Each slide position lowers pitch by 1 semitone
  const semitoneDrop = currentPosition - 1;
  const currentFreq = currentPartialObj.rootFreq * Math.pow(2, -semitoneDrop / 12);

  // Compute note names for current position & partial
  const noteNamesTreble = [
    ['C4', 'B3', 'Bb3', 'A3', 'Ab3', 'G3', 'F#3'], // P2
    ['G4', 'F#4', 'F4', 'E4', 'Eb4', 'D4', 'C#4'], // P3
    ['C5', 'B4', 'Bb4', 'A4', 'Ab4', 'G4', 'F#4'], // P4
    ['E5', 'D#5', 'D5', 'C#5', 'C5', 'B4', 'Bb4'], // P5
    ['G5', 'F#5', 'F5', 'E5', 'Eb5', 'D5', 'C#5']  // P6
  ];

  const noteNamesBass = [
    ['Bb2', 'A2', 'Ab2', 'G2', 'Gb2', 'F2', 'E2'], // P2
    ['F3', 'E3', 'Eb3', 'D3', 'Db3', 'C3', 'B2'],   // P3
    ['Bb3', 'A3', 'Ab3', 'G3', 'Gb3', 'F3', 'E3'], // P4
    ['D4', 'C#4', 'C4', 'B3', 'Bb3', 'A3', 'Ab3'], // P5
    ['F4', 'E4', 'Eb4', 'D4', 'Db4', 'C4', 'B3']   // P6
  ];

  const partialIndex = partials.findIndex(p => p.partial === selectedPartial);
  const currentTrebleNote = noteNamesTreble[partialIndex]?.[currentPosition - 1] || 'C';
  const currentBassNote = noteNamesBass[partialIndex]?.[currentPosition - 1] || 'Bb';

  const playCurrentNote = () => {
    brassAudio.playBrassTone(currentFreq, 0.8, 'trombone');
  };

  // Keyboard shortcut to jump positions (1 to 7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 7) {
        setCurrentPosition(num);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerGlissando = (targetPos: number) => {
    if (isGlissandoPlaying) return;
    setIsGlissandoPlaying(true);

    const startPos = currentPosition;
    const startFreq = currentPartialObj.rootFreq * Math.pow(2, -(startPos - 1) / 12);
    const endFreq = currentPartialObj.rootFreq * Math.pow(2, -(targetPos - 1) / 12);

    // Audio glissando
    brassAudio.playTromboneGlissando(startFreq, endFreq, 0.9);

    // Smooth visual animation
    setCurrentPosition(targetPos);

    setTimeout(() => {
      setIsGlissandoPlaying(false);
    }, 950);
  };

  const currentPosInfo = TROMBONE_SLIDE_POSITIONS[currentPosition - 1];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Sparkles className="h-4 w-4" />
          <span>Interactive Trombone Mechanics</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          Trombone Slide Simulator & Glissando Lab
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-3xl">
          Unlike valved brass with fixed valve loops, the trombone lengthens its acoustic tubing continuously across <strong>7 slide positions</strong>. Watch the animated slide physically move in real time, compare British Band Treble Clef vs Concert Bass Clef, and hear smooth trombone glissandos.
        </p>
      </div>

      {/* MAIN INTERACTIVE TROMBONE STAGE */}
      <div className="mb-10 rounded-3xl border border-amber-500/30 bg-slate-900/90 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5 mb-8">
          <div>
            <div className="text-xs uppercase font-semibold text-amber-400 mb-1">
              Live Animated Slide Stage
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
              Position {currentPosition}: {currentPosInfo.name}
            </h2>
            <div className="text-xs text-slate-400 mt-1">
              {currentPosInfo.relativeToBell} (approx {currentPosInfo.distanceCm} cm out)
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={togglePlayFullScale}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-lg active:scale-95 ${
                isScalePlaying
                  ? 'bg-rose-500 text-white hover:bg-rose-600'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              }`}
            >
              {isScalePlaying ? (
                <>
                  <Square className="h-4 w-4 fill-white" />
                  <span>Stop Scale Animation</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-slate-950" />
                  <span>Play C Scale (Slide Animation)</span>
                </>
              )}
            </button>

            <button
              onClick={playCurrentNote}
              className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition-colors shadow-lg active:scale-95"
            >
              <Volume2 className="h-4 w-4" />
              <span>Play Pos {currentPosition}</span>
            </button>

            <button
              onClick={() => triggerGlissando(currentPosition === 1 ? 6 : 1)}
              disabled={isGlissandoPlaying || isScalePlaying}
              className="flex items-center gap-2 rounded-xl border border-amber-400/50 bg-amber-400/10 px-3.5 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-400/20 transition-colors disabled:opacity-40"
            >
              <Zap className="h-4 w-4" />
              <span>Glissando {currentPosition === 1 ? '1 → 6' : `${currentPosition} → 1`}</span>
            </button>
          </div>
        </div>

        {/* PHYSICAL TROMBONE ANIMATED VISUAL (SVG / CSS) */}
        <div className="relative mb-8 rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-10 overflow-x-auto">
          <div className="min-w-[680px] h-48 relative flex items-center">
            {/* Stationary Trombone Bell & Body Section */}
            <svg className="absolute left-0 top-0 h-48 w-[320px] pointer-events-none z-10" viewBox="0 0 320 180">
              {/* Mouthpiece */}
              <rect x="10" y="45" width="22" height="12" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
              <rect x="32" y="48" width="40" height="6" fill="#e2e8f0" />
              
              {/* Main Bell Tuning Slide Loop */}
              <path d="M 72 48 L 190 48 Q 230 48 230 75 Q 230 102 190 102 L 110 102" fill="none" stroke="#d97706" strokeWidth="9" strokeLinecap="round" />
              <path d="M 72 48 L 190 48 Q 230 48 230 75 Q 230 102 190 102 L 110 102" fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />

              {/* The Flaring Bell (pointing forward towards slide) */}
              <path d="M 110 102 L 210 102 Q 250 102 265 85 L 275 75 Q 285 65 295 50 L 295 130 Q 285 115 275 105 L 265 95" fill="none" stroke="#d97706" strokeWidth="6" />
              <path d="M 240 102 C 265 100, 280 80, 295 50 L 295 130 C 280 100, 265 80, 240 78 Z" fill="#f59e0b" opacity="0.9" stroke="#b45309" strokeWidth="2" />
              <ellipse cx="295" cy="90" rx="4" ry="40" fill="#fbbf24" stroke="#78350f" strokeWidth="2" />

              {/* Bell Rim Alignment Marker Line */}
              <line x1="295" y1="20" x2="295" y2="160" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="295" y="15" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">BELL RIM</text>

              {/* Stationary Inner Slide Tubes (Silver/Chrome) */}
              <line x1="72" y1="48" x2="680" y2="48" stroke="#94a3b8" strokeWidth="4.5" />
              <line x1="72" y1="62" x2="680" y2="62" stroke="#94a3b8" strokeWidth="4.5" />
            </svg>

            {/* Moving Outer Slide Assembly (Animated Left-to-Right with CSS Transform) */}
            <div 
              className="absolute left-[70px] top-[40px] z-20 pointer-events-none transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${(currentPosition - 1) * 62}px)`
              }}
            >
              <svg width="420" height="90" viewBox="0 0 420 90">
                {/* Outer Slide Grip Brace */}
                <rect x="0" y="5" width="8" height="22" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1" />
                <rect x="2" y="27" width="4" height="20" fill="#f59e0b" />
                
                {/* Outer Slide Brass Tubes */}
                <line x1="0" y1="8" x2="380" y2="8" stroke="#d97706" strokeWidth="8" strokeLinecap="round" />
                <line x1="0" y1="8" x2="380" y2="8" stroke="#fbbf24" strokeWidth="4" />

                <line x1="0" y1="22" x2="380" y2="22" stroke="#d97706" strokeWidth="8" strokeLinecap="round" />
                <line x1="0" y1="22" x2="380" y2="22" stroke="#fbbf24" strokeWidth="4" />

                {/* Outer Slide U-Bow (End of Slide with Bumper) */}
                <path d="M 380 8 Q 405 8 405 15 Q 405 22 380 22" fill="none" stroke="#d97706" strokeWidth="8" />
                <path d="M 380 8 Q 405 8 405 15 Q 405 22 380 22" fill="none" stroke="#fbbf24" strokeWidth="4" />
                <circle cx="406" cy="15" r="5" fill="#0f172a" stroke="#475569" strokeWidth="1" />

                {/* Outer Slide Position Indicator Tag */}
                <rect x="-8" y="50" width="24" height="18" rx="4" fill="#fbbf24" stroke="#0f172a" strokeWidth="1" />
                <text x="4" y="63" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  P{currentPosition}
                </text>
              </svg>
            </div>

            {/* Position Tick Markers (Positions 1 to 7) */}
            <div className="absolute left-[70px] bottom-2 w-[460px] flex justify-between z-0">
              {[1, 2, 3, 4, 5, 6, 7].map(pos => (
                <button
                  key={pos}
                  onClick={() => {
                    setCurrentPosition(pos);
                    const freq = currentPartialObj.rootFreq * Math.pow(2, -(pos - 1) / 12);
                    brassAudio.playBrassTone(freq, 0.6, 'trombone');
                  }}
                  className={`flex flex-col items-center group cursor-pointer transition-all ${
                    currentPosition === pos ? 'scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className={`h-4 w-1 rounded-full mb-1 ${
                    currentPosition === pos ? 'bg-amber-400' : 'bg-slate-700 group-hover:bg-slate-500'
                  }`} />
                  <span className={`font-mono text-xs font-bold ${
                    currentPosition === pos ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {pos}
                  </span>
                  <span className="text-[9px] text-slate-500 mt-0.5">
                    {pos === 1 ? 'Closed' : pos === 3 ? 'Bell' : pos === 7 ? 'Limit' : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive C Scale Step-by-Step Slide Runner */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <span className="text-xs uppercase font-semibold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>C Major Scale on Trombone (Click any note to glide slide & hear pitch):</span>
              </span>
              <span className="text-[11px] text-slate-400">
                Notice positions jump: <strong>1st → 6th → 4th → 3rd → 1st → 4th → 2nd → 1st</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {TROMBONE_C_SCALE_STEPS.map((s, idx) => {
                const isSelected = activeScaleIndex === idx || currentPosition === s.position;
                return (
                  <button
                    key={s.step}
                    onClick={() => playScaleStep(idx)}
                    className={`flex flex-col items-center justify-between rounded-xl p-2.5 transition-all text-center border cursor-pointer ${
                      activeScaleIndex === idx
                        ? 'border-emerald-400 bg-emerald-500/20 text-white shadow-lg scale-105 ring-2 ring-emerald-400/50'
                        : isSelected
                        ? 'border-amber-400 bg-amber-400/10 text-slate-100 ring-1 ring-amber-400/30'
                        : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-mono text-slate-500">
                      Step {s.step}
                    </span>
                    <div className="my-1">
                      <div className="font-serif text-lg font-bold text-slate-100">
                        {clefView === 'treble' ? s.noteTreble.split(' ')[0] : s.noteBass}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">
                        {clefView === 'treble' ? `Sounds ${s.noteBass}` : `Band ${s.noteTreble.split(' ')[0]}`}
                      </div>
                    </div>
                    <div className="mt-1 w-full pt-1 border-t border-slate-800 text-center">
                      <span className="inline-block rounded bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                        Pos {s.position}
                      </span>
                      <div className="text-[9px] text-slate-400 truncate mt-0.5">
                        {s.landmark.split(' ')[1] || s.landmark}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* INTERACTIVE CONTROLS: POSITIONS SELECTOR & EMBOUCHURE PARTIAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: 7 Position Selector Buttons */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-semibold text-slate-300">
                  Select Trombone Slide Position (Keys 1–7):
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  {currentPosInfo.distanceInches}" extension
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map(pos => (
                  <button
                    key={pos}
                    onClick={() => {
                      setCurrentPosition(pos);
                      const freq = currentPartialObj.rootFreq * Math.pow(2, -(pos - 1) / 12);
                      brassAudio.playBrassTone(freq, 0.6, 'trombone');
                    }}
                    className={`flex flex-col items-center justify-center rounded-xl p-2.5 transition-all text-center ${
                      currentPosition === pos
                        ? 'bg-amber-400 font-bold text-slate-950 shadow-md ring-2 ring-amber-400/50'
                        : 'border border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <span className="font-mono text-sm font-bold">Pos {pos}</span>
                    <span className="text-[10px] mt-0.5 opacity-80">
                      -{pos - 1} st
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Embouchure Partial Selector */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs uppercase font-semibold text-slate-400 block mb-2">
                Embouchure Partial (Lip Tension & Air Speed):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {partials.map(p => (
                  <button
                    key={p.partial}
                    onClick={() => {
                      setSelectedPartial(p.partial);
                      const freq = p.rootFreq * Math.pow(2, -(currentPosition - 1) / 12);
                      brassAudio.playBrassTone(freq, 0.6, 'trombone');
                    }}
                    className={`rounded-xl py-2 px-2 text-center text-xs transition-colors ${
                      selectedPartial === p.partial
                        ? 'bg-amber-400 font-bold text-slate-950 shadow-sm'
                        : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-mono text-xs font-bold">P{p.partial}</div>
                    <div className="text-[10px] mt-0.5 truncate">{p.label.split(' ')[0]} {p.label.split(' ')[1]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sound & Clef Readout Box */}
          <div className="lg:col-span-5 rounded-2xl border border-amber-500/20 bg-slate-950 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs uppercase font-semibold text-slate-400">
                Clef Notation System
              </span>
              <div className="flex items-center gap-1 rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs">
                <button
                  onClick={() => setClefView('treble')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    clefView === 'treble' ? 'bg-amber-400 font-bold text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  British Treble Clef
                </button>
                <button
                  onClick={() => setClefView('bass')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    clefView === 'bass' ? 'bg-amber-400 font-bold text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Concert Bass Clef
                </button>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500 uppercase font-semibold">
                {clefView === 'treble' ? 'Written Note (British Band Treble Clef)' : 'Concert Note (Orchestral Bass Clef)'}
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-400">
                  {clefView === 'treble' ? currentTrebleNote : currentBassNote}
                </span>
                <span className="font-mono text-sm text-slate-400 tabular-nums">
                  {currentFreq.toFixed(1)} Hz
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                {clefView === 'treble' ? (
                  <span>Acoustically sounds <strong>Concert {currentBassNote}</strong> (down a major 9th)</span>
                ) : (
                  <span>In British band scores, reads as <strong>Written {currentTrebleNote}</strong></span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <div>• <strong>Current Position:</strong> {currentPosInfo.name} (-{currentPosInfo.semitonesDown} semitones)</div>
              <div>• <strong>Visual Reference:</strong> {currentPosInfo.relativeToBell}</div>
              <div>• <strong>Notes on this position:</strong> <span className="text-slate-200">{currentPosInfo.notesAvailable}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: COMPLETE 7 SLIDE POSITIONS MASTER CHART */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100 mb-2">
          The 7 Trombone Slide Positions Master Guide
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Every slide position lowers the acoustic pitch by one chromatic semitone. Here is the complete anatomical roadmap used by British brass band trombone sections:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="py-3 px-3">Position</th>
                <th className="py-3 px-3">Distance</th>
                <th className="py-3 px-3">Visual Bell Landmark</th>
                <th className="py-3 px-3">British Band Treble C Scale Note</th>
                <th className="py-3 px-3">Concert Bass Clef Note</th>
                <th className="py-3 px-3">Notes in Position</th>
                <th className="py-3 px-3 text-right">Sound</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {TROMBONE_SLIDE_POSITIONS.map(pos => (
                <tr
                  key={pos.position}
                  onClick={() => {
                    setCurrentPosition(pos.position);
                    const freq = currentPartialObj.rootFreq * Math.pow(2, -(pos.position - 1) / 12);
                    brassAudio.playBrassTone(freq, 0.6, 'trombone');
                  }}
                  className={`hover:bg-slate-800/40 cursor-pointer transition-colors ${
                    currentPosition === pos.position ? 'bg-amber-400/10' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-serif font-bold text-slate-200">
                    {pos.name}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400">
                    {pos.distanceInches}" ({pos.distanceCm} cm)
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {pos.relativeToBell}
                  </td>
                  <td className="py-3 px-3 font-bold text-amber-300">
                    {pos.position === 1 ? 'C4, G4, C5' : pos.position === 6 ? 'D4' : pos.position === 4 ? 'E4, A4' : pos.position === 3 ? 'F4' : pos.position === 2 ? 'B4' : 'Harmonics'}
                  </td>
                  <td className="py-3 px-3 font-bold text-sky-300">
                    {pos.position === 1 ? 'Bb2, F3, Bb3' : pos.position === 6 ? 'C3' : pos.position === 4 ? 'D3, G3' : pos.position === 3 ? 'Eb3' : pos.position === 2 ? 'A3' : 'Harmonics'}
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                    {pos.notesAvailable}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPosition(pos.position);
                        const freq = currentPartialObj.rootFreq * Math.pow(2, -(pos.position - 1) / 12);
                        brassAudio.playBrassTone(freq, 0.6, 'trombone');
                      }}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-slate-300 hover:bg-amber-400 hover:text-slate-950 transition-colors"
                    >
                      <Volume2 className="h-3 w-3" />
                      <span>Play</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
