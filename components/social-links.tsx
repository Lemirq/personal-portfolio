import { MdOutlineMailOutline } from "react-icons/md";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { JSX } from "react";

export type SocialLink = {
  label: string;
  icon: JSX.Element;
  url: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Email",
    icon: <MdOutlineMailOutline />,
    url: "mailto:sharmavihaan190@gmail.com",
  },
  {
    label: "GitHub",
    icon: <AiFillGithub />,
    url: "https://github.com/Lemirq",
  },
  {
    label: "LinkedIn",
    icon: <AiFillLinkedin />,
    url: "https://www.linkedin.com/in/vs190",
  },
  {
    label: "Instagram",
    icon: <AiFillInstagram />,
    url: "https://www.instagram.com/vhaan.ca/",
  },
  {
    label: "X",
    icon: <RiTwitterXFill />,
    url: "https://x.com/vs190",
  },
];
