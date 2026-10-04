// developed by the only and only one hacker in the lkobby ,,,,,, "PIYUSH BHARAMBE"

import { useState, useRef, useEffect } from "react";

/**
 * Shared resizable panel logic
 * Used by both horizontal and vertical resizable panels
 */
export function useResizable({
  defaultSize = 50,
  minFirstSize,
  minSecondSize,
  direction = "horizontal", // 'horizontal' or 'vertical'
}) {
  const [size, setSize] = useState(defaultSize);
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

      const isHorizontal = direction === "horizontal";
      const containerSize = isHorizontal
        ? containerRect.width
        : containerRect.height;
      const mousePosition = isHorizontal
        ? e.clientX - containerRect.left
        : e.clientY - containerRect.top;

      // Calculate new size percentage
      const newSize = (mousePosition / containerSize) * 100;

      // Calculate pixel values for constraints
      const firstSizePixels = (newSize / 100) * containerSize;
      const secondSizePixels = containerSize - firstSizePixels;

      // Apply constraints
      if (isHorizontal) {
        const minFirstPercent = Math.max(
          (minFirstSize / containerSize) * 100,
          30,
        );
        const maxFirstPercent = Math.min(
          100 - (minSecondSize / containerSize) * 100,
          70,
        );

        if (newSize >= minFirstPercent && newSize <= maxFirstPercent) {
          setSize(newSize);
        }
      } else {
        if (
          firstSizePixels >= minFirstSize &&
          secondSizePixels >= minSecondSize
        ) {
          setSize(newSize);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor =
        direction === "horizontal" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, minFirstSize, minSecondSize, direction]);

  return {
    size,
    isDragging,
    containerRef,
    handleMouseDown,
  };
}
