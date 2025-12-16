import { useMainStore } from "@/stores/main-state-provider";
import { useMemo } from "react";
import Project from "../Project";

const Projects = () => {
  const { projects, tech } = useMainStore((state) => state);
  const visibleProjects = useMemo(
    () => projects.filter((p) => !p.invisible),
    [projects]
  );

  return (
    <section
      className="w-full mx-auto py-16 md:py-32 px-5 md:px-10"
      id="projects"
    >
      <div className="w-full max-w-7xl m-auto">
        <h2 className="text-5xl font-bold mb-12 text-center">Projects</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((p) => (
            <Project key={p._id} project={p} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
