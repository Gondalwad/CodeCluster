const INSTRUCTIONS = [
  {
    title: "Camera & Lighting",
    text: "Ensure your face is clearly visible and well-lit. Keep your camera at eye level.",
  },
  {
    title: "Silent Environment",
    text: "Stay in a quiet room. Speaking or background voices will trigger a warning.",
  },
  {
    title: "Stay on Screen",
    text: "Keep your eyes on the screen at all times. Looking away will be flagged.",
  },
  {
    title: "No Banned Objects",
    text: "Remove phones, books, and laptops from your desk before starting.",
  },
  {
    title: "One Person Only",
    text: "Only you should be visible in the camera frame during the exam.",
  },
  {
    title: "No Spectacles",
    text: "Remove glasses before starting. Spectacles will trigger a warning.",
  },
];

export default function ExamInstructions({ onStart }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-12 flex flex-col items-center">
      <div className="mb-8 text-center max-w-lg">
        <h1 className="text-2xl font-bold text-[var(--text-h)]">Exam Instructions</h1>
        <p className="mt-2 text-xs text-[var(--text)] leading-relaxed">
          Please review the following rules carefully before starting your session.
        </p>
      </div>

      <div className="w-full max-w-xl rounded-lg border border-[var(--border)] bg-[var(--bg)] divide-y divide-[var(--border)] shadow-sm">
        {INSTRUCTIONS.map((item) => (
          <div key={item.title} className="p-4">
            <h3 className="text-xs font-semibold text-[var(--text-h)]">{item.title}</h3>
            <p className="mt-1 text-xs text-[var(--text)] leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 w-full max-w-xl rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-[var(--text)]">
        <span className="font-semibold text-amber-500">Warning Policy:</span> Maximum 3 warnings allowed before session termination.
      </div>

      <button
        onClick={onStart}
        className="mt-6 rounded-md bg-[var(--accent)] px-8 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 cursor-pointer"
      >
        Start Exam
      </button>
    </div>
  );
}
