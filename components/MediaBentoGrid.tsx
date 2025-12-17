"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogImage,
  DialogContainer,
  DialogContent,
  DialogClose,
} from "./core/dialog";
import { IoClose } from "react-icons/io5";

type GalleryItem =
  | {
      _type: "image";
      _key: string;
      asset: {
        _id: string;
        url: string;
      };
    }
  | {
      _type: "video";
      _key: string;
      url: string;
      caption?: string;
    };

interface MediaBentoGridProps {
  gallery: GalleryItem[];
  projectTitle: string;
}

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

// Define grid spans for items - creates visual variety
const getGridClass = (index: number, totalItems: number) => {
  // First item is always large if we have 4+ items
  if (index === 0 && totalItems >= 4) {
    return "md:col-span-2 md:row-span-2";
  }

  // Every 5th and 6th item after first gets larger
  const position = (index - 1) % 10;
  if (position === 4 || position === 5) {
    return "md:col-span-2";
  }

  return "md:col-span-1 md:row-span-1";
};

export function MediaBentoGrid({ gallery, projectTitle }: MediaBentoGridProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-1 gap-4",
        gallery.length === 1
          ? "md:grid-cols-1"
          : gallery.length === 2
          ? "md:grid-cols-2"
          : "md:grid-cols-3"
      )}
    >
      {gallery.map((item, index) => {
        const isVideo = item._type === "video";
        const gridClass = getGridClass(index, gallery.length);

        return (
          <Dialog
            key={item._key}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            <DialogTrigger
              className={cn(
                "group relative overflow-hidden rounded-xl border border-white/10 bg-black/50 hover:border-indigo-500/50 transition-colors duration-300 cursor-pointer",
                gridClass
              )}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 z-10 bg-indigo-600/0 group-hover:bg-indigo-600/10 backdrop-blur-0 group-hover:backdrop-blur-[2px] transition-all duration-300 ease-out flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out text-white font-semibold text-lg">
                  {isVideo ? "Play Video" : "Zoom"}
                </div>
              </div>

              {/* Media content */}
              {isVideo ? (
                <div className="w-full h-full relative">
                  <iframe
                    className="w-full h-full pointer-events-none"
                    src={getEmbedUrl(item.url)}
                    title={item.caption || "Video"}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{ pointerEvents: "none" }}
                  />
                </div>
              ) : (
                <DialogImage
                  src={item.asset.url}
                  alt={`${projectTitle} - Gallery image`}
                  className="w-full"
                />
              )}
            </DialogTrigger>

            {/* Dialog content */}
            <DialogContainer>
              <DialogContent className="relative max-w-7xl mx-auto w-fit">
                {isVideo ? (
                  <div className="relative w-[90vw] max-w-6xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                    <iframe
                      className="w-full h-full"
                      src={getEmbedUrl(item.url)}
                      title={item.caption || "Video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden border border-white/10">
                    <DialogImage
                      src={item.asset.url}
                      alt={`${projectTitle} - Full size`}
                      className="w-full object-contain"
                    />
                  </div>
                )}

                {/* Caption if available */}
                {isVideo && item.caption && (
                  <div className="mt-4 text-center">
                    <p className="text-white/80 text-lg">{item.caption}</p>
                  </div>
                )}
              </DialogContent>

              <DialogClose
                className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1 z-50"
                variants={{
                  initial: { opacity: 0, scale: 0.9 },
                  animate: {
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.15, duration: 0.2, ease: "easeOut" },
                  },
                  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15, ease: "easeIn" } },
                }}
              >
                <IoClose className="h-5 w-5 text-zinc-500" />
              </DialogClose>
            </DialogContainer>
          </Dialog>
        );
      })}
    </div>
  );
}
