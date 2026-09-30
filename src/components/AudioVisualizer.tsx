import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../services/audioEngine';

interface AudioVisualizerProps {
  height?: number;
  width?: number;
  active?: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ height = 48, width = 160, active = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const bufferLength = 32;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animId = requestAnimationFrame(render);

      soundEngine.getFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 20;
      const barWidth = 3;
      const gap = (canvas.width - barCount * barWidth) / (barCount - 1);

      for (let i = 0; i < barCount; i++) {
        // Sample frequency with a curve
        const freqIndex = Math.floor((i / barCount) * (bufferLength / 2));
        let rawVal = dataArray[freqIndex] || 0;
        
        // If sound is playing or active, introduce subtle organic idle pulse if silent
        if (active && rawVal < 15) {
          rawVal = 18 + Math.sin(Date.now() * 0.005 + i * 0.4) * 12;
        } else if (!active) {
          rawVal = 4 + Math.sin(Date.now() * 0.002 + i * 0.3) * 3;
        }

        const barHeight = Math.max(3, (rawVal / 255) * canvas.height * 0.9);
        const x = i * (barWidth + gap);
        const y = (canvas.height - barHeight) / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (active) {
          gradient.addColorStop(0, 'rgba(255, 238, 187, 0.95)');
          gradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.85)');
          gradient.addColorStop(1, 'rgba(164, 130, 27, 0.4)');
        } else {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-lg opacity-90 transition-opacity duration-500"
    />
  );
};
