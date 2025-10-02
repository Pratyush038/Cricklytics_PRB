'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { PlayerVisualization as AnalysisResults } from './analysis-results';

interface FormState {
  player: string;
  mat: number;
  runs?: number;
  wickets?: number;
  sr: number;
  avg?: number;
  fours?: number;
  sixes?: number;
  econ?: number;
  start_year: number;
  end_year: number;
}

interface AnalysisResult {
  predicted_category: string;
  error?: string;
}

interface PlayerAnalysisFormProps {
  onSubmit: (data: any) => void;
}

const PlayerAnalysisForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  type PlayerType = 'batsman' | 'bowler';
  const [activeTab, setActiveTab] = useState<PlayerType>('batsman');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [formState, setFormState] = useState<FormState>({
    player: '',
    mat: 45,
    runs: 1500,
    sr: 135.00,
    avg: 40.00,
    fours: 35,
    sixes: 15,
    start_year: 2020,
    end_year: 2025
  });

  const handleTabChange = (value: PlayerType) => {
    setActiveTab(value);
    // Reset form state based on player type
    if (value === 'batsman') {
      setFormState({
        ...formState,
        runs: 1500,
        sr: 135.00,
        avg: 35.00,
        fours: 0,
        sixes: 0,
        wickets: undefined,
        econ: undefined,
      });
    } else {
      setFormState({
        ...formState,
        wickets: 75,
        econ: 4.50,
        sr: 20.00,
        runs: undefined,
        avg: undefined,
        fours: undefined,
        sixes: undefined,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormState(prev => ({
      ...prev,
      [id]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/player-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerType: activeTab,
          ...formState,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze player');
      }

      setAnalysisResult(data);
      toast.success('Analysis completed successfully');
      
    } catch (error) {
      console.error('Error analyzing player:', error);
      toast.error('Failed to analyze player. Please try again.');
      setAnalysisResult({ error: 'Failed to analyze player', predicted_category: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    if (activeTab === 'batsman') {
      setFormState({
        player: '',
        mat: 50,
        runs: 1500,
        sr: 135.00,
        avg: 35.00,
        fours: 0,
        sixes: 0,
        start_year: 2010,
        end_year: 2025
      });
    } else {
      setFormState({
        player: '',
        mat: 50,
        wickets: 75,
        econ: 4.50,
        sr: 20.00,
        start_year: 2010,
        end_year: 2025
      });
    }
  };

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Player Category Tabs */}
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => handleTabChange(value as PlayerType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="batsman">Batsman</TabsTrigger>
              <TabsTrigger value="bowler">Bowler</TabsTrigger>
            </TabsList>

            {/* Player Name */}
            <div className="space-y-2 pt-12">
              <Label htmlFor="player">Player Name</Label>
              <Input 
                id="player" 
                type="text"
                placeholder="Enter player name"
                value={formState.player}
                onChange={handleInputChange} />
            </div>
            <TabsContent value="batsman">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="mat">Matches Played</Label>
                  <Input
                    id="mat"
                    type="number"
                    value={formState.mat}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="runs">Total Runs</Label>
                  <Input
                    id="runs"
                    type="number"
                    value={formState.runs}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avg">Batting Average</Label>
                  <Input
                    id="avg"
                    type="number"
                    value={formState.avg}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sr">Strike Rate</Label>
                  <Input
                    id="sr"
                    type="number"
                    value={formState.sr}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fours">Number of Fours</Label>
                  <Input
                    id="fours"
                    type="number"
                    value={formState.fours}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sixes">Number of Sixes</Label>
                  <Input
                    id="sixes"
                    type="number"
                    value={formState.sixes}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_year">Career Start Year</Label>
                  <Input
                    id="start_year"
                    type="number"
                    value={formState.start_year}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_year">Career End Year</Label>
                  <Input
                    id="end_year"
                    type="number"
                    value={formState.end_year}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bowler">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="mat">Matches Played</Label>
                  <Input
                    id="mat"
                    type="number"
                    value={formState.mat}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wickets">Total Wickets</Label>
                  <Input
                    id="wickets"
                    type="number"
                    value={formState.wickets}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="econ">Economy Rate</Label>
                  <Input
                    id="econ"
                    type="number"
                    value={formState.econ}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sr">Bowling Strike Rate</Label>
                  <Input
                    id="sr"
                    type="number"
                    value={formState.sr}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_year">Career Start Year</Label>
                  <Input
                    id="start_year"
                    type="number"
                    value={formState.start_year}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_year">Career End Year</Label>
                  <Input
                    id="end_year"
                    type="number"
                    value={formState.end_year}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              type="button"
              onClick={handleClear}
            >
              Clear Data
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Analyse Player'}
            </Button>
          </div>
        </form>

      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <AnalysisResults
          result={analysisResult}
          playerName={formState.player}
          playerType={activeTab}
          playerStats={{
            sr: formState.sr,
            ...(activeTab === 'batsman' ? { avg: formState.avg } : {}),
            mat: formState.mat,
            runs: formState.runs,
            wickets: formState.wickets,
            econ: formState.econ,
            fours: formState.fours,
            sixes: formState.sixes,
          }}
        />
      )}
    </div>
  );
};

export default PlayerAnalysisForm;