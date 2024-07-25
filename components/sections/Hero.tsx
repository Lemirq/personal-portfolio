import { Spotlight } from '@/components/Spotlight';
import { motion } from 'framer-motion';
const Hero = () => {
	return (
		<section className="w-screen rounded-md flex sm:px-10 px-5 md:items-center md:justify-center antialiased pt-32 md:pt-0 relative overflow-hidden md:min-h-[70vh] pb-10 md:pb-0">
			<div className="w-full h-full fr justify-between absolute">
				<div className="w-full h-full">
					<Spotlight className="-top-10 left-0 md:left-60 md:-top-10 hidden md:block" fill="white" direction="left" />
					<Spotlight className="-top-10 left-0 md:left-60 md:top-40" fill="white" direction="left" fillOpacity=".1" />
				</div>
				<div
					// rotate x 180
					style={{ transform: 'scale(-1, 1)' }}
					className="w-full h-full absolute"
				>
					<Spotlight className="-top-10 left-0 md:left-60 md:-top-10 hidden md:block" fill="white" direction="left" />
					<Spotlight className="-top-10 left-0 md:left-60 md:top-40" fill="white" direction="left" fillOpacity=".1" />
				</div>
			</div>
			{/* two on the top and two on the bottom */}
			<div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-10 sm:pt-20 md:pt-0">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 tracking-tight"
				>
					Hi, I'm<span className="text-indigo-500"> Vihaan Sharma</span>
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.5 }}
					className="mt-4 text-lg text-neutral-300 max-w-3xl font-semibold text-center mx-auto"
				>
					A full-stack developer based in Canada. I specialize in crafting high-quality websites and web applications that are not only
					visually stunning but also functional and user-friendly. I sculpt <b>concepts</b> into <b>elegant user experiences</b>.
				</motion.p>
			</div>
		</section>
	);
};

export default Hero;
