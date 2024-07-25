import { CanvasRevealEffect } from '@/components/Reveal';
const approachData = [
	{
		title: 'Planning',
		description:
			'During the planning phase of a web development project, I define the project scope, requirements, and goals, creating detailed wireframes and sitemaps to guide the design and functionality. I also establish timelines, allocate resources, and set up a project management framework to ensure smooth execution and collaboration.',
		class: 'bg-emerald-900',
	},
	{
		title: 'Design',
		description:
			"In the design phase, I create wireframes and sitemaps, using tools like Figma and Sketch to visualize the project's structure and content. I also use design systems and templates to streamline the design process and ensure consistency across the project.",
		class: 'bg-black',
		color: [
			[236, 72, 153],
			[232, 121, 249],
		],
	},
	{
		title: 'Development',
		description:
			'During the development phase, I write code, implement features, and test the project to ensure it functions as intended. I use tools like React, Next.js, and Tailwind CSS to build the project and ensure a smooth user experience.',
		class: 'bg-sky-600',
		color: [[125, 211, 252]],
	},
];
const Approach = () => {
	return (
		<section className="max-w-6xl mx-auto py-32 fc overflow-x-scroll px-5 md:px-10" id="approach">
			<h2 className="text-3xl sm:text-5xl font-bold mb-10">
				My <span className="text-violet-500">Approach</span>
			</h2>
			<div className="fr gap-10 w-full">
				<div className="py-5 fc lg:fr w-full gap-4 mx-auto md:px-8">
					{approachData.map((data, index) => (
						<Card key={index} item={data} index={index}>
							<CanvasRevealEffect animationSpeed={3} colors={data.color} dotSize={2} containerClassName={data.class} />
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
export default Approach;
const Card = ({ index, children, item }: { index: number; children?: React.ReactNode; item: any }) => {
	return (
		<div className="border border-black/[0.2] group flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem]">
			<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

			<div className="h-full w-full absolute inset-0 group-hover:opacity-100 transition-opacity duration-200 opacity-0">
				<div className="h-full w-full absolute inset-0">{children}</div>
				<div className="h-full w-full absolute inset-0 z-10 fc px-5">
					<h2 className="text-2xl">{item.title}</h2>
					<p className="text-sm">{item.description}</p>
				</div>
			</div>
			<div className="relative z-20 group-hover:opacity-0 transition-opacity duration-200 opacity-100">
				<div className="text-center  w-full mx-auto flex items-center justify-center">
					<div className="text-2xl fc">
						<span>Phase {index + 1}</span>
						<span className="text-white/70 text-sm md:block hidden">(hover this)</span>
						<span className="text-white/70 text-sm md:hidden block">(tap this)</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Icon = ({ className, ...rest }: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className={className}
			{...rest}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
		</svg>
	);
};
