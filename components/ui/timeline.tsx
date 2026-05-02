"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  heading,
  description,
  mediaVideoSrc,
}: {
  data: TimelineEntry[];
  heading?: string;
  description?: string;
  mediaVideoSrc?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              itemRefs.current.indexOf(a.target as HTMLDivElement) -
              itemRefs.current.indexOf(b.target as HTMLDivElement),
          );

        if (visibleEntries.length > 0) {
          const nextIndex = itemRefs.current.indexOf(
            visibleEntries[0].target as HTMLDivElement,
          );
          if (nextIndex >= 0) {
            setActiveIndex(nextIndex);
          }
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.1,
      },
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const scaleYTransform = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className='w-full bg-transparent font-sans' ref={containerRef}>
      <div className='mx-auto max-w-368 px-6 py-14 md:px-8 md:py-20'>
        <div
          className={`grid items-end gap-6 ${
            mediaVideoSrc ? "md:grid-cols-[1fr_280px]" : ""
          }`}
        >
          <div>
            <h2 className='mb-4 max-w-4xl text-3xl font-black tracking-[-0.04em] text-white md:text-3xl'>
              {heading ?? "How we work"}
            </h2>
            <p className='max-w-2xl text-sm leading-relaxed text-white/65 md:text-base'>
              {description ??
                "A simple delivery rhythm that keeps the product moving with clarity."}
            </p>
          </div>
          {mediaVideoSrc ? (
            <div className='overflow-hidden rounded-2xl border border-white/15 bg-black/20'>
              <video
                src={mediaVideoSrc}
                className='h-44 w-full object-cover'
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          ) : null}
        </div>
      </div>

      <div ref={ref} className='relative mx-auto max-w-368 px-6 pb-20 md:px-8'>
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className='flex justify-start pt-10 md:pt-28 md:gap-10'
          >
            <div className='sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full'>
              <div className='absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#05070f] md:left-3'>
                <div className='h-4 w-4 rounded-full border border-white/40 bg-white/20 p-2' />
              </div>
              <h3
                className={`hidden text-xl font-black tracking-tight transition-colors duration-300 md:block md:pl-20 md:text-4xl ${
                  index === activeIndex ? "text-white" : "text-white/30"
                }`}
              >
                {item.title}
              </h3>
            </div>

            <div
              className={`relative w-full pl-20 pr-4 transition-opacity duration-300 md:pl-4 ${
                index === activeIndex ? "opacity-100" : "opacity-55"
              }`}
            >
              <h3
                className={`mb-4 block text-left text-2xl font-black tracking-tight transition-colors duration-300 md:hidden ${
                  index === activeIndex ? "text-white" : "text-white/50"
                }`}
              >
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div className='absolute top-10 bottom-10 left-8 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-white/20 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8'>
          <motion.div
            style={{
              scaleY: scaleYTransform,
              opacity: opacityTransform,
              transformOrigin: "top",
            }}
            className='bg-linear-to-t absolute inset-0 w-[2px] rounded-full from-white from-0% via-white/90 via-15% to-transparent'
          />
        </div>
      </div>
    </div>
  );
};
