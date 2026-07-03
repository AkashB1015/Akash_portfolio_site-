const INTENT_KEYWORDS = {
  greetings: ["hi", "hello", "hey", "greetings", "hola", "yo", "sup", "morning", "afternoon", "evening"],
  skills: ["skill", "tech", "languages", "backend", "frontend", "stack", "frameworks", "databases", "technologies", "spring", "net", "react", "java", "c#", "javascript", "sql", "mongodb", "docker", "git", "coding"],
  projects: ["project", "build", "work", "roadrescue", "think-x", "cookify", "portfolio", "code", "apps", "applications", "creation", "github"],
  education: ["education", "degree", "college", "university", "cdac", "btech", "study", "graduated", "qualification", "score", "gpa", "cgpa", "academic", "engineering", "marks"],
  certifications: ["certifications", "certs", "aws", "oracle", "ibm", "credential", "certified", "exam", "coursework"],
  contact: ["contact", "email", "hire", "phone", "reach", "social", "linkedin", "mail", "resume", "cv", "call", "connect"],
  about: ["about", "who are you", "akash", "summary", "experience", "bio", "background", "profile", "career"],
  help: ["help", "options", "what can you do", "menu", "commands", "ask", "info"]
};

export function matchIntent(userInput) {
  if (!userInput) return "fallback";

  // Normalize input: lowercase, trim, strip punctuation
  const cleanInput = userInput
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
    .trim();

  // Check for direct common phrases first
  if (cleanInput === "who are you" || cleanInput === "who is akash" || cleanInput === "tell me about yourself") {
    return "about";
  }
  if (cleanInput === "what can you do" || cleanInput === "help" || cleanInput === "menu" || cleanInput === "options") {
    return "help";
  }

  // Check for specific projects
  if (cleanInput.includes("roadrescue") || cleanInput.includes("road rescue")) {
    return "project-roadrescue";
  }
  if (cleanInput.includes("think-x") || cleanInput.includes("thinkx")) {
    return "project-thinkx";
  }
  if (cleanInput.includes("cookify")) {
    return "project-cookify";
  }

  // Tokenize words
  const words = cleanInput.split(/\s+/);

  // Score intents based on keyword matches
  const scores = {};
  Object.keys(INTENT_KEYWORDS).forEach((intent) => {
    scores[intent] = 0;
    const keywords = INTENT_KEYWORDS[intent];
    
    // Check for direct matching of keywords
    words.forEach((word) => {
      if (keywords.includes(word)) {
        scores[intent] += 1;
      }
    });

    // Handle compound phrasing checks (e.g. "who are you" / "tech stack")
    keywords.forEach((keyword) => {
      if (keyword.includes(" ") && cleanInput.includes(keyword)) {
        scores[intent] += 2;
      }
    });
  });

  // Find intent with highest score
  let bestIntent = "fallback";
  let maxScore = 0;

  Object.keys(scores).forEach((intent) => {
    if (scores[intent] > maxScore) {
      maxScore = scores[intent];
      bestIntent = intent;
    }
  });

  return bestIntent;
}
