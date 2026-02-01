import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { ROAST_SYSTEM_PROMPT, buildRoastPrompt } from '@/lib/prompts';
import { RoastRequest, RoastResult } from '@/lib/types';

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const body: RoastRequest = await request.json();

    if (!body.content || body.content.trim().length < 100) {
      return NextResponse.json(
        { error: 'Content must be at least 100 characters long. Give us something to work with!' },
        { status: 400 }
      );
    }

    // Truncate content if too long (keep it reasonable for API costs)
    const content = body.content.slice(0, 15000);

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: buildRoastPrompt(content, body.url),
        },
      ],
      system: ROAST_SYSTEM_PROMPT,
    });

    // Extract text from response
    const textContent = message.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parse the JSON response
    let roastResult: RoastResult;
    try {
      // Try to extract JSON from the response (in case there's any extra text)
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      roastResult = JSON.parse(jsonMatch[0]);
    } catch {
      console.error('Failed to parse Claude response:', textContent.text);
      throw new Error('Failed to parse roast response');
    }

    return NextResponse.json(roastResult);
  } catch (error) {
    console.error('Roast API error:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'API configuration error. Please check your Anthropic API key.' },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate roast. The content was too spicy even for us.' },
      { status: 500 }
    );
  }
}
