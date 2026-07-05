import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import CopyButton from "./CopyButton.jsx";
import MarkdownText from "./MarkdownText.jsx";

export default function Accordion({ icon, title, content, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel/60 shadow-panel">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2.5 font-display text-base text-cream">
          <span>{icon}</span>
          {title}
        </span>
        <span className="flex items-center gap-3">
          <span onClick={(e) => e.stopPropagation()}>
            <CopyButton text={content} />
          </span>
          <ChevronDown
            size={18}
            className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      {open && (
        <div className="max-h-[420px] overflow-y-auto border-t border-line px-5 py-4">
          <MarkdownText>{content}</MarkdownText>
        </div>
      )}
    </div>
  );
}
