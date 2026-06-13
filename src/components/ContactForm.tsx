"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("sending");

    try {
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(
        `From: ${name} <${email}>\n\n${message}`
      );
      const mailto = `mailto:lyuxuan0422@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailto;

      setTimeout(() => {
        setStatus("success");
      }, 400);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-zinc-800 border border-rose-500/40 rounded-lg p-8 text-center flex flex-col items-center justify-center min-h-[420px]">
        <div className="w-14 h-14 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-400 text-2xl mb-4">
          ✓
        </div>
        <h3 className="text-xl font-bold mb-2">Email client opened</h3>
        <p className="text-zinc-300 mb-6 max-w-sm">
          Your default email client should have opened with your message ready to send.
          If nothing happened, you can email me directly.
        </p>
        <div className="flex gap-3">
          <a
            href="mailto:lyuxuan0422@gmail.com"
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors text-sm font-semibold"
          >
            Email directly
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setName("");
              setEmail("");
              setMessage("");
            }}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors text-sm"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  const isSending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="contact-name" className="block text-zinc-300 mb-2 text-sm">
          Name<span className="text-rose-400">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSending}
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-600 disabled:opacity-60"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-zinc-300 mb-2 text-sm">
          Email<span className="text-rose-400">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSending}
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-600 disabled:opacity-60"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-zinc-300 mb-2 text-sm">
          Message<span className="text-rose-400">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSending}
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-600 h-32 resize-none disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={isSending}
        className="w-full px-8 py-3 bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSending ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            <span>Opening email…</span>
          </>
        ) : (
          <span>Send Message</span>
        )}
      </button>
      {status === "error" && (
        <p className="text-rose-400 text-sm text-center">
          Something went wrong. Please email me directly at{" "}
          <a href="mailto:lyuxuan0422@gmail.com" className="underline">
            lyuxuan0422@gmail.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
