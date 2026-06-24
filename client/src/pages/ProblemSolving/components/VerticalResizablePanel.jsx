import { useState, useRef, useEffect } from 'react';

export default function VerticalResizablePanel({ 
  top, 
  bottom, 
  defaultTopHeight = 60,
  minTopHeight = 200,
  minBottomHeight = 150
}) {
  const [topHeight, setTopHeight] = useState(defaultTopHeight);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerHeight = containerRect.height;
      
      // Calculate new height percentage
      const newTopHeight = ((e.clientY - containerRect.top) / containerHeight) * 100;
      
      // Calculate pixel values for constraints
      const topHeightPixels = (newTopHeight / 100) * containerHeight;
      const bottomHeightPixels = containerHeight - topHeightPixels;

      // Apply constraints
      if (topHeightPixels >= minTopHeight && bottomHeightPixels >= minBottomHeight) {
        setTopHeight(newTopHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, minTopHeight, minBottomHeight]);

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
          cursor-row-resize relative transition-colors flex-shrink-0
          ${isDragging ? 'bg-[var(--accent)]' : ''}
        `}
      >
        <div className="absolute inset-x-0 -top-1 -bottom-1" />
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
