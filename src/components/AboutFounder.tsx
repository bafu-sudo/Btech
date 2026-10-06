import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Music2, Heart, Award, Globe, BookOpen, Camera, Upload } from 'lucide-react';
import exactFounderPhoto from '../assets/images/nokuvimba_bafu_exact_1791291814595.jpg';

export const AboutFounder: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string>(exactFounderPhoto);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user has uploaded their local copy previously
    const saved = localStorage.getItem('founder_nokuvimba_photo_raw');
    if (saved) {
      setPhotoSrc(saved);
    }
  }, []);

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotoSrc(result);
          try {
            localStorage.setItem('founder_nokuvimba_photo_raw', result);
          } catch {
            // ignore if storage limit reached
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Header pill & title */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Founder's Vision & Heritage</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100">
          The Story Behind btech
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Born out of a personal journey from self-taught cornet practice to building an accessible digital academy for brass band musicians everywhere.
        </p>
      </div>

      {/* Main Feature Grid: Story on Left, Photo & Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Founder's Personal Words */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card with founder quote */}
          <div className="rounded-2xl border border-amber-500/20 bg-slate-900/90 p-6 sm:p-8 shadow-xl">
            <h2 className="font-serif text-2xl font-bold text-slate-100 mb-4">
              A Message from Nokuvimba Bafu
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                My name is <strong className="text-amber-300 font-semibold">Nokuvimba Bafu</strong>, and I am an 18-year-old student from Zimbabwe who is really passionate about <strong className="text-slate-100 font-semibold">music, technology, and learning</strong>.
              </p>

              <p>
                Music, especially <strong className="text-amber-300 font-semibold">Salvation Army brass-band music</strong>, is a big part of who I am. I play the cornet and have always wanted to improve my playing and understanding of brass music. However, I had a hard time teaching myself how to read notes, understand fingerings, rhythms, and play brass music confidently.
              </p>

              <p>
                That experience inspired me to make learning brass music easier for everyone. Through this app, I want to help beginners understand brass instruments, music notation, fingerings, rhythms, and playing techniques in a simple and accessible way—so that others don't have to struggle the same way I did.
              </p>

              {/* Founder's Key Goal Callout */}
              <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-5 mt-6">
                <p className="font-serif text-base sm:text-lg font-bold text-amber-200 italic leading-snug">
                  "My goal is simple: I struggled to teach myself brass music, so I want to make it easier for the next person."
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-amber-300/80">
                  <span className="font-semibold">— Nokuvimba Bafu</span>
                  <span>Founder of btech</span>
                </div>
              </div>
            </div>
          </div>

          {/* Salvation Army Brass Heritage Box */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  The Salvation Army Brass Tradition
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The Salvation Army brass band movement has an extraordinary legacy spanning well over a century, producing world-renowned cornet soloists, composer legends (like Eric Ball and Leslie Condon), and passionate community bands across Zimbabwe, the United Kingdom, and across the globe.
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  In Zimbabwe, youth brass players gather to share uplifting hymns, marches, and sacred pieces. btech honors this heritage by breaking down traditional treble clef transposition and brass fundamentals so anyone with a horn can learn with joy and clarity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Founder's Photograph & Identity Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl">
            {/* The Photograph Container - preserving full 9:16 vertical ratio */}
            <div className="group relative w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
              <img
                src={photoSrc}
                alt="Nokuvimba Bafu, 18-year-old student from Zimbabwe and founder of btech"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (photoSrc !== '/nokuvimba_bafu.jpg') {
                    setPhotoSrc('/nokuvimba_bafu.jpg');
                  }
                }}
                className="w-full h-auto object-cover object-top max-h-[520px]"
              />

              {/* Upload button overlay */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload original photo directly from your device"
                  className="flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1.5 text-[11px] font-medium text-slate-200 hover:bg-black/90 hover:text-amber-300 transition-colors border border-white/10"
                >
                  <Camera className="h-3.5 w-3.5" />
                  <span>Update Photo</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCustomUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Caption directly below image as requested */}
            <div className="mt-4 text-center">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
                Nokuvimba Bafu
              </h3>
              <p className="text-xs sm:text-sm font-medium text-amber-400 mt-0.5">
                Founder of btech · Student & Cornet Player
              </p>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Globe className="h-3.5 w-3.5 text-slate-500" />
                <span>Harare, Zimbabwe</span>
                <span aria-hidden="true">·</span>
                <span>Age 18</span>
              </div>
            </div>

            {/* Quick stats / values */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
                <span className="text-[11px] text-slate-500 block">Primary Instrument</span>
                <span className="font-bold text-amber-300 font-serif">B♭ Cornet</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
                <span className="text-[11px] text-slate-500 block">Favorite Style</span>
                <span className="font-bold text-slate-200 font-serif">Salvation Army Brass</span>
              </div>
            </div>

            {/* Core Mission statement */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 text-xs text-slate-400 leading-relaxed text-center">
              "Technology and music together can dismantle barriers. No learner should ever have to give up on brass music because notation feels out of reach."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
