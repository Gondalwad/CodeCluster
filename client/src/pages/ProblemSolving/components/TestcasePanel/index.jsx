import { useState } from 'react';
import { TabButton } from '../../../../components/ui';
import TestcaseSection from './TestcaseSection';
import CustomInputSection from './CustomInputSection';
import TestResultSection from './TestResultSection';

export default function TestcasePanel({ isOpen = true, setIsOpen }) {
  const [activeTab, setActiveTab] = useState('testcase');

  const tabs = [
    { id: 'testcase', label: 'Testcase' },
    { id: 'test-result', label: 'Test Result' },
    { id: 'custom-input', label: 'Custom Input' }
  ];

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col bg-[var(--bg)] overflow-hidden">
      {/* Sticky Tab Header */}
      <div className="flex items-center border-b border-[var(--border)] bg-[var(--code-bg)] sticky top-0 z-10">
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
        {activeTab === 'testcase' && <TestcaseSection />}
        {activeTab === 'custom-input' && <CustomInputSection />}
        {activeTab === 'test-result' && <TestResultSection />}
      </div>
    </div>
  );
}
