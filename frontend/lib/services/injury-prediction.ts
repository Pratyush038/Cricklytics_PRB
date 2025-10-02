import supabaseAdmin from "@/lib/supabase/admin";

export interface InjuryPredictionData {
  id: number;
  player_id: number | null;
  player_name: string | null;
  format: string | null;
  overs: number | null;
  start_date: string | null;
  injury: number | null;
  injury_prone: number | null;
  pacer: number | null;
  workload_score: number | null;
}

export interface ChartDataPoint {
  date: string;
  workload_score: number;
  injury: number;
  player_id?: number;
  player_name?: string;
  format?: string;
}

export interface PlayerOption {
  player_id: number;
  player_name: string;
}

export class InjuryPredictionService {
  static async fetchInjuryPredictionData(
    startDate?: string,
    endDate?: string,
    playerId?: number
  ): Promise<ChartDataPoint[]> {
    try {
      let query = supabaseAdmin()
        .from("injury_prediction")
        .select("*");

      // Apply date filter if specified
      if (startDate && endDate) {
        query = query
          .gte("start_date", startDate)
          .lte("start_date", endDate);
      }

      // Apply player filter if specified
      if (playerId) {
        query = query.eq("player_id", playerId);
      }

      const { data, error } = await query
        .not("workload_score", "is", null)
        .not("start_date", "is", null)
        .not("injury", "is", null)
        .order("start_date", { ascending: true });

      if (error) {
        console.error("Error fetching injury prediction data:", error);
        throw new Error(`Failed to fetch data: ${error.message}`);
      }

      // Transform the data to match chart format
      const chartData: ChartDataPoint[] = (data || [])
        .filter((item: InjuryPredictionData) =>
          item.workload_score !== null &&
          item.start_date !== null &&
          item.injury !== null
        )
        .map((item: InjuryPredictionData) => ({
          date: item.start_date!,
          workload_score: item.workload_score!,
          injury: item.injury!,
          player_id: item.player_id || undefined,
          player_name: item.player_name || undefined,
          format: item.format || undefined,
        }));

      return chartData;
    } catch (error) {
      console.error("Error in fetchInjuryPredictionData:", error);
      throw error;
    }
  }

  static async fetchAvailablePlayers(): Promise<PlayerOption[]> {
    try {
      // Try using RPC for better performance with large datasets
      try {
        const { data: rpcData, error: rpcError } = await supabaseAdmin()
          .rpc('get_unique_players');

        if (!rpcError && rpcData) {
          console.log(`Found ${rpcData.length} unique players via RPC`);
          return rpcData.sort((a: PlayerOption, b: PlayerOption) => a.player_name.localeCompare(b.player_name));
        }
      } catch (rpcErr) {
        console.log('RPC not available, falling back to client-side deduplication');
      }

      // Fallback: Use client-side deduplication with larger limit
      const { data, error } = await supabaseAdmin()
        .from("injury_prediction")
        .select("player_id, player_name")
        .not("player_id", "is", null)
        .not("player_name", "is", null)
        .limit(5000); // Increase limit for larger datasets

      if (error) {
        console.error("Error fetching players:", error);
        throw new Error(`Failed to fetch players: ${error.message}`);
      }

      console.log(`Raw player data length: ${data?.length || 0}`);

      // Get unique player combinations more efficiently using Map
      const uniquePlayersMap = new Map<number, PlayerOption>();

      (data || []).forEach((item: any) => {
        if (item.player_id !== null && item.player_name !== null && item.player_name.trim() !== '') {
          // Use player_id as key since it should be unique
          if (!uniquePlayersMap.has(item.player_id)) {
            uniquePlayersMap.set(item.player_id, {
              player_id: item.player_id,
              player_name: item.player_name.trim(),
            });
          }
        }
      });

      const uniquePlayers = Array.from(uniquePlayersMap.values());
      console.log(`Found ${uniquePlayers.length} unique players from ${data?.length || 0} total records`);

      return uniquePlayers.sort((a, b) => a.player_name.localeCompare(b.player_name));
    } catch (error) {
      console.error("Error in fetchAvailablePlayers:", error);
      throw error;
    }
  }
}
