"use client";
import { useEffect } from "react";
import { HTMLMotionProps, motion } from "motion/react";

const PageWrapper = (props: HTMLMotionProps<"div">) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      for (const card of document.getElementsByClassName(
        "client-border"
      ) as HTMLCollectionOf<HTMLElement>) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return <motion.div {...props} />;
};

export default PageWrapper;
