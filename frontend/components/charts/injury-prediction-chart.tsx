"use client";

import * as React from "react";
import { Area, Bar, ComposedChart, XAxis, YAxis, CartesianGrid } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartDataPoint } from "@/lib/services/injury-prediction";

const chartConfig = {
  workload_score: {
    label: "Workload Score",
    color: "hsl(var(--chart-1))",
  },
  injury: {
    label: "Injury",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface InjuryPredictionChartProps {
  data: ChartDataPoint[];
  title?: string;
  description?: string;
  selectedPlayer?: string;
  className?: string;
}

export function InjuryPredictionChart({
  data,
  title = "Injury Prediction - Workload & Injury Trends",
  description = "Showing workload scores and injury occurrences over time",
  selectedPlayer,
  className,
}: InjuryPredictionChartProps) {
  const formatXAxisLabel = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTooltipLabel = (value: string) => {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{formatTooltipLabel(label)}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'workload_score' && `Workload Score: ${entry.value}`}
              {entry.dataKey === 'injury' && `Injury: ${entry.value === 1 ? 'Yes' : 'No'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {selectedPlayer ? `Player: ${selectedPlayer}` : 'All Players'}
          </CardDescription>
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="fillWorkloadScore" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-workload_score)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-workload_score)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={formatXAxisLabel}
            />
            <YAxis
              yAxisId="workload"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis
              yAxisId="injury"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value === 1 ? 'Injured' : 'Healthy'}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <Area
              yAxisId="workload"
              dataKey="workload_score"
              type="monotone"
              fill="url(#fillWorkloadScore)"
              stroke="var(--color-workload_score)"
              strokeWidth={2}
              name="Workload Score"
            />
            <Bar
              yAxisId="injury"
              dataKey="injury"
              fill="var(--color-injury)"
              name="Injury"
              radius={[2, 2, 0, 0]}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
