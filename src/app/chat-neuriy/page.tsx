'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Bot, LogIn, Send, User } from 'lucide-react';
import {
  NeuriyAuthGuard,
  redirectToNeuriyLogin,
  useNeuriyAuth,
} from '@neuriy/auth';
import { getAuth } from 'firebase/auth';
import { chatWithNeuriy, type ChatMessage } from '@/lib/chatbase';

type UiMessage = { id: string; role: 'user' | 'assistant'; content: string };

function LoginRequired() {
  const handleLogin = () => {
    const authUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://id.neuriy.com'
        : process.env.NEXT_PUBLIC_NID_URL || 'https://id.neuriy.com';
    redirectToNeuriyLogin(authUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] m-4 border rounded-xl bg-white text-center px-6">
      <Bot className="w-12 h-12 mb-4 text-neutral-400" />
      <h1 className="text-xl font-semibold mb-2">Sign in to use Neuriy AI</h1>
      <p className="text-sm text-neutral-500 max-w-md mb-6">
        Chat uses ChatBase + ElloFive and requires Neuriy IDHook (nID) authentication.
        Anonymous visitors cannot call the AI API.
      </p>
      <button
        type="button"
        onClick={handleLogin}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-semibold"
      >
        <LogIn className="w-4 h-4" />
        Sign in with IDHook
      </button>
    </div>
  );
}

function ChatNeuriyAuthed() {
  const { user } = useNeuriyAuth();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtitle = useMemo(
    () => (user?.email ? `Signed in as ${user.email}` : 'IDHook session active'),
    [user?.email]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    setError(null);
    setBusy(true);
    setInput('');

    const userMsg: UiMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
    };
    const next = [...messages, userMsg];
    setMessages(next);

    try {
      const auth = getAuth();
      const current = auth.currentUser;
      if (!current) {
        throw Object.assign(new Error('IDHook login required'), {
          code: 'auth_required',
        });
      }
      const idToken = await current.getIdToken(false);
      const payload: ChatMessage[] = next.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const data = await chatWithNeuriy(payload, idToken, { model: 'pro' });
      setMessages((prev) => [
        ...prev,
        {
          id: data.id || `a-${Date.now()}`,
          role: 'assistant',
          content: data.reply || '',
        },
      ]);
    } catch (err) {
      const code = (err as { code?: string })?.code;
      const msg =
        code === 'auth_required' || code === 'session_expired'
          ? 'Please sign in with IDHook to use Neuriy AI.'
          : err instanceof Error
            ? err.message
            : 'ChatBase request failed';
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white text-gray-900 border rounded-xl overflow-hidden shadow-sm m-4">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-xl font-semibold">Neuriy AI</h1>
          <p className="text-xs text-neutral-500">
            Powered by ElloFive · via ChatBase · {subtitle}
          </p>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">
          Ello5
        </span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Ask Neuriy anything — replies come from ElloFive.</p>
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start max-w-[80%] ${
                  m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    m.role === 'user' ? 'bg-neutral-900 ml-3' : 'bg-emerald-600 mr-3'
                  }`}
                >
                  {m.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-2xl whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-neutral-900 text-white rounded-tr-none'
                      : 'bg-gray-100 border border-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            </div>
          ))
        )}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {error}
          </div>
        )}
      </main>

      <footer className="p-4 bg-white border-t border-gray-200 shrink-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-2">
          <input
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white"
            value={input}
            placeholder="Message Neuriy…"
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="bg-neutral-900 text-white p-3 rounded-lg hover:bg-neutral-800 disabled:opacity-50 transition-colors flex items-center justify-center w-12 h-12"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default function ChatNeuriy() {
  return (
    <NeuriyAuthGuard unauthenticated={<LoginRequired />}>
      <ChatNeuriyAuthed />
    </NeuriyAuthGuard>
  );
}
