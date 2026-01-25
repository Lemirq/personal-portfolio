"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Dialog,
  DialogTrigger,
  DialogImage,
  DialogContainer,
  DialogContent,
  DialogClose,
} from "./core/dialog";
import { IoClose } from "react-icons/io5";

// Create a DialogVideo component similar to DialogImage
function DialogVideo({
  src,
  title,
  className,
  uniqueId,
}: {
  src: string;
  title: string;
  className?: string;
  uniqueId: string;
}) {
  return (
    <motion.iframe
      src={src}
      title={title}
      className={cn(className)}
      layoutId={`dialog-video-${uniqueId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

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

// Helper to convert YouTube URLs to embed URLs with autoplay and HD quality
const getEmbedUrl = (url: string, autoplay: boolean = false): string => {
  try {
    const urlObj = new URL(url);
    // Request HD quality and autoplay if needed
    const params = autoplay
      ? "?autoplay=1&mute=1&hd=1&vq=hd1080"
      : "?hd=1&vq=hd1080";

    if (urlObj.hostname.includes("youtu.be")) {
      const id = urlObj.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}${params}`;
    }
    if (urlObj.hostname.includes("youtube.com")) {
      const v = urlObj.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}${params}`;
      if (urlObj.pathname.includes("/embed/")) {
        return autoplay
          ? `${url}?autoplay=1&mute=1&hd=1&vq=hd1080`
          : `${url}?hd=1&vq=hd1080`;
      }
    }
  } catch (e) {
    // If URL parsing fails, return as-is
  }
  return url;
};

// Define grid spans for items - creates visual variety
const getGridClass = (index: number, totalItems: number) => {
  // Special case: 4 items - first big, three below in a row
  if (totalItems === 4) {
    if (index === 0) {
      return "md:col-span-3"; // Full width
    }
    return "md:col-span-1"; // Each of the 3 remaining items gets 1 column
  }

  // First item is always large if we have 3+ items
  if (index === 0 && totalItems >= 3) {
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

  // Reorder gallery: put video first if exists, otherwise keep first image first
  const sortedGallery = [...gallery].sort((a, b) => {
    if (a._type === "video" && b._type !== "video") return -1;
    if (a._type !== "video" && b._type === "video") return 1;
    return 0;
  });

  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-1 gap-4",
        gallery.length === 1
          ? "md:grid-cols-1"
          : gallery.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-3",
      )}
    >
      {sortedGallery.map((item, index) => {
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
            {isVideo ? (
              // For videos: non-clickable container with zoom button
              <div
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-white/10 bg-black/50 hover:border-indigo-500/50 transition-colors duration-300",
                  gridClass,
                )}
              >
                {/* Zoom button in corner for videos */}
                <DialogTrigger>
                  <button className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 backdrop-blur-sm border border-white/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                  </button>
                </DialogTrigger>

                {/* Video content - fully interactive with layout animation */}
                <div className="w-full aspect-video relative">
                  <DialogVideo
                    src={getEmbedUrl(item.url, true)}
                    title={item.caption || "Video"}
                    className="w-full h-full"
                    uniqueId={item._key}
                  />
                </div>
              </div>
            ) : (
              // For images: full clickable area
              <DialogTrigger
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-white/10 bg-black/50 hover:border-indigo-500/50 transition-colors duration-300 cursor-pointer",
                  gridClass,
                )}
              >
                {/* Hover overlay for images */}
                <div className="absolute inset-0 z-10 bg-indigo-600/0 group-hover:bg-indigo-600/10 backdrop-blur-0 group-hover:backdrop-blur-[2px] transition-all duration-300 ease-out flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out text-white font-semibold text-lg">
                    Zoom
                  </div>
                </div>

                {/* Image content */}
                <div className="w-full aspect-video relative">
                  <DialogImage
                    src={item.asset.url}
                    alt={`${projectTitle} - Gallery image`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </DialogTrigger>
            )}

            {/* Dialog content */}
            <DialogContainer>
              <DialogContent className="relative max-w-7xl mx-auto w-fit">
                {isVideo ? (
                  <div className="relative w-[90vw] max-w-6xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                    <DialogVideo
                      src={getEmbedUrl(item.url, true)}
                      title={item.caption || "Video"}
                      className="w-full h-full"
                      uniqueId={item._key}
                    />
                  </div>
                ) : (
                  <div className="relative w-[90vw] max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden flex items-center justify-center">
                    <img
                      src={item.asset.url}
                      alt={`${projectTitle} - Full size`}
                      className="max-w-full max-h-[85vh] object-contain"
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
                  exit: {
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.15, ease: "easeIn" },
                  },
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
