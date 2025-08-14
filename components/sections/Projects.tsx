import { useMainStore } from "@/stores/main-state-provider";
import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogImage,
  DialogTrigger,
} from "../core/dialog";
import { PortableText } from "@portabletext/react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const Projects = () => {
  const { projects, tech } = useMainStore((state) => state);
  const visibleProjects = useMemo(
    () => projects.filter((p) => !p.invisible),
    [projects]
  );
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const active = activeIdx === null ? null : visibleProjects[activeIdx];

  return (
    <section
      className="w-full mx-auto py-16 md:py-32 px-5 md:px-10"
      id="projects"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl m-auto">
        {/* Left Preview */}
        <div className="hidden lg:block lg:col-span-7">
          {active ? (
            <div className="w-full backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden min-h-[24rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="fc items-start gap-6"
                >
                  {/* media */}
                  {active.videoUrl ? (
                    <div className="w-full rounded-xl overflow-hidden">
                      <div className="w-full aspect-video">
                        <iframe
                          className="w-full h-full"
                          src={(() => {
                            try {
                              const url = new URL(active.videoUrl as string);
                              if (url.hostname.includes("youtu.be")) {
                                const id = url.pathname.replace("/", "");
                                return `https://www.youtube.com/embed/${id}`;
                              }
                              if (url.hostname.includes("youtube.com")) {
                                const v = url.searchParams.get("v");
                                if (v) {
                                  const start =
                                    url.searchParams.get("start") ||
                                    url.searchParams.get("t");
                                  return `https://www.youtube.com/embed/${v}${start ? `?start=${start.replace("s", "")}` : ""}`;
                                }
                                if (url.pathname.includes("/embed/"))
                                  return active.videoUrl as string;
                              }
                            } catch (e) {}
                            return active.videoUrl as string;
                          })()}
                          title={active.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={active.mainImage?.asset?.url || "/images/meta.png"}
                      alt={active.title || ""}
                      className="w-full rounded-xl aspect-video object-cover"
                    />
                  )}

                  {/* details */}
                  <div className="p-4 pt-0 sm:pt-0 sm:p-8 w-full fc items-start gap-3">
                    <Link
                      className="group text-3xl"
                      href={active.url as string}
                    >
                      <h3 className="font-bold hover:text-violet-400 transition-colors fr gap-1">
                        <span>{active.title}</span>
                        <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </h3>
                    </Link>
                    <ul className="fr gap-2 justify-start flex-wrap">
                      {active?.tech?.map((tag, i) => (
                        <li
                          key={i}
                          className="px-4 py-1 rounded-full border border-violet-500/50 text-[12px]"
                        >
                          {tech.find((t) => t._id === tag._ref)?.techName}
                        </li>
                      ))}
                    </ul>
                    {active.body && (
                      <PortableText
                        components={{
                          block: ({ children }) => (
                            <div className="text-sm text-slate-300">
                              {children}
                            </div>
                          ),
                          list: ({ children }) => (
                            <ul className="list-disc list-outside pl-5 text-sm text-slate-300">
                              {children}
                            </ul>
                          ),
                          listItem: ({ children }) => (
                            <li className="text-sm text-slate-300">
                              {children}
                            </li>
                          ),
                        }}
                        value={active.body}
                      />
                    )}
                    {active.gallery && active.gallery.length > 0 && (
                      <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-3 pt-2">
                        {active.gallery.map((g, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={i}
                            src={g.asset?.url as string}
                            alt={`${active.title}-${i}`}
                            className="w-full rounded-lg object-cover aspect-video"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <p className="text-3xl text-slate-400 fr gap-2 justify-start">
              <span>Hover a project from the list </span> <ArrowRight />
            </p>
          )}
        </div>

        {/* Right list */}
        <div className="lg:col-span-5 w-full">
          <h2 className="text-5xl font-bold mb-6">Projects</h2>
          <ul className="w-full divide-y divide-white/10 rounded-2xl">
            {visibleProjects.map((p, idx) => {
              const images = [
                p.mainImage?.asset?.url,
                ...(p.gallery?.map((g) => g.asset?.url) || []),
              ].filter(Boolean) as string[];
              return (
                <li
                  key={p._id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group w-full px-5 sm:px-6 py-4 transition-colors rounded-2xl backdrop-blur-sm cursor-pointer ${idx === activeIdx ? "bg-white/5" : "hover:bg-white/5"}`}
                >
                  {/* Desktop row visual only; modal removed on lg+ */}
                  <div className="hidden lg:flex fr justify-between items-center w-full">
                    <div className="fr w-full justify-between gap-1 text-left">
                      <p className="text-lg sm:text-xl font-semibold line-clamp-1">
                        {p.title}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-[42ch] ml-2">
                        {p.headline}
                      </p>
                    </div>
                  </div>
                  {/* Mobile retains modal */}
                  <div className="lg:hidden">
                    <Dialog transition={{ duration: 0.1, ease: "easeInOut" }}>
                      <DialogTrigger className="fr justify-between items-center w-full">
                        <div className="fc items-start gap-1 text-left">
                          <p className="text-lg sm:text-xl font-semibold">
                            {p.title}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1 max-w-[42ch]">
                            {p.headline}
                          </p>
                        </div>
                        <span className="text-violet-400 text-sm">Open</span>
                      </DialogTrigger>
                      <DialogContainer>
                        <DialogContent className="relative p-2 w-full max-w-5xl rounded-2xl">
                          <div className="w-full rounded-2xl bg-[#0c0a1d] text-white p-4 m:p-8">
                            <div className="w-full fr justify-between items-start">
                              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                                {p.title}
                              </h3>
                              <DialogClose className="h-fit w-fit rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                              {images.length === 0 && (
                                <div className="aspect-video rounded-lg bg-white/5" />
                              )}
                              {images.map((src, i) => (
                                <DialogImage
                                  key={i}
                                  src={src}
                                  alt={`${p.title}-${i}`}
                                  className="w-full rounded-lg object-cover aspect-video"
                                />
                              ))}
                            </div>
                            <div className="fc items-start gap-3">
                              <ul className="fr gap-2 justify-start flex-wrap">
                                {p?.tech?.map((tag, i) => (
                                  <li
                                    key={i}
                                    className="px-4 py-1 rounded-full border border-violet-500/10 text-[12px]"
                                  >
                                    {
                                      tech.find((t) => t._id === tag._ref)
                                        ?.techName
                                    }
                                  </li>
                                ))}
                              </ul>
                              {p.body && (
                                <PortableText
                                  components={{
                                    block: ({ children }) => (
                                      <div className="text-sm">{children}</div>
                                    ),
                                  }}
                                  value={p.body}
                                />
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </DialogContainer>
                    </Dialog>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="w-full fc gap-2">
            <p className="text-sm text-slate-400">
              + way more on my{" "}
              <Link
                href="https://github.com/Lemirq"
                className="text-violet-400"
              >
                github
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile list only heading */}
      <div className="lg:hidden mt-8">
        <p className="text-slate-400 text-sm">
          Tap a project to open the gallery.
        </p>
      </div>
    </section>
  );
};

export default Projects;
