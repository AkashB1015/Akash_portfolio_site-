import React from "react";

/**
 * TypingIndicator — Upgraded Tier 2 chatbot "thinking" state
 * Three staggered teal dots with soft glow pulse, matching the
 * site's shared loading visual language (teal accent only, no violet/amber).
 */
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3.5 bg-panel border border-panel-border rounded-2xl rounded-bl-sm max-w-[80%] w-fit self-start mb-4 shadow-sm">
      {/* Three dots — staggered glow pulse using the teal accent exclusively */}
      <span className="w-2 h-2 rounded-full bg-accent-cyan animate-typing-glow" />
      <span className="w-2 h-2 rounded-full bg-accent-cyan animate-typing-glow animate-typing-glow-delay-1" />
      <span className="w-2 h-2 rounded-full bg-accent-cyan animate-typing-glow animate-typing-glow-delay-2" />
    </div>
  );
}
