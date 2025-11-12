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

const PlayerAnalysisForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  type PlayerType = 'batsman' | 'bowler';
  const [activeTab, setActiveTab] = useState<PlayerType>('batsman');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  const initialFormState: FormState = {
    player: '',
    mat: 351,
    runs: 11448,
    sr: 143.92,
    avg: 36.92,
    fours: 866,
    sixes: 839,
    start_year: 2007,
    end_year: 2022
  };
  
  const [submittedState, setSubmittedState] = useState<FormState>(initialFormState);
  const [localFormState, setLocalFormState] = useState<FormState>(initialFormState);

  const handleTabChange = (value: PlayerType) => {
    setActiveTab(value);
    // Reset form state based on player type
    const newState = value === 'batsman' 
      ? {
          ...localFormState,
          runs: 11448,
          sr: 143.92,
          avg: 36.92,
          fours: 866,
          sixes: 839,
          wickets: undefined,
          econ: undefined,
        }
      : {
          ...localFormState,
          wickets: 465,
          econ: 6.13,
          sr: 21.70,
          runs: undefined,
          avg: undefined,
          fours: undefined,
          sixes: undefined,
        };
    
    setLocalFormState(newState);
    setSubmittedState(newState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setLocalFormState(prev => ({
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
          ...localFormState,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze player');
      }

      setAnalysisResult(data);
      setSubmittedState(localFormState);
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
    const newState = activeTab === 'batsman' 
      ? {
          player: 'Chris Gayle',
          mat: 351,
          runs: 11448,
          sr: 143.92,
          avg: 36.92,
          fours: 866,
          sixes: 839,
          start_year: 2007,
          end_year: 2022
        }
      : {
          player: 'Sunil Narine',
          mat: 433,
          wickets: 465,
          econ: 6.13,
          sr: 21.70,
          start_year: 2011,
          end_year: 2025
        };
    
    setLocalFormState(newState);
    setSubmittedState(newState);
    setAnalysisResult(null);
  };

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Player Category Tabs */}
          {/* Player Name */}
          

          <Tabs 
            value={activeTab} 
            onValueChange={(value) => handleTabChange(value as PlayerType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="batsman">Batsman</TabsTrigger>
              <TabsTrigger value="bowler">Bowler</TabsTrigger>
            </TabsList>
            <TabsContent value="batsman">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="player">Player Name</Label>
                  <Input 
                    id="player" 
                    type="text"
                    placeholder="Enter player name"
                    value={localFormState.player}
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mat">Matches Played</Label>
                  <Input
                    id="mat"
                    type="number"
                    value={localFormState.mat}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="runs">Total Runs</Label>
                  <Input
                    id="runs"
                    type="number"
                    value={localFormState.runs}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avg">Batting Average</Label>
                  <Input
                    id="avg"
                    type="number"
                    value={localFormState.avg}
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
                    value={localFormState.sr}
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
                    value={localFormState.fours}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sixes">Number of Sixes</Label>
                  <Input
                    id="sixes"
                    type="number"
                    value={localFormState.sixes}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_year">Career Start Year</Label>
                  <Input
                    id="start_year"
                    type="number"
                    value={localFormState.start_year}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_year">Career End Year</Label>
                  <Input
                    id="end_year"
                    type="number"
                    value={localFormState.end_year}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bowler">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="player">Player Name</Label>
                  <Input 
                    id="player" 
                    type="text"
                    placeholder="Enter player name"
                    value={localFormState.player}
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mat">Matches Played</Label>
                  <Input
                    id="mat"
                    type="number"
                    value={localFormState.mat}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wickets">Total Wickets</Label>
                  <Input
                    id="wickets"
                    type="number"
                    value={localFormState.wickets}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="econ">Economy Rate</Label>
                  <Input
                    id="econ"
                    type="number"
                    value={localFormState.econ}
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
                    value={localFormState.sr}
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
                    value={localFormState.start_year}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_year">Career End Year</Label>
                  <Input
                    id="end_year"
                    type="number"
                    value={localFormState.end_year}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
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
          playerName={submittedState.player}
          playerType={activeTab}
          playerStats={{
            sr: submittedState.sr,
            ...(activeTab === 'batsman' ? { avg: submittedState.avg } : {}),
            mat: submittedState.mat,
            runs: submittedState.runs,
            wickets: submittedState.wickets,
            econ: submittedState.econ,
            fours: submittedState.fours,
            sixes: submittedState.sixes,
          }}
        />
      )}
    </div>
  );
};

export default PlayerAnalysisForm;