import { MdOutlineMailOutline } from "react-icons/md";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

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
    label: "Twitter",
    icon: <AiFillTwitterCircle />,
    url: "https://x.com/vs190",
  },
];

