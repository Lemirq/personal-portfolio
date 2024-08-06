import Image from 'next/image';
import Container from './container';
import client from '@/utils/sanityClient';
export const revalidate = 60;
const fetchSanityData = async () => {
	const projects: project[] = await client.fetch(`
    *[_type == "project"] | order(order asc){
      title,
      order,
      headline,
      url,
      invisible,
      tech,
      body,
      _id,
      mainImage{
        asset->{
          _id,
          url
        },
      }
    }				
    `);

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

	return { projects, iknow, about, tech };
};

export default async function Home() {
	const allData = await fetchSanityData();
	return <Container sanityData={allData} />;
}
