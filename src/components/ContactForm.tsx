"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

function validateName(v: string) {
  return v.trim() ? "" : "Name is required.";
}
function validateEmail(v: string) {
  if (!v.trim()) return "Email is required.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address.";
}
function validateMessage(v: string) {
  return v.trim() ? "" : "Message is required.";
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<Status>("idle");

  const errors = {
    name: validateName(name),
    email: validateEmail(email),
    message: validateMessage(message),
  };
  const isValid = !errors.name && !errors.email && !errors.message;

  function touch(field: keyof typeof touched) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
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
        <h3 className="text-xl font-bold mb-2">Message sent!</h3>
        <p className="text-zinc-300 mb-6 max-w-sm">
          Thanks for reaching out. I&apos;ll get back to you soon.
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
              setTouched({ name: false, email: false, message: false });
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
          onBlur={() => touch("name")}
          disabled={isSending}
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-600 disabled:opacity-60"
        />
        {touched.name && errors.name && (
          <p className="mt-1 text-xs text-rose-400">{errors.name}</p>
        )}
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
          onBlur={() => touch("email")}
          disabled={isSending}
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-600 disabled:opacity-60"
        />
        {touched.email && errors.email && (
          <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
        )}
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
          onBlur={() => touch("message")}
          disabled={isSending}
          className="w-full px-4 py-2 bg-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-600 h-32 resize-none disabled:opacity-60"
        />
        {touched.message && errors.message && (
          <p className="mt-1 text-xs text-rose-400">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSending || !isValid}
        className="w-full px-8 py-3 bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSending ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            <span>Sending…</span>
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
