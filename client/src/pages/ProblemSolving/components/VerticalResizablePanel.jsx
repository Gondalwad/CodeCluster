import { useResizable } from '../../../hooks/useResizable';

export default function VerticalResizablePanel({ 
  top, 
  bottom, 
  defaultTopHeight = 60,
  minTopHeight = 200,
  minBottomHeight = 150
}) {
  const { size: topHeight, isDragging, containerRef, handleMouseDown } = useResizable({
    defaultSize: defaultTopHeight,
    minFirstSize: minTopHeight,
    minSecondSize: minBottomHeight,
    direction: 'vertical'
  });

  return (
    <div ref={containerRef} className="flex flex-col h-full w-full">
      {/* Top Panel */}
      <div 
        style={{ height: `${topHeight}%` }}
        className="overflow-hidden"
      >
        {top}
      </div>

      {/* Horizontal Resizer */}
      <div
        onMouseDown={handleMouseDown}
        className={`
          h-1 bg-[var(--border)] hover:bg-[var(--accent)] 
          cursor-row-resize relative transition-all duration-200 flex-shrink-0
          ${
            isDragging 
              ? 'bg-[var(--accent)] h-1.5 shadow-lg shadow-[var(--accent)]/50' 
              : ''
          }
        `}
      >
        <div className="absolute inset-x-0 -top-1 -bottom-1" />
        {/* Visual indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1 opacity-50 hover:opacity-100 transition-opacity">
          <div className="w-1 h-1 rounded-full bg-current" />
          <div className="w-1 h-1 rounded-full bg-current" />
          <div className="w-1 h-1 rounded-full bg-current" />
        </div>
      </div>

      {/* Bottom Panel */}
      <div 
        style={{ height: `${100 - topHeight}%` }}
        className="overflow-hidden"
      >
        {bottom}
      </div>
    </div>
  );
}
