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
  Zap
} from 'lucide-react';
import { SCALE_LESSONS, VALVE_FINGERINGS } from '../data/brassData';
import { ScaleDefinition } from '../types';
import { brassAudio } from '../audio/brassAudio';

export const ScaleStudio: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<ScaleDefinition>(SCALE_LESSONS[0]);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(null);
  const [isPlayingScale, setIsPlayingScale] = useState<boolean>(false);
  const [stopScaleFn, setStopScaleFn] = useState<(() => void) | null>(null);

  // Interactive Valve Studio State
  const [valve1, setValve1] = useState<boolean>(false);
  const [valve2, setValve2] = useState<boolean>(false);
  const [valve3, setValve3] = useState<boolean>(false);
  const [valve4, setValve4] = useState<boolean>(false);
  const [embouchurePartial, setEmbouchurePartial] = useState<number>(4); // 4 = Middle C octave
  const [synthSoundStop, setSynthSoundStop] = useState<(() => void) | null>(null);

  // Calculate pitch based on valves & partial
  // Open partial 4 = C4 (261.63 Hz for C instrument, or written C4)
  const getValvePitch = () => {
    // Base semitones for partials (relative to C4 = 0)
    // Partial 2 = C3 (-12), Partial 3 = G3 (-5), Partial 4 = C4 (0), Partial 5 = E4 (+4), Partial 6 = G4 (+7), Partial 8 = C5 (+12)
    const partialOffsets: Record<number, number> = {
      2: -12, // C3
      3: -5,  // G3
      4: 0,   // C4
      5: 4,   // E4
      6: 7,   // G4
      8: 12   // C5
    };

    let semitonesDown = 0;
    if (valve4) semitonesDown += 5; // 4th valve lowers by 5 semitones (perfect 4th)
    if (valve1) semitonesDown += 2; // 1st valve lowers by 2 semitones
    if (valve2) semitonesDown += 1; // 2nd valve lowers by 1 semitone
    if (valve3) semitonesDown += 3; // 3rd valve lowers by 3 semitones

    const totalSemitoneOffset = (partialOffsets[embouchurePartial] || 0) - semitonesDown;
    // Written C4 = 261.63 Hz
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

  const currentValvePitch = getValvePitch();

  // Keyboard shortcut for valves (1, 2, 3)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === '1') setValve1(v => !v);
      if (e.key === '2') setValve2(v => !v);
      if (e.key === '3') setValve3(v => !v);
      if (e.key === '4') setValve4(v => !v);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePlayScale = () => {
    if (isPlayingScale && stopScaleFn) {
      stopScaleFn();
      setIsPlayingScale(false);
      setActiveNoteIndex(null);
      return;
    }

    const freqs = selectedLesson.notes.map(n => n.frequencyHz);
    setIsPlayingScale(true);

    const cancel = brassAudio.playScaleSequence(
      freqs,
      500,
      idx => {
        setActiveNoteIndex(idx);
      },
      () => {
        setIsPlayingScale(false);
        setActiveNoteIndex(null);
      },
      selectedLesson.instrumentKey === 'Eb' ? 'horn' : 'cornet'
    );

    setStopScaleFn(() => cancel);
  };

  const handleBuzzPress = () => {
    if (synthSoundStop) {
      synthSoundStop();
    }
    const stop = brassAudio.playBrassTone(currentValvePitch.frequency, 0.9, 'cornet');
    setSynthSoundStop(() => stop);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Studio Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Sparkles className="h-4 w-4" />
          <span>Interactive Valve & Scale Laboratory</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          Brass Sound Engine & Scale Masterclass
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
          Experience real brass acoustics synthesized directly in your browser. Practice the C Scale in Bb & Eb, understand D Major transposition, and operate the 3-valve system.
        </p>
      </div>

      {/* SECTION 1: INTERACTIVE VALVE SYNTHESIZER */}
      <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-100">
              Interactive 3-Valve Brass Simulator
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Press valves 1, 2, 3 (or use keys <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-amber-300">1</kbd>, <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-amber-300">2</kbd>, <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-amber-300">3</kbd>) to lengthen the air column and lower the pitch.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBuzzPress}
              className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition-colors shadow-lg active:scale-95"
            >
              <Zap className="h-4 w-4 fill-slate-950" />
              <span>Buzz & Sound Valve Combo</span>
            </button>
          </div>
        </div>

        {/* Valve Controls Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3 Valves Graphic */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
              Instrument Valve Casings (Click to Toggle)
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-8">
              {/* Valve 1 */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setValve1(!valve1)}
                  aria-label="Toggle Valve 1"
                  className={`relative flex h-24 w-14 sm:h-28 sm:w-16 flex-col items-center justify-between rounded-xl border-2 transition-all shadow-md ${
                    valve1
                      ? 'translate-y-4 border-amber-400 bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/20'
                      : 'border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className="pt-2 font-mono text-sm font-bold">1</span>
                  <div className="h-3 w-8 rounded-full bg-slate-950/40 mb-2"></div>
                </button>
                <span className="mt-3 text-xs font-semibold text-slate-300">Valve 1</span>
                <span className="text-[10px] text-slate-500">-2 semitones</span>
              </div>

              {/* Valve 2 */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setValve2(!valve2)}
                  aria-label="Toggle Valve 2"
                  className={`relative flex h-24 w-14 sm:h-28 sm:w-16 flex-col items-center justify-between rounded-xl border-2 transition-all shadow-md ${
                    valve2
                      ? 'translate-y-4 border-amber-400 bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/20'
                      : 'border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className="pt-2 font-mono text-sm font-bold">2</span>
                  <div className="h-3 w-8 rounded-full bg-slate-950/40 mb-2"></div>
                </button>
                <span className="mt-3 text-xs font-semibold text-slate-300">Valve 2</span>
                <span className="text-[10px] text-slate-500">-1 semitone</span>
              </div>

              {/* Valve 3 */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setValve3(!valve3)}
                  aria-label="Toggle Valve 3"
                  className={`relative flex h-24 w-14 sm:h-28 sm:w-16 flex-col items-center justify-between rounded-xl border-2 transition-all shadow-md ${
                    valve3
                      ? 'translate-y-4 border-amber-400 bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/20'
                      : 'border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className="pt-2 font-mono text-sm font-bold">3</span>
                  <div className="h-3 w-8 rounded-full bg-slate-950/40 mb-2"></div>
                </button>
                <span className="mt-3 text-xs font-semibold text-slate-300">Valve 3</span>
                <span className="text-[10px] text-slate-500">-3 semitones</span>
              </div>

              {/* Optional 4th valve toggle */}
              <div className="flex flex-col items-center opacity-85">
                <button
                  onClick={() => setValve4(!valve4)}
                  aria-label="Toggle 4th Compensating Valve"
                  className={`relative flex h-20 w-12 sm:h-24 sm:w-14 flex-col items-center justify-between rounded-xl border-2 transition-all shadow-md ${
                    valve4
                      ? 'translate-y-4 border-sky-400 bg-gradient-to-b from-sky-500 to-sky-600 text-slate-950'
                      : 'border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <span className="pt-2 font-mono text-xs font-bold">4</span>
                  <div className="h-2 w-6 rounded-full bg-slate-950/40 mb-2"></div>
                </button>
                <span className="mt-3 text-xs font-semibold text-slate-400">4th (Euph/Bass)</span>
                <span className="text-[10px] text-slate-500">-5 semitones</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => {
                  setValve1(false);
                  setValve2(false);
                  setValve3(false);
                  setValve4(false);
                }}
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset to Open</span>
              </button>
            </div>
          </div>

          {/* Real-time acoustic readout */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-amber-500/20 bg-slate-950 p-5">
              <div className="text-xs uppercase font-semibold text-slate-400 mb-1">
                Acoustic Pitch Produced:
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-3xl font-bold text-amber-400">
                  {currentValvePitch.writtenNote}
                </span>
                <span className="font-mono text-sm text-slate-400 tabular-nums">
                  {currentValvePitch.frequency.toFixed(1)} Hz
                </span>
              </div>

              <div className="mt-3 text-xs text-slate-300">
                <span className="text-slate-500">Valve shift: </span>
                <span className="font-mono font-bold text-amber-300">
                  -{currentValvePitch.semitonesDown} semitones
                </span>
              </div>
            </div>

            {/* Embouchure Harmonic Series (Lip tension) */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <div className="text-xs uppercase font-semibold text-slate-400 mb-2">
                Embouchure Partial (Lip Tightness):
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { partial: 2, label: 'Pedal / Low C3' },
                  { partial: 3, label: 'Mid 5th G3' },
                  { partial: 4, label: 'Standard C4' },
                  { partial: 5, label: 'High 3rd E4' },
                  { partial: 6, label: 'High 5th G4' }
                ].map(p => (
                  <button
                    key={p.partial}
                    onClick={() => setEmbouchurePartial(p.partial)}
                    className={`rounded-lg py-2 px-1 text-center text-xs transition-colors ${
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

            {/* Valve combo cheat reference */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">British Brass Band Standard Combinations:</div>
              <div>• <strong>Open:</strong> Natural tube length (C, G, C, E, G)</div>
              <div>• <strong>2nd Valve:</strong> B, F#, B (-1 semitone)</div>
              <div>• <strong>1st Valve:</strong> Bb, F, Bb (-2 semitones)</div>
              <div>• <strong>1st + 2nd:</strong> A, E, A (-3 semitones)</div>
              <div>• <strong>1st + 3rd:</strong> Low D, G (-5 semitones)</div>
              <div>• <strong>1st + 2nd + 3rd:</strong> F#, C# (-6 semitones)</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: SCALE MASTERCLASS RUNNER */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div>
            <div className="text-xs uppercase font-semibold text-amber-400 mb-1">
              Curriculum Lessons
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
              {selectedLesson.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>Instrument: {selectedLesson.instrumentName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-medium">Sounding: {selectedLesson.concertKey}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayScale}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all shadow-md ${
                isPlayingScale
                  ? 'bg-rose-500 text-white hover:bg-rose-600'
                  : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
              }`}
            >
              {isPlayingScale ? (
                <>
                  <Square className="h-4 w-4 fill-white" />
                  <span>Stop Playback</span>
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

        {/* Lesson Selector Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {SCALE_LESSONS.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => {
                if (isPlayingScale && stopScaleFn) {
                  stopScaleFn();
                  setIsPlayingScale(false);
                }
                setSelectedLesson(lesson);
                setActiveNoteIndex(null);
              }}
              className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
                selectedLesson.id === lesson.id
                  ? 'bg-amber-400 font-bold text-slate-950 shadow-sm'
                  : 'border border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {lesson.title.split(' on ')[0]}
            </button>
          ))}
        </div>

        {/* Explanation callout */}
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {selectedLesson.explanation}
        </div>

        {/* Scale Notes Visual Ladder */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {selectedLesson.notes.map((note, index) => {
            const isActive = activeNoteIndex === index;

            return (
              <button
                key={index}
                onClick={() => {
                  setActiveNoteIndex(index);
                  brassAudio.playBrassTone(
                    note.frequencyHz,
                    0.6,
                    selectedLesson.instrumentKey === 'Eb' ? 'horn' : 'cornet'
                  );
                }}
                className={`flex flex-col items-center justify-between rounded-2xl p-4 transition-all border text-center ${
                  isActive
                    ? 'border-amber-400 bg-amber-400/20 text-slate-100 shadow-lg scale-105 ring-2 ring-amber-400/50'
                    : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
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
                    {note.concertName}
                  </div>
                </div>

                <div className="mt-2 w-full pt-2 border-t border-slate-800/80">
                  <div className="text-xs font-bold text-amber-300">
                    {note.valveLabel}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {note.frequencyHz.toFixed(1)} Hz
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
