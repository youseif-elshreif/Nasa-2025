"use client";

import { useEffect, useRef } from "react";

interface WeatherChartProps {
  data: { date: string; value: number }[];
  title: string;
  color: string;
  unit: string;
  gradient?: [string, string];
}

export default function WeatherChart({
  data,
  title,
  color,
  unit,
  gradient = ["rgba(59, 130, 246, 0.5)", "rgba(59, 130, 246, 0.1)"],
}: WeatherChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || data.length === 0)
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const container = containerRef.current;
    const dpr =
      (typeof window !== "undefined" ? window.devicePixelRatio : 1) || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 40, right: 20, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max values
    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    // Draw grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      // Y-axis labels
      const value = maxValue - (valueRange / 5) * i;
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "12px Arial";
      ctx.textAlign = "right";
      ctx.fillText(value.toFixed(1), padding.left - 10, y + 4);
    }

    // Draw chart line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    const points: { x: number; y: number }[] = [];
    data.forEach((point, index) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * index;
      const normalizedValue = (point.value - minValue) / valueRange;
      const y = padding.top + chartHeight - normalizedValue * chartHeight;
      points.push({ x, y });

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw gradient fill
    const gradientFill = ctx.createLinearGradient(
      0,
      padding.top,
      0,
      height - padding.bottom
    );
    gradientFill.addColorStop(0, gradient[0]);
    gradientFill.addColorStop(1, gradient[1]);

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding.bottom);
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradientFill;
    ctx.fill();

    // Draw data points
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // X-axis labels (show every 30th day approximately)
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    const labelInterval = Math.floor(data.length / 12);
    data.forEach((point, index) => {
      if (index % labelInterval === 0) {
        const x = padding.left + (chartWidth / (data.length - 1)) * index;
        ctx.fillText(point.date, x, height - padding.bottom + 20);
      }
    });

    // Title
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(title, width / 2, 25);
  }, [data, title, color, unit, gradient]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
