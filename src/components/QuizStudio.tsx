import React, { useState } from 'react';
import { 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Volume2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BRASS_QUIZ_QUESTIONS } from '../data/brassData';
import { brassAudio } from '../audio/brassAudio';

export const QuizStudio: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [answeredHistory, setAnsweredHistory] = useState<{ isCorrect: boolean; questionId: number }[]>([]);

  const currentQ = BRASS_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQ.correctIndex;

    brassAudio.playFeedback(isCorrect);
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setAnsweredHistory(prev => [...prev, { isCorrect, questionId: currentQ.id }]);
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < BRASS_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setAnsweredHistory([]);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Sparkles className="h-4 w-4" />
          <span>British Brass Music Certification</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          Brass Band Theory & Ear Quiz
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Test your mastery of Bb and Eb transpositions, D major to C major interval shifts, and traditional valve fingerings.
        </p>
      </div>

      {!quizFinished ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">
                Question {currentQuestionIndex + 1} of {BRASS_QUIZ_QUESTIONS.length}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="capitalize text-amber-300 font-medium">
                {currentQ.category.replace('-', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono tabular-nums text-slate-400">
              <span>Score:</span>
              <span className="font-bold text-amber-400">{score}</span>
              <span>/ {BRASS_QUIZ_QUESTIONS.length}</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-100 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, idx) => {
              let stateStyles = 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

              if (selectedOption === idx && !isAnswerSubmitted) {
                stateStyles = 'border-amber-400 bg-amber-400/10 text-amber-200 ring-2 ring-amber-400/30';
              } else if (isAnswerSubmitted) {
                if (idx === currentQ.correctIndex) {
                  stateStyles = 'border-emerald-500 bg-emerald-500/15 text-emerald-200 font-semibold ring-2 ring-emerald-500/40';
                } else if (selectedOption === idx && idx !== currentQ.correctIndex) {
                  stateStyles = 'border-rose-500 bg-rose-500/15 text-rose-200 line-through ring-2 ring-rose-500/40';
                } else {
                  stateStyles = 'border-slate-800 bg-slate-950 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full flex items-center justify-between rounded-xl border p-4 text-left text-xs sm:text-sm transition-all ${stateStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctIndex && (
                    <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Feedback */}
          {isAnswerSubmitted && (
            <div className={`mb-6 rounded-xl border p-4 text-xs sm:text-sm leading-relaxed ${
              selectedOption === currentQ.correctIndex
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
                : 'border-rose-500/30 bg-rose-500/10 text-rose-100'
            }`}>
              <div className="font-bold mb-1 flex items-center gap-1.5">
                {selectedOption === currentQ.correctIndex ? '✓ Correct!' : '✕ Not quite:'}
              </div>
              <p className="text-slate-300">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="rounded-xl bg-amber-400 px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 hover:bg-amber-300 transition-colors disabled:opacity-40"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 hover:bg-amber-300 transition-colors"
              >
                <span>{currentQuestionIndex < BRASS_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
            <Award className="h-8 w-8" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-slate-100">
            Quiz Completed!
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            You scored <span className="font-bold font-mono text-amber-400">{score}</span> out of{' '}
            <span className="font-bold font-mono text-slate-200">{BRASS_QUIZ_QUESTIONS.length}</span>
          </p>

          <div className="mx-auto my-6 max-w-sm rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300">
            {score >= 7 ? (
              <p>🏆 <strong>Gold Bandmaster Rank:</strong> Outstanding mastery of British brass transposition, Treble clef reading, and valve mechanics!</p>
            ) : score >= 5 ? (
              <p>🥈 <strong>Silver Soloist Rank:</strong> Solid grasp of transposition principles and brass tradition. Keep practicing those fingerings!</p>
            ) : (
              <p>🥉 <strong>Brass Apprentice:</strong> A respectable start! Review the C Scale transposition tables and re-try the challenge.</p>
            )}
          </div>

          <button
            onClick={handleRestartQuiz}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-amber-300 transition-colors shadow-lg"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};
