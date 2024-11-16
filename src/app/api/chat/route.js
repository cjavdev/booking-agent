import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { tools } from "@/lib/tools";
import { booking } from "@/lib/prompts";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const result = await streamText({
      model: openai("gpt-4o"),
      system: booking.system,
      messages,
      tools,
      maxSteps: 5,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log("[POST] error: ", error);
    console.error(error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
