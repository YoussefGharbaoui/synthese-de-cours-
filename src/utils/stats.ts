/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Fonctions statistiques pures conformes aux formules du cours M201
 * "Approfondir les Systèmes Décisionnels" (Pr. SADRATI Zakariae).
 */

export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  return sum / values.length;
}

export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

export function calculateMode(values: number[]): number[] {
  if (values.length === 0) return [];
  const counts = new Map<number, number>();
  let maxCount = 0;

  for (const val of values) {
    const c = (counts.get(val) || 0) + 1;
    counts.set(val, c);
    if (c > maxCount) {
      maxCount = c;
    }
  }

  // Si toutes les valeurs n'apparaissent qu'une fois, pas de mode unique
  if (maxCount <= 1 && values.length > 1) {
    return [];
  }

  const modes: number[] = [];
  for (const [val, c] of counts.entries()) {
    if (c === maxCount) {
      modes.push(val);
    }
  }
  return modes.sort((a, b) => a - b);
}

export function calculateRange(values: number[]): number {
  if (values.length === 0) return 0;
  const min = Math.min(...values);
  const max = Math.max(...values);
  return max - min;
}

/**
 * Variance d'échantillon (divisé par n - 1) ou de population (divisé par n)
 */
export function calculateVariance(values: number[], isSample: boolean = true): number {
  if (values.length <= 1) return 0;
  const mean = calculateMean(values);
  const sumSquaredDiff = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  const denominator = isSample ? values.length - 1 : values.length;
  return sumSquaredDiff / denominator;
}

export function calculateStandardDeviation(values: number[], isSample: boolean = true): number {
  return Math.sqrt(calculateVariance(values, isSample));
}

/**
 * Calcul d'un quantile (p entre 0 et 1)
 */
export function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

export interface QuartileResult {
  q1: number;
  q2: number; // Médiane
  q3: number;
  iqr: number;
}

export function calculateQuartiles(values: number[]): QuartileResult {
  const q1 = calculatePercentile(values, 25);
  const q2 = calculateMedian(values);
  const q3 = calculatePercentile(values, 75);
  return {
    q1,
    q2,
    q3,
    iqr: q3 - q1,
  };
}

export interface OutlierDetectionResult {
  lowerThreshold: number;
  upperThreshold: number;
  outliers: number[];
  validValues: number[];
}

/**
 * Méthode IQR / Tukey :
 * Seuil inférieur = Q1 - k * IQR
 * Seuil supérieur = Q3 + k * IQR (k=1.5 standard, k=3 Tukey extrême)
 */
export function detectOutliersIQR(values: number[], k: number = 1.5): OutlierDetectionResult {
  const { q1, q3, iqr } = calculateQuartiles(values);
  const lowerThreshold = q1 - k * iqr;
  const upperThreshold = q3 + k * iqr;

  const outliers: number[] = [];
  const validValues: number[] = [];

  for (const v of values) {
    if (v < lowerThreshold || v > upperThreshold) {
      outliers.push(v);
    } else {
      validValues.push(v);
    }
  }

  return { lowerThreshold, upperThreshold, outliers, validValues };
}

/**
 * Méthode des deux écarts-types (2-Sigma) :
 * Seuil inférieur = Moyenne - 2 * sigma
 * Seuil supérieur = Moyenne + 2 * sigma
 */
export function detectOutliersTwoSigma(values: number[]): OutlierDetectionResult {
  const mean = calculateMean(values);
  const std = calculateStandardDeviation(values, true);
  const lowerThreshold = mean - 2 * std;
  const upperThreshold = mean + 2 * std;

  const outliers: number[] = [];
  const validValues: number[] = [];

  for (const v of values) {
    if (v < lowerThreshold || v > upperThreshold) {
      outliers.push(v);
    } else {
      validValues.push(v);
    }
  }

  return { lowerThreshold, upperThreshold, outliers, validValues };
}

/**
 * Z-score = (x - mean) / std
 */
export function calculateZScores(values: number[]): number[] {
  const mean = calculateMean(values);
  const std = calculateStandardDeviation(values, true);
  if (std === 0) return values.map(() => 0);
  return values.map(v => (v - mean) / std);
}

/**
 * Normalisation Min-Max dans [0, 1] :
 * x_norm = (x - min) / (max - min)
 */
export function minMaxNormalize(values: number[]): number[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  if (range === 0) return values.map(() => 0.5);
  return values.map(v => (v - min) / range);
}
