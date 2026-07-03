import { profileData } from "../data/profileData";

const responses = {
  greetings: {
    text: `Hi! 👋 I'm Akash's virtual assistant. I can help you learn more about his background, tech stack, certifications, projects, and contact details. Ask me anything!`,
    quickReplies: ["About Akash", "Technical Skills", "View Projects", "Contact Info"]
  },
  skills: {
    text: `Akash is a Java & .NET Full-Stack Developer. Here is a breakdown of his technical skills:
    
• **Languages:** Java, C#, JavaScript (ES6+), SQL, C, C++
• **Java Stack:** Spring Boot, Spring Security, Hibernate, JPA, MVC, Spring Data JPA
• **.NET Stack:** ASP.NET Core, Entity Framework Core, Web API
• **Frontend & Fullstack:** React.js, Node.js, Express.js, Bootstrap, HTML5, CSS3
• **Databases:** MySQL, PostgreSQL, MongoDB
• **Cloud & DevOps:** AWS (EC2, S3), OCI Foundations Associate, Docker, Git, GitHub Actions, Jenkins, Maven, CI/CD`,
    quickReplies: ["View Projects", "Certifications", "Contact Info"]
  },
  projects: {
    text: `Akash has built several full-stack, production-ready applications. Here are the featured ones:

1. **RoadRescue** — Smart Roadside Assistance logistics platform with dual Java/C# backend.
2. **Think-X** — Real-time assessment platform built with React, Node/Express, and MongoDB.
3. **Cookify** — Custom cookie storefront utilizing relational and NoSQL polyglot databases.

Which project would you like to know more about?`,
    quickReplies: ["RoadRescue Info", "Think-X Info", "Cookify Info", "Technical Skills"]
  },
  "project-roadrescue": {
    text: `**RoadRescue — Smart Roadside Assistance Platform**
    
• **Core:** Built a real-time logistics engine connecting stranded drivers to service providers.
• **Tech:** React.js, Spring Boot (Java), ASP.NET Core (C#), MySQL, Razorpay, Google Maps API, JWT.
• **Highlight:** Dual backend architecture running microservices in both Java and C#.
• **Security:** Role-Based Access Control (RBAC) across Client, Provider, and Admin portals.
• **GitHub:** [RoadRescue Repository](https://github.com/AkashB1015/RoadRescue)`,
    quickReplies: ["Think-X Info", "Cookify Info", "View Projects", "Contact Info"]
  },
  "project-thinkx": {
    text: `**Think-X — Full-Stack Quiz Application**
    
• **Core:** Real-time assessment engine with automated timers, scoring, and detailed metrics.
• **Tech:** MongoDB, Express.js, React.js, Node.js, MySQL, JWT.
• **Highlight:** Polyglot support (MySQL and MongoDB models) with a custom admin portal for quiz creation.
• **GitHub:** [Think-X Repository](https://github.com/AkashB1015/Think-X)`,
    quickReplies: ["RoadRescue Info", "Cookify Info", "View Projects", "Contact Info"]
  },
  "project-cookify": {
    text: `**Cookify — Online Cookie Store Platform**
    
• **Core:** Custom storefront checkout pipeline with polyglot database persistence.
• **Tech:** React.js, Bootstrap, Spring Boot, Spring Data JPA, MongoDB, JWT.
• **Highlight:** Uses SQL/JPA for transactional orders and MongoDB for catalog/raw inventories.
• **GitHub:** [Cookify Repository](https://github.com/AkashB1015/Cookify)`,
    quickReplies: ["RoadRescue Info", "Think-X Info", "View Projects", "Contact Info"]
  },
  education: {
    text: `Here is Akash's academic and training background:
    
• **Post Graduate Diploma in Advanced Computing (PG-DAC)**
  *Centre for Development of Advanced Computing (CDAC), Mumbai* (2025 – 2026)
  Comprehensive training in enterprise development, Spring frameworks, microservices, and databases.
  
• **B.Tech in Computer Science and Engineering**
  *Sandip University, Nashik* (2021 – 2025)
  First Division graduate with a **7.99 CGPA**; focused on OOP, DSA, DBMS, and software architecture.`,
    quickReplies: ["Technical Skills", "Certifications", "Contact Info"]
  },
  certifications: {
    text: `Akash holds the following verified certifications:
    
1. **Oracle Cloud Infrastructure (OCI) Foundations Associate** (2025)
2. **AWS Cloud Training Program** (NASSCOM, 3 Months) (2025)
3. **IBM SkillsBuild Certificate — AI & Cloud Technologies** (2024)
4. **IBM SkillsBuild Cybersecurity Training** (Edunet Foundation) (2024)
5. **AWS Training Certificate** (Coursera) (2024)
6. **AI Training Program (ML Models & Data Handling)** (Winjit Technologies) (2024)`,
    quickReplies: ["Technical Skills", "Education", "Contact Info"]
  },
  contact: {
    text: `You can reach out to Akash via any of the links below:
    
• 📧 **Email:** [akashbhadane7227@gmail.com](mailto:akashbhadane7227@gmail.com)
• 📞 **Phone:** [+91 74994 90541](tel:+917499490541)
• 🔗 **LinkedIn:** [linkedin.com/in/akash-bhadane3501](https://linkedin.com/in/akash-bhadane3501)
• 💻 **GitHub:** [github.com/AkashB1015](https://github.com/AkashB1015)
• 📍 **Location:** Nashik, Maharashtra, India

He is currently open to full-time Software Engineer positions!`,
    quickReplies: ["About Akash", "Technical Skills", "View Projects"]
  },
  about: {
    text: `Akash Bhadane is a dedicated Software Engineer specializing in designing highly available backend systems with Spring Boot (Java) and ASP.NET Core (C#). 
    
He builds modular, user-focused frontends in React and applies strict architectural principles (SOLID, design patterns, clean code) in CDAC Mumbai. He aims to construct secure, scalable codebases that deliver sub-second performance.`,
    quickReplies: ["Technical Skills", "View Projects", "Contact Info"]
  },
  help: {
    text: `I'm here to answer your questions about Akash. Choose one of the topics below or write a custom question in the input field. Examples:
    
• *"What certifications does he have?"*
• *"Show me his projects"*
• *"How can I contact him?"*`,
    quickReplies: ["About Akash", "Technical Skills", "View Projects", "Certifications", "Education", "Contact Info"]
  },
  fallback: {
    text: `I'm not sure about that one! Try asking about Akash's skills, projects, certifications, or how to contact him, or use the quick links below.`,
    quickReplies: ["Technical Skills", "View Projects", "Contact Info", "Direct Connect"]
  }
};

export function getResponse(intentKey) {
  // Map specific user-friendly pill requests to intents
  let resolvedKey = intentKey;
  if (intentKey === "about akash") resolvedKey = "about";
  if (intentKey === "technical skills") resolvedKey = "skills";
  if (intentKey === "view projects") resolvedKey = "projects";
  if (intentKey === "contact info" || intentKey === "direct connect") resolvedKey = "contact";
  if (intentKey === "roadrescue info") resolvedKey = "project-roadrescue";
  if (intentKey === "think-x info") resolvedKey = "project-thinkx";
  if (intentKey === "cookify info") resolvedKey = "project-cookify";

  return responses[resolvedKey] || responses.fallback;
}
