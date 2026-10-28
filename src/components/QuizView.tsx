/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  COURSE_QUIZ, 
  QuizQuestion 
} from '../data/courseData';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ: QuizQuestion = COURSE_QUIZ[currentQuestionIndex];
  const totalQuestions = COURSE_QUIZ.length;

  const handleSelectOption = (optIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optIndex
    }));
  };

  const handleValidate = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) return;
    setIsAnswerSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
  };

  // Calculate score
  const score = Object.entries(selectedAnswers).reduce((acc, [qIdxStr, chosenOpt]) => {
    const qIdx = parseInt(qIdxStr, 10);
    if (COURSE_QUIZ[qIdx] && COURSE_QUIZ[qIdx].correctIndex === chosenOpt) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const currentSelected = selectedAnswers[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#f8f6f0] text-stone-800">
      
      {/* Quiz Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-teal-700 flex items-center justify-center text-white shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900">QCM d'Auto-Évaluation M201</h1>
            <p className="text-xs text-stone-500">
              12 questions tirées des exercices pratiques et concepts du Pr. SADRATI
            </p>
          </div>
        </div>

        {!quizFinished && (
          <div className="flex items-center gap-3 text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-300">
            <span>Question <strong className="text-stone-900 font-bold">{currentQuestionIndex + 1}</strong> / {totalQuestions}</span>
            <span className="text-stone-300">•</span>
            <span>Score actuel : <strong className="text-emerald-800 font-bold">{score}</strong></span>
          </div>
        )}
      </div>

      {/* Finished Summary Screen */}
      {quizFinished ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-6 shadow-md">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-stone-900 shadow-md shadow-amber-400/20">
            <Award className="w-10 h-10 text-stone-900" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-stone-900">Évaluation Terminée !</h2>
            <p className="text-sm text-stone-600 mt-1">
              Votre résultat final : <span className="font-bold text-stone-900 text-lg">{score}</span> sur <span className="font-bold text-stone-900 text-lg">{totalQuestions}</span> points ({Math.round((score / totalQuestions) * 100)}%)
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#fcfbf9] max-w-md mx-auto border border-stone-200 text-xs sm:text-sm text-stone-700">
            {score >= 10 ? (
              <p className="text-emerald-800 font-bold">
                🎉 Excellent niveau ! Vous maîtrisez parfaitement les systèmes décisionnels, les statistiques et le langage R.
              </p>
            ) : score >= 7 ? (
              <p className="text-teal-800 font-bold">
                👍 Bon résultat ! Quelques notions comme Tukey, DBSCAN ou la syntaxe R méritent une relecture de la synthèse.
              </p>
            ) : (
              <p className="text-amber-800 font-bold">
                📖 N'hésitez pas à relire les fiches de cours et à manipuler les simulateurs de l'atelier interactif pour consolider vos acquis.
              </p>
            )}
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Recommencer le QCM</span>
          </button>
        </div>
      ) : (
        /* Active Question Card */
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
          
          {/* Question Category & Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-bold text-emerald-800 uppercase tracking-wider">
                Module : {currentQ.module}
              </span>
              <span>Progression : {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-700 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = currentSelected === optIdx;
              const isCorrect = currentQ.correctIndex === optIdx;

              let btnStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 hover:border-stone-300';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                } else {
                  btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-emerald-50 border-emerald-700 text-emerald-950 font-bold shadow-xs';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-all ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pedagogical Explanation Box */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-xl border space-y-1.5 ${
              currentSelected === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
                {currentSelected === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span className="text-emerald-900">Bonne réponse !</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span className="text-amber-900">Explication pédagogique</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleValidate}
                disabled={currentSelected === undefined}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  currentSelected === undefined
                    ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400 border border-stone-200'
                    : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                Valider ma réponse
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>{currentQuestionIndex < totalQuestions - 1 ? 'Question Suivante' : 'Voir mon bilan'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
