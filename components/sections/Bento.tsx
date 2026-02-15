import { useMainStore } from "@/stores/main-state-provider";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const tech = [
  "Next.js",
  "React.js",
  "Typescript",
  "Node.js",
  "Express.js",
  "PostgreSQL",
];

const TiltCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{
        z: 30,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={className}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          transform: "translateZ(10px)",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

const Bento = () => {
  const { about, iknow } = useMainStore((state) => state);
  const [globeVisible, setGlobeVisible] = useState(false);
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
    }),
  };

  const child: Variants = {
    visible: {
      // opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      // opacity: 0,
      filter: "blur(50px)",
      x: 100,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    setGlobeVisible(true);
  }, []);
  return (
    <section className="w-full max-w-6xl mx-auto select-none">
      <h2 className="text-3xl sm:text-5xl font-bold mb-5 sm:px-10 px-5 font-serif">
        For <span className="text-neutral-400">Clients</span>...
      </h2>
      <div className="w-full grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 gap-4 p-4">
        <div className="client-border relative p-px rounded-2xl overflow-hidden md:row-span-2 w-full h-full">
          <div className="group bg-[#101010] rounded-2xl overflow-hidden text-center h-full w-full relative">
            <img
              src="/images/Collaboration.jpg"
              alt="Collaboration"
              className="rounded-2xl aspect-4/3 mix-blend-luminosity"
            />
            <div className="w-full inset-0 bg-linear-to-b from-transparent to-black via-transparent from-30% absolute fc justify-end items-start ">
              <h3 className="text-lg md:text-xl font-bold text-left text-white p-4">
                From Concept to Launch. Building complex, high-performance
                applications requires more than just code. I provide transparent
                workflows and regular check-ins so you never have to guess where
                your project stands.
              </h3>
            </div>
            {/* blue radial gradient top right */}
            <motion.div
              initial={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.00) 60%",
              }}
              whileInView={{
                background:
                  "radial-gradient(circle at 94% 6%, rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.00) 60%",
              }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-10"
            />
          </div>
        </div>

        <div className="client-border relative p-px rounded-2xl overflow-hidden w-full min-h-[200px] sm:min-h-0 h-full">
          <div className="group bg-[#101010] rounded-2xl p-4 text-center w-full h-full relative overflow-hidden">
            <h3 className="text-lg md:text-2xl font-bold text-left absolute z-10">
              Seamless Global Collaboration. Fast response times and transparent,
              asynchronous workflows. Your project keeps moving forward, wherever
              you're based.
            </h3>
            {/* <div className="md:absolute w-full aspect-square md:top-5 z-10">
						<Cobe />
					</div> */}
            {/* {globeVisible && <GlobeDemo />} */}
            {/* skew to appear as a globe */}
            <Image
              src="/images/worldmap.svg"
              alt="World"
              width={384}
              height={216}
              className="skew-[-10deg] w-full absolute"
            />
          </div>
        </div>

        <div className="client-border relative p-px rounded-2xl overflow-hidden w-full h-full">
          <div className="group bg-[#101010] rounded-2xl p-4 text-center w-full h-full relative overflow-hidden">
            <div className="fc items-start md:absolute md:h-full group-hover:translate-y-2 transition-transform z-10">
              <p className="text-sm tracking-wide uppercase">
                Leveraging Next.js, TypeScript & Supabase
              </p>
              <h3 className="text-lg md:text-2xl font-bold text-left mb-10">
                The Modern Web Stack
              </h3>
            </div>
            <div className="fr absolute right-0 gap-4 group-hover:-translate-y-12 transition-transform hidden lg:flex">
              <div className="fc gap-4">
                {tech.map((t) => (
                  <div
                    key={t}
                    className="client-border relative p-px rounded-xl w-full"
                  >
                    <div className="text-lg p-5 bg-[#171717] rounded-xl w-full h-full">
                      {t}
                    </div>
                  </div>
                ))}
              </div>
              <div className="fc -translate-y-[60%] gap-4 group-hover:-translate-y-[35%] transition-transform">
                {tech.map((t) => (
                  <div
                    key={t}
                    className="client-border relative p-px rounded-xl w-full"
                  >
                    <div className="text-lg p-5 bg-[#171717] rounded-xl w-full h-full">
                      {t}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fc bottom-0 gap-4 group-hover:-translate-x-12 transition-transform flex lg:hidden">
              <div className="fr gap-4">
                {tech.map((t) => (
                  <div
                    key={t}
                    className="client-border relative p-px rounded-xl w-full"
                  >
                    <div className="text-lg p-5 bg-[#171717] rounded-xl w-full h-full">
                      {t}
                    </div>
                  </div>
                ))}
              </div>
              <div className="fr -translate-x-[20%] gap-4 group-hover:-translate-x-[15%] transition-transform">
                {tech.map((t) => (
                  <div
                    key={t}
                    className="client-border relative p-px rounded-xl w-full"
                  >
                    <div className="text-lg p-5 bg-[#171717] rounded-xl w-full h-full">
                      {t}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* horizontal version for mobile */}
          </div>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-3 md:grid-rows-2 grid-cols-1 gap-4 p-4">
        <div className="client-border relative p-px rounded-2xl overflow-hidden text-center w-full h-full fc items-end">
          <div className="group bg-[#101010] bg-grid-white/[0.02] rounded-2xl h-full w-full relative overflow-hidden fc items-end">
            <h3 className="text-lg md:text-2xl font-bold text-left mb-16 p-4 group-hover:translate-x-2 transition-transform">
              Architecting for Scale. Whether it's an AI-driven platform or a
              robust web application, I build secure, high-traffic solutions
              designed to grow with your user base.
            </h3>
            <img
              src="/images/Page.jpg"
              alt="tech"
              className="rounded-2xl w-1/2 mix-blend-luminosity right-2 absolute -bottom-20 group-hover:-translate-y-2 transition-transform"
            />
            {/* radial gradient middle left */}
            <motion.div
              initial={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.00) 60%",
              }}
              whileInView={{
                background:
                  "radial-gradient(circle at 20% 70%, rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.00) 60%",
              }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-10 pointer-events-none"
            />
          </div>
        </div>
        <div className="rounded-2xl w-full min-h-full relative overflow-hidden col-span-2 row-span-2 fc bg-transparent p-0 border-none">
          <motion.ul
            initial="hidden"
            whileInView="visible"
            variants={container}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full h-full"
          >
            {about?.iknow?.map((i) => {
              const curr = iknow.find((t) => t._id === i._ref);
              if (!curr) return null;
              return (
                <TiltCard
                  key={curr._id}
                  className="relative p-px overflow-hidden rounded-2xl w-full h-full min-h-[100px]"
                >
                  <div className="client-border size-full fc rounded-2xl relative p-px overflow-hidden">
                    <div className="size-full fc rounded-2xl bg-[#0f0f0f] p-4 transition-all duration-300 hover:bg-[#1f1f1f]">
                      <div
                        className={`${curr.className} text-4xl sm:text-5xl md:text-6xl text-neutral-200 transition-colors duration-300 hover:text-white`}
                      ></div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </motion.ul>
        </div>
        <div className="client-border relative p-px rounded-2xl overflow-hidden w-full h-full">
          <div className="group bg-[#101010] rounded-2xl p-4 text-center w-full h-full relative overflow-hidden fc gap-2">
            <h3 className="text-lg md:text-2xl font-bold text-left p-4">
              Ready to build something exceptional? <br /> Let's turn your vision
              into reality.
            </h3>

            <button
              onClick={handleScrollToContact}
              className="px-5 py-3 bg-[#171717] border-neutral-700 border rounded-2xl text-white hover:bg-neutral-800 transition-colors"
            >
              Let's Talk
            </button>
            {/* radial gradient bottom right */}
            <div
              style={{
                background: `radial-gradient(at 0% 0%, rgba(255,255,255,0.1) 0px, transparent 50%),
              radial-gradient(at 10% 0%, rgba(255,255,255,0.05) 0px, transparent 50%),
              radial-gradient(at 30% 0%, rgba(255,255,255,0.01) 0px, transparent 50%),
              radial-gradient(at 58% 0%, rgba(255,255,255,0.01) 0px, transparent 50%),
              radial-gradient(at 60% 0%, rgba(255,255,255,0.05) 0px, transparent 50%),
              radial-gradient(at 80% 00%, rgba(255,255,255,0.05) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(255,255,255,0.1) 0px, transparent 70%)`,
                // 'radial-gradient(circle at 94% 6%, rgba(139,92,246,0.40) 0%,rgba(255,255,255,0.00)), radial-gradient(circle at 20% 6%, rgba(32,59,121,0.40) 0%,rgba(255,255,255,0.00))',
              }}
              className="absolute inset-0 opacity-40 z-10 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bento;
