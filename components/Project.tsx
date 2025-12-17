import Image from "next/image";
import { motion } from "motion/react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { pageAnimation } from "@/utils/pageAnimation";

// Helper to convert YouTube URLs to embed URLs
const getEmbedUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtu.be")) {
      const id = urlObj.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }
    if (urlObj.hostname.includes("youtube.com")) {
      const v = urlObj.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (urlObj.pathname.includes("/embed/")) return url;
    }
  } catch (e) {
    // If URL parsing fails, return as-is
  }
  return url;
};

const Project = ({ project, tech }: { project: project; tech: tech[] }) => {
  const router = useTransitionRouter();
  const projectSlug = project.slug?.current;
  // Get first item from gallery (can be image or video)
  const firstGalleryItem = project.gallery?.[0];
  const isVideo = firstGalleryItem?._type === "video";
  const imageUrl = firstGalleryItem && firstGalleryItem._type === "image" && firstGalleryItem.asset
    ? firstGalleryItem.asset.url
    : "/images/meta.png";
  const videoUrl = isVideo && firstGalleryItem._type === "video" ? getEmbedUrl(firstGalleryItem.url) : null;
  
  const href = projectSlug ? `/projects/${projectSlug}` : "";

  return (
    <Link 
      href={href}
      onClick={(e) => {
        if (projectSlug) {
            e.preventDefault();
            router.push(href, {
                onTransitionReady: pageAnimation,
            });
        }
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
          visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          },
        }}
        key={project._id}
        className="w-full h-full group bg-neutral-700/40 rounded-2xl border border-neutral-800 hover:border-neutral-600 transition-colors flex flex-col overflow-hidden"
      >
        <div className="w-full aspect-video relative overflow-hidden bg-slate-900 border-b border-neutral-800">
          {/* Overlay */}
          <div className="w-full h-full absolute z-10 top-0 left-0 group-hover:opacity-100 opacity-0 bg-indigo-900/40 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-red-500 text-red-500 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Case Study <BsArrowRight className="text-xl" />
            </div>
          </div>

          {isVideo && videoUrl ? (
            <iframe
              src={videoUrl}
              title={project.title!}
              className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <Image
              src={imageUrl}
              alt={project.title!}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="p-6 flex flex-col gap-4 grow">
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h4>
            {project.description && (
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            )}
          </div>

          <div className="mt-auto">
            <ul className="flex flex-wrap gap-2">
              {project?.tech?.slice(0, 3).map((tag, i) => (
                <li
                  key={i}
                  className="px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-[11px] text-indigo-200"
                >
                  {tech.find((t) => t._id === tag._ref)?.techName}
                </li>
              ))}
              {project?.tech && project.tech.length > 3 && (
                <li className="px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-[11px] text-indigo-200">
                  +{project.tech.length - 3}
                </li>
              )}
            </ul>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Project;
