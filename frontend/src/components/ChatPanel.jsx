import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User } from "lucide-react";
import MarkdownText from "./MarkdownText.jsx";
import CopyButton from "./CopyButton.jsx";
import { askQuestion } from "../lib/api.js";

const SUGGESTIONS = [
  "What were the main takeaways?",
  "Who is responsible for the next steps?",
  "Summarize this in 3 bullet points",
  "Were there any disagreements?",
];

export default function ChatPanel({ jobId, meetingTitle }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text) {
    const question = (text ?? input).trim();
    if (!question || loading) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const { data } = await askQuestion(jobId, question);
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "I couldn't reach the assistant just now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-panel/70 shadow-panel">
      <div className="flex items-center gap-2 border-b border-line px-6 py-4">
        <Sparkles size={17} className="text-amber" />
        <h3 className="font-display text-lg text-cream">Chat with "{meetingTitle}"</h3>
      </div>

      <div className="flex max-h-[420px] min-h-[220px] flex-col gap-4 overflow-y-auto px-6 py-5">
        {messages.length === 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted">
              💬 Ask anything about this meeting - I'll answer using the transcript.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-line bg-panel2 px-3 py-1.5 text-xs text-muted
                             transition hover:border-amber/40 hover:text-amber"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ${
                  m.role === "user"
                    ? "bg-teal/10 ring-teal/30 text-teal"
                    : "bg-amber/10 ring-amber/30 text-amber"
                }`}
              >
                {m.role === "user" ? <User size={15} /> : <Bot size={15} />}
              </div>
              <div
                className={`group relative max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user"
                    ? "bg-teal/10 text-cream"
                    : "bg-panel2 text-cream ring-1 ring-line"
                }`}
              >
                {m.role === "assistant" ? (
                  <MarkdownText>{m.text}</MarkdownText>
                ) : (
                  <p>{m.text}</p>
                )}
                {m.role === "assistant" && (
                  <div className="mt-2 opacity-0 transition group-hover:opacity-100">
                    <CopyButton text={m.text} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber/10 ring-1 ring-amber/30 text-amber">
              <Bot size={15} />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-panel2 px-4 py-3 ring-1 ring-line">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex items-center gap-2 border-t border-line px-4 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this meeting…"
          className="flex-1 rounded-full border border-line bg-ink/50 px-4 py-2.5 text-sm text-cream
                     placeholder:text-muted/70 outline-none transition focus:border-amber/50"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber text-ink
                     transition enabled:hover:bg-amber2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
