import { Spotlight } from "@/components/Spotlight";
import { motion } from "framer-motion";
import Link from "next/link";
import SignatureDraw from "../SignatureDraw";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BiCodeAlt } from "react-icons/bi";

const socialLinks = [
  {
    label: "Email",
    icon: <MdOutlineMailOutline />,
    url: "mailto:sharmavihaan190@gmail.com",
  },
  {
    label: "GitHub",
    icon: <AiFillGithub />,
    url: "https://github.com/Lemirq",
  },
  {
    label: "LinkedIn",
    icon: <AiFillLinkedin />,
    url: "https://www.linkedin.com/in/vs190",
  },
  {
    label: "Instagram",
    icon: <AiFillInstagram />,
    url: "https://www.instagram.com/vhaan.ca/",
  },
  {
    label: "DevPost",
    icon: <BiCodeAlt />,
    url: "https://devpost.com/sharmavihaan190",
  },
];

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
          // rotate x 180
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
      {/* two on the top and two on the bottom */}
      <div className="p-4 max-w-7xl mx-auto fc relative z-10 w-full pt-10 sm:pt-20 md:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-7xl max-w-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 tracking-tight w-full fr gap-5"
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
          📍 Toronto
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

        <div className="mt-8 flex justify-center gap-6 text-2xl text-neutral-400">
          {socialLinks.map(({ label, icon, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:-translate-y-1 hover:text-white"
              data-cursor="fill"
            >
              {icon}
            </a>
          ))}
        </div>

        <Link href="/resume" className="text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-10"
          >
            Resume
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
