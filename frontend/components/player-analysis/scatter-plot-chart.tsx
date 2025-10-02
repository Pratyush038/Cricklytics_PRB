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
            sr: d.sr,
            runs: d.runs,
            mat: d.mat,
            distance: d.distance,
          })),
        backgroundColor: 'hsl(var(--chart-2))', // Use theme chart color
        borderColor: 'hsl(var(--chart-2))',
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBorderWidth: 1,
        pointBorderColor: 'hsl(var(--background))',
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
        backgroundColor: 'hsl(var(--primary))', // Use theme primary color
        borderColor: 'hsl(var(--primary))',
        borderWidth: 2,
        pointRadius: 10,
        pointHoverRadius: 12,
        pointBorderWidth: 2,
        pointBorderColor: 'hsl(var(--background))',
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
          padding: 16,
          font: {
            size: 13,
            family: 'Inter, system-ui, sans-serif',
            color: 'hsl(var(--muted-foreground))',
          },
        },
      },
      tooltip: {
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
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
            size: 14,
            weight: 500,
            family: 'Inter, system-ui, sans-serif',
          },
          color: 'hsl(var(--foreground))',
        },
        grid: {
          color: 'hsl(var(--muted))',
          borderColor: 'hsl(var(--border))',
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, system-ui, sans-serif',
          },
          color: 'hsl(var(--muted-foreground))',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Strike Rate',
          font: {
            size: 14,
            weight: 500,
            family: 'Inter, system-ui, sans-serif',
          },
          color: 'hsl(var(--foreground))',
        },
        grid: {
          color: 'hsl(var(--muted))',
          borderColor: 'hsl(var(--border))',
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, system-ui, sans-serif',
          },
          color: 'hsl(var(--muted-foreground))',
        },
      },
    },
    elements: {
      point: {
        borderWidth: 1,
        hoverBorderWidth: 2,
      },
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart' as const,
    },
  };

  return (
    <div className={`w-full h-[500px] ${className}`}>
      <Scatter data={chartData} options={options} />
    </div>
  );
}
