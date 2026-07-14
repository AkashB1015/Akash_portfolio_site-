import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import ChatInput from "./ChatInput";

const STORAGE_KEY = "akash_portfolio_chat_history";

// Clear history from localStorage immediately on page load/script evaluation
try {
  localStorage.removeItem(STORAGE_KEY);
} catch (e) {
  console.error("Failed to clear chat history on load", e);
}

const INITIAL_MESSAGE = {
  id: "initial-bot-msg",
  sender: "bot",
  text: "Hi! 👋 I'm Akash's virtual assistant. I can answer questions about his skills, projects, certifications, or how to contact him. Ask me anything!",
  quickReplies: ["About Akash", "Technical Skills", "View Projects", "Contact Info"]
};

// Offload chatbot matching logic to a Web Worker background thread (Multithreading)
const workerCode = `
const INTENT_KEYWORDS = {
  greetings: ['hi', 'hello', 'hey', 'greetings', 'hola', 'yo', 'sup', 'morning', 'afternoon', 'evening'],
  skills: ['skill', 'tech', 'languages', 'backend', 'frontend', 'stack', 'frameworks', 'databases', 'technologies', 'spring', 'net', 'react', 'java', 'c#', 'javascript', 'sql', 'mongodb', 'docker', 'git', 'coding'],
  projects: ['project', 'build', 'work', 'roadrescue', 'think-x', 'cookify', 'portfolio', 'code', 'apps', 'applications', 'creation', 'github'],
  education: ['education', 'degree', 'college', 'university', 'cdac', 'btech', 'study', 'graduated', 'qualification', 'score', 'gpa', 'cgpa', 'academic', 'engineering', 'marks'],
  certifications: ['certifications', 'certs', 'aws', 'oracle', 'ibm', 'credential', 'certified', 'exam', 'coursework'],
  contact: ['contact', 'email', 'hire', 'phone', 'reach', 'social', 'linkedin', 'mail', 'resume', 'cv', 'call', 'connect'],
  about: ['about', 'who are you', 'akash', 'summary', 'experience', 'bio', 'background', 'profile', 'career'],
  help: ['help', 'options', 'what can you do', 'menu', 'commands', 'ask', 'info']
};

function matchIntent(userInput) {
  if (!userInput) return 'fallback';

  const cleanInput = userInput
    .toLowerCase()
    .replace(/[.,\\/#!$%\\^&\\*;:{}=\\-_~()?]/g, '')
    .trim();

  if (cleanInput === 'who are you' || cleanInput === 'who is akash' || cleanInput === 'tell me about yourself') {
    return 'about';
  }
  if (cleanInput === 'what can you do' || cleanInput === 'help' || cleanInput === 'menu' || cleanInput === 'options') {
    return 'help';
  }

  if (cleanInput.includes('roadrescue') || cleanInput.includes('road rescue')) {
    return 'project-roadrescue';
  }
  if (cleanInput.includes('think-x') || cleanInput.includes('thinkx')) {
    return 'project-thinkx';
  }
  if (cleanInput.includes('cookify')) {
    return 'project-cookify';
  }

  const words = cleanInput.split(/\\s+/);
  const scores = {};
  Object.keys(INTENT_KEYWORDS).forEach((intent) => {
    scores[intent] = 0;
    const keywords = INTENT_KEYWORDS[intent];
    words.forEach((word) => {
      if (keywords.includes(word)) {
        scores[intent] += 1;
      }
    });
    keywords.forEach((keyword) => {
      if (keyword.includes(' ') && cleanInput.includes(keyword)) {
        scores[intent] += 2;
      }
    });
  });

  let bestIntent = 'fallback';
  let maxScore = 0;

  Object.keys(scores).forEach((intent) => {
    if (scores[intent] > maxScore) {
      maxScore = scores[intent];
      bestIntent = intent;
    }
  });

  return bestIntent;
}

const responses = {
  greetings: {
    text: "Hi! 👋 I'm Akash's virtual assistant. I can help you learn more about his background, tech stack, certifications, projects, and contact details. Ask me anything!",
    quickReplies: ['About Akash', 'Technical Skills', 'View Projects', 'Contact Info']
  },
  skills: {
    text: "Akash is a Java & .NET Full-Stack Developer. Here is a breakdown of his technical skills:\\n\\n• **Languages:** Java, C#, JavaScript (ES6+), SQL, C, C++\\n• **Java Stack:** Spring Boot, Spring Security, Hibernate, JPA, MVC, Spring Data JPA\\n• **.NET Stack:** ASP.NET Core, Entity Framework Core, Web API\\n• **Frontend & Fullstack:** React.js, Node.js, Express.js, Bootstrap, HTML5, CSS3\\n• **Databases:** MySQL, PostgreSQL, MongoDB\\n• **Cloud & DevOps:** AWS (EC2, S3), OCI Foundations Associate, Docker, Git, GitHub Actions, Jenkins, Maven, CI/CD",
    quickReplies: ['View Projects', 'Certifications', 'Contact Info']
  },
  projects: {
    text: "Akash has built several full-stack, production-ready applications. Here are the featured ones:\\n\\n1. **RoadRescue** — Smart Roadside Assistance logistics platform with dual Java/C# backend.\\n2. **Think-X** — Real-time assessment platform built with React, Node/Express, and MongoDB.\\n3. **Cookify** — Custom cookie storefront utilizing relational and NoSQL polyglot databases.\\n\\nWhich project would you like to know more about?",
    quickReplies: ['RoadRescue Info', 'Think-X Info', 'Cookify Info', 'Technical Skills']
  },
  'project-roadrescue': {
    text: "**RoadRescue — Smart Roadside Assistance Platform**\\n\\n• **Description:** Real-time roadside assistance platform connecting stranded users with service providers.\\n• **Tech:** React.js, Spring Boot, ASP.NET Core, Bootstrap, MySQL, Razorpay, Google Maps API, JWT.\\n• **Key Features:** Dual backend (Java & C#) microservices, secure Role-Based Access Control (RBAC), and Razorpay payments.\\n• **GitHub:** [RoadRescue Repository](https://github.com/AkashB1015/RoadRescue-Smart-Services-Platform.git)",
    quickReplies: ['Think-X Info', 'Cookify Info', 'View Projects', 'Contact Info']
  },
  'project-thinkx': {
    text: "**Think-X — Full-Stack Quiz Application**\\n\\n• **Description:** Interactive quiz dashboard with real-time scoring, automated timers, and performance analytics.\\n• **Tech:** React.js, Node.js, Express.js, MongoDB, MySQL, REST API, JWT.\\n• **Key Features:** Polyglot database schema (MySQL & MongoDB), custom admin panel for quiz creation, and dynamic scoring.\\n• **GitHub:** [Think-X Repository](https://github.com/AkashB1015/Think-X-Quiz-Application-.git)",
    quickReplies: ['RoadRescue Info', 'Cookify Info', 'View Projects', 'Contact Info']
  },
  'project-cookify': {
    text: "**Cookify — Online Cookie Store Platform**\\n\\n• **Description:** Custom e-commerce storefront with transactional checkout flows and dynamic inventories.\\n• **Tech:** React.js, Bootstrap, Spring Boot, Spring Data JPA, MongoDB, JWT.\\n• **Key Features:** Polyglot database persistence (SQL for orders, MongoDB for catalog), JWT authentication, and admin dashboards.\\n• **GitHub:** [Cookify Repository](https://github.com/AkashB1015/cookify-react-springboot-application.git)",
    quickReplies: ['RoadRescue Info', 'Think-X Info', 'View Projects', 'Contact Info']
  },
  education: {
    text: "Here is Akash's academic and training background:\\n\\n• **Post Graduate Diploma in Advanced Computing (PG-DAC)**\\n  *Centre for Development of Advanced Computing (CDAC), Mumbai* (2025 – 2026)\\n  Comprehensive training in enterprise development, Spring frameworks, microservices, and databases.\\n  \\n• **B.Tech in Computer Science and Engineering**\\n  *Sandip University, Nashik* (2021 – 2025)\\n  First Division graduate with a **7.99 CGPA**; focused on OOP, DSA, DBMS, and software architecture.",
    quickReplies: ['Technical Skills', 'Certifications', 'Contact Info']
  },
  certifications: {
    text: "Akash holds the following verified certifications:\\n\\n1. **Oracle Cloud Infrastructure (OCI) Foundations Associate** (2025)\\n2. **AWS Cloud Training Program** (NASSCOM, 3 Months) (2025)\\n3. **IBM SkillsBuild Certificate — AI & Cloud Technologies** (2024)\\n4. **IBM SkillsBuild Cybersecurity Training** (Edunet Foundation) (2024)\\n5. **AWS Training Certificate** (Coursera) (2024)\\n6. **AI Training Program (ML Models & Data Handling)** (Winjit Technologies) (2024)",
    quickReplies: ['Technical Skills', 'Education', 'Contact Info']
  },
  contact: {
    text: "You can reach out to Akash via any of the links below:\\n\\n• 📧 **Email:** [akashbhadane7227@gmail.com](mailto:akashbhadane7227@gmail.com)\\n• 📞 **Phone:** [+91 74994 90541](tel:+917499490541)\\n• 🔗 **LinkedIn:** [linkedin.com/in/akash-bhadane3501](https://linkedin.com/in/akash-bhadane3501)\\n• 💻 **GitHub:** [github.com/AkashB1015](https://github.com/AkashB1015)\\n• 📍 **Location:** Nashik, Maharashtra, India\\n\\nHe is currently open to full-time Software Engineer positions!",
    quickReplies: ['About Akash', 'Technical Skills', 'View Projects']
  },
  about: {
    text: "Akash Bhadane is a dedicated Software Engineer specializing in designing highly available backend systems with Spring Boot (Java) and ASP.NET Core (C#).\\n\\nHe builds modular, user-focused frontends in React and applies strict architectural principles (SOLID, design patterns, clean code) in CDAC Mumbai. He aims to construct secure, scalable codebases that deliver sub-second performance.",
    quickReplies: ['Technical Skills', 'View Projects', 'Contact Info']
  },
  help: {
    text: "I'm here to answer your questions about Akash. Choose one of the topics below or write a custom question in the input field. Examples:\\n\\n• *\\\"What certifications does he have?\\\"*\\n• *\\\"Show me his projects\\\"*\\n• *\\\"How can I contact him?\\\"*",
    quickReplies: ['About Akash', 'Technical Skills', 'View Projects', 'Certifications', 'Education', 'Contact Info']
  },
  fallback: {
    text: "I'm not sure about that one! Try asking about Akash's skills, projects, certifications, or how to contact him, or use the quick links below.",
    quickReplies: ['Technical Skills', 'View Projects', 'Contact Info', 'Direct Connect']
  }
};

function getResponse(intentKey) {
  let resolvedKey = intentKey;
  if (intentKey === 'about akash') resolvedKey = 'about';
  if (intentKey === 'technical skills') resolvedKey = 'skills';
  if (intentKey === 'view projects') resolvedKey = 'projects';
  if (intentKey === 'contact info' || intentKey === 'direct connect') resolvedKey = 'contact';
  if (intentKey === 'roadrescue info') resolvedKey = 'project-roadrescue';
  if (intentKey === 'think-x info') resolvedKey = 'project-thinkx';
  if (intentKey === 'cookify info') resolvedKey = 'project-cookify';

  return responses[resolvedKey] || responses.fallback;
}

self.onmessage = function(e) {
  const text = e.data;
  const lowerText = text.toLowerCase().trim();

  // First try direct quick-reply pill text mapping
  const pillMap = {
    'about akash': 'about',
    'technical skills': 'skills',
    'view projects': 'projects',
    'contact info': 'contact',
    'direct connect': 'contact',
    'roadrescue info': 'project-roadrescue',
    'think-x info': 'project-thinkx',
    'cookify info': 'project-cookify',
    'certifications': 'certifications',
    'education': 'education'
  };

  if (pillMap[lowerText] && responses[pillMap[lowerText]]) {
    self.postMessage(responses[pillMap[lowerText]]);
    return;
  }

  // Otherwise run intent matching
  const intentKey = matchIntent(text);
  const botReply = getResponse(intentKey);
  self.postMessage(botReply);
};
`;

export default function ChatWindow({ onClose }) {
  const workerRef = useRef(null);
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

  // Initialize Web Worker thread on mount
  useEffect(() => {
    const blob = new Blob([workerCode], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const botReply = e.data;
      const botMessage = {
        id: `bot-msg-${Date.now()}`,
        sender: "bot",
        text: botReply.text,
        quickReplies: botReply.quickReplies
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    };

    return () => {
      worker.terminate();
    };
  }, []);

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

    // 2. Process query via Web Worker (background thread execution)
    const delay = Math.random() * 200 + 200; // 200ms - 400ms delay

    setTimeout(() => {
      if (workerRef.current) {
        workerRef.current.postMessage(text);
      }
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
