/**
 * ChatBase API client for Frontend-cms.
 * Calls Neuriy ChatBase `/api/chat` with an IDHook Firebase ID token.
 */

const CHATBASE_URL = (
  process.env.NEXT_PUBLIC_CHATBASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://127.0.0.1:3000"
    : "https://chat.neuriy.com")
).replace(/\/$/, "");

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatbaseReply = {
  id: string;
  reply: string;
  model?: string;
  provider?: string;
  engine?: {
    product?: string;
    modelRuntime?: string;
    auth?: string;
  };
  traceId?: string;
  error?: string;
  code?: string;
};

export async function chatWithNeuriy(
  messages: ChatMessage[],
  idToken: string,
  options?: { model?: string; temperature?: number }
): Promise<ChatbaseReply> {
  if (!idToken) {
    const err = new Error("IDHook login required");
    (err as Error & { code?: string }).code = "auth_required";
    throw err;
  }

  const res = await fetch(`${CHATBASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      messages,
      model: options?.model || "pro",
      temperature: options?.temperature ?? 0.7,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as ChatbaseReply;
  if (!res.ok) {
    const err = new Error(data.error || `ChatBase error ${res.status}`);
    (err as Error & { code?: string }).code = data.code || `http_${res.status}`;
    throw err;
  }
  return data;
}

export function getChatbaseUrl() {
  return CHATBASE_URL;
}
