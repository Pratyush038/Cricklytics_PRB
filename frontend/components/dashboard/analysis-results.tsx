'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from 'react';
import { ScatterPlotChart } from '@/components/player-analysis/scatter-plot-chart';
import { BowlingScatterPlotChart } from '@/components/player-analysis/bowling-scatter-plot-chart';
import { PredictionResult } from '@/components/player-analysis/prediction-result';
import { PlayerStatsCard } from '@/components/player-analysis/player-stats-card';
import { GeminiAnalysis } from '@/components/player-analysis/gemini-analysis';
import { BattingAnalysisService } from '../../lib/services/batting-analysis';
import { BowlingAnalysisService } from '../../lib/services/bowling-analysis';

interface PlayerStats {
  player: string;
  avg?: number;
  sr: number;
  mat?: number;
  runs?: number;
  wickets?: number;
  fours?: number;
  sixes?: number;
  econ?: number;
}

interface AnalysisResult {
  predicted_category: string;
  error?: string;
  comparison_data?: PlayerStats[];
}

interface PlayerVisualizationProps {
  result: AnalysisResult;
  playerType: 'batsman' | 'bowler';
  playerStats: {
    avg?: number;
    sr: number;
    mat?: number;
    runs?: number;
    wickets?: number;
    fours?: number;
    sixes?: number;
    econ?: number;
  };
  playerName: string;
  className?: string;
}

export const PlayerVisualization: React.FC<PlayerVisualizationProps> = ({
  result,
  playerType,
  playerStats,
  playerName,
  className = ''
}) => {
  const [nearestPlayers, setNearestPlayers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarPlayers = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching nearest players for:', playerName, 'Type:', playerType);

        let nearest: any[] = [];

        if (playerType === 'batsman') {
          console.log('Fetching batting data - Avg:', playerStats.avg, 'SR:', playerStats.sr);
          nearest = await BattingAnalysisService.fetchNearestPlayers(
            playerStats.avg || 0,
            playerStats.sr,
            20
          );
        } else if (playerType === 'bowler') {
          console.log('Fetching bowling data - Wickets:', playerStats.wickets, 'Econ:', playerStats.econ, 'SR:', playerStats.sr);
          nearest = await BowlingAnalysisService.fetchNearestBowlers(
            playerStats.wickets || 0,
            playerStats.econ || 0,
            playerStats.sr,
            20
          );
        }

        console.log('Found nearest players:', nearest.length, nearest.slice(0, 3));
        setNearestPlayers(nearest);
      } catch (error) {
        console.error('Error fetching nearest players:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarPlayers();
  }, [playerStats.avg, playerStats.sr, playerStats.wickets, playerStats.econ, playerType]);

  // Show comparison if we have similar players data
  const showComparisonChart = nearestPlayers.length > 1;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* PREDICTION COMES FIRST - NEW ORDER */}
      <PredictionResult
        result={result}
        playerName={playerName}
        playerType={playerType}
      />

      {/* GEMINI ANALYSIS - SECOND */}
      <GeminiAnalysis 
        result={result}
        playerType={playerType}
        playerStats={playerStats}
        playerName={playerName}
      />

      {/* PLAYER STATS - THIRD */}
      <PlayerStatsCard
        playerName={playerName}
        playerType={playerType}
        stats={playerStats}
      />

      {/* SCATTER PLOT CHART - THIRD */}
      {isLoading ? (
        <Card className="p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading comparison data...</p>
          </div>
        </Card>
      ) : showComparisonChart ? (
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              Performance Comparison Analysis
            </CardTitle>
            <CardDescription>
              {playerType === 'batsman' ? 'Batting' : 'Bowling'} performance comparison with similar players
            </CardDescription>
          </CardHeader>
          <CardContent>
            {playerType === 'batsman' ? (
              <ScatterPlotChart
                data={nearestPlayers}
                currentPlayerAvg={playerStats.avg || 0}
                currentPlayerSr={playerStats.sr}
                currentPlayerName={playerName}
              />
            ) : (
              <BowlingScatterPlotChart
                data={nearestPlayers}
                currentPlayerWickets={playerStats.wickets || 0}
                currentPlayerEcon={playerStats.econ || 0}
                currentPlayerSr={playerStats.sr}
                currentPlayerName={playerName}
              />
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="p-6">
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Comparison data not available. The model has predicted this player as a{' '}
                <Badge variant="outline" className="ml-1">
                  {result.predicted_category}
                </Badge>
                {nearestPlayers.length === 0 && ', but could not find similar players for comparison.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
