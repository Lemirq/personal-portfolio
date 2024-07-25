import { FaLink } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import { useMainStore } from '@/stores/main-state-provider';

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

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10">
					{projects.map((project) => (
						<div key={project._id} className="w-full h-full">
							<div className="w-full h-full fc items-start min-w-[200px] gap-4">
								<a href={project.url}>
									<div>
										{/* radial gradient top */}
										<img src={project.mainImage.asset.url} alt="" className="rounded-2xl aspect-video object-cover mb-5" />
									</div>
									<h4 className="text-lg sm:text-2xl font-bold text-white inline-flex justify-start gap-2">
										<span>{project.title}</span> <span className="text-white/70 fc">{<FaLink />}</span>
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
										block: ({ children }) => <p className="text-sm">{children}</p>,
									}}
									// format links as target blank
									value={project.body}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
