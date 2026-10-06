import React, { useState } from 'react';
import { 
  Music, 
  HelpCircle, 
  Volume2, 
  ArrowRight, 
  Layers, 
  Award, 
  BookOpen,
  Sparkles,
  Info
} from 'lucide-react';
import { BRASS_INSTRUMENTS, TRANSPOSITION_PRINCIPLES, BRITISH_BAND_SECTIONS } from '../data/brassData';
import { BrassInstrumentInfo } from '../types';
import { brassAudio } from '../audio/brassAudio';

export const BrassAcademy: React.FC = () => {
  const [selectedInstrument, setSelectedInstrument] = useState<BrassInstrumentInfo>(BRASS_INSTRUMENTS[0]);
  const [activeSubTab, setActiveSubTab] = useState<'transposition' | 'd-to-c' | 'instruments' | 'band-layout'>('transposition');
  
  // Interactive Transposition Explorer State
  const [transposerRoot, setTransposerRoot] = useState<string>('C');
  const [transposerInst, setTransposerInst] = useState<'Bb' | 'Eb'>('Bb');

  const notesList = [
    { written: 'C', freqBb: 233.08, concertBb: 'Bb', freqEb: 311.13, concertEb: 'Eb', valves: 'Open' },
    { written: 'D', freqBb: 261.63, concertBb: 'C', freqEb: 349.23, concertEb: 'F', valves: '1 + 3' },
    { written: 'E', freqBb: 293.66, concertBb: 'D', freqEb: 392.00, concertEb: 'G', valves: '1 + 2' },
    { written: 'F', freqBb: 311.13, concertBb: 'Eb', freqEb: 415.30, concertEb: 'Ab', valves: '1st' },
    { written: 'G', freqBb: 349.23, concertBb: 'F', freqEb: 466.16, concertEb: 'Bb', valves: 'Open' },
    { written: 'A', freqBb: 392.00, concertBb: 'G', freqEb: 523.25, concertEb: 'C', valves: '1 + 2' },
    { written: 'B', freqBb: 440.00, concertBb: 'A', freqEb: 587.33, concertEb: 'D', valves: '2nd' },
    { written: 'High C', freqBb: 466.16, concertBb: 'Bb', freqEb: 622.25, concertEb: 'Eb', valves: 'Open' }
  ];

  const playNoteAudio = (freq: number) => {
    brassAudio.playBrassTone(freq, 0.6, selectedInstrument.fundamentalKey === 'Eb' ? 'horn' : 'cornet');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Hero Banner */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-amber-500/30 bg-slate-900 shadow-2xl">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-8 sm:p-10 lg:col-span-7 z-10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>British Brass Band Academy</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 leading-tight">
              Master the British Brass Band Tradition
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              From the champion colliery bands of Yorkshire to the Royal Albert Hall. Learn the genius of Treble Clef transposition, master the C scale in Bb & Eb, and learn how D major shifts down to C major.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="font-semibold text-amber-300">Curriculum:</span>
              <span>Bb Cornets</span>
              <span aria-hidden="true">·</span>
              <span>Eb Soprano Cornet</span>
              <span aria-hidden="true">·</span>
              <span>Eb Tenor Horns</span>
              <span aria-hidden="true">·</span>
              <span>Euphoniums & Baritones</span>
              <span aria-hidden="true">·</span>
              <span>Trombones</span>
              <span aria-hidden="true">·</span>
              <span>EEb & BBb Basses</span>
              <span aria-hidden="true">·</span>
              <span>Timpani & Percussion</span>
              <span aria-hidden="true">·</span>
              <span>28-Piece Ensemble Layout</span>
            </div>
          </div>

          <div className="relative lg:col-span-5 h-64 lg:h-full min-h-[260px] overflow-hidden">
            <img
              src="/src/assets/images/brass_instruments_hero_1791290148558.jpg"
              alt="Warm golden British brass band cornet and tenor horn on music stand"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('transposition')}
          className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
            activeSubTab === 'transposition'
              ? 'bg-amber-400 text-slate-950'
              : 'border border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          C Scale in Bb & Eb Transposition
        </button>

        <button
          onClick={() => setActiveSubTab('d-to-c')}
          className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
            activeSubTab === 'd-to-c'
              ? 'bg-amber-400 text-slate-950'
              : 'border border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          D Major to C Major Tutorial
        </button>

        <button
          onClick={() => setActiveSubTab('instruments')}
          className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
            activeSubTab === 'instruments'
              ? 'bg-amber-400 text-slate-950'
              : 'border border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          The 10 Brass Band Instruments
        </button>

        <button
          onClick={() => setActiveSubTab('band-layout')}
          className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
            activeSubTab === 'band-layout'
              ? 'bg-amber-400 text-slate-950'
              : 'border border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          28-Piece Band Seating Layout
        </button>
      </div>

      {/* SUB-TAB 1: TRANSPOSITION ENGINE */}
      {activeSubTab === 'transposition' && (
        <div className="space-y-8">
          {/* Why Treble Clef Explainer Box */}
          <div className="rounded-2xl border border-amber-500/20 bg-slate-900/80 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  The Ingenious British Brass Band Secret: The Treble Clef Standard
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {TRANSPOSITION_PRINCIPLES.whyTrebleClef}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-amber-300">
                  <span>✓ Written C is ALWAYS Open</span>
                  <span>✓ Written D is ALWAYS 1st + 3rd</span>
                  <span>✓ Written E is ALWAYS 1st + 2nd</span>
                  <span>✓ Written F is ALWAYS 1st</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side by side: C Scale in Bb vs C Scale in Eb */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bb Instruments */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Bb Key Family
                  </span>
                  <span className="text-xs text-slate-400">Cornets, Flugel, Baritones, Euphoniums, BBb Bass</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-100">
                  C Scale on Bb Instruments
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  When a Bb Cornet or BBb Bass player reads a written <strong>C Major</strong> scale, the instrument acoustically sounds a <strong>Concert Bb Major scale</strong> (a Major 2nd lower).
                </p>

                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs">
                  <div className="font-semibold text-slate-200 mb-1">Key Rule:</div>
                  <div className="text-amber-300 font-mono">Written Note - 2 semitones = Concert Pitch</div>
                  <div className="text-slate-400 mt-1">Written C4 (no sharps/flats) sounds Concert Bb3 (2 flats: Bb, Eb).</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Interactive Note Soundboard (Click to hear):
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {notesList.map((n, idx) => (
                    <button
                      key={idx}
                      onClick={() => playNoteAudio(n.freqBb)}
                      className="group flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950 p-2.5 hover:border-amber-400 hover:bg-slate-900 transition-all text-center"
                    >
                      <span className="font-serif text-base font-bold text-slate-100 group-hover:text-amber-400">
                        {n.written}
                      </span>
                      <span className="text-[11px] text-amber-300/90 font-mono">
                        Sounds {n.concertBb}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {n.valves}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Eb Instruments */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Eb Key Family
                  </span>
                  <span className="text-xs text-slate-400">Tenor Horns, Soprano Cornet, EEb Bass</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-100">
                  C Scale on Eb Instruments
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  When an Eb Tenor Horn or EEb Bass player reads the written <strong>C Major</strong> scale, the instrument acoustically sounds a <strong>Concert Eb Major scale</strong> (a Major 6th higher / minor 3rd lower).
                </p>

                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs">
                  <div className="font-semibold text-slate-200 mb-1">Key Rule:</div>
                  <div className="text-sky-300 font-mono">Written Note + 9 semitones (or -3 down octave) = Concert Pitch</div>
                  <div className="text-slate-400 mt-1">Written C4 sounds Concert Eb4 (3 flats: Bb, Eb, Ab).</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Interactive Note Soundboard (Click to hear):
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {notesList.map((n, idx) => (
                    <button
                      key={idx}
                      onClick={() => playNoteAudio(n.freqEb)}
                      className="group flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950 p-2.5 hover:border-sky-400 hover:bg-slate-900 transition-all text-center"
                    >
                      <span className="font-serif text-base font-bold text-slate-100 group-hover:text-sky-400">
                        {n.written}
                      </span>
                      <span className="text-[11px] text-sky-300/90 font-mono">
                        Sounds {n.concertEb}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {n.valves}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Transposition Calculator */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h3 className="font-serif text-lg font-bold text-slate-100 mb-2">
              Interactive Brass Band Transposition Calculator
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Select your instrument key and a written note to see its sounding concert pitch, fingerings, and frequency in real time.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-300">Instrument Type:</span>
                <button
                  onClick={() => setTransposerInst('Bb')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    transposerInst === 'Bb' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Bb Instruments (Cornet/Euph/Bb Bass)
                </button>
                <button
                  onClick={() => setTransposerInst('Eb')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    transposerInst === 'Eb' ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Eb Instruments (Tenor Horn/Eb Bass)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-3">Written Note</th>
                    <th className="py-2.5 px-3">Standard Valves</th>
                    <th className="py-2.5 px-3">Sounding Concert Pitch</th>
                    <th className="py-2.5 px-3">Harmonic Frequency</th>
                    <th className="py-2.5 px-3 text-right">Sound Test</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums">
                  {notesList.map((n, i) => {
                    const soundPitch = transposerInst === 'Bb' ? n.concertBb : n.concertEb;
                    const freq = transposerInst === 'Bb' ? n.freqBb : n.freqEb;
                    return (
                      <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2 px-3 font-serif font-bold text-slate-200">{n.written}</td>
                        <td className="py-2 px-3 text-amber-300">{n.valves}</td>
                        <td className="py-2 px-3 text-emerald-300 font-semibold">Concert {soundPitch}</td>
                        <td className="py-2 px-3 text-slate-400">{freq.toFixed(1)} Hz</td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => playNoteAudio(freq)}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-slate-200 hover:bg-amber-400 hover:text-slate-950 transition-colors"
                          >
                            <Volume2 className="h-3 w-3" />
                            <span>Play</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: D MAJOR TO C MAJOR TUTORIAL */}
      {activeSubTab === 'd-to-c' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/90 p-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
              {TRANSPOSITION_PRINCIPLES.dMajorToCMajor.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {TRANSPOSITION_PRINCIPLES.dMajorToCMajor.concept}
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <span className="text-xs uppercase font-semibold text-rose-400">Original Key</span>
                <h4 className="font-serif text-lg font-bold text-slate-100 mt-1">
                  {TRANSPOSITION_PRINCIPLES.dMajorToCMajor.keySignatures.original}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Notes: D, E, F#, G, A, B, C#, D. Requires pressing 2nd valve for F# and 1+2 for C#.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <span className="text-xs uppercase font-semibold text-emerald-400">Transposed Down to</span>
                <h4 className="font-serif text-lg font-bold text-slate-100 mt-1">
                  {TRANSPOSITION_PRINCIPLES.dMajorToCMajor.keySignatures.transposed}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Notes: C, D, E, F, G, A, B, C. All sharps disappear! The most natural key on brass.
                </p>
              </div>
            </div>
          </div>

          {/* Step by step note transformation */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h4 className="font-serif text-lg font-bold text-slate-100 mb-2">
              Note-by-Note Transformation Map
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Click each comparison card to hear the original D Major note and the transposed C Major note:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TRANSPOSITION_PRINCIPLES.dMajorToCMajor.noteMapping.map((map, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-rose-400 font-bold">{map.from}</span>
                    <ArrowRight className="h-3 w-3 text-slate-500" />
                    <span className="font-mono text-sm text-emerald-400 font-bold">{map.to}</span>
                  </div>

                  <div className="mt-2 text-[10px] text-slate-500">
                    {map.interval}
                  </div>

                  <div className="mt-3 flex gap-1.5">
                    <button
                      onClick={() => brassAudio.playBrassTone(293.66 * Math.pow(2, i/12), 0.4, 'cornet')}
                      className="flex-1 rounded-md bg-slate-800 py-1 text-[10px] font-semibold text-rose-300 hover:bg-slate-700"
                    >
                      D note
                    </button>
                    <button
                      onClick={() => brassAudio.playBrassTone(261.63 * Math.pow(2, i/12), 0.4, 'cornet')}
                      className="flex-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 py-1 text-[10px] font-semibold text-emerald-300 hover:bg-emerald-900/60"
                    >
                      C note
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Practical Band Application: </span>
              {TRANSPOSITION_PRINCIPLES.dMajorToCMajor.whyInBands}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: THE 10 INSTRUMENTS */}
      {activeSubTab === 'instruments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Instrument Selector sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Brass Instrument:
            </div>
            {BRASS_INSTRUMENTS.map(inst => (
              <button
                key={inst.id}
                onClick={() => setSelectedInstrument(inst)}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all ${
                  selectedInstrument.id === inst.id
                    ? 'border border-amber-400/50 bg-amber-400/10 text-slate-100 shadow-sm'
                    : 'border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div>
                  <div className="font-serif font-bold text-sm">{inst.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{inst.section}</div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    in {inst.fundamentalKey}
                  </span>
                  <div className="text-[10px] text-slate-500 capitalize">{inst.clef} clef</div>
                </div>
              </button>
            ))}
          </div>

          {/* Instrument Detailed Spotlight */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {selectedInstrument.section}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
                  {selectedInstrument.name}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (selectedInstrument.id === 'percussion-timpani') {
                      brassAudio.playPercussion('timpani');
                    } else if (selectedInstrument.id === 'percussion-snare') {
                      brassAudio.playPercussion('snare');
                    } else if (selectedInstrument.id === 'percussion-mallets') {
                      brassAudio.playPercussion('glockenspiel');
                    } else {
                      brassAudio.playBrassTone(
                        selectedInstrument.fundamentalKey === 'Eb' ? 311.13 : 233.08,
                        1.2,
                        selectedInstrument.id.includes('bass') ? 'bass' : selectedInstrument.id.includes('horn') ? 'horn' : 'cornet'
                      );
                    }
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-300 transition-colors shadow-md"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>Hear Signature Tone</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-slate-500 block text-[11px]">Fundamental Key</span>
                <span className="font-bold text-amber-300 font-mono text-sm">{selectedInstrument.fundamentalKey}</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-slate-500 block text-[11px]">Notation Clef</span>
                <span className="font-bold text-slate-200 capitalize text-sm">{selectedInstrument.clef} Clef</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-slate-500 block text-[11px]">Playable Range</span>
                <span className="font-bold text-slate-200 font-mono text-sm">{selectedInstrument.range}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-xs mb-1">
                  Acoustic Character
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {selectedInstrument.description}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-xs mb-1">
                  Role in the 28-Piece Ensemble
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {selectedInstrument.brassBandRole}
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <h4 className="font-semibold text-amber-300 uppercase tracking-wider text-xs mb-1">
                  Famous Solo Showcase Piece
                </h4>
                <p className="text-slate-200 font-medium">
                  "{selectedInstrument.exampleSolo}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: 28-PIECE BAND LAYOUT */}
      {activeSubTab === 'band-layout' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h3 className="font-serif text-xl font-bold text-slate-100">
              The Classic 28-Piece British Brass Band Layout
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Contest rules throughout the UK strictly limit brass band membership to 28 musicians plus conductor. Here is how the ensemble is seated for maximum acoustic projection:
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BRITISH_BAND_SECTIONS.map((sec, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-amber-300">{sec.section}</span>
                      <span className="font-mono text-slate-400">{sec.count} players</span>
                    </div>
                    <div className="font-serif text-sm font-semibold text-slate-200 mb-2">
                      {sec.instruments}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {sec.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
