import React from "react";
import { motion } from "framer-motion";
import { FileDown, FileText, CheckSquare, KeyRound, HelpCircle, ScrollText } from "lucide-react";
import Accordion from "./Accordion.jsx";
import MarkdownText from "./MarkdownText.jsx";
import CopyButton from "./CopyButton.jsx";
import { downloadUrl } from "../lib/api.js";

export default function ResultsView({ jobId, result }) {
  if (!result) return null;

  const columns = [
    {
      key: "action_items",
      title: "Action Items",
      icon: <CheckSquare size={16} className="text-amber" />,
      content: result.action_items,
      accent: "border-amber/30",
    },
    {
      key: "key_decisions",
      title: "Key Decisions",
      icon: <KeyRound size={16} className="text-teal" />,
      content: result.key_decisions,
      accent: "border-teal/30",
    },
    {
      key: "open_questions",
      title: "Open Questions",
      icon: <HelpCircle size={16} className="text-amber2" />,
      content: result.open_questions,
      accent: "border-amber2/30",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      {/* Title + downloads */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-panel/70 px-6 py-5 shadow-panel">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-muted">🎬 Meeting title</p>
          <h2 className="font-display text-2xl text-cream sm:text-3xl">{result.title}</h2>
        </div>
        <div className="flex gap-2">
          <a
            href={downloadUrl(jobId, "pdf")}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel2 px-4 py-2 text-sm
                       text-cream transition hover:border-amber/40 hover:text-amber"
          >
            <FileDown size={15} /> PDF
          </a>
          <a
            href={downloadUrl(jobId, "docx")}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel2 px-4 py-2 text-sm
                       text-cream transition hover:border-teal/40 hover:text-teal"
          >
            <FileDown size={15} /> DOCX
          </a>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-line bg-panel/60 p-6 shadow-panel">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-lg text-cream">
            <FileText size={17} className="text-amber" /> Summary
          </h3>
          <CopyButton text={result.summary} />
        </div>
        <MarkdownText>{result.summary}</MarkdownText>
      </div>

      {/* 3-column insights */}
      <div className="grid gap-5 md:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col.key}
            className={`rounded-2xl border bg-panel/60 p-5 shadow-panel ${col.accent}`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display text-base text-cream">
                {col.icon} {col.title}
              </h3>
              <CopyButton text={col.content} />
            </div>
            <MarkdownText>{col.content}</MarkdownText>
          </div>
        ))}
      </div>

      {/* Transcript & intermediate steps, collapsible */}
      <div className="flex flex-col gap-3">
        <p className="px-1 text-xs uppercase tracking-widest text-muted">
          🔬 Full pipeline output
        </p>
        <Accordion
          icon={<ScrollText size={16} className="text-teal" />}
          title="Full Transcript"
          content={result.transcript}
        />
        <Accordion
          icon="🧠"
          title="Summary (raw)"
          content={result.summary}
        />
        <Accordion
          icon="✅"
          title="Action Items (raw)"
          content={result.action_items}
        />
        <Accordion
          icon="🔑"
          title="Key Decisions (raw)"
          content={result.key_decisions}
        />
        <Accordion
          icon="❓"
          title="Open Questions (raw)"
          content={result.open_questions}
        />
      </div>
    </motion.div>
  );
}
