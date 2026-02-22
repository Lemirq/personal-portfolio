import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectGalleryCarousel } from "@/components/ProjectGalleryCarousel";
import BackButton from "@/components/BackButton";
import { TrackedProjectLink } from "@/components/TrackedProjectLink";
import { ShaderBackground } from "@/components/ShaderMesh";
import { GlowingEffect } from "@/components/ui/glowing-effect";

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
  const project = await client.fetch(
    query,
    { slug },
    { next: { tags: ["projects", `project-${slug}`] } },
  );
  return project;
}

async function getTech() {
  return await client.fetch(
    `*[_type == "tech"]{techName, _id}`,
    {},
    { next: { tags: ["tech"] } },
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  const allTech = await getTech();

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30 relative overflow-hidden">
      <ShaderBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b bg-black/0.5 backdrop-blur-md  border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <BackButton />
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-20">
          {/* Header Section */}
          <header className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400 bg-opacity-50 font-serif">
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
                    (t: any) => t._id === techRef._ref,
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

              {project.url && (
                <TrackedProjectLink
                  url={project.url}
                  projectTitle={project.title}
                />
              )}
            </div>
          </header>

          {/* Media Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-4 animate-in fade-in zoom-in-95 duration-700 delay-150">
              <ProjectGalleryCarousel
                gallery={project.gallery}
                projectTitle={project.title}
              />
            </section>
          )}

          {/* Detailed Content */}
          <div className="space-y-16 w-full">
            {/* Overview */}
            {project.overview && (
              <section className="space-y-4 w-full">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 font-serif">
                  Overview
                </h2>
                <div className="prose prose-invert prose-lg text-gray-300 w-full max-w-none">
                  <PortableText value={project.overview} />
                </div>
              </section>
            )}

            {/* Problem Statement */}
            {project.problemStatement && (
              <section className="space-y-4 w-full">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 font-serif">
                  The Problem
                </h2>
                <div className="prose prose-invert prose-lg text-gray-300 w-full max-w-none">
                  <PortableText value={project.problemStatement} />
                </div>
              </section>
            )}

            {/* Solution */}
            {project.solution && (
              <section className="space-y-4 w-full">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 font-serif">
                  The Solution
                </h2>
                <div className="prose prose-invert prose-lg text-gray-300 w-full max-w-none">
                  <PortableText value={project.solution} />
                </div>
              </section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section className="space-y-6 w-full">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 font-serif">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {project.features.map((feature: any, i: number) => (
                    <div
                      key={i}
                      className="client-border relative p-px rounded-xl overflow-hidden h-full"
                    >
                      <div className="bg-[#101010] rounded-xl h-full p-6 flex flex-col gap-4 relative overflow-hidden group">
                        {/* Radial gradient overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
                          }}
                        />
                        <h3 className="text-white text-lg font-bold relative z-10">
                          {feature.title}
                        </h3>
                        <div className="prose prose-invert prose-sm text-neutral-400 max-w-none leading-relaxed relative z-10">
                          <PortableText value={feature.description} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <section className="space-y-6 w-full">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 font-serif">
                  Results & Impact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {project.results.map((result: any, i: number) => (
                    <div
                      key={i}
                      className="client-border relative p-px rounded-xl overflow-hidden h-full"
                    >
                      <div className="bg-[#101010] rounded-xl h-full p-6 flex flex-col gap-4 relative overflow-hidden group">
                        {/* Radial gradient overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
                          }}
                        />
                        <h3 className="text-white text-lg font-bold relative z-10">
                          {result.title}
                        </h3>
                        <div className="prose prose-invert prose-sm text-neutral-400 max-w-none leading-relaxed relative z-10">
                          <PortableText value={result.description} />
                        </div>
                      </div>
                    </div>
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
