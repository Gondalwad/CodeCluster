import React from 'react';
import ReactDOM from 'react-dom/client';
import ProctoringSession from '../proctoring/ProctoringSession';

function TestHarness() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111',
        color: '#fff',
        padding: 24,
      }}
    >
      <h1 style={{ marginBottom: 12 }}>Proctoring Test Harness</h1>

      <p style={{ marginBottom: 24, color: '#bbb' }}>
        Testing webcam and backend connection.
      </p>

      <ProctoringSession />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <TestHarness />
);