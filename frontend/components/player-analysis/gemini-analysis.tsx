import { useChat } from "@ai-sdk/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from 'react';
import { MarkdownContent } from "@/components/ui/markdown-content";


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

interface GeminiAnalysisProps {
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

export function GeminiAnalysis({ result, playerType, playerStats, playerName }: GeminiAnalysisProps) {
  const { messages, append } = useChat({
    api: '/api/gemini-summary',
    id: `${playerName}-analysis`,
    body: {
      playerStats,
      playerType,
      playerName,
      result
    },
    onError: async (error) => {
      console.error("Error fetching response:", error);
    }
  });

  // Trigger analysis when component mounts
  useEffect(() => {
    const triggerAnalysis = async () => {
      try {
        const analysisPrompt = JSON.stringify({
          playerStats,
          playerType,
          playerName,
          result
        });
        await append({
          role: 'user',
          content: analysisPrompt
        });
      } catch (error) {
        console.error("Error triggering analysis:", error);
      }
    };

    if (messages.length === 0) {
      triggerAnalysis();
    }
  }, [append, playerStats, playerType, playerName, result, messages.length]);

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          Gemini Powered AI Analysis
        </CardTitle>
        <CardDescription>
          Detailed performance analysis, insights and recommendations using Gemini AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.length > 0 ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {messages.map((message, index) => (
                message.role === 'assistant' && (
                  <MarkdownContent
                    key={index}
                    content={message.content}
                    id={`${playerName}-analysis-${index}`}
                  />
                )
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">Analyzing player performance...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}