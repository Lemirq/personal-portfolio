import Container from "./container";
import { client } from "@/sanity/lib/client";
import ReactLenis from "lenis/react";

export const revalidate = 60;
const fetchSanityData = async () => {
  const unorderedProjects: project[] = await client.fetch(`
    *[_type == "project"]{
      title,
      order,
      headline,
      url,
      videoUrl,
      invisible,
      tech,
      body,
      _id,
      mainImage{
        asset->{
          _id,
          url
        },
      },
      gallery[]{
        asset->{
          _id,
          url
        }
      }
    }				
    `);

  const projectOrdering = await client.fetch(
    `*[_type == "visible-projects"]{
        projectOrdering,
     }`
  );

  const iknow = await client.fetch(`
      *[_type == "iknow"]{
        _id,
        title,
        img,
        className,
      }				
      `);

  const about = await client.fetch(`
        *[_type == "about"]{
          body,
          heading,
          iknow,
          "resume": resume.asset->url,
          mainImage{
            asset->{
            _id,
            url
            }
        }				
      }
        `);

  const tech = await client.fetch(
    `*[_type == "tech"]{
            techName,
            _id
            }`
  );

  // match projects to projectOrdering
  const projects = projectOrdering[0].projectOrdering.map((projecto: any) => {
    return unorderedProjects.find(
      (project: any) => project._id === projecto._ref
    );
  });
  return { projects, iknow, about, tech };
};

export default async function Home() {
  const allData = await fetchSanityData();
  return (
    <>
      <ReactLenis root options={{ lerp: 0.1, anchors: { duration: 0.5 } }}>
        <Container sanityData={allData} />
      </ReactLenis>
    </>
  );
}
