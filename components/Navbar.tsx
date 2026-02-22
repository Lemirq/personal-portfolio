import { cn } from "../utils/cn";
import Logo from "./Logo";
import GlassSurface from "./GlassSurface";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { pageAnimation } from "@/utils/pageAnimation";

const sections = [
  {
    label: (
      <>
        <Logo
          variant="white"
          pathClassName="group-hover:fill-indigo-500 transition-colors"
          svgPathName="hidden md:block"
          size="32px"
        />
        <Logo
          variant="white"
          pathClassName="group-hover:fill-indigo-500 transition-colors"
          svgPathName="block md:hidden"
          size="16px"
        />
      </>
    ),
    url: "/",
    className: "border-none hover:bg-transparent",
  },
  {
    label: "Projects",
    url: "#projects",
  },
  {
    label: "About",
    url: "#about",
  },
  {
    label: "Experience",
    url: "#experience",
  },
  {
    label: "Contact",
    url: "#contact",
  },
];

const Navbar = () => {
  const router = useTransitionRouter();

  return (
    <div className="fixed top-5 sm:top-7 fr w-screen z-50">
      <GlassSurface
        id="navbar-glass"
        displace={0.5}
        distortionScale={-180}
        brightness={50}
        opacity={0.93}
        backgroundOpacity={0.5}
        // mixBlendMode="screen"
        width={450}
        borderRadius={24}
        className="border border-black/5"
      >
        <ul className="rounded-full px-4 py-2 fr text-sm md:text-md gap-4 sm:gap-3 mix-blend-difference">
          {sections.map(({ label, url, className }) => {
            return (
              <li
                key={typeof label === "string" ? label : "home-logo"}
                data-cursor="snap"
                className={cn(
                  "sm:px-3 py-2 rounded-full sm:border border-zinc-800 sm:hover:bg-zinc-800 transition-colors bg-transparent cursor-pointer bg-blend-screen",
                  className,
                )}
              >
                <Link
                  href={url}
                  onClick={(e) => {
                    if (url.startsWith("/")) {
                      if (url.includes("#")) {
                        return;
                      }

                      if (url === "/" || !url.startsWith("#")) {
                        e.preventDefault();
                        router.push(url, {
                          onTransitionReady: pageAnimation,
                        });
                      }
                    }
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </GlassSurface>
    </div>
  );
};

export default Navbar;
