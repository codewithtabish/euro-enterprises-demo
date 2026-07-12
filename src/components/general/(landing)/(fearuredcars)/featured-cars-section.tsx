"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import FeaturedRentalCarsHeader from "./featured-header";

const COVERS = [
  { seed: "midnight-drive", title: "Midnight Drive", src: "/features/one.jpg" },
  { seed: "glasshouse", title: "Glasshouse", src: "/features/two.jpg" },
  { seed: "low-tide", title: "Low Tide", src: "/features/three.jpg" },
  { seed: "neon-fields", title: "Neon Fields", src: "/features/four.jpg" },
  { seed: "palerose", title: "Palerose", src: "/features/five.jpg" },
  { seed: "static-bloom", title: "Static Bloom", src: "/features/six.jpg" },
  { seed: "vantablack", title: "Vantablack", src: "/features/seven.jpg" },
  { seed: "golden-hour", title: "Golden Hour", src: "/features/eight.jpg" },
  { seed: "undertow", title: "Undertow", src: "/features/nine.jpg" },
  // { seed: "northern-line", title: "Northern Line", src: "/cars/car-10.jpg" },
];

const C = {
  persp: 1100,
  cw: 250,
  ch: 250,
  gap: 118,
  push: 105,
  rot: 55,
  depth: 150,
  fall: 60,
};

const FeaturedCarsSection = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef(0);
  const target = useRef(0);
  const moved = useRef(0);

  useEffect(() => {
    const N = COVERS.length;

    let dragging = false;
    let lastX = 0;
    let idle = 0;

    const wrap = (p: number) => {
      p = ((p % N) + N) % N;
      return p > N / 2 ? p - N : p;
    };

    const layout = () => {
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const p = wrap(i - pos.current);
        const side = Math.max(-1, Math.min(1, p));
        const x = p * C.gap + side * C.push;
        const z = (1 - Math.min(1, Math.abs(p))) * C.depth - Math.abs(p) * C.fall;
        
        el.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${-side * C.rot}deg)`;
        el.style.zIndex = String(200 - Math.round(Math.abs(p) * 10));
        el.style.opacity = String(Math.abs(p) > 3.6 ? 0 : 1);
      }
    };

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!dragging && ++idle > 210) {
        target.current = Math.round(target.current) + 1;
        idle = 0;
      }
      pos.current += (target.current - pos.current) * 0.09;
      layout();
    };
    tick();

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved.current = 0;
      lastX = e.clientX;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      moved.current += Math.abs(dx);
      target.current -= dx * 0.006;
      idle = 0;
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      target.current = Math.round(target.current);
      idle = 0;
    };

    const scene = cardRefs.current[0]?.closest("[data-coverflow]");
    scene?.addEventListener("pointerdown", onDown as EventListener);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      scene?.removeEventListener("pointerdown", onDown as EventListener);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const bringToFront = (i: number) => {
    if (moved.current > 6) return;
    const N = COVERS.length;
    let p = ((i - pos.current) % N) + (i - pos.current < 0 ? N : 0);
    if (p > N / 2) p -= N;
    target.current = Math.round(pos.current + p);
  };

  return (
    <div className="pt-10 md:pt-20">
      <FeaturedRentalCarsHeader/>
    <div
      data-coverflow
      className="relative pb-40  flex h-[80vh] w-full cursor-grab select-none items-center justify-center overflow-hidden active:cursor-grabbing"
      style={{ perspective: `${C.persp}px` }}
    >
      <div className="relative -mt-10" style={{ transformStyle: "preserve-3d" }}>
        {COVERS.map((cover, i) => (
          <div
            key={cover.seed}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={() => bringToFront(i)}
            className="absolute"
            style={{
              width: C.cw,
              height: C.ch * 1.55,
              marginLeft: -C.cw / 2,
              marginTop: -C.ch / 2,
              willChange: "transform, opacity",
            }}
          >
            <div className="overflow-hidden rounded-md shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/20">
              <Image
                src={cover.src}
                alt={cover.title}
                width={C.cw}
                height={C.ch}
                className="object-cover"
                draggable={false}
                priority={i < 3}
              />
            </div>

            {/* Reflection */}
            <div
              className="mt-1 overflow-hidden rounded-md opacity-40"
              style={{
                transform: "scaleY(-1)",
                maskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%)",
                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%)",
              }}
            >
              <Image
                src={cover.src}
                alt=""
                width={C.cw}
                height={C.ch}
                className="object-cover"
                draggable={false}
                aria-hidden
              />
            </div>

            <p className="pointer-events-none absolute -bottom-2 left-0 right-0 text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              {cover.title}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FeaturedCarsSection;