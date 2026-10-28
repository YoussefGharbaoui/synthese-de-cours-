/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Base de données exhaustive du cours M201 - "Approfondir les Systèmes Décisionnels"
 * Pr. SADRATI Zakariae - Filière Intelligence Artificielle / Option Assistant Data Analyst
 */

export interface CourseModule {
  id: string;
  seanceNumber: string;
  title: string;
  shortTitle: string;
  badge: string;
  color: string;
  description: string;
  slidesCount: number;
  keyTakeaways: string[];
  sections: {
    title: string;
    badge?: string;
    points: string[];
    formula?: string;
    codeExample?: {
      language: string;
      code: string;
      note?: string;
    };
    callout?: {
      type: 'tip' | 'warning' | 'info' | 'exercise';
      title: string;
      text: string;
    };
  }[];
}

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'module-1',
    seanceNumber: 'Séance 01',
    title: 'Fondements de la Statistique Décisionnelle & Mesures Centrales',
    shortTitle: 'Statistiques & Mesures Centrales',
    badge: 'Statistique Descriptive',
    color: 'from-blue-600 to-indigo-700',
    description: 'Comprendre le rôle des statistiques dans la prise de décision, maîtriser la typologie des variables et le calcul des mesures de tendance centrale (Moyenne, Médiane, Mode) sous Excel et Python.',
    slidesCount: 22,
    keyTakeaways: [
      'Différencier clairement Statistique Descriptive (décrire l\'existant) et Statistique Inférentielle (généraliser un échantillon à une population).',
      'Identifier les 4 types de variables : Qualitative Nominale, Qualitative Ordinale, Quantitative Discrète, Quantitative Continue.',
      'Savoir choisir la mesure centrale adaptée : Moyenne (toutes valeurs égales), Médiane (insensible aux valeurs aberrantes), Mode (valeur prédominante).',
      'Maîtriser les formules équivalentes entre Excel (Français/Anglais) et Python (bibliothèque statistics).'
    ],
    sections: [
      {
        title: '1. Introduction & Deux Grandes Branches des Statistiques',
        badge: 'Concepts Clés',
        points: [
          'Définition des statistiques : Branche des mathématiques appliquées dédiée à la collecte, l\'analyse, l\'interprétation, la présentation et l\'organisation des données chiffrées.',
          'Objectif décisionnel : Transformer des données brutes en informations stratégiques et éclairer les prises de décision managériales.',
          'Statistique Descriptive : Vise à résumer et exposer les caractéristiques d\'une population ou d\'un jeu de données sans chercher à extrapoler (décrire).',
          'Statistique Inférentielle : Utilise un échantillon représentatif et les lois de probabilités pour projeter et généraliser des conclusions à l\'ensemble de la population (généraliser).'
        ],
        callout: {
          type: 'info',
          title: 'Vocabulaire Fondamental',
          text: '• Population : L\'ensemble global des éléments étudiés.\n• Individu (ou Unité Statistique) : Chaque élément unique composant la population.\n• Caractère (ou Variable) : La propriété spécifique observée ou mesurée sur chaque individu (ex: Âge, Salaire, Position).'
        }
      },
      {
        title: '2. Typologie Rigoureuse des Variables Statistiques',
        badge: 'Classification',
        points: [
          'Variable Qualitative Nominale : Catégories qualitatives sans hiérarchie ni ordre mathématique (exemples : couleur des yeux, marque d\'ordinateur, sexe, position d\'un joueur).',
          'Variable Qualitative Ordinale : Catégories présentant un ordre ou un classement naturel (exemples : niveau d\'étude [primaire < secondaire < supérieur], degré de satisfaction [faible < moyen < élevé], classement d\'une équipe).',
          'Variable Quantitative Discrète : Valeurs numériques entières obtenues par comptage (exemples : nombre d\'enfants par famille, nombre d\'élèves dans une classe, nombre de buts marqués).',
          'Variable Quantitative Continue : Valeurs numériques pouvant prendre une infinité de décimales, obtenues par mesure physique (exemples : taille en mètres, poids en kg, température en °C, temps de jeu en minutes).'
        ],
        callout: {
          type: 'tip',
          title: 'Règle Mémo pour l\'Examen',
          text: 'Posez-vous deux questions simples :\n1. Peut-on calculer une moyenne numérique ? Si NON → Qualitative (ordonnée ? oui = Ordinale, non = Nominale).\n2. Si OUI (Quantitative) : Est-ce un résultat de comptage entier (Discrète) ou de mesure avec virgule possible (Continue) ?'
        }
      },
      {
        title: '3. Les Trois Mesures de Tendance Centrale',
        badge: 'Moyenne, Médiane, Mode',
        points: [
          'Moyenne arithmétique (Mean / Average) : Somme de toutes les valeurs divisée par l\'effectif total. Utile quand toutes les observations ont une importance égale, mais très vulnérable aux valeurs aberrantes.',
          'Médiane (Median) : Valeur centrale séparant la distribution triée en deux moitiés égales (50% en dessous, 50% au-dessus). Propriété fondamentale : hautement résiliente (insensible) aux valeurs extrêmes.',
          'Règle de calcul de la médiane : Si l\'effectif N est impair → valeur exacte au rang (N+1)/2 ; si N est pair → moyenne arithmétique des deux valeurs centrales aux rangs N/2 et (N/2)+1.',
          'Mode (Mode) : Valeur apparaissant avec la fréquence maximale dans la série. Utile pour repérer la situation la plus courante ou dominante (peut être unimodal, bimodal ou multimodal).'
        ],
        formula: 'Moyenne : \\bar{X} = \\frac{\\sum_{i=1}^n x_i}{n} \\quad | \\quad \\text{Médiane} = \\text{Valeur à 50\\% de la série ordonnée}',
        callout: {
          type: 'exercise',
          title: 'Exemple d\'Application (Exercice du cours)',
          text: 'Notes d\'un contrôle : [8, 10, 10, 10, 12, 14, 16, 18] (8 notes)\n• Moyenne = (8 + 10*3 + 12 + 14 + 16 + 18) / 8 = 98 / 8 = 12.25\n• Médiane = moyenne des 4e et 5e notes (10 + 12)/2 = 11\n• Mode = 10 (apparaît 3 fois)'
        }
      },
      {
        title: '4. Implémentations Pratiques (Excel vs Python)',
        badge: 'Outils',
        points: [
          'Formules Excel : Disponibles en versions française et anglaise :',
          '• Moyenne : =MOYENNE(B2:B11)  ↔  =AVERAGE(B2:B11)',
          '• Médiane : =MEDIANE(B2:B11)  ↔  =MEDIAN(B2:B11)',
          '• Mode simple : =MODE.SIMPLE(B2:B11)  ↔  =MODE.SNGL(B2:B11)',
          'En Python standard : Utilisation du module natif `statistics` pour une analyse rapide et sans dépendance lourde.'
        ],
        codeExample: {
          language: 'python',
          code: `import statistics

notes = [17, 19, 15, 18, 14, 10, 12, 17, 11, 16]

# Mesures de tendance centrale
moyenne = statistics.mean(notes)      # 14.9
mode_val = statistics.mode(notes)     # 17 (note prédominante)
mediane = statistics.median(notes)    # 15.5

print(f"Moyenne: {moyenne} | Mode: {mode_val} | Médiane: {mediane}")`,
          note: 'Résultats : Moyenne = 14.9, Mode = 17, Médiane = 15.5 (valeur centrale robuste).'
        }
      }
    ]
  },
  {
    id: 'module-2',
    seanceNumber: 'Séance 02',
    title: 'Mesures de Dispersion & Détection Univariée des Outliers (2-Sigma)',
    shortTitle: 'Dispersion & Règle des 2 Sigmas',
    badge: 'Dispersion & Anomalies',
    color: 'from-teal-600 to-emerald-700',
    description: 'Mesurer la variabilité et l\'homogénéité des données via l\'étendue, la variance et l\'écart-type, et implémenter la méthode statistique des deux écarts-types pour isoler les valeurs aberrantes.',
    slidesCount: 15,
    keyTakeaways: [
      'Les mesures centrales ne suffisent pas : deux séries peuvent avoir la même moyenne tout en ayant des comportements totalement divergents.',
      'Comprendre la différence mathématique cruciale entre variance d\'échantillon (diviseur n-1) et variance de population (diviseur n).',
      'L\'écart-type (σ) s\'exprime dans la même unité de mesure que la variable initiale, ce qui le rend directement interprétable.',
      'Appliquer la règle des deux écarts-types : sous hypothèse de distribution normale, toute valeur en dehors de [Moyenne - 2σ, Moyenne + 2σ] est suspectée d\'anomalie.'
    ],
    sections: [
      {
        title: '1. Pourquoi Mesurer la Dispersion ?',
        badge: 'Motivation',
        points: [
          'Complémentarité absolue : La moyenne donne le point d\'ancrage central, mais la dispersion indique si les observations sont regroupées ou très étalées.',
          'Interprétation managériale : Une faible dispersion révèle un groupe homogène et prévisible ; une forte dispersion signale une forte hétérogénéité ou de grandes inégalités (ex: salaires).'
        ]
      },
      {
        title: '2. L\'Étendue (Range)',
        badge: 'Mesure Simple',
        points: [
          'Définition : Différence arithmétique simple entre la valeur maximale et la valeur minimale d\'une série ordonnée.',
          'Formule : E = x(max) - x(min) = x(n) - x(1).',
          'Avantage : Calcul immédiat et intuitif.',
          'Limitations majeures : Ne tient compte d\'aucune observation intermédiaire ; est excessivement sensible à une seule valeur extrême ou erreur de frappe.'
        ],
        formula: 'E = x_{\\max} - x_{\\min}',
        callout: {
          type: 'warning',
          title: 'Impact d\'une Seule Valeur Extrême',
          text: 'Soit la série de notes : [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 2].\n• Avec la note 2 : Étendue = 18 - 2 = 16 points (illusion d\'une dispersion énorme).\n• Sans la note 2 (valeur aberrante) : Étendue = 18 - 8 = 10 points.'
        }
      },
      {
        title: '3. Variance et Écart-Type (Standard Deviation)',
        badge: 'Mesures Complètes',
        points: [
          'Variance (σ²) : Moyenne des carrés des écarts de chaque point par rapport à la moyenne globale.',
          'Pourquoi élever au carré ? Pour éliminer les signes négatifs (qui s\'annuleraient à la somme) et pénaliser plus lourdement les grands éloignements.',
          'Variance d\'échantillon (Sample Variance) : Divisée par (n - 1) au lieu de n pour corriger le biais statistique (correction de Bessel).',
          'Écart-type (σ) : Racine carrée positive de la variance. Atout majeur : il s\'exprime dans la même unité physique que les données initiales (DH, kg, minutes, cm).'
        ],
        formula: '\\text{Variance échantillon } s^2 = \\frac{\\sum_{i=1}^n (x_i - \\bar{X})^2}{n - 1} \\quad | \\quad \\text{Écart-type } s = \\sqrt{s^2}',
        codeExample: {
          language: 'python',
          code: `import numpy as np

# Exemple du cours : Salaires en DH [3000, 3500, 4000, 4500, 5000]
salaires = np.array([3000, 3500, 4000, 4500, 5000])

moyenne = np.mean(salaires)     # 4000 DH
variance = np.var(salaires)     # 500 000 DH² (population)
ecart_type = np.std(salaires)   # 707.1 DH

print(f"Moyenne : {moyenne} DH | Écart-type : {ecart_type:.1f} DH")`,
          note: 'Interprétation : Les rémunérations s\'écartent en moyenne de 707 DH autour du salaire moyen de 4000 DH.'
        }
      },
      {
        title: '4. Méthode des Deux Écarts-Types (2-Sigma Method)',
        badge: 'Détection d\'Outliers',
        points: [
          'Hypothèse : Les données suivent approximativement une distribution normale (courbe en cloche).',
          'Principe probabiliste : Dans une loi normale, environ 95.45% des observations se trouvent dans l\'intervalle [Moyenne - 2σ, Moyenne + 2σ].',
          'Seuil Supérieur (Ss) = Moyenne + 2 × σ',
          'Seuil Inférieur (Si) = Moyenne - 2 × σ',
          'Critère de détection : Tout point x < Si ou x > Ss est classé comme valeur aberrante (outlier univarié).'
        ],
        codeExample: {
          language: 'python',
          code: `import numpy as np

# Données avec valeurs aberrantes
data = np.array([15, 22, 18, 25, 20, 17, 23, 21, 19, 30])

mean = np.mean(data)       # 21.0
std_dev = np.std(data)     # 4.098

# Définition des bornes 2-sigma
threshold_upper = mean + 2 * std_dev  # 29.19
threshold_lower = mean - 2 * std_dev  # 12.80

outliers = [v for v in data if v > threshold_upper or v < threshold_lower]
print("Outliers détectés :", outliers)  # [30]`,
          note: 'La valeur 30 dépasse le seuil 29.2 et est correctement identifiée comme outlier.'
        }
      }
    ]
  },
  {
    id: 'module-3',
    seanceNumber: 'Séance 03',
    title: 'Mesures de Position & Détection par IQR, Tukey et Box Plots',
    shortTitle: 'Position, IQR, Tukey & Box Plots',
    badge: 'Quantiles & Boîtes à Moustaches',
    color: 'from-amber-600 to-orange-700',
    description: 'Explorer les quartiles, déciles et centiles, comprendre les causes et impacts des anomalies, et appliquer les méthodes de l\'IQR, de Tukey, des boîtes à moustaches et du Z-Score.',
    slidesCount: 19,
    keyTakeaways: [
      'Les mesures de position ordonnent la distribution en fractions égales : Quartiles (4 parties de 25%), Déciles (10 parties de 10%), Centiles (100 parties de 1%).',
      'Comprendre les 6 grandes causes d\'outliers (erreur humaine, mesure, échantillonnage, traitement, expérimentale, ou nouveauté naturelle).',
      'La méthode de l\'Intervalle Interquartile (IQR = Q3 - Q1) avec seuils [Q1 - 1.5*IQR, Q3 + 1.5*IQR] est non paramétrique et insensible aux valeurs extrêmes.',
      'La méthode de Tukey utilise k = 3 au lieu de 1.5 pour isoler uniquement les anomalies extrêmes et préserver plus de données.',
      'Le Z-Score mesure l\'écart en nombre de déviations standard : un point est généralement suspect si |Z| > 3.'
    ],
    sections: [
      {
        title: '1. Les Mesures de Position (Quartiles, Déciles, Centiles)',
        badge: 'Division Ordonnée',
        points: [
          'Quartiles : Divisent l\'échantillon ordonné en 4 parties égales contenant 25% des observations :',
          '• Q1 (1er quartile) : 25% des valeurs sont inférieures ou égales.',
          '• Q2 (2e quartile) : 50% des valeurs sont inférieures (équivaut exactement à la Médiane).',
          '• Q3 (3e quartile) : 75% des valeurs sont inférieures (et 25% supérieures).',
          'Déciles : Divisent les données en 10 segments de 10% chacun (D1 = 10%, D5 = médiane, D9 = 90%).',
          'Centiles (Percentiles) : Divisent en 100 tranches de 1% (ex: C95 = 95% des valeurs sont inférieures).'
        ],
        callout: {
          type: 'info',
          title: 'Exemple Pratique du Cours',
          text: 'Si dans un concours de Data Analyst :\n• Q1 = 7.5/20 → 25% des candidats ont eu 7.5 ou moins.\n• D5 = 16/20 → 50% des candidats sont sous 16/20.\n• C95 = 19/20 → Seuls 5% des candidats ont décroché plus de 19/20 !'
        }
      },
      {
        title: '2. Causes & Stratégies de Gestion des Valeurs Aberrantes',
        badge: 'Audit de Qualité',
        points: [
          'Définition : Une valeur aberrante (outlier) est un point de donnée situé à une distance anormale du reste du nuage.',
          'Impact néfaste : Peut fausser lourdement les estimations (gonflement artificiel de la moyenne, étirement de la variance) et perturber les modèles de Machine Learning (régression linéaire, etc.).',
          'Les 6 causes identifiées dans le cours :',
          '1. Erreur humaine : Saisie manuelle erronée (ex: taper 1500 au lieu de 15).',
          '2. Erreur d\'échantillonnage : L\'échantillon ne reflète pas fidèlement la population cible.',
          '3. Erreurs expérimentales : Erreur survenue pendant la procédure d\'extraction des données.',
          '4. Erreurs de mesure : Dérive ou imprécision des capteurs physiques ou instruments.',
          '5. Erreurs de traitement : Bug ou altération lors de la manipulation/transformation du pipeline.',
          '6. Anomalies réelles / Naturelles : Événement authentique mais rare (ex: transaction bancaire frauduleuse, vente exceptionnelle).',
          'Les 3 stratégies de traitement :',
          '• Remplacement (Imputation) : Remplacer par la médiane ou la moyenne pour préserver la taille du dataset.',
          '• Suppression : Éliminer la ligne si et seulement si l\'erreur est manifestement non corrigible et invalide.',
          '• Conservation / Acceptation : Conserver l\'outlier s\'il porte une valeur métier stratégique (détection de fraude, cyber-intrusion).'
        ]
      },
      {
        title: '3. La Méthode de l\'IQR & Variante de Tukey',
        badge: 'Règles Mathématiques',
        points: [
          'Calcul de l\'Écart Interquartile : IQR = Q3 - Q1 (couvre les 50% centraux du jeu de données).',
          'Limites standard (k = 1.5) :',
          '• Limite inférieure = Q1 - 1.5 × IQR',
          '• Limite supérieure = Q3 + 1.5 × IQR',
          'Méthode de Tukey (k = 3.0) : Définit les "outliers extrêmes". En fixant k = 3, on tolère une plus grande marge et on élimine moins de points.',
          'Atout déterminant : L\'IQR ne dépend ni de la moyenne ni de la variance, elle ne requiert pas de distribution normale gaussienne.'
        ],
        formula: '\\text{IQR} = Q_3 - Q_1 \\quad | \\quad \\text{Seuil}_{inf} = Q_1 - 1.5 \\cdot \\text{IQR} \\quad | \\quad \\text{Seuil}_{sup} = Q_3 + 1.5 \\cdot \\text{IQR}',
        codeExample: {
          language: 'python',
          code: `import numpy as np

data = np.array([2, 3, 4, 5, 6, 7, 20])

q1 = np.percentile(data, 25)  # 3.5
q3 = np.percentile(data, 75)  # 6.5
iqr = q3 - q1                 # 3.0

# Bornes IQR standard (k=1.5)
lim_inf_iqr = q1 - 1.5 * iqr  # -1.0
lim_sup_iqr = q3 + 1.5 * iqr  # 11.0

# Bornes Tukey (k=3)
lim_inf_tukey = q1 - 3.0 * iqr  # -5.5
lim_sup_tukey = q3 + 3.0 * iqr  # 15.5

outliers = data[(data < lim_inf_iqr) | (data > lim_sup_iqr)]
print("Outliers IQR :", outliers)  # [20]`,
          note: 'La valeur 20 est isolée aussi bien par la méthode IQR standard que par la méthode de Tukey.'
        }
      },
      {
        title: '4. Box Plot (Boîte à Moustaches) & Z-Score',
        badge: 'Visualisation & Standardisation',
        points: [
          'Box Plot : Outil graphique compact visualisant la structure de la distribution :',
          '• La boîte centrale délimite le 1er quartile (Q1) et le 3e quartile (Q3).',
          '• Le trait interne représente la Médiane (Q2).',
          '• Les moustaches (whiskers) s\'étendent jusqu\'aux valeurs extrêmes non aberrantes (au maximum 1.5 × IQR).',
          '• Tous les points tracés au-delà des moustaches sont des outliers graphiques.',
          'Z-Score (Cote standard) : Exprime à combien d\'écarts-types un point x se situe de la moyenne.',
          '• Formule : Z = (x - Moyenne) / Écart-type.',
          '• Interprétation : Z = 0 indique que le point est exactement à la moyenne ; un Z > 0 est supérieur, Z < 0 est inférieur.',
          '• Règle de décision usuelle : Un point dont le Z-score dépasse +3 ou descend sous -3 est considéré comme outlier.'
        ]
      }
    ]
  },
  {
    id: 'module-4',
    seanceNumber: 'Séance 04',
    title: 'Standardisation, Normalisation & Algorithmes Avancés (Isolation Forest, DBSCAN)',
    shortTitle: 'Scaling & Algorithmes Multidimensionnels',
    badge: 'Machine Learning & Clustering',
    color: 'from-violet-600 to-purple-700',
    description: 'Distinguer les approches de mise à l\'échelle des variables et maîtriser les algorithmes avancés de détection d\'anomalies multidimensionnelles (Isolation Forest et DBSCAN).',
    slidesCount: 10,
    keyTakeaways: [
      'Standardisation vs Normalisation : Le choix dépend directement de la nature de l\'algorithme de Machine Learning utilisé.',
      'La Standardisation produit une moyenne nulle (0) et une variance unitaire (1), avec des valeurs non bornées (idéale pour ACP, Régression, K-Means).',
      'La Normalisation compresse les valeurs dans l\'intervalle fixe [0, 1] sans changer l\'allure de la distribution (idéale pour Réseaux de Neurones, KNN).',
      'Isolation Forest isole directement les anomalies via des arbres binaires sans modéliser le comportement normal au préalable.',
      'DBSCAN est un algorithme de clustering par densité qui repère simultanément les clusters de forme arbitraire et classe les points non denses comme bruit/outliers (label -1).'
    ],
    sections: [
      {
        title: '1. Standardisation vs Normalisation : Comparatif Rigoureux',
        badge: 'Préparation des Données',
        points: [
          'Standardisation (Z-Score Scaling) :',
          '• Objectif mathématique : Centrer et réduire la distribution (Moyenne = 0, Écart-type = 1).',
          '• Effet : Valeurs non bornées (positives et négatives). Les outliers se détachent au-delà de ±3.',
          '• Applications privilégiées : Régression Linéaire et Logistique, Analyse en Composantes Principales (ACP/PCA), K-Means clustering (pour empêcher une variable aux grands chiffres d\'écraser les autres).',
          'Normalisation (Min-Max Scaling) :',
          '• Objectif mathématique : Échelonner linéairement les données dans un intervalle fermé fixe, habituellement [0, 1].',
          '• Effet : Les données sont bornées entre 0 et 1 sans modifier la forme originelle de la distribution.',
          '• Applications privilégiées : Réseaux de neurones profonds (permet une convergence rapide du gradient sans explosion), K-Nearest Neighbors (KNN - calcul équitable des distances euclidiennes), interfaces de dataviz.'
        ],
        formula: '\\text{Standardisation : } z = \\frac{x - \\mu}{\\sigma} \\quad \\Longleftrightarrow \\quad \\text{Normalisation Min-Max : } x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}',
        callout: {
          type: 'tip',
          title: 'Tableau Comparatif Rapide',
          text: '• Standardisation : Moyenne = 0, Variance = 1 | Plage [-∞, +∞] | Sensible aux outliers : Modéré | Modèles : K-Means, ACP, SVM, Régression.\n• Normalisation : Plage bornée stricte [0, 1] | Forme conservée | Sensible aux outliers : Très sensible | Modèles : Deep Learning, KNN.'
        }
      },
      {
        title: '2. Isolation Forest (Forêt d\'Isolation)',
        badge: 'Détection d\'Intrusions',
        points: [
          'Concept fondateur : Les anomalies sont "rares et quantitativement différentes".',
          'Changement de paradigme : Contrairement aux approches classiques qui cherchent à modéliser la "normalité" pour détecter les écarts, Isolation Forest cible et isole directement les anomalies.',
          'Mécanisme interne : Des arbres binaires de partition aléatoire (iTrees) découpent l\'espace de caractéristiques.',
          'Critère de détection : Les points normaux, situés au cœur de groupes denses, exigent de nombreuses subdivisions pour être isolés. À l\'inverse, les anomalies sont isolées très près de la racine avec très peu de coupures (profondeur d\'arbre courte).'
        ]
      },
      {
        title: '3. L\'Algorithme DBSCAN (Clustering Spatial par Densité)',
        badge: 'Multi-Clustering',
        points: [
          'DBSCAN = Density-Based Spatial Clustering of Applications with Noise.',
          'Atout clé : Détecte des formes géométriques arbitraires et complexes là où K-Means échoue (formes concaves, anneaux, grappes irrégulières).',
          'Fonctionnement multidimensionnel : Prend en compte simultanément plusieurs colonnes / dimensions, surpassant les méthodes univariées (2-sigma, IQR).',
          'Les deux hyperparamètres fondamentaux :',
          '1. `eps` (Epsilon) : Rayon maximal de distance pour considérer qu\'un point est voisin d\'un autre.',
          '2. `min_samples` : Nombre minimal de points nécessaires dans le voisinage de rayon `eps` pour constituer une zone dense.',
          'Typologie des points classés par DBSCAN :',
          '• Points centraux (Core points) : Possèdent au moins `min_samples` voisins dans leur rayon `eps`.',
          '• Points frontières (Border points) : Voisins d\'un point central mais n\'ayant pas eux-mêmes assez de voisins.',
          '• Bruit / Outliers (Noise points) : Ne font partie d\'aucun cluster dense. Ils reçoivent automatiquement l\'étiquette `label = -1`.'
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.cluster import DBSCAN
from sklearn.datasets import make_blobs
import numpy as np
import matplotlib.pyplot as plt

# 1. Génération de données de test avec clusters et outliers
data, _ = make_blobs(n_samples=300, centers=4, cluster_std=0.60, random_state=0)
outlier = np.array([[0, 0]])
data_with_outlier = np.concatenate([data, outlier])

# 2. Application de DBSCAN
dbscan = DBSCAN(eps=0.5, min_samples=5)
labels = dbscan.fit_predict(data_with_outlier)

# 3. Séparation des clusters et des anomalies (label == -1)
clustered_data = data_with_outlier[labels != -1]
outlier_data = data_with_outlier[labels == -1]

# 4. Tracé avec Matplotlib : Outliers marqués d'une croix rouge 'x'
plt.scatter(clustered_data[:, 0], clustered_data[:, 1], c=labels[labels != -1], cmap='viridis', label='Points Clustérisés')
plt.scatter(outlier_data[:, 0], outlier_data[:, 1], c='red', marker='x', s=100, label='Outliers')
plt.title("Détection d'Outliers avec DBSCAN")
plt.legend()
plt.show()`,
          note: 'Les anomalies isolées reçoivent automatiquement l\'étiquette -1 et sont visualisées en rouge.'
        }
      }
    ]
  },
  {
    id: 'module-5',
    seanceNumber: 'Séances 05 & 06',
    title: 'Probabilités Avancées, Machine Learning Naive Bayes & Monte Carlo',
    shortTitle: 'Bayes, NLP Spam & Monte Carlo',
    badge: 'Probabilités & Modèles Prédictifs',
    color: 'from-rose-600 to-pink-700',
    description: 'Maîtriser la probabilité conditionnelle et le théorème de Bayes, implémenter les trois variantes de classificateurs Naive Bayes (Multinomial, Bernoulli, Gaussian) et appréhender la simulation stochastique de Monte Carlo.',
    slidesCount: 17,
    keyTakeaways: [
      'Probabilité conditionnelle : P(A|B) est la probabilité que A survienne sachant que l\'événement B est déjà avéré.',
      'Théorème de Bayes : Permet de calculer la probabilité a posteriori P(A|B) en combinant la vraisemblance P(B|A) et les probabilités marginales.',
      'Variantes de Naive Bayes : MultinomialNB pour les fréquences de mots (NLP / Spam), BernoulliNB pour la présence/absence binaire, GaussianNB pour les grandeurs continues (mesures médicales).',
      'Pipeline de classification de texte : Tokenisation et vectorisation (CountVectorizer) combinée à MultinomialNB pour filtrer les spams.',
      'Simulation de Monte Carlo : S\'appuie sur la loi des grands nombres pour modéliser des phénomènes complexes par tirages aléatoires successifs.'
    ],
    sections: [
      {
        title: '1. Probabilité Conditionnelle & Théorème de Bayes',
        badge: 'Fondations Mathématiques',
        points: [
          'Probabilité Conditionnelle : P(A|B) quantifie la probabilité de survenue de l\'événement A sous condition préalable de réalisation de B.',
          'Formule conditionnelle : P(A|B) = P(A ∩ B) / P(B) avec P(B) > 0.',
          'Exemples concrets du cours : Probabilité de pluie sachant que le ciel est couvert ; probabilité qu\'une pièce soit défectueuse sachant la machine de production employée.',
          'Théorème de Bayes : Outil probabiliste fondamental pour réviser et actualiser une croyance ou un diagnostic suite à l\'observation d\'une nouvelle preuve ou d\'indices récents.',
          'Domaines d\'excellence : Diagnostic médical (probabilité d\'une pathologie sachant des symptômes précis) et filtrage prédictif (probabilité qu\'un e-mail soit un pourriel).'
        ],
        formula: 'P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)} \\quad \\text{avec } P(B) > 0',
        callout: {
          type: 'info',
          title: 'Terminologie Bayésienne',
          text: '• P(A) : Probabilité a priori (prior belief).\n• P(B|A) : Vraisemblance (likelihood).\n• P(B) : Probabilité marginale totale de la preuve.\n• P(A|B) : Probabilité a posteriori (posterior probability mise à jour).'
        }
      },
      {
        title: '2. Les Trois Variantes du Classificateur Naive Bayes',
        badge: 'Machine Learning',
        points: [
          'Hypothèse "Naïve" : Supposée indépendance conditionnelle de toutes les caractéristiques prédictives entre elles sachant la classe cible.',
          '1. MultinomialNB : Adapté aux variables représentant des fréquences, des scores d\'occurrence ou des décomptes discrets. Idéal pour le Traitement du Langage Naturel (NLP), la détection de spam et l\'analyse de sentiment.',
          '2. BernoulliNB : Adapté aux variables d\'état purement binaires (0 ou 1, VRAI ou FAUX). En classification textuelle, il s\'intéresse uniquement à la présence ou à l\'absence d\'un mot, sans tenir compte du nombre de répétitions.',
          '3. GaussianNB : Adapté aux variables continues qui suivent une loi normale (gaussienne). Utilisé en biométrie, signaux capteurs, imagerie médicale (ex: température corporelle, glycémie, pression artérielle).'
        ]
      },
      {
        title: '3. Projet Pratique : Détection de Spam avec Scikit-Learn',
        badge: 'Pipeline NLP',
        points: [
          'Étape 1 : Chargement du fichier `spam.csv` avec Pandas et exploration des valeurs nulles.',
          'Étape 2 : Encodage de la variable cible : conversion de "spam" en 1 et "ham" (légitime) en 0.',
          'Étape 3 : Séparation du jeu de données en entraînement (Train 75%) et test (Test 25%) via `train_test_split`.',
          'Étape 4 : Création d\'un pipeline scikit-learn chaînant `CountVectorizer()` (création de la matrice sac de mots) et `MultinomialNB()`.',
          'Étape 5 : Entraînement du modèle avec `clf.fit(X_train, y_train)` et évaluation de la précision (accuracy) avec `clf.score(X_test, y_test)`.',
          'Étape 6 : Prédiction en temps réel sur de nouveaux e-mails pour tester la classification.'
        ],
        codeExample: {
          language: 'python',
          code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# Préparation & Split
data = pd.read_csv('spam.csv')
data['Spam'] = data['Category'].apply(lambda x: 1 if x == 'spam' else 0)
X_train, X_test, y_train, y_test = train_test_split(
    data['Message'], data['Spam'], test_size=0.25, random_state=42
)

# Construction du pipeline Scikit-Learn
clf = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('nb', MultinomialNB())
])

clf.fit(X_train, y_train)
print("Précision du modèle :", clf.score(X_test, y_test))

# Test sur de nouveaux messages
emails = [
    'Sounds great! Are you home now?',  # HAM -> 0
    'Will u meet ur dream soon? txt HORO followed by star sign'  # SPAM -> 1
]
print("Prédictions :", clf.predict(emails))`,
          note: 'Pipeline complet conforme à la séance 05/06.'
        }
      },
      {
        title: '4. Simulation Stochastique de Monte Carlo',
        badge: 'Échantillonnage Aléatoire',
        points: [
          'Fondement : Tirages d\'échantillons aléatoires répétés pour approximer les paramètres statistiques d\'une population complexe.',
          'Loi des grands nombres : Au fur et à mesure que la taille de l\'échantillon augmente, la moyenne observée converge vers l\'espérance mathématique réelle de la population.',
          'Expérience pratique du cours : Population synthétique de 1000 individus (hauteur moyenne réelle = 170 cm, écart-type = 10 cm).',
          'Résultats comparatifs selon la fraction de population échantillonnée :',
          '• Échantillon 10% (100 personnes) : Moyenne estimée ≈ 171.38 cm, écart-type ≈ 10.38 (estimation très fidèle).',
          '• Échantillon 5% (50 personnes) : Moyenne estimée ≈ 170.86 cm (bonne représentativité globale).',
          '• Échantillon 0.5% (5 personnes) : Moyenne estimée ≈ 168.88 cm (imprécision plus marquée, sensibilité aux aléas).',
          'Conclusion méthodologique : La simulation de Monte Carlo fonctionne remarquablement bien sur des données distribuées normalement et centrées.'
        ]
      }
    ]
  },
  {
    id: 'module-6',
    seanceNumber: 'Séance 07',
    title: 'Vulgarisation du Langage R & Environnement RStudio',
    shortTitle: 'Langage R & RStudio',
    badge: 'Environnement Statistique',
    color: 'from-sky-600 to-blue-800',
    description: 'Découvrir la genèse et les atouts du langage R, appréhender l\'IDE RStudio et ses 4 quadrants, maîtriser la syntaxe élémentaire, le typage dynamique, les opérateurs vectoriels et R Markdown.',
    slidesCount: 37,
    keyTakeaways: [
      'R est un langage et environnement interprété créé en 1993 par Ross Ihaka et Robert Gentleman (Université d\'Auckland), successeur du langage S.',
      'RStudio structure le flux de travail en 4 zones majeures : Éditeur (scripts .R), Console (exécution instantanée), Environnement/Historique/Connexions, Fichiers/Graphiques/Packages/Help/Viewer.',
      'R Markdown (.Rmd) permet de concevoir des rapports et présentations dynamiques et reproductibles en formats HTML, PDF ou Word.',
      'Opérateurs singuliers en R : Affectation via <- (ou =), vérification d\'appartenance avec %in%, produit matriciel %*%, et division entière %/%.',
      'Typage dynamique sans déclaration explicite : vérifié via class() ou typeof().'
    ],
    sections: [
      {
        title: '1. Histoire, Écosystème & Atouts Majeurs de R',
        badge: 'Origines & Forces',
        points: [
          'Historique : Dérivé du langage S (Bell Labs, 1976), R a été formalisé en 1993 par Ross Ihaka et Robert Gentleman à Auckland pour l\'enseignement statistique.',
          'Statut : Logiciel libre (Open Source) et multiplateforme (Windows, macOS, Linux) sous l\'égide du R Core Team (depuis 1997).',
          'Points forts pour l\'analyse décisionnelle :',
          '• Écosystème gigantesque de packages sur le CRAN (Comprehensive R Archive Network).',
          '• Puissance graphique inégalée avec support natif des symboles mathématiques et packages modernes comme ggplot2.',
          '• Interopérabilité élevée avec d\'autres langages de bas niveau (C, C++, Java).',
          '• Reproductibilité scientifique totale grâce à R Markdown et Quarto.'
        ]
      },
      {
        title: '2. Visite Guidée de l\'IDE RStudio (Les 4 Quadrants)',
        badge: 'Interface RStudio',
        points: [
          '1. Zone Édition (En haut à gauche) : Espace de rédaction des scripts R et documents `.Rmd`, avec autocomplétion, vérification de syntaxe et coloration.',
          '2. Zone Console (En bas à gauche) : Interpréteur interactif pour tester des commandes en temps réel et observer immédiatement les retours sans compilation.',
          '3. Zone Environnement / Historique / Connexions / Tutoriels (En haut à droite) :',
          '• Environment : Liste les variables, DataFrames et objets actifs en mémoire.',
          '• History : Historique chronologique de toutes les commandes passées.',
          '• Connections : Gestionnaire de liaisons aux bases de données relationnelles (ODBC) ou distribuées (Apache Spark).',
          '4. Zone Fichiers / Plots / Packages / Aide / Viewer (En bas à droite) :',
          '• Files : Explorateur de fichiers du répertoire de travail.',
          '• Plots : Fenêtre de prévisualisation et d\'exportation des graphiques (PDF/PNG).',
          '• Packages : Outil graphique pour installer et mettre à jour les librairies CRAN.',
          '• Help : Documentation officielle détaillée des fonctions et jeux de données.',
          '• Viewer : Rendu des sorties web interactives (HTML, tables dynamiques, cartes Leaflet).'
        ]
      },
      {
        title: '3. Syntaxe de Base, Assignation & Typage en R',
        badge: 'Grammaire du Code',
        points: [
          'Assignation standard : Utilisation de l\'opérateur flèche `<-` (recommandé en R) ou du signe `=` (ex: `age <- 25`).',
          'Assignation inversée : `25 -> age` est parfaitement valide en R.',
          'Assignation globale : `<<-` permet d\'assigner une variable dans l\'environnement parent ou global.',
          'Typage dynamique : Une variable ne requiert aucune déclaration préalable de type et peut changer à la volée.',
          'Types de données fondamentaux :',
          '• numeric : Nombres réels à virgule flottante (ex: `taille <- 1.75`).',
          '• integer : Nombres entiers stricts, notés avec un suffixe majuscule L (ex: `annee <- 2026L`).',
          '• character : Chaînes de texte entre guillemets (ex: `nom <- "Data Analyst"`).',
          '• logical : Booléens stricts écrits en majuscules `TRUE` ou `FALSE` (ou `T` / `F`).',
          'Inspection des types : `class(var)` renvoie la classe conceptuelle, tandis que `typeof(var)` indique le type de stockage mémoire interne.'
        ],
        codeExample: {
          language: 'r',
          code: `# Syntaxe de base en R
var_num <- 27.5
class(var_num)    # [1] "numeric"

var_int <- 42L
class(var_int)    # [1] "integer"

var_texte <- "Assistant Data Analyst"
typeof(var_texte) # [1] "character"

var_bool <- TRUE
typeof(var_bool)  # [1] "logical"`,
          note: 'Pas de déclaration explicite : R infère automatiquement les types.'
        }
      },
      {
        title: '4. Opérateurs Arithmétiques, Logiques & Spécifiques à R',
        badge: 'Opérateurs',
        points: [
          'Opérateurs Arithmétiques : `+` (addition), `-` (soustraction), `*` (multiplication), `/` (division), `^` (puissance/exposant).',
          'Opérateurs de Division Spécifiques :',
          '• Modulo : `%%` (reste de la division entière, ex: `10 %% 3` renvoie `1`).',
          '• Division entière : `%/%` (quotient entier sans reste, ex: `10 %/% 3` renvoie `3`).',
          'Attention piège R vs Python : En R, on ne peut PAS additionner des chaînes de caractères avec `+` (provoque une erreur "argument non numérique"). On utilise `paste()` ou `paste0()`.',
          'Opérateurs Logiques :',
          '• Élément par élément sur vecteurs : `&` (ET logique) et `|` (OU logique).',
          '• Évaluation courte (scalaire unique) : `&&` et `||`.',
          '• Négation : `!` (ex: `!TRUE` renvoie `FALSE`).',
          'Opérateurs Divers indispensables :',
          '• Générateur de séquence `:` (ex: `1:10` génère le vecteur `c(1, 2, ..., 10)`).',
          '• Appartenance `%in%` : Teste si un élément se trouve dans un ensemble (ex: `5 %in% c(1, 3, 5, 7)` renvoie `TRUE`).',
          '• Produit matriciel `%*%` : Effectue la vraie multiplication matricielle de l\'algèbre linéaire.',
          'Fonctions mathématiques de base : `sqrt()`, `exp()`, `log()`, `log10()`, `abs()`, `round(x, digits=2)`, `floor()`, `ceiling()`, `sin()`, `cos()`, `tan()`.'
        ]
      }
    ]
  },
  {
    id: 'module-7',
    seanceNumber: 'Séance 11',
    title: 'Visualisation des Données Décisionnelles & Datastorytelling',
    shortTitle: 'Dataviz & Conception Graphique',
    badge: 'Design & Storytelling',
    color: 'from-amber-500 to-orange-600',
    description: 'Adopter une utilisation stratégique et inclusive des couleurs, éviter les pièges de surcharge visuelle, et maîtriser l\'anatomie complète des annotations pour concevoir des dashboards décisionnels percutants.',
    slidesCount: 13,
    keyTakeaways: [
      'Astuce 0 : Élargir sa compréhension de la couleur. Bannir les couleurs pures criardes au profit de nuances subtiles, de teintes atténuées et de transparences.',
      'La combinaison maîtresse universelle : Le duo Bleu + Orange/Rouge offre un contraste maximal tout en restant parfaitement discernable pour les personnes atteintes de daltonisme.',
      'Règle de sobriété : Limiter drastiquement le nombre de teintes d\'une palette (3 à 5 au maximum) pour prévenir la fatigue cognitive des décideurs.',
      'Adapter la palette à la nature de la variable : Palette séquentielle pour du continu, palette divergente pour des variations autour d\'un neutre, palette catégorielle pour des groupes distincts.',
      'Les 6 piliers des annotations : Titre percutant, libellés d\'axes complets avec unité de mesure (ex: Ventes en DH), légendes claires, barres de couleur, callouts spécifiques et repères visuels.'
    ],
    sections: [
      {
        title: '1. Stratégie des Couleurs & Accessibilité Visuelle',
        badge: 'Théorie de la Couleur',
        points: [
          'Impact décisionnel : Une couleur mal choisie induit des biais cognitifs ou rend la lecture d\'un rapport fastidieuse.',
          'Astuce 0 - Nuances & Transparence : Éviter les couleurs primaires 100% saturées. Privilégier les gammes douces ou désaturées qui confèrent une élégance professionnelle.',
          'Le couple roi : Bleu et Orange/Rouge :',
          '• Les couleurs chaudes (jaune, orange, rouge) attirent immédiatement le regard vers l\'information prioritaire.',
          '• Le bleu est apaisant, neutre, inspire la confiance managériale et se décline en de multiples tonalités (clair, marine, cyan).',
          '• Accessibilité universelle : Les personnes daltoniennes (deutéranopie, protanopie) distinguent parfaitement le bleu de l\'orange/rouge.',
          'Consistance & Sémantique intuitive : Attribuer toujours la même couleur à une catégorie donnée à travers l\'ensemble d\'un dashboard (ex: Rouge pour alerte/perte, Vert pour sécurité/croissance).'
        ],
        callout: {
          type: 'tip',
          title: 'Principe d\'Accessibilité (Pr. SADRATI)',
          text: '"En cas de doute, utilisez un orange/rouge avec du bleu." C\'est la combinaison préférée des rédactions de presse économique de renommée mondiale (South China Morning Post, The Economist).'
        }
      },
      {
        title: '2. Choix de Palette & Outils (Python Seaborn vs R ggplot2)',
        badge: 'Palettes Logicielles',
        points: [
          'Palette restreinte : Réduire au minimum strict le nombre de teintes différentes pour éviter l\'effet "arc-en-ciel" illisible.',
          'Types de palettes adaptées :',
          '• Palette Séquentielle : Dégradé clair vers foncé pour une variable quantitative continue ordonnée (ex: température, volume de vente).',
          '• Palette Catégorielle : Couleurs contrastées pour des classes nominales (ex: magasins A, B, C).',
          '• Palette Divergente : Deux teintes opposées convergeant vers un milieu neutre (ex: bénéfices positifs en bleu vs pertes négatives en rouge).',
          'En Python (Seaborn & Matplotlib) : Utilisation de palettes intégrées comme `sns.color_palette("muted")` ou `palette="pastel"`, et dictionnaires personnalisés pour contrôler chaque catégorie.',
          'En R (ggplot2) : Contrôle manuel avec `scale_color_manual()` ou adoption du package moderne `viridis`, réputé pour sa perception uniforme et son accessibilité aux daltoniens.'
        ],
        codeExample: {
          language: 'python',
          code: `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

# Définition explicite d'une palette catégorielle sobre
palette_custom = {
    'Thur': '#4E79A7',  # Bleu
    'Fri':  '#F28E2B',  # Orange
    'Sat':  '#76B7B2',  # Bleu-vert
    'Sun':  '#E15759'   # Rouge atténué
}

sns.boxplot(x="day", y="total_bill", data=tips, palette=palette_custom)
plt.title("Total de la Facture par Jour (Palettes Contrôlées)")
plt.xlabel("Jour de la semaine")
plt.ylabel("Montant de la facture (USD)")
plt.show()`,
          note: 'Chaque groupe possède une teinte dédiée sans saturation excessive.'
        }
      },
      {
        title: '3. L\'Art des Annotations : Les 6 Éléments Clés d\'un Bon Graphique',
        badge: 'Datastorytelling',
        points: [
          '1. Le Titre : Doit énoncer le message ou la conclusion clé, et non simplement répéter le nom des axes.',
          '2. Étiquettes d\'axes (X et Y) : Règle absolue : Toujours préciser le nom complet de la variable suivi de son unité de mesure (ex: "Ventes mensuelles (en milliers de DH)", "Consommation (miles par gallon)").',
          '3. Légendes (Key) : Indispensables pour associer sans ambiguïté les formes de points ou les couleurs aux modalités.',
          '4. Barres de couleur (Colorbar) : Présentent l\'échelle d\'étalonnage pour les variables numériques continues en 3e dimension.',
          '5. Annotations spécifiques (Callouts) : Flèches textuelles pointant directement vers un événement anormal, un pic saisonnier ou une rupture de tendance.',
          '6. Repères visuels : Lignes horizontales ou verticales en pointillés matérialisant des seuils d\'alerte, des objectifs contractuels ou la moyenne globale.'
        ]
      }
    ]
  }
];

export interface QuizQuestion {
  id: number;
  module: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const COURSE_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    module: 'Statistique Descriptive',
    question: 'Dans une étude sur une équipe de football, quel est le type statistique de la variable "Position sur le terrain (gardien, défenseur, attaquant)" ?',
    options: [
      'Quantitative continue',
      'Quantitative discrète',
      'Qualitative nominale',
      'Qualitative ordinale'
    ],
    correctIndex: 2,
    explanation: 'La position sur le terrain est une catégorie qualitative sans ordre de supériorité ou de hiérarchie mathématique naturelle : c\'est donc une variable qualitative nominale.'
  },
  {
    id: 2,
    module: 'Statistique Descriptive',
    question: 'Pourquoi la médiane est-elle souvent préférée à la moyenne pour analyser les revenus des ménages ou les prix de l\'immobilier ?',
    options: [
      'Parce qu\'elle est plus facile à calculer sans calculatrice',
      'Parce qu\'elle est résiliente (insensible) aux valeurs aberrantes et aux salaires disproportionnés',
      'Parce qu\'elle prend toujours une valeur entière',
      'Parce qu\'elle suppose obligatoirement une distribution gaussienne'
    ],
    correctIndex: 1,
    explanation: 'La moyenne est fortement tirée vers le haut par quelques salaires mirobolants (primes, dirigeants), tandis que la médiane sépare la population exactement en 50%/50% et reflète fidèlement la situation du citoyen typique.'
  },
  {
    id: 3,
    module: 'Mesures de Dispersion',
    question: 'Quelle est la principale limite de l\'étendue (Range : E = Max - Min) comme mesure de variabilité ?',
    options: [
      'Elle ne s\'exprime jamais dans la même unité que les données',
      'Elle est trop complexe à calculer sous Excel',
      'Elle ignore la distribution interne des données et dépend entièrement des deux valeurs extrêmes',
      'Elle est toujours négative'
    ],
    correctIndex: 2,
    explanation: 'L\'étendue ne regarde que les deux observations extrêmes et ignore totalement la répartition des 98% de points situés entre elles. Une seule erreur de saisie la modifie dramatiquement.'
  },
  {
    id: 4,
    module: 'Mesures de Dispersion',
    question: 'Dans la méthode des deux écarts-types (2-Sigma) pour une distribution normale avec une moyenne de 21.0 et un écart-type de 4.1, quelles sont les bornes de tolérance ?',
    options: [
      'Si = 16.9 et Ss = 25.1',
      'Si = 12.8 et Ss = 29.2',
      'Si = 10.0 et Ss = 30.0',
      'Si = 0.0 et Ss = 42.0'
    ],
    correctIndex: 1,
    explanation: 'Seuil Inférieur = 21.0 - (2 × 4.1) = 12.8. Seuil Supérieur = 21.0 + (2 × 4.1) = 29.2. Toute valeur hors de [12.8, 29.2] est classée outlier.'
  },
  {
    id: 5,
    module: 'Détection d\'Outliers',
    question: 'Quelle est la différence fondamentale entre la règle de l\'IQR standard et la méthode de Tukey pour la détection des valeurs aberrantes ?',
    options: [
      'L\'IQR utilise la moyenne et Tukey utilise la médiane',
      'L\'IQR utilise un facteur k = 1.5 alors que la méthode de Tukey utilise k = 3.0 pour éliminer moins de données',
      'L\'IQR est réservée aux variables qualitatives et Tukey aux quantitatives',
      'Tukey exige que les données soient standardisées au préalable'
    ],
    correctIndex: 1,
    explanation: 'La méthode de Tukey élargit la zone de tolérance en multipliant l\'IQR par 3 au lieu de 1.5, ciblant ainsi uniquement les outliers "lointains / extrêmes" et conservant plus d\'observations valides.'
  },
  {
    id: 6,
    module: 'Scaling & Algorithmes',
    question: 'Quelle transformation de données garantit une moyenne égale à 0 et un écart-type égal à 1 sans borner les valeurs ?',
    options: [
      'La normalisation Min-Max dans [0, 1]',
      'La binarisation',
      'La standardisation (Z-Score)',
      'La transformation logarithmique'
    ],
    correctIndex: 2,
    explanation: 'La standardisation calcule z = (x - μ) / σ, produisant une distribution centrée en 0 de variance unitaire, avec des valeurs pouvant s\'étendre vers ±∞.'
  },
  {
    id: 7,
    module: 'Algorithmes Avancés',
    question: 'Dans l\'algorithme DBSCAN sous Scikit-Learn, quel label numérique est attribué aux points détectés comme bruit / outliers ?',
    options: [
      'Label 0',
      'Label 999',
      'Label NaN',
      'Label -1'
    ],
    correctIndex: 3,
    explanation: 'DBSCAN assigne le label -1 à tout point isolé qui ne réunit pas au moins `min_samples` voisins dans son rayon de voisinage `eps`.'
  },
  {
    id: 8,
    module: 'Machine Learning',
    question: 'Dans le cadre d\'une classification de documents ou de détection de spam textuel basée sur la fréquence d\'apparition des mots, quelle variante de Naive Bayes doit-on choisir ?',
    options: [
      'GaussianNB',
      'BernoulliNB',
      'MultinomialNB',
      'CategoricalNB'
    ],
    correctIndex: 2,
    explanation: 'MultinomialNB est spécifiquement taillé pour traiter des variables de comptage entier ou de fréquences de mots issues d\'un CountVectorizer ou TF-IDF.'
  },
  {
    id: 9,
    module: 'Simulation Stochastique',
    question: 'Quel principe mathématique fondamental justifie le fonctionnement de la simulation de Monte Carlo ?',
    options: [
      'Le théorème de Pythagore',
      'La loi des grands nombres',
      'La conjecture de Goldbach',
      'Le principe d\'incertitude de Heisenberg'
    ],
    correctIndex: 1,
    explanation: 'La loi des grands nombres stipule que la moyenne d\'un grand nombre de tirages aléatoires indépendants converge avec certitude vers l\'espérance théorique de la population.'
  },
  {
    id: 10,
    module: 'Langage R',
    question: 'En langage R, quel opérateur permet de tester si un élément est contenu dans un vecteur ou une liste ?',
    options: [
      'in',
      '%in%',
      'contains()',
      '==*'
    ],
    correctIndex: 1,
    explanation: 'En R, l\'opérateur d\'appartenance vectorielle s\'écrit avec des pourcentages : `%in%`, par exemple `5 %in% c(1, 3, 5, 7)` renvoie `TRUE`.'
  },
  {
    id: 11,
    module: 'Langage R',
    question: 'Que renvoie la commande R `10 %/% 3` ?',
    options: [
      '3.333333',
      '1 (le reste)',
      '3 (le quotient entier)',
      'Une erreur de syntaxe'
    ],
    correctIndex: 2,
    explanation: 'En R, `%/%` effectue la division entière (quotient entier = 3), tandis que `%%` donne le reste modulo (1).'
  },
  {
    id: 12,
    module: 'Dataviz Décisionnelle',
    question: 'D\'après le cours du Pr. SADRATI, quelle combinaison de couleurs est particulièrement recommandée pour les dashboards professionnels et accessible aux personnes daltoniennes ?',
    options: [
      'Rouge pur et Vert pur',
      'Bleu et Orange / Rouge',
      'Jaune néon et Vert pomme',
      'Rose fuchsia et Violet foncé'
    ],
    correctIndex: 1,
    explanation: 'La combinaison Bleu + Orange/Rouge est à la fois très esthétique, contrastée, sémantiquement claire et reste parfaitement lisible pour les daltoniens.'
  }
];

export interface FormulaReference {
  name: string;
  category: string;
  formula: string;
  description: string;
  pythonSyntax: string;
  rSyntax: string;
  excelSyntax: string;
}

export const KEY_FORMULAS: FormulaReference[] = [
  {
    name: 'Moyenne Arithmétique',
    category: 'Tendance Centrale',
    formula: '\\bar{X} = \\frac{1}{n}\\sum_{i=1}^n x_i',
    description: 'Somme pondérée des valeurs divisée par l\'effectif total.',
    pythonSyntax: 'np.mean(data) ou statistics.mean(data)',
    rSyntax: 'mean(data)',
    excelSyntax: '=MOYENNE(plage) / =AVERAGE(range)'
  },
  {
    name: 'Médiane',
    category: 'Tendance Centrale & Position',
    formula: 'Q_2 = \\text{Rang } \\frac{n+1}{2} \\text{ ou moyenne des deux rangs centraux}',
    description: 'Partage la distribution ordonnée en deux moitiés égales (50% / 50%). Résiliente aux anomalies.',
    pythonSyntax: 'np.median(data) ou statistics.median(data)',
    rSyntax: 'median(data)',
    excelSyntax: '=MEDIANE(plage) / =MEDIAN(range)'
  },
  {
    name: 'Variance Échantillon',
    category: 'Dispersion',
    formula: 's^2 = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{X})^2',
    description: 'Moyenne des carrés des déviations à la moyenne, divisée par n-1 (degrés de liberté).',
    pythonSyntax: 'np.var(data, ddof=1)',
    rSyntax: 'var(data)',
    excelSyntax: '=VAR.S(plage) / =VAR.S(range)'
  },
  {
    name: 'Écart-Type Échantillon',
    category: 'Dispersion',
    formula: 's = \\sqrt{s^2} = \\sqrt{\\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{X})^2}',
    description: 'Racine carrée de la variance, exprimée dans la même unité de mesure que les observations.',
    pythonSyntax: 'np.std(data, ddof=1)',
    rSyntax: 'sd(data)',
    excelSyntax: '=ECARTYPE.STANDARD(plage) / =STDEV.S(range)'
  },
  {
    name: 'Écart Interquartile (IQR)',
    category: 'Dispersion & Position',
    formula: '\\text{IQR} = Q_3 - Q_1',
    description: 'Étendue occupée par les 50% de données centrales.',
    pythonSyntax: 'q3 - q1 avec np.percentile(data, [25, 75])',
    rSyntax: 'IQR(data)',
    excelSyntax: '=QUARTILE.INC(plage, 3) - QUARTILE.INC(plage, 1)'
  },
  {
    name: 'Bornes de Détection 2-Sigma',
    category: 'Détection d\'Outliers',
    formula: '[\\bar{X} - 2s, \\; \\bar{X} + 2s]',
    description: 'Englobe 95.45% de la distribution normale. Hors bornes = outlier.',
    pythonSyntax: '[mean - 2*std, mean + 2*std]',
    rSyntax: 'c(mean(x) - 2*sd(x), mean(x) + 2*sd(x))',
    excelSyntax: '=MOYENNE - 2*ECARTYPE'
  },
  {
    name: 'Bornes de Détection IQR / Tukey',
    category: 'Détection d\'Outliers',
    formula: '[Q_1 - k \\cdot \\text{IQR}, \\; Q_3 + k \\cdot \\text{IQR}] \\quad (k=1.5 \\text{ ou } 3)',
    description: 'Règle non paramétrique pour isoler les anomalies sans supposer une loi normale.',
    pythonSyntax: '[q1 - 1.5*iqr, q3 + 1.5*iqr]',
    rSyntax: 'boxplot.stats(x)$out',
    excelSyntax: 'Formule personnalisée basée sur QUARTILE'
  },
  {
    name: 'Z-Score (Standardisation)',
    category: 'Mise à l\'Échelle',
    formula: 'z = \\frac{x - \\bar{X}}{s}',
    description: 'Nombre d\'écarts-types séparant un point de la moyenne. |Z| > 3 = anomalie.',
    pythonSyntax: '(data - np.mean(data)) / np.std(data)',
    rSyntax: 'scale(data)',
    excelSyntax: '=CENTREE.REDUITE(x, moyenne, ecartype)'
  },
  {
    name: 'Normalisation Min-Max',
    category: 'Mise à l\'Échelle',
    formula: 'x_{\\text{norm}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}',
    description: 'Projette linéairement les données dans l\'intervalle [0, 1].',
    pythonSyntax: '(data - data.min()) / (data.max() - data.min())',
    rSyntax: '(x - min(x)) / (max(x) - min(x))',
    excelSyntax: '=(A1 - MIN(plage)) / (MAX(plage) - MIN(plage))'
  },
  {
    name: 'Théorème de Bayes',
    category: 'Probabilités & ML',
    formula: 'P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}',
    description: 'Actualisation de la probabilité a posteriori à partir d\'évidences observées.',
    pythonSyntax: 'MultinomialNB() de sklearn.naive_bayes',
    rSyntax: 'naiveBayes() de e1071',
    excelSyntax: 'Calcul par formules conditionnelles'
  }
];
