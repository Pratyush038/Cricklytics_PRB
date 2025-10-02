import Papa from 'papaparse';

export interface PlayerStats {
  player: string;
  mat: number;
  runs?: number;
  avg?: number;
  sr: number;
  fours?: number;
  sixes?: number;
  wickets?: number;
  econ?: number;
  start_year: number;
  end_year: number;
  career_length: number;
}

export async function getSimilarPlayers(playerType: 'batsman' | 'bowler', currentPlayer: PlayerStats, count: number = 5): Promise<PlayerStats[]> {
  try {
    // Load the appropriate CSV file based on player type
    const csvUrl = `/data/${playerType}_data.csv`;
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    // Parse CSV data
    const { data } = Papa.parse<Record<string, string>>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    // Convert string values to appropriate types
    const players: PlayerStats[] = data.map((row: Record<string, string>) => ({
      player: row.player,
      mat: parseInt(row.mat) || 0,
      runs: row.runs ? parseInt(row.runs) : undefined,
      avg: row.avg ? parseFloat(row.avg) : undefined,
      sr: parseFloat(row.sr) || 0,
      fours: row.fours ? parseInt(row.fours) : undefined,
      sixes: row.sixes ? parseInt(row.sixes) : undefined,
      wickets: row.wickets ? parseInt(row.wickets) : undefined,
      econ: row.econ ? parseFloat(row.econ) : undefined,
      start_year: parseInt(row.start_year) || 2000,
      end_year: parseInt(row.end_year) || new Date().getFullYear(),
      career_length: parseInt(row.career_length) || 0,
    }));

    // Filter out the current player
    const otherPlayers = players.filter(p => p.player !== currentPlayer.player);

    // Calculate similarity scores for each player
    const playersWithScores = otherPlayers.map(player => ({
      ...player,
      similarity: calculateSimilarityScore(currentPlayer, player, playerType)
    }));

    // Sort by similarity score and take top N
    return playersWithScores
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, count)
      .map(({ similarity, ...player }) => player);
      
  } catch (error) {
    console.error('Error fetching similar players:', error);
    return [];
  }
}

function calculateSimilarityScore(player1: PlayerStats, player2: PlayerStats, playerType: string): number {
  let score = 0;
  const weights = {
    mat: 0.2,
    sr: 0.3,
    career_length: 0.1
  };

  // Common metrics for both batsmen and bowlers
  score += (1 - Math.abs(player1.mat - player2.mat) / Math.max(player1.mat, player2.mat)) * weights.mat;
  score += (1 - Math.abs(player1.sr - player2.sr) / Math.max(player1.sr, player2.sr)) * weights.sr;
  score += (1 - Math.abs(player1.career_length - player2.career_length) / 20) * weights.career_length;

  if (playerType === 'batsman') {
    // Batsman-specific metrics
    if (player1.avg && player2.avg) {
      score += (1 - Math.abs(player1.avg - player2.avg) / 20) * 0.2;
    }
    if (player1.runs && player2.runs) {
      score += (1 - Math.abs(player1.runs - player2.runs) / 10000) * 0.2;
    }
  } else {
    // Bowler-specific metrics
    if (player1.wickets && player2.wickets) {
      score += (1 - Math.abs(player1.wickets - player2.wickets) / 300) * 0.2;
    }
    if (player1.econ && player2.econ) {
      score += (1 - Math.abs(player1.econ - player2.econ) / 5) * 0.2;
    }
  }

  return Math.min(1, Math.max(0, score)); // Ensure score is between 0 and 1
}
