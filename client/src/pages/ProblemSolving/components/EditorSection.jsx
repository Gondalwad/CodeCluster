import { useState } from 'react';
import { CodeEditor } from './editor';
import TestCasePanel from './TestcasePanel';
import ConsoleOutputPanel from './ConsoleOutputPanel';
import VerticalResizablePanel from './VerticalResizablePanel';
import { FaList, FaRedo } from 'react-icons/fa';

const DEFAULT_CODE = {
  javascript: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};',
  python: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ',
  java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}',
  cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};',
  c: 'int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    \n}',
  typescript: 'function twoSum(nums: number[], target: number): number[] {\n    \n};',
  go: 'func twoSum(nums []int, target int) []int {\n    \n}',
  rust: 'impl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        \n    }\n}'
};

export default function EditorSection({ testCases = [], onToggleProblemList }) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState(null);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(DEFAULT_CODE[newLanguage] || '');
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleReset = () => {
    setCode(DEFAULT_CODE[language] || '');
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setOutput('Test cases passed: 0/3\n\nPlaceholder for execution results.');
    }, 1000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOutput('Submission successful!\n\nPlaceholder for submission results.');
    }, 1500);
  };

  // Top Section: Editor
  const editorSection = (
    <div className="h-full flex flex-col bg-[var(--bg)] overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] p-3 bg-[var(--code-bg)]">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleProblemList}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded hover:opacity-90 transition-opacity"
          >
            <FaList />
            <span>Problem List</span>
          </button>
          
          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isRunning ? 'Running...' : 'Run'}
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-3 py-1.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm cursor-pointer"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="typescript">TypeScript</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
          <button
            onClick={handleReset}
            className="p-2 rounded hover:bg-[var(--accent-bg)] text-[var(--text)] transition-colors"
            title="Reset Code"
          >
            <FaRedo />
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <CodeEditor
          language={language}
          value={code}
          onChange={handleCodeChange}
        />
      </div>
    </div>
  );

  // Bottom Section: Test Cases + Output
  const testSection = (
    <div className="h-full flex flex-col bg-[var(--bg)] overflow-hidden">
      {/* Test Cases */}
      <div className="flex-1 overflow-auto">
        <TestCasePanel isOpen={true} setIsOpen={() => {}} />
      </div>

      {/* Output - Only show when there's output or running */}
      {(output || isRunning) && (
        <div className="border-t border-[var(--border)] flex-1 overflow-auto">
          <ConsoleOutputPanel output={output} isRunning={isRunning} />
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full">
      {/* Desktop: Vertical resizing */}
      <div className="hidden md:block h-full">
        <VerticalResizablePanel
          top={editorSection}
          bottom={testSection}
          defaultTopHeight={60}
          minTopHeight={200}
          minBottomHeight={200}
        />
      </div>

      {/* Mobile: Stacked */}
      <div className="md:hidden h-full flex flex-col">
        <div className="flex-1">{editorSection}</div>
        <div className="h-[400px]">{testSection}</div>
      </div>
    </div>
  );
}
