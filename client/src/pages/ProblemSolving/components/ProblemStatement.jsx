export default function ProblemStatement({ 
  description = "Problem description will appear here.",
  examples = [],
  constraints = []
}) {
  // Default dummy examples
  const displayExamples = examples.length > 0 ? examples : [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: ''
    }
  ];

  // Default dummy constraints
  const displayConstraints = constraints.length > 0 ? constraints : [
    '2 <= nums.length <= 10⁴',
    '-10⁹ <= nums[i] <= 10⁹',
    '-10⁹ <= target <= 10⁹',
    'Only one valid answer exists.'
  ];

  return (
    <div className="space-y-4 text-[var(--text)]">
      {/* Description */}
      <div className="text-sm leading-relaxed">
        <p>{description}</p>
      </div>

      {/* Examples */}
      <div>
        <h4 className="font-semibold text-[var(--text-h)] mb-3">Examples:</h4>
        <div className="space-y-3">
          {displayExamples.map((example, index) => (
            <div
              key={index}
              className="bg-[var(--code-bg)] p-4 rounded border border-[var(--border)] font-[var(--mono)] text-sm"
            >
              <div className="mb-2">
                <span className="font-semibold text-[var(--text-h)]">Input:</span>{' '}
                <span>{example.input}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-[var(--text-h)]">Output:</span>{' '}
                <span>{example.output}</span>
              </div>
              {example.explanation && (
                <div>
                  <span className="font-semibold text-[var(--text-h)]">Explanation:</span>{' '}
                  <span>{example.explanation}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Constraints */}
      <div>
        <h4 className="font-semibold text-[var(--text-h)] mb-2">Constraints:</h4>
        <ul className="list-disc list-inside text-sm space-y-1 font-[var(--mono)]">
          {displayConstraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
