/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COURSE_MODULES, KEY_FORMULAS } from '../data/courseData';
import { GraduationCap, CheckCircle2, Bookmark, Calculator, Code2 } from 'lucide-react';

export const PrintableCourseSummary: React.FC = () => {
  return (
    <div className="printable-summary-document font-serif text-stone-900 bg-white p-8 max-w-4xl mx-auto">
      
      {/* Document Header (Page de garde / En-tête officiel) */}
      <div className="border-b-2 border-emerald-800 pb-6 mb-8">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-emerald-800 font-sans font-bold text-xs uppercase tracking-widest">
            <GraduationCap className="w-5 h-5 text-emerald-700" />
            <span>Filière Intelligence Artificielle • Option Assistant Data Analyst</span>
          </div>
          <span className="font-sans text-xs text-stone-700 bg-stone-100 px-2.5 py-1 rounded font-semibold border border-stone-300">
            Module M201
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight font-sans">
          Approfondir les Systèmes Décisionnels
        </h1>
        <p className="text-sm font-sans text-stone-700 mt-1 font-medium">
          Livret de Synthèse Pédagogique Intégrale & Mémento d'Examen
        </p>

        <div className="flex items-center justify-between text-xs font-sans text-stone-700 pt-3 mt-3 border-t border-stone-200">
          <span>Enseignant Responsable : <strong className="text-stone-900">Pr. SADRATI Zakariae</strong></span>
          <span>Année Universitaire & Formation Continue</span>
        </div>
      </div>

      {/* Sommaire Rapide */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-8 font-sans">
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
          Sommaire des 7 Séances de Cours
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
          <div>• <strong>Séance 01</strong> : Fondements & Mesures Centrales (Moyenne, Médiane, Mode)</div>
          <div>• <strong>Séance 02</strong> : Dispersion & Détection Univariée (2-Sigma)</div>
          <div>• <strong>Séance 03</strong> : Position, IQR, Règle de Tukey & Box Plots</div>
          <div>• <strong>Séance 04</strong> : Standardisation, Normalisation, Isolation Forest & DBSCAN</div>
          <div>• <strong>Séance 05</strong> : Probabilités, Théorème de Bayes & Naive Bayes</div>
          <div>• <strong>Séance 07</strong> : Vulgarisation du Langage R & RStudio</div>
          <div>• <strong>Séance 11</strong> : Visualisation Décisionnelle & Datastorytelling</div>
          <div>• <strong>Mémento</strong> : Formules croisées Python, R et Excel</div>
        </div>
      </div>

      {/* Contenu Détaillé des 7 Modules */}
      <div className="space-y-8">
        {COURSE_MODULES.map((module) => (
          <div key={module.id} className="summary-module-block break-inside-avoid border-b border-stone-200 pb-6">
            
            {/* Titre du module */}
            <div className="flex items-center gap-3 mb-2 font-sans">
              <span className="px-2.5 py-1 rounded bg-emerald-800 text-white font-bold text-xs uppercase tracking-wide">
                {module.seanceNumber}
              </span>
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                {module.title}
              </h2>
            </div>
            <p className="text-xs font-sans text-stone-700 italic mb-3">
              {module.description}
            </p>

            {/* Points Clés à Retenir */}
            <div className="bg-emerald-50/60 border-l-4 border-emerald-700 p-3 rounded-r-lg mb-4 font-sans">
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-emerald-700" />
                <span>Points fondamentaux à retenir :</span>
              </h3>
              <ul className="space-y-1 text-xs text-stone-800">
                {module.keyTakeaways.map((tk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{tk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sections et listes à puces explicatives */}
            <div className="space-y-4 font-sans">
              {module.sections.map((section, sIdx) => (
                <div key={sIdx} className="bg-white border border-stone-200 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                      {section.title}
                    </h4>
                    {section.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-300">
                        {section.badge}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-1 text-xs text-stone-700 leading-relaxed">
                    {section.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-stone-700 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {section.formula && (
                    <div className="bg-stone-50 border border-stone-200 px-3 py-1.5 rounded text-xs font-mono font-bold text-emerald-900">
                      Formule : {section.formula}
                    </div>
                  )}

                  {section.callout && (
                    <div className="bg-stone-50 border border-stone-200 p-2.5 rounded text-xs text-stone-800">
                      <strong className="text-stone-900 block mb-0.5">
                        {section.callout.title} :
                      </strong>
                      <p className="whitespace-pre-line text-stone-700">{section.callout.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Page Mémento des Formules & Syntaxes */}
      <div className="page-break-before mt-10 pt-6 border-t-2 border-emerald-800 font-sans">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-emerald-800" />
          <h2 className="text-xl font-bold text-stone-900">
            Tableau Synthétique des Formules & Syntaxes Logicielles
          </h2>
        </div>
        <p className="text-xs text-stone-700 mb-4">
          Tableau de référence croisée préparé pour les examens et projets analytiques.
        </p>

        <div className="overflow-x-auto border border-stone-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Concept / Formule</th>
                <th className="py-2.5 px-3">Formule Mathématique</th>
                <th className="py-2.5 px-3">Syntaxe Python</th>
                <th className="py-2.5 px-3">Syntaxe R</th>
                <th className="py-2.5 px-3">Formule Excel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800 font-mono text-[11px]">
              {KEY_FORMULAS.map((item, fIdx) => (
                <tr key={fIdx} className="hover:bg-stone-50">
                  <td className="py-2 px-3 font-sans font-bold text-stone-900">{item.name}</td>
                  <td className="py-2 px-3 text-emerald-900">{item.formula}</td>
                  <td className="py-2 px-3 text-blue-800">{item.pythonSyntax}</td>
                  <td className="py-2 px-3 text-indigo-800">{item.rSyntax}</td>
                  <td className="py-2 px-3 text-stone-700">{item.excelSyntax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signature et pied de page */}
      <div className="mt-8 pt-4 border-t border-stone-200 text-center text-xs font-sans text-stone-700 flex items-center justify-between">
        <span>Systèmes Décisionnels M201 • Pr. SADRATI Zakariae</span>
        <span>Document pédagogique de révision imprimé</span>
      </div>

    </div>
  );
};
