import { useMainStore } from "@/stores/main-state-provider";
import { useMemo } from "react";
import Project from "../Project";
import CardsSection from "../cards/CardsSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

const Projects = () => {
  const { projects, tech, webGLAvailable, isPhone } = useMainStore((state) => state);
  const prefersReducedMotion = useReducedMotion();
  const visibleProjects = useMemo(
    () => projects.filter((p) => !p.invisible),
    [projects]
  );

  if(!isPhone && webGLAvailable && !prefersReducedMotion){
    return <CardsSection projects={projects} />
  }


  return (
    <section
      className="w-full mx-auto py-16 md:py-32 px-5 md:px-10"
      id="projects"
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
          className="text-5xl font-bold mb-12 text-center"
        >
          Projects
        </motion.h2>
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
