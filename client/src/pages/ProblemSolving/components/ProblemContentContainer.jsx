import { useState } from 'react';
import ProblemSection from './ProblemSection';
import EditorSection from './EditorSection';
import ResizablePanel from './ResizablePanel';
import ProblemDrawer from './ProblemDrawer';
import ProblemSidebar from './ProblemSidebar';
import { MOCK_PROBLEM } from '../data/mockProblem';

export default function ProblemContentContainer() {
  const [isProblemListOpen, setIsProblemListOpen] = useState(false);

  const problemSection = (
    <ProblemSection
      title={MOCK_PROBLEM.title}
      difficulty={MOCK_PROBLEM.difficulty}
      acceptance={MOCK_PROBLEM.acceptance}
      submissions={MOCK_PROBLEM.submissions}
      tags={MOCK_PROBLEM.tags}
      description={MOCK_PROBLEM.description}
      examples={MOCK_PROBLEM.examples}
      constraints={MOCK_PROBLEM.constraints}
    />
  );

  const editorSection = (
    <EditorSection
      testCases={MOCK_PROBLEM.testCases}
      onToggleProblemList={() => setIsProblemListOpen(true)}
    />
  );

  return (
    <>
      {/* Sliding Drawer for Problem List */}
      <ProblemDrawer isOpen={isProblemListOpen} onClose={() => setIsProblemListOpen(false)}>
        <ProblemSidebar />
      </ProblemDrawer>

      {/* Main Content */}
      <div className="h-full">
        {/* Desktop: 50/50 split */}
        <div className="hidden lg:block h-full">
          <ResizablePanel
            left={problemSection}
            right={editorSection}
            defaultLeftWidth={50}
            minLeftWidth={350}
            minRightWidth={350}
          />
        </div>

        {/* Mobile: Stacked */}
        <div className="lg:hidden flex flex-col h-full overflow-auto">
          <div className="min-h-[450px] p-2">{problemSection}</div>
          <div className="min-h-[700px] p-2">{editorSection}</div>
        </div>
      </div>
    </>
  );
}
