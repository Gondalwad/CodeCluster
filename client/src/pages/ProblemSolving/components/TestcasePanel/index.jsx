import { useState, useEffect } from 'react';
import { TabButton } from '../../../ui';
import TestcaseSection from './TestcaseSection';
import TestResultSection from './TestResultSection';

export default function TestcasePanel({ isOpen = true, setIsOpen, testCases = [], output = null, isRunning = false }) {
  const [activeTab, setActiveTab] = useState('testcase');

  // Auto-switch to test-result tab when running or output arrives
  useEffect(() => {
    if (isRunning || output) setActiveTab('test-result');
  }, [isRunning, output]);

  const tabs = [
    { id: 'testcase', label: 'Testcase' },
    { id: 'test-result', label: 'Test Result' },
  ];

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col bg-[var(--bg)] overflow-hidden shadow-sm">
      {/* Sticky Tab Header */}
      <div className="flex items-center border-b border-[var(--border)] bg-[var(--code-bg)] sticky top-0 z-10 shadow-sm">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'testcase' && <TestcaseSection testCases={testCases} />}
        {activeTab === 'test-result' && <TestResultSection output={output} isRunning={isRunning} />}
      </div>
    </div>
  );
}
