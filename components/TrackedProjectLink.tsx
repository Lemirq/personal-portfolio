'use client';

import Link from 'next/link';
import posthog from 'posthog-js';
import { BsArrowUpRight } from 'react-icons/bs';

interface TrackedProjectLinkProps {
  url: string;
  projectTitle: string;
}

export function TrackedProjectLink({ url, projectTitle }: TrackedProjectLinkProps) {
  const handleClick = () => {
    posthog.capture('project_link_clicked', {
      project_title: projectTitle,
      url: url,
    });
  };

  return (
    <button
      className="group relative px-4 py-2 rounded-xl text-lg cursor-pointer transition-all duration-300 overflow-hidden"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300" />
      <Link href={url} target="_blank" rel="noopener noreferrer" className="relative flex items-center gap-2 text-white/90 group-hover:text-white">
        Visit Site <BsArrowUpRight className="inline-block" />
      </Link>
    </button>
  );
}
