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
import { BowlingAnalysisService, NearestBowler } from "../../lib/services/bowling-analysis";

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

interface BowlingScatterPlotChartProps {
  data: NearestBowler[];
  currentPlayerWickets: number;
  currentPlayerEcon: number;
  currentPlayerSr: number;
  currentPlayerName: string;
  className?: string;
}

export function BowlingScatterPlotChart({
  data,
  currentPlayerWickets,
  currentPlayerEcon,
  currentPlayerSr,
  currentPlayerName,
  className = ""
}: BowlingScatterPlotChartProps) {
  const chartData = {
    datasets: [
      {
        label: 'Similar Bowlers',
        data: data
          .filter(d => d.player !== currentPlayerName)
          .map(d => ({
            x: d.econ,
            y: d.sr,
            player: d.player,
            wickets: d.wickets,
            econ: d.econ,
            sr: d.sr,
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
            x: currentPlayerEcon,
            y: currentPlayerSr,
            player: currentPlayerName,
            wickets: currentPlayerWickets,
            econ: currentPlayerEcon,
            sr: currentPlayerSr,
            mat: 0,
            distance: 0,
          }
        ],
        backgroundColor: [
          'hsl(25, 95%, 53%)', // Orange-500 - vibrant complement to emerald
          'hsl(25, 95%, 63%)', // Orange-400 - fallback for dark theme
        ],
        borderColor: [
          'hsl(25, 95%, 53%)', // Orange-500
          'hsl(25, 95%, 63%)', // Orange-400
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
          'hsl(25, 95%, 53%)',
          'hsl(25, 95%, 63%)',
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
            return context[0].raw.player || 'Unknown Bowler';
          },
          label: (context: any) => {
            const data = context.raw;
            return [
              `Economy Rate: ${data.econ?.toFixed(2) || 'N/A'}`,
              `Strike Rate: ${data.sr?.toFixed(2) || 'N/A'}`,
              `Wickets: ${data.wickets || 'N/A'}`,
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
          text: 'Economy Rate',
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
