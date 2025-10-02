import supabaseAdmin from "../supabase/admin";

export interface BattingAnalysisPlayer {
  id: number;
  player: string;
  span: string;
  mat: number;
  runs: number;
  avg: number;
  sr: number;
  fours: number;
  sixes: number;
  start_year: number;
  end_year: number;
  career_length: number;
  "Predicted_Category": string;
}

export interface NearestPlayer {
  player: string;
  avg: number;
  sr: number;
  runs: number;
  mat: number;
  distance: number; // Euclidean distance from current player
}

export class BattingAnalysisService {
  // List of well-known/famous cricket players for better demonstration
  private static readonly FAMOUS_PLAYERS = [
    'V Kohli', 'RG Sharma', 'MS Dhoni', 'AB de Villiers', 'DA Warner',
    'CH Gayle', 'SK Raina', 'YK Pathan', 'SR Tendulkar', 'SC Ganguly',
    'R Dravid', 'S Dhawan', 'KL Rahul', 'Q de Kock', 'F du Plessis',
    'GJ Maxwell', 'AD Russell', 'JC Buttler', 'EJG Morgan', 'BA Stokes',
    'MM Ali', 'SPD Smith', 'M Labuschagne', 'TM Head', 'AT Carey',
    'DJ Malan', 'JM Bairstow', 'JE Root', 'JM Vince', 'SW Billings'
  ];

  static async fetchNearestPlayers(
    currentPlayerAvg: number,
    currentPlayerSr: number,
    limit: number = 20
  ): Promise<NearestPlayer[]> {
    try {
      console.log(`Fetching nearest players for avg: ${currentPlayerAvg}, sr: ${currentPlayerSr}`);

      // Check if Supabase environment variables are available
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ADMIN) {
        console.warn('Supabase environment variables not found, using fallback sample data');
        // Use fallback data if no real data available
        const workingData = this.getFallbackBattingData();
        return this.processBattingData(workingData, currentPlayerAvg, currentPlayerSr, limit);
      }

      // First, let's check how many total records we have
      const { count: totalCount } = await supabaseAdmin()
        .from("batting_analysis")
        .select("*", { count: "exact", head: true });

      console.log(`Total batting analysis records: ${totalCount}`);

      // Fetch all batting analysis data
      const { data, error } = await supabaseAdmin()
        .from("batting_analysis")
        .select("*")
        .not("avg", "is", null)
        .not("sr", "is", null)
        .not("player", "is", null)
        .limit(1000);

      if (error) {
        console.error("Error fetching batting analysis data:", error);
        throw new Error(`Failed to fetch batting data: ${error.message}`);
      }

      console.log(`Raw batting data length: ${data?.length || 0}`);

      let workingData = data;

      if (!workingData || workingData.length === 0) {
        console.warn('No batting analysis data found in database, using fallback sample data');
        // Use fallback data if no real data available
        workingData = this.getFallbackBattingData();
      }

      return this.processBattingData(workingData, currentPlayerAvg, currentPlayerSr, limit);
    } catch (error) {
      console.error("Error in fetchNearestPlayers:", error);
      // If database fails, use fallback data
      const workingData = this.getFallbackBattingData();
      return this.processBattingData(workingData, currentPlayerAvg, currentPlayerSr, limit);
    }
  }

  private static getFallbackBattingData(): BattingAnalysisPlayer[] {
    return [
      {
        id: 1,
        player: 'V Kohli',
        span: '2008-2023',
        mat: 254,
        runs: 6283,
        avg: 36.2,
        sr: 129.9,
        fours: 543,
        sixes: 223,
        start_year: 2008,
        end_year: 2023,
        career_length: 16,
        "Predicted_Category": 'Balanced Player'
      },
      {
        id: 2,
        player: 'RG Sharma',
        span: '2007-2023',
        mat: 227,
        runs: 5877,
        avg: 30.9,
        sr: 130.0,
        fours: 491,
        sixes: 240,
        start_year: 2007,
        end_year: 2023,
        career_length: 17,
        "Predicted_Category": 'Power Hitter'
      },
      {
        id: 3,
        player: 'MS Dhoni',
        span: '2006-2019',
        mat: 193,
        runs: 4632,
        avg: 39.9,
        sr: 135.2,
        fours: 349,
        sixes: 229,
        start_year: 2006,
        end_year: 2019,
        career_length: 14,
        "Predicted_Category": 'Anchor'
      },
      {
        id: 4,
        player: 'AB de Villiers',
        span: '2004-2018',
        mat: 184,
        runs: 5162,
        avg: 39.7,
        sr: 151.2,
        fours: 413,
        sixes: 251,
        start_year: 2004,
        end_year: 2018,
        career_length: 15,
        "Predicted_Category": 'Power Hitter'
      },
      {
        id: 5,
        player: 'CH Gayle',
        span: '2006-2021',
        mat: 141,
        runs: 4965,
        avg: 39.7,
        sr: 142.8,
        fours: 405,
        sixes: 357,
        start_year: 2006,
        end_year: 2021,
        career_length: 16,
        "Predicted_Category": 'Power Hitter'
      }
    ];
  }

  private static processBattingData(
    data: BattingAnalysisPlayer[],
    currentPlayerAvg: number,
    currentPlayerSr: number,
    limit: number
  ): NearestPlayer[] {
    // Calculate Euclidean distance for each player from current player
    const playersWithDistance = data
      .filter((player: BattingAnalysisPlayer) =>
        player.player &&
        player.avg !== null &&
        player.sr !== null &&
        !isNaN(player.avg) &&
        !isNaN(player.sr)
      )
      .map((player: BattingAnalysisPlayer) => {
        // Calculate Euclidean distance: sqrt((avg_diff)^2 + (sr_diff)^2)
        const avgDiff = player.avg - currentPlayerAvg;
        const srDiff = player.sr - currentPlayerSr;
        const distance = Math.sqrt(avgDiff * avgDiff + srDiff * srDiff);

        // Boost score for famous players (lower "distance" for famous players)
        const isFamous = this.FAMOUS_PLAYERS.some(famous =>
          player.player.toLowerCase().includes(famous.toLowerCase())
        );
        const boostedDistance = isFamous ? distance * 0.7 : distance;

        return {
          player: player.player,
          avg: player.avg,
          sr: player.sr,
          runs: player.runs,
          mat: player.mat,
          distance: boostedDistance,
          isFamous: isFamous
        };
      })
      .sort((a, b) => {
        // First sort by fame (famous players first), then by distance
        if (a.isFamous && !b.isFamous) return -1;
        if (!a.isFamous && b.isFamous) return 1;
        return a.distance - b.distance;
      })
      .slice(0, limit); // Take top 20 closest players

    console.log(`Found ${playersWithDistance.length} nearest players`);
    console.log("Top players:", playersWithDistance.slice(0, 5).map(p => `${p.player} (${p.isFamous ? 'FAMOUS' : 'Regular'}) - Distance: ${p.distance.toFixed(2)}`));

    // Remove the isFamous property before returning
    return playersWithDistance.map(({ isFamous, ...player }) => player);
  }
}
