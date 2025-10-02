"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState, Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

// Preload the model مع key مختلف لتجنب التضارب
useGLTF.preload("/assets/Terra.glb");

interface AnimatedTerraProps {
  rotation?: number;
  scale?: number;
  position?: [number, number, number];
}

function SmoothRotatingTerra({
  targetRotation = 0,
  scale = 0.00015,
  position = [1.5, 0, 0],
}: {
  targetRotation?: number;
  scale?: number;
  position?: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [currentRotation, setCurrentRotation] = useState(targetRotation);

  // تحديث الـ rotation عند تغيير الـ target
  useEffect(() => {
    if (
      groupRef.current &&
      Math.abs(targetRotation - currentRotation) > Math.PI
    ) {
      // معالجة الانتقال من 0 إلى 2π أو العكس لتجنب الدوران الطويل
      if (targetRotation > currentRotation) {
        setCurrentRotation(currentRotation + 4 * Math.PI);
      } else {
        setCurrentRotation(currentRotation - 4 * Math.PI);
      }
    }
  }, [targetRotation, currentRotation]);

  // Smooth rotation animation with easing
  useFrame((state, delta) => {
    if (groupRef.current) {
      const rotationDiff = targetRotation - currentRotation;

      // إذا كان الفرق كبير، نستخدم easing أبطأ للحصول على تأثير أكثر سلاسة
      const easingSpeed = Math.abs(rotationDiff) > 1 ? 2 : 4;
      const newRotation = currentRotation + rotationDiff * delta * easingSpeed;

      // تحديد threshold صغير لتجنب الـ jittering
      if (Math.abs(rotationDiff) > 0.01) {
        groupRef.current.rotation.y = newRotation;
        setCurrentRotation(newRotation);
      } else {
        // snap to target عند الوصول قريب منه
        groupRef.current.rotation.y = targetRotation;
        setCurrentRotation(targetRotation);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <AnimatedTerraGeometry scale={scale} position={position} />
    </group>
  );
}

function AnimatedTerraGeometry({
  scale = 0.00015,
  position = [1.5, 0, 0],
}: {
  scale?: number;
  position?: [number, number, number];
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scene } = useGLTF("/assets/Terra.glb");

  useEffect(() => {
    if (scene) {
      // نسخ الـ scene لتجنب التضارب مع المكون الآخر
      const clonedScene = scene.clone();

      // تحسين المواد والألوان
      clonedScene.traverse((child) => {
        if (child.type === "Mesh") {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            // نسخ المادة لتجنب التضارب
            const originalMaterial =
              mesh.material as THREE.MeshStandardMaterial;
            const material = originalMaterial.clone();
            mesh.material = material;

            // تحسين خصائص المادة
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
      }, 150); // تأخير مختلف قليلاً

      return () => clearTimeout(timer);
    }
  }, [scene]);

  if (!isLoaded) {
    return (
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#444" opacity={0.7} transparent />
      </mesh>
    );
  }

  return (
    <group>
      <primitive object={scene.clone()} scale={scale} position={position} />
    </group>
  );
}

function AnimatedTerraCanvas({
  rotation = 0,
  scale = 0.00017,
  position = [1.5, 0, 0],
}: AnimatedTerraProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [5, 1, 4] }}
        style={{ background: "transparent" }}
        onError={(error) => {
          console.warn("AnimatedTerra Canvas error:", error);
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[8, 8, 5]} intensity={1.0} />
        <directionalLight position={[-8, -8, -5]} intensity={0.6} />
        <pointLight position={[0, 0, 8]} intensity={0.4} color="#ffffff" />
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial color="#666" />
            </mesh>
          }
        >
          <SmoothRotatingTerra
            targetRotation={rotation}
            scale={scale}
            position={position}
          />
        </Suspense>
        {/* لا توجد OrbitControls هنا - فقط عرض */}
      </Canvas>
    </div>
  );
}

// Export with no SSR to prevent hydration mismatch
export default dynamic(() => Promise.resolve(AnimatedTerraCanvas), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="animate-pulse">
        <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  ),
}) as React.ComponentType<AnimatedTerraProps>;
