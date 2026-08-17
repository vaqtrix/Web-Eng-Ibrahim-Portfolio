"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/system/Theme";
import { useReducedMotion } from "@/components/hooks/useReducedMotion";

type Star = {
  x: number;
  y: number;
  z: number;
  phase: number;
  speed: number;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  len: number;
};

type Rock = {
  x: number;
  y: number;
  r: number;
  spin: number;
  angle: number;
  vx: number;
  vy: number;
  points: number[];
};

type Dust = { x: number; y: number; vy: number; vx: number; a: number };

type Satellite = { x: number; y: number; vx: number; vy: number; blink: number };

/**
 * The living background. Everything is drawn on one canvas so the whole scene
 * costs a single animation frame: parallax star layers, constellation lines
 * that form between close stars, tumbling asteroids, drifting dust, a passing
 * satellite, and meteors that occasionally arrive in a shower.
 *
 * Reacts to scroll and to the pointer. Pauses when the tab is hidden, and
 * renders a still sky for anyone who prefers reduced motion.
 */
export function SpaceScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isDay = theme === "day";
    const rgb = isDay ? "90, 99, 130" : "255, 255, 255";
    const accent = isDay ? "8, 112, 120" : "53, 230, 224";
    const violet = isDay ? "87, 48, 224" : "124, 92, 255";
    const base = isDay ? 0.55 : 1;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let rocks: Rock[] = [];
    let dust: Dust[] = [];
    let shooters: Shooter[] = [];
    let satellite: Satellite | null = null;
    let showerUntil = 0;
    let frame = 0;
    let running = true;
    let raf = 0;

    let scrollY = window.scrollY;
    let pointerX = 0;
    let pointerY = 0;
    let px = 0;
    let py = 0;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.round((w * h) / 5200), 340);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.4, 1.8),
      }));

      rocks = Array.from({ length: w < 700 ? 4 : 8 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(5, 16),
        spin: rand(-0.006, 0.006),
        angle: Math.random() * Math.PI * 2,
        vx: rand(-0.14, 0.14),
        vy: rand(-0.1, 0.1),
        points: Array.from({ length: 8 }, () => rand(0.65, 1.25)),
      }));

      dust = Array.from({ length: w < 700 ? 30 : 60 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vy: rand(-0.35, -0.08),
        vx: rand(-0.08, 0.08),
        a: rand(0.15, 0.5),
      }));
    };

    const spawnShooter = () => {
      shooters.push({
        x: rand(-80, w * 0.7),
        y: rand(-40, h * 0.5),
        vx: rand(5, 9),
        vy: rand(1.6, 3.2),
        life: 1,
        len: rand(90, 190),
      });
    };

    const spawnSatellite = () => {
      const fromLeft = Math.random() > 0.5;
      satellite = {
        x: fromLeft ? -40 : w + 40,
        y: rand(h * 0.1, h * 0.7),
        vx: fromLeft ? rand(0.5, 0.9) : -rand(0.5, 0.9),
        vy: rand(-0.12, 0.12),
        blink: 0,
      };
    };

    const drawStars = () => {
      const scrollShift = scrollY * 0.1;

      for (const star of stars) {
        const depth = 0.3 + star.z;
        let y = (star.y - scrollShift * depth + py * depth * 14) % h;
        if (y < 0) y += h;
        let x = (star.x + px * depth * 14) % w;
        if (x < 0) x += w;

        const twinkle = reduced
          ? 0.8
          : 0.5 + Math.sin(frame * 0.02 * star.speed + star.phase) * 0.5;
        const alpha = base * (0.2 + star.z * 0.8) * twinkle;
        const size = 0.4 + star.z * 1.5;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.fill();

        if (star.z > 0.9) {
          ctx.beginPath();
          ctx.arc(x, y, size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accent}, ${alpha * 0.12})`;
          ctx.fill();
        }

        // stash the drawn position for the constellation pass
        star.phase += 0;
        (star as Star & { _x?: number; _y?: number })._x = x;
        (star as Star & { _x?: number; _y?: number })._y = y;
      }
    };

    const drawConstellations = () => {
      // Link only the brightest stars, and only when they drift close together
      const bright = stars.filter((s) => s.z > 0.82) as Array<
        Star & { _x?: number; _y?: number }
      >;
      const maxDist = 132;

      ctx.lineWidth = 0.6;
      for (let i = 0; i < bright.length; i += 1) {
        for (let j = i + 1; j < bright.length; j += 1) {
          const a = bright[i];
          const b = bright[j];
          if (a._x === undefined || b._x === undefined) continue;
          const dx = a._x - b._x!;
          const dy = a._y! - b._y!;
          const dist = Math.hypot(dx, dy);
          if (dist > maxDist) continue;

          const alpha = (1 - dist / maxDist) * 0.3 * base;
          ctx.strokeStyle = `rgba(${accent}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a._x!, a._y!);
          ctx.lineTo(b._x!, b._y!);
          ctx.stroke();
        }
      }
    };

    const drawRocks = () => {
      for (const rock of rocks) {
        if (!reduced) {
          rock.x += rock.vx;
          rock.y += rock.vy;
          rock.angle += rock.spin;
        }
        if (rock.x < -40) rock.x = w + 40;
        if (rock.x > w + 40) rock.x = -40;
        if (rock.y < -40) rock.y = h + 40;
        if (rock.y > h + 40) rock.y = -40;

        const y = rock.y - scrollY * 0.05;
        const wrapped = ((y % (h + 80)) + h + 80) % (h + 80);

        ctx.save();
        ctx.translate(rock.x + px * 22, wrapped + py * 22);
        ctx.rotate(rock.angle);
        ctx.beginPath();
        rock.points.forEach((mult, i) => {
          const a = (i / rock.points.length) * Math.PI * 2;
          const r = rock.r * mult;
          const rx = Math.cos(a) * r;
          const ry = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        });
        ctx.closePath();
        ctx.fillStyle = `rgba(${rgb}, ${base * 0.05})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${rgb}, ${base * 0.18})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    };

    const drawDust = () => {
      for (const mote of dust) {
        if (!reduced) {
          mote.y += mote.vy;
          mote.x += mote.vx;
          if (mote.y < -10) {
            mote.y = h + 10;
            mote.x = Math.random() * w;
          }
        }
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${violet}, ${mote.a * base * 0.6})`;
        ctx.fill();
      }
    };

    const drawShooters = () => {
      shooters = shooters.filter(
        (s) => s.life > 0 && s.x < w + 260 && s.y < h + 260,
      );

      for (const s of shooters) {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.007;

        const tailX = s.x - s.len;
        const tailY = s.y - s.len * (s.vy / s.vx);
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(${rgb}, ${0.95 * s.life * base})`);
        grad.addColorStop(0.4, `rgba(${accent}, ${0.4 * s.life * base})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${s.life * base})`;
        ctx.fill();
      }
    };

    const drawSatellite = () => {
      if (!satellite) return;
      satellite.x += satellite.vx;
      satellite.y += satellite.vy;
      satellite.blink += 1;

      if (satellite.x < -80 || satellite.x > w + 80) {
        satellite = null;
        return;
      }

      const { x, y } = satellite;
      ctx.save();
      ctx.translate(x, y - scrollY * 0.04);
      ctx.strokeStyle = `rgba(${rgb}, ${base * 0.45})`;
      ctx.lineWidth = 1;
      // body
      ctx.strokeRect(-3, -2.5, 6, 5);
      // panels
      ctx.strokeRect(-11, -1.6, 7, 3.2);
      ctx.strokeRect(4, -1.6, 7, 3.2);
      // blinking beacon
      if (Math.floor(satellite.blink / 26) % 2 === 0) {
        ctx.beginPath();
        ctx.arc(0, -5, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, ${base})`;
        ctx.fill();
      }
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // pointer easing
      px += (pointerX - px) * 0.05;
      py += (pointerY - py) * 0.05;

      drawStars();
      if (!reduced) drawConstellations();
      drawRocks();
      if (!reduced) {
        drawDust();
        drawSatellite();
        drawShooters();

        // A single meteor every few seconds, and now and then a short shower
        if (frame % 200 === 0 && shooters.length < 3) spawnShooter();
        if (frame % 1500 === 0) showerUntil = frame + 220;
        if (frame < showerUntil && frame % 22 === 0) spawnShooter();
        if (frame % 1100 === 0 && !satellite) spawnSatellite();
      }

      frame += 1;
      if (running) raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onPointer = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    build();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", build);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [theme, reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Nebula clouds, drifting in opposite directions */}
      <div className="absolute inset-0 nebula-a" />
      <div className="absolute inset-0 nebula-b" />
      <div className="absolute inset-0 grid-field" />

      {/* Distant planet, slowly rotating with its ring */}
      <div className="planet-far absolute -right-24 top-24 h-72 w-72 md:h-96 md:w-96">
        <div className="planet-body absolute inset-6 rounded-full" />
        <div className="planet-ring absolute inset-0 rounded-[50%]" />
      </div>

      {/* Small moon on a long orbit */}
      <div className="moon-orbit absolute -left-32 bottom-10 h-80 w-80">
        <span className="moon-body absolute left-0 top-1/2 h-8 w-8 rounded-full" />
      </div>

      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />

      {/* Horizon glow, pulsing like an atmosphere */}
      <div aria-hidden="true" className="horizon absolute inset-x-0 bottom-0 h-72" />
    </div>
  );
}
