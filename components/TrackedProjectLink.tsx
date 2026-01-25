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
      className="bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 px-4 py-2 rounded-xl text-lg cursor-pointer"
      onClick={handleClick}
    >
      <Link href={url} target="_blank" rel="noopener noreferrer" className="w-full h-full">
        Visit Site <BsArrowUpRight className="inline-block ml-2" />
      </Link>
    </button>
  );
}
