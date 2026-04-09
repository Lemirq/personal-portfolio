const Footer = () => {
  return (
    <div className="w-full fc py-3 relative">
      {/* HUGE RADIAL GRADIENT */}
      <div
        className="bottom-0 absolute w-full h-screen -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 100%, rgba(139,92,246,0.40) 0%,rgba(255,255,255,0.00) 60%`,
        }}
      ></div>
      <div className="text-center relative z-10">
        <p className="text-sm text-neutral-300">
          Copyright © {new Date().getFullYear()} Vihaan Sharma. All rights
          reserved.
        </p>

        {/* Webring links moved here from layout */}
        <nav
          className="mt-2 flex justify-center gap-3 text-neutral-300"
          aria-label="webring navigation"
        >
          <a
            href="https://webring.ca/prev/vihaan-sharma"
            title="Previous site in the webring"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            ←
          </a>
          <a
            href="https://webring.ca"
            title="WeBring home"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            🍁
          </a>
          <a
            href="https://webring.ca/next/vihaan-sharma"
            title="Next site in the webring"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            →
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
