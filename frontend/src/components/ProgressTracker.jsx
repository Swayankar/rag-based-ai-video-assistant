import React from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import Waveform from "./Waveform.jsx";

const STEP_META = [
  { key: "upload", label: "Preparing media", emoji: "📦" },
  { key: "audio", label: "Extracting audio", emoji: "🎙️" },
  { key: "transcribe", label: "Transcribing speech", emoji: "📝" },
  { key: "title", label: "Naming the meeting", emoji: "🏷️" },
  { key: "summary", label: "Summarizing", emoji: "🧠" },
  { key: "actions", label: "Action items", emoji: "✅" },
  { key: "decisions", label: "Key decisions", emoji: "🔑" },
  { key: "questions", label: "Open questions", emoji: "❓" },
  { key: "index", label: "Indexing for chat", emoji: "💬" },
  { key: "done", label: "Done", emoji: "🎉" },
];

export default function ProgressTracker({ status }) {
  if (!status) return null;
  const currentIdx = STEP_META.findIndex((s) => s.key === status.step);

  return (
    <div className="rounded-2xl border border-line bg-panel/70 p-6 shadow-panel">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Waveform size="sm" color={status.status === "error" ? "bg-danger" : "bg-amber"} />
          <p className="font-display text-lg text-cream">
            {status.status === "error" ? "Something went sideways" : status.step_label}
          </p>
        </div>
        <span className="font-mono text-sm text-muted">{status.progress}%</span>
      </div>

      {/* progress bar */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-panel2 ring-1 ring-line">
        <motion.div
          className={`h-full rounded-full ${status.status === "error" ? "bg-danger" : "bg-gradient-to-r from-amber to-amber2"}`}
          initial={{ width: 0 }}
          animate={{ width: `${status.progress}%` }}
          transition={{ ease: "easeOut", duration: 0.4 }}
        />
      </div>

      {status.status === "error" ? (
        <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {status.error || "The pipeline hit an unexpected error."}
        </p>
      ) : (
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {STEP_META.map((step, i) => {
            const doneStep = i < currentIdx || status.status === "done";
            const activeStep = i === currentIdx && status.status !== "done";
            return (
              <li
                key={step.key}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition ${
                  doneStep
                    ? "bg-teal/10 text-teal"
                    : activeStep
                    ? "bg-amber/10 text-amber"
                    : "text-muted"
                }`}
              >
                {doneStep ? (
                  <Check size={13} />
                ) : activeStep ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <span>{step.emoji}</span>
                )}
                <span className="truncate">{step.label}</span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
