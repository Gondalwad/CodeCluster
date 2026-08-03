const INSTRUCTIONS = [
  {
    icon: "📷",
    title: "Camera & Lighting",
    text: "Ensure your face is clearly visible and well-lit. Keep your camera at eye level.",
  },
  {
    icon: "🔇",
    title: "Silent Environment",
    text: "Stay in a quiet room. Speaking or background voices will trigger a warning.",
  },
  {
    icon: "👁️",
    title: "Stay on Screen",
    text: "Keep your eyes on the screen at all times. Looking away will be flagged.",
  },
  {
    icon: "🚫",
    title: "No Banned Objects",
    text: "Remove phones, books, and laptops from your desk before starting.",
  },
  {
    icon: "👤",
    title: "One Person Only",
    text: "Only you should be visible in the camera frame during the exam.",
  },
  {
    icon: "👓",
    title: "No Spectacles",
    text: "Remove glasses before starting. Spectacles will trigger a warning.",
  },
];

export default function ExamInstructions({ onStart }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-12 flex flex-col items-center">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] px-4 py-1.5 text-sm font-medium text-[var(--accent)] mb-4">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse inline-block" />
          AI Proctored Exam
        </div>
        <h1 className="text-4xl font-bold text-[var(--text-h)] tracking-tight">
          Before You Begin
        </h1>
        <p className="mt-3 max-w-xl text-[var(--text)] text-base">
          This exam is monitored by AI. Please read all instructions carefully before
          starting. Violations will result in warnings and may terminate your session.
        </p>
      </div>

      {/* Instruction Cards */}
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INSTRUCTIONS.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5 shadow-sm transition hover:border-[var(--accent-border)] hover:shadow-md"
          >
            <div className="mb-3 text-3xl">{item.icon}</div>
            <h3 className="mb-1 font-semibold text-[var(--text-h)]">{item.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--text)]">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Warning Policy */}
      <div className="mt-8 w-full max-w-3xl rounded-xl border border-[var(--accent-border)] bg-[var(--accent-bg)] px-6 py-4">
        <p className="text-sm font-medium text-[var(--text-h)]">⚠️ Warning Policy</p>
        <p className="mt-1 text-sm text-[var(--text)]">
          You are allowed a maximum of{" "}
          <span className="font-semibold text-[var(--accent)]">3 warnings</span>. Exceeding
          this limit will automatically terminate your exam session. Each violation type has
          a cooldown before it can trigger another warning.
        </p>
      </div>

      {/* Consent + Start */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="text-xs text-[var(--text)] max-w-sm text-center">
          By clicking <strong>Start Exam</strong>, you agree to be monitored via your camera
          and microphone for the duration of this session.
        </p>
        <button
          onClick={onStart}
          className="rounded-xl bg-[var(--accent)] px-10 py-3.5 text-base font-semibold text-white shadow-lg transition hover:opacity-90 active:scale-95 cursor-pointer"
        >
          Start Exam →
        </button>
      </div>
    </div>
  );
}
