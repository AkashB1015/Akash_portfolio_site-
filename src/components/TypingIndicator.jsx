import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3.5 bg-panel border border-panel-border text-white rounded-2xl rounded-bl-sm max-w-[80%] w-fit self-start mb-4 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-typing-dot"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-typing-dot animate-typing-dot-delay-1"></span>
      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-typing-dot animate-typing-dot-delay-2"></span>
    </div>
  );
}
