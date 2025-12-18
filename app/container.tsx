"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  About,
  Approach,
  Bento,
  Contact,
  Experience,
  Hero,
  Projects,
} from "@/components/sections";
import { useMainStore } from "@/stores/main-state-provider";
import { useEffect } from "react";
import WebGL from 'three/addons/capabilities/WebGL.js';

import NoiseBackground from "@/components/NoiseBackground";

const Container = ({
  sanityData,
}: {
  sanityData: {
    projects: project[];
    iknow: iknow[];
    about: about[];
    tech: tech[];
    experience: experience[];
  };
}) => {
  const { projects, iknow, about, tech, experience } = sanityData;
  const { 
    setProjects, 
    setAbout, 
    setTech, 
    setIknow,
    setWebGLAvailable,
    setIsPhone,
    setExperience,
  } = useMainStore(
    (state) => state
  );

  useEffect(() => {
    setTech(tech);
    setProjects(projects);
    setAbout(about[0]);
    setIknow(iknow);
    setExperience(experience);

    if (WebGL.isWebGL2Available()) {
      setWebGLAvailable(true);
    } else {
      setWebGLAvailable(false);
    }

    const isPhone = /Android|iPhone/i.test(navigator.userAgent);
    setIsPhone(isPhone);

  }, [projects, iknow, about, tech, experience, setProjects, setAbout, setTech, setIknow, setWebGLAvailable, setIsPhone, setExperience]);

  return (
    <main className="relative w-full overflow-x-clip bg-transparent text-white overscroll-none dark">
        <NoiseBackground />

      <div className="absolute inset-0 bg-white/2 bg-grid pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        <Projects />
        <About />
        <Experience />
        <Bento />
        {/* <Approach /> */}
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default Container;
