'use client';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ScatterController,
  CategoryScale,
  ScriptableChartContext,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { BattingAnalysisService, NearestPlayer } from "../../lib/services/batting-analysis";

// Register Chart.js components
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ScatterController,
  CategoryScale
);

interface ScatterPlotChartProps {
  data: NearestPlayer[];
  currentPlayerAvg: number;
  currentPlayerSr: number;
  currentPlayerName: string;
  className?: string;
}

export function ScatterPlotChart({
  data,
  currentPlayerAvg,
  currentPlayerSr,
  currentPlayerName,
  className = ""
}: ScatterPlotChartProps) {
  const chartData = {
    datasets: [
      {
        label: 'Similar Players',
        data: data
          .filter(d => d.player !== currentPlayerName)
          .map(d => ({
            x: d.avg,
            y: d.sr,
            player: d.player,
            avg: d.avg,
            sr: d.sr,
            runs: d.runs,
            mat: d.mat,
            distance: d.distance,
          })),
        backgroundColor: [
          'hsl(142, 71%, 45%)', // Emerald-500 - matches Cricklytics theme
          'hsl(142, 71%, 55%)', // Emerald-400 - fallback for dark theme
        ],
        borderColor: [
          'hsl(142, 71%, 45%)', // Emerald-500
          'hsl(142, 71%, 55%)', // Emerald-400
        ],
        borderWidth: 3,
        pointRadius: 9,
        pointHoverRadius: 12,
        pointBorderWidth: 3,
        pointBorderColor: [
          'hsl(var(--background))',
          'hsl(var(--background))',
        ],
        pointBackgroundColor: [
          'hsl(142, 71%, 45%)',
          'hsl(142, 71%, 55%)',
        ],
      },
      {
        label: currentPlayerName,
        data: [
          {
            x: currentPlayerAvg,
            y: currentPlayerSr,
            player: currentPlayerName,
            avg: currentPlayerAvg,
            sr: currentPlayerSr,
            runs: 0,
            mat: 0,
            distance: 0,
          }
        ],
        backgroundColor: [
          'hsl(180, 84%, 45%)', // Teal-500 - complements emerald theme
          'hsl(180, 84%, 55%)', // Teal-400 - fallback for dark theme
        ],
        borderColor: [
          'hsl(180, 84%, 45%)', // Teal-500
          'hsl(180, 84%, 55%)', // Teal-400
        ],
        borderWidth: 4,
        pointRadius: 16,
        pointHoverRadius: 20,
        pointBorderWidth: 4,
        pointBorderColor: [
          'hsl(var(--background))',
          'hsl(var(--background))',
        ],
        pointBackgroundColor: [
          'hsl(180, 84%, 45%)',
          'hsl(180, 84%, 55%)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            weight: 600 as const,
            family: 'Inter, system-ui, sans-serif',
          },
          color: function(context: ScriptableChartContext) {
            // Detect dark mode and return appropriate color
            const isDark = document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.documentElement).getPropertyValue('--background').includes('4.9');
            return isDark ? '#ffffff' : '#000000';
          } as any,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        padding: 16,
        position: 'nearest' as const,
        callbacks: {
          title: (context: any) => {
            return context[0].raw.player || 'Unknown Player';
          },
          label: (context: any) => {
            const data = context.raw;
            return [
              `Average: ${data.avg?.toFixed(2) || 'N/A'}`,
              `Strike Rate: ${data.sr?.toFixed(2) || 'N/A'}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'Batting Average',
          font: {
            size: 16,
            weight: 600 as const,
            family: 'Inter, system-ui, sans-serif',
          },
          color: function(context: ScriptableChartContext) {
            // Detect dark mode and return appropriate color
            const isDark = document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.documentElement).getPropertyValue('--background').includes('4.9');
            return isDark ? '#ffffff' : '#000000';
          } as any,
        },
        grid: {
          color: function(context: ScriptableChartContext) {
            // Detect dark mode and return appropriate color
            const isDark = document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.documentElement).getPropertyValue('--background').includes('4.9');
            return isDark ? 'rgba(156, 163, 175, 0.25)' : 'rgba(107, 114, 128, 0.15)';
          } as any,
          borderColor: function(context: ScriptableChartContext) {
            // Detect dark mode and return appropriate color
            const isDark = document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.documentElement).getPropertyValue('--background').includes('4.9');
            return isDark ? 'rgba(156, 163, 175, 0.5)' : 'rgba(107, 114, 128, 0.6)';
          } as any,
          lineWidth: 2,
        },
        ticks: {
          font: {
            size: 13,
            family: 'Inter, system-ui, sans-serif',
          },
          color: function(context: ScriptableChartContext) {
            // Detect dark mode and return appropriate color
            const isDark = document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.documentElement).getPropertyValue('--background').includes('4.9');
            return isDark ? '#ffffff' : '#000000';
          } as any,
          padding: 8,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Strike Rate',
          font: {
            size: 16,
            weight: 600 as const,
            family: 'Inter, system-ui, sans-serif',
          },
          color: function(context: ScriptableChartContext) {
            // Detect dark mode and return appropriate color
            const isDark = document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.documentElement).getPropertyValue('--background').includes('4.9');
            return isDark ? '#ffffff' : '#000000';
          } as any,
        },
        grid: {
          color: function(context: ScriptableChartContext) {
            // Detect dark mode and return appropriate color
            const isDark = document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.documentElement).getPropertyValue('--background').includes('4.9');
            return isDark ? 'rgba(156, 163, 175, 0.25)' : 'rgba(107, 114, 128, 0.15)';
          } as any,
          borderColor: function(context: ScriptableChartContext) {
            // Detect dark mode and return appropriate color
            const isDark = document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.documentElement).getPropertyValue('--background').includes('4.9');
            return isDark ? 'rgba(156, 163, 175, 0.5)' : 'rgba(107, 114, 128, 0.6)';
          } as any,
          lineWidth: 2,
        },
        ticks: {
          font: {
            size: 13,
            family: 'Inter, system-ui, sans-serif',
          },
          color: function(context: ScriptableChartContext) {
            // Detect dark mode and return appropriate color
            const isDark = document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.documentElement).getPropertyValue('--background').includes('4.9');
            return isDark ? '#ffffff' : '#000000';
          } as any,
          padding: 8,
        },
      },
    },
    elements: {
      point: {
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    },
  };

  return (
    <div className={`w-full h-[600px] ${className}`}>
      <Scatter data={chartData} options={options} />
    </div>
  );
}
