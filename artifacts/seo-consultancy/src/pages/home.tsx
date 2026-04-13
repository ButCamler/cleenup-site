import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, LineChart, Target, Users, CheckCircle2, Wrench, TrendingUp, RefreshCw, ChevronRight } from "lucide-react";

// --- Components ---

const Section = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`py-24 md:py-32 ${className}`}>
    <div className="container mx-auto px-6 max-w-6xl">
      {children}
    </div>
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

// --- Sections ---

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary text-primary-foreground pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="Abstract digital growth" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
        <FadeIn>
          <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent text-sm font-semibold tracking-wider uppercase mb-6">
            CleenUp
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8">
            Escape digital obscurity.<br />
            <span className="text-accent italic">Dominate your market.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 font-sans">
            We transform overlooked businesses into thriving online authorities. 
            Stop losing customers to competitors who simply rank better.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 rounded-none font-semibold group transition-all">
              Get Your Free Growth Audit
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto text-lg px-8 py-6 rounded-none border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              See Our Results
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" className="bg-background">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">
              We build growth engines for businesses that refuse to be left behind.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-muted-foreground mb-6">
              Most digital agencies treat small and medium businesses like afterthoughts. They apply cookie-cutter templates, speak in jargon, and deliver vanity metrics that don't pay your bills.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              CleenUp was founded on a simple principle: you deserve a trusted partner who actually listens. We dig deep into your business, identify exactly why you're invisible online, and build a measurable system to drive real sales.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background"><Target className="w-5 h-5 text-primary" /></div>
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border-2 border-background"><LineChart className="w-5 h-5 text-accent" /></div>
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border-2 border-background"><Users className="w-5 h-5 text-primary" /></div>
              </div>
              <div className="text-sm font-semibold text-foreground">
                Trusted by 50+ growing brands
              </div>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.2} className="relative">
          <div className="absolute -inset-4 bg-secondary transform rotate-3 rounded-2xl -z-10"></div>
          <img 
            src="/about-team.png" 
            alt="CleenUp Team" 
            className="w-full h-auto object-cover rounded-xl shadow-2xl relative z-0"
          />
        </FadeIn>
      </div>
    </Section>
  );
}

const cleanUpTiers = [
  {
    name: "Starter",
    focus: "Google Business Profile",
    items: [
      "Accurate business info & categories",
      "Professional photo uploads",
      "Review response templates",
      "Profile optimisation for local search",
    ],
  },
  {
    name: "Standard",
    focus: "Website Clean-Up",
    items: [
      "Broken link & error fixes",
      "Outdated content refresh",
      "Contact details audit",
      "Mobile-friendliness check",
      "Basic on-page SEO",
    ],
  },
  {
    name: "Growth",
    focus: "Full Digital Presence",
    items: [
      "Everything in Standard",
      "Online directory listings",
      "Email list audit",
      "Review management setup",
      "Google profile overhaul",
    ],
  },
  {
    name: "Premium",
    focus: "All-In Brand Audit",
    items: [
      "Everything in Growth",
      "Reachability improvements",
      "Social consistency checks",
      "Full brand audit report",
      "Priority support",
    ],
    highlight: true,
  },
];

function Services() {
  return (
    <Section id="services" className="bg-secondary/30">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">Three ways we work with you.</h2>
          <p className="text-lg text-muted-foreground">
            Whether you need a one-time fix, active growth, or ongoing peace of mind — there's a service built for where you are right now.
          </p>
        </FadeIn>
      </div>

      {/* Service 1: The Clean-Up Package */}
      <FadeIn>
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center flex-shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-accent mb-0.5">One-Time · Tiered</div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">The Clean-Up Package</h3>
            </div>
          </div>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
            Your business, polished and professional — once and for all. Choose the level that matches what needs fixing.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cleanUpTiers.map((tier, idx) => (
              <FadeIn key={idx} delay={0.08 * idx}>
                <div className={`relative p-6 h-full flex flex-col border ${tier.highlight ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/30"} transition-colors`}>
                  {tier.highlight && (
                    <div className="absolute -top-3 left-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 tracking-wider uppercase">
                      Most Popular
                    </div>
                  )}
                  <div className={`text-sm font-bold tracking-widest uppercase mb-1 ${tier.highlight ? "text-primary-foreground/70" : "text-accent"}`}>
                    {tier.name}
                  </div>
                  <div className={`text-lg font-serif font-bold mb-5 ${tier.highlight ? "text-primary-foreground" : "text-foreground"}`}>
                    {tier.focus}
                  </div>
                  <ul className="space-y-3 flex-grow">
                    {tier.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-accent" : "text-primary"}`} />
                        <span className={tier.highlight ? "text-primary-foreground/90" : "text-muted-foreground"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`mt-6 w-full py-2.5 text-sm font-semibold border transition-colors ${tier.highlight ? "border-accent text-accent hover:bg-accent hover:text-accent-foreground" : "border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"}`}
                  >
                    Get Started
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Services 2 & 3 side by side */}
      <div className="grid md:grid-cols-2 gap-6">
        <FadeIn delay={0.1}>
          <div className="bg-background border border-border p-8 h-full flex flex-col hover:border-primary/30 transition-colors group">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold tracking-widest uppercase text-accent mb-2">Project-Based</div>
            <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">The Growth Partner Service</h3>
            <p className="text-sm font-medium text-muted-foreground italic mb-4">"You focus on your craft — we'll fill your diary."</p>
            <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
              For businesses who want customers brought to them. We handle identifying ideal clients, cold outreach, lead qualification, and early-stage negotiations — delivering warm, ready-to-convert prospects directly to you.
            </p>
            <ul className="space-y-2 mb-8">
              {["Ideal client identification", "Cold outreach & prospecting", "Lead qualification", "Early-stage negotiation", "Warm prospects delivered to you"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 text-sm font-semibold border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Enquire Now
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-primary text-primary-foreground p-8 h-full flex flex-col">
            <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold tracking-widest uppercase text-accent mb-2">Monthly Subscription</div>
            <h3 className="text-2xl font-serif font-bold mb-3">The Retention Plan</h3>
            <p className="text-sm font-medium text-primary-foreground/60 italic mb-4">"Stay sharp, stay visible, stay ahead."</p>
            <p className="text-primary-foreground/80 leading-relaxed mb-6 flex-grow">
              A rolling monthly plan that keeps everything ticking. Nothing slips, your pipeline stays full, and you build a business that compounds over time.
            </p>
            <ul className="space-y-2 mb-8">
              {["Ongoing website maintenance", "Google profile management", "Review monitoring", "Email list hygiene", "SEO upkeep", "Continued prospecting work"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 text-sm font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Start Your Plan
            </button>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

const steps = [
  { step: "01", title: "Discovery", desc: "We sit down with you to understand your business, your margins, and your ideal customer." },
  { step: "02", title: "Strategy", desc: "We map out exactly where you're losing to competitors and how we're going to fix it." },
  { step: "03", title: "Execution", desc: "Our team implements the strategy while you focus on running your business." },
  { step: "04", title: "Growth", desc: "We track the data, optimize for better conversions, and scale what works." }
];

function Process() {
  return (
    <Section id="process" className="bg-primary text-primary-foreground">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">A proven framework for predictable growth.</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              We don't believe in black-box marketing. Our process is transparent, measurable, and highly collaborative. You'll know exactly what we're doing and why.
            </p>
            <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-8">
              Start Your Journey
            </Button>
          </FadeIn>
        </div>
        <div className="space-y-8">
          {steps.map((item, idx) => (
            <FadeIn key={idx} delay={0.1 * idx}>
              <div className="flex gap-6 group">
                <div className="text-4xl font-serif font-light text-accent/50 group-hover:text-accent transition-colors">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/70">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

const testimonials = [
  {
    quote: "CleenUp took us from literally zero online leads to booking out our services 3 months in advance. Their transparency is refreshing.",
    author: "Sarah Jenkins",
    role: "Founder, Jenkins Legal Group",
    stat: "Went from 0 to 1,200 monthly leads"
  },
  {
    quote: "Finally, an agency that speaks my language. They fixed our broken website and the SEO strategy paid for itself in month two.",
    author: "Marcus Chen",
    role: "Owner, Elevate Fitness",
    stat: "Increased traffic by 340% in 4 months"
  },
  {
    quote: "We were spending thousands on Google Ads with no return. CleenUp restructured everything and dropped our cost-per-lead by 60%.",
    author: "Elena Rodriguez",
    role: "CMO, Nexus Tech",
    stat: "Decreased CAC by 62%"
  }
];

function Testimonials() {
  return (
    <Section id="results" className="bg-background">
      <FadeIn>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Don't just take our word for it.</h2>
          <p className="text-lg text-muted-foreground">Real businesses. Real revenue. Real impact.</p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <FadeIn key={idx} delay={0.1 * idx}>
            <div className="bg-secondary/30 p-8 h-full flex flex-col relative border-t-4 border-accent">
              <div className="text-4xl font-serif text-accent/30 absolute top-6 right-6">"</div>
              <p className="text-lg text-foreground italic mb-8 relative z-10 flex-grow">
                {t.quote}
              </p>
              <div className="pt-6 border-t border-border">
                <div className="font-bold text-primary mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {t.stat}
                </div>
                <div className="font-semibold">{t.author}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  business: z.string().min(2, "Business name is required"),
  message: z.string().min(10, "Please tell us a bit about your goals"),
});

function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", business: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Request Received",
      description: "We'll be in touch within 24 hours to schedule your audit.",
    });
    form.reset();
  }

  return (
    <Section id="contact" className="bg-muted border-t border-border">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">Ready to stop guessing?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Fill out the form to request your free, no-obligation digital growth audit. We'll show you exactly where you're leaving money on the table.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-foreground mb-1">Email</h4>
                <a href="mailto:Cleen.Up@outlook.com" className="text-primary hover:underline">Cleen.Up@outlook.com</a>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Phone</h4>
                <a href="tel:02036178191" className="text-primary hover:underline">020 3617 8191</a>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="bg-background p-8 shadow-xl border border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" className="bg-muted/50 border-transparent focus-visible:ring-primary rounded-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jane@company.com" className="bg-muted/50 border-transparent focus-visible:ring-primary rounded-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="business"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corp" className="bg-muted/50 border-transparent focus-visible:ring-primary rounded-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are your biggest growth challenges right now?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="We're getting traffic but no calls..." 
                          className="min-h-[120px] bg-muted/50 border-transparent focus-visible:ring-primary rounded-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none py-6 text-lg">
                  Request Free Audit
                </Button>
              </form>
            </Form>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-primary/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif tracking-tight font-bold text-accent">
            CleenUp
          </div>
          <div className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} CleenUp. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-serif font-bold text-primary tracking-tight">
          CleenUp.
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground">
          <a href="#about" className="hover:text-accent transition-colors">About</a>
          <a href="#services" className="hover:text-accent transition-colors">Services</a>
          <a href="#process" className="hover:text-accent transition-colors">Process</a>
          <a href="#results" className="hover:text-accent transition-colors">Results</a>
        </div>
        <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
          Get Started
        </Button>
      </div>
    </nav>
  );
}

// --- Main Page ---

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}