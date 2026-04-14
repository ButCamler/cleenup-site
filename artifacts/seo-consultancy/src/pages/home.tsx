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
import { ArrowRight, CheckCircle2, Wrench, TrendingUp, RefreshCw, ChevronRight } from "lucide-react";

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
    <Section id="about" className="bg-background !pt-36 md:!pt-40">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">About Us</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground leading-tight">
              Hey, we're CleenUp.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-muted-foreground mb-5">
              We're not an agency, a corporation, or a sales team. We are just two young guys who know their way around the internet and want to help local businesses look the part online.
            </p>
            <p className="text-lg text-muted-foreground mb-5">
              Most businesses we speak to are brilliant at what they do — but their Google listing is out of date, their website hasn't been touched in years, or they're losing customers simply because someone couldn't find their phone number. That stuff is fixable. It just takes someone who knows how.
            </p>
            <p className="text-lg text-foreground font-medium border-l-4 border-accent pl-4">
              No jargon, no long contracts, no confusing reports. Just honest work at a fair price.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.2}>
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary transform rotate-3 rounded-2xl -z-10"></div>
            <img
              src="/about-team.png"
              alt="CleenUp Team"
              className="w-full h-auto object-cover rounded-xl shadow-2xl relative z-0"
            />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

function FlipCard({ front, back, delay = 0 }: { front: React.ReactNode; back: React.ReactNode; delay?: number }) {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        style={{ perspective: "1200px", height: "480px", cursor: "pointer" }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
            {front}
          </div>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            {back}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function Services() {
  return (
    <Section id="services" className="bg-secondary/30">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">Three ways we work with you.</h2>
          <p className="text-lg text-muted-foreground">
            Whether you need a one-time fix, active growth, or ongoing peace of mind — hover each card to see what's included.
          </p>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Card 1: The Clean-Up Package */}
        <FlipCard
          delay={0.05}
          front={
            <div className="w-full h-full bg-primary text-primary-foreground p-8 flex flex-col justify-between border border-primary">
              <div>
                <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-8">
                  <Wrench className="w-7 h-7 text-accent" />
                </div>
                <div className="text-xs font-bold tracking-widest uppercase text-accent mb-3">One-Time · Tiered</div>
                <h3 className="text-3xl font-serif font-bold leading-tight mb-4">The Clean-Up Package</h3>
                <p className="text-primary-foreground/70 text-base">
                  Your business, polished and professional — once and for all.
                </p>
              </div>
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <ChevronRight className="w-4 h-4" />
                Hover to see the tiers
              </div>
            </div>
          }
          back={
            <div className="w-full h-full bg-background border border-border p-7 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="text-xs font-bold tracking-widest uppercase text-accent mb-4">What's included</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Starter", focus: "Google Business Profile", items: ["Accurate info & categories", "Photo uploads", "Review responses"] },
                    { name: "Standard", focus: "Website Clean-Up", items: ["Broken links & errors", "Content refresh", "Basic SEO"] },
                    { name: "Growth", focus: "Full Digital Presence", items: ["Everything in Standard", "Directory listings", "Review management"] },
                    { name: "Premium", focus: "All-In Brand Audit", items: ["Everything in Growth", "Social consistency", "Full brand audit"] },
                  ].map((tier, i) => (
                    <div key={i} className={`p-3 ${i === 3 ? "bg-primary text-primary-foreground" : "bg-secondary/50"}`}>
                      <div className={`text-xs font-bold tracking-wider uppercase mb-0.5 ${i === 3 ? "text-accent" : "text-accent"}`}>{tier.name}</div>
                      <div className={`text-sm font-semibold mb-2 ${i === 3 ? "text-primary-foreground" : "text-foreground"}`}>{tier.focus}</div>
                      <ul className="space-y-1">
                        {tier.items.map((item, j) => (
                          <li key={j} className={`text-xs flex items-start gap-1 ${i === 3 ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-accent" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-4 w-full py-2.5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
              </button>
            </div>
          }
        />

        {/* Card 2: The Growth Partner Service */}
        <FlipCard
          delay={0.15}
          front={
            <div className="w-full h-full bg-background border border-border p-8 flex flex-col justify-between hover:border-primary/30 transition-colors">
              <div>
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-8">
                  <TrendingUp className="w-7 h-7 text-accent" />
                </div>
                <div className="text-xs font-bold tracking-widest uppercase text-accent mb-3">Project-Based</div>
                <h3 className="text-3xl font-serif font-bold leading-tight mb-4 text-foreground">The Growth Partner Service</h3>
                <p className="text-muted-foreground text-base italic">
                  "You focus on your craft — we'll fill your diary."
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                <ChevronRight className="w-4 h-4" />
                Hover to see how it works
              </div>
            </div>
          }
          back={
            <div className="w-full h-full bg-accent text-accent-foreground p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold tracking-widest uppercase mb-4 opacity-70">What we do for you</div>
                <p className="text-base leading-relaxed mb-6">
                  We handle the hard work of finding and warming up your ideal clients — so you only spend time on people ready to buy.
                </p>
                <ul className="space-y-3">
                  {[
                    "Ideal client identification",
                    "Cold outreach & prospecting",
                    "Lead qualification",
                    "Early-stage negotiation",
                    "Warm prospects delivered to you",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 opacity-80" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-4 w-full py-2.5 text-sm font-semibold bg-accent-foreground text-accent hover:opacity-90 transition-opacity"
              >
                Enquire Now
              </button>
            </div>
          }
        />

        {/* Card 3: The Retention Plan */}
        <FlipCard
          delay={0.25}
          front={
            <div className="w-full h-full bg-primary text-primary-foreground p-8 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-8">
                  <RefreshCw className="w-7 h-7 text-accent" />
                </div>
                <div className="text-xs font-bold tracking-widest uppercase text-accent mb-3">Monthly Subscription</div>
                <h3 className="text-3xl font-serif font-bold leading-tight mb-4">The Retention Plan</h3>
                <p className="text-primary-foreground/70 text-base italic">
                  "Stay sharp, stay visible, stay ahead."
                </p>
              </div>
              <div className="flex items-center gap-2 text-accent text-sm font-semibold">
                <ChevronRight className="w-4 h-4" />
                Hover to see what's included
              </div>
            </div>
          }
          back={
            <div className="w-full h-full bg-background border border-border p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold tracking-widest uppercase text-accent mb-4">Monthly inclusions</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  A rolling monthly plan that keeps everything ticking. Nothing slips, your pipeline stays full, and your business compounds over time.
                </p>
                <ul className="space-y-3">
                  {[
                    "Ongoing website maintenance",
                    "Google profile management",
                    "Review monitoring",
                    "Email list hygiene",
                    "SEO upkeep",
                    "Continued prospecting work",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-4 w-full py-2.5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start Your Plan
              </button>
            </div>
          }
        />

      </div>
    </Section>
  );
}

function Process() {
  return (
    <Section id="process" className="bg-primary text-primary-foreground">
      <FadeIn>
        <h2 className="text-4xl md:text-5xl font-serif mb-4">What I Do</h2>
        <p className="text-primary-foreground/70 text-lg mb-16 max-w-2xl">
          Three simple ways to help your business look the part and bring in more customers.
        </p>
      </FadeIn>

      <div className="space-y-12 mb-16">

        {/* Service 1 */}
        <FadeIn delay={0.05}>
          <div className="border-t border-primary-foreground/20 pt-10 grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-accent mb-3">One-Off</div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold leading-snug">The Tidy-Up</h3>
            </div>
            <div className="md:col-span-2">
              <p className="text-primary-foreground/80 text-lg mb-6 leading-relaxed">
                A one-off clean-up of your online presence. Think of it as a spring clean for your business on the internet — so when someone searches for you, what they find actually makes them want to get in touch.
              </p>
              <p className="text-primary-foreground/70 text-base mb-4">Depending on what you need, I can help with:</p>
              <ul className="space-y-3 mb-6">
                {[
                  "Your Google listing — right address, phone number, opening hours and photos",
                  "Your website — easy to read, up to date and working properly on a phone",
                  "Your reviews — making sure they're responded to and the good ones get seen",
                  "Your overall findability — so customers can actually reach you when they need to",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-primary-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-primary-foreground/60 italic text-sm">
                You tell me what needs sorting. I'll give you a price. Simple as that.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Service 2 */}
        <FadeIn delay={0.1}>
          <div className="border-t border-primary-foreground/20 pt-10 grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-accent mb-3">Project-Based</div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold leading-snug">Finding You New Customers</h3>
            </div>
            <div className="md:col-span-2">
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                You focus on the job — I'll fill your books.
              </p>
              <p className="text-primary-foreground/70 text-base mt-4 leading-relaxed">
                If you want more customers but don't have the time or appetite for chasing new business, I can take that off your plate. I'll find the right people, do the outreach, and hand them over to you ready to go.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Service 3 */}
        <FadeIn delay={0.15}>
          <div className="border-t border-primary-foreground/20 pt-10 grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-accent mb-3">Monthly</div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold leading-snug">Ongoing Support</h3>
            </div>
            <div className="md:col-span-2">
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                For businesses who just want it handled.
              </p>
              <p className="text-primary-foreground/70 text-base mt-4 leading-relaxed">
                A simple monthly arrangement where I keep everything ticking along. Your website stays fresh, your Google stays accurate, and I keep an eye on things in the background so you don't have to think about it.
              </p>
              <p className="text-primary-foreground/60 italic text-sm mt-4">
                No long contracts. Just a reliable pair of hands, every month.
              </p>
            </div>
          </div>
        </FadeIn>

      </div>

      {/* Pricing note */}
      <FadeIn delay={0.2}>
        <div className="border-t border-primary-foreground/20 pt-10 grid md:grid-cols-3 gap-8 items-center">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-accent mb-3">Pricing</div>
            <h3 className="text-2xl font-serif font-bold">No surprises.</h3>
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-8">
            <p className="text-primary-foreground/70 text-base leading-relaxed flex-grow">
              Everything is agreed upfront — you'll always know exactly what you're paying before I do a thing. Prices vary depending on what your business needs, so the best first step is just a quick conversation.
            </p>
            <Button
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-8 whitespace-nowrap flex-shrink-0"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </FadeIn>

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