"use client";

import {
  ArrowRight,
  BarChart3,
  Blocks,
  Code2,
  Globe2,
  Layers3,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import BudgetSelector from "@/components/ui/budget-selector";
import StaggeredMenu from "@/components/ui/staggered-menu";
import { Terminal } from "@/components/ui/terminal";
import { Timeline } from "@/components/ui/timeline";

const services = [
  {
    title: "Platforme Web",
    description:
      "Construim platforme web rapide și stabile pentru vânzări, operațiuni și relația cu clienții. Fiecare flux este optimizat pentru claritate și conversie.",
    points: [
      "Arhitectură scalabilă și securizată",
      "Integrări cu CRM, ERP, plăți și tool-uri interne",
    ],
    stack: [
      "React",
      "JavaScript",
      "Node.js",
      "Elixir",
      "Postgres",
      "PHP",
      "Livewire",
    ],
    deliverables:
      "Audit de fluxuri, design UX/UI, dezvoltare frontend + backend, QA și deployment.",
    outcome:
      "Conversie mai bună, procese mai rapide și cost operațional redus.",
    fit: "Companii care scalează și au nevoie de control pe funnel-ul digital.",
    icon: Globe2,
  },
  {
    title: "Aplicații Mobile",
    description:
      "Livrăm aplicații iOS și Android cu experiență fluidă, performanță reală pe device-uri diverse și journeys gândite pentru retenție pe termen lung.",
    points: [
      "UX orientat pe activare și engagement",
      "Analytics avansat pentru fiecare ecran critic",
    ],
    stack: [
      "React Native",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Elixir",
      "Postgres",
      "Firebase",
    ],
    deliverables:
      "Research de utilizare, prototipare, dezvoltare nativă/hibridă, tracking de evenimente și release management.",
    outcome:
      "Retenție crescută, experiență consistentă și creștere a utilizării recurente.",
    fit: "Produse cu frecvență mare de utilizare sau cu obiective clare de retenție.",
    icon: Smartphone,
  },
  {
    title: "Sisteme Interne",
    description:
      "Proiectăm sisteme interne care reduc munca manuală, cresc viteza echipei și aduc vizibilitate completă în procesele de business.",
    points: [
      "Dashboard-uri executive cu KPI-uri acționabile",
      "Automatizări care elimină pașii redundanți",
    ],
    stack: ["Electron", "React", "TypeScript", "Node.js", "Postgres", "PHP"],
    deliverables:
      "Mapare procese, arhitectură de date, roluri și permisiuni, automatizări și instrumentare operațională.",
    outcome:
      "Echipă mai eficientă, mai puține erori manuale și decizii mai rapide.",
    fit: "Organizații cu operațiuni complexe și volum mare de task-uri repetitive.",
    icon: Layers3,
  },
];

const pillars = [
  {
    title: "Design orientat pe business",
    description:
      "Mapăm fiecare ecran la un obiectiv clar: lead, conversie, retenție sau eficiență.",
    icon: Blocks,
  },
  {
    title: "Cod robust, scalabil",
    description:
      "Arhitectură modulară, standarde clare și performanță stabilă la creștere.",
    icon: Code2,
  },
  {
    title: "Securitate by default",
    description:
      "Protecție la nivel de acces, date și infrastructură încă din faza de design.",
    icon: ShieldCheck,
  },
  {
    title: "Decizii bazate pe date",
    description:
      "Evenimente, KPI-uri și dashboard-uri care arată impactul real al produsului.",
    icon: BarChart3,
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    text: "Înțelegem modelul tău de business, publicul țintă și prioritățile reale.",
  },
  {
    step: "02",
    title: "UX + Arhitectură",
    text: "Definim fluxurile, design system-ul și structura tehnică pentru livrare rapidă.",
  },
  {
    step: "03",
    title: "Build în sprinturi",
    text: "Implementăm incremental, cu demo-uri frecvente și feedback aplicat continuu.",
  },
  {
    step: "04",
    title: "Launch + Growth",
    text: "Lansăm, monitorizăm și iterăm produsul pentru rezultate măsurabile.",
  },
];

const processTimelineData = process.map((item) => ({
  title: `${item.step} ${item.title}`,
  content: (
    <p className='max-w-xl text-base leading-relaxed text-white/70 md:text-lg'>
      {item.text}
    </p>
  ),
}));

const techCarouselItems = [
  { name: "React", logo: "https://cdn.simpleicons.org/react/white" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/white" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/white" },
  { name: "Elixir", logo: "https://cdn.simpleicons.org/elixir/white" },
  { name: "Postgres", logo: "https://cdn.simpleicons.org/postgresql/white" },
  { name: "PHP", logo: "https://cdn.simpleicons.org/php/white" },
  { name: "Livewire", logo: "https://cdn.simpleicons.org/livewire/white" },
  {
    name: "React Native",
    logo: "https://cdn.simpleicons.org/react/white",
  },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/white" },
  { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/white" },
  { name: "Electron", logo: "https://cdn.simpleicons.org/electron/white" },
];

const collaborationModel = [
  {
    title: "Transparență totală",
    description:
      "Primești vizibilitate completă pe roadmap, progres și decizii tehnice în fiecare săptămână.",
  },
  {
    title: "Comunicare simplă, fără jargon",
    description:
      "Traducem complexitatea tehnică în impact de business, ca să iei decizii mai bune, mai repede.",
  },
  {
    title: "Ownership clar",
    description:
      "Definim de la început cine decide, ce livrăm și cum măsurăm succesul fiecărei etape.",
  },
];

const headerMenuItems = [
  { label: "Servicii", ariaLabel: "Mergi la servicii", link: "#servicii" },
  { label: "Proces", ariaLabel: "Mergi la proces", link: "#proces" },
  {
    label: "Colaborare",
    ariaLabel: "Mergi la colaborare",
    link: "#colaborare",
  },
];

const introTerminalCommands = [
  "boot flowdotcom --mode=cinematic",
  "load modules --web --mobile --desktop",
  "initialize experience --premium",
];

const introTerminalOutputs: Record<number, string[]> = {
  0: [
    "Reading environment...",
    "Applying visual profile: dark-cinematic",
    "System boot complete.",
  ],
  1: ["Web module loaded.", "Mobile module loaded.", "Desktop module loaded."],
  2: ["Preparing landing sections...", "Sync complete. Ready."],
};

const revealTransition = { duration: 0.55, ease: "easeOut" as const };

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...revealTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionParallax({
  children,
  className,
  intensity = 110,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "end 18%"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [intensity, 40, -28, -70],
  );

  return (
    <div ref={sectionRef} className='relative'>
      <motion.div style={{ y }} className={className}>
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const headerVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [bootOverlayMode, setBootOverlayMode] = useState<
    "pending" | "terminal" | "terminal-exit" | "logo" | "logo-exit" | "none"
  >("pending");
  const [terminalFinished, setTerminalFinished] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("500-2000");

  const budgetOptions = [
    "Sub 500 EUR",
    "500 — 2.000 EUR",
    "2.000 — 5.000 EUR",
    "5.000 — 10.000 EUR",
    "Peste 10.000 EUR",
  ];

  useEffect(() => {
    const video = headerVideoRef.current;
    if (!video) return;

    let rafId: number | null = null;
    let lastTimestamp: number | null = null;
    let isReversing = false;

    const stopReverse = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      lastTimestamp = null;
    };

    const reverseFrame = (timestamp: number) => {
      if (!video) return;
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const deltaSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      video.currentTime = Math.max(0, video.currentTime - deltaSeconds);

      if (video.currentTime <= 0.02) {
        video.currentTime = 0;
        isReversing = false;
        stopReverse();
        video.play().catch(() => {});
        return;
      }

      rafId = requestAnimationFrame(reverseFrame);
    };

    const handleEnded = () => {
      if (isReversing) return;
      isReversing = true;
      video.pause();
      video.currentTime = video.duration || video.currentTime;
      stopReverse();
      rafId = requestAnimationFrame(reverseFrame);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      stopReverse();
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isProjectModalOpen && bootOverlayMode === "none") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isProjectModalOpen, bootOverlayMode]);

  useEffect(() => {
    const introSeenKey = "flowdotcom_intro_seen_v1";
    const introSeen = localStorage.getItem(introSeenKey);
    if (introSeen === "true") {
      const showLogoTimer = window.setTimeout(() => {
        setBootOverlayMode("logo");
      }, 0);
      const logoExitTimer = window.setTimeout(() => {
        setBootOverlayMode("logo-exit");
      }, 950);
      const hideLogoTimer = window.setTimeout(() => {
        setBootOverlayMode("none");
      }, 1400);
      return () => {
        window.clearTimeout(showLogoTimer);
        window.clearTimeout(logoExitTimer);
        window.clearTimeout(hideLogoTimer);
      };
    }

    const showTerminalTimer = window.setTimeout(() => {
      setTerminalFinished(false);
      setBootOverlayMode("terminal");
    }, 0);

    return () => {
      window.clearTimeout(showTerminalTimer);
    };
  }, []);

  useEffect(() => {
    if (bootOverlayMode !== "terminal" || !terminalFinished) return;
    const terminalExitTimer = window.setTimeout(() => {
      setBootOverlayMode("terminal-exit");
    }, 900);

    return () => {
      window.clearTimeout(terminalExitTimer);
    };
  }, [bootOverlayMode, terminalFinished]);

  useEffect(() => {
    if (bootOverlayMode !== "terminal-exit") return;
    const introSeenKey = "flowdotcom_intro_seen_v1";
    const hideTimer = window.setTimeout(() => {
      setBootOverlayMode("none");
      localStorage.setItem(introSeenKey, "true");
    }, 550);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [bootOverlayMode]);

  return (
    <div className='relative overflow-hidden bg-[#05070f] text-white'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute top-[-180px] left-1/2 h-[480px] w-[840px] -translate-x-1/2 rounded-full bg-[#2f63ff]/30 blur-[120px]' />
        <div className='absolute right-[-120px] bottom-[-180px] h-[420px] w-[420px] rounded-full bg-[#00c2ff]/20 blur-[110px]' />
      </div>

      <div className='fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6'>
        <div className='mx-auto relative max-w-368 h-14'>
          <div
            className={`absolute top-0 left-0 z-70 flex items-center justify-center overflow-hidden rounded-full bg-[#f9f9f9] ring-1 ring-white/20 transition-all duration-300 ${
              isScrolled ? "h-10 w-10" : "h-12 w-12"
            }`}
          >
            <video
              ref={headerVideoRef}
              src='/logo-video.mp4'
              className='h-full w-full object-contain'
              autoPlay
              muted
              playsInline
              preload='auto'
            />
          </div>

          <button
            type='button'
            onClick={() => setIsProjectModalOpen(true)}
            className={`absolute z-70 inline-flex items-center rounded-full border border-white/14 bg-white/5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/25 ${
              isScrolled
                ? "top-1 left-14 h-10 px-3 text-xs"
                : "top-0.5 left-16 h-11 px-4 text-sm"
            }`}
          >
            Vreau un proiect
          </button>

          <div className='absolute top-0 right-0 z-50'>
            <StaggeredMenu
              position='right'
              items={headerMenuItems}
              socialItems={[
                { label: "+40770600321", link: "tel:+40770600321" },
                { label: "dragos@mail.com", link: "mailto:dragos@mail.com" },
              ]}
              displaySocials
              displayItemNumbering
              menuButtonColor='#ffffff'
              openMenuButtonColor='#ffffff'
              accentColor='#8fb2ff'
              changeMenuColorOnOpen={false}
              closeOnClickAway
            />
          </div>
        </div>
      </div>

      <div className='h-20' aria-hidden='true' />

      <main>
        <section className='relative mx-auto max-w-368 px-6 pt-12 pb-14 md:px-8 md:pt-16 md:pb-20'>
          <SectionParallax intensity={120}>
            <Reveal className='mx-auto max-w-4xl text-center'>
              <p className='mb-6 text-[10px] tracking-[0.16em] text-white/60 uppercase'>
                FLOWDOTCOM
              </p>
              <h1 className='text-5xl leading-[1.02] font-semibold tracking-tight md:text-7xl'>
                Design & Dezvoltare.
                <span className='block text-white/70'>
                  Produs construit pentru business.
                </span>
              </h1>
              <p className='mx-auto mt-6 max-w-2xl text-md leading-relaxed text-white/70'>
                Concepem și dezvoltăm experiențe digitale premium, de la primul
                wireframe până la produsul live. Pentru companii care vor
                claritate, viteză și impact business măsurabil.
              </p>
              <div className='mt-8 flex flex-wrap justify-center gap-3'>
                <button
                  type='button'
                  onClick={() => setIsProjectModalOpen(true)}
                  className='inline-flex items-center gap-2 rounded-full bg-[#2f63ff] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4a78ff]'
                >
                  Vreau un proiect
                  <ArrowRight className='size-4' />
                </button>
                <a
                  href='tel:+40770600321'
                  className='rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10'
                >
                  Sună acum
                </a>
              </div>
            </Reveal>
          </SectionParallax>
        </section>

        <section
          id='servicii'
          className='mx-auto max-w-368 scroll-mt-24 px-6 py-14 md:scroll-mt-28 md:px-8 md:py-20'
        >
          <SectionParallax intensity={130}>
            <Reveal className='mb-12 grid gap-4 md:grid-cols-[1fr_340px] md:items-end'>
              <div className='max-w-3xl'>
                <p className='text-xs tracking-[0.18em] text-white/55 uppercase'>
                  Capabilități
                </p>
                <h2 className='mt-3 text-3xl font-semibold md:text-3xl'>
                  Tot ce ai nevoie pentru un produs modern
                </h2>
              </div>
              <p className='text-sm leading-relaxed text-white/65 md:text-right'>
                Acoperim end-to-end strategia de produs, designul experienței,
                dezvoltarea tehnică și optimizarea continuă post-lansare.
              </p>
            </Reveal>
            <div className='grid gap-5 md:grid-cols-3'>
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ ...revealTransition, delay: 0.08 * index }}
                    className='rounded-3xl border border-white/12 bg-white/3 p-6 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/5'
                  >
                    <div className='mb-4 inline-flex rounded-2xl border border-white/20 bg-white/10 p-3'>
                      <Icon className='size-5 text-white' />
                    </div>
                    <h3 className='text-xl font-semibold'>{service.title}</h3>
                    <p className='mt-3 text-sm leading-relaxed text-white/65'>
                      {service.description}
                    </p>
                    <ul className='mt-4 space-y-2 text-sm text-white/55'>
                      {service.points.map((point) => (
                        <li key={point} className='flex items-start gap-2'>
                          <span className='mt-2 h-1.5 w-1.5 rounded-full bg-white/70' />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className='mt-5 space-y-2 border-t border-white/10 pt-4 text-sm leading-relaxed'>
                      <p className='text-white/70'>
                        <span className='font-medium text-white'>Ce livrăm:</span>{" "}
                        {service.deliverables}
                      </p>
                      <p className='text-white/70'>
                        <span className='font-medium text-white'>Rezultat:</span>{" "}
                        {service.outcome}
                      </p>
                      <p className='text-white/60'>
                        <span className='font-medium text-white'>
                          Potrivit pentru:
                        </span>{" "}
                        {service.fit}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </SectionParallax>
        </section>

        <Reveal className='relative w-full overflow-hidden border-y py-6'>
          <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-[#05070f] to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-[#05070f] to-transparent' />
          <div className='animate-scroll flex w-max gap-4 [--animation-duration:35s]'>
            {[...techCarouselItems, ...techCarouselItems].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className='flex flex-col h-16 min-w-[180px] items-center gap-3 rounded-2xl  px-4'
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  className='h-10 w-10 object-contain'
                  loading='lazy'
                />
                <span className='text-sm font-medium text-white/90'>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <section className='mx-auto max-w-368 px-6 py-14 md:px-8 md:py-20'>
          <SectionParallax intensity={125}>
            <div className='grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-12'>
            <Reveal className='md:sticky md:top-28 md:self-start'>
              <p className='text-xs tracking-[0.2em] text-white/50 uppercase'>
                DE CE FLOWDOTCOM
              </p>
              <h2 className='mt-4 text-3xl leading-tight font-semibold md:text-3xl'>
                Nu facem doar UI frumos. Construim sisteme care performează.
              </h2>
              <p className='mt-5 max-w-md text-sm leading-relaxed text-white/65'>
                Premium, pentru noi, înseamnă predictibilitate și execuție
                impecabilă: același nivel de calitate în design, cod, comunicare
                și livrare.
              </p>
              <div className='relative w-[90%] mt-6 overflow-hidden rounded-lg border border-white/15 bg-white/5'>
                <Image
                  src='/mocks.png'
                  alt='Flowcom pe mobile, laptop si desktop'
                  width={1024}
                  height={1000}
                  className='h-[200px] w-full object-cover'
                  priority
                />
                <div className='pointer-events-none absolute inset-0 bg-black/30' />
              </div>
            </Reveal>

            <div className='divide-y divide-white/10 border-y border-white/10'>
              {pillars.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ ...revealTransition, delay: 0.07 * index }}
                    className='py-6'
                  >
                    <div className='grid gap-4 md:grid-cols-[64px_1fr] md:gap-6'>
                      <span className='inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/80'>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className='min-w-0'>
                        <div className='flex items-center gap-3'>
                          <span className='inline-flex'>
                            <Icon className='size-4 text-white' />
                          </span>
                          <h3 className='text-base font-semibold md:text-lg'>
                            {item.title}
                          </h3>
                        </div>
                        <p className='mt-3 text-sm leading-relaxed text-white/65'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
            </div>
          </SectionParallax>
        </section>

        <section
          id='proces'
          className='scroll-mt-24 py-14 md:scroll-mt-28 md:py-20'
        >
          <Timeline
            data={processTimelineData}
            heading='Proces simplu, rezultate rapide'
            description='Fiecare etapă are obiective clare, output-uri concrete și un ritm de lucru transparent, astfel încât să știi permanent unde este proiectul și ce urmează.'
            // mediaVideoSrc='/flowdotcom.mp4'
          />
        </section>

        <section
          id='colaborare'
          className='relative scroll-mt-24 overflow-hidden py-18 md:scroll-mt-28 md:py-24'
        >
          <div className='pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 text-[24vw] leading-none font-black tracking-[-0.06em] text-white/3 uppercase'>
            flow
          </div>
          <SectionParallax intensity={140}>
            <Reveal className='mx-auto max-w-368 px-6 md:px-8'>
            <p className='text-xs tracking-[0.2em] text-white/50 uppercase'>
              Colaborare
            </p>
            <h2 className='mt-3 max-w-3xl text-3xl font-semibold md:text-5xl'>
              Un ritm de lucru clar, fără blocaje.
            </h2>
            <p className='mt-4 max-w-2xl text-sm leading-relaxed text-white/65'>
              Nu funcționăm ca un vendor distant, ci ca o extensie a echipei
              tale. Fiecare etapă are un owner clar, o decizie clară și un
              rezultat clar.
            </p>

            <div className='mt-12 border-y border-white/10'>
              {collaborationModel.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ ...revealTransition, delay: 0.08 * index }}
                  className={`grid gap-5 py-8 md:grid-cols-[120px_1fr_120px] md:items-start ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <div
                    className={`text-xs tracking-[0.2em] text-white/45 uppercase ${
                      index % 2 === 1 ? "md:order-3" : ""
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <h3 className='text-xl font-semibold'>{item.title}</h3>
                    <p className='mt-3 text-sm leading-relaxed text-white/65'>
                      {item.description}
                    </p>
                  </div>
                  <div
                    className={`hidden md:block ${
                      index % 2 === 1 ? "md:order-1" : ""
                    }`}
                  >
                    <div className='h-px w-full bg-linear-to-r from-transparent via-white/30 to-transparent' />
                  </div>
                </motion.div>
              ))}
            </div>
            </Reveal>
          </SectionParallax>
        </section>

        <section className='mx-auto max-w-368 px-6 pt-32 pb-20 text-center md:px-8 md:pb-28'>
          <SectionParallax intensity={120}>
            <Reveal>
            <h2 className='text-4xl font-semibold md:text-6xl'>
            Hai sa construim produsul tau.
            </h2>
            <p className='mx-auto mt-5 max-w-2xl text-white/70'>
              Spune-ne unde esti acum si unde vrei sa ajungi. Iti propunem un plan
              concret de design, tehnologie si livrare, cu milestone-uri clare si
              impact masurabil in business.
            </p>
            <button
              type='button'
              onClick={() => setIsProjectModalOpen(true)}
              className='mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#05070f] transition hover:opacity-90'
            >
              Vreau un proiect
              <ArrowRight className='size-4' />
            </button>
            </Reveal>
          </SectionParallax>
        </section>
      </main>

      <AnimatePresence>
        {bootOverlayMode !== "none" ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity:
                bootOverlayMode === "logo-exit" ||
                bootOverlayMode === "terminal-exit"
                  ? 0
                  : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className='fixed inset-0 z-120 bg-black'
          >
            <div className='flex h-full w-full items-center justify-center px-4'>
              {bootOverlayMode === "terminal" ||
              bootOverlayMode === "terminal-exit" ? (
                <motion.div
                  animate={
                    bootOverlayMode === "terminal-exit"
                      ? { opacity: 0, scale: 0.98, y: 10, filter: "blur(2px)" }
                      : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                  }
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  <Terminal
                    commands={introTerminalCommands}
                    outputs={introTerminalOutputs}
                    username='flowdotcom'
                    initialDelay={300}
                    typingSpeed={35}
                    delayBetweenCommands={350}
                    enableSound={false}
                    className='w-full max-w-2xl md:min-w-[760px]'
                    onComplete={() => setTerminalFinished((prev) => prev || true)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    bootOverlayMode === "logo-exit"
                      ? { opacity: 0, scale: 0.78, y: 12, filter: "blur(3px)" }
                      : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
                  }
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className='flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-[0_16px_40px_rgba(255,255,255,0.15)]'
                >
                  <Image
                    src='/logo.jpeg'
                    alt='flowdotcom logo'
                    width={112}
                    height={112}
                    className='h-28 w-28 rounded-full object-cover'
                    priority
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isProjectModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-90 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm'
            onClick={() => setIsProjectModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className='w-full max-w-xl rounded-3xl border border-white/15 bg-[#0c1220] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] md:p-8'
              onClick={(event) => event.stopPropagation()}
            >
              <div className='mb-6 flex items-start justify-between gap-4'>
                <div>
                  <p className='text-xs tracking-[0.16em] text-white/50 uppercase'>
                    Vreau un proiect
                  </p>
                  <h3 className='mt-2 text-2xl font-semibold text-white'>
                    Hai să discutăm despre proiectul tău
                  </h3>
                </div>
                <button
                  type='button'
                  onClick={() => setIsProjectModalOpen(false)}
                  className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/30 hover:text-white'
                  aria-label='Închide fereastra'
                >
                  <X className='size-4' />
                </button>
              </div>

              <form className='space-y-4'>
                <input
                  type='text'
                  placeholder='Nume Prenume'
                  className='w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35'
                />
                <input
                  type='email'
                  placeholder='Email'
                  className='w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35'
                />
                <input
                  type='text'
                  placeholder='Denumire firmă'
                  className='w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35'
                />
                <textarea
                  placeholder='Descriere proiect'
                  rows={4}
                  className='w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35'
                />
                <BudgetSelector
                  options={budgetOptions}
                  value={selectedBudget}
                  onChange={setSelectedBudget}
                />
                <button
                  type='button'
                  className='inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#05070f] transition hover:opacity-90'
                >
                  Trimite solicitarea
                  <ArrowRight className='size-4' />
                </button>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <footer className='border-t border-white/10 bg-white/2'>
        <Reveal className='mx-auto max-w-368 px-6 py-8 md:px-8 md:py-10'>
          <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-center gap-4'>
              <div className='overflow-hidden rounded-full border border-white/10 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.2)]'>
                <Image
                  src='/logo.jpeg'
                  alt='flowdotcom logo'
                  width={160}
                  height={64}
                  className='h-10 w-auto rounded-full object-contain'
                />
                <span className='sr-only text-sm font-semibold tracking-[0.2em] uppercase'>
                  flowdotcom design & development
                </span>
              </div>
              <div>
                <p className='text-sm font-medium text-white/90'>flowdotcom</p>
                <p className='text-xs tracking-[0.14em] text-white/45 uppercase'>
                  Product design and development
                </p>
              </div>
            </div>

            <div className='flex flex-col gap-3 text-sm md:items-end'>
              <a
                href='tel:+40770600321'
                className='text-white/70 transition hover:text-white'
              >
                +40770600321
              </a>
              <a
                href='mailto:dragos@mail.com'
                className='text-white/70 transition hover:text-white'
              >
                dragos@mail.com
              </a>
            </div>
          </div>

          <div className='mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between'>
            <p>© 2026 flowdotcom. All rights reserved.</p>
            <p>Built for clarity, speed and growth.</p>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
