'use client';
import { Footer, Navbar } from '@/components';
import { About, Approach, Bento, Contact, Hero, Projects } from '@/components/sections';
import { useMainStore } from '@/stores/main-state-provider';
import React, { useEffect } from 'react';

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
  const { setProjects, setAbout, setTech, setIknow } = useMainStore((state) => state);

  useEffect(() => {
    setTech(tech);
    setProjects(projects);
    setAbout(about[0]);
    setIknow(iknow);
  }, []);

  return (
    <main className='bg-[#000318] bg-grid-white/[0.02] text-white h-screen w-full overflow-x-hidden dark overscroll-none'>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Bento />
      <Approach />
      <Contact />
      <Footer />
    </main>
  );
};

export default Container;
