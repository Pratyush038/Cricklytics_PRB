import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartDataPoint } from "@/lib/services/injury-prediction";

interface InjurySummaryStatsProps {
  data: ChartDataPoint[];
  selectedPlayer?: string;
  startDate?: string;
  endDate?: string;
}

export function InjurySummaryStats({
  data,
  selectedPlayer,
  startDate,
  endDate
}: InjurySummaryStatsProps) {
  if (data.length === 0) return null;

  const averageWorkload = Math.round(
    data.reduce((sum, item) => sum + item.workload_score, 0) / data.length
  );

  const peakWorkload = Math.max(...data.map(item => item.workload_score));
  const injuryDays = data.filter(item => item.injury === 1).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary Statistics</CardTitle>
        <CardDescription>
          Data insights for {selectedPlayer}
          {startDate && endDate && ` (${startDate} to ${endDate})`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {averageWorkload}
            </div>
            <div className="text-sm text-muted-foreground">Average Workload</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {peakWorkload}
            </div>
            <div className="text-sm text-muted-foreground">Peak Workload</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {injuryDays}
            </div>
            <div className="text-sm text-muted-foreground">Injury Days</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {data.length}
            </div>
            <div className="text-sm text-muted-foreground">Data Points</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
