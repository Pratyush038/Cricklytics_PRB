-- Create a function to get unique players efficiently
-- Run this in your Supabase SQL editor

CREATE OR REPLACE FUNCTION get_unique_players()
RETURNS TABLE(player_id bigint, player_name text)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT DISTINCT player_id, player_name
  FROM injury_prediction
  WHERE player_id IS NOT NULL
    AND player_name IS NOT NULL
    AND player_name != ''
  ORDER BY player_name;
$$;

-- Grant execute permission to authenticated users if needed
-- GRANT EXECUTE ON FUNCTION get_unique_players() TO authenticated;
