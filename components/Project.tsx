import { FaAnchor, FaLink } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import { Dialog, DialogTrigger, DialogImage, DialogContainer, DialogContent, DialogClose } from './core/dialog';
import { IoClose } from 'react-icons/io5';
import { motion, useInView, Variant, Transition, UseInViewOptions } from 'framer-motion';
import React, { useState } from 'react';
import { useMeasure } from '@uidotdev/usehooks';
import { BiLink } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';

import Link from 'next/link';
const Project = ({ project, tech }: { project: project; tech: tech[] }) => {
	const [showMore, setShowMore] = useState<boolean>(false);
	const [ref, { height }] = useMeasure();

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
				visible: {
					opacity: 1,
					scale: 1,
					filter: 'blur(0px)',
				},
			}}
			key={project._id}
			className="w-full h-full group cursor-pointer bg-[#0c0a1d] rounded-2xl p-4 border border-indigo-800/50 hover:border-indigo-800 transition-colors"
		>
			<div className="w-full aspect-video fc items-start min-w-[200px] gap-4">
				<div>
					{/* radial gradient top */}
					<Dialog
						transition={{
							duration: 0.3,
							ease: 'easeInOut',
						}}
					>
						<DialogTrigger className="overflow-hidden">
							<div className="w-full h-full absolute z-10 group-hover:translate-y-0 translate-y-full fc bg-indigo-600/30 backdrop-blur-xl transition-transform duration-500 rounded-2xl">
								<div className="fr gap-3">
									<p>Learn More</p> <BsArrowRight className="text-2xl" />
								</div>
							</div>
							<DialogImage src={project.mainImage.asset.url} alt={project.title} className="w-full rounded-2xl aspect-video" />
						</DialogTrigger>
						<DialogContainer>
							<DialogContent className="relative w-full pointer-events-none">
								<div className="w-full rounded-2xl grid grid-rows-42 lg:grid-rows-none lg:grid-cols-4 gap-5 m-auto p-4 sm:p-10 items-start text-white pointer-events-none select-none">
									<DialogImage
										src={project.mainImage.asset.url}
										alt={project.title}
										className="rounded-2xl w-full col-span-3 row-span-3 pointer-events-auto"
									/>

									{/* details */}
									<div className="bg-[#0c0a1d] p-4 rounded-2xl w-full fc gap-3 items-start pointer-events-auto">
										<a
											href={project.url}
											target="blank"
											className="text-2xl inline-flex gap-2 justify-center items-center font-bold text-white hover:text-violet-500 transition-colors pointer-events-auto focus:outline-none"
										>
											{project.title}
											<BiLink />
										</a>
										<ul className="fr gap-2 justify-start flex-wrap">
											{project?.tech.map((tag, i) => (
												<li key={i} className=" px-4 py-1 rounded-full bg-violet-500 text-[12px]">
													{tech.find((t) => t._id === tag._ref)?.techName}
												</li>
											))}
										</ul>
										<PortableText
											components={{
												block: ({ children }) => <div className="text-sm">{children}</div>,
											}}
											// format links as target blank
											value={project.body}
										/>
									</div>
								</div>
							</DialogContent>
							<DialogClose
								className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1"
								variants={{
									initial: { opacity: 0 },
									animate: {
										opacity: 1,
										transition: { delay: 0.3, duration: 0.1 },
									},
									exit: { opacity: 0, transition: { duration: 0 } },
								}}
							>
								<IoClose className="h-5 w-5 text-zinc-500" />
							</DialogClose>
						</DialogContainer>
					</Dialog>
				</div>
				<Link href={project.url} target="blank">
					<h4 className="text-lg sm:text-2xl font-bold text-white inline-flex justify-start gap-2">
						<span>{project.title}</span> <span className="text-violet-500 fc">{<FaLink />}</span>
					</h4>
				</Link>
				<ul className="fr gap-2 justify-start flex-wrap">
					{project?.tech.map((tag, i) => (
						<li key={i} className=" px-4 py-1 rounded-full bg-violet-500 text-[12px]">
							{tech.find((t) => t._id === tag._ref)?.techName}
						</li>
					))}
				</ul>
				{/* <PortableText
					components={{
						block: ({ children }) => <div className="text-sm">{children}</div>,
					}}
					// format links as target blank
					value={project.body}
				/> */}
			</div>
		</motion.div>
	);
};

export default Project;
