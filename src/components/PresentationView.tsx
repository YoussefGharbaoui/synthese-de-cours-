/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Copy, 
  Check, 
  Lightbulb, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Code2, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { SLIDES_DATA, SlideData } from '../data/slidesData';

interface PresentationViewProps {
  initialSlideIndex?: number;
  onNavigateToSynthesis?: (moduleId: string) => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  initialSlideIndex = 0,
  onNavigateToSynthesis
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentSlide: SlideData = SLIDES_DATA[currentSlideIndex] || SLIDES_DATA[0];
  const totalSlides = SLIDES_DATA.length;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
      setShowThumbnails(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      } else if (e.key === 't' || e.key === 'T') {
        setShowThumbnails((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, totalSlides]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Format bullet point text: handles bolding **text** and sub-bullets
  const renderBullet = (bullet: string, idx: number) => {
    const isSubBullet = bullet.startsWith('  •');
    const cleanText = bullet.replace(/^\s*•\s*/, '');

    const parts = cleanText.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return (
      <li 
        key={idx} 
        className={`flex items-start gap-2.5 leading-relaxed ${
          isSubBullet ? 'ml-6 sm:ml-8 text-stone-600 text-sm sm:text-base my-1' : 'text-stone-800 text-base sm:text-lg my-2'
        }`}
      >
        <span className={`inline-block mt-2 rounded-full shrink-0 ${
          isSubBullet ? 'w-1.5 h-1.5 bg-emerald-600' : 'w-2.5 h-2.5 bg-emerald-800 shadow-sm shadow-emerald-800/20'
        }`} />
        <span className="flex-1">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-stone-900 tracking-wide">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <em key={pIdx} className="italic text-emerald-800 font-semibold">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </span>
      </li>
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-[#f8f6f0] text-stone-800 select-none">
      
      {/* Top Slide Control Bar */}
      <div className="bg-[#fcfbf9] border-b border-stone-200 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm shadow-xs">
        
        {/* Module Badge & Slide Counter */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs">
            {currentSlide.badge}
          </span>
          <span className="text-stone-600 font-medium">
            Diapositive <strong className="text-stone-900 font-bold">{currentSlideIndex + 1}</strong> sur {totalSlides}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            aria-label="Afficher le plan des diapositives"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              showThumbnails 
                ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs' 
                : 'bg-white border-stone-300 text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Plan des diapos</span>
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            aria-label="Afficher les notes pédagogiques"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              showNotes 
                ? 'bg-teal-800 border-teal-800 text-white shadow-xs' 
                : 'bg-white border-stone-300 text-stone-700 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Conseils Pr.</span>
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
        
        {/* Slide Frame (Elegant White Card on Warm Beige Canvas) */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xl p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Ambient Tones */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Header */}
          <div className="relative z-10 border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                {currentSlide.moduleRef}
              </span>
              <span className="text-stone-300">•</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {currentSlide.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono border border-stone-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              {currentSlide.title}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 mt-1 font-medium">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Slide Body: Bullet Points & Content */}
          <div className="relative z-10 space-y-6 flex-1">
            
            {/* List of Bullets */}
            <ul className="space-y-1">
              {currentSlide.bullets.map((bullet, idx) => renderBullet(bullet, idx))}
            </ul>


            {/* Code Snippet Box */}
            {currentSlide.codeSnippet && (
              <div className="rounded-xl overflow-hidden border border-stone-300 bg-stone-900 shadow-md">
                <div className="bg-stone-800 px-4 py-2 flex items-center justify-between border-b border-stone-700">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-semibold text-stone-200 uppercase">
                      Code {currentSlide.codeSnippet.lang}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(currentSlide.codeSnippet!.code)}
                    className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-2 py-1 rounded bg-stone-700 hover:bg-stone-600 transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copié</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{currentSlide.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Highlight Box / Pedagogical Callout */}
            {currentSlide.highlightBox && (
              <div className={`p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 shadow-xs ${
                currentSlide.highlightBox.type === 'tip'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : currentSlide.highlightBox.type === 'warning'
                  ? 'bg-rose-50 border-rose-300 text-rose-900'
                  : currentSlide.highlightBox.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-stone-100 border-stone-300 text-stone-900'
              }`}>
                {currentSlide.highlightBox.type === 'tip' && <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />}
                {currentSlide.highlightBox.type === 'warning' && <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />}
                {currentSlide.highlightBox.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />}
                {(!currentSlide.highlightBox.type || currentSlide.highlightBox.type === 'info') && (
                  <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-sm tracking-wide mb-1">
                    {currentSlide.highlightBox.title}
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-stone-700">
                    {currentSlide.highlightBox.content}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Slide Footer */}
          <div className="relative z-10 border-t border-stone-200 pt-4 mt-8 flex items-center justify-between text-xs text-stone-500">
            <span className="font-medium">
              Systèmes Décisionnels M201 • Pr. SADRATI Zakariae
            </span>
            <span className="font-mono text-stone-600 font-semibold">
              {currentSlideIndex + 1} / {totalSlides}
            </span>
          </div>

        </div>

        {/* Presenter Notes Box (Toggleable) */}
        {showNotes && (
          <div className="mt-4 p-4 rounded-xl bg-teal-50 border border-teal-300 text-teal-950 text-xs sm:text-sm shadow-xs">
            <div className="flex items-center gap-2 font-bold text-teal-900 mb-1">
              <Lightbulb className="w-4 h-4 text-teal-700" />
              <span>Notes Pédagogiques & Conseils pour l'Examen (Pr. SADRATI)</span>
            </div>
            <p className="leading-relaxed text-teal-900">
              Insistez bien sur la justification mathématique et le bon sens décisionnel : ne donnez jamais un chiffre brut sans en tirer une conclusion managériale (ex: "La variance est élevée donc les salaires sont très inégaux"). Révisez les questions pièges sur les types de variables et les opérateurs singuliers en R.
            </p>
          </div>
        )}

        {/* Bottom Slide Navigation Bar */}
        <div className="mt-4 flex items-center justify-between gap-4">
          
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border transition-all ${
              currentSlideIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-stone-200/60 border-stone-300 text-stone-500'
                : 'bg-white hover:bg-stone-100 border-stone-300 text-stone-800 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Précédent</span>
          </button>

          {/* Center Progress Bar */}
          <div className="flex-1 max-w-md hidden sm:flex flex-col items-center gap-1.5">
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden border border-stone-300">
              <div 
                className="bg-gradient-to-r from-emerald-700 to-teal-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-stone-600 font-medium">
              Progression : {Math.round(((currentSlideIndex + 1) / totalSlides) * 100)}%
            </span>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${
              currentSlideIndex === totalSlides - 1
                ? 'opacity-40 cursor-not-allowed bg-stone-200/60 border-stone-300 text-stone-500'
                : 'bg-emerald-800 hover:bg-emerald-700 border-emerald-800 text-white shadow-md shadow-emerald-800/20'
            }`}
          >
            <span>Suivant</span>
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>

      {/* Thumbnail Drawer / Plan de Cours Modal */}
      {showThumbnails && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-[#fcfbf9] border-l border-stone-300 h-full p-6 flex flex-col shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <div className="flex items-center gap-2 font-bold text-lg text-stone-900">
                <LayoutGrid className="w-5 h-5 text-emerald-800" />
                <span>Plan des Diapositives</span>
              </div>
              <button
                onClick={() => setShowThumbnails(false)}
                className="text-stone-500 hover:text-stone-900 p-1 rounded-lg hover:bg-stone-200"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {SLIDES_DATA.map((slide, sIdx) => {
                const isActive = sIdx === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(sIdx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isActive 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs' 
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {slide.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase">
                          {slide.badge}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-stone-900 truncate">
                        {slide.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">
                        {slide.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
