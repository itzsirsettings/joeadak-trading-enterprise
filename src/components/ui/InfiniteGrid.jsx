import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  motion, 
  useMotionValue, 
  useAnimationFrame 
} from "framer-motion";

const logger = {
  info: (context, message, data = {}) => {
    console.info(`[InfiniteGrid] ${context}:`, message, data)
  },
  error: (context, error, data = {}) => {
    console.error(`[InfiniteGrid] ${context}:`, error, data)
  }
}

export const InfiniteGrid = ({
  children,
  className,
  showPattern = true,
  gridSize = 40,
  speed = 0.5,
  ...props
}) => {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    } catch (error) {
      logger.error('handleMouseMove', error, {});
    }
  }, [mouseX, mouseY]);

  useAnimationFrame(() => {
    try {
      const currentX = gridOffsetX.get();
      const currentY = gridOffsetY.get();
      gridOffsetX.set((currentX + speed) % gridSize);
      gridOffsetY.set((currentY + speed) % gridSize);
    } catch (error) {
      logger.error('animationFrame', error, {});
    }
  });

  useEffect(() => {
    logger.info('mount', 'InfiniteGrid component mounted');
    return () => {
      logger.info('unmount', 'InfiniteGrid component unmounted');
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      {showPattern && (
        <>
          {/* Static background grid - visible gridlines */}
          <div 
            className="absolute inset-0 z-0" 
            style={{ backgroundColor: '#f8f9fa' }}
          >
            <GridLines offsetX={0} offsetY={0} gridSize={gridSize} />
          </div>
          
          {/* Animated overlay grid with mouse reveal */}
          <motion.div 
            className="absolute inset-0 z-10"
            style={{
              maskImage: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, black 0%, transparent 70%)`,
              WebkitMaskImage: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, black 0%, transparent 70%)`,
            }}
          >
            <GridLines offsetX={gridOffsetX} offsetY={gridOffsetY} gridSize={gridSize} animated />
          </motion.div>
        </>
      )}

      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[150px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  );
};

const GridLines = ({ offsetX, offsetY, gridSize = 40, animated = false }) => {
  const getOffset = (val) => {
    return val && typeof val.get === 'function' ? val.get() : (val || 0);
  };

  const x = getOffset(offsetX);
  const y = getOffset(offsetY);

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth + 200 : 2000;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight + 200 : 2000;

  const lines = [];
  
  // Vertical lines
  for (let i = -1; i < viewportWidth / gridSize + 2; i++) {
    const xPos = i * gridSize + x;
    const isMajor = (i + Math.round(x / gridSize)) % 5 === 0;
    lines.push(
      <line
        key={`v-${i}`}
        x1={xPos}
        y1={-100}
        x2={xPos}
        y2={viewportHeight + 100}
        stroke={isMajor ? "#0D3B66" : "#C4C4C4"}
        strokeWidth={isMajor ? 1.5 : 0.75}
        strokeOpacity={isMajor ? 0.8 : 0.5}
      />
    );
  }
  
  // Horizontal lines
  for (let i = -1; i < viewportHeight / gridSize + 2; i++) {
    const yPos = i * gridSize + y;
    const isMajor = (i + Math.round(y / gridSize)) % 5 === 0;
    lines.push(
      <line
        key={`h-${i}`}
        x1={-100}
        y1={yPos}
        x2={viewportWidth + 100}
        y2={yPos}
        stroke={isMajor ? "#0D3B66" : "#C4C4C4"}
        strokeWidth={isMajor ? 1.5 : 0.75}
        strokeOpacity={isMajor ? 0.8 : 0.5}
      />
    );
  }

  return (
    <svg
      className="w-full h-full"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#f8f9fa'
      }}
    >
      {lines}
    </svg>
  );
};

export default InfiniteGrid;
