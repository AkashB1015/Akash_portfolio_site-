export const projects = [
  {
    id: "roadrescue",
    title: "RoadRescue — Smart Roadside Assistance Platform",
    subtitle: "Enterprise Vehicle Service & Logistics Management",
    tags: ["React.js", "Spring Boot", "ASP.NET Core (C#)", "Bootstrap", "MySQL", "REST API", "JWT", "Google Maps API", "Razorpay"],
    description: "Engineered a production-ready, full-stack roadside assistance logistics platform that connects stranded users with nearby service providers in real-time. Features a rare and robust dual-backend architecture implemented in both Spring Boot (Java) and ASP.NET Core (C#) to handle distinct microservices, demonstrating deep cross-stack server proficiency. Designed and secured RESTful endpoints with JWT authentication and strict Role-Based Access Control (RBAC) across User, Provider, and Admin portals. Integrated Razorpay for payments and Google Maps API for real-time tracking.",
    githubUrl: "https://github.com/AkashB1015/RoadRescue-Smart-Services-Platform.git",
    // Replace with project screenshot or visual mockup when available
    imageUrl: null /* TODO: replace with project screenshot or mock frame */,
    features: [
      "Dual Backend: Spring Boot & ASP.NET Core microservices",
      "Role-Based Access Control (RBAC) for 3 distinct user groups",
      "Razorpay payment gateway integration for secure transactions",
      "Google Maps API integration for real-time provider tracking"
    ]
  },
  {
    id: "think-x",
    title: "Think-X — Full-Stack Quiz Application",
    subtitle: "Real-time Interactive Assessment Engine",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "MySQL", "RESTful API", "JWT"],
    description: "Designed and built a modern, responsive full-stack online quiz and student assessment web application. The platform features an interactive quiz dashboard with real-time score evaluation, automatic timers, and detailed performance summaries. Supported by a robust MERN (MongoDB, Express.js, React, Node.js) and MySQL backend that secures user data, tracks scores, and serves dynamic quiz sets based on category. Implemented authentication and custom admin control panels for quiz curation.",
    githubUrl: "https://github.com/AkashB1015/Think-X-Quiz-Application-.git",
    imageUrl: null /* TODO: replace with project screenshot or mock frame */,
    features: [
      "Real-time scoring and instant, detailed performance analytics",
      "Secure user registration and role-based permissions (Student/Admin)",
      "Dynamic assessment generation with MySQL & MongoDB database models",
      "Polished, mobile-responsive dashboard UI using modern React hooks"
    ]
  },
  {
    id: "cookify",
    title: "Cookify — Online Cookie Store Platform",
    subtitle: "E-Commerce System with Polyglot Persistence",
    tags: ["React.js", "Bootstrap", "Spring Boot", "Spring Data JPA", "MongoDB", "REST API", "JWT"],
    description: "Architected a full-stack e-commerce store platform for custom cookie ordering, featuring a responsive React.js storefront and a modular Spring Boot REST API. Integrated JWT authentication with Role-Based Access Control (RBAC) to separate Customer checkout flows from Admin inventories. Implemented a polyglot persistence strategy using Spring Data JPA for structured relational transactions (such as orders and user accounts) alongside MongoDB for flexible, high-throughput product catalog and raw inventory schemas, illustrating deep database architectural knowledge.",
    githubUrl: "https://github.com/AkashB1015/cookify-react-springboot-application.git",
    imageUrl: null /* TODO: replace with project screenshot or mock frame */,
    features: [
      "Full-stack cookie e-commerce storefront with cart and checkout flow",
      "JWT authentication with Role-Based Access Control for Customer/Admin roles",
      "Polyglot persistence: Spring Data JPA (relational) + MongoDB (catalog/inventory)",
      "Admin dashboard for product and inventory management"
    ]
  }
];
