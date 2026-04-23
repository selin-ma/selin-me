'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import avatarImg from '@/public/images/avatar.png';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const BOUNCE_DELAYS = [
  '[animation-delay:0ms]',
  '[animation-delay:200ms]',
  '[animation-delay:400ms]',
];

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! I'm Selin's assistant. Ask me anything about her work, skills, or projects.",
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function reset() {
    setMessages([INITIAL_MESSAGE]);
    setConversationId('');
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationId }),
      });
      const data = await res.json();
      setConversationId(data.conversationId || '');
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full',
          open ? 'bg-ink text-white' : 'bg-white text-ink shadow-[0_2px_12px_rgba(0,0,0,0.12)]',
          'transition-all duration-200 hover:scale-105 active:scale-95',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2',
        )}
      >
        <span
          className={cn(
            'material-symbols-outlined text-[20px] absolute transition-all duration-300 ease-in-out',
            open ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0',
          )}
          aria-hidden
        >
          chat_bubble
        </span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          className={cn(
            'absolute transition-all duration-300 ease-in-out',
            open ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90',
          )}
        >
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className={cn(
            'fixed bottom-[5rem] right-4 z-50',
            'flex h-[520px] w-[calc(100vw-2rem)] max-w-[360px] flex-col overflow-hidden',
            'rounded-2xl bg-[#F7F7F8]',
            'animate-fade-up',
            'shadow-[0_12px_48px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.06)]',
          )}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between bg-white px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <Image src={avatarImg} alt="Selin" fill className="object-cover object-right" />
              </div>
              <div>
                <p className="font-body text-[13px] font-semibold leading-tight text-ink">
                  Selin&apos;s Bot
                </p>
                <p className="flex items-center gap-1.5 font-body text-sm text-ink/40">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-olive" />
                  We&apos;re online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={reset}
                aria-label="Reset conversation"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink/25 transition-colors hover:bg-ink/[0.05] hover:text-ink/50"
              >
                <span className="material-symbols-outlined text-xs" aria-hidden>
                  restart_alt
                </span>
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink/25 transition-colors hover:bg-ink/[0.05] hover:text-ink/50"
              >
                <span className="material-symbols-outlined text-md" aria-hidden>
                  close
                </span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className={cn(
              'flex-1 space-y-3 overflow-y-auto px-4 py-4',
              '[&::-webkit-scrollbar]:w-[5px]',
              '[&::-webkit-scrollbar-track]:bg-transparent',
              '[&::-webkit-scrollbar-track]:[margin-block:60px]',
              '[&::-webkit-scrollbar-thumb]:rounded-full',
              '[&::-webkit-scrollbar-thumb]:[background-color:rgba(0,0,0,0.12)]',
              '[&::-webkit-scrollbar-thumb]:[min-height:30px]',
            )}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[85%] font-body text-[13.5px] leading-relaxed',
                    m.role === 'user'
                      ? 'rounded-2xl rounded-br-sm bg-ink px-4 py-3 text-white'
                      : 'rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-ink shadow-[0_1px_4px_rgba(0,0,0,0.06)]',
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                  {BOUNCE_DELAYS.map((delay, i) => (
                    <span
                      key={i}
                      className={cn('h-1.5 w-1.5 animate-bounce rounded-full bg-ink/25', delay)}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 bg-white px-4 py-4">
            <div className="flex items-center gap-3 rounded-full bg-cream-lt/40 px-4 py-1.5">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Enter message…"
                disabled={loading}
                className="flex-1 bg-transparent font-body text-[13px] text-ink outline-none placeholder:text-ink/30 disabled:opacity-50"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className={cn(
                  'shrink-0 text-ink/30 transition-all',
                  'disabled:opacity-25 enabled:cursor-pointer enabled:hover:text-ink-lt enabled:hover:scale-110 enabled:active:scale-95',
                )}
              >
                <span
                  className="material-symbols-outlined text-xs "
                  style={{ transform: 'rotate(-45deg)', display: 'inline-block' }}
                  aria-hidden
                >
                  send
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
