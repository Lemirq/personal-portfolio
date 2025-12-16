import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowLeft, BsGithub, BsGlobe } from "react-icons/bs";
import { notFound } from "next/navigation";
import { Spotlight } from "@/components/Spotlight";
import GlassSurface from "@/components/GlassSurface";
import { Button } from "@/components/MovingBorder";

// Revalidate project data every hour
export const revalidate = 3600;

interface Props {
  params: { slug: string };
}

async function getProject(slug: string) {
  const query = `
    *[_type == "project" && slug.current == $slug][0] {
      title,
      headline,
      url,
      videoUrl,
      tech,
      body,
      overview,
      problemStatement,
      solution,
      features,
      results,
      mainImage {
        asset-> {
          _id,
          url
        }
      },
      gallery[] {
        asset-> {
          _id,
          url
        }
      }
    }
  `;
  const project = await client.fetch(query, { slug });
  return project;
}

// Fetch all technologies for mapping
async function getTech() {
  return await client.fetch(`*[_type == "tech"]{techName, _id}`);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = params;
  const project = await getProject(slug);
  const allTech = await getTech();

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050511] text-white selection:bg-indigo-500/30 relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050511]/80 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-20">
          {/* Header Section */}
          <header className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                {project.title}
              </h1>
              {project.headline && (
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed">
                  {project.headline}
                </p>
              )}
            </div>

            {/* Tech Stack & Links */}
            <div className="flex flex-wrap gap-4 items-center justify-between border-y border-white/10 py-6">
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((techRef: any) => {
                  const technology = allTech.find(
                    (t: any) => t._id === techRef._ref
                  );
                  return (
                    technology && (
                      <span
                        key={techRef._ref}
                        className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm"
                      >
                        {technology.techName}
                      </span>
                    )
                  );
                })}
              </div>

              <div className="flex gap-4">
                {project.url && (
                  <Button
                    // className="bg-slate-900 text-white border-neutral-200 dark:border-slate-800"
                    as="a"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                   <div className="flex items-center gap-2">
                     <BsGlobe /> Visit Site
                   </div>
                  </Button>
                )}
                {/* Note: Repo link field wasn't generic, assumed 'url' is live site. 
                    If there's a repo link in specific field, add it here. */}
              </div>
            </div>
          </header>

          {/* Hero Media */}
          <section className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 aspect-video relative animate-in fade-in zoom-in-95 duration-700 delay-150 shadow-2xl shadow-indigo-500/10">
            {project.videoUrl ? (
              <iframe
                className="w-full h-full"
                src={(() => {
                  try {
                    const url = new URL(project.videoUrl as string);
                    if (url.hostname.includes("youtu.be")) {
                      const id = url.pathname.replace("/", "");
                      return `https://www.youtube.com/embed/${id}?autoplay=0`;
                    }
                    if (url.hostname.includes("youtube.com")) {
                      const v = url.searchParams.get("v");
                      if (v) return `https://www.youtube.com/embed/${v}?autoplay=0`;
                      if (url.pathname.includes("/embed/"))
                        return project.videoUrl as string;
                    }
                  } catch (e) {}
                  return project.videoUrl as string;
                })()}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              project.mainImage && (
                <Image
                  src={project.mainImage.asset.url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              )
            )}
          </section>

          {/* Detailed Content */}
          <div className="space-y-16">
            {/* Overview */}
            {project.overview && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-indigo-500"></span>
                  Overview
                </h2>
                <div className="prose prose-invert prose-lg text-gray-300">
                  <PortableText value={project.overview} />
                </div>
              </section>
            )}

            {/* Problem Statement */}
            {project.problemStatement && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-red-500"></span>
                  The Problem
                </h2>
                <div className="prose prose-invert prose-lg text-gray-300">
                  <PortableText value={project.problemStatement} />
                </div>
              </section>
            )}

            {/* Solution */}
            {project.solution && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-emerald-500"></span>
                  The Solution
                </h2>
                <div className="prose prose-invert prose-lg text-gray-300">
                  <PortableText value={project.solution} />
                </div>
              </section>
            )}

            {/* Features */}
            {project.features && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-violet-500"></span>
                  Key Features
                </h2>
                <GlassSurface
                  className="p-8 rounded-3xl !block w-full"
                  backgroundOpacity={0.05}
                  borderWidth={0.5}
                >
                  <div className="prose prose-invert prose-lg text-gray-300">
                    <PortableText value={project.features} />
                  </div>
                </GlassSurface>
              </section>
            )}

            {/* Results */}
            {project.results && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-amber-500"></span>
                  Results & Impact
                </h2>
                <GlassSurface
                  className="p-8 rounded-3xl !block w-full"
                  backgroundOpacity={0.05}
                  borderWidth={0.5}
                >
                  <div className="prose prose-invert prose-lg text-gray-300">
                    <PortableText value={project.results} />
                  </div>
                </GlassSurface>
              </section>
            )}

            {/* Body (Legacy Support) */}
            {!project.overview && project.body && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-gray-500"></span>
                  Details
                </h2>
                <div className="prose prose-invert prose-lg text-gray-300">
                  <PortableText value={project.body} />
                </div>
              </section>
            )}
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-8 pt-12 border-t border-white/10">
              <h2 className="text-3xl font-bold">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((image: any, i: number) => (
                  <div
                    key={image.asset._id}
                    className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group grayscale hover:grayscale-0 transition-all duration-500"
                  >
                    <Image
                      src={image.asset.url}
                      alt={`Gallery image ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
