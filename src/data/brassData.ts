import { BrassInstrumentInfo, ScaleDefinition, QuizQuestion } from '../types';

export const BRASS_INSTRUMENTS: BrassInstrumentInfo[] = [
  {
    id: 'cornet-bb',
    name: 'Bb Cornet',
    clef: 'treble',
    fundamentalKey: 'Bb',
    section: 'Cornet Section (9 players)',
    range: 'F#3 to C6',
    standardValves: 3,
    description: 'The melodic backbone of the British brass band. Conical bore gives it a warm, rounded tone distinct from the brighter trumpet.',
    brassBandRole: 'Solo cornets carry the main cantabile melodies and virtuoso cadenzas; 2nd/3rd cornets weave inner countermelodies.',
    exampleSolo: 'Carnival of Venice (Arban), Song of the Night (Ball)'
  },
  {
    id: 'soprano-cornet-eb',
    name: 'Eb Soprano Cornet',
    clef: 'treble',
    fundamentalKey: 'Eb',
    section: 'Soprano (1 player)',
    range: 'A3 to G6',
    standardValves: 3,
    description: 'The highest voice in the band, soaring above the entire ensemble with radiant high notes up to high C and D.',
    brassBandRole: 'Provides dramatic punctuation, spine-tingling climax notes, and intricate filigree over tutti climaxes.',
    exampleSolo: 'Flowerdale (Hymn of the Highlands), The Padstow Lifeboat'
  },
  {
    id: 'flugelhorn-bb',
    name: 'Bb Flugelhorn',
    clef: 'treble',
    fundamentalKey: 'Bb',
    section: 'Flugel (1 player)',
    range: 'F#3 to Bb5',
    standardValves: 3,
    description: 'A wide, mellow conical brass instrument that acts as a bridge between the bright cornets and the mellow tenor horns.',
    brassBandRole: 'Plays expressive, nostalgic, vocal-like solos. A distinct velvety warmth adored by audiences.',
    exampleSolo: 'Concierto de Aranjuez ("Orange Juice" in Brassed Off)'
  },
  {
    id: 'tenor-horn-eb',
    name: 'Eb Tenor Horn',
    clef: 'treble',
    fundamentalKey: 'Eb',
    section: 'Horn Section (Solo, 1st, 2nd)',
    range: 'A2 to F5',
    standardValves: 3,
    description: 'Known as Alto Horn in North America. Upright bell and warm mellow tone providing the essential middle-harmonic warmth of the band.',
    brassBandRole: 'Rhythmic off-beats in marches, lush inner choral chords, and delicate lyrical middle-voice solos.',
    exampleSolo: 'An Untold Story, Demelza'
  },
  {
    id: 'baritone-horn-bb',
    name: 'Bb Baritone Horn',
    clef: 'treble',
    fundamentalKey: 'Bb',
    section: 'Baritones (1st, 2nd)',
    range: 'E2 to Bb4',
    standardValves: 3,
    description: 'Narrower bore than the euphonium, giving it a lighter, focused, agile baritone voice that cuts cleanly through counterpoint.',
    brassBandRole: 'Blends with trombones and horns, carrying fast arpeggios and intricate technical lines in test pieces.',
    exampleSolo: 'Donegal Bay, The Wayfarer'
  },
  {
    id: 'euphonium-bb',
    name: 'Bb Euphonium',
    clef: 'treble',
    fundamentalKey: 'Bb',
    section: 'Euphoniums (Solo, 2nd)',
    range: 'Bb1 to F5',
    standardValves: 4,
    description: 'Often called the "King of the Brass Band" or the cello of the brass world. Wide conical bore produces a rich, noble, singing sound.',
    brassBandRole: 'Virtuosic solo vehicle for runs, lyrical operatic arias, and powerful doubling of bass melodies.',
    exampleSolo: 'Grandfather’s Clock, Pantomime (Philip Sparke)'
  },
  {
    id: 'tenor-trombone-bb',
    name: 'Bb Tenor Trombone',
    clef: 'treble',
    fundamentalKey: 'Bb',
    section: 'Trombone Section (1st, 2nd)',
    range: 'E2 to D5',
    standardValves: 0,
    description: 'Cylindrical bore with hand slide (7 slide positions). In British brass bands, read in Treble Clef (transposing up a 9th)!',
    brassBandRole: 'Directional, powerful bell provides punchy fanfares, majestic chorales, and driving rhythmic punctuation.',
    exampleSolo: 'The Acrobat, Dust to Dust'
  },
  {
    id: 'bass-trombone',
    name: 'Bass Trombone (Bb/F/Gb/D)',
    clef: 'bass',
    fundamentalKey: 'C',
    section: 'Trombone Section (1 player)',
    range: 'C1 to Bb4',
    standardValves: 2,
    description: 'The ONLY instrument in the standard British brass band that reads non-transposing concert-pitch Bass Clef!',
    brassBandRole: 'Massive low-end authority, doubling the bass line or creating rasping trombone section climaxes.',
    exampleSolo: 'The Golden Pen, Variations on Barnacle Bill'
  },
  {
    id: 'eb-bass',
    name: 'Eb Bass (EEb Tuba)',
    clef: 'treble',
    fundamentalKey: 'Eb',
    section: 'Basses (2 players)',
    range: 'Eb1 to Bb3',
    standardValves: 4,
    description: 'Huge conical tuba with 4 valves (usually 3+1 compensating system). Reads Treble Clef in British tradition, transposing an octave + major 6th!',
    brassBandRole: 'Provides the agile, round foundation of the ensemble. Can execute surprisingly rapid technical scale runs.',
    exampleSolo: 'The Sun Has Got His Hat On, Bass in the Ballroom'
  },
  {
    id: 'bb-bass',
    name: 'Bb Bass (BBb Tuba)',
    clef: 'treble',
    fundamentalKey: 'Bb',
    section: 'Basses (2 players)',
    range: 'Bb0 to F3',
    standardValves: 4,
    description: 'The mighty bedrock of the band! The largest instrument on stage, weighting the entire 28-piece ensemble with rich sub-bass resonance.',
    brassBandRole: 'Anchors every tutti chord and pedal note. Reads treble clef (transposing two octaves + major second up).',
    exampleSolo: 'The Bare Necessities, The Bombastic Bombardon'
  },
  {
    id: 'percussion-timpani',
    name: 'Timpani (Kettle Drums)',
    clef: 'bass',
    fundamentalKey: 'C',
    section: 'Percussion (Section 1)',
    range: 'D2 to A3',
    standardValves: 0,
    description: 'Large copper kettles tuned with pedal mechanisms. Crucial for dramatic crescendo rolls and fundamental harmonic reinforcement.',
    brassBandRole: 'Locks with the BBb and EEb basses, establishing tonality and giving symphonic weight to climaxes and contest test pieces.',
    exampleSolo: 'Blitz (Derek Bourgeois), Contest Music (Wilfred Heaton)'
  },
  {
    id: 'percussion-snare',
    name: 'Side Drum & Drum Kit',
    clef: 'treble',
    fundamentalKey: 'C',
    section: 'Percussion (Section 2)',
    range: 'Rhythmic / Unpitched',
    standardValves: 0,
    description: 'The military heartbeat of British brass band street marches (Whit Friday) and driving groove in entertainment contests.',
    brassBandRole: 'Sets strict marching tempos (usually 120 or 128 BPM), crisp five-stroke rolls, and rhythmic precision.',
    exampleSolo: 'The Cossack, Knight Templar, Castell Coch'
  },
  {
    id: 'percussion-mallets',
    name: 'Tuned Percussion (Glockenspiel & Xylophone)',
    clef: 'treble',
    fundamentalKey: 'C',
    section: 'Percussion (Section 3)',
    range: 'G5 to C8',
    standardValves: 0,
    description: 'Steel bars or rosewood tuned percussion delivering sparkling bell highlights that cut cleanly over the entire 28-piece ensemble.',
    brassBandRole: 'Doubles soprano cornet flourishes, plays shimmering arpeggios, and brings festive radiance to Salvation Army marches and hymn arrangements.',
    exampleSolo: 'The Kingdom Triumphant, Festive Impressions'
  }
];

export const TRANSPOSITION_PRINCIPLES = {
  whyTrebleClef: `The ingenious tradition of the British Brass Band (developed in the 19th century in Northern England mining and textile communities) standardizes all valved brass into Treble Clef. 
Whether you play a tiny Soprano Cornet, Tenor Horn, Euphonium, or giant BBb Bass, written 'C' below the stave is ALWAYS open valves, 'D' is ALWAYS 1st + 3rd, and 'E' is ALWAYS 1st + 2nd! 
This means any band member can instantly pick up another instrument and know the fingerings without relearning clefs.`,
  
  cScaleBb: {
    title: 'The C Major Scale on Bb Instruments (Cornet, Euphonium, Bb Bass)',
    rule: 'When a Bb instrument reads and plays a written C Major scale, it sounds a Concert Bb Major scale in real acoustic pitch (down a whole step / major 2nd).',
    transpositionFormula: 'Concert Pitch = Written Note - 2 semitones (Major 2nd down)'
  },

  cScaleEb: {
    title: 'The C Major Scale on Eb Instruments (Tenor Horn, Soprano Cornet, Eb Bass)',
    rule: 'When an Eb instrument reads and plays a written C Major scale, it sounds a Concert Eb Major scale in real acoustic pitch (up a major 6th or down a minor 3rd).',
    transpositionFormula: 'Concert Pitch = Written Note + 9 semitones (or -3 semitones down an octave)'
  },

  dMajorToCMajor: {
    title: 'Transposing from D Major to C Major (Whole Tone Down)',
    concept: 'Transposition shifts every pitch in a piece by an identical musical interval. Moving from D major to C major lowers every note by a Major Second (2 semitones).',
    keySignatures: {
      original: 'D Major (2 sharps: F# and C#)',
      transposed: 'C Major (0 sharps / 0 flats - all natural notes: C, D, E, F, G, A, B, C)'
    },
    noteMapping: [
      { from: 'D', to: 'C', interval: '-2 semitones (down a whole tone)' },
      { from: 'E', to: 'D', interval: '-2 semitones' },
      { from: 'F#', to: 'E', interval: '-2 semitones' },
      { from: 'G', to: 'F', interval: '-2 semitones' },
      { from: 'A', to: 'G', interval: '-2 semitones' },
      { from: 'B', to: 'A', interval: '-2 semitones' },
      { from: 'C#', to: 'B', interval: '-2 semitones' },
      { from: 'D (octave)', to: 'C (octave)', interval: '-2 semitones' }
    ],
    whyInBands: 'Often a brass player needs to accompany a church choir or pop singer singing in C major while the original sheet music was in D major; or transpose on the fly between concert keys and band keys!'
  }
};

export const VALVE_FINGERINGS = [
  { combo: 'Open (0)', valves: [], semitonesLower: 0, notesExample: 'C4, G4, C5, E5, G5', description: 'No valves depressed. Pure natural harmonics of the instrument tube.' },
  { combo: '2nd Valve', valves: [2], semitonesLower: 1, notesExample: 'B3, F#4, B4, D#5, F#5', description: 'Lowers pitch by 1 semitone (half step).' },
  { combo: '1st Valve', valves: [1], semitonesLower: 2, notesExample: 'Bb3, F4, Bb4, D5, F5', description: 'Lowers pitch by 2 semitones (whole step).' },
  { combo: '1st + 2nd Valve', valves: [1, 2], semitonesLower: 3, notesExample: 'A3, E4, A4, C#5, E5', description: 'Lowers pitch by 3 semitones (minor 3rd).' },
  { combo: '2nd + 3rd Valve', valves: [2, 3], semitonesLower: 4, notesExample: 'Ab3, Eb4, Ab4, C5, Eb5', description: 'Lowers pitch by 4 semitones (major 3rd). Great alternative for high A.' },
  { combo: '1st + 3rd Valve', valves: [1, 3], semitonesLower: 5, notesExample: 'G3, D4, G4, B4, D5', description: 'Lowers pitch by 5 semitones (perfect 4th). Low D is inherently sharp (use 3rd valve slide on cornet).' },
  { combo: '1st + 2nd + 3rd Valve', valves: [1, 2, 3], semitonesLower: 6, notesExample: 'F#3, C#4, F#4, A#4, C#5', description: 'Lowers pitch by 6 semitones (tritone / augmented 4th). All valves down.' }
];

export const SCALE_LESSONS: ScaleDefinition[] = [
  {
    id: 'c-scale-bb-cornet',
    title: 'Written C Major Scale on Bb Cornet / Euphonium',
    instrumentKey: 'Bb',
    instrumentName: 'Bb Cornet / Euphonium',
    writtenKey: 'C Major (no sharps/flats)',
    concertKey: 'Bb Major (2 flats: Bb, Eb)',
    explanation: 'The foundation of all brass band tuition. Every beginner starts here. Notice how low C is open, D is 1+3, E is 1+2, F is 1, G is open, A is 1+2, B is 2, and high C is open.',
    notes: [
      { name: 'C4 (Middle C)', octave: 4, concertName: 'Bb3', valves: [], valveLabel: 'Open', frequencyHz: 233.08 },
      { name: 'D4', octave: 4, concertName: 'C4', valves: [1, 3], valveLabel: '1 + 3', frequencyHz: 261.63 },
      { name: 'E4', octave: 4, concertName: 'D4', valves: [1, 2], valveLabel: '1 + 2', frequencyHz: 293.66 },
      { name: 'F4', octave: 4, concertName: 'Eb4', valves: [1], valveLabel: '1st', frequencyHz: 311.13 },
      { name: 'G4', octave: 4, concertName: 'F4', valves: [], valveLabel: 'Open', frequencyHz: 349.23 },
      { name: 'A4', octave: 4, concertName: 'G4', valves: [1, 2], valveLabel: '1 + 2', frequencyHz: 392.00 },
      { name: 'B4', octave: 4, concertName: 'A4', valves: [2], valveLabel: '2nd', frequencyHz: 440.00 },
      { name: 'C5 (Treble C)', octave: 5, concertName: 'Bb4', valves: [], valveLabel: 'Open', frequencyHz: 466.16 }
    ]
  },
  {
    id: 'c-scale-eb-horn',
    title: 'Written C Major Scale on Eb Tenor Horn / Eb Bass',
    instrumentKey: 'Eb',
    instrumentName: 'Eb Tenor Horn / Eb Bass',
    writtenKey: 'C Major (no sharps/flats)',
    concertKey: 'Eb Major (3 flats: Bb, Eb, Ab)',
    explanation: 'Notice the magic: The fingerings are EXACTLY the same as the Cornet! But because this instrument is pitched in Eb, it sounds in Concert Eb major.',
    notes: [
      { name: 'C4', octave: 4, concertName: 'Eb4', valves: [], valveLabel: 'Open', frequencyHz: 311.13 },
      { name: 'D4', octave: 4, concertName: 'F4', valves: [1, 3], valveLabel: '1 + 3', frequencyHz: 349.23 },
      { name: 'E4', octave: 4, concertName: 'G4', valves: [1, 2], valveLabel: '1 + 2', frequencyHz: 392.00 },
      { name: 'F4', octave: 4, concertName: 'Ab4', valves: [1], valveLabel: '1st', frequencyHz: 415.30 },
      { name: 'G4', octave: 4, concertName: 'Bb4', valves: [], valveLabel: 'Open', frequencyHz: 466.16 },
      { name: 'A4', octave: 4, concertName: 'C5', valves: [1, 2], valveLabel: '1 + 2', frequencyHz: 523.25 },
      { name: 'B4', octave: 4, concertName: 'D5', valves: [2], valveLabel: '2nd', frequencyHz: 587.33 },
      { name: 'C5', octave: 5, concertName: 'Eb5', valves: [], valveLabel: 'Open', frequencyHz: 622.25 }
    ]
  },
  {
    id: 'd-major-transposed-c',
    title: 'D Major Scale Transposed to C Major',
    instrumentKey: 'Bb',
    instrumentName: 'Transposition Masterclass (Bb Cornet)',
    writtenKey: 'D Major (transposed down to C Major)',
    concertKey: 'Original: C Concert -> Transposed: Bb Concert',
    explanation: 'Transposing down a whole tone (Major 2nd) turns the 2-sharp D Major scale (D E F# G A B C# D) into the clean, natural C Major scale (C D E F G A B C). Compare them below!',
    notes: [
      { name: 'C4 (was D4)', octave: 4, concertName: 'Bb3', valves: [], valveLabel: 'Open', frequencyHz: 233.08 },
      { name: 'D4 (was E4)', octave: 4, concertName: 'C4', valves: [1, 3], valveLabel: '1 + 3', frequencyHz: 261.63 },
      { name: 'E4 (was F#4)', octave: 4, concertName: 'D4', valves: [1, 2], valveLabel: '1 + 2', frequencyHz: 293.66 },
      { name: 'F4 (was G4)', octave: 4, concertName: 'Eb4', valves: [1], valveLabel: '1st', frequencyHz: 311.13 },
      { name: 'G4 (was A4)', octave: 4, concertName: 'F4', valves: [], valveLabel: 'Open', frequencyHz: 349.23 },
      { name: 'A4 (was B4)', octave: 4, concertName: 'G4', valves: [1, 2], valveLabel: '1 + 2', frequencyHz: 392.00 },
      { name: 'B4 (was C#5)', octave: 4, concertName: 'A4', valves: [2], valveLabel: '2nd', frequencyHz: 440.00 },
      { name: 'C5 (was D5)', octave: 5, concertName: 'Bb4', valves: [], valveLabel: 'Open', frequencyHz: 466.16 }
    ]
  },
  {
    id: 'arban-lip-slur',
    title: 'Arban Style Open-Harmonic Lip Slur',
    instrumentKey: 'Bb',
    instrumentName: 'Bb Cornet / Euphonium Warm-Up',
    writtenKey: 'Natural Harmonic Series (All Open Valves)',
    concertKey: 'Concert Bb Harmonics',
    explanation: 'The famous brass band warm-up from J.B. Arban’s Grand Method. You do not touch any valves; instead you change pitch purely with lip tension, airspeed, and tongue arch ("ah-ee-ah").',
    notes: [
      { name: 'C4 (Low)', octave: 4, concertName: 'Bb3', valves: [], valveLabel: 'Open (2nd Partial)', frequencyHz: 233.08 },
      { name: 'G4 (Mid)', octave: 4, concertName: 'F4', valves: [], valveLabel: 'Open (3rd Partial)', frequencyHz: 349.23 },
      { name: 'C5 (High C)', octave: 5, concertName: 'Bb4', valves: [], valveLabel: 'Open (4th Partial)', frequencyHz: 466.16 },
      { name: 'E5 (Top E)', octave: 5, concertName: 'D5', valves: [], valveLabel: 'Open (5th Partial)', frequencyHz: 587.33 },
      { name: 'G5 (Top G)', octave: 5, concertName: 'F5', valves: [], valveLabel: 'Open (6th Partial)', frequencyHz: 698.46 },
      { name: 'E5', octave: 5, concertName: 'D5', valves: [], valveLabel: 'Open', frequencyHz: 587.33 },
      { name: 'C5', octave: 5, concertName: 'Bb4', valves: [], valveLabel: 'Open', frequencyHz: 466.16 },
      { name: 'G4', octave: 4, concertName: 'F4', valves: [], valveLabel: 'Open', frequencyHz: 349.23 },
      { name: 'C4', octave: 4, concertName: 'Bb3', valves: [], valveLabel: 'Open', frequencyHz: 233.08 }
    ]
  }
];

export const BRASS_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'transposition',
    question: 'When a Bb Cornet plays a written note C, what concert pitch does an audience actually hear?',
    options: ['Concert C', 'Concert Bb', 'Concert D', 'Concert Eb'],
    correctIndex: 1,
    explanation: 'A Bb instrument sounds a major second (whole tone) lower than written. Written C sounds Concert Bb.'
  },
  {
    id: 2,
    category: 'transposition',
    question: 'When an Eb Tenor Horn or Eb Soprano Cornet plays a written note C, what concert pitch is produced?',
    options: ['Concert Eb', 'Concert F', 'Concert C', 'Concert G'],
    correctIndex: 0,
    explanation: 'An Eb instrument transposes so that its written C sounds acoustic Concert Eb.'
  },
  {
    id: 3,
    category: 'fingerings',
    question: 'In British brass band notation, what are the standard valves for written D (just below the stave)?',
    options: ['1st valve only', '2nd valve only', '1st and 3rd valves', 'All three valves (1+2+3)'],
    correctIndex: 2,
    explanation: 'Written D is played with valves 1 + 3. On cornet, players often kick out the 3rd valve slide slightly because this combination tends to be slightly sharp.'
  },
  {
    id: 4,
    category: 'transposition',
    question: 'If a piece in D Major is transposed down to C Major, what happens to the two sharps (F# and C#)?',
    options: [
      'They become flats (Bb and Eb)',
      'They disappear because C Major has no sharps or flats',
      'They double into four sharps',
      'They stay the same'
    ],
    correctIndex: 1,
    explanation: 'Transposing from D Major down a whole step gives C Major, which has zero sharps and zero flats (all natural notes).'
  },
  {
    id: 5,
    category: 'brass-tradition',
    question: 'Why do almost all valved instruments in British brass bands (even the huge BBb Bass) read Treble Clef?',
    options: [
      'Because Victorian printers ran out of bass clef stamps',
      'So players can switch between any instrument (Cornet, Horn, Euphonium, Bass) using identical fingerings',
      'Because bass clef was banned by British brass band contest committees',
      'Because tubas only play high notes'
    ],
    correctIndex: 1,
    explanation: 'The British brass band movement standardized on treble clef so amateur players could easily transition between instruments without learning new fingerings.'
  },
  {
    id: 6,
    category: 'fingerings',
    question: 'Which valve combination lowers the pitch of a brass instrument by 3 semitones (minor 3rd)?',
    options: ['1st + 2nd valve', '2nd valve only', '1st valve only', '3rd valve only'],
    correctIndex: 0,
    explanation: 'Valve 1 lowers by 2 semitones, Valve 2 lowers by 1 semitone. 2 + 1 = 3 semitones (used for written A4, low E4, etc.).'
  },
  {
    id: 7,
    category: 'brass-tradition',
    question: 'Which instrument is the ONLY one in a standard British championship brass band to read non-transposing Bass Clef?',
    options: ['Eb Bass', 'Euphonium', 'Bass Trombone', 'Baritone Horn'],
    correctIndex: 2,
    explanation: 'The Bass Trombone is the single non-transposing bass clef instrument in a traditional 28-piece British brass band.'
  },
  {
    id: 8,
    category: 'ear-training',
    question: 'Which partial harmonic allows a player on open valves to leap from low C4 to mid G4 without pressing a valve?',
    options: ['1st partial (pedal note)', '3rd partial', '7th partial', 'Sub-harmonic resonance'],
    correctIndex: 1,
    explanation: 'The 3rd harmonic of a brass instrument’s natural open series is the 5th interval above the fundamental (G above C).'
  }
];

export const BRITISH_BAND_SECTIONS = [
  {
    section: 'Front Row Cornets',
    count: 4,
    instruments: 'Principal Cornet, 2nd, 3rd & 4th Solo Cornets',
    role: 'Sits stage left facing the conductor. The leaders of the ensemble melody, playing bravura flourishes and sweet lyrical leads.'
  },
  {
    section: 'Back Row Cornets',
    count: 5,
    instruments: '1 Repiano Cornet, 2 Second Cornets, 2 Third Cornets',
    role: 'Sits behind the front row. Repiano acts as roving soloist and liaison; 2nd and 3rd provide rich harmonic backing.'
  },
  {
    section: 'Soprano Cornet & Flugelhorn',
    count: 2,
    instruments: '1 Eb Soprano Cornet, 1 Bb Flugelhorn',
    role: 'Flugel sits next to repiano cornet bringing velvety tone; Soprano Cornet sits at the end of the front row providing soaring high octaves.'
  },
  {
    section: 'Tenor Horns (Eb)',
    count: 3,
    instruments: 'Solo Horn, 1st Horn, 2nd Horn',
    role: 'Sits stage right or centre, pointing bells upward to project a warm atmospheric canopy over the band.'
  },
  {
    section: 'Baritones (Bb)',
    count: 2,
    instruments: '1st Baritone, 2nd Baritone',
    role: 'Sitting next to the horns, delivering crisp, agile middle-range countermelodies and chord fills.'
  },
  {
    section: 'Euphoniums (Bb)',
    count: 2,
    instruments: 'Solo Euphonium, 2nd Euphonium',
    role: 'The glorious singing tenor voice of the band, rivaling the Principal Cornet in technical difficulty and expressive warmth.'
  },
  {
    section: 'Trombone Section',
    count: 3,
    instruments: '1st & 2nd Tenor Trombones, 1 Bass Trombone',
    role: 'Sits centre-rear or stage right, providing directional brilliance, regal fanfares, and massive orchestral presence.'
  },
  {
    section: 'Basses (Tubas)',
    count: 4,
    instruments: '2 Eb Basses (EEb Tubas), 2 Bb Basses (BBb Tubas)',
    role: 'The colossal foundation. Sits behind the euphoniums and horns, supporting the entire 28-player band with warm organ-like resonance.'
  },
  {
    section: 'Percussion',
    count: 3,
    instruments: 'Timpani, Snare/Kit, Glockenspiel, Cymbals, Tuned Mallets',
    role: 'Rhythmic drive for marches, shimmering color in symphonic test pieces.'
  }
];
