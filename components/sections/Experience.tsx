"use client";

import { useMainStore } from "@/stores/main-state-provider";
import { Timeline } from "@/components/ui/timeline";
import Markdown from "../Markdown";
import { motion } from "motion/react";

const Experience = () => {
  const { experience } = useMainStore((state) => state);

  if (!experience || experience.length === 0) return null;

  const timelineData = experience.map((exp) => ({
    title: exp.company || exp.title || "Experience",
    content: (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
          <p className="text-neutral-400">
            {/* month, year - month, year */}
            {exp.startDate
              ? new Date(exp.startDate).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "Present"}{" "}
            —{" "}
            {exp.endDate
              ? new Date(exp.endDate).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "Present"}
          </p>
          {exp.location && <p className="text-neutral-500">{exp.location}</p>}
        </div>
        {exp.description && (
          <Markdown
            markdown={exp.description as any}
            block="text-neutral-300 text-sm md:text-base"
          />
        )}
      </div>
    ),
  }));

  return (
    <section id="experience" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl sm:text-5xl font-bold mb-12 text-center font-serif"
        >
          Work <span className="text-neutral-400">Experience</span>
        </motion.h2>
      </div>
      <Timeline data={timelineData} />
    </section>
  );
};

export default Experience;
