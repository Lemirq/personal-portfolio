"use client";

import { Spotlight } from "@/components/Spotlight";
import { motion } from "motion/react";
import Link from "next/link";
import SignatureDraw from "../SignatureDraw";
import { SOCIAL_LINKS } from "@/components/social-links";
import { Tooltip } from "@/components/ui/tooltip-card";
import Image from "next/image";

const socialLinks = SOCIAL_LINKS;

const Hero = () => {
  return (
    <section className="w-screen rounded-md flex sm:px-10 px-5 md:items-center md:justify-center antialiased pt-32 md:pt-0 relative overflow-hidden md:min-h-[70vh] pb-10 md:pb-0">
      <div className="w-full h-full fr justify-between absolute">
        <div className="w-full h-full">
          <Spotlight
            className="-top-10 left-0 md:left-60 md:-top-10 hidden md:block"
            fill="white"
            direction="left"
          />
          <Spotlight
            className="-top-10 left-0 md:left-60 md:top-40"
            fill="white"
            direction="left"
            fillOpacity=".1"
          />
        </div>
        <div
          style={{ transform: "scale(-1, 1)" }}
          className="w-full h-full absolute"
        >
          <Spotlight
            className="-top-10 left-0 md:left-60 md:-top-10 hidden md:block"
            fill="white"
            direction="left"
          />
          <Spotlight
            className="-top-10 left-0 md:left-60 md:top-40"
            fill="white"
            direction="left"
            fillOpacity=".1"
          />
        </div>
      </div>
      <div className="p-4 max-w-7xl mx-auto fc relative z-10 w-full pt-10 sm:pt-20 md:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-7xl max-w-xl font-bold text-center bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400 bg-opacity-50 tracking-tight w-full fr gap-5"
        >
          <span className="whitespace-nowrap">Hi, I&apos;m</span>{" "}
          <SignatureDraw />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-4 text-lg text-neutral-300 max-w-3xl font-semibold text-center mx-auto"
        >
          📍{" "}
          <Tooltip
            containerClassName="text-neutral-300"
            content={<UofTCard />}
          >
            <span className="cursor-pointer hover:text-white transition-colors">Toronto, UofT CS</span>
          </Tooltip>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-4 text-lg text-neutral-300 max-w-3xl font-semibold text-center mx-auto"
        >
          Full-stack developer in Canada. I turn ideas into <i>smooth</i>,
          high-performance web experiences that people actually enjoy using.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 flex justify-center gap-6 text-2xl text-neutral-400"
        >
          {socialLinks.map(({ label, icon, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:-translate-y-0.5 hover:text-white"
              data-cursor="fill"
            >
              {icon}
            </a>
          ))}
        </motion.div>

        <Link href="/resume" className="text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className=" px-5 border-neutral-700 bg-neutral-800 border-2 rounded-full text-white w-48 h-10 mt-10 cursor-pointer hover:bg-black hover:text-white transition-colors"
          >
            Resume
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

const UofTCard = () => {
  return (
    <div className="-m-2 md:-m-4">
      <Image
        src="/cn.jpg"
        alt="UofT Campus"
        className="w-80 rounded-sm object-cover"
        width={320}
        height={180}
      />
    </div>
  );
};

export default Hero;
