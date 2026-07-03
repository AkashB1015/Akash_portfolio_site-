import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import ChatInput from "./ChatInput";
import { matchIntent } from "../utils/intentMatcher";
import { getResponse } from "../utils/botResponses";

const STORAGE_KEY = "akash_portfolio_chat_history";

const INITIAL_MESSAGE = {
  id: "initial-bot-msg",
  sender: "bot",
  text: "Hi! 👋 I'm Akash's virtual assistant. I can answer questions about his skills, projects, certifications, or how to contact him. Ask me anything!",
  quickReplies: ["About Akash", "Technical Skills", "View Projects", "Contact Info"]
};

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [INITIAL_MESSAGE];
    } catch (e) {
      console.error("Failed to read chat history from localStorage", e);
      return [INITIAL_MESSAGE];
    }
  });

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sync message state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to save chat history to localStorage", e);
    }
  }, [messages]);

  // Auto-scroll to bottom of chat log on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    // 1. Add user message
    const userMessage = {
      id: `user-msg-${Date.now()}`,
      sender: "user",
      text: text
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // 2. Process query & mock delay
    const delay = Math.random() * 300 + 300; // 300ms - 600ms delay

    setTimeout(() => {
      const intentKey = matchIntent(text);
      const botReply = getResponse(intentKey);

      const botMessage = {
        id: `bot-msg-${Date.now()}`,
        sender: "bot",
        text: botReply.text,
        quickReplies: botReply.quickReplies
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, delay);
  };

  // Find the last bot message's quick replies to show
  const lastMessage = messages[messages.length - 1];
  const showQuickReplies = !isTyping && lastMessage && lastMessage.sender === "bot" && lastMessage.quickReplies;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "160px",
        right: "24px",
        width: "min(calc(100vw - 48px), 384px)",
        height: "min(70vh, 500px)",
        zIndex: 99998,
      }}
      className="flex flex-col bg-panel border border-panel-border rounded-2xl shadow-glow-blue overflow-hidden font-sans"
    >
      {/* Header */}
      <ChatHeader onClose={onClose} />

      {/* Chat Messages Log */}
      <div className="flex-grow overflow-y-auto p-4 flex flex-col no-scrollbar">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        {/* Quick replies */}
        {showQuickReplies && (
          <QuickReplies
            replies={lastMessage.quickReplies}
            onReplyClick={handleSend}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input controls */}
      <ChatInput onSendMessage={handleSend} />
    </div>
  );
}
