import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import {
  benefitGroups,
  hackathon,
  tiers,
  type Benefit,
} from "@/lib/giving";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Sponsor the CPVC × OCOB AI Hackathon (November 13–15, 2026) or make a gift to Cal Poly Vibe Coding. See what each sponsorship level includes.",
  alternates: { canonical: "/give" },
};

const DARK_CARD = {
  background: "rgb(var(--color-dark-rgb))",
  boxShadow:
    "0 16px 40px rgba(var(--color-dark-rgb),0.22), inset 0 1px 0 rgba(var(--color-light-rgb),0.08)",
};

function groupBenefits(benefits: readonly Benefit[]) {
  return benefitGroups
    .map((group) => ({
      group,
      items: benefits.filter((benefit) => benefit.group === group),
    }))
    .filter((entry) => entry.items.length > 0);
}

const linkClass =
  "btn btn-primary btn-jiggle group w-full justify-center gap-2 border border-black py-4 text-base shadow-md shadow-zinc-950/20 sm:w-auto sm:px-8";
const secondaryLinkClass =
  "btn btn-secondary btn-jiggle group w-full justify-center gap-2 py-4 text-base sm:w-auto sm:px-8";
const arrow =
  "h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5";

export default function GivePage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <header className="border-b border-neutral-200">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" aria-label="Cal Poly Vibe Coding Club home">
            <Image
              src="/assets/CPVC_Full_Cropped.png"
              alt="Cal Poly Vibe Coding Club logo"
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-black/70 transition-colors hover:text-black"
          >
            Back to site
          </Link>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="section-header mb-10 md:mb-12">
            <p className="section-kicker">
              {hackathon.name} · {hackathon.dates}
            </p>
            <h1 className="section-title mb-6 max-w-4xl">
              Sponsor a weekend of students building with AI
            </h1>
            <p className="section-intro !font-medium !leading-relaxed">
              250 students from every major and three campuses spend a weekend
              building working products with AI. Sponsorship is built around
              the four things a company takes away from a hackathon:
              candidates, product adoption, engagement with students, and
              visible contribution.
            </p>
          </div>

          <dl className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 md:grid-cols-4">
            {hackathon.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse justify-end gap-2 bg-white p-5 md:p-6"
              >
                <dt className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  {stat.label}
                </dt>
                <dd className="text-4xl font-light leading-none tracking-[-0.03em] text-black">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.sponsorPaypalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              CPVC Sponsor PayPal Page
              <ArrowUpRight className={arrow} />
            </a>
            <a
              href={siteConfig.givingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryLinkClass}
            >
              CPVC Giving Link
              <ArrowUpRight className={arrow} />
            </a>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-labelledby="levels-heading">
        <div className="container">
          <div className="section-rule mb-12" />
          <p className="section-kicker">Sponsorship levels</p>
          <h2
            id="levels-heading"
            className="mb-3 text-3xl tracking-tight text-black md:text-4xl"
          >
            What each level includes
          </h2>
          <p className="section-intro mb-10 !font-medium !leading-relaxed">
            Each level includes everything in the one before it. Sponsors join
            us Friday evening and Sunday; Saturday is a closed build day.
          </p>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tiers.map((tier, index) => (
              <article
                key={tier.name}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 p-6 md:p-7"
                style={DARK_CARD}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-700 to-brand-400"
                />
                <span className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/60">
                  {tier.name}
                </span>
                <p className="mb-1 !text-4xl !font-light !leading-none tracking-[-0.03em] !text-white">
                  {tier.amount}
                </p>
                <p className="mb-5 !text-xs !font-medium !leading-normal !text-white/60">
                  {index === 0
                    ? "Includes"
                    : `Everything in ${tiers[index - 1].name}, plus`}
                </p>
                <div className="mb-4 h-px bg-white/15" />

                <div className="flex flex-col gap-5">
                  {groupBenefits(tier.adds).map(({ group, items }) => (
                    <div key={group}>
                      <h3 className="mb-2 !font-sans !text-[11px] !font-semibold uppercase !leading-tight !tracking-[0.18em] !text-white/60">
                        {group}
                      </h3>
                      <ul className="flex flex-col gap-2.5">
                        {items.map((item) => (
                          <li
                            key={item.text}
                            className="flex gap-2.5 !text-sm !font-medium !leading-relaxed !text-white/85"
                          >
                            <Check
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 shrink-0"
                              style={{ color: "rgb(var(--color-accent-rgb))" }}
                            />
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-5 !text-sm !font-medium !leading-relaxed !text-neutral-600">
            Named challenges reach all ~65 teams from the first hour and are
            awarded Sunday.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container grid gap-5 md:grid-cols-2">
          <div className="card p-6 md:p-8">
            <h2 className="mb-3 text-2xl tracking-tight text-black">
              Give in kind
            </h2>
            <p className="!font-medium !leading-relaxed">
              In-kind counts toward a level. Platform or API credits, prize
              hardware, a catered meal, event swag, or a 30-minute pitch
              session with the winning team, valued at the equivalent cash
              level.
            </p>
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="mb-3 text-2xl tracking-tight text-black">
              General support gift
            </h2>
            <p className="mb-6 !font-medium !leading-relaxed">
              Any amount. An outright gift with no sponsorship benefits,
              recognition, access, or goods or services.
            </p>
            <a
              href={siteConfig.givingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-jiggle group w-full justify-center gap-2 border border-black sm:w-auto"
            >
              CPVC Giving Link
              <ArrowUpRight className={arrow} />
            </a>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container">
          <div className="section-rule mb-12" />
          <h2 className="mb-3 text-2xl tracking-tight text-black md:text-3xl">
            Interested in getting involved?
          </h2>
          <p className="section-intro mb-8 !font-medium !leading-relaxed">
            Commitments by {hackathon.commitDeadline} appear in all printed
            materials.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {hackathon.contacts.map((contact) => (
              <li key={contact.email} className="card p-5">
                <p className="!text-base !font-semibold !leading-snug !text-black">
                  {contact.name}
                </p>
                <p className="mb-2 !text-sm !font-medium !leading-snug !text-neutral-600">{contact.role}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm font-medium text-black underline underline-offset-4 hover:text-black/70"
                >
                  {contact.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
