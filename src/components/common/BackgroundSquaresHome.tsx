"use client";

import React, { useRef, useEffect, useMemo } from 'react';

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

// Helper function to darken a color (make it darker)
const darkenColor = (color: string, percent: number): string => {
  const hex = color.replace("#", "");
  const num = parseInt(hex, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
};

interface BackgroundSquaresProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
  backgroundColor?: string; // สีพื้นหลังที่เปลี่ยนตาม headerColor
}

export function BackgroundSquares({
  direction = 'diagonal',
  speed = 0.1,
  borderColor,
  squareSize = 70,
  hoverFillColor,
  backgroundColor
}: BackgroundSquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);

  // Default background color (light blue)
  const defaultBgColor = '#C9F3FF';
  const bgColor = backgroundColor || defaultBgColor;

  // Calculate grid border color from background color (darker by 10-15%)
  const calculatedBorderColor = useMemo(() => {
    if (borderColor) return borderColor; // Use provided borderColor if exists
    if (backgroundColor) {
      // Make border color darker than background (10% darker)
      return darkenColor(bgColor, -10);
    }
    return '#C2E9FA'; // Default border color
  }, [borderColor, backgroundColor, bgColor]);

  // Calculate hover fill color from background color (slightly lighter)
  const calculatedHoverFillColor = useMemo(() => {
    if (hoverFillColor) return hoverFillColor; // Use provided hoverFillColor if exists
    if (backgroundColor) {
      // Make hover color slightly lighter than background (5% lighter)
      const hex = bgColor.replace("#", "");
      const num = parseInt(hex, 16);
      const R = Math.min(255, Math.max(0, (num >> 16) + 13));
      const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + 13));
      const B = Math.min(255, Math.max(0, (num & 0x0000ff) + 13));
      return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
    }
    return '#C8F0FA'; // Default hover fill color
  }, [hoverFillColor, backgroundColor, bgColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = calculatedHoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = calculatedBorderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, calculatedBorderColor, calculatedHoverFillColor, squareSize]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      {/* Background color overlay with transition */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: bgColor,
          transition: 'background-color 0.5s ease',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full border-none block"></canvas>
    </div>
  );
}
