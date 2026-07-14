# 🚀 Akash Bhadane — Portfolio Website

A premium, production-ready personal portfolio website built to showcase skills, projects, certifications, and professional background. Designed with modern web technologies, rich animations, and a recruiter-focused layout.

🔗 **Live Preview**: [Portfolio Website](#)

---

## 📸 Preview

| Hero Section | Skills Constellation | Projects |
|:---:|:---:|:---:|
| Animated headline with parallax scroll | Interactive 3D draggable tech sphere | Flip cards with GitHub links |

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎨 **Premium Dark/Light Theme** | Smooth theme toggle with CSS variable-driven color system and localStorage persistence |
| 🌀 **3D Tech Orbit Sphere** | Interactive Fibonacci/Golden Spiral constellation of skills — drag to rotate, hover for proof points |
| 🤖 **AI Chatbot Assistant** | Intent-matching virtual assistant powered by a Web Worker (multithreaded) for zero UI lag |
| 🎭 **Framer Motion Animations** | Word-by-word text reveals, parallax scrolling, spring-loaded UI transitions |
| 🧈 **Lenis Smooth Scroll** | Physics-based smooth scrolling with exponential ease-out curves |
| 📱 **Fully Responsive** | Optimized layouts for mobile, tablet, and desktop screens |
| 🔍 **SEO Optimized** | Proper meta tags, Open Graph tags, semantic HTML, and structured headings |
| 🎯 **Side Dot Navigation** | Scroll-tracking progress dots for quick section jumping (desktop) |
| 📊 **Scroll Progress Bar** | Animated top progress bar with glowing tip indicator |
| 🖱️ **Custom Cursor** | Magnetic hover cursor effect for desktop devices |
| 💬 **Quick Reply Pills** | One-click chatbot navigation for skills, projects, certifications, and contact info |
| 🔄 **Auto-Clear Chat History** | Chat resets on page reload for a clean experience every visit |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | Component-based UI framework with hooks |
| **Vite 5** | Lightning-fast build tool and dev server with HMR |
| **Tailwind CSS 3** | Utility-first CSS framework with custom design tokens |
| **Framer Motion** | Production-ready animation library for React |
| **Lenis** | Smooth scroll library with physics-based easing |

### Icons & Typography
| Technology | Purpose |
|---|---|
| **Lucide React** | Modern, clean SVG icon library |
| **React Icons** | Technology brand icons (Si* icons for skills) |
| **Google Fonts** | Inter, JetBrains Mono, Outfit typefaces |

### Developer Tools
| Technology | Purpose |
|---|---|
| **OxLint** | Fast Rust-based JavaScript/React linter |
| **PostCSS + Autoprefixer** | CSS processing and browser compatibility |
| **Git + GitHub** | Version control and repository hosting |

### Architecture Patterns
| Pattern | Implementation |
|---|---|
| **Web Workers** | Multithreaded chatbot intent matching (offloads processing from main thread) |
| **Component Composition** | Modular, reusable React components |
| **Data-Driven Design** | All content (skills, projects, certifications, education) stored in separate data modules |
| **CSS Variables** | Theme-aware color system with smooth transition support |

---

## 📁 Project Structure

```
Akash_portfolio_site-/
├── public/
│   ├── favicon.svg              # Browser tab icon
│   └── icons.svg                # SVG sprite icons
├── src/
│   ├── assets/                  # Static assets (images)
│   ├── components/              # React UI components
│   │   ├── Navbar.jsx           # Navigation bar with theme toggle
│   │   ├── Hero.jsx             # Landing section with parallax
│   │   ├── About.jsx            # Profile summary with stats
│   │   ├── Skills.jsx           # Skill categories grid
│   │   ├── TechOrbitSphere.jsx  # 3D interactive tech constellation
│   │   ├── Projects.jsx         # Project showcase with flip cards
│   │   ├── Certifications.jsx   # Verified credentials display
│   │   ├── Education.jsx        # Academic timeline
│   │   ├── Contact.jsx          # Contact form and social links
│   │   ├── ChatWidget.jsx       # Floating chatbot toggle button
│   │   ├── ChatWindow.jsx       # Chatbot window with Web Worker
│   │   ├── ChatHeader.jsx       # Chatbot header bar
│   │   ├── ChatInput.jsx        # Chatbot message input field
│   │   ├── ChatMessage.jsx      # Chat message bubble renderer
│   │   ├── QuickReplies.jsx     # Chatbot quick reply pill buttons
│   │   ├── TypingIndicator.jsx  # Animated typing dots
│   │   ├── CustomCursor.jsx     # Magnetic cursor effect
│   │   └── TextReveal.jsx       # Word-by-word text animations
│   ├── data/                    # Content data modules
│   │   ├── profileData.js       # Master profile configuration
│   │   ├── skills.js            # Categorized skill lists
│   │   ├── projects.js          # Project details and GitHub URLs
│   │   ├── certifications.js    # Professional certifications
│   │   └── education.js         # Academic records
│   ├── utils/                   # Utility modules
│   │   ├── botResponses.js      # Chatbot response templates
│   │   ├── intentMatcher.js     # Keyword-based intent classifier
│   │   └── motionVariants.js    # Shared Framer Motion presets
│   ├── App.jsx                  # Root application component
│   ├── App.css                  # App-specific styles
│   ├── index.css                # Global styles and CSS variables
│   └── main.jsx                 # React DOM entry point
├── index.html                   # HTML shell with SEO meta tags
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.js               # Vite build configuration
├── postcss.config.js            # PostCSS plugin configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation
```

---

## 🧑‍💻 About the Developer

**Akash Bhadane** — Java & .NET Full-Stack Software Engineer

| Field | Details |
|---|---|
| 📍 **Location** | Nashik, Maharashtra, India |
| 🎓 **Education** | PG-DAC (CDAC Mumbai) · B.Tech CSE (Sandip University, 7.99 CGPA) |
| 📧 **Email** | akashbhadane7227@gmail.com |
| 🔗 **LinkedIn** | [linkedin.com/in/akash-bhadane3501](https://linkedin.com/in/akash-bhadane3501) |
| 💻 **GitHub** | [github.com/AkashB1015](https://github.com/AkashB1015) |

### Technical Skills

| Category | Technologies |
|---|---|
| **Languages** | Java, C#, JavaScript (ES6+), SQL, C, C++ |
| **Java / Backend** | Spring Boot, Spring Security, Hibernate, JPA, Spring MVC, Spring Data JPA |
| **.NET Technologies** | ASP.NET Core, Entity Framework Core, Web API |
| **Frontend & Full-Stack** | React.js, Node.js, Express.js, HTML5, CSS3, Bootstrap |
| **Databases** | MySQL, PostgreSQL, MongoDB |
| **Core Concepts** | DSA, OOP, DBMS, REST API Design, Microservices, JWT, OAuth, RBAC, SDLC, Agile |
| **Tools & DevOps** | Git, GitHub, GitHub Actions, Maven, Docker, Kubernetes, Jenkins, CI/CD, Postman |
| **Cloud & Platforms** | AWS (EC2, S3), Oracle Cloud Infrastructure (OCI), Linux (Ubuntu), Windows |
| **AI / ML** | Machine Learning, Data Handling, Data Preprocessing |

---

## 🏗️ Featured Projects

### 1. RoadRescue — Smart Roadside Assistance Platform
> Full-stack roadside assistance logistics platform with dual Java/C# backend architecture.

- **Tech:** React.js, Spring Boot, ASP.NET Core (C#), MySQL, Razorpay, Google Maps API, JWT
- **Highlights:** Dual backend microservices, RBAC for 3 user groups, real-time tracking
- **GitHub:** [RoadRescue Repository](https://github.com/AkashB1015/RoadRescue-Smart-Services-Platform.git)

### 2. Think-X — Full-Stack Quiz Application
> Real-time interactive assessment engine with automated scoring and analytics.

- **Tech:** React.js, Node.js, Express.js, MongoDB, MySQL, REST API, JWT
- **Highlights:** Polyglot database schema, custom admin panel, dynamic quiz generation
- **GitHub:** [Think-X Repository](https://github.com/AkashB1015/Think-X-Quiz-Application-.git)

### 3. Cookify — Online Cookie Store Platform
> E-commerce storefront with polyglot persistence and role-based access control.

- **Tech:** React.js, Bootstrap, Spring Boot, Spring Data JPA, MongoDB, JWT
- **Highlights:** SQL + MongoDB persistence strategy, admin dashboard, cart & checkout flow
- **GitHub:** [Cookify Repository](https://github.com/AkashB1015/cookify-react-springboot-application.git)

---

## 📜 Certifications

| Certification | Issuer | Year |
|---|---|---|
| Oracle Cloud Infrastructure (OCI) Foundations Associate | Oracle | 2025 |
| AWS Cloud Training Program (3 Months) | NASSCOM | 2025 |
| IBM SkillsBuild — AI & Cloud Technologies | IBM SkillsBuild | 2024 |
| IBM SkillsBuild Cybersecurity Training | Edunet Foundation | 2024 |
| AWS Training Certificate | Coursera | 2024 |
| AI Training Program (ML Models & Data Handling) | Winjit Technologies | 2024 |

---

## ⚡ Getting Started

### Prerequisites
- **Node.js** v18+ installed
- **npm** or **yarn** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/AkashB1015/Akash_portfolio_site-.git

# Navigate to the project
cd Akash_portfolio_site-

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build production-optimized bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run OxLint for code quality checks |

---

## 📄 License

This project is private and built for personal portfolio use by **Akash Bhadane**.

---

<p align="center">
  <strong>Designed & Built by Akash Bhadane</strong><br/>
  <sub>© 2025 All Rights Reserved</sub>
</p>
