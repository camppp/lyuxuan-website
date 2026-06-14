"use client";

import { useState, useRef, useCallback, useEffect, FormEvent } from "react";

export type Message = { role: "user" | "assistant"; content: string };

export function useChat(savedPassword: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const messagesRef = useRef<Message[]>([]);
  messagesRef.current = messages;

  useEffect(() => () => { readerRef.current?.cancel(); }, []);

  const clearChat = useCallback(() => setMessages([]), []);

  const handleSend = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || streaming) return;

    const history = [...messagesRef.current, { role: "user" as const, content: input }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, password: savedPassword }),
      });

      if (!res.ok || !res.body) throw new Error();

      const reader = res.body.getReader();
      readerRef.current = reader;
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        for (const line of decoder.decode(value, { stream: true }).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const token = JSON.parse(data).choices?.[0]?.delta?.content ?? "";
            if (token) {
              setMessages(m => {
                const copy = [...m];
                copy[copy.length - 1] = { ...copy[copy.length - 1], content: copy[copy.length - 1].content + token };
                return copy;
              });
            }
          } catch {}
        }
      }
    } catch {
      setMessages(m => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: "出错了，请重试。" };
        return copy;
      });
    } finally {
      readerRef.current = null;
      setStreaming(false);
    }
  }, [input, streaming, savedPassword]);

  return { messages, input, setInput, streaming, handleSend, clearChat };
}
