"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

// Preload the model
useGLTF.preload("/assets/Terra.glb");

function TerraGeometry() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scene } = useGLTF("/assets/Terra.glb");

  useEffect(() => {
    if (scene) {
      // إصلاح مشكلة الـ textures المفقودة
      scene.traverse((child) => {
        if (child.type === 'Mesh') {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial;
            
            // إضافة ألوان fallback حسب نوع الجزء
            if (material.name?.includes('Solar') || material.name?.includes('Panel')) {
              material.color.setHex(0x1a1a2e); // أزرق داكن للألواح الشمسية
              material.metalness = 0.8;
              material.roughness = 0.2;
            } else if (material.name?.includes('Side')) {
              material.color.setHex(0x4a4a4a); // رمادي للجوانب
              material.metalness = 0.6;
              material.roughness = 0.4;
            } else {
              material.color.setHex(0x666666); // لون افتراضي
              material.metalness = 0.5;
              material.roughness = 0.5;
            }
            
            // إزالة الـ textures المكسورة
            if (material.map && !material.map.image) {
              material.map = null;
              material.needsUpdate = true;
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
    <group>
      <primitive object={scene} scale={0.00015} position={[1.5, 0, 0]} />
    </group>
  );
}

function InteractiveTerraCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ background: "transparent" }}
        onError={(error) => {
          console.warn("InteractiveTerra Canvas error:", error);
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
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
          <TerraGeometry />
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
export default dynamic(() => Promise.resolve(InteractiveTerraCanvas), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="animate-pulse">
        <div className="w-20 h-20 bg-gray-600 rounded-lg"></div>
      </div>
    </div>
  ),
});