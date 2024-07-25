import { GlobeDemo } from '@/components/GlobeDemo';
import { useMainStore } from '@/stores/main-state-provider';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Cobe from '../cobe';
import Image from 'next/image';

const tech = ['Next.js', 'React.js', 'Typescript', 'Node.js', 'Express.js', 'PostgreSQL'];

const Bento = () => {
	const { about, iknow } = useMainStore((state) => state);
	const [globeVisible, setGlobeVisible] = useState(false);
	const handleScrollToContact = () => {
		document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
	};

	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.05, delayChildren: 0.5 * i },
		}),
	};

	const child = {
		visible: {
			// opacity: 1,
			x: 0,
			filter: 'blur(0px)',
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			// opacity: 0,
			filter: 'blur(50px)',
			x: 100,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
	};

	useEffect(() => {
		setGlobeVisible(true);
		const handleMouseMove = (e: MouseEvent) => {
			for (const card of document.getElementsByClassName('iknow-border') as HTMLCollectionOf<HTMLElement>) {
				const rect = card.getBoundingClientRect(),
					x = e.clientX - rect.left,
					y = e.clientY - rect.top;

				card.style.setProperty('--mouse-x', `${x}px`);
				card.style.setProperty('--mouse-y', `${y}px`);
			}

			for (const card of document.getElementsByClassName('iknow') as HTMLCollectionOf<HTMLElement>) {
				const rect = card.getBoundingClientRect(),
					x = e.clientX - rect.left,
					y = e.clientY - rect.top;

				card.style.setProperty('--mouse-x', `${x}px`);
				card.style.setProperty('--mouse-y', `${y}px`);
			}
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);
	return (
		<section className="w-full max-w-6xl mx-auto select-none">
			<h2 className="text-3xl sm:text-5xl font-bold mb-5 sm:px-10 px-5">
				For <span className="text-violet-500">Clients</span>...
			</h2>
			<div className="w-full grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 gap-4 p-4">
				<div className="group bg-[#05081B] rounded-2xl overflow-hidden text-center border border-[#070a1f] md:row-span-2 w-full h-full relative">
					<img src="/images/Collaboration.jpg" alt="Collaboration" className="rounded-2xl aspect-[4/3] mix-blend-luminosity" />
					<div className="w-full inset-0 bg-gradient-to-b from-transparent to-black via-transparent from-30% absolute fc justify-end items-start ">
						<h3 className="text-lg md:text-2xl font-bold text-left text-white p-4">
							I prioritize client collaboration, <br /> fostering open communication
						</h3>
					</div>
					{/* purple radial gradient top right */}
					<motion.div
						initial={{
							background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.40) 0%,rgba(255,255,255,0.00) 60%',
						}}
						whileInView={{
							background: 'radial-gradient(circle at 94% 6%, rgba(139,92,246,0.40) 0%,rgba(255,255,255,0.00) 60%',
						}}
						viewport={{ once: true }}
						transition={{ duration: 1 }}
						className="absolute inset-0  z-10"
					/>
				</div>

				<div className="group bg-[#05081B] rounded-2xl p-4 text-center border border-[#070a1f] w-full min-h-[200px] sm:min-h-[0px] h-full relative overflow-hidden">
					<h3 className="text-lg md:text-2xl font-bold text-left absolute z-10">I'm very flexible with time zone communications</h3>
					{/* <div className="md:absolute w-full aspect-square md:top-5 z-10">
						<Cobe />
					</div> */}
					{/* {globeVisible && <GlobeDemo />} */}
					{/* skew to appear as a globe */}
					<Image
						src="/images/worldmap.svg"
						alt="World"
						layout="responsive"
						width={384}
						height={216}
						className="skew-[-10deg] w-full absolute"
					/>
				</div>

				<div className="group bg-[#05081B] rounded-2xl p-4 text-center border border-[#070a1f] w-full h-full relative overflow-hidden">
					<div className="fc items-start md:absolute md:h-full group-hover:translate-y-2 transition-transform z-10">
						<p className="text-sm tracking-wide uppercase">I constantly try to improve</p>
						<h3 className="text-lg md:text-2xl font-bold text-left mb-10">My Tech Stack</h3>
					</div>
					<div className="fr absolute right-0 gap-4 group-hover:-translate-y-12 transition-transform hidden lg:flex">
						<div className="fc gap-4">
							{tech.map((t) => (
								<div key={t} className="text-lg p-5 bg-[#13162b] rounded-xl w-full">
									{t}
								</div>
							))}
						</div>
						<div className="fc -translate-y-[60%] gap-4 group-hover:-translate-y-[35%] transition-transform">
							{tech.map((t) => (
								<div key={t} className="text-lg p-5 bg-[#13162b] rounded-xl w-full">
									{t}
								</div>
							))}
						</div>
					</div>

					<div className="fc bottom-0 gap-4 group-hover:-translate-x-12 transition-transform flex lg:hidden">
						<div className="fr gap-4">
							{tech.map((t) => (
								<div key={t} className="text-lg p-5 bg-[#13162b] rounded-xl w-full">
									{t}
								</div>
							))}
						</div>
						<div className="fr -translate-x-[20%] gap-4 group-hover:-translate-x-[15%] transition-transform">
							{tech.map((t) => (
								<div key={t} className="text-lg p-5 bg-[#13162b] rounded-xl w-full">
									{t}
								</div>
							))}
						</div>
					</div>

					{/* horizontal version for mobile */}
				</div>
			</div>
			<div className="w-full grid md:grid-cols-3 md:grid-rows-2 grid-cols-1 gap-4 p-4">
				<div className="group bg-[#05081B] bg-grid-white/[0.02] rounded-2xl text-center border border-[#070a1f] w-full h-full relative overflow-hidden fc items-end">
					<h3 className="text-lg md:text-2xl font-bold text-left mb-16 p-4 group-hover:translate-x-2 transition-transform">
						Tech Enthusiast with a Passion for Development
					</h3>
					<img
						src="/images/Page.jpg"
						alt="tech"
						className="rounded-2xl w-1/2 mix-blend-luminosity right-2 absolute -bottom-20 group-hover:-translate-y-2 transition-transform"
					/>
					{/* radial gradient middle left */}
					<motion.div
						initial={{
							background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.40) 0%,rgba(255,255,255,0.00) 60%',
						}}
						whileInView={{
							background: 'radial-gradient(circle at 20% 70%, rgba(139,92,246,0.30) 0%,rgba(255,255,255,0.00) 60%',
						}}
						viewport={{ once: true }}
						transition={{ duration: 1 }}
						className="absolute inset-0 z-10 pointer-events-none"
					/>
				</div>
				<div className="bg-gradient-to-br to-[#0d112a] to-70% from-[#070a1f] rounded-2xl p-4 text-center border border-[#070a1f] w-full min-h-full relative overflow-hidden col-span-2 row-span-2">
					<h3 className="text-lg md:text-2xl font-bold mb-4">My Technologies</h3>
					{/* this section shows all skills in a bubble, whick are draggable with framer-motion random positions need to be generated within the bounds of the container */}
					<motion.ul
						initial="hidden"
						whileInView="visible"
						variants={container}
						viewport={{ once: true }}
						transition={{ duration: 0.3 }}
						className="fr gap-2 flex-wrap"
					>
						{about?.iknow.map((i) => {
							const curr = iknow.find((t) => t._id === i._ref);
							if (!curr) return null;
							return (
								<motion.li variants={child} key={curr._id} className="iknow-border relative p-[1px] overflow-hidden rounded-2xl">
									<div className="iknow size-16 md:size-24 fc rounded-2xl bg-[#13162b] p-4">
										{/* <img src={curr.img} className="w-24 h-24 rounded-lg mix-blend-exclusion" /> */}
										<div className={`${curr.className} text-4xl md:text-7xl opacity-40`}></div>
									</div>
								</motion.li>
							);
						})}
					</motion.ul>
				</div>
				<div className="group bg-[#05081B] rounded-2xl p-4 text-center border border-[#070a1f] w-full h-full relative overflow-hidden fc gap-2">
					<h3 className="text-lg md:text-2xl font-bold text-left p-4">
						Do you want to start <br /> a project with me?
					</h3>

					<button onClick={handleScrollToContact} className="px-5 py-3 bg-[#12142b] border-[#262b4c] border rounded-2xl text-white">
						Contact me
					</button>
					{/* radial gradient bottom right */}
					<div
						style={{
							background: `radial-gradient(at 0% 0%, rgba(255,119,0,1) 0px, transparent 50%),
              radial-gradient(at 10% 0%, hsla(189,100%,56%,.4) 0px, transparent 50%),
              radial-gradient(at 30% 0%, hsla(355,100%,93%,.4) 0px, transparent 50%),
              radial-gradient(at 58% 0%, hsla(340,100%,76%,.4) 0px, transparent 50%),
              radial-gradient(at 60% 0%, rgba(139,92,246,1) 0px, transparent 50%),
              radial-gradient(at 80% 00%, rgba(47,71,132,1) 0px, transparent 50%),
              radial-gradient(at 100% 0%, hsla(343,100%,76%,.4) 0px, transparent 70%)`,
							// 'radial-gradient(circle at 94% 6%, rgba(139,92,246,0.40) 0%,rgba(255,255,255,0.00)), radial-gradient(circle at 20% 6%, rgba(32,59,121,0.40) 0%,rgba(255,255,255,0.00))',
						}}
						className="absolute inset-0 opacity-40 z-10 pointer-events-none"
					/>
				</div>
			</div>
		</section>
	);
};

export default Bento;
