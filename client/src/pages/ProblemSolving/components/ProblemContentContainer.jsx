import { useState } from 'react';
import ProblemSection from './ProblemSection';
import EditorSection from './EditorSection';
import ResizablePanel from './ResizablePanel';
import ProblemDrawer from './ProblemDrawer';
import ProblemSidebar from './ProblemSidebar';

export default function ProblemContentContainer() {
  const [isProblemListOpen, setIsProblemListOpen] = useState(false);

  // Left Pane - Problem Description
  const leftPane = (
    <ProblemSection
      title="1. Two Sum"
      difficulty="Easy"
      acceptance="49.1%"
      submissions="2.5M"
      tags={['Array', 'Hash Table']}
      description="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
      examples={[
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: ''
        },
        {
          input: 'nums = [3,3], target = 6',
          output: '[0,1]',
          explanation: ''
        }
      ]}
      constraints={[
        '2 <= nums.length <= 10⁴',
        '-10⁹ <= nums[i] <= 10⁹',
        '-10⁹ <= target <= 10⁹',
        'Only one valid answer exists.'
      ]}
    />
  );

  // Right Pane - Editor
  const rightPane = (
    <EditorSection
      testCases={[
        { input: 'nums = [2,7,11,15]\ntarget = 9', output: '[0,1]' },
        { input: 'nums = [3,2,4]\ntarget = 6', output: '[1,2]' },
        { input: 'nums = [3,3]\ntarget = 6', output: '[0,1]' }
      ]}
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
            left={leftPane}
            right={rightPane}
            defaultLeftWidth={50}
            minLeftWidth={350}
            minRightWidth={350}
          />
        </div>

        {/* Mobile: Stacked */}
        <div className="lg:hidden flex flex-col gap-4 h-full overflow-auto p-4">
          <div className="min-h-[400px]">{leftPane}</div>
          <div className="min-h-[600px]">{rightPane}</div>
        </div>
      </div>
    </>
  );
}
