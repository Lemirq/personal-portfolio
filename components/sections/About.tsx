import { useMainStore } from '@/stores/main-state-provider';
import client from '@/utils/sanityClient';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from 'next-sanity';
import { useEffect } from 'react';

const About = () => {
  const { about } = useMainStore((state) => state);

  const builder = imageUrlBuilder(client);
  function urlFor(source: object) {
    return builder.image(source);
  }
  useEffect(() => {
    console.log(about);
  }, [about]);
  return (
    <section className='w-full max-w-6xl mx-auto py-16 md:py-32 md:pt-12 overflow-x-scroll px-5 md:px-10' id='about'>
      <div className='fr gap-10 justify-between'></div>

      <div className='w-full max-w-6xl fc gap-24'>
        <div className='fc md:fr gap-11 w-full'>
          {/* <img
						className="rounded-full w-full h-full md:max-w-md md:w-full md:h-auto md:rounded-full"
						src={(about && urlFor(about.mainImage).width(1000).height(1000).url()) || '/images/Vihaan-sq.jpg'}
						width="100%"
						height="100%"
					/> */}
          <svg
            id='pfp'
            viewBox='0 0 2000 2000'
            fill='none'
            className='md:max-w-md md:w-full fc md:rounded-lg group w-full'
            preserveAspectRatio='xMidYMin slice'>
            <defs>
              <filter id='displacementFilter'>
                <feTurbulence type='fractalNoise' baseFrequency='1' numOctaves='1' result='noise' />
                <feDisplacementMap in='SourceGraphic' in2='noise' scale='200' xChannelSelector='R' yChannelSelector='G' />
              </filter>
              <mask id='circleMask'>
                <circle cx='50%' cy='50%' r='45%' fill='white' className='displacement' style={{ filter: 'url(#displacementFilter)' }} />
              </mask>
            </defs>

            <image
              className='rounded-full w-full h-full md:max-w-md md:w-full md:h-auto md:rounded-lg'
              href={(about && urlFor(about.mainImage).width(1000).height(1000).url()) || '/images/vihaan-sq.jpg'}
              width='100%'
              height='100%'
              mask='url(#circleMask)'
            />
          </svg>

          <div className='w-full fc sm:items-start gap-2'>
            <h2 className='text-5xl'>{about && about.heading}</h2>
            {/* <p className="text-lg text-slate-400">{about && about.body}</p> */}
            <PortableText
              components={{
                block: ({ children }) => <div className='text-lg text-slate-400'>{children}</div>,
              }}
              // format links as target blank
              value={about?.body}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
