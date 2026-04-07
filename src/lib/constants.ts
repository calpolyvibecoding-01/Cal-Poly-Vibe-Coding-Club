export const siteConfig = {
  name: "Vibe Coding Club",
  description:
    "A community of developers building real projects, learning new skills, and growing together.",
  email: "calpolyvibecoding@gmail.com",
  slackInviteUrl: "https://join.slack.com/t/calpolyvibecodingclub/shared_invite/zt-3rz3f4pmu-m75dMlQPGW4l8cN31nf6KQ",
  formInviteUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdVtJ6Rsoq_XNuWrytZPqk2C1y2-8pccYIdyYrrwZ6yi3mdBQ/viewform",
  applicationForm:
    "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=2wING578lUSVNx03nMoq5z4zMVGTABlMow5kEbv25HNURUtVQVc4MkNGRjVBSEEzMDJKU0U3SVZEQS4u",
  location: ["Building 003, Business Silo", ""],
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
] as const;

export const activities = [
  {
    title: "Weekly Meetings",
    description:
      "Hands-on sessions covering every aspect of coding, and utilizing AI.",
    schedule: "Fridays, 11AM in the Business Silo.",
    glowColor: [109, 225, 215] as [number, number, number],
    icon: "code2" as const,
  },
  {
    title: "Hackathons",
    description:
      "Themed hackathons to build real products, experiment with new technologies, and push AI skills to the limit.",
    schedule: "First hackathon in development, date will be released soon!",
    glowColor: [84, 107, 133] as [number, number, number],
    icon: "sparkles" as const,
  },
  {
    title: "Hands on Workshops",
    description:
      "Collaborate on meaningful open source projects and contribute to tools used by thousands of developers worldwide.",
    glowColor: [57, 164, 157] as [number, number, number],
    icon: "users" as const,
  },
  {
    title: "Tech Talks",
    description:
      "Industry professionals and senior members share insights on career development, system design, and navigating the tech landscape.",
    glowColor: [13, 29, 48] as [number, number, number],
    icon: "lightbulb" as const,
  },
] as const;

export const marqueeItems = [
  "Build Real Projects",
  "Find a Community",
  "Weekly Workshops",
  "Live Demonstrations",
  "Learn By Doing",
  "Code Reviews",
  "Tech Talks",
] as const;

export const leadershipMembers = [
  {
    name: "Kyle Stefan",
    role: "President",
    tagline: "Club Vision Lead",
    image: "/assets/leadership/kyle-stefan.svg",
    accent: "from-brand-900 to-brand-500",
    hoverHueShift: -6,
    hoverGlow: "rgba(109, 225, 215, 0.34)",
    linkedin: "https://www.linkedin.com/in/kyle-stefan/",
  },
  {
    name: "Sam Otto",
    role: "Vice President",
    tagline: "Club Strategy Lead",
    image: "/assets/leadership/sam-otto.svg",
    accent: "from-brand-700 to-brand-400",
    hoverHueShift: -12,
    hoverGlow: "rgba(109, 225, 215, 0.28)",
    linkedin: "https://www.linkedin.com/in/sotto27/",
  },
  {
    name: "Caitlyn Eggert",
    role: "VP of Marketing",
    tagline: "Brand Growth Lead",
    image: "/assets/leadership/caitlyn-eggert.svg",
    accent: "from-brand-600 to-brand-300",
    hoverHueShift: 22,
    hoverGlow: "rgba(109, 225, 215, 0.32)",
    linkedin: "https://www.linkedin.com/in/caitlyneggert/",
  },
  {
    name: "Abdullah Anwar",
    role: "VP of Recruitment",
    tagline: "Recruitment Lead",
    image: "/assets/leadership/luke-vieira.svg",
    accent: "from-brand-700 to-brand-400",
    hoverHueShift: 8,
    hoverGlow: "rgba(109, 225, 215, 0.3)",
    linkedin: "https://www.linkedin.com/in/abdullah-a-anwar/",
  },
  {
    name: "Luke Vieira",
    role: "Director of Operations",
    tagline: "Operations Support Lead",
    image: "/assets/leadership/luke-vieira.svg",
    accent: "from-brand-700 to-brand-400",
    hoverHueShift: 8,
    hoverGlow: "rgba(109, 225, 215, 0.3)",
    linkedin: "https://www.linkedin.com/in/vieiraluke/",
  },
  {
    name: "Miles Clarke",
    role: "Treasurer",
    tagline: "Budget Planning Lead",
    image: "/assets/leadership/miles-clarke.svg",
    accent: "from-brand-800 to-brand-500",
    hoverHueShift: 14,
    hoverGlow: "rgba(109, 225, 215, 0.31)",
    linkedin: "https://www.linkedin.com/in/milesclarke2/",
  },
  {
    name: "Kyle Morgan",
    role: "Webmaster",
    tagline: "Website Lead",
    image: "/assets/leadership/kyle-morgan.svg",
    accent: "from-brand-900 to-brand-600",
    hoverHueShift: -9,
    hoverGlow: "rgba(109, 225, 215, 0.3)",
    linkedin: "https://www.linkedin.com/in/kyle-morgan0/",
  },
  {
    name: "Lucas Winger",
    role: "Director of Digital Media",
    tagline: "Creative Assets Lead",
    image: "/assets/leadership/lucas-winger.svg",
    accent: "from-brand-800 to-brand-400",
    hoverHueShift: 26,
    hoverGlow: "rgba(109, 225, 215, 0.3)",
    linkedin: "https://www.linkedin.com/in/lucaswinger/",
  },
] as const;

export const openLeadershipRoles = [] as const;

export const projects = [
  {
    title: "Example Project 1",
    category: "Web App",
    description:
      "Some project that is vibe coded that is really cool and inspiring.",
    image:
      "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjBkYXJrJTIwbW9kZXJuJTIwVUl8ZW58MXx8fHwxNzcyNDg0NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React", "Node.js", "PostgreSQL"],
    accent: "from-brand-700 to-brand-400",
    year: "2025",
    featured: true,
  },
  {
    title: "Example Project 2",
    category: "CLI Tool",
    description:
      "Some project that is vibe coded that is really cool and inspiring.",
    image:
      "https://images.unsplash.com/photo-1753998943413-8cba1b923c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZWRpdG9yJTIwdGVybWluYWwlMjBkYXJrJTIwc2NyZWVufGVufDF8fHx8MTc3MjQ4NDYyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Rust", "TUI", "GitHub API"],
    accent: "from-brand-800 to-brand-500",
    year: "2024",
    featured: false,
  },
  {
    title: " Example Project 3",
    category: "Data Viz",
    description:
      "Some project that is vibe coded that is really cool and inspiring.",
    image:
      "https://images.unsplash.com/photo-1762279389020-eeeb69c25813?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGNoYXJ0JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcyNDg0NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["D3.js", "WebSockets", "Express"],
    accent: "from-brand-600 to-brand-300",
    year: "2024",
    featured: false,
  },
] as const;
