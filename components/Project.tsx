import { FaLink } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import { Dialog, DialogTrigger, DialogImage, DialogContainer, DialogContent, DialogClose } from './core/dialog';
import { IoClose } from 'react-icons/io5';
import { motion, useInView, Variant, Transition, UseInViewOptions } from 'framer-motion';
import React, { useState } from 'react';
import { useMeasure } from '@uidotdev/usehooks';
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
			className="w-full h-full"
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
						<DialogTrigger>
							<DialogImage src={project.mainImage.asset.url} alt={project.title} className="w-full rounded-2xl aspect-video" />
						</DialogTrigger>
						<DialogContainer>
							<DialogContent className="relative">
								<DialogImage
									src={project.mainImage.asset.url}
									alt={project.title}
									className="h-auto w-full max-w-[90vw] rounded-2xl object-contain lg:h-[90vh]"
								/>
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
				<a href={project.url}>
					<h4 className="text-lg sm:text-2xl font-bold text-white inline-flex justify-start gap-2">
						<span>{project.title}</span> <span className="text-violet-500 fc">{<FaLink />}</span>
					</h4>
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
		</motion.div>
	);
};

export default Project;
