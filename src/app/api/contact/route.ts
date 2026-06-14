import { Resend } from "resend";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const resend = new Resend(process.env.RESEND_API_KEY);
const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const now = new Date().toISOString().replace("T", "-").slice(0, 19).replace(/:/g, "-");

    await Promise.all([
      resend.emails.send({
        from: "你的网站 <bruh@lyuxuan.com>",
        to: "lyuxuan0422@gmail.com",
        replyTo: email,
        subject: `有人给你留言啦 - ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
      sql`INSERT INTO logs ("Name", "Email", "Message", "Time") VALUES (${name}, ${email}, ${message}, ${now})`,
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
