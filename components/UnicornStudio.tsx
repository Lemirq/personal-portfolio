// "use client";

// import { useState, useEffect, useRef } from "react";
// import UnicornScene from "unicornstudio-react";

// export default function UnicornStudio() {
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
//       <UnicornScene
//         projectId="MvN30w3WmW8puc26HAMl"
//         width={dimensions.width}
//         height={dimensions.height}
//         className="w-full h-full object-cover"
//       />
//     </div>
//   );
// }
