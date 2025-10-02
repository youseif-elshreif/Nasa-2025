"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Earth() {
  const { scene } = useGLTF("/assets/earth.glb", true);
  const earthRef = useRef<THREE.Object3D>(null);

  // دوران الأرض مع كل frame
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y -= 0.002; // سرعة الدوران (غيرها حسب ما تحب)
    }
  });

  return (
    <primitive
      ref={earthRef}
      object={scene}
      scale={0.05}
      position={[0, -1, 0]}
    />
  );
}

function EarthModelCanvas() {
  return (
    <div className="w-full h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 7] }}
        style={{ background: "transparent" }}
        onError={(error) => console.warn("Canvas error:", error)}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />

        <Suspense
          fallback={
            <mesh>
              <boxGeometry />
              <meshBasicMaterial color="gray" />
            </mesh>
          }
        >
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Export with no SSR to prevent hydration mismatch
export default dynamic(() => Promise.resolve(EarthModelCanvas), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
      <div className="text-gray-500">Loading Earth Model...</div>
    </div>
  ),
});
