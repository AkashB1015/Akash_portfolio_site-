import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Bot, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return createPortal(
    <>
      {/* Chat Window — fixed to viewport directly */}
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

      {/* FAB Toggle Button — fixed to viewport directly, no nested positioning */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          position: "fixed",
          bottom: "80px",
          right: "24px",
          zIndex: 99999,
        }}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-accent-blue to-accent-cyan hover:from-accent-cyan hover:to-accent-blue text-white rounded-full shadow-glow-blue border border-accent-blue/30 cursor-pointer active:scale-95 hover:scale-105 transition-all duration-300 animate-pulse-glow"
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? <X size={22} /> : <Bot size={24} />}
      </button>
    </>,
    document.body
  );
}
