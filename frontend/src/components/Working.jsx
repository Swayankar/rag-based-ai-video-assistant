import React from "react";
import { motion } from "framer-motion";
import { UploadCloud, AudioLines, Sparkles, MessagesSquare, ArrowRight } from "lucide-react";
import Waveform from "./Waveform.jsx";

const STEPS = [
  {
    n: "01",
    icon: UploadCloud,
    title: "Drop it in",
    body:
      "Drag in a recording, browse your files, or paste a YouTube link. Pick English or Hinglish and you're set.",
    accent: "text-amber",
    ring: "ring-amber/30",
    glowColor: "#E8A33D",
  },
  {
    n: "02",
    icon: AudioLines,
    title: "We listen closely",
    body:
      "Audio is pulled out and transcribed word-for-word, so nothing said in the meeting gets lost.",
    accent: "text-teal",
    ring: "ring-teal/30",
    glowColor: "#4FD1C5",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Insights, sorted",
    body:
      "A title, a clean summary, and every action item, decision, and open question get pulled out and organized for you.",
    accent: "text-amber2",
    ring: "ring-amber2/30",
    glowColor: "#F4C06B",
  },
  {
    n: "04",
    icon: MessagesSquare,
    title: "Ask it anything",
    body:
      "Once it's indexed, chat with the meeting directly - \"what did we decide about the budget?\" gets a real answer.",
    accent: "text-teal",
    ring: "ring-teal/30",
    glowColor: "#4FD1C5",
  },
];

export default function HowItWorks() {
  return (
    <section className="mb-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col items-start gap-4"
      >
        <div className="flex items-center gap-2 rounded-full border border-line bg-panel2 px-3 py-1.5 text-xs text-muted">
          <Waveform size="sm" />
          <span>From raw recording to meeting notes, automatically</span>
        </div>
        <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl">
          Turn any recording into
          <span className="text-amber"> decisions</span>,
          <br className="hidden sm:block" /> not just a transcript.
        </h2>
        <p className="max-w-2xl text-sm text-muted sm:text-base">
          Upload a video or paste a YouTube link. The assistant transcribes it, writes a
          summary, pulls out action items and decisions, and lets you chat with the
          meeting afterward - all in one pass.
        </p>
      </motion.div>

      {/* Step walkthrough */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-panel/60 p-5 shadow-panel"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-60 blur-xl transition-opacity group-hover:opacity-90"
                style={{
                  background: `radial-gradient(circle, ${step.glowColor}33 0%, transparent 70%)`,
                }}
              />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-xs text-muted">{step.n}</span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-panel2 ring-1 ${step.ring}`}>
                  <Icon size={16} className={step.accent} />
                </div>
              </div>
              <h3 className="relative mt-4 font-display text-lg text-cream">{step.title}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>

              {/* {i < STEPS.length - 1 && (
                <ArrowRight
                  size={14}
                  className="absolute right-3 top-1/2 hidden -translate-y-1/2 text-line lg:block"
                />
              )} */}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
