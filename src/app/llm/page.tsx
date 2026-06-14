"use client";

import { useState, useEffect, useCallback } from "react";
import { PasswordGate } from "./PasswordGate";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { useChat } from "./useChat";

const STORAGE_KEY = "llm_pw";

const TIERS = ["快速", "旗舰", "顶配"] as const;

const PROVIDER_MODELS = {
  openai:    ["gpt-5.4-mini",              "gpt-5.5",           "gpt-5.5-pro"    ],
  anthropic: ["claude-haiku-4-5-20251001", "claude-sonnet-4-6", "claude-opus-4-8"],
  xai:       ["grok-build-0.1", "grok-4.20-0309-non-reasoning", "grok-4.3"],
} as const;

const PROVIDER_LABELS: Record<string, string> = {
  openai: "ChatGPT",
  anthropic: "Claude",
  xai: "Grok",
};

type Provider = keyof typeof PROVIDER_MODELS;

function Chat({ savedPassword, onSignOut }: { savedPassword: string; onSignOut: () => void }) {
  const [provider, setProvider] = useState<Provider>("openai");
  const [tier, setTier] = useState(0);
  const model = PROVIDER_MODELS[provider][tier];

  const { messages, input, setInput, streaming, handleSend, clearChat } = useChat(savedPassword, model);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <div className="border-b border-zinc-800 px-4 py-3 flex items-center justify-between max-w-3xl w-full mx-auto gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="font-bold text-rose-400 shrink-0">66&apos;s AI 助手</h1>

          {/* Provider toggle */}
          <div className="flex rounded-lg overflow-hidden border border-zinc-700 text-xs shrink-0">
            {(Object.keys(PROVIDER_MODELS) as Provider[]).map(p => (
              <button
                key={p}
                onClick={() => setProvider(p)}
                disabled={streaming}
                className={`px-3 py-1 transition-colors disabled:opacity-50 ${
                  provider === p ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {PROVIDER_LABELS[p]}
              </button>
            ))}
          </div>

          {/* Tier toggle */}
          <div className="flex rounded-lg overflow-hidden border border-zinc-700 text-xs shrink-0">
            {TIERS.map((label, i) => (
              <button
                key={label}
                onClick={() => setTier(i)}
                disabled={streaming}
                className={`px-3 py-1 transition-colors disabled:opacity-50 ${
                  tier === i ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 shrink-0">
          {messages.length > 0 && (
            <button onClick={clearChat} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              清空对话
            </button>
          )}
          <button onClick={onSignOut} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            退出
          </button>
        </div>
      </div>
      <MessageList messages={messages} streaming={streaming} />
      <ChatInput value={input} onChange={setInput} onSubmit={handleSend} disabled={streaming} />
    </div>
  );
}

export default function LlmPage() {
  const [savedPassword, setSavedPassword] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    setSavedPassword(localStorage.getItem(STORAGE_KEY));
  }, []);

  const handleSuccess = useCallback((password: string) => {
    localStorage.setItem(STORAGE_KEY, password);
    setSavedPassword(password);
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedPassword(null);
  }, []);

  if (savedPassword === undefined) return null;
  if (!savedPassword) return <PasswordGate onSuccess={handleSuccess} />;
  return <Chat savedPassword={savedPassword} onSignOut={handleSignOut} />;
}
