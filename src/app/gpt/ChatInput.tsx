"use client";

import { FormEvent, useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled: boolean;
}

export function ChatInput({ value, onChange, onSubmit, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  return (
    <div className="border-t border-zinc-800 p-4">
      <form onSubmit={onSubmit} className="flex gap-2 max-w-3xl mx-auto">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="发消息…"
          disabled={disabled}
          className="flex-1 px-4 py-3 bg-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-600 disabled:opacity-50 text-sm"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="px-5 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          发送
        </button>
      </form>
    </div>
  );
}
