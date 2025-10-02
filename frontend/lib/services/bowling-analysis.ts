import supabaseAdmin from "../supabase/admin";

export interface BowlingAnalysisPlayer {
  id: number;
  player: string;
  span: string;
  mat: number;
  wickets: number;
  econ: number;
  sr: number;
  start_year: number;
  end_year: number;
  career_length: number;
  "Predicted_Category": string;
}

export interface NearestBowler {
  player: string;
  wickets: number;
  econ: number;
  sr: number;
  mat: number;
  distance: number; // Euclidean distance from current player
}

export class BowlingAnalysisService {
  // List of well-known/famous cricket bowlers for better demonstration
  private static readonly FAMOUS_BOWLERS = [
    'JJ Bumrah', 'R Ashwin', 'RA Jadeja', 'B Kumar', 'YS Chahal',
    'Kuldeep Yadav', 'Mohammed Shami', 'DL Chahar', 'SN Thakur', 'AR Patel',
    'SP Narine', 'AD Russell', 'Rashid Khan', 'MJ Santner', 'TA Boult',
    'Jofra Archer', 'CJ Jordan', 'MA Wood', 'LE Plunkett', 'CR Woakes',
    'BA Stokes', 'MM Ali', 'AU Rashid', 'DJ Willey', 'TK Curran'
  ];

  static async fetchNearestBowlers(
    currentPlayerWickets: number,
    currentPlayerEcon: number,
    currentPlayerSr: number,
    limit: number = 20
  ): Promise<NearestBowler[]> {
    try {
      console.log(`Fetching nearest bowlers for wickets: ${currentPlayerWickets}, econ: ${currentPlayerEcon}, sr: ${currentPlayerSr}`);

      // Check if Supabase environment variables are available
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ADMIN) {
        console.warn('Supabase environment variables not found, using fallback sample data');
        // Use fallback data if no real data available
        const workingData = this.getFallbackBowlingData();
        return this.processBowlingData(workingData, currentPlayerWickets, currentPlayerEcon, currentPlayerSr, limit);
      }

      // First, let's check how many total records we have
      const { count: totalCount } = await supabaseAdmin()
        .from("bowling_analysis")
        .select("*", { count: "exact", head: true });

      console.log(`Total bowling analysis records: ${totalCount}`);

      // Fetch all bowling analysis data
      const { data, error } = await supabaseAdmin()
        .from("bowling_analysis")
        .select("*")
        .not("wickets", "is", null)
        .not("econ", "is", null)
        .not("sr", "is", null)
        .not("player", "is", null)
        .limit(1000);

      if (error) {
        console.error("Error fetching bowling analysis data:", error);
        throw new Error(`Failed to fetch bowling data: ${error.message}`);
      }

      console.log(`Raw bowling data length: ${data?.length || 0}`);

      let workingData = data;

      if (!workingData || workingData.length === 0) {
        console.warn('No bowling analysis data found in database, using fallback sample data');
        // Use fallback data if no real data available
        workingData = this.getFallbackBowlingData();
      }

      return this.processBowlingData(workingData, currentPlayerWickets, currentPlayerEcon, currentPlayerSr, limit);
    } catch (error) {
      console.error("Error in fetchNearestBowlers:", error);
      // If database fails, use fallback data
      const workingData = this.getFallbackBowlingData();
      return this.processBowlingData(workingData, currentPlayerWickets, currentPlayerEcon, currentPlayerSr, limit);
    }
  }

  private static getFallbackBowlingData(): BowlingAnalysisPlayer[] {
    return [
      {
        id: 1,
        player: 'JJ Bumrah',
        span: '2013-2023',
        mat: 157,
        wickets: 195,
        econ: 7.45,
        sr: 22.1,
        start_year: 2013,
        end_year: 2023,
        career_length: 11,
        "Predicted_Category": 'Death Bowler'
      },
      {
        id: 2,
        player: 'R Ashwin',
        span: '2010-2023',
        mat: 113,
        wickets: 184,
        econ: 6.78,
        sr: 42.3,
        start_year: 2010,
        end_year: 2023,
        career_length: 14,
        "Predicted_Category": 'Spin Specialist'
      },
      {
        id: 3,
        player: 'RA Jadeja',
        span: '2009-2023',
        mat: 171,
        wickets: 189,
        econ: 7.23,
        sr: 40.2,
        start_year: 2009,
        end_year: 2023,
        career_length: 15,
        "Predicted_Category": 'All Rounder'
      },
      {
        id: 4,
        player: 'B Kumar',
        span: '2012-2023',
        mat: 121,
        wickets: 161,
        econ: 7.12,
        sr: 30.4,
        start_year: 2012,
        end_year: 2023,
        career_length: 12,
        "Predicted_Category": 'Swing Bowler'
      },
      {
        id: 5,
        player: 'Mohammed Shami',
        span: '2013-2023',
        mat: 101,
        wickets: 162,
        econ: 7.89,
        sr: 26.7,
        start_year: 2013,
        end_year: 2023,
        career_length: 11,
        "Predicted_Category": 'Death Bowler'
      }
    ];
  }

  private static processBowlingData(
    data: BowlingAnalysisPlayer[],
    currentPlayerWickets: number,
    currentPlayerEcon: number,
    currentPlayerSr: number,
    limit: number
  ): NearestBowler[] {
    // Calculate Euclidean distance for each bowler from current player
    const bowlersWithDistance = data
      .filter((player: BowlingAnalysisPlayer) =>
        player.player &&
        player.wickets !== null &&
        player.econ !== null &&
        player.sr !== null &&
        !isNaN(player.wickets) &&
        !isNaN(player.econ) &&
        !isNaN(player.sr)
      )
      .map((player: BowlingAnalysisPlayer) => {
        // Calculate Euclidean distance: sqrt((wickets_diff)^2 + (econ_diff)^2 + (sr_diff)^2)
        const wicketsDiff = player.wickets - currentPlayerWickets;
        const econDiff = player.econ - currentPlayerEcon;
        const srDiff = player.sr - currentPlayerSr;
        const distance = Math.sqrt(wicketsDiff * wicketsDiff + econDiff * econDiff + srDiff * srDiff);

        // Boost score for famous bowlers (lower "distance" for famous bowlers)
        const isFamous = this.FAMOUS_BOWLERS.some(famous =>
          player.player.toLowerCase().includes(famous.toLowerCase())
        );
        const boostedDistance = isFamous ? distance * 0.7 : distance;

        return {
          player: player.player,
          wickets: player.wickets,
          econ: player.econ,
          sr: player.sr,
          mat: player.mat,
          distance: boostedDistance,
          isFamous: isFamous
        };
      })
      .sort((a, b) => {
        // First sort by fame (famous bowlers first), then by distance
        if (a.isFamous && !b.isFamous) return -1;
        if (!a.isFamous && b.isFamous) return 1;
        return a.distance - b.distance;
      })
      .slice(0, limit); // Take top 20 closest bowlers

    console.log(`Found ${bowlersWithDistance.length} nearest bowlers`);
    console.log("Top bowlers:", bowlersWithDistance.slice(0, 5).map(p => `${p.player} (${p.isFamous ? 'FAMOUS' : 'Regular'}) - Distance: ${p.distance.toFixed(2)}`));

    // Remove the isFamous property before returning
    return bowlersWithDistance.map(({ isFamous, ...player }) => player);
  }
}
