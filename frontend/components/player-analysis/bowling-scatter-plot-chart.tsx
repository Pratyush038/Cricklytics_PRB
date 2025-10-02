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
        backgroundColor: 'hsl(var(--chart-3))', // Use theme chart color
        borderColor: 'hsl(var(--chart-3))',
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
