export const runtime = "edge";

const ALLOWED_MODELS = new Set([
  "gpt-5.4-mini", "gpt-5.5", "gpt-5.5-pro",
  "claude-haiku-4-5", "claude-sonnet-4-6", "claude-opus-4-8",
  "grok-build-0.1", "grok-4.20-0309-non-reasoning", "grok-4.3",
]);

// OpenAI and xAI share the same request/response format — only URL and key differ
async function callOpenAICompatible(
  messages: object[],
  model: string,
  baseUrl: string,
  apiKey: string,
): Promise<Response> {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, stream: true }),
  });
  if (!res.ok) {
    const body = await res.text();
    return new Response(body, { status: res.status, headers: { "Content-Type": "application/json" } });
  }
  return new Response(res.body, { headers: { "Content-Type": "text/event-stream" } });
}

async function callAnthropic(messages: object[], model: string): Promise<Response> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model, messages, max_tokens: 4096, stream: true }),
  });
  if (!res.ok) {
    const body = await res.text();
    return new Response(body, { status: res.status, headers: { "Content-Type": "application/json" } });
  }

  // Normalize Anthropic SSE → OpenAI-compatible SSE so the client needs no changes
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = res.body!.getReader();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));
            if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
              const normalized = `data: ${JSON.stringify({
                choices: [{ delta: { content: event.delta.text } }],
              })}\n\n`;
              controller.enqueue(encoder.encode(normalized));
            } else if (event.type === "message_stop") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            }
          } catch {}
        }
      }
      controller.close();
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/event-stream" } });
}

export async function POST(request: Request) {
  const { messages, password, model } = await request.json();

  if (!password || password !== process.env.GPT_PASSWORD) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!messages?.length) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const safeModel = ALLOWED_MODELS.has(model) ? model : "gpt-5.4-mini";

  if (safeModel.startsWith("claude-")) {
    return callAnthropic(messages, safeModel);
  }
  if (safeModel.startsWith("grok-")) {
    return callOpenAICompatible(messages, safeModel, "https://api.x.ai/v1", process.env.XAI_API_KEY ?? "");
  }
  return callOpenAICompatible(messages, safeModel, "https://api.openai.com/v1", process.env.OPENAI_API_KEY ?? "");
}
