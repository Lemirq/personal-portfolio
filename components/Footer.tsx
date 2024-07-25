const Footer = () => {
	return (
		<div className="w-full fc py-3 relative">
			{/* HUGE RADIAL GRADIENT */}
			<div
				className="bottom-0 absolute w-full h-screen"
				style={{
					background: `radial-gradient(circle at 50% 100%, rgba(139,92,246,0.40) 0%,rgba(255,255,255,0.00) 60%`,
				}}
			></div>
			<div className="text-center">
				<p className="text-sm text-neutral-300">Copyright © {new Date().getFullYear()} Vihaan Sharma. All rights reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
