import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Target, TrendingUp, Activity, Award } from "lucide-react";

interface PlayerStatsCardProps {
  playerName: string;
  playerType: 'batsman' | 'bowler';
  stats: {
    avg?: number;
    sr: number;
    mat?: number;
    runs?: number;
    wickets?: number;
    fours?: number;
    sixes?: number;
    econ?: number;
  };
  className?: string;
}

export function PlayerStatsCard({
  playerName,
  playerType,
  stats,
  className = ""
}: PlayerStatsCardProps) {
  const formatNumber = (num: number | undefined, decimals = 0) => {
    if (num === undefined) return 'N/A';
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  return (
    <Card className={`bg-gradient-to-br from-background to-muted/20 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Player Statistics
          </CardTitle>
          <Badge variant="outline" className="capitalize">
            {playerType === 'batsman' ? 'Batsman' : 'Bowler'}
          </Badge>
        </div>
        <CardDescription>
          Performance metrics for {playerName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Player Info Section */}
        <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{playerName}</h3>
              <p className="text-sm text-muted-foreground capitalize">{playerType} Analysis</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.mat !== undefined && (
            <div className="bg-muted/30 rounded-lg p-3 border">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Matches</span>
              </div>
              <p className="text-lg font-bold">{formatNumber(stats.mat)}</p>
            </div>
          )}

          {playerType === 'batsman' ? (
            <>
              {stats.runs !== undefined && (
                <div className="bg-muted/30 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Total Runs</span>
                  </div>
                  <p className="text-lg font-bold">{formatNumber(stats.runs)}</p>
                </div>
              )}

              <div className="bg-muted/30 rounded-lg p-3 border">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Average</span>
                </div>
                <p className="text-lg font-bold">{formatNumber(stats.avg, 2)}</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 border">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Strike Rate</span>
                </div>
                <p className="text-lg font-bold">{formatNumber(stats.sr, 2)}</p>
              </div>

              {stats.fours !== undefined && (
                <div className="bg-muted/30 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Fours</span>
                  </div>
                  <p className="text-lg font-bold">{formatNumber(stats.fours)}</p>
                </div>
              )}

              {stats.sixes !== undefined && (
                <div className="bg-muted/30 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Sixes</span>
                  </div>
                  <p className="text-lg font-bold">{formatNumber(stats.sixes)}</p>
                </div>
              )}
            </>
          ) : (
            <>
              {stats.wickets !== undefined && (
                <div className="bg-muted/30 rounded-lg p-3 border">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Wickets</span>
                  </div>
                  <p className="text-lg font-bold">{formatNumber(stats.wickets)}</p>
                </div>
              )}

              <div className="bg-muted/30 rounded-lg p-3 border">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Economy</span>
                </div>
                <p className="text-lg font-bold">{formatNumber(stats.econ, 2)}</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 border">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Strike Rate</span>
                </div>
                <p className="text-lg font-bold">{formatNumber(stats.sr, 2)}</p>
              </div>
            </>
          )}
        </div>

        {/* Summary Section */}
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="font-medium text-primary">Performance Summary</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {playerType === 'batsman'
              ? `${playerName} has maintained a strike rate of ${stats.sr?.toFixed(2)} with an average of ${stats.avg?.toFixed(2)} across ${stats.mat || 0} matches.`
              : `${playerName} has taken ${stats.wickets || 0} wickets with an economy rate of ${stats.econ?.toFixed(2)} and strike rate of ${stats.sr?.toFixed(2)}.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
