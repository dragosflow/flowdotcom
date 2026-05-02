"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Code2, Compass, Layers3, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { buttonVariants } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Timeline } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";

const stickyContent = [
  {
    title: "Product strategy",
    description:
      "We help define what to build first, what to ignore, and where the product should create momentum.",
    content: (
      <FeaturePreview
        eyebrow='Direction'
        title='Turn the idea into a roadmap'
        description='Clear priorities, sharper decisions, and less waste before design and code begin.'
        icon={<Compass className='size-5 text-[#0063FA]' />}
      />
    ),
  },
  {
    title: "Design systems and UI",
    description:
      "Interfaces are shaped to feel clear, consistent, and ready for real users instead of just looking polished in static screens.",
    content: (
      <FeaturePreview
        eyebrow='Experience'
        title='Design that is ready to ship'
        description='Systems, screens, and interactions that raise product quality without adding visual noise.'
        icon={<Layers3 className='size-5 text-[#0063FA]' />}
      />
    ),
  },
  {
    title: "App development",
    description:
      "We build production-ready apps across modern web and product stacks with a fast, focused delivery loop.",
    content: (
      <FeaturePreview
        eyebrow='Execution'
        title='Build with speed and clarity'
        description='From polished frontend work to complete product delivery, the goal is simple: ship something people can use.'
        icon={<Code2 className='size-5 text-[#0063FA]' />}
      />
    ),
  },
];

const timelineData = [
  {
    title: "Clarify",
    content: (
      <TimelineCard>
        We align on the product, the users, and the fastest path to value.
      </TimelineCard>
    ),
  },
  {
    title: "Design",
    content: (
      <TimelineCard>
        We shape the user experience and interface before code becomes
        expensive.
      </TimelineCard>
    ),
  },
  {
    title: "Build",
    content: (
      <TimelineCard>
        We ship with clean execution, tight feedback loops, and attention to
        detail.
      </TimelineCard>
    ),
  },
  {
    title: "Refine",
    content: (
      <TimelineCard>
        We improve what matters after launch instead of overengineering upfront.
      </TimelineCard>
    ),
  },
];

const proofPoints = [
  "MVPs and product launches",
  "Design systems and interface refreshes",
  "Frontend and full-stack product delivery",
  "Fast iteration with a small, focused team",
];

const serviceCards = [
  {
    title: "Product strategy",
    description:
      "Clarify what to build, what to cut, and what should happen next.",
    icon: <Compass className='size-4 text-[#0063FA]' />,
  },
  {
    title: "Design systems and UI",
    description:
      "Create interfaces that feel sharp, consistent, and ready for real users.",
    icon: <Layers3 className='size-4 text-[#0063FA]' />,
  },
  {
    title: "App development",
    description:
      "Build scalable products across web, mobile, and modern product stacks.",
    icon: <Code2 className='size-4 text-[#0063FA]' />,
  },
];

export function LandingPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main
      id='top'
      className='overflow-x-hidden bg-background text-foreground selection:bg-[#0063FA] selection:text-white'
    >
      <section className='relative isolate overflow-hidden bg-white'>
        <Spotlight
          fill='#0063FA'
          className='-top-40 left-1/2 w-full -translate-x-1/2 md:-top-28 md:w-[72%]'
        />
        <BackgroundBeams className='mask-[linear-gradient(to_bottom,white,transparent_75%)] opacity-18' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,99,250,0.08),transparent_34%)]' />
        <div className='absolute inset-x-0 bottom-0 h-px bg-black/10' />

        <div className='mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 md:px-10'>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className='relative z-10'
          >
            <div className='mb-16 flex items-center justify-between gap-4'>
              <div className='inline-flex items-center gap-4'>
                <div className='relative h-11 w-11 overflow-hidden rounded-full border border-black/10 bg-white'>
                  <Image
                    src='/logo.jpeg'
                    alt='flowdotcom logo'
                    fill
                    sizes='44px'
                    className='object-cover'
                    priority
                  />
                </div>
                <div>
                  <p className='text-sm font-semibold tracking-[-0.03em] text-black'>
                    flowdotcom
                  </p>
                  <p className='text-sm text-black/48'>Design. Build. Ship.</p>
                </div>
              </div>
              <a
                href='#contact'
                className='hidden rounded-full border border-black/10 px-4 py-2 text-sm text-black/68 transition-colors hover:bg-black/3 md:inline-flex'
              >
                Start a project
              </a>
            </div>

            <div className='grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end'>
              <div className='max-w-5xl'>
                <TextGenerateEffect
                  words='We build apps people keep using.'
                  className='max-w-5xl text-6xl font-black tracking-[-0.08em] text-black md:text-8xl lg:text-[6.6rem]'
                  duration={0.45}
                  filter={!reduceMotion}
                />
              </div>

              <div className='max-w-md lg:justify-self-end'>
                <p className='text-sm font-semibold uppercase tracking-[0.24em] text-[#0063FA]'>
                  Product, design, and engineering in one flow
                </p>
                <p className='mt-6 text-lg leading-8 text-black/62'>
                  flowdotcom helps teams turn product ideas into polished apps
                  with strategy, design, and development under one clear
                  direction.
                </p>
                <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                  <a
                    href='#contact'
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-12 rounded-full bg-[#0063FA] px-6 text-white hover:bg-[#0055d6]",
                    )}
                  >
                    Start a project
                    <ArrowRight className='size-4' />
                  </a>
                  <a
                    href='#process'
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "h-12 rounded-full border-black/12 bg-white px-6 text-black hover:bg-black/3",
                    )}
                  >
                    See how we work
                  </a>
                </div>
              </div>
            </div>

            <div className='mt-24 grid gap-4 border-t border-black/10 pt-8 md:grid-cols-3'>
              {[
                "Product strategy",
                "Design systems and UI",
                "App development",
              ].map((item) => (
                <div key={item} className='py-2'>
                  <p className='text-sm uppercase tracking-[0.22em] text-black/34'>
                    Focus
                  </p>
                  <p className='mt-2 text-lg font-medium tracking-[-0.03em] text-black'>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className='border-b border-black/10 bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-28 md:px-10'>
          <div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.24em] text-[#0063FA]'>
                Why teams get stuck
              </p>
              <h2 className='mt-4 max-w-3xl text-4xl font-black tracking-[-0.06em] text-black md:text-6xl'>
                Most app ideas do not fail from lack of ambition.
              </h2>
            </div>
            <div className='space-y-6 text-lg leading-8 text-black/64'>
              <p>
                They fail when strategy, design, and engineering move in
                different directions.
              </p>
              <p>
                We bring them together so your product gets built clearly,
                quickly, and properly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id='capabilities' className='border-b border-black/10 bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-28 md:px-10'>
          <SectionIntro
            eyebrow='What we help with'
            title='A single product partner, from definition to delivery.'
            description='This is the main scroll-driven section, but treated more like editorial storytelling than a flashy product demo.'
          />
          <StickyScroll
            content={stickyContent}
            backgroundColors={["#ffffff", "#fbfbfc", "#f6f8fb"]}
            gradients={[
              "linear-gradient(to bottom right, rgba(255,255,255,1), rgba(237,244,255,1))",
              "linear-gradient(to bottom right, rgba(255,255,255,1), rgba(247,249,252,1))",
              "linear-gradient(to bottom right, rgba(255,255,255,1), rgba(241,247,255,1))",
            ]}
            containerClassName='gap-14 rounded-none border-0 bg-transparent p-0 lg:grid-cols-[minmax(0,1fr)_28rem]'
            contentClassName='border border-black/8 bg-white'
          />
        </div>
      </section>

      <section className='border-b border-black/10 bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-28 md:px-10'>
          <SectionIntro
            eyebrow='Services snapshot'
            title='Simple, focused, and clearly scoped.'
            description='A quieter section that makes the offer feel custom rather than template-driven.'
          />
          <BentoGrid className='max-w-none gap-5 md:auto-rows-[15rem]'>
            {serviceCards.map((item) => (
              <BentoGridItem
                key={item.title}
                className='rounded-[1.75rem] border-black/10 bg-white p-6 shadow-none transition-colors hover:border-[#0063FA]/20 hover:bg-[#fbfdff]'
                title={
                  <span className='text-xl font-semibold tracking-[-0.04em] text-black'>
                    {item.title}
                  </span>
                }
                description={
                  <span className='text-sm leading-7 text-black/62'>
                    {item.description}
                  </span>
                }
                icon={
                  <div className='rounded-full border border-[#0063FA]/20 bg-[#0063FA]/6 p-2'>
                    {item.icon}
                  </div>
                }
                header={<div className='h-8' />}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      <section id='process' className='border-b border-black/10 bg-white'>
        <Timeline
          data={timelineData}
          heading='How we work'
          description='A simple delivery rhythm: clarify, design, build, refine.'
        />
      </section>

      <section className='border-b border-black/10 bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-28 md:px-10'>
          <div className='grid gap-12 lg:grid-cols-[0.9fr_1.1fr]'>
            <SectionIntro
              eyebrow='Built for teams that need momentum'
              title='Proof without the agency theatre.'
              description='Whether you are starting from an idea, redesigning an existing product, or trying to ship faster, flowdotcom helps move the work forward.'
            />

            <div className='grid gap-4 md:grid-cols-2'>
              {proofPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className='rounded-[1.75rem] border border-black/10 bg-[#fafafa] p-6'
                >
                  <div className='flex items-start gap-4'>
                    <div className='mt-1 rounded-full border border-[#0063FA]/20 bg-[#0063FA]/6 p-2'>
                      <Sparkles className='size-4 text-[#0063FA]' />
                    </div>
                    <p className='text-lg leading-8 text-black/78'>{point}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id='contact' className='relative overflow-hidden bg-white'>
        <div className='absolute inset-x-0 top-0 h-px bg-black/10' />
        <div className='mx-auto max-w-7xl px-6 py-28 md:px-10'>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className='grid gap-8 border-t border-black/10 pt-10 md:grid-cols-[1fr_auto]'
          >
            <div className='max-w-3xl'>
              <p className='text-sm font-semibold uppercase tracking-[0.24em] text-[#0063FA]'>
                Have an app to build?
              </p>
              <h2 className='mt-4 text-4xl font-black tracking-[-0.06em] text-black md:text-6xl'>
                Let&apos;s turn the idea into something real, usable, and ready
                to ship.
              </h2>
              <p className='mt-6 max-w-xl text-lg leading-8 text-black/62'>
                flowdotcom is best suited for teams that want a hands-on product
                and engineering partner.
              </p>
            </div>

            <div className='flex flex-col items-start gap-4 md:items-end'>
              <a
                href='#top'
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-full bg-[#0063FA] px-6 text-white hover:bg-[#0055d6]",
                )}
              >
                Start a project
                <ArrowRight className='size-4' />
              </a>
              <p className='text-sm text-black/44'>One clear path. No noise.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className='mb-16 max-w-3xl'>
      <p className='text-sm font-semibold uppercase tracking-[0.24em] text-[#0063FA]'>
        {eyebrow}
      </p>
      <h2 className='mt-4 text-4xl font-black tracking-[-0.06em] text-black md:text-6xl'>
        {title}
      </h2>
      <p className='mt-5 text-lg leading-8 text-black/62'>{description}</p>
    </div>
  );
}

function FeaturePreview({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className='flex h-full flex-col justify-between rounded-[2rem] border border-black/8 bg-white p-7 text-black shadow-[0_24px_60px_rgba(0,0,0,0.04)]'>
      <div className='flex items-center justify-between'>
        <span className='text-xs font-semibold uppercase tracking-[0.24em] text-[#0063FA]'>
          {eyebrow}
        </span>
        <div className='rounded-full border border-[#0063FA]/20 bg-[#0063FA]/6 p-2'>
          {icon}
        </div>
      </div>

      <div className='space-y-3'>
        <h3 className='text-2xl font-semibold tracking-[-0.04em]'>{title}</h3>
        <p className='text-sm leading-7 text-black/60'>{description}</p>
      </div>

      <div className='grid grid-cols-3 gap-3 border-t border-black/8 pt-5'>
        <MetricCell label='Speed' value='Fast' />
        <MetricCell label='Signal' value='High' />
        <MetricCell label='Focus' value='Tight' />
      </div>
    </div>
  );
}

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-2xl bg-[#fafafa] px-3 py-4'>
      <p className='text-xs uppercase tracking-[0.2em] text-black/35'>
        {label}
      </p>
      <p className='mt-2 text-sm font-semibold text-black'>{value}</p>
    </div>
  );
}

function TimelineCard({ children }: { children: ReactNode }) {
  return (
    <div className='rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.04)]'>
      <p className='text-base leading-7 text-black/68'>{children}</p>
    </div>
  );
}
