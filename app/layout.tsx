import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import PageWrapper from "@/components/PageWrapper";
import CustomCursor from "@/components/CustomCursor";

const dm_sans = DM_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrument_serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const cabinet_grotesk = localFont({
  src: "../public/font/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet",
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
    <ViewTransitions>
      <html lang="en" className={`${dm_sans.variable} ${instrument_serif.variable} ${cabinet_grotesk.variable} ${dm_sans.className}`}>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
          />
        </head>
        <body className="bg-black h-screen">
          <Providers>
            <PageWrapper>{children}</PageWrapper>
          </Providers>
          <Toaster />
          <CustomCursor />
        </body>
      </html>
    </ViewTransitions>
  );
}
