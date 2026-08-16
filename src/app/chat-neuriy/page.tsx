'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import Link from 'next/link';
import { Bot, Send, User, Shield } from 'lucide-react';
import { NeuriyAuthGuard } from '@neuriy/auth';

function ChatNeuriyInner() {
  const [model, setModel] = useState('chatgpt');
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat-neuriy',
      body: {
        model,
      },
    }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const getMessageText = (m: { content?: unknown; parts?: Array<{ type: string; text?: string }> }) => {
    if (typeof m.content === 'string') return m.content;
    if (Array.isArray(m.parts)) {
      return m.parts
        .filter((p) => p.type === 'text')
        .map((p) => p.text)
        .join('');
    }
    return '';
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white text-gray-900 border rounded-xl overflow-hidden shadow-sm m-4">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shrink-0">
        <h1 className="text-xl font-semibold">Chat Neuriy</h1>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border border-gray-300 rounded-md p-2 bg-white text-sm"
        >
          <option value="chatgpt">ChatGPT</option>
          <option value="claude">Claude</option>
        </select>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation with Chat Neuriy.</p>
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-blue-600 ml-3' : 'bg-green-600 mr-3'}`}>
                  {m.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>
                <div className={`p-3 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 border border-gray-200 text-gray-800 rounded-tl-none'}`}>
                  {getMessageText(m)}
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      <footer className="p-4 bg-white border-t border-gray-200 shrink-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-2">
          <input
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center w-12 h-12"
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
    <NeuriyAuthGuard
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
        </div>
      }
      unauthenticated={
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <Shield size={48} className="text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in required</h1>
          <p className="text-gray-500 mb-6">Chat Neuriy uses your Neuriy nID session from the IDHook auth SDK.</p>
          <Link
            href="/auth/login?return=/chat-neuriy"
            className="bg-black text-white px-6 py-2 rounded-full font-bold"
          >
            Sign in
          </Link>
        </div>
      }
    >
      {() => <ChatNeuriyInner />}
    </NeuriyAuthGuard>
  );
}
