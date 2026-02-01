import * as cheerio from 'cheerio';

export async function scrapeUrl(url: string): Promise<{ content: string; title: string }> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; ContentRoaster/1.0)',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove unwanted elements
  $('script, style, nav, header, footer, aside, .sidebar, .comments, .advertisement, .ad, .social-share, .related-posts').remove();

  // Try to find the main content
  let content = '';

  // Try common article selectors
  const selectors = [
    'article',
    '[role="main"]',
    'main',
    '.post-content',
    '.article-content',
    '.entry-content',
    '.content',
    '.post-body',
    '#content',
  ];

  for (const selector of selectors) {
    const element = $(selector);
    if (element.length > 0) {
      content = element.text();
      break;
    }
  }

  // Fallback to body if no article found
  if (!content) {
    content = $('body').text();
  }

  // Clean up the content
  content = content
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();

  // Get title
  const title = $('title').text().trim() ||
                $('h1').first().text().trim() ||
                $('meta[property="og:title"]').attr('content') ||
                'Untitled';

  return { content, title };
}
