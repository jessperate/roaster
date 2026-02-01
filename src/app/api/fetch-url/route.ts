import { NextRequest, NextResponse } from 'next/server';
import { scrapeUrl } from '@/lib/scraper';
import { FetchUrlResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { content: null, title: null, error: 'URL is required' } as FetchUrlResponse,
        { status: 400 }
      );
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      return NextResponse.json(
        { content: null, title: null, error: 'Invalid URL format. Please include http:// or https://' } as FetchUrlResponse,
        { status: 400 }
      );
    }

    const { content, title } = await scrapeUrl(url);

    if (!content || content.length < 50) {
      return NextResponse.json(
        { content: null, title: null, error: 'Could not extract meaningful content from this URL. Try pasting the text directly.' } as FetchUrlResponse,
        { status: 400 }
      );
    }

    return NextResponse.json({
      content,
      title,
      error: null,
    } as FetchUrlResponse);
  } catch (error) {
    console.error('URL fetch error:', error);

    let errorMessage = 'Failed to fetch URL content';
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Could not access this URL. It might be blocked or require authentication.';
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { content: null, title: null, error: errorMessage } as FetchUrlResponse,
      { status: 500 }
    );
  }
}
