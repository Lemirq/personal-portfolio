'use client'
import { pageAnimation } from "@/utils/pageAnimation";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  const router = useTransitionRouter();

    return (
       <Link
          onClick={(e) => {
                      e.preventDefault();
                      router.push("/#projects", {
                          onTransitionReady: pageAnimation,
                      });
                }}
            href="/#projects"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <BsArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>
    );
};

export default BackButton;
