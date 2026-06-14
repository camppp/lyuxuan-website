export const runtime = "edge";

export async function POST(request: Request) {
  const { messages, password } = await request.json();

  if (!password || password !== process.env.GPT_PASSWORD) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!messages?.length) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: "gpt-4o-mini", messages, stream: true }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "OpenAI error" }), { status: 500 });
  }

  return new Response(res.body, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
