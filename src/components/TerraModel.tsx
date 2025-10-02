"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Preload the model
useGLTF.preload("/assets/Terra.glb");

function Terra() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scene } = useGLTF("/assets/Terra.glb");

  useEffect(() => {
    if (scene) {
      // إضافة تأخير صغير لضمان smooth loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [scene]);

  if (!isLoaded) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#666" opacity={0.7} transparent />
      </mesh>
    );
  }

  return (
    <group>
      <primitive object={scene} scale={0.00015} position={[1.5, 0, 0]} />
    </group>
  );
}

function TerraModelCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ background: "transparent" }}
        onError={(error) => console.warn("Canvas error:", error)}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#888" />
            </mesh>
          }
        >
          <Terra />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={true}
          autoRotateSpeed={0.5}
          target={[1.5, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

// Export with no SSR to prevent hydration mismatch
export default dynamic(() => Promise.resolve(TerraModelCanvas), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="animate-pulse">
        <div className="w-20 h-20 bg-gray-600 rounded-lg"></div>
      </div>
    </div>
  ),
});
