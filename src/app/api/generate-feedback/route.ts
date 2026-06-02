import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { transcript, interviewId } = await req.json();

    if (!transcript || !interviewId) {
      return NextResponse.json({ error: 'Transcript and interviewId are required' }, { status: 400 });
    }

    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });
    if (!interview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
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
            content: `You are an expert technical interviewer. Analyze the following interview transcript for a ${interview.level} ${interview.role} role focusing on ${interview.techStack}. 
            Output a JSON object with: 
            "score" (0-100 integer), 
            "strengths" (array of strings), 
            "weaknesses" (array of strings), 
            "practiceExercises" (array of strings providing specific coding or conceptual exercises),
            "overallFeedback" (string).`
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

    // Save to database
    await prisma.feedback.create({
      data: {
        interviewId,
        score: analysis.score,
        strengths: JSON.stringify(analysis.strengths),
        weaknesses: JSON.stringify(analysis.weaknesses),
        practiceExercises: JSON.stringify(analysis.practiceExercises),
        overallFeedback: analysis.overallFeedback,
        transcript: transcript
      }
    });

    // Mark interview as completed
    await prisma.interview.update({
      where: { id: interviewId },
      data: { status: 'completed' }
    });
    
    return NextResponse.json({ success: true, analysis });
  } catch (error: any) {
    console.error('Error generating feedback:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
