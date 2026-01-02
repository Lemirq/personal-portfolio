import { useMainStore } from "@/stores/main-state-provider";
import { useMemo, useState } from "react";
import Project from "../Project";
import CardsSection from "../cards/CardsSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { BsGrid, BsViewList } from "react-icons/bs";
import { TbView360Number } from "react-icons/tb";

const Projects = () => {
  const { projects, tech, webGLAvailable, isPhone } = useMainStore((state) => state);
  const prefersReducedMotion = useReducedMotion();
  const canUse3D = !isPhone && webGLAvailable && !prefersReducedMotion;
  const [view, setView] = useState<"3d" | "grid">(canUse3D ? "3d" : "grid");
  
  const visibleProjects = useMemo(
    () => projects.filter((p) => !p.invisible),
    [projects]
  );

  if (canUse3D && view === "3d") {
    return <CardsSection projects={projects} onViewChange={() => setView("grid")} />
  }

  return (
    <section
      className="w-full mx-auto py-16 md:py-32 px-5 md:px-10"
      id="projects"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
            className="text-5xl font-bold text-center"
          >
            Projects
          </motion.h2>
          {canUse3D && (
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.4 }}
              onClick={() => setView("3d")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm text-white/70 hover:text-white"
            >
              <TbView360Number className="w-4 h-4" />
              <span>3D View</span>
            </motion.button>
          )}
        </div>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 1.4
              }
            }
          }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {visibleProjects.map((p) => (
            <Project key={p._id} project={p} tech={tech} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
