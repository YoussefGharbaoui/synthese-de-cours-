/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ViewMode } from './components/Navbar';
import { PresentationView } from './components/PresentationView';
import { CourseSynthesisView } from './components/CourseSynthesisView';
import { InteractiveLab } from './components/InteractiveLab';
import { QuizView } from './components/QuizView';
import { FormulaSheetView } from './components/FormulaSheetView';
import { PrintableCourseSummary } from './components/PrintableCourseSummary';
import { GraduationCap, Printer, X, FileText, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('presentation');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleOpenPrintModal = () => {
    setShowPrintModal(true);
  };

  const handleExecutePrint = () => {
    setShowPrintModal(false);
    // Small timeout to allow modal state to close before print dialog
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <>
      {/* 1. Interactive Web Application (Screen Only) */}
      <div id="app-screen-container" className="min-h-screen bg-[#f8f6f0] text-stone-900 flex flex-col font-sans selection:bg-emerald-700 selection:text-white">
        
        {/* Top Navigation */}
        <Navbar
          currentView={currentView}
          onViewChange={setCurrentView}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          onPrint={handleOpenPrintModal}
        />

        {/* Main View Container */}
        <main className="flex-1 w-full">
          {currentView === 'presentation' && (
            <PresentationView 
              onNavigateToSynthesis={() => setCurrentView('synthesis')} 
            />
          )}

          {currentView === 'synthesis' && (
            <CourseSynthesisView
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          )}

          {currentView === 'lab' && <InteractiveLab />}

          {currentView === 'quiz' && <QuizView />}

          {currentView === 'formulas' && <FormulaSheetView />}
        </main>

        {/* Footer */}
        <footer className="bg-[#f4f1ea] border-t border-stone-200 py-6 text-xs text-stone-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-800" />
              <span className="font-semibold text-stone-900">Systèmes Décisionnels M201</span>
              <span>— Filière Intelligence Artificielle (Assistant Data Analyst)</span>
            </div>
            <div className="flex items-center gap-4 text-stone-600">
              <span>Enseignant : <strong className="text-stone-900">Pr. SADRATI Zakariae</strong></span>
              <span>•</span>
              <button 
                onClick={handleOpenPrintModal}
                className="text-emerald-800 hover:text-emerald-950 font-semibold underline decoration-emerald-600 underline-offset-2 flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimer Résumé PDF</span>
              </button>
            </div>
          </div>
        </footer>

        {/* Print Confirmation & PDF Export Modal */}
        {showPrintModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Télécharger le Résumé PDF</h3>
                    <p className="text-xs text-stone-500">Livret officiel de synthèse de cours (M201)</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#fcfbf9] p-4 rounded-2xl border border-stone-200">
                <div className="font-bold text-stone-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Contenu inclus dans votre document PDF :</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs">
                  <li>En-tête officiel du cours M201 & Pr. SADRATI Zakariae</li>
                  <li>Synthèse intégrale des 7 séances de cours (Statistiques, Outliers, Machine Learning, R, Dataviz)</li>
                  <li>Toutes les listes à puces pédagogiques et points clés</li>
                  <li>Tableau comparatif de toutes les formules (Math, Python, R, Excel)</li>
                </ul>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                💡 <strong>Astuce pour sauvegarder en PDF</strong> : Dans la fenêtre d'impression qui va s'ouvrir, choisissez <em>"Enregistrer au format PDF"</em> comme destination.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                >
                  Annuler
                </button>
                <button
                  onClick={handleExecutePrint}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-800/20"
                >
                  <Printer className="w-4 h-4" />
                  <span>Générer le PDF / Imprimer</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* 2. Dedicated Printable Course Summary Document (Printed when window.print() is called) */}
      <div id="printable-summary-root">
        <PrintableCourseSummary />
      </div>
    </>
  );
}
