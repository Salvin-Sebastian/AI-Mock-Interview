import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { transcript, role } = await req.json();

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
    }

    // Call OpenAI API for analysis
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `You are an expert technical interviewer. Analyze the following interview transcript for a ${role || 'candidate'} role. 
            Output a JSON object with: 
            "score" (0-100), 
            "strengths" (array of strings), 
            "weaknesses" (array of strings), 
            "overall_feedback" (string).`
          },
          {
            role: "user",
            content: `Here is the interview transcript:\n\n${transcript}`
          }
        ]
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }

    const analysis = JSON.parse(data.choices[0].message.content);

    // Normally we would save this to the Supabase database here.
    // Since the database connection is currently unreachable, we just return the result.
    
    return NextResponse.json({ success: true, analysis });
  } catch (error: any) {
    console.error('Error generating feedback:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
