import { cn } from "../utils/cn";
import Logo from "./Logo";

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
    url: "https://vhaan.me",
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
      <ul className="bg-zinc-900/50 backdrop-blur-xl border border-slate-300/10 rounded-3xl px-4 py-2 fr text-sm md:text-md gap-4 sm:gap-3">
        {sections.map(({ label, url, className }) => {
          if (url.toString().includes("http"))
            return (
              <li
                key={label.toString()}
                className={cn(
                  "sm:px-3 py-2 rounded-full sm:border border-zinc-800 sm:hover:bg-zinc-800 transition-colors bg-transparent cursor-pointer",
                  className
                )}
              >
                <a href={url}>{label}</a>
              </li>
            );
          return (
            <li
              key={label.toString()}
              className={cn(
                "sm:px-3 py-2 rounded-full sm:border border-slate-300/10 sm:hover:bg-zinc-800 transition-colors bg-transparent cursor-pointer",
                className
              )}
              onClick={() =>
                document
                  .querySelector(url)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
