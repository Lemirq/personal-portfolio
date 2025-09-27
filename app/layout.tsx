import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

const dm_sans = DM_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vihaan Sharma | Fullstack Developer",
  description:
    "A creative and motivated person with a passion for design and web development.",
  keywords:
    "vihaan sharma Vihaan Sharma London Ontario Student student ontario london high school High School london web developer Web Developer web development Web Development web design Web Design web designer Web Designer web design london Web Design London web design ontario Web Design Ontario web design canada Web Design Canada web development london Web Development London web development ontario Web Development Ontario web development canada Web Development Canada artificial intelligence machine learning web development london central secondary school web development london web development ontario web  development canada web development canada Vihaan Sharma, London Ontario, UofT, student, web developer, coding journey, personal projects, anime, AI, badminton, gym, FreeCodeCamp, creative developer, portfolio, story, inspect element, HTML, CSS, JavaScript, Toronto, university, tech, builder, explorer",
  openGraph: {
    type: "website",
    url: "https://vhaan.me/",
    title: "Vihaan Sharma | Fullstack Developer",
    description:
      "A creative and motivated person with a passion for design and web development.",
    images: [
      {
        url: "https://vhaan.me/images/meta.png",
        alt: "Vihaan Sharma | Fullstack Developer",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dm_sans.className}>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body>
        {/* Hidden SVG filter for liquid glass distortion */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0"
          height="0"
          style={{ position: "absolute", overflow: "hidden" }}
        >
          <defs>
            <filter
              id="glass-distortion"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.008 0.008"
                numOctaves="2"
                seed="92"
                result="noise"
              />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurred"
                scale="77"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
