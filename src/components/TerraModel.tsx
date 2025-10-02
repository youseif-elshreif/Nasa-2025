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
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="animate-pulse">
        <div className="w-20 h-20 bg-gray-600 rounded-lg"></div>
      </div>
    </div>
  ),
}) as React.ComponentType<TerraModelProps>;
