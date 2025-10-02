// Quick database check script
// Run this in your browser console when on the injury prediction page

// Check what's in your Supabase injury_prediction table
const checkSupabaseData = async () => {
  try {
    const { createClient } = await import('@supabase/supabase-js');

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ADMIN
    );

    // Get total count
    const { count: totalCount } = await supabase
      .from('injury_prediction')
      .select('*', { count: 'exact', head: true });

    console.log(`Total records: ${totalCount}`);

    // Get sample of player data
    const { data: sampleData } = await supabase
      .from('injury_prediction')
      .select('player_id, player_name')
      .limit(10);

    console.log('Sample data:', sampleData);

    // Get unique players
    const { data: uniqueData } = await supabase
      .from('injury_prediction')
      .select('player_id, player_name')
      .not('player_id', 'is', null)
      .not('player_name', 'is', null);

    const uniquePlayers = Array.from(
      new Set(
        uniqueData?.map(item => `${item.player_id}-${item.player_name}`) || []
      )
    ).map(item => {
      const [id, name] = item.split('-');
      return { player_id: parseInt(id), player_name: name };
    });

    console.log(`Found ${uniquePlayers.length} unique players:`, uniquePlayers);

    return { totalCount, uniquePlayers, sampleData };
  } catch (error) {
    console.error('Error checking database:', error);
  }
};

// Run this in browser console
checkSupabaseData();
