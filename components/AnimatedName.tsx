"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const NAME = "vihaan";

const MIN_WEIGHT = 100;
const MAX_WEIGHT = 900;

const AnimatedName = () => {
  const [weights, setWeights] = useState<number[]>(
    Array(NAME.length).fill(400),
  );

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

      setWeights(Array(NAME.length).fill(400));
    };
    ripple();
  }, []);

  return (
    <span
      className="inline-flex cursor-default select-none"
      style={{ fontFamily: "var(--font-cabinet), sans-serif" }}
    >
      {NAME.split("").map((letter, i) => (
        <motion.span
          key={i}
          animate={{ fontVariationSettings: `'wght' ${weights[i]}` }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-neutral-500"
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
};

export default AnimatedName;
