"use client"
import { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useLenis } from 'lenis/react'
import { easing } from 'maath'
import { Card } from './3DCard'
import './cardsUtils'
import { urlFor } from '@/sanity/lib/image'
import { motion } from 'framer-motion'

export default function CardsSection({ projects }: { projects: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  console.log("projects", projects)
  
  useLenis(({ scroll }) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const top = rect.top
    const height = rect.height
    const windowHeight = window.innerHeight
    
    // Calculate progress based on how far we've scrolled through the section
    // Start when top hits viewport top (or earlier if desired)
    // End when bottom hits viewport bottom
    
    // We want the section to pin. 
    // The container is 400vh tall. The sticky content is 100vh.
    // So distinct scrollable distance is 300vh.
    
    const start = 0 // relative to container top entering viewport
    const end = height - windowHeight
    
    // Convert current scroll position relative to container
    const relativeScroll = -top
    
    const p = Math.max(0, Math.min(1, relativeScroll / end))
    setProgress(p)
  })

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full"> 
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto pt-16 md:pt-32 px-5 md:px-10 absolute z-10 left-1/2 -translate-x-1/2 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
            className="text-5xl font-bold text-center"
          >
            Projects
          </motion.h2>
        </div>
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 100], fov: 15 }} style={{ background: 'transparent' }}>
          <Rig rotation={[0, 0, 0.15]} progress={progress}>
             <Suspense fallback={null}>
               <Carousel projects={projects} />
             </Suspense>
          </Rig>
          <Environment preset="night" blur={0.5} />
        </Canvas>
      </div>
    </div>
  )
}

function Rig({ children, progress, ...props }: any) {
  const ref = useRef<any>(null)
  
  useFrame((state: any, delta: number) => {
    // Map progress 0-1 to rotation. 
    // Single rotation over the scroll distance
    const targetRotation = -progress * (Math.PI * 2)
    
    // Smoothly interpolate current rotation to target
    easing.dampE(
      ref.current.rotation, 
      [props.rotation[0], targetRotation, props.rotation[2]], 
      0.2, 
      delta
    )
    
    state.events.update()
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta)
    state.camera.lookAt(0, 0, 0)
  })
  
  return <group ref={ref} {...props}>{children}</group>
}

// Carousel remains the same
function Carousel({ projects }: { projects: any[] }) {
  const count = projects?.length || 0
  const radius = Math.max(1.4, count * 0.20) 

  return (
    <>
      {projects?.map((project, i) => {
        let imageUrl = null
        // Filter for images only and take the first one
        const galleryItem = project.gallery?.find((item: any) => item._type === 'image')
        
        if (galleryItem) {
             try {
                imageUrl = urlFor(galleryItem).width(1024).url()
             } catch(e) {
                 console.warn("Could not generate image url for project", project.title, e)
             }
        }

        if (!imageUrl) return null
        console.log("imageUrl", imageUrl)

        return (
          <Card
            key={project._id}
            url={imageUrl}
            title={project.title}
            slug={project.slug.current}
            position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
            rotation={[0, (i / count) * Math.PI * 2, 0]}
          />
        )
      })}
    </>
  )
}
