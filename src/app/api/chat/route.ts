// This handler will be using the Edge Runtime to generate a chat completion via OpenAI, which will then be streamed back to Next.js.

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { messages } = await req.json();
 
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', 
    stream: true,
    messages,
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

/**
 In the above code, the openai.chat.completions.create method gets a response stream from the OpenAI API. 
 We then pass the response into the OpenAIStream provided by this library. 
 Then we use StreamingTextResponse to set the proper headers and response details in order to stream the response back to the client.
 */