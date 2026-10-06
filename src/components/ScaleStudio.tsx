import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Square, 
  Volume2, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Music,
  CheckCircle,
  Zap,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { SCALE_LESSONS, VALVE_FINGERINGS } from '../data/brassData';
import { ScaleDefinition } from '../types';
import { brassAudio } from '../audio/brassAudio';

export const ScaleStudio: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<ScaleDefinition>(SCALE_LESSONS[0]);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(0);
  const [isPlayingScale, setIsPlayingScale] = useState<boolean>(false);
  const [stopScaleFn, setStopScaleFn] = useState<(() => void) | null>(null);
  const [instrumentCategory, setInstrumentCategory] = useState<'all' | 'cornets' | 'horns' | 'lowbrass' | 'tubas' | 'studies'>('all');

  // Interactive Free-Play Valve Studio State (at bottom)
  const [freeValve1, setFreeValve1] = useState<boolean>(false);
  const [freeValve2, setFreeValve2] = useState<boolean>(false);
  const [freeValve3, setFreeValve3] = useState<boolean>(false);
  const [freeValve4, setFreeValve4] = useState<boolean>(false);
  const [embouchurePartial, setEmbouchurePartial] = useState<number>(4); // 4 = Middle C octave
  const [synthSoundStop, setSynthSoundStop] = useState<(() => void) | null>(null);

  // Active note in currently selected lesson
  const currentActiveNote = activeNoteIndex !== null ? selectedLesson.notes[activeNoteIndex] : selectedLesson.notes[0];
  const isTromboneLesson = selectedLesson.id.includes('trombone');
  const isGlockenspielLesson = selectedLesson.id.includes('glockenspiel');
  const isEuphOrBass = selectedLesson.id.includes('euphonium') || selectedLesson.id.includes('bass');

  // Derive active valves for the current note in scale
  const activeNoteValves = currentActiveNote?.valves || [];
  const activeSlidePosition = currentActiveNote?.slidePosition || 1;

  // Filter lessons by category
  const filteredLessons = SCALE_LESSONS.filter(l => {
    if (instrumentCategory === 'all') return true;
    if (instrumentCategory === 'cornets') {
      return l.id.includes('cornet') || l.id.includes('flugelhorn');
    }
    if (instrumentCategory === 'horns') {
      return l.id.includes('horn') && !l.id.includes('flugel');
    }
    if (instrumentCategory === 'lowbrass') {
      return l.id.includes('euphonium') || l.id.includes('trombone');
    }
    if (instrumentCategory === 'tubas') {
      return l.id.includes('bass') && !l.id.includes('trombone');
    }
    if (instrumentCategory === 'studies') {
      return l.id.includes('glockenspiel') || l.id.includes('transposed') || l.id.includes('arban');
    }
    return true;
  });

  // Calculate pitch for the free-play sandbox at bottom
  const getFreeValvePitch = () => {
    const partialOffsets: Record<number, number> = {
      2: -12, // C3
      3: -5,  // G3
      4: 0,   // C4
      5: 4,   // E4
      6: 7,   // G4
      8: 12   // C5
    };

    let semitonesDown = 0;
    if (freeValve4) semitonesDown += 5;
    if (freeValve1) semitonesDown += 2;
    if (freeValve2) semitonesDown += 1;
    if (freeValve3) semitonesDown += 3;

    const totalSemitoneOffset = (partialOffsets[embouchurePartial] || 0) - semitonesDown;
    const freq = 261.63 * Math.pow(2, totalSemitoneOffset / 12);
    const noteNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    const noteIndex = ((totalSemitoneOffset % 12) + 12) % 12;
    const octave = 4 + Math.floor(totalSemitoneOffset / 12);

    return {
      writtenNote: `${noteNames[noteIndex]}${octave}`,
      frequency: freq,
      semitonesDown
    };
  };

  const currentFreeValvePitch = getFreeValvePitch();

  // Keyboard shortcut for valves (1, 2, 3) in free play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === '1') setFreeValve1(v => !v);
      if (e.key === '2') setFreeValve2(v => !v);
      if (e.key === '3') setFreeValve3(v => !v);
      if (e.key === '4') setFreeValve4(v => !v);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getInstrumentTimbre = (lessonId: string, key: string): 'cornet' | 'horn' | 'euphonium' | 'bass' | 'trombone' | 'glockenspiel' => {
    if (lessonId.includes('glockenspiel')) return 'glockenspiel';
    if (lessonId.includes('trombone')) return 'trombone';
    if (lessonId.includes('bass')) return 'bass';
    if (lessonId.includes('baritone') || lessonId.includes('euphonium')) return 'euphonium';
    if (key === 'Eb' && lessonId.includes('horn')) return 'horn';
    return 'cornet';
  };

  const handlePlayScale = () => {
    if (isPlayingScale && stopScaleFn) {
      stopScaleFn();
      setIsPlayingScale(false);
      return;
    }

    const freqs = selectedLesson.notes.map(n => n.frequencyHz);
    setIsPlayingScale(true);

    const timbre = getInstrumentTimbre(selectedLesson.id, selectedLesson.instrumentKey);

    const cancel = brassAudio.playScaleSequence(
      freqs,
      560,
      idx => {
        setActiveNoteIndex(idx);
      },
      () => {
        setIsPlayingScale(false);
      },
      timbre
    );

    setStopScaleFn(() => cancel);
  };

  const handleNoteClick = (index: number) => {
    if (isPlayingScale && stopScaleFn) {
      stopScaleFn();
      setIsPlayingScale(false);
    }
    setActiveNoteIndex(index);
    const note = selectedLesson.notes[index];
    const timbre = getInstrumentTimbre(selectedLesson.id, selectedLesson.instrumentKey);
    brassAudio.playBrassTone(note.frequencyHz, 0.7, timbre);
  };

  const handleFreeBuzzPress = () => {
    if (synthSoundStop) {
      synthSoundStop();
    }
    const stop = brassAudio.playBrassTone(currentFreeValvePitch.frequency, 0.9, 'cornet');
    setSynthSoundStop(() => stop);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Studio Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Sparkles className="h-4 w-4" />
          <span>Complete British Brass Band Curriculum</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          C Scale & Fingerings for All Brass Band Instruments
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-3xl">
          Learn the foundational C Major scale for every instrument in a British brass band—from the Soprano Cornet down to the BBb Tuba, including slide movements for both Tenor and Bass Trombones, and tuned percussion. Watch the physical valves depress and the trombone slide physically move with real audio!
        </p>
      </div>

      {/* SECTION 1: MAIN INTERACTIVE INSTRUMENT SCALE MASTERCLASS */}
      <div className="mb-10 rounded-3xl border border-amber-500/30 bg-slate-900/90 p-6 sm:p-8 shadow-2xl">
        {/* Title Bar & Scale Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-md bg-amber-400/20 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-300">
                {selectedLesson.instrumentKey} Pitch
              </span>
              <span className="text-xs uppercase font-semibold text-slate-400">
                Written: {selectedLesson.writtenKey}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
              {selectedLesson.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>Instrument: <strong className="text-slate-200">{selectedLesson.instrumentName}</strong></span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">Acoustic Sound: {selectedLesson.concertKey}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayScale}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all shadow-lg active:scale-95 ${
                isPlayingScale
                  ? 'bg-rose-500 text-white hover:bg-rose-600'
                  : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
              }`}
            >
              {isPlayingScale ? (
                <>
                  <Square className="h-4 w-4 fill-white" />
                  <span>Stop Scale</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-slate-950" />
                  <span>Play Full Scale</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* INSTRUMENT CATEGORY SELECTOR PILLS */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 uppercase font-semibold mr-2 text-[11px]">Filter Category:</span>
            {[
              { id: 'all', label: 'All Instruments (13)' },
              { id: 'cornets', label: 'Cornets & Flugel' },
              { id: 'horns', label: 'Tenor & Baritone' },
              { id: 'lowbrass', label: 'Euphonium & Trombones' },
              { id: 'tubas', label: 'Tubas & Basses' },
              { id: 'studies', label: 'Percussion & Studies' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setInstrumentCategory(cat.id as any)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  instrumentCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Instrument Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {filteredLessons.map(lesson => (
              <button
                key={lesson.id}
                onClick={() => {
                  if (isPlayingScale && stopScaleFn) {
                    stopScaleFn();
                    setIsPlayingScale(false);
                  }
                  setSelectedLesson(lesson);
                  setActiveNoteIndex(0);
                  const timbre = getInstrumentTimbre(lesson.id, lesson.instrumentKey);
                  brassAudio.playBrassTone(lesson.notes[0].frequencyHz, 0.6, timbre);
                }}
                className={`rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                  selectedLesson.id === lesson.id
                    ? 'bg-amber-500/20 border-2 border-amber-400 text-amber-200 font-bold shadow-md'
                    : 'border border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {lesson.instrumentName.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* DYNAMIC PHYSICAL MECHANISM VISUALIZER (Trombone Slide vs Valve Casings vs Glockenspiel) */}
        <div className="mb-8 rounded-2xl bg-slate-950 border border-slate-800 p-5 sm:p-6 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <span className="text-xs uppercase font-semibold text-amber-400 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              <span>
                {isTromboneLesson 
                  ? `Live Animated Trombone Slide Mechanism (Step: ${currentActiveNote?.name})`
                  : isGlockenspielLesson
                  ? `Live Tuned Mallet Percussion Bar (Step: ${currentActiveNote?.name})`
                  : `Live Animated Valve Casings (Step: ${currentActiveNote?.name})`}
              </span>
            </span>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-400">Written: <strong className="text-amber-300 font-serif text-sm">{currentActiveNote?.name.split(' ')[0]}</strong></span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Sounds: <strong className="text-emerald-400 font-mono">{currentActiveNote?.concertName}</strong></span>
              <span className="text-slate-500">|</span>
              <span className="font-mono text-slate-400 text-[11px]">{currentActiveNote?.frequencyHz.toFixed(1)} Hz</span>
            </div>
          </div>

          {/* If TROMBONE is selected -> Render Animated SVG Slide */}
          {isTromboneLesson ? (
            <div className="overflow-x-auto py-2">
              <div className="min-w-[620px] h-36 relative flex items-center">
                {/* Stationary Trombone Body */}
                <svg className="absolute left-0 top-0 h-36 w-[260px] pointer-events-none z-10" viewBox="0 0 260 140">
                  {/* Mouthpiece */}
                  <rect x="5" y="35" width="18" height="10" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
                  <rect x="23" y="38" width="30" height="5" fill="#e2e8f0" />
                  {/* Bell loop */}
                  <path d="M 53 38 L 150 38 Q 180 38 180 60 Q 180 82 150 82 L 90 82" fill="none" stroke="#d97706" strokeWidth="7" strokeLinecap="round" />
                  <path d="M 53 38 L 150 38 Q 180 38 180 60 Q 180 82 150 82 L 90 82" fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
                  {/* Flaring Bell */}
                  <path d="M 170 82 C 190 80, 205 65, 220 40 L 220 105 C 205 80, 190 65, 170 62 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                  <ellipse cx="220" cy="72" rx="3.5" ry="32" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
                  {/* Bell Rim Alignment Marker */}
                  <line x1="220" y1="10" x2="220" y2="130" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="220" y="8" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">BELL RIM</text>
                  {/* Inner Slide Tubes */}
                  <line x1="53" y1="38" x2="580" y2="38" stroke="#94a3b8" strokeWidth="4" />
                  <line x1="53" y1="50" x2="580" y2="50" stroke="#94a3b8" strokeWidth="4" />
                </svg>

                {/* Outer Slide Moving Part (CSS Transform animated with position) */}
                <div 
                  className="absolute left-[52px] top-[30px] z-20 pointer-events-none transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(${(activeSlidePosition - 1) * 52}px)`
                  }}
                >
                  <svg width="340" height="70" viewBox="0 0 340 70">
                    <rect x="0" y="5" width="6" height="18" rx="1.5" fill="#d97706" />
                    <line x1="0" y1="8" x2="300" y2="8" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
                    <line x1="0" y1="8" x2="300" y2="8" stroke="#fbbf24" strokeWidth="3" />
                    <line x1="0" y1="20" x2="300" y2="20" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
                    <line x1="0" y1="20" x2="300" y2="20" stroke="#fbbf24" strokeWidth="3" />
                    <path d="M 300 8 Q 320 8 320 14 Q 320 20 300 20" fill="none" stroke="#fbbf24" strokeWidth="4" />
                    {/* Position Badge Tag */}
                    <rect x="-6" y="38" width="22" height="16" rx="3" fill="#fbbf24" />
                    <text x="5" y="49" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
                      P{activeSlidePosition}
                    </text>
                  </svg>
                </div>

                {/* 7 Position markers underneath */}
                <div className="absolute left-[52px] bottom-1 w-[380px] flex justify-between z-0">
                  {[1, 2, 3, 4, 5, 6, 7].map(pos => (
                    <div key={pos} className="flex flex-col items-center">
                      <div className={`h-3 w-1 rounded-full mb-0.5 ${activeSlidePosition === pos ? 'bg-amber-400' : 'bg-slate-700'}`} />
                      <span className={`font-mono text-[10px] font-bold ${activeSlidePosition === pos ? 'text-amber-400' : 'text-slate-500'}`}>
                        {pos}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-300 bg-slate-900/80 rounded-xl px-4 py-2 border border-slate-800">
                <div>
                  <span className="text-slate-500">Trombone Slide: </span>
                  <strong className="text-amber-300 font-bold">{currentActiveNote?.slideLabel || `Position ${activeSlidePosition}`}</strong>
                </div>
                <div className="text-[11px] text-slate-400">
                  {activeSlidePosition === 1 && 'Slide completely closed against rubber bumper'}
                  {activeSlidePosition === 2 && 'Roughly 3 inches out'}
                  {activeSlidePosition === 3 && 'Outer slide brace aligns exactly with bell rim'}
                  {activeSlidePosition === 4 && 'Outer slide extends just past bell rim'}
                  {activeSlidePosition === 5 && 'Roughly 4 inches past bell rim'}
                  {activeSlidePosition === 6 && 'Full arm extension (6th position)'}
                  {activeSlidePosition === 7 && 'Maximum reach at outer stockings'}
                </div>
              </div>
            </div>
          ) : isGlockenspielLesson ? (
            /* GLOCKENSPIEL / PERCUSSION VISUALIZER */
            <div className="py-2">
              <div className="flex items-center justify-center gap-2 sm:gap-3 py-4">
                {[
                  { name: 'C5', freq: 1046.5, height: 'h-24' },
                  { name: 'D5', freq: 1174.7, height: 'h-22' },
                  { name: 'E5', freq: 1318.5, height: 'h-20' },
                  { name: 'F5', freq: 1396.9, height: 'h-19' },
                  { name: 'G5', freq: 1568.0, height: 'h-18' },
                  { name: 'A5', freq: 1760.0, height: 'h-16' },
                  { name: 'B5', freq: 1975.5, height: 'h-15' },
                  { name: 'C6', freq: 2093.0, height: 'h-14' }
                ].map((bar, bIdx) => {
                  const isBarActive = activeNoteIndex === bIdx;
                  return (
                    <button
                      key={bar.name}
                      onClick={() => handleNoteClick(bIdx)}
                      className={`w-9 sm:w-11 ${bar.height} rounded-lg flex flex-col justify-between items-center p-1.5 transition-all shadow-md ${
                        isBarActive
                          ? 'bg-gradient-to-b from-sky-300 to-amber-300 text-slate-950 scale-105 ring-2 ring-amber-300'
                          : 'bg-gradient-to-b from-slate-700 to-slate-800 text-slate-300 hover:from-slate-600'
                      }`}
                    >
                      <div className={`h-1.5 w-1.5 rounded-full ${isBarActive ? 'bg-rose-500 animate-ping' : 'bg-slate-400'}`} />
                      <span className="font-mono text-xs font-bold">{bar.name}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-center text-xs text-slate-400">
                Strike points: High-frequency tuned steel tone bars sound crystal bell pitches 2 octaves above written pitch.
              </p>
            </div>
          ) : (
            /* VALVED BRASS INSTRUMENTS (Cornet, Soprano, Flugel, Horn, Baritone, Euphonium, Tubas) */
            <div className="py-2">
              <div className="flex items-center justify-center gap-6 sm:gap-10 py-3">
                {/* Valve 1 */}
                <div className="flex flex-col items-center">
                  <div className={`relative flex h-24 w-14 sm:h-28 sm:w-16 flex-col items-center justify-between rounded-xl border-2 transition-transform duration-200 shadow-lg ${
                    activeNoteValves.includes(1)
                      ? 'translate-y-4 border-amber-400 bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950 shadow-amber-500/30'
                      : 'border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-400'
                  }`}>
                    <span className="pt-2 font-mono text-sm font-bold">1</span>
                    <div className="h-2 w-8 rounded-full bg-slate-950/40 mb-2" />
                  </div>
                  <span className={`mt-3 text-xs font-bold ${activeNoteValves.includes(1) ? 'text-amber-300' : 'text-slate-400'}`}>
                    Valve 1 {activeNoteValves.includes(1) ? '(DOWN)' : '(UP)'}
                  </span>
                  <span className="text-[10px] text-slate-500">-2 semitones</span>
                </div>

                {/* Valve 2 */}
                <div className="flex flex-col items-center">
                  <div className={`relative flex h-24 w-14 sm:h-28 sm:w-16 flex-col items-center justify-between rounded-xl border-2 transition-transform duration-200 shadow-lg ${
                    activeNoteValves.includes(2)
                      ? 'translate-y-4 border-amber-400 bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950 shadow-amber-500/30'
                      : 'border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-400'
                  }`}>
                    <span className="pt-2 font-mono text-sm font-bold">2</span>
                    <div className="h-2 w-8 rounded-full bg-slate-950/40 mb-2" />
                  </div>
                  <span className={`mt-3 text-xs font-bold ${activeNoteValves.includes(2) ? 'text-amber-300' : 'text-slate-400'}`}>
                    Valve 2 {activeNoteValves.includes(2) ? '(DOWN)' : '(UP)'}
                  </span>
                  <span className="text-[10px] text-slate-500">-1 semitone</span>
                </div>

                {/* Valve 3 */}
                <div className="flex flex-col items-center">
                  <div className={`relative flex h-24 w-14 sm:h-28 sm:w-16 flex-col items-center justify-between rounded-xl border-2 transition-transform duration-200 shadow-lg ${
                    activeNoteValves.includes(3)
                      ? 'translate-y-4 border-amber-400 bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950 shadow-amber-500/30'
                      : 'border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-400'
                  }`}>
                    <span className="pt-2 font-mono text-sm font-bold">3</span>
                    <div className="h-2 w-8 rounded-full bg-slate-950/40 mb-2" />
                  </div>
                  <span className={`mt-3 text-xs font-bold ${activeNoteValves.includes(3) ? 'text-amber-300' : 'text-slate-400'}`}>
                    Valve 3 {activeNoteValves.includes(3) ? '(DOWN)' : '(UP)'}
                  </span>
                  <span className="text-[10px] text-slate-500">-3 semitones</span>
                </div>

                {/* Optional 4th valve (Euphonium & Tubas) */}
                {isEuphOrBass && (
                  <div className="flex flex-col items-center">
                    <div className={`relative flex h-20 w-12 sm:h-24 sm:w-14 flex-col items-center justify-between rounded-xl border-2 transition-transform duration-200 shadow-lg ${
                      activeNoteValves.includes(4)
                        ? 'translate-y-4 border-sky-400 bg-gradient-to-b from-sky-400 to-sky-600 text-slate-950'
                        : 'border-slate-800 bg-slate-900 text-slate-500'
                    }`}>
                      <span className="pt-1.5 font-mono text-xs font-bold">4</span>
                      <div className="h-2 w-6 rounded-full bg-slate-950/40 mb-2" />
                    </div>
                    <span className="mt-3 text-xs font-bold text-slate-400">
                      4th (Comp)
                    </span>
                    <span className="text-[10px] text-slate-500">-5 semitones</span>
                  </div>
                )}
              </div>

              <div className="mt-2 text-center text-xs text-slate-300">
                <span className="text-slate-500">Active Valve Combo: </span>
                <strong className="text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  {currentActiveNote?.valveLabel || 'Open'}
                </strong>
                <span className="text-slate-400 ml-2">
                  {activeNoteValves.length === 0 ? '(Natural harmonics without lengthening tube)' : `(Adds ${activeNoteValves.reduce((a, b) => a + (b === 1 ? 2 : b === 2 ? 1 : b === 3 ? 3 : 5), 0)} semitones of tubing)`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* SCALE NOTES VISUAL LADDER (Click any note to play & see fingerings) */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="uppercase font-semibold">Scale Degrees (Click any card to audition & see mechanism):</span>
            <span className="text-amber-300 font-medium">8 Steps</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {selectedLesson.notes.map((note, index) => {
              const isActive = activeNoteIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => handleNoteClick(index)}
                  className={`flex flex-col items-center justify-between rounded-2xl p-3.5 transition-all border text-center cursor-pointer ${
                    isActive
                      ? 'border-amber-400 bg-amber-400/20 text-slate-100 shadow-xl scale-105 ring-2 ring-amber-400/60'
                      : 'border-slate-800 bg-slate-950/90 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono text-slate-500">
                    Step {index + 1}
                  </span>

                  <div className="my-2">
                    <div className="font-serif text-2xl font-bold text-slate-100">
                      {note.name.split(' ')[0]}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      Sounds {note.concertName}
                    </div>
                  </div>

                  <div className="mt-1 w-full pt-2 border-t border-slate-800/80">
                    <div className="text-xs font-bold text-amber-300 truncate">
                      {note.slideLabel || note.valveLabel}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                      {note.frequencyHz.toFixed(1)} Hz
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lesson Description & Educational Breakdown */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs sm:text-sm text-slate-300 leading-relaxed flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="flex-1">{selectedLesson.explanation}</p>
          <span className="shrink-0 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-300">
            British Band Treble Clef Standard
          </span>
        </div>
      </div>

      {/* SECTION 2: FREE-PLAY 3-VALVE SYNTHESIZER SANDBOX */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-100">
              Interactive Free-Play 3-Valve Laboratory
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Experiment with arbitrary valve combinations and embouchure partials to discover every pitch on the horn.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFreeBuzzPress}
              className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-300 transition-colors shadow-md active:scale-95"
            >
              <Zap className="h-4 w-4" />
              <span>Buzz Combination</span>
            </button>
            <button
              onClick={() => {
                setFreeValve1(false);
                setFreeValve2(false);
                setFreeValve3(false);
                setFreeValve4(false);
              }}
              className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-400 hover:text-white"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Valve toggles */}
          <div className="lg:col-span-6 flex items-center justify-center gap-4 sm:gap-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
            {[
              { val: 1, state: freeValve1, set: setFreeValve1, label: '-2 st' },
              { val: 2, state: freeValve2, set: setFreeValve2, label: '-1 st' },
              { val: 3, state: freeValve3, set: setFreeValve3, label: '-3 st' },
              { val: 4, state: freeValve4, set: setFreeValve4, label: '-5 st (4th)' }
            ].map(v => (
              <div key={v.val} className="flex flex-col items-center">
                <button
                  onClick={() => v.set(!v.state)}
                  className={`h-20 w-12 sm:h-24 sm:w-14 rounded-xl border-2 flex flex-col justify-between items-center p-2 transition-transform shadow-md ${
                    v.state
                      ? 'translate-y-3 border-amber-400 bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/20'
                      : 'border-slate-700 bg-slate-800 text-slate-400'
                  }`}
                >
                  <span className="font-mono text-xs font-bold">{v.val}</span>
                  <div className="h-2 w-6 rounded-full bg-slate-950/40" />
                </button>
                <span className="mt-2 text-[11px] font-bold text-slate-300">Valve {v.val}</span>
                <span className="text-[10px] text-slate-500">{v.label}</span>
              </div>
            ))}
          </div>

          {/* Sound & partial selection */}
          <div className="lg:col-span-6 space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs uppercase font-semibold text-slate-400 block mb-2">
                Embouchure Partial (Lip Tension):
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { partial: 2, label: 'Low C3' },
                  { partial: 3, label: 'Mid G3' },
                  { partial: 4, label: 'Std C4' },
                  { partial: 5, label: 'High E4' },
                  { partial: 6, label: 'Top G4' }
                ].map(p => (
                  <button
                    key={p.partial}
                    onClick={() => setEmbouchurePartial(p.partial)}
                    className={`rounded-lg py-1.5 px-1 text-center text-xs transition-colors ${
                      embouchurePartial === p.partial
                        ? 'bg-amber-400 font-bold text-slate-950'
                        : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-mono text-xs font-bold">P{p.partial}</div>
                    <div className="text-[9px] truncate">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Resulting Written Note:</span>
                <div className="font-serif text-2xl font-bold text-amber-400">
                  {currentFreeValvePitch.writtenNote}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Frequency:</span>
                <div className="font-mono text-sm text-slate-300">
                  {currentFreeValvePitch.frequency.toFixed(1)} Hz
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
