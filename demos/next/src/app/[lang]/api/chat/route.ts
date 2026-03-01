import { createDeepSeek } from "@ai-sdk/deepseek";
import { NextRequest } from "next/server";
import { streamText, convertToModelMessages } from "ai";

const API_KEY = "sk-53a579401e804ea8bf09fee00df3b7d7";

const deepSeek = createDeepSeek({ apiKey: API_KEY });

export async function POST(request: NextRequest) {
  const { messages } = await request.json();
  const result = streamText({
    model: deepSeek("deepseek-chat"),
    messages: convertToModelMessages(messages),
    // messages: [
    //   {
    //     role: "user",
    //     content: "Hello!",
    //   },
    //   {
    //     role: "assistant",
    //     content: "Hello! I'm a frontend engineer",
    //   },
    // ],
    system: "Hello! You're a frontend engineer",
  });
  return result.toUIMessageStreamResponse();
}
