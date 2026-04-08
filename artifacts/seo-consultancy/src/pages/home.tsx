import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, BarChart3, Globe, LineChart, Megaphone, Search, Target, Users, CheckCircle2 } from "lucide-react";

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
            RankRise Digital
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
            <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 rounded-none font-semibold group transition-all">
              Get Your Free Growth Audit
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-none border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
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
              RankRise was founded on a simple principle: you deserve a trusted partner who actually listens. We dig deep into your business, identify exactly why you're invisible online, and build a measurable system to drive real sales.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background"><Target className="w-5 h-5 text-primary" /></div>
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border-2 border-background"><LineChart className="w-5 h-5 text-accent" /></div>
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border-2 border-background"><Users className="w-5 h-5 text-primary" /></div>
              </div>
              <div className="text-sm font-semibold text-foreground">
                Trusted by 100+ growing brands
              </div>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.2} className="relative">
          <div className="absolute -inset-4 bg-secondary transform rotate-3 rounded-2xl -z-10"></div>
          <img 
            src="/about-team.png" 
            alt="RankRise Digital Team" 
            className="w-full h-auto object-cover rounded-xl shadow-2xl relative z-0"
          />
        </FadeIn>
      </div>
    </Section>
  );
}

const services = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "SEO Audit & Strategy",
    description: "We don't guess. We analyze your digital footprint, spy on competitors, and build a roadmap to the top of Google."
  },
  {
    icon: <Megaphone className="w-8 h-8" />,
    title: "Social Media Revamp",
    description: "Turn your silent social profiles into engaging community hubs that actively generate warm leads."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Content Marketing",
    description: "Authoritative content that answers your customers' questions before they even ask them."
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Paid Advertising",
    description: "High-ROI Google and Meta campaigns designed to capture intent and convert clicks into revenue."
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Performance Optimization",
    description: "A fast site is a profitable site. We optimize your website's technical health for maximum conversions."
  }
];

function Services() {
  return (
    <Section id="services" className="bg-secondary/50">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">Everything you need. Nothing you don't.</h2>
          <p className="text-lg text-muted-foreground">
            We focus exclusively on the high-leverage activities that actually move the needle for your business. No fluff.
          </p>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <FadeIn key={idx} delay={0.1 * idx}>
            <div className="bg-background p-8 border border-border h-full hover:border-primary/30 transition-colors group">
              <div className="w-16 h-16 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          </FadeIn>
        ))}
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
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-8">
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
    quote: "RankRise took us from literally zero online leads to booking out our services 3 months in advance. Their transparency is refreshing.",
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
    quote: "We were spending thousands on Google Ads with no return. RankRise restructured everything and dropped our cost-per-lead by 60%.",
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
                <a href="mailto:hello@rankrisedigital.com" className="text-primary hover:underline">hello@rankrisedigital.com</a>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Phone</h4>
                <a href="tel:+15551234567" className="text-primary hover:underline">+1 (555) 123-4567</a>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Office</h4>
                <p className="text-muted-foreground">100 Market St, Suite 400<br/>San Francisco, CA 94105</p>
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
            RankRise Digital
          </div>
          <div className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} RankRise Digital. All rights reserved.
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
          RankRise.
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground">
          <a href="#about" className="hover:text-accent transition-colors">About</a>
          <a href="#services" className="hover:text-accent transition-colors">Services</a>
          <a href="#process" className="hover:text-accent transition-colors">Process</a>
          <a href="#results" className="hover:text-accent transition-colors">Results</a>
        </div>
        <Button className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
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