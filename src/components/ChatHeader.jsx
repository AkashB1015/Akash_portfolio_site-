import React from "react";
import { Bot, X } from "lucide-react";

export default function ChatHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 bg-panel border-b border-panel-border select-none">
      {/* Identity details */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-blue/15 text-accent-cyan border border-accent-blue/20 shadow-[inset_0_1px_8px_rgba(59,130,246,0.1)]">
          <Bot size={16} />
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="font-sans text-xs font-extrabold tracking-widest text-white uppercase leading-none">
            ASK AKASH
          </h4>
          <div className="flex items-center gap-1.5 mt-1 leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[9px] font-mono text-[#10B981] font-bold uppercase tracking-wider">Online</span>
          </div>
        </div>
      </div>

      {/* Close button control */}
      <button
        onClick={onClose}
        className="p-1.5 border border-panel-border hover:border-accent-cyan text-text-muted hover:text-white rounded-lg transition-all duration-300 cursor-pointer active:scale-95 bg-panel/40"
        aria-label="Close chat window"
      >
        <X size={14} />
      </button>
    </div>
  );
}
