export const defaultProfile = {
  name: "Ibrahim Muhammad Sani",
  role: "Web & Mobile Developer",
  location: "Abuja, Nigeria",
  email: "imuhammadsani08@gmail.com",
  phone: "+2349025721503",
  heroGreeting: "Hi, I'm Ibrahim Muhammad Sani",
  heroIntro: "I create useful, expressive digital products for web and mobile.",
  aboutTitle: "About me",
  aboutText:
    "I am a web and mobile developer who enjoys turning ambitious ideas into clear, high-performance experiences. I am currently studying Computer Engineering at Ahmadu Bello University, Zaria, while sharpening my craft at Early Code Institute.",
  profileImage: "/me.jpg",
  heroImage: "/display.jpg",
  cvUrl: "",
  summary:
    "I build thoughtful digital products that make complex ideas feel simple, useful, and human. My work spans polished web experiences and cross-platform mobile applications.",
};

export const defaultProjects = [
  {
    id: "taskpal",
    title: "TaskPal",
    category: "web",
    description:
      "A focused task management workspace with authentication, priorities, due dates, reminders, and a calendar view for keeping work moving.",
    tech: ["Next.js", "React", "Firebase", "Tailwind CSS"],
    link: "https://taskpal-sand.vercel.app/",
    github: "",
    featured: true,
  },
  {
    id: "panora",
    title: "Panora",
    category: "web",
    description:
      "A modern news dashboard powered by the GNews API, with category filters, search, and a responsive reading experience.",
    tech: ["Next.js", "GNews API", "Tailwind CSS"],
    link: "#",
    github: "",
    featured: true,
  },
  {
    id: "unipeers",
    title: "Unipeers",
    category: "mobile",
    description:
      "A cross-platform student community app in development, designed for discovering peers, sharing resources, and collaborating across universities.",
    tech: ["React Native", "Expo", "Node.js"],
    link: "#",
    github: "",
    featured: true,
  },
];

export const defaultSkills = [
  "React.js",
  "Next.js",
  "JavaScript",
  "React Native",
  "Firebase",
  "Node.js",
  "Tailwind CSS",
  "Git & GitHub",
];

export const defaultContact = {
  heading: "Let's make something useful.",
  intro: "Have a product idea, a collaboration in mind, or a role to discuss? Send a message.",
  upwork: "https://www.upwork.com/freelancers/~01ad2742910a32eb39?mp_source=share",
  socials: {
    github: "https://github.com/msani01",
    linkedin: "https://linkedin.com/in/muhammad-sani-ibrahim-10aa33349",
    instagram: "https://instagram.com/ndagi_jnr",
    facebook: "https://www.facebook.com/share/1B5A3zs2yR/1",
    x: "https://x.com/ndagi_jnr",
    whatsapp: "https://wa.me/qr/5RWO6NFUQPXYP1",
  },
};

export const storageKeys = {
  profile: "msi-portfolio-profile",
  projects: "msi-portfolio-projects",
  skills: "msi-portfolio-skills",
  contact: "msi-portfolio-contact",
};