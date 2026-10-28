/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  KEY_FORMULAS, 
  FormulaReference 
} from '../data/courseData';
import { 
  Calculator, 
  Search, 
  Copy, 
  Check
} from 'lucide-react';

export const FormulaSheetView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredFormulas = KEY_FORMULAS.filter((f) => {
    const term = searchTerm.toLowerCase();
    return (
      f.name.toLowerCase().includes(term) ||
      f.category.toLowerCase().includes(term) ||
      f.description.toLowerCase().includes(term) ||
      f.pythonSyntax.toLowerCase().includes(term) ||
      f.rSyntax.toLowerCase().includes(term) ||
      f.excelSyntax.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#f8f6f0] text-stone-800">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-teal-700 flex items-center justify-center text-white shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              Mémento des Formules & Comparateur Logiciel
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Formules mathématiques et syntaxe correspondante en Python, R et Excel (FR/EN)
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Filtrer (ex: variance, Bayes, IQR)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>
      </div>

      {/* Formulas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFormulas.map((item, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                  {item.category}
                </span>
                <span className="text-xs text-stone-400 font-mono">#{idx + 1}</span>
              </div>

              <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                {item.name}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {item.description}
              </p>

              {/* Mathematical formula badge */}
              <div className="mt-3 p-3 rounded-xl bg-[#fcfbf9] border border-emerald-200 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-900 font-bold">
                  {item.formula}
                </span>
              </div>
            </div>

            {/* Syntax Triad (Python / R / Excel) */}
            <div className="space-y-2 pt-2 border-t border-stone-200 text-xs font-mono">
              
              {/* Python */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-2 overflow-hidden mr-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 shrink-0">
                    Python
                  </span>
                  <span className="text-stone-800 truncate">{item.pythonSyntax}</span>
                </div>
                <button
                  onClick={() => handleCopy(item.pythonSyntax, `py-${idx}`)}
                  className="text-stone-400 hover:text-stone-700 shrink-0 p-1"
                >
                  {copiedKey === `py-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* R */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-2 overflow-hidden mr-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-900 shrink-0">
                    R
                  </span>
                  <span className="text-stone-800 truncate">{item.rSyntax}</span>
                </div>
                <button
                  onClick={() => handleCopy(item.rSyntax, `r-${idx}`)}
                  className="text-stone-400 hover:text-stone-700 shrink-0 p-1"
                >
                  {copiedKey === `r-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Excel */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-2 overflow-hidden mr-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 shrink-0">
                    Excel
                  </span>
                  <span className="text-stone-800 truncate">{item.excelSyntax}</span>
                </div>
                <button
                  onClick={() => handleCopy(item.excelSyntax, `xl-${idx}`)}
                  className="text-stone-400 hover:text-stone-700 shrink-0 p-1"
                >
                  {copiedKey === `xl-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
