"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useSpring } from "motion/react";

interface MagneticProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** Max pull distance in px (default 6) */
  strength?: number;
  as?: "div" | "li" | "span";
}

export default function Magnetic({
  children,
  strength = 6,
  as = "div",
  className,
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  const springX = useSpring(0, { damping: 20, stiffness: 300 });
  const springY = useSpring(0, { damping: 20, stiffness: 300 });

  useEffect(() => {
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      springX.set(dx * (strength / (rect.width / 2)));
      springY.set(dy * (strength / (rect.height / 2)));
    },
    [isTouch, strength, springX, springY]
  );

  const handleLeave = useCallback(() => {
    springX.set(0);
    springY.set(0);
  }, [springX, springY]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = motion[as] as any;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
