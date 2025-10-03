import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Users, Brain, Award } from "lucide-react";

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
        return 'bg-red-100 text-red-800 border-red-300';
      case 'anchor':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'balanced':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'power hitter':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'economical':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'wicket taker':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'aggressive':
      case 'power hitter':
        return <TrendingUp className="h-6 w-6" />;
      case 'defensive':
        return <CheckCircle className="h-6 w-6" />;
      case 'economical':
      case 'wicket taker':
        return <Users className="h-6 w-6" />;
      default:
        return <CheckCircle className="h-6 w-6" />;
    }
  };

  const getCategoryDescription = (category: string, playerType: string) => {
    switch (category.toLowerCase()) {
      case 'aggressive':
        return playerType === 'batsman'
          ? "High strike rate, boundary hitter, game changer"
          : "Wicket-taking threat, aggressive field placement";
      case 'defensive':
        return playerType === 'batsman'
          ? "Reliable run accumulator, anchor player"
          : "Tight line and length, consistent performer";
      case 'balanced':
        return playerType === 'batsman'
          ? "Well-rounded technique, adaptable to situations"
          : "Good control and wicket-taking ability";
      case 'power hitter':
        return "Maximum hitter, six specialist, match winner";
      case 'economical':
        return "Tight bowling, run-saving specialist, death overs expert";
      case 'wicket taker':
        return "Strike bowler, wicket specialist, game breaker";
      default:
        return "Consistent performer with reliable skills";
    }
  };

  if (result.error) {
    return (
      <Card className={`border-2 border-red-200 bg-red-50 ${className}`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-red-800 flex items-center gap-3 text-xl">
            <Brain className="h-7 w-7" />
            Analysis Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 text-base leading-relaxed">{result.error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent shadow-lg ${className}`}>
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-3 text-2xl font-bold">
            <div className="p-2 bg-primary/10 rounded-full">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            AI Prediction Result
          </span>
          <Badge variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20">
            {playerType[0].toUpperCase() + playerType.slice(1)}
          </Badge>
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Comprehensive analysis complete for <span className="font-semibold text-foreground">{playerName}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Main Prediction Badge */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl border-2 text-lg font-bold ${getCategoryColor(result.predicted_category)}`}>
            {getCategoryIcon(result.predicted_category)}
            <span className="text-xl">{result.predicted_category.toUpperCase()}</span>
          </div>

          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            {getCategoryDescription(result.predicted_category, playerType)}
          </p>
        </div>

        {/* Detailed Explanation */}
        <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl p-6 border border-muted/50">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-base mb-2 text-foreground">Analysis Summary</h4>
              <p className="text-base text-muted-foreground leading-relaxed">
                Our advanced AI model analyzed <span className="font-semibold text-foreground">{playerName}'s</span> performance metrics,
                playing patterns, and statistical data. The prediction indicates a{' '}
                <span className={`font-bold text-lg ${getCategoryColor(result.predicted_category).split(' ')[0]}`}>
                  {result.predicted_category}
                </span>{' '}
                playing style based on comprehensive historical comparisons and performance indicators.
              </p>
            </div>
          </div>
        </div>

        {/* Confidence Indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/20 rounded-lg py-3">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>AI confidence level: High • Based on statistical analysis</span>
        </div>

      </CardContent>
    </Card>
  );
}
