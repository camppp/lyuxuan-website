"use client";

import { memo, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import "highlight.js/styles/github-dark.css";
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
  const isUser = msg.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed break-words ${
          isUser
            ? "bg-rose-600 text-white rounded-br-sm whitespace-pre-wrap"
            : "bg-zinc-800 text-zinc-100 rounded-bl-sm"
        }`}
      >
        {!msg.content ? (
          <span className="inline-flex gap-1 items-center h-4">
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
          </span>
        ) : isUser ? (
          msg.content
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize, rehypeHighlight]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              h1: ({ children }) => <h1 className="text-lg font-bold mt-3 mb-1">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-bold mt-3 mb-1">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-bold mt-2 mb-1">{children}</h3>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-0.5">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-0.5">{children}</ol>,
              li: ({ children }) => <li className="text-zinc-200">{children}</li>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-rose-400 underline hover:text-rose-300">
                  {children}
                </a>
              ),
              code: ({ className, children, ...props }) => {
                const isBlock = className?.includes("language-");
                return isBlock ? (
                  <code className={`${className} rounded text-xs`} {...props}>{children}</code>
                ) : (
                  <code className="bg-zinc-700 text-rose-300 px-1 py-0.5 rounded text-xs" {...props}>{children}</code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-zinc-900 rounded-lg p-3 overflow-x-auto mb-2 text-xs">{children}</pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-zinc-500 pl-3 text-zinc-400 mb-2">{children}</blockquote>
              ),
              hr: () => <hr className="border-zinc-600 my-3" />,
              strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
            }}
          >
            {msg.content}
          </ReactMarkdown>
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
