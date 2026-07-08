import { useResizable } from '../../../hooks/useResizable';

export default function ResizablePanel({ 
  left, 
  right, 
  defaultLeftWidth = 50,
  minLeftWidth = 350,
  minRightWidth = 350
}) {
  const { size: leftWidth, isDragging, containerRef, handleMouseDown } = useResizable({
    defaultSize: defaultLeftWidth,
    minFirstSize: minLeftWidth,
    minSecondSize: minRightWidth,
    direction: 'horizontal'
  });

  return (
    <div ref={containerRef} className="flex h-full w-full relative">
      {/* Left Panel */}
      <div 
        style={{ width: `${leftWidth}%` }}
        className="overflow-hidden"
      >
        {left}
      </div>

      {/* Resizer */}
      <div
        onMouseDown={handleMouseDown}
        className={`
          w-1 bg-[var(--border)] hover:bg-[var(--accent)] 
          cursor-col-resize relative transition-all duration-200 flex-shrink-0
          ${
            isDragging 
              ? 'bg-[var(--accent)] w-1.5 shadow-lg shadow-[var(--accent)]/50' 
              : ''
          }
        `}
      >
        <div className="absolute inset-y-0 -left-2 -right-2" />
        {/* Visual indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-50 hover:opacity-100 transition-opacity">
          <div className="w-1 h-1 rounded-full bg-current" />
          <div className="w-1 h-1 rounded-full bg-current" />
          <div className="w-1 h-1 rounded-full bg-current" />
        </div>
      </div>

      {/* Right Panel */}
      <div 
        style={{ width: `${100 - leftWidth}%` }}
        className="overflow-hidden"
      >
        {right}
      </div>
    </div>
  );
}
