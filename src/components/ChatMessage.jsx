import React from "react";
import { Bot, User } from "lucide-react";

// Lightweight local formatting helper for bold text, bullet points, and markdown links
function formatMessageText(text) {
  if (!text) return "";

  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    if (!line.trim()) {
      return <div key={lineIdx} className="h-2" />;
    }

    const parts = [];
    let currentText = line;
    let keyIdx = 0;

    while (currentText) {
      const boldMatch = /\*\*(.*?)\*\*/.exec(currentText);
      const linkMatch = /\[(.*?)\]\((.*?)\)/.exec(currentText);

      const boldIndex = boldMatch ? boldMatch.index : -1;
      const linkIndex = linkMatch ? linkMatch.index : -1;

      if (boldIndex !== -1 && (linkIndex === -1 || boldIndex < linkIndex)) {
        if (boldIndex > 0) {
          parts.push(currentText.substring(0, boldIndex));
        }
        parts.push(
          <strong key={keyIdx++} className="font-bold text-white">
            {boldMatch[1]}
          </strong>
        );
        currentText = currentText.substring(boldIndex + boldMatch[0].length);
      } else if (linkIndex !== -1 && (boldIndex === -1 || linkIndex < boldIndex)) {
        if (linkIndex > 0) {
          parts.push(currentText.substring(0, linkIndex));
        }
        parts.push(
          <a
            key={keyIdx++}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan underline hover:text-accent-blue transition-colors duration-200"
          >
            {linkMatch[1]}
          </a>
        );
        currentText = currentText.substring(linkIndex + linkMatch[0].length);
      } else {
        parts.push(currentText);
        currentText = "";
      }
    }

    return (
      <p key={lineIdx} className="text-xs sm:text-sm font-sans leading-relaxed break-words py-0.5 text-gray-200">
        {parts}
      </p>
    );
  });
}

export default function ChatMessage({ message }) {
  const { sender, text } = message;
  const isBot = sender === "bot";

  return (
    <div className={`flex items-start gap-2.5 mb-4 ${isBot ? "self-start" : "self-end flex-row-reverse"} max-w-[85%]`}>
      {/* Avatar Badge */}
      <div className={`flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 shadow-sm border ${
        isBot 
          ? "bg-panel border-panel-border text-accent-cyan" 
          : "bg-accent-blue/15 border-accent-blue/30 text-accent-cyan"
      }`}>
        {isBot ? <Bot size={14} /> : <User size={14} />}
      </div>

      {/* Bubble Container */}
      <div className={`px-4 py-3.5 rounded-2xl shadow-sm border transition-all duration-300 ${
        isBot 
          ? "bg-panel border-panel-border text-white rounded-bl-sm" 
          : "bg-gradient-to-r from-accent-blue to-accent-cyan border-accent-blue/20 text-white rounded-br-sm shadow-glow-blue/10"
      }`}>
        {formatMessageText(text)}
      </div>
    </div>
  );
}
