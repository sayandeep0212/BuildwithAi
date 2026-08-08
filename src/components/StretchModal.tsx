import React, { useState } from 'react';
import { defaultStretches } from '../data/initialData';
import { Stretch } from '../types';

interface StretchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StretchModal: React.FC<StretchModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [customStretch, setCustomStretch] = useState<Stretch | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [concernInput, setConcernInput] = useState<string>('');
  const [showAiInput, setShowAiInput] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeStretch: Stretch = customStretch || defaultStretches[currentIdx];

  const handleNextStretch = () => {
    setCustomStretch(null);
    setCurrentIdx((prev) => (prev + 1) % defaultStretches.length);
  };

  const handleGenerateAiStretch = async () => {
    if (!concernInput.trim()) return;
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/ai/stretch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concern: concernInput }),
      });
      const data = await res.json();
      if (data.title) {
        setCustomStretch({
          id: 'ai-custom',
          title: data.title,
          description: data.description,
          duration: '2 min',
          category: 'AI Personalized',
          imageUrl: defaultStretches[0].imageUrl,
          steps: data.steps || ['Breathe deeply.', 'Focus on gentle alignment.'],
        });
      }
    } catch {
      // Fallback
    } finally {
      setIsLoadingAi(false);
      setShowAiInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      {/* Modal Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-on-background/25 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Content Glass Panel */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-md w-full relative z-10 transform transition-all shadow-2xl border border-white/50 my-auto max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="text-center">
          {/* Stretch Soft Vector Illustration */}
          <div className="w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden bg-surface-container-lowest ring-4 ring-primary-container/30 shadow-md">
            <img
              className="w-full h-full object-cover"
              src={activeStretch.imageUrl}
              alt={activeStretch.title}
            />
          </div>

          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest px-3 py-1 rounded-full bg-primary-container/30 mb-2 inline-block">
            {activeStretch.category} • {activeStretch.duration}
          </span>

          <h3 className="font-title-md text-2xl font-bold text-on-surface mb-2">
            {activeStretch.title}
          </h3>

          <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
            {activeStretch.description}
          </p>

          {/* Guided Steps List */}
          <div className="text-left bg-surface-container-low p-4 rounded-2xl mb-6 space-y-2 border border-surface-variant/40">
            <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-2">
              How to perform:
            </h4>
            {activeStretch.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-on-surface">
                <span className="font-bold text-primary">{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-primary text-on-primary font-label-sm text-xs font-semibold hover:opacity-90 transition-opacity shadow-md active:scale-95 cursor-pointer"
            >
              Done
            </button>

            <div className="flex justify-between items-center gap-2 pt-2">
              <button
                onClick={handleNextStretch}
                className="text-xs text-on-surface-variant hover:text-primary font-medium p-1 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Try Another Stretch
              </button>

              <button
                onClick={() => setShowAiInput(!showAiInput)}
                className="text-xs text-primary font-semibold hover:underline p-1 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                AI Stretch Generator
              </button>
            </div>

            {/* AI Custom Stretch Input */}
            {showAiInput && (
              <div className="mt-3 p-3 rounded-2xl bg-surface-container border border-primary-container/40 flex flex-col gap-2 text-left animate-fade-in">
                <label className="text-xs font-semibold text-primary">Where are you holding tension?</label>
                <input
                  type="text"
                  value={concernInput}
                  onChange={(e) => setConcernInput(e.target.value)}
                  placeholder="e.g. wrist tightness from typing, stiff lower back..."
                  className="text-xs p-2.5 rounded-xl bg-surface border border-outline-variant outline-none focus:ring-2 focus:ring-primary-container"
                />
                <button
                  onClick={handleGenerateAiStretch}
                  disabled={isLoadingAi || !concernInput.trim()}
                  className="py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl disabled:opacity-50"
                >
                  {isLoadingAi ? 'Creating Stretch...' : 'Generate AI Stretch'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
