"use client";
import { useMainStore } from "@/stores/main-state-provider";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import Markdown from "../Markdown";

gsap.registerPlugin(useGSAP);

const About = () => {
  const { about } = useMainStore((state) => state);

  const builder = imageUrlBuilder(client);
  function urlFor(source: object) {
    return builder.image(source);
  }
  const svgRef = useRef<SVGSVGElement | null>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;
      const q = gsap.utils.selector(svgRef);

      // Subtle and slower range for frequency and scale
      gsap.fromTo(
        q("feTurbulence"),
        { attr: { baseFrequency: 0.56, seed: 4 } },
        {
          duration: 60,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          attr: { baseFrequency: 0.7, seed: 4 },
        }
      );

      gsap.fromTo(
        q("feDisplacementMap"),
        { attr: { scale: 200 } },
        {
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          attr: { scale: 100 },
        }
      );
    },
    { scope: svgRef }
  );
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full max-w-6xl mx-auto py-16 md:py-32 md:pt-12 overflow-x-scroll px-5 md:px-10"
      id="about"
    >
      <div className="w-full max-w-6xl fc gap-24">
        <div className="fc md:fr gap-11 w-full">
          {/* <img
						className="rounded-full w-full h-full md:max-w-md md:w-full md:h-auto md:rounded-full"
						src={(about && urlFor(about.mainImage).width(1000).height(1000).url()) || '/images/Vihaan-sq.jpg'}
						width="100%"
						height="100%"
					/> */}
          <svg
            ref={svgRef}
            id="pfp"
            viewBox="0 0 2000 2000"
            fill="none"
            className="md:max-w-md md:w-full fc md:rounded-lg group w-full"
            preserveAspectRatio="xMidYMin slice"
          >
            <defs>
              <filter id="displacementFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.9"
                  numOctaves="1"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  scale="120"
                />
              </filter>
              <mask id="circleMask">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="white"
                  className="displacement"
                  style={{ filter: "url(#displacementFilter)" }}
                />
              </mask>
            </defs>

            <image
              className="rounded-full w-full h-full md:max-w-md md:w-full md:h-auto md:rounded-lg"
              href={
                about?.mainImage
                  ? urlFor(about.mainImage).width(1000).height(1000).url()
                  : "/images/vihaan-sq.jpg"
              }
              width="100%"
              height="100%"
              mask="url(#circleMask)"
            />
          </svg>

          <div className="w-full fc sm:items-start gap-2">
            <h2 className="text-5xl">{about && about.heading}</h2>
            {/* <p className="text-lg text-slate-400">{about && about.body}</p> */}
            {about?.body && (
              <Markdown block="text-sm text-slate-400" markdown={about.body} />
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
