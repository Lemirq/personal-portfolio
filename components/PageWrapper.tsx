"use client";

import { HTMLMotionProps, motion } from "motion/react";

const PageWrapper = (props: HTMLMotionProps<"div">) => {
  return <motion.div {...props} />;
};

export default PageWrapper;
