import Button from "../../../components/ui/Button";

export default function ProblemContentContainer() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4 h-full overflow-hidden">
      {/* Problem Statement Section */}
      <section className="border border-[var(--border)] rounded-lg bg-[var(--bg)] overflow-y-auto">
        <div className="border-b border-[var(--border)] p-3 bg-[var(--code-bg)]">
          <h3 className="text-lg font-semibold text-[var(--text-h)]">
            Problem Statement
          </h3>
        </div>
        <div className="p-4 text-[var(--text)]">
          <p className="mb-4">Problem description will appear here.</p>
          
          <div className="mb-4">
            <h4 className="font-semibold text-[var(--text-h)] mb-2">Examples:</h4>
            <div className="bg-[var(--code-bg)] p-3 rounded border border-[var(--border)] font-[var(--mono)] text-sm">
              <p>Example test cases will be displayed here.</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-[var(--text-h)] mb-2">Constraints:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Constraint items will be listed here</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Editor & Test Cases Section */}
      <section className="border border-[var(--border)] rounded-lg bg-[var(--bg)] flex flex-col overflow-hidden">
        <div className="border-b border-[var(--border)] p-3 bg-[var(--code-bg)] flex justify-between items-center">
          <h3 className="text-lg font-semibold text-[var(--text-h)]">
            Code Editor
          </h3>
          <select className="px-3 py-1 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm cursor-pointer">
            <option>JavaScript</option>
            <option>Python</option>
            <option>Java</option>
            <option>C++</option>
          </select>
        </div>
        
        {/* Editor Placeholder */}
        <div className="flex-1 bg-[var(--code-bg)] p-4 font-[var(--mono)] text-sm text-[var(--text)] overflow-y-auto">
          <p>// Code editor will be integrated here</p>
          <p>// User can write solution code</p>
        </div>

        {/* Test Cases & Submit Section */}
        <div className="border-t border-[var(--border)] p-3 bg-[var(--code-bg)]">
          <div className="flex gap-2 mb-3">
            <Button value="Run Tests" className="bg-[var(--accent)] border-[var(--accent)]" />
            <Button value="Submit" />
          </div>
          <div className="text-sm text-[var(--text)]">
            <p>Test results will appear here.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
