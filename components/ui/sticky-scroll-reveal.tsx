"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  containerClassName,
  backgroundColors = ["#030712", "#061224", "#0b1320"],
  gradients = [
    "linear-gradient(to bottom right, rgba(0,99,250,0.9), rgba(10,10,11,0.92))",
    "linear-gradient(to bottom right, rgba(87,161,255,0.85), rgba(10,10,11,0.94))",
    "linear-gradient(to bottom right, rgba(0,72,180,0.92), rgba(10,10,11,0.94))",
  ],
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  containerClassName?: string;
  backgroundColors?: string[];
  gradients?: string[];
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundGradient = gradients[activeCard % gradients.length];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className={cn(
        "relative grid gap-10 overflow-hidden rounded-[2.5rem] border border-black/10 p-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:p-10",
        containerClassName,
      )}
      ref={ref}
    >
      <div className="relative flex items-start px-2 lg:px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              className="flex min-h-[60vh] items-center py-16 first:pt-6 last:min-h-[45vh]"
            >
              <div>
                <motion.h2
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.35,
                  }}
                  className="text-3xl font-black tracking-tight text-slate-100 md:text-4xl"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.35,
                  }}
                  className="mt-6 max-w-md text-base leading-8 text-slate-300 md:text-lg"
                >
                  {item.description}
                </motion.p>
              </div>
            </div>
          ))}
          <div className="h-16" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-20 hidden h-112 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 lg:block",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
