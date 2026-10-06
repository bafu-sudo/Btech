import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Square, 
  Volume2, 
  Sparkles, 
  Activity, 
  Clock, 
  Music,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { brassAudio } from '../audio/brassAudio';

export const PercussionLab: React.FC = () => {
  const [isPlayingMarch, setIsPlayingMarch] = useState<boolean>(false);
  const [tempo, setTempo] = useState<number>(120); // 120 BPM standard British march
  const [currentBeat, setCurrentBeat] = useState<number>(1);
  const [activePad, setActivePad] = useState<string | null>(null);
  const marchTimerRef = useRef<number | null>(null);

  const percussionInstruments = [
    {
      id: 'snare',
      name: 'Side Drum (Snare)',
      role: 'Military cadence, rolls, 5-stroke patterns',
      hotkey: 'S',
      color: 'from-amber-600 to-amber-700'
    },
    {
      id: 'bassdrum',
      name: 'Concert Bass Drum',
      role: 'Downbeat pulse (beats 1 & 2 in 2/4 march)',
      hotkey: 'B',
      color: 'from-rose-700 to-rose-900'
    },
    {
      id: 'cymbal',
      name: 'Clash Cymbals',
      role: 'Tutti climaxes and march accents',
      hotkey: 'C',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: 'timpani',
      name: 'Timpani (Kettle Drums)',
      role: 'Tuned harmonic foundation in F & C',
      hotkey: 'T',
      color: 'from-sky-700 to-indigo-900'
    },
    {
      id: 'glockenspiel',
      name: 'Glockenspiel',
      role: 'High octave bell melodies and sparkles',
      hotkey: 'G',
      color: 'from-emerald-600 to-teal-800'
    }
  ];

  const handleTriggerPercussion = (type: 'snare' | 'bassdrum' | 'cymbal' | 'timpani' | 'glockenspiel') => {
    setActivePad(type);
    brassAudio.playPercussion(type);
    setTimeout(() => {
      setActivePad(null);
    }, 150);
  };

  // Keyboard controls for percussion pads
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const k = e.key.toLowerCase();
      if (k === 's') handleTriggerPercussion('snare');
      if (k === 'b') handleTriggerPercussion('bassdrum');
      if (k === 'c') handleTriggerPercussion('cymbal');
      if (k === 't') handleTriggerPercussion('timpani');
      if (k === 'g') handleTriggerPercussion('glockenspiel');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // British 2/4 March Beat Engine (Beat 1: Bass drum + Cymbal, Beat 2: Snare accent, with offbeat quavers)
  useEffect(() => {
    if (!isPlayingMarch) {
      if (marchTimerRef.current) clearInterval(marchTimerRef.current);
      return;
    }

    const intervalMs = (60 / tempo) * 1000;
    let beat = 1;

    marchTimerRef.current = window.setInterval(() => {
      setCurrentBeat(beat);

      if (beat === 1) {
        // Beat 1: Heavy Bass Drum pulse
        brassAudio.playPercussion('bassdrum');
      } else if (beat === 2) {
        // Beat 2: Crisp Snare crack
        brassAudio.playPercussion('snare');
      }

      beat = beat === 1 ? 2 : 1;
    }, intervalMs);

    return () => {
      if (marchTimerRef.current) clearInterval(marchTimerRef.current);
    };
  }, [isPlayingMarch, tempo]);

  const toggleMarchEngine = () => {
    setIsPlayingMarch(!isPlayingMarch);
  };

  const rhythmValues = [
    {
      name: 'Semibreve (Whole Note)',
      beats: '4 Beats',
      symbol: '𝅝',
      britishTradition: 'Held for 4 full beats. Used in solemn hymn tunes like "Crimond" or "Deep Harmony".'
    },
    {
      name: 'Minim (Half Note)',
      beats: '2 Beats',
      symbol: '𝅗𝅥',
      britishTradition: 'Half the length of a semibreve. Drives lyrical cantabile melodies across the cornet and horn sections.'
    },
    {
      name: 'Crotchet (Quarter Note)',
      beats: '1 Beat',
      symbol: '𝅘𝅥',
      britishTradition: 'The heartbeat of brass band marching. In 2/4 march time, each measure contains two crotchet beats.'
    },
    {
      name: 'Quaver (Eighth Note)',
      beats: '1/2 Beat',
      symbol: '𝅘𝅥𝅮',
      britishTradition: 'Often played as crisp off-beats by the Tenor Horns and 2nd/3rd cornets in British street marches.'
    },
    {
      name: 'Semiquaver (Sixteenth Note)',
      beats: '1/4 Beat',
      symbol: '𝅘𝅥𝅯',
      britishTradition: 'Fast technical passages, double and triple-tongued flourishes in Arban cornet variations.'
    },
    {
      name: 'Triplet',
      beats: '3 in the time of 2',
      symbol: '3 𝅘𝅥',
      britishTradition: 'Classic 6/8 march swing ("The Floral Dance") or fanfare fanfares ("Knight Templar").'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Sparkles className="h-4 w-4" />
          <span>British Brass Band Percussion & Rhythm Studio</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          Percussion Instruments & Rhythm Masterclass
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
          In a British brass band, percussion provides the heartbeat, precision tempo, and dramatic thunder. Learn note durations, master the 2/4 street march, and play interactive percussion instruments.
        </p>
      </div>

      {/* SECTION 1: INTERACTIVE PERCUSSION SOUNDBOARD */}
      <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-100">
              Interactive Band Percussion Pads
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Click the pads or use keyboard shortcuts (<kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-amber-300">S</kbd>, <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-amber-300">B</kbd>, <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-amber-300">C</kbd>, <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-amber-300">T</kbd>, <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-amber-300">G</kbd>) to trigger authentic synthesized percussion.
            </p>
          </div>
        </div>

        {/* Percussion Pads Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {percussionInstruments.map(pad => {
            const isPressed = activePad === pad.id;
            return (
              <button
                key={pad.id}
                onClick={() => handleTriggerPercussion(pad.id as any)}
                className={`relative flex h-36 flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                  isPressed
                    ? 'scale-95 border-amber-400 bg-amber-400/20 ring-2 ring-amber-400/50 shadow-xl'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-amber-400">
                    {pad.hotkey}
                  </span>
                  <Activity className="h-4 w-4 text-slate-500" />
                </div>

                <div>
                  <h3 className="font-serif text-base font-bold text-slate-100">
                    {pad.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {pad.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: BRITISH MARCH TEMPO SIMULATOR */}
      <div className="mb-10 rounded-2xl border border-amber-500/30 bg-slate-900/90 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              Rhythm & March Tempo Trainer
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
              The Whit Friday 2/4 Street March Beat
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              British brass bands march at a precise tempo (typically 120 or 128 Beats Per Minute). Beat 1 is anchored by the deep bass drum, and beat 2 is locked in by the side drum rim and snare snap.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Visual Beat Indicator */}
            <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Beat 1</span>
                <span className={`inline-block h-6 w-6 rounded-full mt-1 transition-all ${
                  isPlayingMarch && currentBeat === 1 ? 'bg-rose-500 shadow-lg shadow-rose-500/50 scale-110' : 'bg-slate-800'
                }`} />
              </div>
              <span className="text-slate-600 font-mono">—</span>
              <div className="text-center">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Beat 2</span>
                <span className={`inline-block h-6 w-6 rounded-full mt-1 transition-all ${
                  isPlayingMarch && currentBeat === 2 ? 'bg-amber-400 shadow-lg shadow-amber-400/50 scale-110' : 'bg-slate-800'
                }`} />
              </div>
            </div>

            {/* Play/Stop Button */}
            <button
              onClick={toggleMarchEngine}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all shadow-md whitespace-nowrap ${
                isPlayingMarch
                  ? 'bg-rose-500 text-white hover:bg-rose-600'
                  : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
              }`}
            >
              {isPlayingMarch ? (
                <>
                  <Square className="h-4 w-4 fill-white" />
                  <span>Stop March Pulse</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-slate-950" />
                  <span>Start March Pulse (120 BPM)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3: NOTE VALUES & RHYTHMIC NOTATION */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-100 mb-2">
          Rhythm & Note Duration Guide
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Understanding note values allows you to count and play cornet and brass band parts with rock-solid rhythm:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rhythmValues.map((rv, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-slate-200">{rv.name}</span>
                  <span className="font-mono text-xs font-bold text-amber-400">{rv.beats}</span>
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {rv.britishTradition}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">Brass Band Role</span>
                <span className="text-amber-300 font-medium">Standard Notation</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
