import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Star,
  MapPin,
  Clock,
  RotateCcw,
  Check,
  Heart,
  MessageCircle,
  CalendarCheck,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content — edit here                                               */
/* ------------------------------------------------------------------ */

const CONTACT = {
  email: "CLEEN.UP@OUTLOOK.COM",
  phone: "07352 833978",
  phoneHref: "tel:+447352833978",
  website: "https://cleenup.uk",
  websiteLabel: "cleenup.uk",
  booking: "https://calendly.com/cleen-up/30min",
};

/*
 * Package prices and inclusions as set by the owner (26 Oct 2026).
 * Prices in GBP. Standard and Plus are one-off; Recurring is monthly.
 */
const PACKAGES = [
  {
    name: "Standard",
    kicker: "One-off",
    price: "£79",
    priceNote: "one-off",
    summary: "The essentials, put right.",
    intro: "A one-off set-up of the places customers find you first.",
    bestFor: "Best for getting the basics right, fast.",
    items: [
      "Website creation included",
      "Google Business Profile checked and corrected: name, address, phone, hours and categories",
      "Fresh photos added to your profile",
      "Replies to your existing reviews",
      "Contact details made consistent wherever customers look",
    ],
    tone: "dark" as const,
  },
  {
    name: "Plus",
    kicker: "One-off",
    price: "£149",
    priceNote: "one-off",
    summary: "Everything in Standard, then your website and socials.",
    intro: "For businesses that want the whole online picture to match.",
    bestFor: "Best for a full refresh of how you look online.",
    items: [
      "Everything in CleenUp Standard",
      "Standard website creation and design, built once",
      "Website tidied up: clearer wording, works properly on a phone",
      "Easy-to-find call, book and enquiry buttons",
      "Broken links and errors fixed, plus basic search set-up",
      "Social media profiles brought in line with the rest",
    ],
    tone: "light" as const,
  },
  {
    name: "Recurring",
    kicker: "Monthly",
    price: "£499",
    priceNote: "per month",
    summary: "We keep it all up to date, every month.",
    intro: "A simple monthly arrangement for owners who want it handled.",
    bestFor: "Best for owners who want it looked after for them.",
    items: [
      "Site and Google account regularly maintained each month",
      "New reviews monitored and replied to",
      "Social profiles kept consistent",
      "Further business analytics",
      "One-to-one monthly review with us",
    ],
    tone: "dark" as const,
  },
];

/*
 * REVIEWS: only add genuine reviews you have permission to publish.
 * While this list is empty, clearly marked placeholders are shown instead.
 * Replace before the site goes live.
 */
type Review = { quote: string; name: string; business: string; source?: string };
const REVIEWS: Review[] = [];

/* Third-party statistics — verified 21 Oct 2026 against the source below. */
const STAT_SOURCE = {
  label: "BrightLocal, Local Consumer Review Survey 2026",
  detail: "Survey of 1,002 US consumers, published February 2026",
  url: "https://www.brightlocal.com/research/local-consumer-review-survey/",
};

/* ------------------------------------------------------------------ */
/*  Building blocks                                                   */
/* ------------------------------------------------------------------ */

const scrollTo = (id: string) => (e?: React.MouseEvent) => {
  e?.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Section = ({
  id,
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
}) => (
  <section id={id} aria-labelledby={labelledBy} className={`py-20 md:py-28 scroll-mt-20 ${className}`}>
    <div className="container mx-auto px-5 sm:px-6 max-w-6xl">{children}</div>
  </section>
);

const FadeIn = ({ children, delay = 0, y = 20 }: { children: React.ReactNode; delay?: number; y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) => (
  <span
    className={`inline-block text-xs font-bold tracking-widest uppercase mb-4 ${
      onDark ? "text-accent" : "text-accent-ink"
    }`}
  >
    {children}
  </span>
);

const SectionHeading = ({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) => (
  <div className="max-w-2xl mb-12 md:mb-14">
    <FadeIn>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-4xl md:text-5xl font-serif text-foreground leading-[1.08] mb-5">
        {title}
      </h2>
      {intro && <p className="text-lg text-muted-foreground leading-relaxed">{intro}</p>}
    </FadeIn>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Flip card — click / tap / keyboard, plus hover on mouse devices.  */
/*  Height grows to fit the taller face: no fixed heights.            */
/* ------------------------------------------------------------------ */

function useCanHover() {
  const [canHover, setCanHover] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const on = () => setCanHover(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return canHover;
}

function FlipCard({
  label,
  front,
  back,
  className = "",
}: {
  label: string;
  front: React.ReactNode;
  back: (flipBack: () => void) => React.ReactNode;
  className?: string;
}) {
  const [pinned, setPinned] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const canHover = useCanHover();
  const reduceMotion = useReducedMotion();
  const flipped = pinned || (canHover && hovered);
  const frontBtn = React.useRef<HTMLButtonElement>(null);
  const backFace = React.useRef<HTMLDivElement>(null);

  const flipOpen = () => {
    setPinned(true);
    // Keep keyboard focus inside the visible face once the card turns over.
    requestAnimationFrame(() => backFace.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true }));
  };

  const flipBack = () => {
    setPinned(false);
    setHovered(false);
    requestAnimationFrame(() => frontBtn.current?.focus());
  };

  const face = "col-start-1 row-start-1 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";
  const motionStyle: React.CSSProperties = reduceMotion
    ? { transition: "opacity 0.25s ease" }
    : { transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)", transformStyle: "preserve-3d" };

  return (
    <div
      className={`[perspective:1400px] h-full ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="grid h-full"
        style={{
          ...motionStyle,
          transform: !reduceMotion && flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <button
          ref={frontBtn}
          type="button"
          aria-expanded={flipped}
          aria-label={`${label}: show details`}
          onClick={flipOpen}
          inert={flipped ? true : undefined}
          className={`${face} text-left h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/70`}
          style={reduceMotion ? { opacity: flipped ? 0 : 1, pointerEvents: flipped ? "none" : "auto" } : undefined}
        >
          {front}
        </button>
        <div
          ref={backFace}
          className={`${face} h-full`}
          inert={!flipped ? true : undefined}
          aria-hidden={!flipped}
          style={
            reduceMotion
              ? { opacity: flipped ? 1 : 0, pointerEvents: flipped ? "auto" : "none" }
              : { transform: "rotateY(180deg)" }
          }
        >
          {back(flipBack)}
        </div>
      </div>
    </div>
  );
}

const FlipHint = ({ onDark, children }: { onDark: boolean; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center gap-2 text-sm font-semibold ${onDark ? "text-accent" : "text-primary"}`}
  >
    <RotateCcw className="w-4 h-4" aria-hidden="true" />
    {children}
  </span>
);

const FlipBackButton = ({ onClick, onDark }: { onClick: () => void; onDark: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm px-2 py-1 -mx-2 focus-visible:outline-none focus-visible:ring-2 ${
      onDark
        ? "text-primary-foreground/70 hover:text-primary-foreground focus-visible:ring-accent"
        : "text-muted-foreground hover:text-foreground focus-visible:ring-primary"
    }`}
  >
    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
    Flip back
  </button>
);

/* ------------------------------------------------------------------ */
/*  Navigation                                                        */
/* ------------------------------------------------------------------ */

function Navbar() {
  return (
    <nav aria-label="Main" className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-5 sm:px-6 h-16 md:h-20 flex items-center justify-between max-w-6xl">
        <a href="#top" onClick={scrollTo("top")} className="text-2xl font-serif font-bold text-primary tracking-tight">
          CleenUp.
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground">
          <a href="#packages" onClick={scrollTo("packages")} className="hover:text-accent-ink transition-colors">Packages</a>
          <a href="#examples" onClick={scrollTo("examples")} className="hover:text-accent-ink transition-colors">Examples</a>
          <a href="#contact" onClick={scrollTo("contact")} className="hover:text-accent-ink transition-colors">Contact</a>
        </div>
        <a
          href={CONTACT.booking}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 md:px-5 h-10 text-sm font-semibold transition-colors"
        >
          <span className="hidden sm:inline">Book a free call</span>
          <span className="sm:hidden">Free call</span>
        </a>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Introduction + growth chart                                    */
/* ------------------------------------------------------------------ */

const CHART_POINTS = [12, 14, 13, 18, 21, 20, 26, 31, 34, 41, 46, 54];

function GrowthChart() {
  const reduceMotion = useReducedMotion();
  const w = 480;
  const h = 260;
  const pad = { l: 46, r: 18, t: 20, b: 34 };
  const max = 60;
  const xs = (i: number) => pad.l + (i * (w - pad.l - pad.r)) / (CHART_POINTS.length - 1);
  const ys = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b);
  const line = CHART_POINTS.map((v, i) => `${i === 0 ? "M" : "L"}${xs(i).toFixed(1)},${ys(v).toFixed(1)}`).join(" ");
  const area = `${line} L${xs(CHART_POINTS.length - 1)},${h - pad.b} L${xs(0)},${h - pad.b} Z`;
  const ticks = [0, 20, 40, 60];
  const months = ["Jan", "", "", "Apr", "", "", "Jul", "", "", "Oct", "", "Dec"];
  const last = CHART_POINTS.length - 1;

  return (
    <figure className="bg-primary text-primary-foreground p-5 sm:p-7 shadow-[0_30px_60px_-30px_hsl(160_50%_15%/0.6)]">
      <figcaption className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-xs font-bold tracking-widest uppercase text-accent mb-1">Growth</div>
          <div className="font-serif text-2xl sm:text-3xl leading-tight">More visibility, more chances to win work</div>
        </div>
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider border border-primary-foreground/25 text-primary-foreground/75 px-2 py-1">
          Illustration
        </span>
      </figcaption>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-auto"
        role="img"
        aria-label="Illustrative line chart rising steadily from January to December, with pound values on the vertical axis. Not real client data."
      >
        <defs>
          <linearGradient id="cu-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(40 90% 55%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(40 90% 55%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={w - pad.r} y1={ys(t)} y2={ys(t)} stroke="hsl(40 20% 98% / 0.12)" strokeDasharray={t === 0 ? undefined : "3 5"} />
            <text x={pad.l - 10} y={ys(t) + 4} textAnchor="end" fontSize="12" fill="hsl(40 20% 98% / 0.65)" fontFamily="Inter, sans-serif">
              £{t}k
            </text>
          </g>
        ))}
        {months.map((m, i) =>
          m ? (
            <text key={i} x={xs(i)} y={h - 10} textAnchor="middle" fontSize="12" fill="hsl(40 20% 98% / 0.65)" fontFamily="Inter, sans-serif">
              {m}
            </text>
          ) : null,
        )}
        <motion.path
          d={area}
          fill="url(#cu-area)"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="hsl(40 90% 55%)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <circle cx={xs(last)} cy={ys(CHART_POINTS[last])} r="6" fill="hsl(40 90% 55%)" stroke="hsl(160 50% 25%)" strokeWidth="3" />
        <g transform={`translate(${xs(last) - 34}, ${ys(CHART_POINTS[last]) - 34})`}>
          <circle cx="13" cy="13" r="13" fill="hsl(40 90% 55%)" />
          <text x="13" y="18.5" textAnchor="middle" fontSize="16" fontWeight="700" fill="hsl(160 80% 10%)" fontFamily="Fraunces, serif">
            £
          </text>
        </g>
      </svg>

      <p className="mt-3 text-xs text-primary-foreground/70 leading-relaxed">
        Illustrative only. This is not a CleenUp client result and results vary from business to business.
      </p>
    </figure>
  );
}

function Intro() {
  return (
    <section id="top" aria-labelledby="intro-title" className="bg-background pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="container mx-auto px-5 sm:px-6 max-w-6xl grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <FadeIn>
            <Eyebrow>Google · Websites · Social media · Ads</Eyebrow>
            <h1 id="intro-title" className="text-[2.6rem] leading-[1.05] sm:text-5xl md:text-6xl font-serif text-foreground mb-6">
              Look the part,{" "}
              <span className="italic text-primary">drive revenue.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
              CleenUp sorts out your Google Business Profile, website and social media, so people searching for what you
              do can find you, trust what they see and get in touch.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={CONTACT.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-accent text-accent-foreground hover:bg-accent/90 px-7 h-14 text-base font-semibold transition-colors"
              >
                Book a free 20-minute call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
              <a
                href="#packages"
                onClick={scrollTo("packages")}
                className="inline-flex items-center justify-center border border-primary/25 text-primary hover:bg-primary/5 px-7 h-14 text-base font-semibold transition-colors"
              >
                See the packages
              </a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">No jargon. Clear prices, agreed upfront.</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <GrowthChart />
          <aside
            aria-label="Why it matters"
            className="mt-4 bg-secondary/60 border-l-4 border-accent p-5 sm:p-6"
          >
            <p className="font-serif text-xl sm:text-2xl text-foreground leading-snug">
              <span className="text-primary font-semibold">97%</span> of consumers read reviews for local businesses, and{" "}
              <span className="text-primary font-semibold">80%</span> say they're likely to use a business that responds to all
              of its reviews.
            </p>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Source:{" "}
              <a href={STAT_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                {STAT_SOURCE.label}
              </a>
              . {STAT_SOURCE.detail}. Survey figures describe consumer behaviour, not guaranteed results.
            </p>
          </aside>
        </FadeIn>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Packages + 3. shared call-to-action flip card                  */
/* ------------------------------------------------------------------ */

function PackageCard({ pkg }: { pkg: (typeof PACKAGES)[number] }) {
  const dark = pkg.tone === "dark";
  return (
    <FlipCard
      label={`CleenUp ${pkg.name}`}
      front={
        <div
          className={`h-full min-h-[300px] p-7 sm:p-8 flex flex-col justify-between border ${
            dark ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border"
          }`}
        >
          <div>
            <div className={`text-xs font-bold tracking-widest uppercase mb-6 ${dark ? "text-accent" : "text-accent-ink"}`}>
              {pkg.kicker}
            </div>
            <div className={`font-serif text-lg ${dark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>CleenUp</div>
            <h3 className="font-serif text-4xl sm:text-5xl font-semibold leading-none mb-5">{pkg.name}</h3>
            <p className="mb-5 flex items-baseline gap-2">
              <span className="font-serif text-4xl font-semibold">{pkg.price}</span>
              <span className={`text-sm ${dark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{pkg.priceNote}</span>
            </p>
            <p className={`text-base ${dark ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{pkg.summary}</p>
          </div>
          <div className="mt-8">
            <p className={`text-sm mb-5 pt-5 border-t ${dark ? "border-primary-foreground/15 text-primary-foreground/70" : "border-border text-muted-foreground"}`}>
              {pkg.bestFor}
            </p>
            <FlipHint onDark={dark}>See what's included</FlipHint>
          </div>
        </div>
      }
      back={(flipBack) => (
        <div
          className={`h-full p-7 sm:p-8 flex flex-col border ${
            dark ? "bg-card text-foreground border-border" : "bg-primary text-primary-foreground border-primary"
          }`}
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-serif text-2xl font-semibold">
              CleenUp {pkg.name}
              <span className={`block font-sans text-sm font-semibold mt-1 ${dark ? "text-primary" : "text-accent"}`}>
                {pkg.price} {pkg.priceNote}
              </span>
            </h3>
            <FlipBackButton onClick={flipBack} onDark={!dark} />
          </div>
          <p className={`text-sm mb-5 ${dark ? "text-muted-foreground" : "text-primary-foreground/75"}`}>{pkg.intro}</p>
          <ul className="space-y-3 mb-6">
            {pkg.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-snug">
                <Check className={`w-4 h-4 mt-0.5 shrink-0 ${dark ? "text-primary" : "text-accent"}`} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={scrollTo("contact")}
            className={`mt-auto inline-flex items-center justify-center h-11 text-sm font-semibold transition-colors ${
              dark ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-accent text-accent-foreground hover:bg-accent/90"
            }`}
          >
            Ask about {pkg.name}
          </a>
        </div>
      )}
    />
  );
}

function Packages() {
  return (
    <Section id="packages" labelledBy="packages-title" className="bg-secondary/40">
      <SectionHeading
        id="packages-title"
        eyebrow="Packages"
        title="Three ways to work with us."
        intro="Start with the essentials, go further, or have it looked after every month. Tap or hover a card to see what's included."
      />

      <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {PACKAGES.map((pkg, i) => (
          <FadeIn key={pkg.name} delay={0.08 * i}>
            <PackageCard pkg={pkg} />
          </FadeIn>
        ))}
      </div>

      {/* 3. One shared, full-width flip card */}
      <div className="mt-5 lg:mt-6">
        <FadeIn delay={0.1}>
          <FlipCard
            label="Every business is different"
            front={
              <div className="h-full min-h-[200px] bg-accent text-accent-foreground p-8 sm:p-10 md:p-12 flex flex-col justify-center md:flex-row md:items-center md:justify-between gap-6">
                <p className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">Every business is different.</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold shrink-0">
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  Not sure which fits?
                </span>
              </div>
            }
            back={(flipBack) => (
              <div className="h-full bg-primary text-primary-foreground p-8 sm:p-10 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <CalendarCheck className="w-6 h-6 text-accent shrink-0" aria-hidden="true" />
                    <h3 className="font-serif text-2xl sm:text-3xl leading-tight">Start with a free 20-minute call.</h3>
                  </div>
                  <p className="text-primary-foreground/80 text-base sm:text-lg leading-relaxed max-w-2xl">
                    We'll get to know your business, look at how you show up online today and tell you honestly which
                    approach makes sense. No obligation.
                  </p>
                  <div className="mt-4">
                    <FlipBackButton onClick={flipBack} onDark />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-3">
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-6 text-sm font-semibold transition-colors"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" /> Call {CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}?subject=Free%2020-minute%20call`}
                    className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 hover:bg-primary-foreground/10 h-12 px-6 text-sm font-semibold transition-colors"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" /> Email us
                  </a>
                </div>
              </div>
            )}
          />
        </FadeIn>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Visual examples — illustrative mock-ups                        */
/* ------------------------------------------------------------------ */

const MockLabel = () => (
  <span className="absolute top-3 right-3 z-10 text-[10px] font-bold uppercase tracking-wider bg-foreground text-background px-2 py-1">
    Example mock-up
  </span>
);

function GoogleMock() {
  return (
    <div className="bg-white text-[#202124] rounded-xl shadow-sm border border-black/10 p-4 text-left" aria-hidden="true">
      <div className="grid grid-cols-3 gap-1.5 mb-3 rounded-lg overflow-hidden">
        <div className="h-16 bg-[hsl(160_35%_35%)]" />
        <div className="h-16 bg-[hsl(40_70%_70%)]" />
        <div className="h-16 bg-[hsl(160_25%_55%)]" />
      </div>
      <div className="font-semibold text-[15px] leading-tight">Your Business Name</div>
      <div className="flex items-center gap-1 text-[12px] mt-1">
        <span className="font-medium">4.8</span>
        <span className="flex text-[#fbbc04]">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-3 h-3 fill-current" />
          ))}
        </span>
        <span className="text-[#70757a]">(reviews)</span>
      </div>
      <div className="text-[12px] text-[#70757a] mt-0.5">Café · High Street</div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[
          { icon: Phone, t: "Call" },
          { icon: MapPin, t: "Directions" },
          { icon: Globe, t: "Website" },
        ].map(({ icon: Icon, t }) => (
          <div key={t} className="flex flex-col items-center gap-1 text-[11px] text-[#1a73e8]">
            <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center">
              <Icon className="w-3.5 h-3.5" />
            </span>
            {t}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[12px] mt-3 pt-3 border-t border-black/10">
        <Clock className="w-3.5 h-3.5 text-[#70757a]" />
        <span className="text-[#188038] font-medium">Open</span>
        <span className="text-[#70757a]">· Closes 6 pm</span>
      </div>
    </div>
  );
}

function WebsiteMock() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-black/10 overflow-hidden text-left" aria-hidden="true">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#f1f3f4] border-b border-black/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 flex-1 h-5 rounded bg-white text-[10px] text-[#70757a] flex items-center px-2">yourbusiness.co.uk</span>
      </div>
      <div className="p-4 bg-[hsl(40_30%_96%)]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-serif font-bold text-[13px] text-[hsl(160_50%_20%)]">Your Business</span>
          <span className="flex gap-2">
            <span className="w-6 h-1.5 rounded bg-black/15" />
            <span className="w-6 h-1.5 rounded bg-black/15" />
          </span>
        </div>
        <div className="font-serif text-[18px] leading-tight text-[hsl(160_40%_15%)] mb-2">
          Fresh bread, good coffee, open every day.
        </div>
        <div className="space-y-1.5 mb-4">
          <div className="h-1.5 rounded bg-black/10 w-11/12" />
          <div className="h-1.5 rounded bg-black/10 w-8/12" />
        </div>
        <div className="flex gap-2">
          <span className="text-[11px] font-semibold bg-[hsl(160_50%_25%)] text-white px-3 py-1.5">Call now</span>
          <span className="text-[11px] font-semibold border border-[hsl(160_50%_25%)] text-[hsl(160_50%_25%)] px-3 py-1.5">
            Book a table
          </span>
        </div>
      </div>
    </div>
  );
}

function SocialMock() {
  return (
    <div className="bg-white text-[#262626] rounded-xl shadow-sm border border-black/10 p-4 text-left" aria-hidden="true">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
          <span className="w-full h-full rounded-full bg-[hsl(160_50%_25%)] border-2 border-white flex items-center justify-center text-white font-serif text-sm font-bold">
            Y
          </span>
        </span>
        <div>
          <div className="text-[13px] font-semibold leading-tight">yourbusiness</div>
          <div className="text-[11px] text-[#737373]">Same name, photo and details as your Google profile</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {["hsl(40 70% 70%)", "hsl(160 35% 35%)", "hsl(40 40% 85%)", "hsl(160 25% 55%)", "hsl(40 90% 55%)", "hsl(160 50% 20%)"].map(
          (c, i) => (
            <div key={i} className="aspect-square" style={{ background: c }} />
          ),
        )}
      </div>
      <div className="flex items-center gap-3 mt-3 text-[#262626]">
        <Heart className="w-4 h-4" />
        <MessageCircle className="w-4 h-4" />
        <span className="ml-auto text-[11px] text-[#737373]">Posted this week</span>
      </div>
    </div>
  );
}

const EXAMPLES = [
  {
    title: "Google Business Profiles",
    mock: <GoogleMock />,
    text: "Correct details, opening hours and photos, with call, directions and website buttons that work.",
  },
  {
    title: "Websites",
    mock: <WebsiteMock />,
    text: "Clear wording that says what you do, a layout that works on a phone, and an obvious way to get in touch.",
  },
  {
    title: "Social media",
    mock: <SocialMock />,
    text: "Profiles that match the rest of your business, with up-to-date photos and recent activity.",
  },
];

function Examples() {
  return (
    <Section id="examples" labelledBy="examples-title" className="bg-background">
      <SectionHeading
        id="examples-title"
        eyebrow="What we work on"
        title="What good looks like."
        intro="Three areas we help with. These are illustrative mock-ups to show the kind of result we aim for, not client projects."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {EXAMPLES.map((ex, i) => (
          <FadeIn key={ex.title} delay={0.08 * i}>
            <article className="h-full flex flex-col bg-card border border-border">
              <div className="relative bg-secondary/60 p-6 sm:p-7">
                <MockLabel />
                <div className="pt-5">{ex.mock}</div>
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="font-serif text-2xl text-foreground mb-2">{ex.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{ex.text}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Reviews                                                        */
/* ------------------------------------------------------------------ */

function Reviews() {
  const showPlaceholders = REVIEWS.length === 0;
  const slots = showPlaceholders ? [0, 1, 2] : REVIEWS.slice(0, 3);

  return (
    <Section id="reviews" labelledBy="reviews-title" className="bg-secondary/40">
      <SectionHeading id="reviews-title" eyebrow="Reviews" title="What our customers say." />
      <div className="grid md:grid-cols-3 gap-6">
        {showPlaceholders
          ? (slots as number[]).map((i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className="h-full border-2 border-dashed border-primary/30 bg-background/60 p-7 flex flex-col">
                  <span className="self-start text-[10px] font-bold uppercase tracking-wider bg-destructive text-destructive-foreground px-2 py-1 mb-5">
                    Placeholder — replace before publishing
                  </span>
                  <p className="text-muted-foreground italic leading-relaxed flex-grow">
                    A genuine customer review goes here, quoted with the customer's permission.
                  </p>
                  <div className="pt-5 mt-6 border-t border-border text-sm text-muted-foreground">
                    Customer name · Business type and area
                  </div>
                </div>
              </FadeIn>
            ))
          : (slots as Review[]).map((r, i) => (
              <FadeIn key={r.name} delay={0.08 * i}>
                <figure className="h-full bg-background p-7 flex flex-col border-t-4 border-accent">
                  <blockquote className="text-foreground leading-relaxed flex-grow">“{r.quote}”</blockquote>
                  <figcaption className="pt-5 mt-6 border-t border-border">
                    <div className="font-semibold text-foreground">{r.name}</div>
                    <div className="text-sm text-muted-foreground">{r.business}</div>
                    {r.source && <div className="text-xs text-muted-foreground mt-1">{r.source}</div>}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Contact + footer                                               */
/* ------------------------------------------------------------------ */

function Contact() {
  const items = [
    { icon: Phone, label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Globe, label: "Website", value: CONTACT.websiteLabel, href: CONTACT.website },
  ];
  return (
    <Section id="contact" labelledBy="contact-title" className="bg-primary text-primary-foreground">
      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
        <FadeIn>
          <Eyebrow onDark>Get in touch</Eyebrow>
          <h2 id="contact-title" className="text-4xl md:text-5xl font-serif leading-[1.08] mb-5">
            Let's talk about your business.
          </h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-lg">
            Book a free 20-minute call, or just drop us a message. No forms and no obligation.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ul className="grid gap-3">
            {items.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(label === "Website" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 bg-primary-foreground/[0.06] border border-primary-foreground/15 hover:border-accent hover:bg-primary-foreground/10 px-5 sm:px-6 py-5 transition-colors"
                >
                  <span className="w-11 h-11 shrink-0 bg-accent/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold tracking-widest uppercase text-primary-foreground/70 mb-0.5">{label}</span>
                    <span className="block font-semibold text-base sm:text-lg [overflow-wrap:anywhere]">{value}</span>
                  </span>
                  <ArrowRight className="ml-auto w-5 h-5 shrink-0 text-accent opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-10 border-t border-primary/20">
      <div className="container mx-auto px-5 sm:px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="text-2xl font-serif tracking-tight font-bold text-accent">CleenUp</div>
        <div className="text-sm text-background/70 flex flex-col sm:flex-row gap-x-5 gap-y-1">
          <a href={CONTACT.phoneHref} className="hover:text-background">{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-background">{CONTACT.email}</a>
          <span>&copy; {new Date().getFullYear()} CleenUp</span>
        </div>
      </div>
      <div className="container mx-auto px-5 sm:px-6 max-w-6xl mt-6">
        <p className="text-xs text-background/60 text-center md:text-left">
          Review statistics:{" "}
          <a href={STAT_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-background">
            {STAT_SOURCE.label}
            <ExternalLink className="inline w-3 h-3 ml-1 -mt-0.5" aria-hidden="true" />
          </a>
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-clip selection:bg-accent selection:text-accent-foreground">
      <a
        href="#packages"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2"
      >
        Skip to packages
      </a>
      <Navbar />
      <main>
        <Intro />
        <Packages />
        <Examples />
        {/* Reviews hidden for now (owner request, 26 Oct 2026). Add genuine reviews to REVIEWS, then restore: <Reviews /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
