import { FaLink } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import { useMainStore } from '@/stores/main-state-provider';
import { Dialog, DialogTrigger, DialogImage, DialogContainer, DialogContent, DialogClose } from '../core/dialog';
import { IoClose } from 'react-icons/io5';
import { motion, useInView, Variant, Transition, UseInViewOptions } from 'framer-motion';
import { InView } from '../core/inview';
const Projects = () => {
	const { projects, tech } = useMainStore((state) => state);
	return (
		<section className="w-full max-w-6xl mx-auto py-16 md:py-32 overflow-x-scroll px-5 md:px-10" id="projects">
			<div className="w-full fc gap-12">
				<div className="fc md:fr gap-5 md:gap-11 w-full">
					<h2 className="text-5xl font-bold">Projects</h2>
					<p className="text-lg text-slate-400">
						I've worked on a few projects over the years, and I'm always looking for new challenges. Here are some of my favorites.
					</p>
				</div>

				<InView
					viewOptions={{ once: true, margin: '0px 0px -250px 0px' }}
					variants={{
						hidden: {
							opacity: 0,
						},
						visible: {
							opacity: 1,
							transition: {
								staggerChildren: 0.09,
							},
						},
					}}
				>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10">
						{projects.map((project) => {
							if (project.invisible) return null;
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
													<DialogImage
														src={project.mainImage.asset.url}
														alt={project.title}
														className="w-full rounded-2xl"
													/>
												</DialogTrigger>
												<DialogContainer>
													<DialogContent className="relative">
														<DialogImage
															src={project.mainImage.asset.url}
															alt={project.title}
															className="h-auto w-full max-w-[90vw] rounded-2xl object-cover lg:h-[90vh]"
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
						})}
					</div>
				</InView>
			</div>
		</section>
	);
};

export default Projects;
