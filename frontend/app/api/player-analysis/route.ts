import { NextResponse } from 'next/server';

interface BatsmanData {
  player: string;
  mat: number;
  runs: number;
  sr: number;
  avg: number;
  fours: number;
  sixes: number;
  start_year: number;
  end_year: number;
}

interface BowlerData {
  player: string;
  mat: number;
  wickets: number;
  econ: number;
  sr: number;
  start_year: number;
  end_year: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { playerType, ...playerData } = body;

    const response = await fetch(`http://localhost:8000/predict/${playerType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player_data: playerData
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from backend');
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in player-analysis API route:', error);
    return NextResponse.json(
      { error: 'Failed to process player analysis' },
      { status: 500 }
    );
  }
}