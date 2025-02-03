import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';

const dm_sans = DM_Sans({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vihaan Sharma | Fullstack Developer',
  description: 'A creative and motivated person with a passion for design and web development.',
  keywords:
    'vihaan sharma Vihaan Sharma London Ontario Student student ontario london high school High School london web developer Web Developer web development Web Development web design Web Design web designer Web Designer web design london Web Design London web design ontario Web Design Ontario web design canada Web Design Canada web development london Web Development London web development ontario Web Development Ontario web development canada Web Development Canada artificial intelligence machine learning web development london central secondary school web development london web development ontario web  development canada web development canada',
  openGraph: {
    type: 'website',
    url: 'https://vhaan.me/',
    title: 'Vihaan Sharma | Fullstack Developer',
    description: 'A creative and motivated person with a passion for design and web development.',
    images: [
      {
        url: 'https://vhaan.me/images/meta.png',
        alt: 'Vihaan Sharma | Fullstack Developer',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={dm_sans.className}>
      <head>
        <link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css' />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
