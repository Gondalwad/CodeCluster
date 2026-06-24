import { useState, useRef, useEffect } from 'react';

export default function ResizablePanel({ 
  left, 
  right, 
  defaultLeftWidth = 50,
  minLeftWidth = 350,
  minRightWidth = 350
}) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
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
      const containerWidth = containerRect.width;
      
      // Calculate new width percentage
      const newLeftWidth = ((e.clientX - containerRect.left) / containerWidth) * 100;
      
      // Calculate pixel values for constraints
      const leftWidthPixels = (newLeftWidth / 100) * containerWidth;
      const rightWidthPixels = containerWidth - leftWidthPixels;

      // Apply minimum width constraints (350px or 30%)
      const minLeftPercent = Math.max((minLeftWidth / containerWidth) * 100, 30);
      const maxLeftPercent = Math.min(100 - (minRightWidth / containerWidth) * 100, 70);

      if (newLeftWidth >= minLeftPercent && newLeftWidth <= maxLeftPercent) {
        setLeftWidth(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, minLeftWidth, minRightWidth]);

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
          cursor-col-resize relative transition-colors flex-shrink-0
          ${isDragging ? 'bg-[var(--accent)]' : ''}
        `}
      >
        <div className="absolute inset-y-0 -left-2 -right-2" />
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
