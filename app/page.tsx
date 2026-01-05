import Container from "./container";
import { client } from "@/sanity/lib/client";
import ReactLenis from "lenis/react";
import HiddenContentBlock from "@/components/HiddenContentBlock";
import PageWrapper from "@/components/PageWrapper";

export const revalidate = 60;
 const fetchSanityData = async () => {
   const unorderedProjects: project[] = await client.fetch(
     `
     *[_type == "project" && !invisible]{
       title,
       orderRank,
       headline,
       description,
       slug,
       url,
       invisible,
       tech,
       _id,
       gallery[]{
         _type,
         _key,
         asset->{
           _id,
           url
         },
         url,
         caption
       }
     } | order(orderRank asc)
     `,
     {},
     { next: { tags: ['projects', 'home'] } }
   );

   const iknow = await client.fetch(
     `
       *[_type == "iknow"]{
         _id,
         title,
         img,
         className,
       }
       `,
     {},
     { next: { tags: ['iknow', 'home'] } }
   );

   const about = await client.fetch(
     `
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
         `,
     {},
     { next: { tags: ['about', 'home'] } }
   );

   const tech = await client.fetch(
     `*[_type == "tech"]{
             techName,
             _id
             }`,
     {},
     { next: { tags: ['tech', 'home'] } }
   );

   const experience = await client.fetch(
     `*[_type == "experience"] | order(orderRank asc)`,
     {},
     { next: { tags: ['experience', 'home'] } }
   );

  // match projects to projectOrdering
  const projects = unorderedProjects;
  return { projects, iknow, about, tech, experience };
};

export default async function Home() {
  const allData = await fetchSanityData();
  return (
    <PageWrapper>
      <HiddenContentBlock />
      <ReactLenis root options={{ lerp: 0.1, anchors: { duration: 0.5 } }}>
        <Container sanityData={allData} />
      </ReactLenis>
    </PageWrapper>
  );
}
