"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  About,
  Approach,
  Bento,
  Contact,
  Hero,
  Projects,
} from "@/components/sections";
import { useMainStore } from "@/stores/main-state-provider";
import React, { useEffect } from "react";

const Container = ({
  sanityData,
}: {
  sanityData: {
    projects: project[];
    iknow: iknow[];
    about: about[];
    tech: tech[];
  };
}) => {
  const { projects, iknow, about, tech } = sanityData;
  const { setProjects, setAbout, setTech, setIknow } = useMainStore(
    (state) => state
  );

  useEffect(() => {
    setTech(tech);
    setProjects(projects);
    setAbout(about[0]);
    setIknow(iknow);
  }, [projects, iknow, about, tech, setProjects, setAbout, setTech, setIknow]);

  return (
    <main className="relative w-full overflow-x-hidden bg-[#000318] text-white overscroll-none dark">
      <div className="absolute inset-0 bg-white/3 bg-grid pointer-events-none" />
      <div className="relative z-10">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Bento />
      {/* <Approach /> */}
      <Contact />
      <Footer />
      </div>
    </main>
  );
};

export default Container;
