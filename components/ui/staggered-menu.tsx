"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["rgba(18, 22, 34, 0.94)", "rgba(10, 13, 22, 0.98)"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  accentColor = "#8fb2ff",
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      const preLayers = preContainer
        ? (Array.from(
            preContainer.querySelectorAll(".sm-prelayer"),
          ) as HTMLElement[])
        : [];
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    });

    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel"),
    ) as HTMLElement[];
    const numberedEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    ) as HTMLElement[];
    const socialTitle = panel.querySelector(
      ".sm-socials-title",
    ) as HTMLElement | null;
    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link"),
    ) as HTMLElement[];

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 8 });
    if (numberedEls.length)
      gsap.set(numberedEls, { ["--sm-num-opacity" as never]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 18, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((layer, index) => {
      tl.fromTo(
        layer.el,
        { xPercent: layer.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        index * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.95,
          ease: "power4.out",
          stagger: { each: 0.09, from: "start" },
        },
        itemsStart,
      );

      if (numberedEls.length) {
        tl.to(
          numberedEls,
          {
            duration: 0.55,
            ease: "power2.out",
            ["--sm-num-opacity" as never]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.08,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.45;
      if (socialTitle) {
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          socialsStart,
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: { each: 0.06, from: "start" },
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (!tl) {
      busyRef.current = false;
      return;
    }

    tl.eventCallback("onComplete", () => {
      busyRef.current = false;
    });
    tl.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.3,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel"),
        ) as HTMLElement[];
        const numberedEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item",
          ),
        ) as HTMLElement[];
        const socialTitle = panel.querySelector(
          ".sm-socials-title",
        ) as HTMLElement | null;
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link"),
        ) as HTMLElement[];

        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 8 });
        if (numberedEls.length)
          gsap.set(numberedEls, { ["--sm-num-opacity" as never]: 0 });
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 18, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.45 }, 0)
        .to(v, { rotate: -45, duration: 0.45 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.3 }, 0)
        .to(v, { rotate: 90, duration: 0.3 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      const targetColor =
        changeMenuColorOnOpen && opening
          ? openMenuButtonColor
          : menuButtonColor;
      colorTweenRef.current = gsap.to(btn, {
        color: targetColor,
        duration: 0.25,
        ease: "power2.out",
      });
    },
    [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor],
  );

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const sequence = [currentLabel, targetLabel, targetLabel];

    setTextLines(sequence);
    gsap.set(inner, { yPercent: 0 });

    const finalShift = ((sequence.length - 1) / sequence.length) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    animateColor,
    animateIcon,
    animateText,
    onMenuClose,
    onMenuOpen,
    playClose,
    playOpen,
  ]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;

    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [animateColor, animateIcon, animateText, onMenuClose, playClose]);

  const handleMenuItemClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
      if (link.startsWith("#")) {
        event.preventDefault();
        const target = document.querySelector(link) as HTMLElement | null;
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      }
      closeMenu();
    },
    [closeMenu],
  );

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickAway, closeMenu, open]);

  return (
    <div
      className={(className ? `${className} ` : "") + "sm-scope relative z-40"}
      style={
        accentColor
          ? ({ ["--sm-accent" as never]: accentColor } as React.CSSProperties)
          : undefined
      }
      data-position={position}
      data-open={open || undefined}
    >
      <div
        ref={preLayersRef}
        className='sm-prelayers fixed top-0 right-0 bottom-0 pointer-events-none z-35'
        aria-hidden='true'
      >
        {(() => {
          const raw = colors.length
            ? colors.slice(0, 4)
            : ["rgba(18,22,34,0.94)", "rgba(10,13,22,0.98)"];
          const arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((color, index) => (
            <div
              key={index}
              className='sm-prelayer absolute top-0 right-0 h-full w-full'
              style={{ background: color }}
            />
          ));
        })()}
      </div>

      <button
        ref={toggleBtnRef}
        className='sm-toggle relative inline-flex h-11 items-center gap-3 z-50 rounded-full border border-white/14 bg-white/5 px-4 text-white backdrop-blur-md'
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls='staggered-menu-panel'
        onClick={toggleMenu}
        type='button'
      >
        <span
          className='sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap'
          aria-hidden='true'
        >
          <span
            ref={textInnerRef}
            className='sm-toggle-textInner flex flex-col leading-none'
          >
            {textLines.map((line, index) => (
              <span
                className='sm-toggle-line block h-[1em] leading-none'
                key={`${line}-${index}`}
              >
                {line}
              </span>
            ))}
          </span>
        </span>
        <span
          ref={iconRef}
          className='sm-icon relative inline-flex h-[14px] w-[14px] items-center justify-center'
          aria-hidden='true'
        >
          <span
            ref={plusHRef}
            className='sm-icon-line absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-current'
          />
          <span
            ref={plusVRef}
            className='sm-icon-line absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-current'
          />
        </span>
      </button>

      <aside
        id='staggered-menu-panel'
        ref={panelRef}
        className='staggered-menu-panel fixed top-0 right-0 z-40 flex h-screen flex-col overflow-y-auto p-[6rem_2rem_2rem_2rem] backdrop-blur-md'
        aria-hidden={!open}
      >
        <div className='sm-panel-inner flex flex-1 flex-col gap-5'>
          <ul
            className='sm-panel-list m-0 flex list-none flex-col gap-2 p-0'
            role='list'
            data-numbering={displayItemNumbering || undefined}
          >
            {items.length ? (
              items.map((item, index) => (
                <li
                  className='sm-panel-itemWrap relative overflow-hidden leading-none'
                  key={item.label + index}
                >
                  <a
                    className='sm-panel-item relative inline-block pr-[1.4em] text-[3.25rem] leading-none font-semibold tracking-[-0.04em] text-white no-underline uppercase md:text-[4rem]'
                    href={item.link}
                    aria-label={item.ariaLabel}
                    onClick={(event) => handleMenuItemClick(event, item.link)}
                  >
                    <span className='sm-panel-itemLabel inline-block will-change-transform'>
                      {item.label}
                    </span>
                  </a>
                </li>
              ))
            ) : (
              <li
                className='sm-panel-itemWrap relative overflow-hidden leading-none'
                aria-hidden='true'
              >
                <span className='sm-panel-item relative inline-block pr-[1.4em] text-[3.25rem] leading-none font-semibold tracking-[-0.04em] text-white uppercase md:text-[4rem]'>
                  <span className='sm-panel-itemLabel inline-block will-change-transform'>
                    No items
                  </span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems.length > 0 ? (
            <div
              className='sm-socials mt-auto flex flex-col gap-3 pt-8'
              aria-label='Social links'
            >
              <h3 className='sm-socials-title text-(--sm-accent) m-0 text-base font-medium'>
                Contact
              </h3>
              <ul
                className='m-0 flex list-none flex-wrap items-center gap-4 p-0'
                role='list'
              >
                {socialItems.map((item, index) => (
                  <li key={item.label + index}>
                    <a
                      href={item.link}
                      target={
                        item.link.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className='sm-socials-link inline-block py-[2px] text-[1.1rem] font-medium text-white/80 no-underline transition-[color,opacity] duration-300'
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </aside>

      <style>{`
.sm-scope .sm-toggle {
  background: transparent;
  cursor: pointer;
  line-height: 1;
}
.sm-scope .sm-toggle:focus-visible {
  outline: 2px solid #ffffffaa;
  outline-offset: 4px;
}
.sm-scope .staggered-menu-panel {
  width: min(100vw, 560px);
  background: rgba(8, 10, 18, 0.86);
  -webkit-backdrop-filter: blur(12px);
}
.sm-scope .sm-prelayers {
  width: min(100vw, 560px);
}
.sm-scope[data-position='left'] .staggered-menu-panel {
  left: 0;
  right: auto;
}
.sm-scope[data-position='left'] .sm-prelayers {
  left: 0;
  right: auto;
}
.sm-scope .sm-panel-item {
  transition: color 0.25s ease;
}
.sm-scope .sm-panel-item:hover {
  color: var(--sm-accent, #8fb2ff);
}
.sm-scope .sm-panel-itemLabel {
  transform-origin: 50% 100%;
}
.sm-scope .sm-panel-list[data-numbering] {
  counter-reset: smItem;
}
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem;
  content: counter(smItem, decimal-leading-zero);
  position: absolute;
  top: 0.12em;
  right: 3.1em;
  font-size: 16px;
  font-weight: 400;
  color: var(--sm-accent, #8fb2ff);
  opacity: var(--sm-num-opacity, 0);
  letter-spacing: 0;
}
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) {
  opacity: 0.35;
}
.sm-scope .sm-socials-link:hover {
  color: var(--sm-accent, #8fb2ff);
}
@media (max-width: 640px) {
  .sm-scope .staggered-menu-panel,
  .sm-scope .sm-prelayers {
    width: 100vw;
  }
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
