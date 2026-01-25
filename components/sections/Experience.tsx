"use client";

import { useMainStore } from "@/stores/main-state-provider";
import { Timeline } from "@/components/ui/timeline";
import Markdown from "../Markdown";

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
          <div className="text-neutral-800">
            <Markdown markdown={exp.description as any} />
          </div>
        )}
      </div>
    ),
  }));

  return (
    <section id="experience" className="w-full">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <h2 className="text-3xl sm:text-5xl font-bold mb-5">
          Work <span className="text-violet-500">Experience</span>
        </h2>
      </div>
      <Timeline data={timelineData} />
    </section>
  );
};

export default Experience;
