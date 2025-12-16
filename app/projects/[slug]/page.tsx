import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowLeft, BsGithub, BsGlobe } from "react-icons/bs";
import { notFound } from "next/navigation";
import { Spotlight } from "@/components/Spotlight";
import GlassSurface from "@/components/GlassSurface";
import { Button } from "@/components/MovingBorder";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectGalleryCarousel } from "@/components/ProjectGalleryCarousel";

// Revalidate project data every hour
export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  const query = `
    *[_type == "project" && slug.current == $slug][0] {
      title,
      headline,
      description,
      url,
      tech,
      overview,
      problemStatement,
      solution,
      solution,
      features[] {
        title,
        description
      },
      results[] {
        title,
        description
      },
      gallery[] {
        _type,
        _key,
        asset-> {
          _id,
          url
        },
        url,
        caption
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
  const { slug } = await params;
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
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050511]/80 backdrop-blur-xs border-b border-white/5">
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
              <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
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

          {/* Media Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-8 animate-in fade-in zoom-in-95 duration-700 delay-150">
              <h2 className="text-3xl font-bold text-white">Media Gallery</h2>
              <ProjectGalleryCarousel gallery={project.gallery} projectTitle={project.title} />
            </section>
          )}

          {/* Detailed Content */}
          <div className="space-y-16 w-full">
            {/* Overview */}
            {project.overview && (
              <section className="space-y-4 w-full">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-px bg-indigo-500"></span>
                  Overview
                </h2>
                <div className="prose prose-invert prose-xl prose text-gray-300">
                  <PortableText value={project.overview} />
                </div>
              </section>
            )}

            {/* Problem Statement */}
            {project.problemStatement && (
              <section className="space-y-4 w-full">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-px bg-red-500"></span>
                  The Problem
                </h2>
                <div className="prose prose-invert prose-lg text-gray-300">
                  <PortableText value={project.problemStatement} />
                </div>
              </section>
            )}

            {/* Solution */}
            {project.solution && (
              <section className="space-y-4 w-full">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-px bg-emerald-500"></span>
                  The Solution
                </h2>
                <div className="prose prose-invert prose-lg text-gray-300">
                  <PortableText value={project.solution} />
                </div>
              </section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section className="space-y-6 w-full">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-px bg-violet-500"></span>
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {project.features.map((feature: any, i: number) => (
                    <Card key={i} className="bg-white/5 border-white/10 text-gray-300">
                      <CardHeader>
                        <CardTitle className="text-violet-300">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-invert prose-sm text-gray-300 max-w-none">
                          <PortableText value={feature.description} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <section className="space-y-6 w-full">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-px bg-amber-500"></span>
                  Results & Impact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {project.results.map((result: any, i: number) => (
                    <Card key={i} className="bg-white/5 border-white/10 text-gray-300">
                      <CardHeader>
                        <CardTitle className="text-amber-300">{result.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-invert prose-sm text-gray-300 max-w-none">
                          <PortableText value={result.description} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
