export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cal Poly Vibe Coding Club",
    alternateName: "CPVC",
    url: "https://www.calpolyvibecoding.com",
    logo: "https://www.calpolyvibecoding.com/assets/CPVC_Full_Logo.png",
    description:
      "Cal Poly SLO's AI and vibe coding club. Weekly workshops, hackathons, and a community of builders turning ideas into real projects with AI. No coding experience required.",
    email: "calpolyvibecoding@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Luis Obispo",
      addressRegion: "CA",
      addressCountry: "US",
    },
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "California Polytechnic State University San Luis Obispo",
      url: "https://www.calpoly.edu",
    },
    sameAs: [
      "https://www.instagram.com/calpolyvibecoding/",
      "https://www.linkedin.com/company/cal-poly-vibe-coding/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
