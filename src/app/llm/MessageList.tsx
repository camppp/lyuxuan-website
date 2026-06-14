"use client";

import { memo, useEffect, useRef } from "react";
import type { Message } from "./useChat";

const MessageBubble = memo(function MessageBubble({
  msg,
  isLast,
  streaming,
}: {
  msg: Message;
  isLast: boolean;
  streaming: boolean;
}) {
  return (
    <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
          msg.role === "user"
            ? "bg-rose-600 text-white rounded-br-sm"
            : "bg-zinc-800 text-zinc-100 rounded-bl-sm"
        }`}
      >
        {msg.content || (
          <span className="inline-flex gap-1 items-center h-4">
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
          </span>
        )}
        {streaming && isLast && msg.role === "assistant" && msg.content && (
          <span className="inline-block w-0.5 h-4 bg-zinc-400 ml-0.5 animate-pulse align-middle" />
        )}
      </div>
    </div>
  );
});

export function MessageList({ messages, streaming }: { messages: Message[]; streaming: boolean }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl w-full mx-auto">
      {messages.length === 0 && (
        <p className="text-center text-zinc-500 text-sm mt-16">啥也没有啊...</p>
      )}
      {messages.map((msg, i) => (
        <MessageBubble
          key={i}
          msg={msg}
          isLast={i === messages.length - 1}
          streaming={streaming}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
