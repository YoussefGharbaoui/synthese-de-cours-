/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  COURSE_MODULES, 
  CourseModule 
} from '../data/courseData';
import { 
  BookOpen, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Lightbulb, 
  AlertTriangle, 
  Info, 
  Code2, 
  Copy, 
  Check, 
  Calculator,
  GraduationCap
} from 'lucide-react';

interface CourseSynthesisViewProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onSelectSlide?: (slideIndex: number) => void;
}

export const CourseSynthesisView: React.FC<CourseSynthesisViewProps> = ({
  searchTerm,
  onSearchChange,
  onSelectSlide
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'module-1': true,
    'module-2': true,
    'module-3': true,
    'module-4': true,
    'module-5': true,
    'module-6': true,
    'module-7': true
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filter modules based on search and selected tag
  const filteredModules = COURSE_MODULES.filter((module) => {
    const matchesTag = selectedModuleId === 'all' || module.id === selectedModuleId;
    if (!matchesTag) return false;

    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    const matchesTitle = module.title.toLowerCase().includes(term);
    const matchesDesc = module.description.toLowerCase().includes(term);
    const matchesKeyTakeaways = module.keyTakeaways.some((t) => t.toLowerCase().includes(term));
    const matchesSections = module.sections.some(
      (sec) =>
        sec.title.toLowerCase().includes(term) ||
        sec.points.some((p) => p.toLowerCase().includes(term)) ||
        (sec.formula && sec.formula.toLowerCase().includes(term))
    );

    return matchesTitle || matchesDesc || matchesKeyTakeaways || matchesSections;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#f8f6f0] text-stone-800">
      
      {/* Hero Banner (Professional Deep Emerald & Stone) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 border border-emerald-800 p-6 sm:p-10 shadow-lg text-white">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-emerald-200 border border-white/20">
            <GraduationCap className="w-4 h-4 text-emerald-300" />
            <span>Synthèse Officielle de Cours • Filière IA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            M201 : Approfondir les Systèmes Décisionnels
          </h1>

          <p className="text-stone-200 text-sm sm:text-base lg:text-lg leading-relaxed font-sans">
            Synthèse pédagogique et structurée des 7 modules de cours dispensés par le <strong>Pr. SADRATI Zakariae</strong>. 
            Maîtrisez les concepts fondamentaux grâce à des résumés concis, des listes à puces explicatives, 
            les formules clés et les codes sources sous <strong>Python</strong> et <strong>R</strong>.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold text-stone-200">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-300" />
              <span>7 Modules Exhaustifs</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15">
              <span className="w-2 h-2 rounded-full bg-teal-300" />
              <span>Python & RStudio</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15">
              <span className="w-2 h-2 rounded-full bg-amber-300" />
              <span>Préparation aux Examens & Cas Réels</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Module Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => setSelectedModuleId('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedModuleId === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            Tous les modules
          </button>
          {COURSE_MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setSelectedModuleId(mod.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedModuleId === mod.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
              }`}
            >
              {mod.shortTitle}
            </button>
          ))}
        </div>

        {/* In-page Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Filtrer les concepts (ex: DBSCAN, IQR)..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {filteredModules.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 text-stone-500">
            <Search className="w-10 h-10 mx-auto text-stone-400 mb-3" />
            <h3 className="text-lg font-bold text-stone-900 mb-1">Aucun concept trouvé</h3>
            <p className="text-sm">Aucune section ne correspond à la recherche "{searchTerm}".</p>
            <button
              onClick={() => onSearchChange('')}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-700"
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : (
          filteredModules.map((module) => {
            const isExpanded = expandedSections[module.id] ?? true;
            return (
              <div 
                key={module.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-md overflow-hidden transition-all"
              >
                {/* Module Header Bar */}
                <div 
                  onClick={() => toggleModule(module.id)}
                  className="p-5 sm:p-6 bg-white hover:bg-stone-50/70 cursor-pointer flex items-center justify-between gap-4 border-b border-stone-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-700 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm">
                      {module.seanceNumber.replace('Séance ', 'S')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                          {module.seanceNumber}
                        </span>
                        <span className="text-stone-300">•</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {module.badge}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                        {module.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 text-stone-600 hover:text-stone-900 rounded-lg bg-stone-100">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Collapsible Module Content */}
                {isExpanded && (
                  <div className="p-5 sm:p-8 space-y-8 bg-[#faf8f4]/50">
                    
                    {/* Key Takeaways Box (Sage/Emerald soft container) */}
                    <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
                      <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-3">
                        <Lightbulb className="w-4 h-4 text-emerald-700" />
                        <span>À Retenir Absolument (Points Clés du Cours)</span>
                      </div>
                      <ul className="space-y-2">
                        {module.keyTakeaways.map((takeaway, tkIdx) => (
                          <li key={tkIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Detailed Sections */}
                    <div className="space-y-6">
                      {module.sections.map((section, secIdx) => (
                        <div 
                          key={secIdx}
                          className="bg-white rounded-xl border border-stone-200 p-5 sm:p-6 space-y-4 shadow-xs"
                        >
                          {/* Section Title */}
                          <div className="flex items-center justify-between gap-3 border-b border-stone-200 pb-3">
                            <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                              {section.title}
                            </h3>
                            {section.badge && (
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {section.badge}
                              </span>
                            )}
                          </div>

                          {/* Bullet Points */}
                          <ul className="space-y-2">
                            {section.points.map((pt, ptIdx) => {
                              const isSub = pt.startsWith('•');
                              return (
                                <li 
                                  key={ptIdx} 
                                  className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${
                                    isSub ? 'ml-4 text-stone-700' : 'text-stone-800'
                                  }`}
                                >
                                  <span className={`inline-block mt-1.5 rounded-full shrink-0 ${
                                    isSub ? 'w-1.5 h-1.5 bg-teal-600' : 'w-2 h-2 bg-emerald-700'
                                  }`} />
                                  <span>{pt}</span>
                                </li>
                              );
                            })}
                          </ul>

                          {/* Formula Callout */}
                          {section.formula && (
                            <div className="p-3.5 rounded-lg bg-[#fcfbf9] border border-emerald-200 flex items-center gap-3">
                              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                                Formule
                              </span>
                              <code className="text-xs sm:text-sm font-mono text-emerald-900 font-bold">
                                {section.formula}
                              </code>
                            </div>
                          )}

                          {/* Code Example */}
                          {section.codeExample && (
                            <div className="rounded-xl overflow-hidden border border-stone-300 bg-stone-900 shadow-sm">
                              <div className="bg-stone-800 px-4 py-2 flex items-center justify-between border-b border-stone-700">
                                <span className="text-[11px] font-mono font-bold text-stone-200 uppercase">
                                  Exemple {section.codeExample.language}
                                </span>
                                <button
                                  onClick={() => handleCopyCode(section.codeExample!.code, `${module.id}-${secIdx}`)}
                                  className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white"
                                >
                                  {copiedKey === `${module.id}-${secIdx}` ? (
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
                              <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                                <code>{section.codeExample.code}</code>
                              </pre>
                              {section.codeExample.note && (
                                <div className="bg-stone-850 px-4 py-2 border-t border-stone-800 text-[11px] text-stone-400 italic">
                                  {section.codeExample.note}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Pedagogical Callout Box */}
                          {section.callout && (
                            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                              section.callout.type === 'tip'
                                ? 'bg-amber-50 border-amber-300 text-amber-900'
                                : section.callout.type === 'warning'
                                ? 'bg-rose-50 border-rose-300 text-rose-900'
                                : section.callout.type === 'exercise'
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                                : 'bg-stone-100 border-stone-300 text-stone-900'
                            }`}>
                              {section.callout.type === 'tip' && <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />}
                              {section.callout.type === 'warning' && <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />}
                              {section.callout.type === 'exercise' && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />}
                              {section.callout.type === 'info' && <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />}
                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide mb-1">
                                  {section.callout.title}
                                </h4>
                                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-stone-700">
                                  {section.callout.text}
                                </p>
                              </div>
                            </div>
                          )}

                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
