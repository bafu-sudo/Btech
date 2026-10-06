export type BrassInstrumentKey = 'Bb' | 'Eb' | 'C' | 'F';

export interface BrassInstrumentInfo {
  id: string;
  name: string;
  clef: 'treble' | 'bass';
  fundamentalKey: BrassInstrumentKey;
  description: string;
  section: string;
  range: string;
  standardValves: number;
  brassBandRole: string;
  exampleSolo: string;
}

export interface NoteDefinition {
  writtenNote: string;
  concertPitch: string;
  valves: number[]; // e.g. [1, 2] or [] for open
  partial: number;
  frequencyHz: number;
  description?: string;
}

export interface ScaleDefinition {
  id: string;
  title: string;
  instrumentKey: BrassInstrumentKey;
  instrumentName: string;
  writtenKey: string;
  concertKey: string;
  explanation: string;
  notes: {
    name: string;
    octave: number;
    concertName: string;
    valves: number[];
    valveLabel: string;
    slidePosition?: number;
    slideLabel?: string;
    frequencyHz: number;
  }[];
}

export interface QuizQuestion {
  id: number;
  category: 'transposition' | 'fingerings' | 'brass-tradition' | 'ear-training';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  playNoteFreq?: number;
}
