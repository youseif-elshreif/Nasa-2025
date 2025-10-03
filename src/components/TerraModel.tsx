"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

// Preload the model
useGLTF.preload("/assets/Terra.glb");

interface TerraProps {
  rotation?: number;
  scale?: number;
  position?: [number, number, number];
}

function Terra({
  rotation = 0,
  scale = 0.00015,
  position = [1.5, 0, 0],
}: TerraProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scene } = useGLTF("/assets/Terra.glb");

  useEffect(() => {
    if (scene) {
      // إصلاح مشكلة الـ textures المفقودة فقط عند الحاجة
      scene.traverse((child) => {
        if (child.type === "Mesh") {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial;

            // فقط إزالة الـ textures المكسورة، والحفاظ على الألوان الأصلية
            if (
              material.map &&
              (!material.map.image || material.map.image.complete === false)
            ) {
              material.map = null;
              material.needsUpdate = true;

              // إضافة لون fallback فقط للـ textures المكسورة
              material.color.setHex(0xf0f0f0); // لون فاتح محايد
              material.metalness = 0.3;
              material.roughness = 0.7;
            }
          }
        }
      });

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
    <group rotation={[0, rotation, 0]}>
      <primitive object={scene} scale={scale} position={position} />
    </group>
  );
}

interface TerraModelProps {
  rotation?: number;
  scale?: number;
  position?: [number, number, number];
  enableControls?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

function TerraModelCanvas({
  rotation = 0,
  scale = 0.00015,
  position = [1.5, 0, 0],
  enableControls = true,
  autoRotate = true,
  autoRotateSpeed = 0.5,
}: TerraModelProps) {
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
          <Terra rotation={rotation} scale={scale} position={position} />
        </Suspense>
        {enableControls && (
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            target={position}
          />
        )}
      </Canvas>
    </div>
  );
}

// Export with no SSR to prevent hydration mismatch
export default dynamic(() => Promise.resolve(TerraModelCanvas), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-blue-900/30 to-black/20">
        {/* Animated stars */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animationDelay: Math.random() * 3 + "s",
                animationDuration: Math.random() * 2 + 2 + "s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Spinning satellite icon */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <p className="text-blue-400 font-medium animate-pulse">
            Loading Terra Model...
          </p>
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  ),
}) as React.ComponentType<TerraModelProps>;
