"use client";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useTexture, Html, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRouter } from "next/navigation";
import { BentPlaneGeometry } from "./cardsUtils";

interface CardProps {
  url: string;
  slug: string;
  title: string;
  position?: [number, number, number] | THREE.Vector3;
  rotation?: [number, number, number] | THREE.Euler;
  [key: string]: any;
}

// Reuse geometry instance
const geometry = new BentPlaneGeometry(0.1, 1.6, 0.9, 20, 20);

export function Card({ url, slug, title, ...props }: CardProps) {
  // ... existing implementation
  const ref = useRef<any>(null);
  const [hovered, hover] = useState(false);
  const [entered, setEntered] = useState(false);
  const router = useRouter();

  useCursor(hovered);

  const pointerOver = (e: any) => {
    e.stopPropagation();
    hover(true);
  };
  const pointerOut = () => {
    hover(false);
  };

  useFrame((state: any, delta: number) => {
    // Entrance animation
    if (!entered && ref.current) {
      // Start slightly delayed? We can check state.clock.elapsedTime but simpler to just damp slower or use a flag
      easing.damp3(ref.current.scale, 1, 0.8, delta);
      if (ref.current.scale.x > 0.99) setEntered(true);
    } else if (ref.current) {
      easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    }
  });

  // Preload texture to avoid pop-in
  useTexture.preload(url);

  const handleClick = (e: any) => {
    e.stopPropagation();
    router.push(`/projects/${slug}`);
  };

  return (
    <group
      ref={ref}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      onClick={handleClick}
      scale={[0, 0, 0]}
      {...props}
    >
      <CardMesh url={url} hovered={hovered} geometry={geometry} />
      {/*{hovered && (
        <Html
        onPointerOver={pointerOver}
          position={[0, 0, 0.1]}
          transform
          scale={0.1}
          style={{
            pointerEvents: 'none',
            textAlign: 'center',
            color: 'white',
            background: 'rgba(0,0,0,0.6)',
            padding: '8px 16px',
            borderRadius: '8px',
            width: '200px',
            fontSize: '16px',
            fontWeight: 'bold',
            backdropFilter: 'blur(4px)',
          }}
        >
          {title}
        </Html>
      )}*/}
    </group>
  );
}

function CardMesh({
  url,
  hovered,
  geometry,
}: {
  url: string;
  hovered: boolean;
  geometry: THREE.BufferGeometry;
}) {
  const ref = useRef<any>(null);
  const texture = useTexture(url);
  const image = texture.image as { width?: number; height?: number } | undefined;
  const imageAspect =
    image?.width && image?.height
      ? image.width / image.height
      : 1;
  const cardAspect = 1.6 / 0.9;

  // Use clone to avoid mutating cached texture shared by others
  // Optimization: useMemo for texture cloning if possible or just rely on lightweight clone
  const tex = texture.clone();

  if (imageAspect > cardAspect) {
    const scale = cardAspect / imageAspect;
    tex.repeat.set(scale, 1);
    tex.offset.set((1 - scale) / 2, 0);
  } else {
    const scale = imageAspect / cardAspect;
    tex.repeat.set(1, scale);
    tex.offset.set(0, (1 - scale) / 2);
  }

  useFrame((state: any, delta: number) => {
    if (ref.current) {
      easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.2, 0.2, delta);

      // Animate wave
      if (ref.current.material.time) {
        ref.current.material.time.value += delta;
      }

      if (ref.current.material.radius !== undefined) {
        easing.damp(
          ref.current.material,
          "radius",
          hovered ? 0.2 : 0.1,
          0.2,
          delta,
        );
      }
    }
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      {/* @ts-ignore */}
      <meshSineMaterial map={tex} map-anisotropy={0} side={THREE.DoubleSide} />
    </mesh>
  );
}
