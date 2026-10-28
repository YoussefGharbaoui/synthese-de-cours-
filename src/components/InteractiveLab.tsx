/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  FlaskConical, 
  BarChart3, 
  Dices, 
  Sliders, 
  Palette, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { 
  calculateMean, 
  calculateMedian, 
  calculateMode, 
  calculateRange, 
  calculateVariance, 
  calculateStandardDeviation, 
  calculateQuartiles, 
  detectOutliersIQR, 
  detectOutliersTwoSigma,
  calculateZScores,
  minMaxNormalize
} from '../utils/stats';

type LabTab = 'outliers' | 'montecarlo' | 'scaling' | 'dataviz';

export const InteractiveLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('outliers');

  // --- OUTLIER DETECTOR STATE ---
  const presetDatasets = {
    notes_examen: {
      name: "Notes d'examen avec 2 (Séance 02 slide 5)",
      values: [8, 9, 10, 10, 11, 12, 12, 13, 14, 14, 15, 16, 17, 18, 2]
    },
    salaires_entreprise: {
      name: "Salaires en DH avec 6000 (Séance 02 slide 9)",
      values: [3000, 3200, 3500, 3700, 4000, 6000]
    },
    python_twosigma: {
      name: "Données 2-Sigma Python (Séance 02 slide 14)",
      values: [15, 22, 18, 25, 20, 17, 23, 21, 19, 30]
    },
    iqr_cours: {
      name: "Exemple IQR & Tukey (Séance 03 slide 3)",
      values: [2, 3, 4, 5, 6, 7, 20]
    }
  };

  const [inputDatasetString, setInputDatasetString] = useState<string>(
    presetDatasets.iqr_cours.values.join(', ')
  );
  const [detectionMethod, setDetectionMethod] = useState<'iqr' | 'tukey' | 'twosigma'>('iqr');

  // Parse numbers
  const parsedValues = useMemo(() => {
    return inputDatasetString
      .split(/[,;\s]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
  }, [inputDatasetString]);

  // Statistics
  const stats = useMemo(() => {
    if (parsedValues.length === 0) return null;
    const mean = calculateMean(parsedValues);
    const median = calculateMedian(parsedValues);
    const modes = calculateMode(parsedValues);
    const range = calculateRange(parsedValues);
    const variance = calculateVariance(parsedValues, true);
    const stdDev = calculateStandardDeviation(parsedValues, true);
    const quartiles = calculateQuartiles(parsedValues);

    let outlierResult;
    if (detectionMethod === 'iqr') {
      outlierResult = detectOutliersIQR(parsedValues, 1.5);
    } else if (detectionMethod === 'tukey') {
      outlierResult = detectOutliersIQR(parsedValues, 3.0);
    } else {
      outlierResult = detectOutliersTwoSigma(parsedValues);
    }

    return {
      mean,
      median,
      modes,
      range,
      variance,
      stdDev,
      quartiles,
      outlierResult
    };
  }, [parsedValues, detectionMethod]);

  // --- MONTE CARLO STATE ---
  const [samplePct, setSamplePct] = useState<number>(10);
  const [seedCount, setSeedCount] = useState<number>(0);

  const population = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 1000; i++) {
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      arr.push(Math.round((170 + z0 * 10) * 10) / 10);
    }
    return arr;
  }, []);

  const populationMean = useMemo(() => calculateMean(population), [population]);
  const populationStd = useMemo(() => calculateStandardDeviation(population, false), [population]);

  const monteCarloSample = useMemo(() => {
    const count = Math.max(2, Math.round((samplePct / 100) * population.length));
    const indices = new Set<number>();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * population.length));
    }
    const sample = Array.from(indices).map((idx) => ({
      index: idx,
      value: population[idx]
    }));
    const sampleValues = sample.map((s) => s.value);
    const sampleMean = calculateMean(sampleValues);
    const sampleStd = calculateStandardDeviation(sampleValues, true);
    return {
      sample,
      sampleMean,
      sampleStd,
      errorPct: Math.abs((sampleMean - populationMean) / populationMean) * 100
    };
  }, [population, samplePct, seedCount, populationMean]);

  // --- SCALING STATE ---
  const scalingData = useMemo(() => [10, 20, 25, 30, 45, 90, 150], []);
  const zScores = useMemo(() => calculateZScores(scalingData), [scalingData]);
  const minMaxValues = useMemo(() => minMaxNormalize(scalingData), [scalingData]);

  // --- DATAVIZ SIMULATION STATE ---
  const [simulateDaltonism, setSimulateDaltonism] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#f8f6f0] text-stone-800">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-teal-700 flex items-center justify-center text-white shadow-xs">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Atelier Interactif & Simulateurs Pédagogiques
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Expérimentez en direct les formules et algorithmes du cours M201
            </p>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 no-scrollbar border-t border-stone-200 pt-4">
          <button
            onClick={() => setActiveTab('outliers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'outliers'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Détecteur d'Outliers (IQR & 2-Sigma)</span>
          </button>

          <button
            onClick={() => setActiveTab('montecarlo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'montecarlo'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            <Dices className="w-4 h-4" />
            <span>Simulateur de Monte Carlo</span>
          </button>

          <button
            onClick={() => setActiveTab('scaling')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'scaling'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Z-Score vs Min-Max [0, 1]</span>
          </button>

          <button
            onClick={() => setActiveTab('dataviz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'dataviz'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Palettes & Accessibilité (Astuce 0)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: OUTLIERS & BOXPLOT CALCULATOR */}
      {activeTab === 'outliers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Controls & Inputs */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-stone-900 mb-2">1. Charger un jeu de données</h2>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(presetDatasets).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setInputDatasetString(item.values.join(', '))}
                    className="text-left text-xs p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 transition-all truncate font-medium"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-900 mb-1.5">
                Ou modifier les valeurs (séparées par une virgule) :
              </label>
              <textarea
                value={inputDatasetString}
                onChange={(e) => setInputDatasetString(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-xs font-mono text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <span className="text-[11px] text-stone-500">
                {parsedValues.length} valeurs valides détectées
              </span>
            </div>

            <div>
              <h2 className="text-base font-bold text-stone-900 mb-2">2. Méthode de détection</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100">
                  <input
                    type="radio"
                    name="method"
                    checked={detectionMethod === 'iqr'}
                    onChange={() => setDetectionMethod('iqr')}
                    className="text-emerald-800 focus:ring-emerald-700"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">IQR Standard (k = 1.5)</span>
                    <span className="text-[11px] text-stone-500">Q1 - 1.5×IQR / Q3 + 1.5×IQR</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100">
                  <input
                    type="radio"
                    name="method"
                    checked={detectionMethod === 'tukey'}
                    onChange={() => setDetectionMethod('tukey')}
                    className="text-emerald-800 focus:ring-emerald-700"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Règle de Tukey (k = 3.0)</span>
                    <span className="text-[11px] text-stone-500">Élimine moins de données (extrêmes)</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100">
                  <input
                    type="radio"
                    name="method"
                    checked={detectionMethod === 'twosigma'}
                    onChange={() => setDetectionMethod('twosigma')}
                    className="text-emerald-800 focus:ring-emerald-700"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Deux Écarts-Types (2-Sigma)</span>
                    <span className="text-[11px] text-stone-500">Moyenne ± 2σ (Loi normale)</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Results & Visual Boxplot */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-xs">
            {stats ? (
              <>
                {/* Metric Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#fbf9f5] rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Moyenne (X̄)</span>
                    <span className="text-lg font-black text-stone-900">{stats.mean.toFixed(2)}</span>
                  </div>
                  <div className="p-3 bg-[#fbf9f5] rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Médiane (Q2)</span>
                    <span className="text-lg font-black text-emerald-800">{stats.median.toFixed(2)}</span>
                  </div>
                  <div className="p-3 bg-[#fbf9f5] rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Écart-Type (s)</span>
                    <span className="text-lg font-black text-amber-700">{stats.stdDev.toFixed(2)}</span>
                  </div>
                  <div className="p-3 bg-[#fbf9f5] rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">IQR (Q3 - Q1)</span>
                    <span className="text-lg font-black text-teal-800">{stats.quartiles.iqr.toFixed(2)}</span>
                  </div>
                </div>

                {/* Additional Stats Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200 text-stone-700">
                  <div>
                    <span className="text-stone-500">Mode : </span>
                    <strong className="text-stone-900">{stats.modes.length > 0 ? stats.modes.join(', ') : 'Aucun mode unique'}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">Étendue : </span>
                    <strong className="text-stone-900">{stats.range}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">Variance (s²) : </span>
                    <strong className="text-stone-900">{stats.variance.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">Q1 (25%) : </span>
                    <strong className="text-stone-900">{stats.quartiles.q1.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">Q3 (75%) : </span>
                    <strong className="text-stone-900">{stats.quartiles.q3.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">Seuils : </span>
                    <strong className="text-stone-900">[{stats.outlierResult.lowerThreshold.toFixed(1)}, {stats.outlierResult.upperThreshold.toFixed(1)}]</strong>
                  </div>
                </div>

                {/* Visual Strip / Box Plot Schematic */}
                <div className="bg-[#fcfbf9] p-6 rounded-2xl border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                      Visualisation Graphique de la Distribution
                    </h4>
                    <span className="text-xs text-stone-500">
                      Points normaux (bleus) • Outliers (croix rouges)
                    </span>
                  </div>

                  {/* SVG Strip & Box Plot */}
                  <div className="relative w-full h-36 bg-white rounded-xl border border-stone-200 overflow-hidden flex items-center justify-center">
                    {(() => {
                      const allVals = parsedValues;
                      const minVal = Math.min(...allVals, stats.outlierResult.lowerThreshold);
                      const maxVal = Math.max(...allVals, stats.outlierResult.upperThreshold);
                      const scale = (val: number) => {
                        const range = maxVal - minVal || 1;
                        return 40 + ((val - minVal) / range) * 820;
                      };

                      const boxLeft = scale(stats.quartiles.q1);
                      const boxRight = scale(stats.quartiles.q3);
                      const medianPos = scale(stats.median);
                      const lowerBound = scale(stats.outlierResult.lowerThreshold);
                      const upperBound = scale(stats.outlierResult.upperThreshold);

                      return (
                        <svg viewBox="0 0 900 140" className="w-full h-full">
                          {/* Shaded Normal Zone */}
                          <rect
                            x={Math.max(40, lowerBound)}
                            y="20"
                            width={Math.max(10, Math.min(860, upperBound) - Math.max(40, lowerBound))}
                            height="100"
                            fill="rgba(16, 185, 129, 0.08)"
                            rx="8"
                          />

                          {/* Threshold / Border Lines */}
                          <line x1={lowerBound} y1="15" x2={lowerBound} y2="120" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 4" />
                          <line x1={upperBound} y1="15" x2={upperBound} y2="120" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 4" />

                          {/* Whisker Lines (from Borders to Central Box) */}
                          <line x1={Math.max(30, lowerBound)} y1="70" x2={boxLeft} y2="70" stroke="#047857" strokeWidth="2" />
                          <line x1={boxRight} y1="70" x2={Math.min(870, upperBound)} y2="70" stroke="#047857" strokeWidth="2" />
                          {/* Whisker end caps (Borders) */}
                          <line x1={Math.max(30, lowerBound)} y1="55" x2={Math.max(30, lowerBound)} y2="85" stroke="#dc2626" strokeWidth="2" />
                          <line x1={Math.min(870, upperBound)} y1="55" x2={Math.min(870, upperBound)} y2="85" stroke="#dc2626" strokeWidth="2" />

                          {/* Central Box (IQR: Q1 to Q3) */}
                          <rect
                            x={boxLeft}
                            y="40"
                            width={Math.max(6, boxRight - boxLeft)}
                            height="60"
                            fill="#065f46"
                            fillOpacity="0.85"
                            stroke="#047857"
                            strokeWidth="2"
                            rx="4"
                          />

                          {/* Median Line inside Box */}
                          <line x1={medianPos} y1="40" x2={medianPos} y2="100" stroke="#fbbf24" strokeWidth="3" />

                          {/* Individual Data Points */}
                          {parsedValues.map((v, i) => {
                            const isOutlier = stats.outlierResult.outliers.includes(v);
                            const x = scale(v);
                            return (
                              <g key={i}>
                                {isOutlier ? (
                                  <g transform={`translate(${x}, 70)`}>
                                    <line x1="-6" y1="-6" x2="6" y2="6" stroke="#dc2626" strokeWidth="3" />
                                    <line x1="-6" y1="6" x2="6" y2="-6" stroke="#dc2626" strokeWidth="3" />
                                    <text y="-14" textAnchor="middle" fill="#dc2626" fontSize="11" fontFamily="monospace" fontWeight="bold">
                                      {v}
                                    </text>
                                  </g>
                                ) : (
                                  <circle
                                    cx={x}
                                    cy={70 + ((i % 5) - 2) * 4}
                                    r="4.5"
                                    fill="#2563eb"
                                    fillOpacity="0.85"
                                    stroke="#1e40af"
                                    strokeWidth="1.5"
                                  />
                                )}
                              </g>
                            );
                          })}

                          {/* Descriptive Labels */}
                          <text x={Math.max(40, lowerBound)} y="134" fill="#dc2626" fontSize="10" textAnchor="middle" fontWeight="bold">
                            Borne Inf. (Border: {stats.outlierResult.lowerThreshold.toFixed(1)})
                          </text>
                          <text x={boxLeft} y="32" fill="#065f46" fontSize="10" textAnchor="middle" fontWeight="bold">
                            Q1 ({stats.quartiles.q1.toFixed(1)})
                          </text>
                          <text x={medianPos} y="22" fill="#d97706" fontSize="11" textAnchor="middle" fontWeight="bold">
                            Médiane ({stats.median.toFixed(1)})
                          </text>
                          <text x={boxRight} y="32" fill="#065f46" fontSize="10" textAnchor="middle" fontWeight="bold">
                            Q3 ({stats.quartiles.q3.toFixed(1)})
                          </text>
                          <text x={Math.min(860, upperBound)} y="134" fill="#dc2626" fontSize="10" textAnchor="middle" fontWeight="bold">
                            Borne Sup. (Border: {stats.outlierResult.upperThreshold.toFixed(1)})
                          </text>
                        </svg>
                      );
                    })()}
                  </div>
                  <div className="mt-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-200 flex items-center justify-between">
                    <span>
                      <strong className="text-stone-800">Boîte centrale :</strong> Délimitée par <strong>Q1</strong> et <strong>Q3</strong> (50% des données).
                    </span>
                    <span>
                      <strong className="text-red-700">Bornes (Borders) :</strong> Seuils extérieurs de détection (<span className="font-mono">Q1 - 1.5×IQR</span> et <span className="font-mono">Q3 + 1.5×IQR</span>), distincts de Q1 et Q3 !
                    </span>
                  </div>
                </div>

                {/* Outliers Verdict */}
                <div className={`p-4 rounded-xl border flex items-center justify-between ${
                  stats.outlierResult.outliers.length > 0
                    ? 'bg-rose-50 border-rose-300 text-rose-900'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}>
                  <div className="flex items-center gap-3">
                    {stats.outlierResult.outliers.length > 0 ? (
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    <div>
                      <h5 className="font-bold text-sm text-stone-900">
                        {stats.outlierResult.outliers.length > 0
                          ? `${stats.outlierResult.outliers.length} Outlier(s) détecté(s)`
                          : 'Aucune valeur aberrante détectée'}
                      </h5>
                      <p className="text-xs text-stone-700">
                        {stats.outlierResult.outliers.length > 0
                          ? `Valeurs en dehors des seuils : [${stats.outlierResult.outliers.join(', ')}]`
                          : 'Toutes les observations s\'inscrivent dans l\'intervalle de tolérance réglementaire.'}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-stone-500 text-sm">Veuillez entrer des valeurs valides.</p>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: MONTE CARLO SIMULATOR */}
      {activeTab === 'montecarlo' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Simulation de Monte Carlo (Expérience du Cours : Tailles)
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Population de référence : <strong>1 000 individus</strong> (Hauteur théorique μ = 170 cm, σ = 10 cm).
              </p>
            </div>

            <button
              onClick={() => setSeedCount((c) => c + 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs self-start md:self-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Relancer le Tirage Aléatoire</span>
            </button>
          </div>

          {/* Sample Size Control */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-stone-800">Taille de l'échantillon prélevé :</span>
            {[0.5, 5, 10, 25].map((pct) => (
              <button
                key={pct}
                onClick={() => setSamplePct(pct)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  samplePct === pct
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {pct}% ({Math.round((pct / 100) * 1000)} individus)
              </button>
            ))}
          </div>

          {/* Metrics Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#fcfbf9] border border-stone-200">
              <span className="text-xs font-semibold text-stone-500 block">Population Réelle (1000)</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-stone-900">{populationMean.toFixed(2)}</span>
                <span className="text-xs text-stone-500">cm (Moyenne)</span>
              </div>
              <span className="text-xs text-stone-500 block mt-1">Écart-type réel = {populationStd.toFixed(2)} cm</span>
            </div>

            <div className="p-4 rounded-xl bg-[#fcfbf9] border border-emerald-300">
              <span className="text-xs font-semibold text-emerald-800 block">
                Échantillon Monte Carlo ({samplePct}%)
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-800">{monteCarloSample.sampleMean.toFixed(2)}</span>
                <span className="text-xs text-emerald-700">cm (Estimé)</span>
              </div>
              <span className="text-xs text-stone-500 block mt-1">Écart-type estimé = {monteCarloSample.sampleStd.toFixed(2)} cm</span>
            </div>

            <div className="p-4 rounded-xl bg-[#fcfbf9] border border-stone-200">
              <span className="text-xs font-semibold text-stone-500 block">Erreur Relative</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className={`text-2xl font-black ${monteCarloSample.errorPct < 1.0 ? 'text-emerald-700' : 'text-amber-600'}`}>
                  {monteCarloSample.errorPct.toFixed(2)}%
                </span>
              </div>
              <span className="text-xs text-stone-500 block mt-1">
                {monteCarloSample.errorPct < 1.0 ? 'Excellente précision' : 'Écart statistique acceptable'}
              </span>
            </div>
          </div>

          {/* Scatter Plot Simulation View */}
          <div className="bg-[#fcfbf9] p-4 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span>Population (1000 points bleus)</span>
              <span className="text-rose-600 font-bold">Échantillon prélevé ({monteCarloSample.sample.length} points rouges)</span>
            </div>

            <div className="relative w-full h-48 bg-white rounded-xl overflow-hidden border border-stone-200">
              <svg viewBox="0 0 1000 200" className="w-full h-full">
                <line x1="0" y1="100" x2="1000" y2="100" stroke="#e7e5e4" strokeDasharray="3 3" />

                {population.map((val, idx) => {
                  const y = 200 - ((val - 140) / 60) * 200;
                  return (
                    <circle
                      key={idx}
                      cx={idx}
                      cy={Math.max(5, Math.min(195, y))}
                      r="1.8"
                      fill="#2563eb"
                      fillOpacity="0.4"
                    />
                  );
                })}

                {monteCarloSample.sample.map((item, sIdx) => {
                  const y = 200 - ((item.value - 140) / 60) * 200;
                  return (
                    <circle
                      key={sIdx}
                      cx={item.index}
                      cy={Math.max(5, Math.min(195, y))}
                      r="4"
                      fill="#dc2626"
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>
            </div>
            <p className="text-xs text-stone-500 italic">
              Conformément à la séance 05 : Même avec un échantillon restreint (5% ou 10%), la moyenne obtenue converge remarquablement vers la vraie moyenne.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: SCALING (Z-SCORE VS MIN-MAX) */}
      {activeTab === 'scaling' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Standardisation (Z-Score) vs Normalisation Min-Max [0, 1]
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Observez comment les deux méthodes transforment le même jeu de données.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-600 bg-stone-50">
                  <th className="py-3 px-4">Valeur Brute (x)</th>
                  <th className="py-3 px-4 text-emerald-800">Standardisation Z-Score (μ=0, σ=1)</th>
                  <th className="py-3 px-4 text-teal-800">Normalisation Min-Max [0, 1]</th>
                  <th className="py-3 px-4 text-stone-600">Diagnostic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-mono">
                {scalingData.map((val, i) => {
                  const z = zScores[i];
                  const mm = minMaxValues[i];
                  const isZOutlier = Math.abs(z) > 2.0;

                  return (
                    <tr key={i} className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-bold text-stone-900">{val}</td>
                      <td className="py-3 px-4 text-emerald-800 font-bold">
                        {z >= 0 ? `+${z.toFixed(3)}` : z.toFixed(3)}
                      </td>
                      <td className="py-3 px-4 text-teal-800 font-bold">
                        {mm.toFixed(3)}
                      </td>
                      <td className="py-3 px-4 font-sans text-xs">
                        {isZOutlier ? (
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 font-semibold">
                            Écart significatif
                          </span>
                        ) : (
                          <span className="text-stone-500">Normal</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#fcfbf9] border border-emerald-200">
              <h4 className="font-bold text-emerald-900 mb-1">Standardisation : Z = (x - μ) / σ</h4>
              <p className="text-stone-700 leading-relaxed">
                Les valeurs ne sont pas bornées. La moyenne devient 0 et l'écart-type 1. Recommandée pour la Régression Linéaire, l'ACP et le clustering K-Means.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#fcfbf9] border border-teal-200">
              <h4 className="font-bold text-teal-900 mb-1">Normalisation : (x - Min) / (Max - Min)</h4>
              <p className="text-stone-700 leading-relaxed">
                Toutes les valeurs sont compressées strictement entre 0 et 1. Recommandée pour les Réseaux de Neurones et KNN.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DATAVIZ PALETTE & COLORBLINDNESS SIMULATION */}
      {activeTab === 'dataviz' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Stratégie des Couleurs & Accessibilité (Astuce 0 du Pr. SADRATI)
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Pourquoi le duo <strong>Bleu + Orange/Rouge</strong> surpasse le classique Rouge + Vert.
              </p>
            </div>

            <button
              onClick={() => setSimulateDaltonism(!simulateDaltonism)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                simulateDaltonism
                  ? 'bg-amber-700 border-amber-700 text-white'
                  : 'bg-stone-100 border-stone-300 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <span>{simulateDaltonism ? 'Désactiver Filtre Daltonisme' : 'Simuler Deutéranopie (Daltonisme)'}</span>
            </button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${simulateDaltonism ? 'filter saturate-50 hue-rotate-15 contrast-125' : ''}`}>
            
            {/* Recommended Palette */}
            <div className="bg-[#fcfbf9] p-6 rounded-2xl border border-emerald-300 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Recommandé par le Cours
                </span>
                <span className="text-xs text-emerald-800 font-bold">100% Accessible</span>
              </div>
              <h3 className="font-bold text-base text-stone-900">Palette Décisionnelle : Bleu & Orange/Rouge</h3>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-14 rounded-xl bg-[#4E79A7] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  Bleu (#4E79A7)
                </div>
                <div className="flex-1 h-14 rounded-xl bg-[#F28E2B] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  Orange (#F28E2B)
                </div>
                <div className="flex-1 h-14 rounded-xl bg-[#E15759] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  Rouge atténué (#E15759)
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed">
                Cette combinaison offre un contraste percutant. Même sous filtre de deutéranopie, le bleu et l'orange restent immédiatement discernables sans aucune confusion visuelle.
              </p>
            </div>

            {/* Problematic Palette */}
            <div className="bg-[#fcfbf9] p-6 rounded-2xl border border-stone-200 space-y-4 opacity-90 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-rose-100 text-rose-900 border border-rose-300">
                  À Éviter (Piège Fréquent)
                </span>
                <span className="text-xs text-rose-700 font-bold">Confusion Daltonienne</span>
              </div>
              <h3 className="font-bold text-base text-stone-900">Palette Classique : Vert Pur & Rouge Pur</h3>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-14 rounded-xl bg-[#22c55e] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  Vert Pur (#22C55E)
                </div>
                <div className="flex-1 h-14 rounded-xl bg-[#ef4444] flex items-center justify-center text-xs font-bold text-white shadow-xs">
                  Rouge Pur (#EF4444)
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed">
                Pour environ 8% des hommes et 0.5% des femmes atteints de daltonisme rouge-vert, ces deux couleurs paraissent presque identiques.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
