"use client";

import { MediaBentoGrid } from "./MediaBentoGrid";

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

interface ProjectGalleryCarouselProps {
  gallery: GalleryItem[];
  projectTitle: string;
}

export function ProjectGalleryCarousel({
  gallery,
  projectTitle,
}: ProjectGalleryCarouselProps) {
  if (!gallery || gallery.length === 0) return null;

  return <MediaBentoGrid gallery={gallery} projectTitle={projectTitle} />;
}
