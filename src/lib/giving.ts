/**
 * Content for the /give page — sponsorship levels for the CPVC x OCOB AI
 * Hackathon. Source: "CPVC x OCOB AI Hackathon Sponsorship and Giving" PDF.
 * Update here if the tiers or benefits change; the page renders from this.
 */

export const hackathon = {
  name: "CPVC × OCOB AI Hackathon",
  dates: "November 13–15, 2026",
  commitDeadline: "October 9",
  stats: [
    { value: "250", label: "Participants" },
    { value: "5", label: "Tracks" },
    { value: "~65", label: "Teams" },
    { value: "3", label: "Campuses: Cal Poly, USC, UCSB" },
  ],
  contacts: [
    {
      name: "Kyle Stefan",
      role: "Student President, CPVC",
      email: "knstefan@calpoly.edu",
    },
    {
      name: "Leida Chen",
      role: "AI Faculty Fellow, OCOB",
      email: "lchen24@calpoly.edu",
    },
  ],
} as const;

export const benefitGroups = [
  "Qualified candidates",
  "Product adoption",
  "Engagement with students",
  "Visible contribution",
] as const;

export type BenefitGroup = (typeof benefitGroups)[number];

export interface Benefit {
  group: BenefitGroup;
  text: string;
}

export interface Tier {
  name: string;
  amount: string;
  /** Benefits that first appear at this tier. Higher tiers include all lower ones. */
  adds: readonly Benefit[];
}

export const tiers: readonly Tier[] = [
  {
    name: "Community",
    amount: "$500",
    adds: [
      {
        group: "Qualified candidates",
        text: "Post-event participation report: colleges, majors, and project themes",
      },
      {
        group: "Product adoption",
        text: "Your platform credits in every participant's hands at check-in",
      },
      {
        group: "Visible contribution",
        text: "Logo on the event site, signage, submission platform, and announcements",
      },
    ],
  },
  {
    name: "Supporting",
    amount: "$1,000",
    adds: [
      {
        group: "Qualified candidates",
        text: "Opt-in participant resume book",
      },
      {
        group: "Engagement with students",
        text: "Sponsor table at the Friday kickoff, and the Sunday gallery meeting teams at their projects",
      },
      {
        group: "Visible contribution",
        text: "Logo on the event shirt, plus a named hospitality moment: a meal, coffee station, or awards reception",
      },
    ],
  },
  {
    name: "Challenge",
    amount: "$2,500",
    adds: [
      {
        group: "Product adoption",
        text: "Named challenge: your prompt and prize, announced Friday before building starts",
      },
      {
        group: "Product adoption",
        text: "Friday workshop slot, 45 minutes, taught on your platform",
      },
      {
        group: "Engagement with students",
        text: "Judge seat on the panel",
      },
    ],
  },
  {
    name: "Presenting",
    amount: "$5,000",
    adds: [
      {
        group: "Qualified candidates",
        text: "30-minute session with the Grand Prize team",
      },
      {
        group: "Engagement with students",
        text: "Friday main-stage keynote, 20 minutes (shared if more than one Presenting sponsor)",
      },
    ],
  },
];
