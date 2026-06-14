import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 助手",
  robots: { index: false, follow: false },
};

export default function LlmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
