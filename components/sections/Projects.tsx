import { useMainStore } from '@/stores/main-state-provider';

import { InView } from '../core/inview';
import Project from '../Project';
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
							return <Project key={project._id} project={project} tech={tech} />;
						})}
					</div>
				</InView>
			</div>
		</section>
	);
};

export default Projects;
