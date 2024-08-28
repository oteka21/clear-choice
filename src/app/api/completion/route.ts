/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { prompt as systemPrompt } from "~/constants";



// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt }: {
    prompt: string;
  } = await req.json();

  const acceptLanguage = req.headers.get('Accept-Language');
  const userLanguage = acceptLanguage ? acceptLanguage.split(',')[0] : 'en';

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    prompt: `${prompt} 
    answer in ${userLanguage} language`,
  });

  return result.toDataStreamResponse();
}
