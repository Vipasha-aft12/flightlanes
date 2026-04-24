import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an expert SEO travel writer for Fareoworld, a premium flight-booking brand.
You write engaging, informative, factually accurate travel content optimised for Google search.

CRITICAL OUTPUT RULES:
- Respond with ONLY a single valid JSON object — no markdown, no code fences, no preamble.
- All HTML in the "content" field must be clean, semantic HTML5 using only these tags:
  h2, h3, p, ul, ol, li, strong, em, a, blockquote
- Do NOT include h1, html, body, head, style, or script tags.
- Use sentence case for headings.
- Naturally weave the primary keyword into the first paragraph, one h2, and the meta description.`;

function buildUserPrompt(title, category) {
  return `Write a comprehensive, SEO-optimised blog post for Fareoworld.

Title: "${title}"
Category: ${category}

Return a single JSON object with this EXACT shape:

{
  "title": "${title}",
  "category": "${category}",
  "categoryIcon": "<one emoji matching the category, e.g. 🌍 for destinations>",
  "metaTitle": "<55-65 chars, includes primary keyword, ends with '| Fareoworld'>",
  "metaDescription": "<150-160 chars, compelling, includes primary keyword>",
  "excerpt": "<2 sentences, ~180 chars, hook the reader>",
  "keywords": ["<primary keyword>", "<4-6 supporting keywords>"],
  "imageSearchQuery": "<2-4 words for Unsplash, e.g. 'paris eiffel tower sunset'>",
  "imageAlt": "<descriptive alt text for the hero image>",
  "content": "<HTML, 1400-1600 words, structured as: intro paragraph, then 5-7 h2 sections each with 2-3 paragraphs, use h3 sub-sections and ul/ol lists where natural. End with a conclusion paragraph.>",
  "faqs": [
    { "question": "<question>", "answer": "<2-3 sentence answer>" },
    ... 5 FAQs total
  ],
  "author": "Fareoworld Editorial",
  "authorInitials": "FL"
}

Style: warm, confident, second person. Concrete details. No filler.`;
}

export async function generateBlog(title, category) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(title, category) }],
  });

  const text = response.content[0].text.trim();
  const cleaned = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Claude returned invalid JSON. Raw:', text.substring(0, 500));
    throw new Error('Claude returned invalid JSON — check server logs');
  }
}
