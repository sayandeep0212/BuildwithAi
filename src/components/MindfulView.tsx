import React, { useState } from 'react';
import { soundscapesList, initialRecommendations } from '../data/initialData';
import { Soundscape, Recommendation } from '../types';
import { audioEngine } from '../utils/audioSynth';

export const MindfulView: React.FC = () => {
  const [activeSoundscape, setActiveSoundscape] = useState<Soundscape | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.4);

  const handleSelectSoundscape = (s: Soundscape) => {
    if (activeSoundscape?.id === s.id && isPlaying) {
      audioEngine.stopSoundscape();
      setIsPlaying(false);
      setActiveSoundscape(null);
    } else {
      setActiveSoundscape(s);
      audioEngine.startSoundscape(s.type, volume);
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    if (!activeSoundscape) return;
    if (isPlaying) {
      audioEngine.stopSoundscape();
      setIsPlaying(false);
    } else {
      audioEngine.startSoundscape(activeSoundscape.type, volume);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  return (
    <main className="max-w-[900px] mx-auto px-6 pt-8 pb-32">
      {/* Header Content */}
      <header className="mb-8">
        <h1 className="font-headline-lg-mobile text-2xl text-primary font-bold mb-1">Library</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Quiet tools to refocus your mind.
        </p>
      </header>

      {/* Bento Grid Categories */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {/* Quick Refreshes Card */}
        <div
          onClick={() => handleSelectSoundscape(soundscapesList[0])}
          className={`glass-card rounded-2xl p-6 flex flex-col justify-between min-h-[200px] ambient-shadow cursor-pointer hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden ${
            activeSoundscape?.id === soundscapesList[0].id ? 'ring-2 ring-primary' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                bolt
              </span>
            </div>
            <span className="font-label-sm text-xs text-outline uppercase tracking-wider font-semibold">
              3 Min
            </span>
          </div>
          <div>
            <h2 className="font-title-md text-title-md text-on-surface font-semibold mb-1">
              Quick Refreshes
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
              Rapid grounding techniques for between classes.
            </p>
          </div>
        </div>

        {/* Focus Soundscapes Card */}
        <div
          onClick={() => handleSelectSoundscape(soundscapesList[1])}
          className={`glass-card rounded-2xl p-6 flex flex-col justify-between min-h-[200px] ambient-shadow cursor-pointer hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden ${
            activeSoundscape?.id === soundscapesList[1].id ? 'ring-2 ring-primary' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                headphones
              </span>
            </div>
            <span className="font-label-sm text-xs text-outline uppercase tracking-wider font-semibold">
              Loops
            </span>
          </div>
          <div>
            <h2 className="font-title-md text-title-md text-on-surface font-semibold mb-1">
              Focus Soundscapes
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
              Ambient noise to block out distractions in busy study areas.
            </p>
          </div>
        </div>

        {/* Deep Rest & Recovery Card */}
        <div
          onClick={() => handleSelectSoundscape(soundscapesList[2])}
          className={`glass-card rounded-2xl p-6 flex flex-col justify-between min-h-[200px] ambient-shadow md:col-span-2 cursor-pointer hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden ${
            activeSoundscape?.id === soundscapesList[2].id ? 'ring-2 ring-primary' : ''
          }`}
        >
          <div
            className="absolute right-0 top-0 w-1/2 h-full opacity-30 mix-blend-multiply pointer-events-none"
            style={{
              background: 'radial-gradient(circle, var(--color-primary-container) 0%, transparent 70%)',
            }}
          />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                nightlight
              </span>
            </div>
            <span className="font-label-sm text-xs text-outline uppercase tracking-wider font-semibold">
              10-20 Min
            </span>
          </div>
          <div className="relative z-10 md:w-2/3">
            <h2 className="font-title-md text-title-md text-on-surface font-semibold mb-1">
              Deep Rest & Recovery
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Guided sessions to alleviate academic burnout and reset your nervous system after intense focus periods.
            </p>
          </div>
        </div>
      </section>

      {/* Today's Recommendations List */}
      <section className="mb-10">
        <h3 className="font-title-md text-title-md text-primary font-semibold mb-5">
          Today's Recommendations
        </h3>
        <div className="space-y-3">
          {initialRecommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => {
                const found = soundscapesList.find((s) => s.id === rec.soundscapeId) || soundscapesList[0];
                handleSelectSoundscape(found);
              }}
              className="flex items-center p-4 bg-surface-container-low rounded-2xl ambient-shadow group hover:bg-surface-container transition-colors duration-200 cursor-pointer border border-surface-variant/30"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center mr-4 text-on-surface-variant group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>
                  {rec.icon}
                </span>
              </div>
              <div className="flex-grow">
                <h4 className="font-body-md text-body-md text-on-surface font-semibold">
                  {rec.title}
                </h4>
                <p className="font-label-sm text-xs text-on-surface-variant opacity-80 font-normal">
                  {rec.subtitle} • {rec.duration}
                </p>
              </div>
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-outline group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_circle
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Audio Soundscape Player Drawer */}
      {activeSoundscape && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-md glass-panel p-4 rounded-2xl shadow-xl flex items-center justify-between border border-primary/20 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-lg">
                {activeSoundscape.icon}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-on-surface">{activeSoundscape.title}</h4>
              <p className="text-xs text-on-surface-variant font-medium">Playing ambient audio</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Volume control */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 accent-primary cursor-pointer hidden sm:block"
              title="Volume"
            />

            {/* Play / Pause button */}
            <button
              onClick={handleTogglePlay}
              className="p-2 rounded-full bg-primary text-on-primary hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-xl">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            {/* Close button */}
            <button
              onClick={() => {
                audioEngine.stopSoundscape();
                setIsPlaying(false);
                setActiveSoundscape(null);
              }}
              className="p-1 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
