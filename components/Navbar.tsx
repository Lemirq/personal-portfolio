import { cn } from "../utils/cn";
import Logo from "./Logo";
import GlassSurface from "./GlassSurface";

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
    label: "Contact",
    url: "#contact",
  },
];

const Navbar = () => {
  return (
    <div className="fixed top-5 sm:top-7 fr w-screen z-50">
      <GlassSurface
        id="navbar-glass"
        displace={0.5}
        distortionScale={-180}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        brightness={50}
        opacity={0.93}
        backgroundOpacity={0.5}
        // mixBlendMode="screen"
        width={350}
        borderRadius={24}
        className="border border-black/5"
      >
        <ul className="rounded-3xl px-4 py-2 fr text-sm md:text-md gap-4 sm:gap-3 mix-blend-difference">
          {sections.map(({ label, url, className }) => {
            return (
              <li
                key={label.toString()}
                className={cn(
                  "sm:px-3 py-2 rounded-full sm:border border-zinc-800 sm:hover:bg-zinc-800 transition-colors bg-transparent cursor-pointer bg-blend-screen",
                  className
                )}
              >
                <a href={url}>{label}</a>
              </li>
            );
          })}
        </ul>
      </GlassSurface>
    </div>
  );
};

export default Navbar;
