// Developed by Shripad Dhanshetti

// A collection of presentational and interactive card components for a quiz/assessment dashboard.
// Designed to render different assessment question archetypes using Tailwind CSS and React Icons.
// 
// Components included:
//   - StatusBadge: A styling utility mapping status and difficulty levels (easy, medium, hard, active, etc.) to themed pill badges.
//   - MCQCard: An interactive Multiple Choice Question component with option locking and immediate visual feedback on selection.
//   - DescriptiveCard: A static card layout tailored for essay or long-form questions, displaying structural bounds like word count limits.
//   - CodingCard: A technical challenge card highlighting technical constraints (time/memory limits) and supported language tags.
//
// Expects 'question' objects to match shapes corresponding to their respective card variants, 
// including properties like id, topic, difficulty, text, options, and constraint parameters.

import { useState } from "react";
import { 
    FaCheck, 
    FaTimes, 
    FaCode, 
    FaAlignLeft, 
    FaCheckSquare, 
    FaInfoCircle, 
    FaClock, 
    FaHdd 
} from "react-icons/fa";

// Standalone Status Badge matching the dashboard's design
export function StatusBadge({ status }) {
  const map = {
    active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    inactive: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    upcoming: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    completed: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

// 1. MCQ Question Card Component
export function MCQCard({ question }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const optionLabels = ["A", "B", "C", "D"];

  const handleSelectOption = (option) => {
    if (selectedOption !== null) return; // Prevent changing selection
    setSelectedOption(option);
  };


  return (
    <div className="p-5 bg-(--bg) border border-(--border) rounded-2xl shadow-xs flex flex-col gap-4 transition-all duration-200 hover:shadow-md">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center p-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs">
            <FaCheckSquare />
          </span>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">MCQ #{question.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-(--text) bg-(--code-bg) px-2 py-0.5 rounded-md border border-(--border)">{question.topic}</span>
          <StatusBadge status={question.difficulty} />
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-sm font-semibold text-(--text-h) leading-relaxed">
        {question.text}
      </h3>

      {/* Options Grid */}
      {question.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
          {question.options.map((option, idx) => {
            const label = optionLabels[idx] || `${idx + 1}`;
            const isCorrect = option === question.correctAnswer;
            const isSelected = option === selectedOption;
            const hasChosen = selectedOption !== null;

            let optionStyle = "bg-(--code-bg) border-(--border) text-(--text) hover:border-indigo-500/40 hover:bg-(--bg) cursor-pointer";
            let badgeStyle = "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
            let badgeIcon = label;

            if (hasChosen) {
              if (isCorrect) {
                // Correct option (always highlighted green after selecting)
                optionStyle = "bg-green-50/50 dark:bg-green-950/15 border-green-500 dark:border-green-500/35 text-green-800 dark:text-green-300 font-medium";
                badgeStyle = "bg-green-600 text-white shadow-xs";
                badgeIcon = <FaCheck className="text-[10px]" />;
              } else if (isSelected) {
                // Selected incorrect option (highlighted red)
                optionStyle = "bg-rose-50/50 dark:bg-rose-950/15 border-rose-500 dark:border-rose-500/35 text-rose-800 dark:text-rose-300 font-medium";
                badgeStyle = "bg-rose-600 text-white shadow-xs";
                badgeIcon = <FaTimes className="text-[10px]" />;
              } else {
                // Non-selected incorrect options (faded out)
                optionStyle = "bg-(--code-bg) border-(--border) text-(--text) opacity-50 cursor-not-allowed";
              }
            }

            return (
              <button
                key={idx}
                disabled={hasChosen}
                onClick={() => handleSelectOption(option)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm text-left transition-all duration-150 ${optionStyle}`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 transition-colors duration-150 ${badgeStyle}`}
                >
                  {badgeIcon}
                </span>
                <span className="break-words">{option}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Correct Answer / Feedback Badge */}
      {selectedOption !== null && (
        <div className="mt-1 pt-3 border-t border-(--border)">
          <div
            className={`flex items-center gap-2 text-xs p-2.5 rounded-xl border ${
              selectedOption === question.correctAnswer
                ? "text-green-700 dark:text-green-400 bg-green-50/50 dark:bg-green-950/10 border-green-500/10"
                : "text-rose-700 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/10 border-rose-500/10"
            }`}
          >
            {selectedOption === question.correctAnswer ? (
              <>
                <FaCheck className="text-[10px]" />
                <span>Correct! You selected <strong className="font-semibold">{selectedOption}</strong>.</span>
              </>
            ) : (
              <>
                <FaTimes className="text-[10px]" />
                <span>Wrong choice! You selected <strong className="font-semibold">{selectedOption}</strong>. The correct answer is <strong className="font-semibold">{question.correctAnswer}</strong>.</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 2. Descriptive Question Card Component
export function DescriptiveCard({ question }) {
  return (
    <div className="p-5 bg-(--bg) border border-(--border) rounded-2xl shadow-xs flex flex-col gap-4 transition-all duration-200 hover:shadow-md">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center p-1.5 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-lg text-xs">
            <FaAlignLeft />
          </span>
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Descriptive #{question.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-(--text) bg-(--code-bg) px-2 py-0.5 rounded-md border border-(--border)">{question.topic}</span>
          <StatusBadge status={question.difficulty} />
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-sm font-semibold text-(--text-h) leading-relaxed">
        {question.text}
      </h3>

      {/* Details Footer */}
      <div className="flex flex-wrap gap-4 text-xs text-(--text) mt-1 pt-3 border-t border-(--border)">
        <div className="flex items-center gap-1.5">
          <FaInfoCircle className="opacity-70" />
          <span>Word Limit: <strong className="text-(--text-h) font-semibold">{question.wordCountLimit || "None"} words</strong></span>
        </div>
      </div>
    </div>
  );
}

// 3. Coding Question Card Component
export function CodingCard({ question }) {
  return (
    <div className="p-5 bg-(--bg) border border-(--border) rounded-2xl shadow-xs flex flex-col gap-4 transition-all duration-200 hover:shadow-md">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center p-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-lg text-xs">
            <FaCode />
          </span>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Coding #{question.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-(--text) bg-(--code-bg) px-2 py-0.5 rounded-md border border-(--border)">{question.topic}</span>
          <StatusBadge status={question.difficulty} />
        </div>
      </div>

      {/* Question Title */}
      <h3 className="text-sm font-semibold text-(--text-h) leading-relaxed">
        {question.title}
      </h3>

      {/* Constraints & Supported Languages */}
      <div className="flex flex-col gap-3 mt-1 pt-3 border-t border-(--border)">
        {/* Constraints */}
        <div className="flex flex-wrap gap-4 text-xs text-(--text)">
          {question.timeLimit && (
            <div className="flex items-center gap-1.5">
              <FaClock className="opacity-70 text-indigo-500" />
              <span>Time Limit: <strong className="text-(--text-h) font-semibold">{question.timeLimit}</strong></span>
            </div>
          )}
          {question.memoryLimit && (
            <div className="flex items-center gap-1.5">
              <FaHdd className="opacity-70 text-indigo-500" />
              <span>Memory Limit: <strong className="text-(--text-h) font-semibold">{question.memoryLimit}</strong></span>
            </div>
          )}
        </div>

        {/* Languages */}
        {question.languages && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-(--text)">
            <span className="font-medium">Languages:</span>
            {question.languages.map((lang) => (
              <span
                key={lang}
                className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700"
              >
                {lang}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
