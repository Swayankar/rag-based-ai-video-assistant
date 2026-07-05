import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownText({ children, className = "" }) {
  if (!children) return null;
  return (
    <div className={`prose-console text-cream/90 text-[0.95rem] ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
