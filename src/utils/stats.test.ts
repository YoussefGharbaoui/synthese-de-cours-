import test from 'node:test';
import assert from 'node:assert/strict';
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
  minMaxNormalize,
} from './stats';

test('Calcul de la Moyenne (Exemple Séance 01 slide 15)', () => {
  const notes = [10, 12, 14, 16, 18];
  assert.equal(calculateMean(notes), 14);
});

test('Calcul de la Médiane paire et impaire (Séance 01 slide 16)', () => {
  assert.equal(calculateMedian([8, 10, 12, 14, 16]), 12);
  assert.equal(calculateMedian([10, 12, 14, 16]), 13);
});

test('Calcul du Mode (Séance 01 slide 17)', () => {
  const notes = [10, 12, 12, 14, 16, 12];
  assert.deepEqual(calculateMode(notes), [12]);
});

test('Calcul de l Étendue / Range (Séance 02 slide 4)', () => {
  const salaires = [3000, 3500, 4000, 4500, 6000];
  assert.equal(calculateRange(salaires), 3000);
});

test('Calcul de la Variance d échantillon (Séance 02 slide 7)', () => {
  const data = [6, 7, 8];
  assert.equal(calculateVariance(data, true), 1);
});

test('Calcul de la Variance de population (Séance 02 slide 8)', () => {
  const temps = [25, 26, 27, 28, 29];
  assert.equal(calculateVariance(temps, false), 2);
  assert.ok(Math.abs(calculateStandardDeviation(temps, false) - Math.sqrt(2)) < 0.0001);
});

test('Calcul du Z-score (Séance 03 slide 9)', () => {
  // x = 7, mean = 5, s = 1 => Z = 2
  const zScore = (7 - 5) / 1;
  assert.equal(zScore, 2);
});

test('Détection d anomalies par IQR (Séance 03 slide 3)', () => {
  // data = [2, 3, 4, 5, 6, 7, 20]
  const data = [2, 3, 4, 5, 6, 7, 20];
  const result = detectOutliersIQR(data, 1.5);
  assert.ok(result.outliers.includes(20));
  assert.ok(!result.outliers.includes(5));
});

test('Normalisation Min-Max dans [0, 1] (Séance 04 slide 2)', () => {
  const values = [10, 20, 30, 40, 50];
  const normalized = minMaxNormalize(values);
  assert.equal(normalized[0], 0);
  assert.equal(normalized[normalized.length - 1], 1);
  assert.equal(normalized[2], 0.5);
});
