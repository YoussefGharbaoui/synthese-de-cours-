/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Données exhaustives des diapositives de la présentation de cours.
 * Les relations mathématiques brutes ont été transférées vers l'onglet Mémento
 * pour offrir un diaporama épuré, axé sur les concepts décisionnels et la pédagogie.
 */

export interface SlideData {
  id: number;
  moduleRef: string;
  badge: string;
  title: string;
  subtitle: string;
  bullets: string[];
  codeSnippet?: {
    lang: string;
    code: string;
  };
  highlightBox?: {
    title: string;
    content: string;
    type?: 'info' | 'tip' | 'warning' | 'success';
  };
  tags: string[];
}

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    moduleRef: 'Général',
    badge: 'Introduction Générale',
    title: 'Approfondir les Systèmes Décisionnels (M201)',
    subtitle: 'Filière IA • Option Assistant Data Analyst • Pr. SADRATI Zakariae',
    bullets: [
      '**Objectif du module** : Maîtriser l\'ensemble de la chaîne de valeur analytique, de la statistique descriptive à la dataviz professionnelle.',
      '**Rôle stratégique de la donnée** : Collecter, organiser, épurer et transformer des flux numériques hétérogènes en leviers d\'aide à la décision.',
      '**Trois piliers fondamentaux** :',
      '  • *Piliers 1 & 2* : Statistiques avancées et détection rigoureuse des anomalies (univariées et multivariées).',
      '  • *Pilier 3* : Modélisation probabiliste (Théorème de Bayes, Naive Bayes) et simulation stochastique (Monte Carlo).',
      '  • *Pilier 4* : Boîte à outils moderne du Data Analyst : Maîtrise conjointe de **Python**, **Excel**, **R & RStudio** et des bonnes pratiques de **Data Storytelling**.'
    ],
    highlightBox: {
      title: 'Vision Pédagogique du Pr. SADRATI',
      content: 'Un bon Data Analyst ne se contente pas d\'aligner des formules : il comprend le sens métier de chaque indicateur, traque les valeurs aberrantes et communique ses insights de façon claire et accessible.',
      type: 'info'
    },
    tags: ['Architecture', 'Data Analyst', 'Décisionnel', 'Introduction']
  },
  {
    id: 2,
    moduleRef: 'Module 1',
    badge: 'Séance 01 • Fondations',
    title: 'Statistique Descriptive vs Statistique Inférentielle',
    subtitle: 'Définitions fondamentales et périmètres d\'action',
    bullets: [
      '**Statistique Descriptive (Décrire)** :',
      '  • Résume numériquement et représente graphiquement un jeu de données exhaustif.',
      '  • Caractérise les observations sans chercher à extrapoler au-delà du périmètre étudié.',
      '**Statistique Inférentielle (Généraliser)** :',
      '  • Extrapole et projette des mesures calculées sur un échantillon vers la population globale.',
      '  • S\'appuie directement sur les lois et concepts de probabilités pour quantifier l\'incertitude.',
      '**Concepts Clés du vocabulaire statistique** :',
      '  • *Population* : L\'ensemble global de référence (ex: l\'ensemble des salariés d\'une entreprise).',
      '  • *Individu (Unité statistique)* : Chaque élément distinct de la population (ex: un salarié).',
      '  • *Caractère (Variable)* : La propriété mesurée sur chaque individu (ex: salaire, âge, ancienneté).'
    ],
    highlightBox: {
      title: 'Différence Clé à Retenir',
      content: 'Statistique Descriptive = "Ce que révèlent mes données actuelles".\nStatistique Inférentielle = "Ce que je peux prédire sur l\'ensemble du monde réel à partir de mon échantillon".',
      type: 'tip'
    },
    tags: ['Statistique Descriptive', 'Statistique Inférentielle', 'Population', 'Individu']
  },
  {
    id: 3,
    moduleRef: 'Module 1',
    badge: 'Séance 01 • Typologie',
    title: 'Classification des Variables Statistiques (Caractères)',
    subtitle: 'La boussole indispensable avant tout traitement de données',
    bullets: [
      '**Variables Qualitatives (Catégorielles - aucune opération arithmétique)** :',
      '  • *Nominales* : Catégories sans hiérarchie ni relation d\'ordre (ex: couleur des yeux, sexe, marque de PC, position sur le terrain).',
      '  • *Ordinales* : Catégories avec ordre ou gradation logique (ex: niveau d\'étude [primaire < secondaire < sup], satisfaction [faible < moyen < élevé], classement 1er/2e/3e).',
      '**Variables Quantitatives (Numériques - calculs arithmétiques possibles)** :',
      '  • *Discrètes* : Valeurs entières issues d\'un dénombrement ou comptage (ex: nombre d\'enfants, nombre d\'élèves, nombre de buts marqués).',
      '  • *Continues* : Valeurs réelles décimales issues d\'un instrument de mesure (ex: taille [1.72 m], poids [68.5 kg], température [36.7 °C], temps de jeu).'
    ],
    highlightBox: {
      title: 'Correction de l\'Exercice du Cours (Entraîneur de football)',
      content: '• Nombre de buts marqués → Quantitative discrète\n• Position sur le terrain (gardien, attaquant...) → Qualitative nominale\n• Temps de jeu (en minutes) → Quantitative continue\n• Classement dans le championnat (1er, 2e...) → Qualitative ordinale',
      type: 'success'
    },
    tags: ['Qualitative', 'Quantitative', 'Nominale', 'Ordinale', 'Discrète', 'Continue']
  },
  {
    id: 4,
    moduleRef: 'Module 1',
    badge: 'Séance 01 • Tendance Centrale',
    title: 'Les Trois Mesures Centrales : Moyenne, Médiane & Mode',
    subtitle: 'Localiser le point typique d\'une distribution',
    bullets: [
      '**Moyenne (Mean / Average)** :',
      '  • Somme de toutes les valeurs divisée par l\'effectif total.',
      '  • Indispensable lorsque chaque observation porte exactement la même importance.',
      '  • *Faiblesse majeure* : Fortement perturbée par la moindre valeur aberrante.',
      '**Médiane (Median - Deuxième Quartile)** :',
      '  • Valeur frontière qui sépare la série ordonnée en deux groupes d\'effectifs égaux (50% en dessous, 50% au-dessus).',
      '  • *Force absolue* : Résiliente et insensible aux valeurs extrêmes (aberrantes).',
      '**Mode (Mode)** :',
      '  • Valeur apparaissant avec la fréquence maximale dans la série (la situation la plus courante).',
      '**Équivalences Logicielles** :',
      '  • Excel FR : `=MOYENNE()`, `=MEDIANE()`, `=MODE.SIMPLE()`',
      '  • Python : `statistics.mean()`, `statistics.median()`, `statistics.mode()`'
    ],
    codeSnippet: {
      lang: 'python',
      code: `import statistics
notes = [10, 11, 12, 14, 15, 16, 17, 17, 18, 19]
print("Moyenne:", statistics.mean(notes))   # 14.9
print("Mode:   ", statistics.mode(notes))   # 17 (note la plus fréquente)
print("Médiane:", statistics.median(notes)) # 15.5`
    },
    tags: ['Moyenne', 'Médiane', 'Mode', 'Excel', 'Python']
  },
  {
    id: 5,
    moduleRef: 'Module 2',
    badge: 'Séance 02 • Dispersion',
    title: 'Mesures de Dispersion : Étendue, Variance & Écart-Type',
    subtitle: 'Quantifier l\'hétérogénéité et l\'étalement des données',
    bullets: [
      '**Pourquoi la dispersion est vitale ?** Deux classes peuvent avoir 12/20 de moyenne, mais l\'une oscille entre 11 et 13 (très homogène) tandis que l\'autre va de 4 à 20 (très hétérogène).',
      '**L\'Étendue (Range)** :',
      '  • Écart direct entre l\'observation maximale et l\'observation minimale.',
      '  • *Limites* : Ignore la distribution interne et dépend aveuglément des valeurs extrêmes.',
      '**La Variance (Dispersion quadratique)** :',
      '  • Moyenne des carrés des écarts à la moyenne.',
      '  • Divisée par le nombre d\'individus moins un (n - 1) sur un échantillon pour corriger le biais statistique.',
      '**L\'Écart-Type (Standard Deviation)** :',
      '  • Racine carrée de la variance.',
      '  • *Atout déterminant* : S\'exprime directement dans la même unité physique que la variable (DH, kg, minutes).'
    ],
    highlightBox: {
      title: 'Exemple Réel du Cours (Salaires d\'entreprise)',
      content: 'Salaires (en DH) : [3000, 3500, 4000, 4500, 5000]\n• Moyenne = 4000 DH\n• Variance = 500 000 DH²\n• Écart-type = 707 DH\nInterprétation : Les rémunérations s\'écartent en moyenne de 707 DH autour du salaire moyen.',
      type: 'info'
    },
    tags: ['Dispersion', 'Étendue', 'Variance', 'Écart-Type', 'Bessel']
  },
  {
    id: 6,
    moduleRef: 'Module 2',
    badge: 'Séance 02 • Détection Univariée',
    title: 'Détection d\'Outliers : La Règle des Deux Écarts-Types (2-Sigma)',
    subtitle: 'Isoler les anomalies sous hypothèse d\'une loi normale',
    bullets: [
      '**Cadre théorique** : Fonctionne de manière optimale lorsque la distribution est gaussienne (courbe en cloche symétrique).',
      '**Principe statistique** : Dans une distribution normale, environ 95.45% des observations résident à l\'intérieur de la zone centrale définie par la moyenne plus ou moins deux écarts-types.',
      '**Définition des Seuils de Tolérance** :',
      '  • *Seuil Supérieur* : Moyenne augmentée de deux fois l\'écart-type.',
      '  • *Seuil Inférieur* : Moyenne diminuée de deux fois l\'écart-type.',
      '**Règle de décision décisionnelle** : Tout point situé au-delà de ces deux bornes est classé comme anomalie univariée.'
    ],
    codeSnippet: {
      lang: 'python',
      code: `import numpy as np
data = np.array([15, 22, 18, 25, 20, 17, 23, 21, 19, 30])
mean = np.mean(data)      # 21.0
std = np.std(data)        # 4.098
seuil_sup = mean + 2 * std  # 29.2
seuil_inf = mean - 2 * std  # 12.8
outliers = [x for x in data if x > seuil_sup or x < seuil_inf]
print("Outliers détectés :", outliers) # [30]`
    },
    tags: ['2-Sigma', 'Seuils', 'Outliers', 'Distribution Normale']
  },
  {
    id: 7,
    moduleRef: 'Module 3',
    badge: 'Séance 03 • Position',
    title: 'Mesures de Position : Quartiles, Déciles & Centiles',
    subtitle: 'Segmenter la population pour analyser sa structure fine',
    bullets: [
      '**Les Quartiles (Division en 4 quarts de 25%)** :',
      '  • *Premier quartile (Q1)* : 25% des observations sont inférieures ou égales.',
      '  • *Deuxième quartile (Q2)* : 50% des données sont inférieures (équivaut rigoureusement à la **Médiane**).',
      '  • *Troisième quartile (Q3)* : 75% des observations sont inférieures (et 25% supérieures).',
      '**Les Déciles (Découpage en 10 tranches de 10%)** :',
      '  • Échelonnés de 10% en 10% (le 5e décile correspond à la médiane). Idéal pour comparer les déciles de revenus.',
      '**Les Centiles (Découpage en 100 tranches de 1%)** :',
      '  • Chaque centile représente 1% des données ordonnées (ex: le 95e centile isole les 5% des meilleures performances).'
    ],
    highlightBox: {
      title: 'Exemple Pratique du Pr. SADRATI',
      content: 'Si dans un jeu de notes :\n• Q1 = 7.5 → 25% des étudiants ont eu 7.5 ou moins.\n• D5 = 16.0 → 50% des étudiants ont eu 16 ou moins.\n• C95 = 19.0 → 95% des étudiants ont eu 19 ou moins (seul le top 5% dépasse 19).',
      type: 'tip'
    },
    tags: ['Quartiles', 'Déciles', 'Centiles', 'Percentiles', 'Position']
  },
  {
    id: 8,
    moduleRef: 'Module 3',
    badge: 'Séance 03 • Qualité de Donnée',
    title: 'Analyse des Outliers : Causes, Impacts & Gestion',
    subtitle: 'Pourquoi et comment traiter les valeurs aberrantes en entreprise',
    bullets: [
      '**Définition** : Points de données dont l\'éloignement par rapport à la masse est statistiquement anormal.',
      '**Impacts critiques sur les modèles** :',
      '  • Gonflent artificiellement la moyenne et étirent la variance.',
      '  • Dégradent les performances des algorithmes sensibles à la distance euclidienne (Régression linéaire, K-Means).',
      '**Les 6 grandes causes d\'outliers** :',
      '  1. *Erreur humaine* : Faute de frappe ou saisie manuelle erronée.',
      '  2. *Erreur d\'échantillonnage* : Échantillon non représentatif de la population.',
      '  3. *Erreur expérimentale* : Biais pendant la phase d\'extraction de données.',
      '  4. *Erreur de mesure* : Imprécision ou déréglage de capteurs matériels.',
      '  5. *Erreur de traitement* : Bug de manipulation ou bug dans le code du pipeline ETL.',
      '  6. *Nouveautés / Anomalies naturelles* : Phénomène authentique mais rare (fraude bancaire, cyber-attaque).',
      '**Les 3 stratégies de traitement** :',
      '  • *Remplacement (Imputation)* : Remplacer par la médiane ou moyenne pour préserver les effectifs.',
      '  • *Suppression* : Éliminer la ligne si l\'erreur est irrémédiable.',
      '  • *Conservation* : Maintenir l\'outlier s\'il porte l\'information métier recherchée (fraude).'
    ],
    tags: ['Outliers', 'Nettoyage', 'Imputation', 'Fraude', 'Qualité']
  },
  {
    id: 9,
    moduleRef: 'Module 3',
    badge: 'Séance 03 • Méthode Robuste',
    title: 'Détection Non Paramétrique : Méthode de l\'IQR & Règle de Tukey',
    subtitle: 'Détecter les anomalies sans supposer de loi normale',
    bullets: [
      '**L\'Écart Interquartile (IQR)** :',
      '  • Différence entre le 3e quartile et le 1er quartile, couvrant les 50% de données les plus centrales.',
      '**Méthode IQR Standard (Facteur k = 1.5)** :',
      '  • Seuil Inférieur : Premier quartile moins 1.5 fois l\'IQR.',
      '  • Seuil Supérieur : Troisième quartile plus 1.5 fois l\'IQR.',
      '**Méthode de Tukey (Facteur k = 3.0)** :',
      '  • Élargit la barrière avec un facteur 3 au lieu de 1.5.',
      '  • *Avantage de Tukey* : Élimine moins de données et cible spécifiquement les anomalies qualifiées d\'extrêmes.',
      '**Pourquoi l\'IQR est supérieure au 2-Sigma sur données réelles ?**',
      '  • Parce qu\'elle repose sur les quartiles (insensibles aux valeurs extrêmes), alors que le 2-Sigma dépend de la moyenne et de l\'écart-type (qui sont eux-mêmes faussés par les outliers).'
    ],
    codeSnippet: {
      lang: 'python',
      code: `import numpy as np
data = np.array([2, 3, 4, 5, 6, 7, 20])
q1, q3 = np.percentile(data, [25, 75])  # 3.5 et 6.5
iqr = q3 - q1                           # 3.0
borne_sup_iqr = q3 + 1.5 * iqr          # 11.0
borne_sup_tukey = q3 + 3.0 * iqr        # 15.5
# 20 est un outlier dans les deux méthodes !`
    },
    tags: ['IQR', 'Tukey', 'Percentile', 'Robustesse']
  },
  {
    id: 10,
    moduleRef: 'Module 3',
    badge: 'Séance 03 • Boîte à Moustaches',
    title: 'Anatomie & Lecture d\'un Box Plot (Boîte à Moustaches)',
    subtitle: 'Bien distinguer la boîte centrale (Q1-Q3) des bornes extérieures (borders)',
    bullets: [
      '**La Boîte Centrale (Box)** :',
      '  • Encadrée par le premier quartile Q1 (25%) et le troisième quartile Q3 (75%).',
      '  • Sa hauteur représente l\'Écart Interquartile (IQR) regroupant les 50% de données centrales.',
      '  • La ligne médiane intérieure (Q2 à 50%) sépare la boîte en deux moitiés.',
      '**Les Bornes Inférieure et Supérieure (Borders / Moustaches)** :',
      '  • **Distinction essentielle** : Les bornes inférieure et supérieure représentent les frontières de tolérance ("borders"), et **non pas** les quartiles Q1 et Q3 !',
      '  • *Borne inférieure (Lower border)* : Seuil de tolérance minimal (Q1 - 1.5 × IQR).',
      '  • *Borne supérieure (Upper border)* : Seuil de tolérance maximal (Q3 + 1.5 × IQR).',
      '  • Les moustaches (whiskers) s\'étendent de la boîte jusqu\'à ces bornes extérieures.',
      '**Repérage visuel des Outliers** : Tout point situé **au-delà des bornes (en dehors des borders / moustaches)** est une valeur aberrante certifiée.'
    ],
    highlightBox: {
      title: 'Règle Fondamentale à Retenir',
      content: '• Boîte centrale = Quartiles Q1 et Q3 (le cœur des 50% des données).\n• Bornes inf. et sup. = Les borders (frontières de détection des moustaches).\n• Points au-delà des borders = Valeurs aberrantes (outliers).',
      type: 'tip'
    },
    tags: ['Box Plot', 'Borders', 'Bornes', 'Moustaches', 'Quartiles', 'Outliers']
  },
  {
    id: 11,
    moduleRef: 'Module 3',
    badge: 'Séance 03 • Standardisation',
    title: 'Le Z-Score (Cote Standard)',
    subtitle: 'Quantifier l\'éloignement relatif en nombre d\'écarts-types',
    bullets: [
      '**Définition** : Mesure statistique qui exprime de combien d\'écarts-types une valeur donnée se situe au-dessus ou en dessous de la moyenne de sa distribution.',
      '**Principe de calcul** :',
      '  • Différence entre la valeur et la moyenne, divisée par l\'écart-type.',
      '**Interprétation immédiate** :',
      '  • Score nul (0) : Le point coïncide exactement avec la moyenne.',
      '  • Score positif : La valeur est supérieure à la moyenne.',
      '  • Score négatif : La valeur est inférieure à la moyenne.',
      '**Règle de détection des Outliers** : Une observation ayant un Z-score en valeur absolue supérieur à 3 (plus de 3 écarts-types d\'éloignement) est quasi-certainement une valeur aberrante dans un cadre gaussien.'
    ],
    highlightBox: {
      title: 'Exemple du Cours',
      content: 'Soit un échantillon de moyenne 5 et d\'écart-type 1 :\nPour le point x = 7, le Z-score vaut (7 - 5) / 1 = 2 (situé à 2 écarts-types au-dessus de la moyenne).',
      type: 'info'
    },
    tags: ['Z-Score', 'Standardisation', 'Écart-Type', 'Cote Standard']
  },
  {
    id: 12,
    moduleRef: 'Module 4',
    badge: 'Séance 04 • Mise à l\'Échelle',
    title: 'Standardisation vs Normalisation Min-Max',
    subtitle: 'Comprendre les différences théoriques et leurs usages en Machine Learning',
    bullets: [
      '**Standardisation (Centrage-Réduction / Z-Score)** :',
      '  • *But* : Transformer les données pour obtenir une **moyenne nulle** et une **variance unitaire**.',
      '  • *Effet* : Distribution non bornée (valeurs positives et négatives). Les anomalies se repèrent au-delà de 3 écarts-types.',
      '  • *Modèles préférentiels* : Régression Linéaire & Logistique, Analyse en Composantes Principales (ACP/PCA), K-Means clustering.',
      '**Normalisation (Min-Max Scaling)** :',
      '  • *But* : Échelonner linéairement les données dans un intervalle fermé fixe, généralement entre 0 et 1.',
      '  • *Effet* : Conserve scrupuleusement la forme de la distribution originelle sans la modifier.',
      '  • *Modèles préférentiels* : Réseaux de neurones profonds (stabilise la rétropropagation du gradient), K-Nearest Neighbors (KNN - calcul équitable des distances euclidiennes).',
      '**Le piège des Outliers en Normalisation** : Une seule valeur aberrante géante compresse toutes les autres valeurs normales entre 0.00 et 0.05.'
    ],
    tags: ['Standardisation', 'Normalisation', 'MinMax', 'Machine Learning', 'ACP']
  },
  {
    id: 13,
    moduleRef: 'Module 4',
    badge: 'Séance 04 • Algorithmes Avancés',
    title: 'Isolation Forest (Forêt d\'Isolation)',
    subtitle: 'L\'algorithme qui isole les anomalies plutôt que de modéliser la normalité',
    bullets: [
      '**Changement de paradigme** : Contrairement aux méthodes traditionnelles qui tentent d\'apprendre ce qui est "normal" pour détecter les écarts, Isolation Forest isole directement les anomalies.',
      '**Postulat de base** : Les anomalies sont "rares et quantitativement différentes".',
      '**Fonctionnement mécanique** :',
      '  • Construit un ensemble d\'arbres binaires de partition aléatoire (iTrees).',
      '  • À chaque étape, une caractéristique est choisie au hasard, puis un point de coupure aléatoire entre son min et son max.',
      '**Critère de discrimination** :',
      '  • Les points normaux (situés dans des zones denses) nécessitent de très nombreuses divisions pour être isolés (profondeur d\'arbre importante).',
      '  • Les anomalies (isolées dans l\'espace) sont séparées avec très peu de coupures (profondeur très courte).',
      '**Efficacité** : Très rapide et capable de traiter de gros volumes de données en haute dimension.'
    ],
    highlightBox: {
      title: 'Mnémonique Isolation Forest',
      content: '"Une maison isolée dans le désert est isolée en une seule clôture. Une maison dans une métropole dense exige de découper chaque ruelle pour l\'isoler."',
      type: 'tip'
    },
    tags: ['Isolation Forest', 'iTrees', 'Machine Learning', 'Arbres', 'Anomalies']
  },
  {
    id: 14,
    moduleRef: 'Module 4',
    badge: 'Séance 04 • Clustering par Densité',
    title: 'DBSCAN : Clustering Spatial et Détection Multidimensionnelle',
    subtitle: 'Dépasser les limites des approches univariées avec la densité spatiale',
    bullets: [
      '**DBSCAN** = *Density-Based Spatial Clustering of Applications with Noise*.',
      '**Pourquoi DBSCAN ?** Les méthodes univariées (2-sigma, IQR) analysent une seule colonne à la fois. DBSCAN prend en compte **plusieurs colonnes/dimensions simultanément** et gère des formes géométriques arbitraires (anneaux, spirales, nuages incurvés).',
      '**Les Deux Hyperparamètres Fondamentaux** :',
      '  • *Epsilon (eps)* : Rayon maximal de distance pour considérer qu\'un point est voisin d\'un autre.',
      '  • *Min Samples* : Nombre minimal de points requis dans ce rayon pour constituer une zone dense.',
      '**Classification des Points** :',
      '  • *Core Points (Points centraux)* : Possèdent au moins le nombre requis de voisins dans le rayon eps.',
      '  • *Border Points (Frontières)* : Voisins d\'un point central sans atteindre eux-mêmes le quota de voisins.',
      '  • *Noise Points / Outliers (Bruit)* : Isolés de toute zone dense. **Reçoivent automatiquement l\'étiquette -1**.'
    ],
    codeSnippet: {
      lang: 'python',
      code: `from sklearn.cluster import DBSCAN
dbscan = DBSCAN(eps=0.5, min_samples=5)
labels = dbscan.fit_predict(data)

# Séparation des clusters et des anomalies
clusters = data[labels != -1]
outliers = data[labels == -1]  # Bruit isolé identifié par -1`
    },
    tags: ['DBSCAN', 'Clustering', 'Densité', 'Epsilon', 'Multi-dimensionnel']
  },
  {
    id: 15,
    moduleRef: 'Module 5',
    badge: 'Séance 05 • Probabilités',
    title: 'Probabilité Conditionnelle & Théorème de Bayes',
    subtitle: 'La mise à jour rationnelle de nos croyances face à de nouvelles preuves',
    bullets: [
      '**Probabilité Conditionnelle** :',
      '  • Probabilité qu\'un événement se réalise sachant qu\'un autre événement s\'est déjà avéré.',
      '  • Exemples du cours : Probabilité de pluie sachant un ciel couvert ; probabilité de défaut d\'une pièce sachant la machine employée.',
      '**Le Théorème de Bayes** :',
      '  • Outil probabiliste fondamental permettant d\'actualiser une probabilité à la lumière de nouvelles données ou symptômes observés.',
      '  • Combine la probabilité initiale (*a priori* ou Prior), la vraisemblance d\'apparition du symptôme (*Likelihood*) et la fréquence globale de la preuve.',
      '**Applications directes en IA décisionnelle** : Diagnostic médical et classification automatisée d\'e-mails (filtrage de spams).'
    ],
    highlightBox: {
      title: 'Intuition Bayésienne',
      content: 'Un test médical positif ne signifie pas forcément 99% de chances d\'être malade : si la maladie est très rare (Prior très faible), les faux positifs peuvent dominer !',
      type: 'warning'
    },
    tags: ['Bayes', 'Probabilités', 'Conditionnelle', 'Prior', 'Posterior']
  },
  {
    id: 16,
    moduleRef: 'Module 5',
    badge: 'Séance 05 • Modèles Bayésiens',
    title: 'Les Trois Variantes du Classificateur Naive Bayes',
    subtitle: 'Choisir la bonne variante selon la nature de vos données',
    bullets: [
      '**Pourquoi "Naïf" ?** Parce qu\'il suppose que toutes les variables prédictives sont mutuellement indépendantes sachant la classe (hypothèse simplificatrice mais redoutablement performante en pratique).',
      '**1. MultinomialNB (Décomptes et Fréquences)** :',
      '  • Adapté aux variables discrètes représentant des comptes de mots ou des fréquences.',
      '  • *Domaines rois* : Détection de spam, classification de documents, analyse de sentiment.',
      '**2. BernoulliNB (Variables Binaires 0/1)** :',
      '  • Adapté aux caractéristiques booléennes (présence ou absence d\'un mot ou d\'un indicateur).',
      '  • Ne compte pas le nombre de répétitions, mais uniquement si l\'élément est présent (1) ou non (0).',
      '**3. GaussianNB (Variables Continues Gaussiennes)** :',
      '  • Adapté aux variables continues suivant une loi normale.',
      '  • *Domaines* : Diagnostic biomédical (glycémie, pression artérielle, température, poids).'
    ],
    highlightBox: {
      title: 'Critère de Choix Immédiat',
      content: '• Fréquences de mots (texte) → MultinomialNB\n• Mots présents/absents (0 ou 1) → BernoulliNB\n• Mesures physiques réelles (taille, capteur) → GaussianNB',
      type: 'tip'
    },
    tags: ['Naive Bayes', 'MultinomialNB', 'BernoulliNB', 'GaussianNB', 'Classification']
  },
  {
    id: 17,
    moduleRef: 'Module 5',
    badge: 'Séance 05 • Pipeline NLP',
    title: 'Étude de Cas Pratique : Filtre Anti-Spam avec Scikit-Learn',
    subtitle: 'De la chaîne de caractères à la décision automatisée',
    bullets: [
      '**Contexte** : Classifier automatiquement les courriels entrants entre "HAM" (légitimes, 0) et "SPAM" (indésirables, 1).',
      '**Architecture du Pipeline NLP en 5 étapes** :',
      '  1. *Chargement du dataset* : Lecture du CSV et encodage binaire de la cible.',
      '  2. *Split d\'apprentissage* : 75% entraînement, 25% test.',
      '  3. *Vectorisation* : `CountVectorizer()` convertit chaque message textuel en un vecteur de décomptes de mots.',
      '  4. *Modélisation* : `MultinomialNB()` calcule les probabilités conditionnelles de chaque mot.',
      '  5. *Pipeline Scikit-Learn* : Enchaîne de façon étanche vectoriseur et classificateur pour éviter toute fuite de données.',
      '**Résultat** : Prédictions instantanées avec un score de précision très élevé sur le corpus de test.'
    ],
    codeSnippet: {
      lang: 'python',
      code: `from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

clf = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('nb', MultinomialNB())
])

clf.fit(X_train, y_train)
emails_test = [
    'Sounds great! Are you home now?',  # -> HAM [0]
    'txt HORO to claim your free car'    # -> SPAM [1]
]
print("Prédiction :", clf.predict(emails_test))`
    },
    tags: ['NLP', 'CountVectorizer', 'Spam', 'Pipeline', 'Scikit-Learn']
  },
  {
    id: 18,
    moduleRef: 'Module 5',
    badge: 'Séance 05 • Simulation',
    title: 'Simulation Stochastique de Monte Carlo',
    subtitle: 'Comprendre la loi des grands nombres par l\'échantillonnage aléatoire',
    bullets: [
      '**Problématique** : Comment connaître les caractéristiques d\'une immense population quand il est impossible de mesurer chaque individu ?',
      '**Solution de Monte Carlo** : Prélever des échantillons aléatoires non biaisés et répéter les calculs.',
      '**Loi des Grands Nombres** : Plus la taille de l\'échantillon augmente, plus la moyenne empirique converge précisément vers l\'espérance théorique de la population.',
      '**Expérience du cours (Population 1000 personnes, Taille réelle 170 cm)** :',
      '  • *Échantillon 10% (100 personnes)* : Moyenne estimée ≈ **171.38 cm** (excellente fidélité).',
      '  • *Échantillon 5% (50 personnes)* : Moyenne estimée ≈ **170.86 cm** (très bonne représentativité).',
      '  • *Échantillon 0.5% (5 personnes)* : Moyenne estimée ≈ **168.88 cm** (perte sensible de précision).',
      '**Conclusion pratique** : Monte Carlo est particulièrement puissant dès lors que la variable suit une loi normale et centrée.'
    ],
    tags: ['Monte Carlo', 'Simulation', 'Loi des grands nombres', 'Échantillonnage']
  },
  {
    id: 19,
    moduleRef: 'Module 6',
    badge: 'Séance 07 • Écosystème R',
    title: 'Vulgarisation du Langage R : Origines & Rôle en Décisionnel',
    subtitle: 'Le langage de référence pour les statisticiens et data analysts',
    bullets: [
      '**Genèse et Histoire** :',
      '  • Dérivé du langage S conçu aux Bell Laboratories en 1976.',
      '  • Créé en 1993 par **Ross Ihaka** et **Robert Gentleman** à l\'Université d\'Auckland (Nouvelle-Zélande).',
      '  • Logiciel libre (Open Source) et multiplateforme sous l\'égide du R Core Team depuis 1997.',
      '**Pourquoi R en Système Décisionnel ?**',
      '  • Conçu nativement par et pour les statisticiens (les vecteurs et matrices sont des citoyens de premier ordre).',
      '  • Écosystème gigantesque de packages sur le **CRAN** (Comprehensive R Archive Network).',
      '  • Qualité graphique inégalée avec support des symboles mathématiques et du package référence `ggplot2`.',
      '  • **Reproductibilité scientifique** : Documentation intégrée de l\'analyse du code jusqu\'au rapport final.'
    ],
    highlightBox: {
      title: 'Reproductibilité avec R Markdown (.Rmd)',
      content: 'R Markdown permet d\'entrelacer du texte d\'analyse et des blocs de code R dynamiques pour générer automatiquement des rapports exécutables en formats HTML, PDF ou Microsoft Word.',
      type: 'tip'
    },
    tags: ['Langage R', 'Histoire', 'CRAN', 'Statistiques', 'R Markdown']
  },
  {
    id: 20,
    moduleRef: 'Module 6',
    badge: 'Séance 07 • RStudio',
    title: 'L\'Environnement RStudio : Les 4 Quadrants Clés',
    subtitle: 'Organisation optimale de l\'espace de travail analytique',
    bullets: [
      '**Quadrant 1 : Zone Édition (Haut Gauche)** :',
      '  • Saisie et modification des scripts `.R` et documents `.Rmd`.',
      '  • Coloration syntaxique intelligente, autocomplétion des fonctions et arguments.',
      '**Quadrant 2 : Zone Console (Bas Gauche)** :',
      '  • Interpréteur interactif exécutant immédiatement le code ligne par ligne.',
      '**Quadrant 3 : Zone Environnement & Connexions (Haut Droite)** :',
      '  • *Environment* : Liste dynamique des objets, variables et DataFrames en mémoire.',
      '  • *History* : Historique chronologique complet des commandes passées.',
      '  • *Connections* : Connecteurs natifs vers bases de données (ODBC relationnel, Apache Spark distribué).',
      '**Quadrant 4 : Zone Fichiers, Graphiques & Packages (Bas Droite)** :',
      '  • *Files* : Explorateur de fichiers du dossier projet.',
      '  • *Plots* : Fenêtre de prévisualisation et d\'exportation des graphiques générés.',
      '  • *Packages* : Gestionnaire d\'installation des extensions CRAN.',
      '  • *Help & Viewer* : Manuels officiels et rendu HTML/interactif.'
    ],
    tags: ['RStudio', 'IDE', 'Quadrants', 'Console', 'Environnement']
  },
  {
    id: 21,
    moduleRef: 'Module 6',
    badge: 'Séance 07 • Syntaxe R',
    title: 'Syntaxe de Base, Typage Dynamique & Opérateurs en R',
    subtitle: 'La grammaire essentielle pour programmer sans erreur',
    bullets: [
      '**Assignation de variables** :',
      '  • Flèche standard recommandée : `x <- 10` (ou signe `=` : `x = 10`).',
      '  • Assignation inversée : `10 -> x` est licite.',
      '  • Assignation globale : `<<-` pour stocker dans l\'environnement parent/global.',
      '**Types de données atomiques** :',
      '  • `numeric` : Réels décimaux (ex: `pi <- 3.14`).',
      '  • `integer` : Entiers stricts, notés avec le suffixe L majuscule (ex: `annee <- 2026L`).',
      '  • `character` : Chaînes de caractères (ex: `nom <- "Data Analyst"`).',
      '  • `logical` : Booléens stricts écrits en majuscules `TRUE` ou `FALSE`.',
      '**Opérateurs singuliers à maîtriser absolument** :',
      '  • Séquence : `1:10` génère le vecteur `c(1, 2, ..., 10)`.',
      '  • Appartenance : `%in%` (ex: `5 %in% c(1, 3, 5, 7)` renvoie `TRUE`).',
      '  • Division entière : `%/%` (quotient entier) et Modulo : `%%` (reste).',
      '  • Produit matriciel : `%*%`.'
    ],
    highlightBox: {
      title: 'Piège Classique R vs Python',
      content: 'En R, l\'opérateur "+" ne fonctionne PAS sur les chaînes de texte !\n"Hello" + "World" génère : "Erreur dans x + y : argument non numérique".\nPour concaténer en R, on utilise obligatoirement paste("Hello", "World") ou paste0().',
      type: 'warning'
    },
    tags: ['Syntaxe R', 'Types', 'Opérateurs', 'Vecteurs', 'Modulo']
  },
  {
    id: 22,
    moduleRef: 'Module 7',
    badge: 'Séance 11 • Dataviz',
    title: 'Visualisation Décisionnelle : L\'Astuce 0 & Stratégie des Couleurs',
    subtitle: 'Donner du sens et de l\'impact aux graphiques sans bruit visuel',
    bullets: [
      '**L\'Astuce 0 (Pr. SADRATI)** : Élargissez votre compréhension des couleurs. Bannissez les couleurs primaires pures et saturées qui fatiguent la vue. Privilégiez les nuances douces, les teintes pastel et la transparence.',
      '**La Combinaison Maîtresse Universelle : Le Duo Bleu + Orange/Rouge** :',
      '  • *Le Bleu* : Couleur reine en business intelligence. Neutre, apaisante, professionnelle, se décline facilement en multiples nuances (marine, ciel, indigo).',
      '  • *L\'Orange / Rouge* : Couleur chaude captant instantanément l\'attention vers l\'alerte, le danger ou l\'anomalie.',
      '  • *Accessibilité Daltonisme* : Les personnes atteintes de déficience visuelle (deutéranopie, protanopie) distinguent sans aucune confusion le bleu de l\'orange.',
      '**Adoption Internationale** : C\'est la palette de prédilection des rédactions de datajournalisme économique mondial (The Economist, South China Morning Post).'
    ],
    highlightBox: {
      title: 'Règle d\'Or du Datastorytelling',
      content: '"En cas de doute, associez un orange/rouge avec un bleu." Vous garantissez instantanément contraste, sobriété et accessibilité universelle.',
      type: 'tip'
    },
    tags: ['Dataviz', 'Couleurs', 'Daltonisme', 'Bleu Orange', 'Accessibilité']
  },
  {
    id: 23,
    moduleRef: 'Module 7',
    badge: 'Séance 11 • Palettes & Outils',
    title: 'Conception des Palettes : Python (Seaborn) & R (ggplot2)',
    subtitle: 'Principes de sobriété et mise en œuvre technique',
    bullets: [
      '**Règle de la palette restreinte** : Limitez-vous à 3-5 couleurs pour prévenir la surcharge cognitive.',
      '**Les trois grands types de palettes selon la variable** :',
      '  • *Séquentielle* : Gradient d\'une seule teinte du clair au foncé pour une grandeur quantitative continue (ex: niveau de salaire).',
      '  • *Catégorielle* : Teintes distinctes pour séparer des classes nominales qualitatives (ex: jours de la semaine).',
      '  • *Divergente* : Deux teintes opposées (ex: bleu et rouge) convergeant vers un milieu neutre pour les variations autour de zéro.',
      '**Mise en œuvre en Python (Seaborn)** :',
      '  • Palettes sobres prêtes à l\'emploi : `sns.color_palette("muted")` ou `palette="pastel"`.',
      '  • Palettes personnalisées explicites par dictionnaire (`palette={"Thur": "#4E79A7", ...}`).',
      '**Mise en œuvre en R (ggplot2)** :',
      '  • Définition manuelle : `scale_color_manual(values = c(...))`',
      '  • Palette daltonien-friendly universelle : Package `viridis` (`scale_fill_viridis_c()`).'
    ],
    codeSnippet: {
      lang: 'python',
      code: `import seaborn as sns
# Palette contrôlée et accessible
palette = {'Thur': '#4E79A7', 'Fri': '#F28E2B', 'Sat': '#76B7B2', 'Sun': '#E15759'}
sns.boxplot(x='day', y='total_bill', data=tips, palette=palette)`
    },
    tags: ['Seaborn', 'ggplot2', 'Viridis', 'Palettes', 'Dataviz']
  },
  {
    id: 24,
    moduleRef: 'Module 7',
    badge: 'Séance 11 • Annotations',
    title: 'L\'Art des Annotations : Les 6 Piliers d\'un Graphique Précis',
    subtitle: 'Rendre vos graphiques autonomes et directement compréhensibles',
    bullets: [
      '**Pourquoi annoter ?** Un graphique sans annotations précises oblige le décideur à deviner l\'information et entraîne des erreurs d\'interprétation.',
      '**Les 6 Piliers d\'un Graphique Décisionnel Parfait** :',
      '  1. *Le Titre Informatif* : Doit formuler l\'insight majeur ou le message clé (ex: "Baisse de 14% des ventes en août"), plutôt qu\'un banal "Y en fonction de X".',
      '  2. *Étiquettes des Axes (X et Y) avec Unités* : Règle absolue : toujours spécifier le nom de la variable **ET** son unité physique (ex: "Consommation (miles par gallon)", "Chiffre d\'Affaires (en milliers de DH)").',
      '  3. *Légendes Claires (Key)* : Clarifient les symboles et correspondances couleur.',
      '  4. *Barres de Couleur (Colorbar)* : Légende continue pour les valeurs scalaires.',
      '  5. *Annotations Spécifiques (Callouts)* : Flèches et encarts textuels pointant directement vers une anomalie ou un pic historique.',
      '  6. *Lignes de Repère* : Lignes de référence en pointillés (objectif stratégique, moyenne, seuils d\'alerte).'
    ],
    highlightBox: {
      title: 'Checklist du Data Analyst Avant Présentation',
      content: '✓ Mon graphique a-t-il un titre orienté décision ?\n✓ Les unités sont-elles écrites sur chaque axe ?\n✓ La couleur met-elle en valeur l\'élément clé sans saturation ?\n✓ Une personne daltonienne peut-elle le lire ?',
      type: 'tip'
    },
    tags: ['Annotations', 'Titres', 'Unités', 'Datastorytelling', 'Checklist']
  },
  {
    id: 25,
    moduleRef: 'Synthèse',
    badge: 'Bilan Global & Clôture',
    title: 'Synthèse Générale du Module M201 & Boîte à Outils',
    subtitle: 'La feuille de route complète pour l\'Assistant Data Analyst',
    bullets: [
      '**Statistique Descriptive & Dispersion** : Maîtrise conjointe de la Moyenne, Médiane, Mode, Étendue, Variance d\'échantillon et Écart-Type.',
      '**Détection d\'Anomalies Univariées** : Règle des 2-Sigmas pour loi normale ; Écart Interquartile (IQR) et règle de Tukey pour les approches robustes non paramétriques.',
      '**Scaling des Variables** : Standardisation (Z-Score) pour les régressions et K-Means ; Normalisation Min-Max pour les réseaux de neurones.',
      '**Détection Multidimensionnelle** : Isolation Forest (découpes rapides d\'anomalies) et DBSCAN (clustering par densité avec label -1 pour le bruit).',
      '**Probabilités & Machine Learning** : Théorème de Bayes, Naive Bayes (Multinomial pour le texte, Bernoulli pour le binaire, Gaussian pour le continu) et Monte Carlo.',
      '**Écosystème R & RStudio** : Les 4 quadrants, R Markdown reproductible, opérateurs typiques (`<-`, `%in%`, `%/%`, `%%`).',
      '**Dataviz & Storytelling** : Harmonie Bleu/Orange accessible, palettes restreintes, et les 6 piliers des annotations.'
    ],
    highlightBox: {
      title: 'Félicitations !',
      content: 'Vous disposez désormais d\'une vision consolidée, rigoureuse et opérationnelle du cours de Systèmes Décisionnels. Retrouvez le détail exhaustif de toutes les formules mathématiques dans l\'onglet Mémento !',
      type: 'success'
    },
    tags: ['Synthèse', 'Mémento', 'Data Analyst', 'Examen', 'Félicitations']
  }
];
