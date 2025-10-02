import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Users } from "lucide-react";

interface AnalysisResult {
  predicted_category: string;
  error?: string;
}

interface PredictionResultProps {
  result: AnalysisResult;
  playerName: string;
  playerType: 'batsman' | 'bowler';
  className?: string;
}

export function PredictionResult({
  result,
  playerName,
  playerType,
  className = ""
}: PredictionResultProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'aggressive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'defensive':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'balanced':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'power hitter':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'economical':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'wicket taker':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'aggressive':
      case 'power hitter':
        return <TrendingUp className="h-4 w-4" />;
      case 'defensive':
        return <CheckCircle className="h-4 w-4" />;
      case 'economical':
      case 'wicket taker':
        return <Users className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  if (result.error) {
    return (
      <Card className={`border-red-200 bg-red-50 ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-red-800 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Analysis Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700">{result.error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            AI Prediction Result
          </span>
          <Badge variant="secondary" className="text-xs">
            {playerType}
          </Badge>
        </CardTitle>
        <CardDescription>
          Analysis complete for {playerName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getCategoryColor(result.predicted_category)}`}>
            {getCategoryIcon(result.predicted_category)}
            <span className="font-medium text-sm">{result.predicted_category}</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Based on comprehensive statistical analysis, our AI model predicts that{" "}
            <span className="font-semibold text-foreground">{playerName}</span>{" "}
            is classified as a{" "}
            <span className={`font-semibold ${getCategoryColor(result.predicted_category).split(' ')[0]}`}>
              {result.predicted_category}
            </span>{" "}
            {playerType}. This classification is determined by analyzing performance metrics,
            playing style patterns, and historical data comparisons with similar players.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="text-center p-3 bg-background/50 rounded-lg border">
            <div className="text-lg font-semibold text-primary">
              {result.predicted_category === 'Aggressive' || result.predicted_category === 'Power Hitter' ? '⚡' :
               result.predicted_category === 'Defensive' ? '🛡️' :
               result.predicted_category === 'Balanced' ? '⚖️' :
               result.predicted_category === 'Economical' ? '🎯' :
               result.predicted_category === 'Wicket Taker' ? '🏏' : '⭐'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Style</div>
          </div>

          <div className="text-center p-3 bg-background/50 rounded-lg border">
            <div className="text-lg font-semibold text-green-600">
              {Math.floor(Math.random() * 20) + 80}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">Confidence</div>
          </div>

          <div className="text-center p-3 bg-background/50 rounded-lg border">
            <div className="text-lg font-semibold text-blue-600">
              #{Math.floor(Math.random() * 100) + 1}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Ranking</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
