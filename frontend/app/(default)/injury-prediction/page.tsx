"use client";

import * as React from "react";
import { InjuryPredictionChart } from "@/components/charts/injury-prediction-chart";
import { InjuryPredictionService, ChartDataPoint, PlayerOption } from "@/lib/services/injury-prediction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayerSelector } from "@/components/injury-prediction/player-selector";
import { DateRangeSelector } from "@/components/injury-prediction/date-range-selector";
import { InjurySummaryStats } from "@/components/injury-prediction/injury-summary-stats";

export default function InjuryPredictionPage() {
  const [data, setData] = React.useState<ChartDataPoint[]>([]);
  const [players, setPlayers] = React.useState<PlayerOption[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = React.useState<number | null>(null);
  const [timeRange, setTimeRange] = React.useState("30d");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [startCalendarOpen, setStartCalendarOpen] = React.useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = React.useState(false);
  const [startDateValue, setStartDateValue] = React.useState<Date | undefined>(undefined);
  const [endDateValue, setEndDateValue] = React.useState<Date | undefined>(undefined);

  const fetchData = React.useCallback(async (startDate?: string, endDate?: string, playerId?: number) => {
    try {
      setLoading(true);
      setError(null);
      const chartData = await InjuryPredictionService.fetchInjuryPredictionData(startDate, endDate, playerId);
      setData(chartData);
    } catch (err) {
      console.error("Error fetching injury prediction data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPlayers = React.useCallback(async () => {
    try {
      const availablePlayers = await InjuryPredictionService.fetchAvailablePlayers();
      console.log("Available players:", availablePlayers);
      setPlayers(availablePlayers);
      // Auto-select first player if available
      if (availablePlayers.length > 0) {
        setSelectedPlayerId(availablePlayers[0].player_id);
      }
    } catch (err) {
      console.error("Error fetching players:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch players");
    }
  }, []);

  // Helper function to calculate date ranges based on time range
  const calculateDateRange = (timeRange: string) => {
    const end = new Date();
    const start = new Date();

    switch (timeRange) {
      case "7d":
        start.setDate(start.getDate() - 7);
        break;
      case "14d":
        start.setDate(start.getDate() - 14);
        break;
      case "30d":
        start.setDate(start.getDate() - 30);
        break;
      case "90d": // 3 months
        start.setMonth(start.getMonth() - 3);
        break;
      case "180d": // 6 months
        start.setMonth(start.getMonth() - 6);
        break;
      case "365d": // 1 year
        start.setFullYear(start.getFullYear() - 1);
        break;
      default:
        start.setDate(start.getDate() - 30); // Default to 30 days
    }

    const startDateStr = start.toISOString().split('T')[0];
    const endDateStr = end.toISOString().split('T')[0];

    return { startDateStr, endDateStr };
  };

  React.useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  React.useEffect(() => {
    if (selectedPlayerId) {
      if (timeRange === "custom") {
        // For custom range, wait for user to apply dates
        return;
      } else if (timeRange === "all") {
        // For all time, fetch all data without date filtering
        console.log(`Fetching data for player ${selectedPlayerId} - All time`);
        fetchData(undefined, undefined, selectedPlayerId);
      } else {
        // For preset ranges, calculate dates and fetch immediately
        const { startDateStr, endDateStr } = calculateDateRange(timeRange);
        console.log(`Fetching data for player ${selectedPlayerId} - Time range: ${timeRange}, Dates: ${startDateStr} to ${endDateStr}`);

        if (startDateStr && endDateStr) {
          fetchData(startDateStr, endDateStr, selectedPlayerId);
        }
      }
    }
  }, [fetchData, timeRange, selectedPlayerId]);

  const handlePlayerChange = (playerId: string) => {
    setSelectedPlayerId(parseInt(playerId));
  };

  const handleTimeRangeChange = (newTimeRange: string) => {
    setTimeRange(newTimeRange);
  };

  const handleApplyCustomRange = () => {
    if (selectedPlayerId && startDate && endDate) {
      fetchData(startDate, endDate, selectedPlayerId);
    }
  };

  const selectedPlayer = players.find(p => p.player_id === selectedPlayerId)?.player_name;

  // Set default date range (last 30 days) for custom mode
  React.useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);

    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDateValue(end);
    setStartDateValue(start);
  }, []);

  if (loading && players.length === 0) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Injury Prediction Analysis</CardTitle>
            <CardDescription>Loading player data...</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[350px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Injury Prediction Analysis</CardTitle>
            <CardDescription>No players found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>No player data available in the database.</p>
              <p className="text-sm mt-2">Please add player data to the injury_prediction table to view charts.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Injury Prediction Analysis</CardTitle>
            <CardDescription>Error loading data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-red-600 p-4 border border-red-200 rounded-lg">
              <p>Error: {error}</p>
              <button
                onClick={() => {
                  if (selectedPlayerId) {
                    if (timeRange === "custom" && startDate && endDate) {
                      fetchData(startDate, endDate, selectedPlayerId);
                    } else if (timeRange === "all") {
                      fetchData(undefined, undefined, selectedPlayerId);
                    } else {
                      // Use the same date calculation logic as the main effect
                      const { startDateStr, endDateStr } = calculateDateRange(timeRange);
                      if (startDateStr && endDateStr) {
                        fetchData(startDateStr, endDateStr, selectedPlayerId);
                      }
                    }
                  }
                }}
                className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Retry
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Injury Prediction Analysis</CardTitle>
          <CardDescription>
            Track individual player workload scores and injury occurrences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Player Selection - 50% width on large screens */}
            <div className="lg:col-span-2">
              <PlayerSelector
                players={players}
                selectedPlayerId={selectedPlayerId}
                onPlayerChange={handlePlayerChange}
              />
            </div>

            {/* Date Range Selection - spans remaining 50% */}
            <div className="lg:col-span-2">
              <DateRangeSelector
                timeRange={timeRange}
                onTimeRangeChange={handleTimeRangeChange}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                startCalendarOpen={startCalendarOpen}
                setStartCalendarOpen={setStartCalendarOpen}
                endCalendarOpen={endCalendarOpen}
                setEndCalendarOpen={setEndCalendarOpen}
                startDateValue={startDateValue}
                setStartDateValue={setStartDateValue}
                endDateValue={endDateValue}
                setEndDateValue={setEndDateValue}
                onApplyCustomRange={handleApplyCustomRange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedPlayerId && (timeRange !== "custom" || (startDate && endDate)) ? (
        <InjuryPredictionChart
          data={data}
          selectedPlayer={selectedPlayer}
          title={`Workload & Injury Analysis - ${selectedPlayer}`}
          description={`Showing workload scores and injury occurrences for the selected period`}
        />
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <p>Please select a player and time range to view the chart.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {data.length === 0 && selectedPlayerId && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <p>No data available for the selected player and time range.</p>
              <p className="text-sm mt-2">Try selecting a different time range or check if data exists for this player.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {data.length > 0 && (
        <InjurySummaryStats
          data={data}
          selectedPlayer={selectedPlayer}
          startDate={timeRange === "custom" ? startDate : undefined}
          endDate={timeRange === "custom" ? endDate : undefined}
        />
      )}
    </div>
  );
}