import { streamText, CoreMessage , smoothStream} from 'ai';
import { myProvider } from '@/app/chat/lib/ai/providers/providers';

export async function POST(req: Request) {
  try {

    const { messages } = await req.json();

const systemPrompt = `
You are an expert cricket analyst for the Cricklytics platform. Provide concise player insights in **1–2 short paragraphs**, formatted in **markdown** for readability.

Guidelines:
- Start with a **summary paragraph** highlighting form, strengths, weaknesses, and adaptability.
- Keep the language clear, data-driven, and user-friendly.
- Use **tables** to present key stats (e.g., batting average, strike rate, wickets, economy).
- Provide **1–2 actionable recommendations** (e.g., role suitability, focus areas).
- Avoid redundancy or overly detailed reports.

Example format:

### Player Analysis: [Player Name]

**Summary:**  
Concise 3–5 sentence insight on performance trends, strengths, weaknesses, and adaptability.

**Key Stats:**

| Metric           | Value |
|------------------|-------|
| Batting Avg      | 34.2  |
| Strike Rate      | 138.5 |
| Wickets/Match    | 1.4   |
| Economy Rate     | 7.9   |

**Recommendations:**  
- Improve middle-overs strike rotation.  
- Suitable as a powerplay hitter and part-time bowler.  

Keep the output compact, relevant, and easy to read.
`;

    const result = streamText({
      model: myProvider.languageModel('gemini-2.5-flash'),
      system: systemPrompt,
      messages,
      onError: (error) => {
        console.error('Error:', error);
      },
      experimental_transform: smoothStream({
        chunking: 'word',
      }),
    });

    // Stream the response back to the client so `useChat` can consume it
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('[API] Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'An unexpected error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

