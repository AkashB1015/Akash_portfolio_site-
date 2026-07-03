import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function ChatInput({ onSendMessage }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 bg-panel border-t border-panel-border select-none"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow bg-panel-border/20 border border-panel-border hover:border-accent-blue/30 focus:border-accent-cyan text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl outline-none transition-all duration-300 placeholder:text-text-muted/50"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="flex items-center justify-center p-2.5 bg-gradient-to-r from-accent-blue to-accent-cyan text-white rounded-xl shadow-md hover:shadow-glow-blue/20 transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex-shrink-0"
        aria-label="Send message"
      >
        <SendHorizontal size={16} />
      </button>
    </form>
  );
}
