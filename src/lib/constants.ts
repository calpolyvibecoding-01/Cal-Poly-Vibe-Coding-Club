export const siteConfig = {
  name: "Vibe Coding Club",
  description:
    "A community of developers building real projects, learning new skills, and growing together.",
  email: "calpolyvibecoding@gmail.com",
  slackInviteUrl:
    "https://join.slack.com/t/calpolyvibecodingclub/shared_invite/zt-3rz3f4pmu-m75dMlQPGW4l8cN31nf6KQ",
  formInviteUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfR9glmxZbX9WbVEogkSJd5n_fUqbRRrNZF9MZuF-DJUtyFrg/viewform?usp=header",
  applicationForm:
    "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=2wING578lUSVNx03nMoq5z4zMVGTABlMow5kEbv25HNURUtVQVc4MkNGRjVBSEEzMDJKU0U3SVZEQS4u",
    location: ["Building 181 (Frost)", "Room 0102"],
  /**
   * The member app — sign-up, login, the build board, profile editing. A
   * SEPARATE Next.js deployment, proxied to look like a path on this site
   * (see next.config.ts's rewrites()) rather than linked to as a different
   * domain — by request, nothing about the URL bar should read as "left
   * the club's site."
   *
   * Points at /portal/join, NOT /portal/login: a signed-out visitor hitting
   * /portal/login sees a LOG IN form, asking for credentials someone who has
   * never had an account does not have — the opposite of "create account is
   * the default." /portal/join is the smart-redirect route built for exactly
   * this: signed in -> straight to /portal/me (their dashboard), signed out
   * -> the bare /portal sign-up. One URL correctly serves both "I'm new" and
   * "take me to my dashboard" depending on whether a session cookie is
   * already there.
   *
   * This is now the header's PRIMARY call-to-action ("Student Portal"), not
   * a nav item — see StickyHeader, where both the desktop button and the
   * mobile menu button navigate here directly. The old "Portal" nav tab and
   * "Join Us" button have swapped destinations entirely: Slack is the nav
   * item now, the member app is the CTA. By request.
   */
  memberPortalUrl: "/portal/join",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
  // Was "Portal" -> memberPortalUrl; now "Stay Connected" -> the Slack
  // invite. The header's CTA button took over the member-app link (see
  // memberPortalUrl's comment) and this nav item took over what "Join Us"
  // used to do — by request, a straight swap of the two destinations.
  //
  // The href IS the real Slack URL (not a "#" placeholder), so this still
  // works as a plain link with JS disabled or opened in a new tab. With JS,
  // StickyHeader intercepts a click on this exact href and opens the richer
  // Slack invite MODAL instead (meeting time, the interest-form alternative)
  // — see the `item.href === siteConfig.slackInviteUrl` checks there, the
  // same pattern the "#hash vs. real URL" branch already used for this spot.
  { label: "Stay Connected", href: siteConfig.slackInviteUrl },
] as const;

export const activities = [
  {
    title: "Weekly Meetings",
    description:
      "Hands-on sessions covering every aspect of coding, and utilizing AI.",
      schedule: "Fridays, 12PM - 2PM in Frost 0102.",
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
    tagline: "3rd Year · Business (Info Systems)",
    image: "/assets/leadership/kyle-stefan.svg",
    accent: "from-brand-900 to-brand-500",
    hoverHueShift: -6,
    hoverGlow: "rgba(109, 225, 215, 0.34)",
    linkedin: "https://www.linkedin.com/in/kyle-stefan/",
  },
  {
    name: "Sam Otto",
    role: "Vice President",
    tagline: "4th Year · Business (Finance)",
    image: "/assets/leadership/sam-otto.svg",
    accent: "from-brand-700 to-brand-400",
    hoverHueShift: -12,
    hoverGlow: "rgba(109, 225, 215, 0.28)",
    linkedin: "https://www.linkedin.com/in/sotto27/",
  },
  {
    name: "Luke Vieira",
    role: "Director of Operations",
    tagline: "3rd Year · Industrial Engineering",
    image: "/assets/leadership/luke-vieira.svg",
    accent: "from-brand-700 to-brand-400",
    hoverHueShift: 8,
    hoverGlow: "rgba(109, 225, 215, 0.3)",
    linkedin: "https://www.linkedin.com/in/vieiraluke/",
  },
  {
    name: "Caitlyn Eggert",
    role: "Director of Marketing",
    tagline: "3rd Year · Business (Marketing)",
    image: "/assets/leadership/caitlyn-eggert.svg",
    accent: "from-brand-600 to-brand-300",
    hoverHueShift: 22,
    hoverGlow: "rgba(109, 225, 215, 0.32)",
    linkedin: "https://www.linkedin.com/in/caitlyneggert/",
  },
  {
    name: "Miles Clarke",
    role: "Treasurer",
    tagline: "3rd Year · Business (Finance)",
    image: "/assets/leadership/miles-clarke.svg",
    accent: "from-brand-800 to-brand-500",
    hoverHueShift: 14,
    hoverGlow: "rgba(109, 225, 215, 0.31)",
    linkedin: "https://www.linkedin.com/in/milesclarke2/",
  },
  {
    name: "Jack Gross",
    role: "Ambassador",
    tagline: "3rd Year · Business (Info Systems)",
    // No headshot on file yet for the three ambassadors below — reusing the
    // existing placeholder portrait (same fallback Abdullah's entry used
    // before him). Swap in a real photo once you have one.
    image: "/assets/leadership/luke-vieira.svg",
    accent: "from-brand-800 to-brand-400",
    hoverHueShift: 18,
    hoverGlow: "rgba(109, 225, 215, 0.29)",
    linkedin: "https://www.linkedin.com/in/jacktgross/",
  },
  {
    name: "Alida Zanettini",
    role: "Ambassador",
    tagline: "4th Year · Business (Info Systems)",
    image: "/assets/leadership/luke-vieira.svg",
    accent: "from-brand-600 to-brand-300",
    hoverHueShift: -18,
    hoverGlow: "rgba(109, 225, 215, 0.33)",
    linkedin: "https://www.linkedin.com/in/alida-zanettini/",
  },
  {
    name: "Sophie Moran",
    role: "Ambassador",
    tagline: "3rd Year · Business (Finance)",
    image: "/assets/leadership/luke-vieira.svg",
    accent: "from-brand-900 to-brand-500",
    hoverHueShift: 4,
    hoverGlow: "rgba(109, 225, 215, 0.27)",
    linkedin: "https://www.linkedin.com/in/sophiemoranh/",
  },
] as const;

export const openLeadershipRoles: readonly { title: string }[] = [];

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
