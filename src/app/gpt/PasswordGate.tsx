"use client";

import { useState, FormEvent } from "react";

export function PasswordGate({ onSuccess }: { onSuccess: (password: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || checking) return;
    setChecking(true);
    setError(false);

    const res = await fetch("/api/gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [], password: value }),
    });

    setChecking(false);

    if (res.status === 401) {
      setError(true);
      return;
    }

    onSuccess(value);
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">AI 助手</h1>
        <p className="text-zinc-400 text-center text-sm">请输入访问密码</p>
        <input
          type="password"
          value={value}
          onChange={e => { setValue(e.target.value); setError(false); }}
          placeholder="密码"
          autoFocus
          disabled={checking}
          className={`w-full px-4 py-3 bg-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 disabled:opacity-50 ${
            error ? "ring-2 ring-red-500" : "focus:ring-rose-600"
          }`}
        />
        {error && <p className="text-red-400 text-sm text-center">密码错误，请重试</p>}
        <button
          type="submit"
          disabled={checking || !value.trim()}
          className="w-full py-3 bg-rose-600 hover:bg-rose-700 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {checking ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              验证中…
            </>
          ) : "进入"}
        </button>
      </form>
    </div>
  );
}
