// "use client";

// import { useState, useEffect, useRef } from "react";
// import dynamic from "next/dynamic";

// // Dynamically import the Spline component and ensure it only runs on the client side
// const Spline = dynamic(() => import("@splinetool/react-spline"), {
//   ssr: false, // This is crucial for Next.js to ensure client-side rendering
// });

// export default function SplineComponent() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const updateDimensions = () => {
//       if (container) {
//         const rect = container.getBoundingClientRect();
//         setDimensions({
//           width: rect.width,
//           height: rect.height,
//         });
//       }
//     };

//     // Set initial dimensions
//     updateDimensions();

//     // Use ResizeObserver for better performance and accuracy
//     const resizeObserver = new ResizeObserver(() => {
//       updateDimensions();
//     });

//     resizeObserver.observe(container);

//     // Fallback: also listen to window resize for edge cases
//     const handleResize = () => {
//       updateDimensions();
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       resizeObserver.disconnect();
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="w-full h-full">
//       <Spline scene="https://prod.spline.design/5Hhskd8wQycf-Pez/scene.splinecode" />
//     </div>
//   );
// }
