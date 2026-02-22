"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { usePathname } from "next/navigation";

const PADDING = 6;
const SPRING_CONFIG = { damping: 40, stiffness: 400 };
const PARALLAX_RANGE = 2;

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const targetRef = useRef<Element | null>(null);
  const cachedRect = useRef<DOMRect | null>(null);
  const cachedBR = useRef(0);
  const rafId = useRef(0);
  const pathname = usePathname();

  const x = useSpring(0, SPRING_CONFIG);
  const y = useSpring(0, SPRING_CONFIG);
  const w = useSpring(12, SPRING_CONFIG);
  const h = useSpring(12, SPRING_CONFIG);
  const br = useSpring(6, SPRING_CONFIG);
  const opacity = useSpring(0, SPRING_CONFIG);
  const snapProgress = useSpring(0, { damping: 35, stiffness: 300 });

  const bgOpacity = useTransform(snapProgress, [0, 0.3], [0.9, 0]);
  const borderOpacity = useTransform(snapProgress, [0.5, 1], [0, 0.4]);
  const glowOpacity = useTransform(snapProgress, [0, 0.3], [1, 0]);
  const background = useTransform(bgOpacity, (v) => `rgba(255,255,255,${v})`);
  const borderColor = useTransform(borderOpacity, (v) => `rgba(255,255,255,${v})`);
  const boxShadow = useTransform(glowOpacity, (v) => `0 0 8px 2px rgba(255,255,255,${v * 0.4})`);

  const refreshRect = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;
    cachedRect.current = el.getBoundingClientRect();
  }, []);

  const applySnap = useCallback(
    (clientX: number, clientY: number) => {
      const rect = cachedRect.current;
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const ox = ((clientX - cx) / (rect.width / 2)) * PARALLAX_RANGE;
      const oy = ((clientY - cy) / (rect.height / 2)) * PARALLAX_RANGE;

      x.set(rect.left - PADDING + ox);
      y.set(rect.top - PADDING + oy);
      w.set(rect.width + PADDING * 2);
      h.set(rect.height + PADDING * 2);
      br.set(cachedBR.current + PADDING);
    },
    [x, y, w, h, br]
  );

  const setTarget = useCallback(
    (el: Element | null, clientX?: number, clientY?: number) => {
      targetRef.current = el;
      if (el) {
        cachedRect.current = el.getBoundingClientRect();
        cachedBR.current = parseFloat(getComputedStyle(el).borderRadius) || 0;
        snapProgress.set(1);
        if (clientX !== undefined && clientY !== undefined) {
          applySnap(clientX, clientY);
        }
      } else {
        cachedRect.current = null;
        snapProgress.set(0);
      }
    },
    [snapProgress, applySnap]
  );

  useEffect(() => {
    setTarget(null);
  }, [pathname, setTarget]);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        opacity.set(1);
        if (targetRef.current) {
          applySnap(e.clientX, e.clientY);
        } else {
          x.set(e.clientX - 6);
          y.set(e.clientY - 6);
          w.set(12);
          h.set(12);
          br.set(6);
        }
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const t = e.target as Element;
      // Prefer explicit snap targets / cards over generic button/a
      const match =
        t.closest('[data-cursor="snap"], .client-border') ||
        t.closest("button, a");
      if (match && match !== targetRef.current) {
        setTarget(match, e.clientX, e.clientY);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (
        targetRef.current &&
        (!related || !targetRef.current.contains(related))
      ) {
        setTarget(null);
      }
    };

    const handleMouseLeave = () => {
      opacity.set(0);
    };

    const handleScroll = () => {
      if (targetRef.current) refreshRect();
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    window.addEventListener("resize", refreshRect, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll, { capture: true } as EventListenerOptions);
      window.removeEventListener("resize", refreshRect);
    };
  }, [isTouch, x, y, w, h, br, opacity, snapProgress, applySnap, setTarget, refreshRect]);

  if (isTouch) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x,
        y,
        width: w,
        height: h,
        borderRadius: br,
        opacity,
        pointerEvents: "none",
        zIndex: 9999,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor,
        backgroundColor: background,
        boxShadow,
        willChange: "transform",
      }}
    />
  );
}
