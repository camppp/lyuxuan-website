"use client";

import { useState, useEffect, useCallback } from "react";
import { PasswordGate } from "./PasswordGate";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { useChat } from "./useChat";

const STORAGE_KEY = "gpt_pw";

function Chat({ savedPassword, onSignOut }: { savedPassword: string; onSignOut: () => void }) {
  const { messages, input, setInput, streaming, handleSend, clearChat } = useChat(savedPassword);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <div className="border-b border-zinc-800 px-4 py-3 flex items-center justify-between max-w-3xl w-full mx-auto">
        <h1 className="font-bold text-rose-400">AI 助手</h1>
        <div className="flex gap-4">
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

export default function GptPage() {
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
