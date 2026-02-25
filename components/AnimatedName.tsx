"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";

const NAME = "vihaan";

const MIN_WEIGHT = 100;
const MAX_WEIGHT = 900;
const FALLOFF_PX = 150; // pixel radius of influence from cursor

const AnimatedName = () => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [weights, setWeights] = useState<number[]>(
    Array(NAME.length).fill(400),
  );
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimationControls();

  // Ripple on load
  useEffect(() => {
    const ripple = async () => {
      // Start all letters thin
      setWeights(Array(NAME.length).fill(MIN_WEIGHT));
      await new Promise((r) => setTimeout(r, 400));

      // Ripple: wave sweeps left to right, continuing past the end
      // so trailing letters naturally fade out
      const totalSteps = NAME.length + 3;
      for (let i = 0; i < totalSteps; i++) {
        setWeights(() => {
          const next = Array(NAME.length).fill(MIN_WEIGHT);
          for (let j = 0; j < NAME.length; j++) {
            const dist = j - i;
            if (Math.abs(dist) > 3) {
              next[j] = MIN_WEIGHT;
            } else {
              const t = 1 - Math.abs(dist) / 3;
              next[j] = Math.round(MIN_WEIGHT + (MAX_WEIGHT - MIN_WEIGHT) * t);
            }
          }
          return next;
        });
        await new Promise((r) => setTimeout(r, 80));
      }

      // Ease back to normal weight
      // setWeights(Array(NAME.length).fill(400));
      setHasLoaded(true);
    };
    ripple();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!hasLoaded) return;
      const mouseX = e.clientX;

      const newWeights = letterRefs.current.map((ref) => {
        if (!ref) return MIN_WEIGHT;
        const rect = ref.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - letterCenterX);

        if (distance >= FALLOFF_PX) return MIN_WEIGHT;
        const t = 1 - distance / FALLOFF_PX;
        // Ease the falloff for a smoother feel
        const eased = t * t;
        return Math.round(MIN_WEIGHT + (MAX_WEIGHT - MIN_WEIGHT) * eased);
      });

      setWeights(newWeights);
    },
    [hasLoaded],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (hasLoaded) {
      setWeights(Array(NAME.length).fill(MIN_WEIGHT));
    }
  }, [hasLoaded]);

  return (
    <span
      ref={containerRef}
      className="inline-flex cursor-default select-none"
      style={{ fontFamily: "var(--font-cabinet), sans-serif" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {NAME.split("").map((letter, i) => (
        <motion.span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          animate={{ fontVariationSettings: `'wght' ${weights[i]}` }}
          transition={
            hasLoaded && isHovering
              ? { type: "spring", stiffness: 600, damping: 35, mass: 0.5 }
              : { type: "spring", stiffness: 300, damping: 25 }
          }
          className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-neutral-500"
          data-cursor="fill"
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
};

export default AnimatedName;
