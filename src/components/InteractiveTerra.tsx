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
      // تحسين المواد والألوان
      scene.traverse((child) => {
        if (child.type === "Mesh") {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial;

            // تحسين خصائص المادة للإضاءة الأفضل
            material.needsUpdate = true;

            // فقط معالجة الـ textures المكسورة
            if (
              material.map &&
              (!material.map.image || material.map.image.complete === false)
            ) {
              console.log("Removing broken texture for:", material.name);
              material.map = null;

              // إضافة ألوان fallback واقعية فقط للـ textures المكسورة
              if (
                material.name?.toLowerCase().includes("solar") ||
                material.name?.toLowerCase().includes("panel")
              ) {
                material.color.setHex(0x1a4d72); // أزرق للألواح الشمسية
                material.metalness = 0.8;
                material.roughness = 0.2;
              } else if (material.name?.toLowerCase().includes("side")) {
                material.color.setHex(0xd4d4d4); // فضي للجوانب
                material.metalness = 0.6;
                material.roughness = 0.4;
              } else {
                material.color.setHex(0xf5f5f5); // أبيض مائل للرمادي
                material.metalness = 0.2;
                material.roughness = 0.8;
              }
            } else if (material.color) {
              // تحسين السطوع للألوان الموجودة
              const currentColor = material.color.getHex();
              if (currentColor === 0x000000 || currentColor === 0x808080) {
                material.color.setHex(0xf0f0f0); // تفتيح الألوان الداكنة
              }
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
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} />
        <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />
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
