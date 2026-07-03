import React from "react";

export default function QuickReplies({ replies, onReplyClick }) {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 w-full justify-start py-1 select-none">
      {replies.map((reply, index) => (
        <button
          key={index}
          onClick={() => onReplyClick(reply)}
          className="border border-accent-blue/60 text-accent-cyan hover:bg-accent-blue hover:text-white rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap active:scale-95 bg-panel/30"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
