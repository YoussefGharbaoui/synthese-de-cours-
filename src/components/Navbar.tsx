/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Presentation, 
  BookOpen, 
  FlaskConical, 
  HelpCircle, 
  Calculator, 
  Printer, 
  Search,
  Maximize2, 
  Minimize2,
  FileDown
} from 'lucide-react';

export type ViewMode = 'presentation' | 'synthesis' | 'lab' | 'quiz' | 'formulas';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  searchTerm,
  onSearchChange,
  isFullscreen,
  onToggleFullscreen,
  onPrint
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-stone-200 text-stone-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Course Info */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-800/15 text-white font-black text-lg">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 text-base tracking-tight">Systèmes Décisionnels</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  M201
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Filière IA • Assistant Data Analyst • Pr. SADRATI
              </p>
            </div>
          </div>

          {/* Navigation View Modes */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200" aria-label="Modes de consultation">
            <button
              onClick={() => onViewChange('presentation')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'presentation'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Presentation className="w-4 h-4" />
              <span>Diaporama</span>
            </button>

            <button
              onClick={() => onViewChange('synthesis')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'synthesis'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Synthèse de Cours</span>
            </button>

            <button
              onClick={() => onViewChange('lab')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'lab'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Atelier Interactif</span>
            </button>

            <button
              onClick={() => onViewChange('quiz')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'quiz'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>QCM Quiz</span>
            </button>

            <button
              onClick={() => onViewChange('formulas')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'formulas'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Mémento</span>
            </button>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            
            {/* Search Input for Synthesis */}
            {currentView === 'synthesis' && (
              <div className="relative hidden sm:block w-48 lg:w-56">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Rechercher (DBSCAN...)"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-stone-100 border border-stone-300 rounded-lg text-xs text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                />
              </div>
            )}

            {/* Print / Export Course Summary PDF Button */}
            <button
              onClick={onPrint}
              title="Télécharger ou imprimer le résumé PDF du cours"
              aria-label="Télécharger ou imprimer le résumé PDF du cours"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Résumé PDF</span>
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={onToggleFullscreen}
              title={isFullscreen ? "Quitter le plein écran" : "Passer en plein écran"}
              aria-label={isFullscreen ? "Quitter le plein écran" : "Passer en plein écran"}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 border border-stone-200 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile View Navigation */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-stone-200 no-scrollbar">
          <button
            onClick={() => onViewChange('presentation')}
            className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              currentView === 'presentation' ? 'bg-emerald-800 text-white' : 'text-stone-700 bg-stone-100'
            }`}
          >
            Diaporama
          </button>
          <button
            onClick={() => onViewChange('synthesis')}
            className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              currentView === 'synthesis' ? 'bg-emerald-800 text-white' : 'text-stone-700 bg-stone-100'
            }`}
          >
            Synthèse
          </button>
          <button
            onClick={() => onViewChange('lab')}
            className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              currentView === 'lab' ? 'bg-emerald-800 text-white' : 'text-stone-700 bg-stone-100'
            }`}
          >
            Atelier Lab
          </button>
          <button
            onClick={() => onViewChange('quiz')}
            className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              currentView === 'quiz' ? 'bg-emerald-800 text-white' : 'text-stone-700 bg-stone-100'
            }`}
          >
            QCM
          </button>
          <button
            onClick={() => onViewChange('formulas')}
            className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              currentView === 'formulas' ? 'bg-emerald-800 text-white' : 'text-stone-700 bg-stone-100'
            }`}
          >
            Mémento
          </button>
        </div>
      </div>
    </header>
  );
};
