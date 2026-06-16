export const PROVIDER_MODELS = {
  openai:    ["gpt-5.4-mini",              "gpt-5.5",           "gpt-5.5-pro"    ],
  anthropic: ["claude-haiku-4-5-20251001", "claude-sonnet-4-6", "claude-opus-4-8"],
  xai:       ["grok-build-0.1", "grok-4.20-0309-non-reasoning", "grok-4.3"],
} as const;

export type Provider = keyof typeof PROVIDER_MODELS;
