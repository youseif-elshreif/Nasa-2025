"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function NASALogo() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Store mount ref for cleanup
    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      1, // aspect ratio will be updated
      0.1,
      1000
    );
    camera.position.set(0, 0, 3); // Better viewing angle

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    currentMount.appendChild(renderer.domElement);

    // Lighting setup - Enhanced ambient light
    const ambientLight = new THREE.AmbientLight(0x606060, 0.8); // Brighter ambient
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4299e1, 0.5);
    pointLight.position.set(-5, 0, 3);
    scene.add(pointLight);

    // Front lighting to illuminate the model better
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.2);
    frontLight.position.set(0, 2, 5); // Position in front of the model
    frontLight.castShadow = false; // No shadow for front light to avoid conflicts
    scene.add(frontLight);

    // Additional front spot light for better detail visibility
    const spotLight = new THREE.SpotLight(0xffffff, 0.8);
    spotLight.position.set(0, 0, 0);
    spotLight.target.position.set(0, 0, 0);
    spotLight.angle = Math.PI / 4; // 45 degree cone
    spotLight.penumbra = 0.2; // Soft edges
    spotLight.decay = 2;
    spotLight.distance = 10;
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Load NASA model
    const loader = new GLTFLoader();
    loader.load(
      "/assets/nasa.glb",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Scale and position the model
        model.scale.setScalar(0.06); // Bigger size to be visible
        model.position.set(0, -0.2, 0); // Slightly lower position
        const colors = [
          0xff6f61, // Salmon
          0x6b5b95, // Purple Gray
          0x88b04b, // Olive Green
          0xf7cac9, // Pink
          0x92a8d1, // Light Blue
          0x955251, // Rosewood
          0xb565a7, // Amethyst
          0x009688, // Teal
          0xffd700, // Gold
          0x40e0d0, // Turquoise
          0xdc143c, // Crimson (Dark Red)
          0x7fffd4, // Aquamarine
          0xdd0000, // أحمر (لون شعار NASA - ثابت)
          0x228b22, // Forest Green
          0xffa07a, // Light Salmon
          0x4682b4, // Steel Blue
        ];

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // نعمل Check لو الاسم على شكل Object_N
            const match = child.name.match(/^Object_(\d+)$/);
            if (match) {
              const num = parseInt(match[1]); // يجيب الرقم من الاسم
              if (num >= 2 && num <= 17) {
                // اختار اللون من الـ array
                const colorIndex = (num - 2) % colors.length;
                child.material.color.set(colors[colorIndex]);
                child.material.transparent = true;
                child.material.opacity = 0;
                if (num === 14) {
                  child.material.opacity = 1;
                }
              }
            }
          }

          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Enhance materials
            if (child.material && "metalness" in child.material) {
              (child.material as THREE.MeshStandardMaterial).metalness = 0.3;
              (child.material as THREE.MeshStandardMaterial).roughness = 0.4;
            }
          }
        });

        scene.add(model);
      },
      (progress) => {
        console.log(
          "Loading progress:",
          (progress.loaded / progress.total) * 100 + "%"
        );
      },
      (error) => {
        console.error("Error loading NASA model:", error);
      }
    );

    // Animation loop
    const animate = () => {
      const time = Date.now() * 0.001;

      if (modelRef.current) {
        // Gentle floating movement
        modelRef.current.position.y = Math.sin(time * 0.5) * 0.3;
        modelRef.current.position.x = Math.cos(time * 0.3) * 0.2;

        // Gentle rotation
        modelRef.current.rotation.y = time * 0.2;
        modelRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
        modelRef.current.rotation.z = Math.cos(time * 0.4) * 0.05;
      }

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount || !renderer) return;

      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
    }

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Use stored mount ref
      const currentRenderer = rendererRef.current;

      if (currentMount && currentRenderer && currentRenderer.domElement) {
        currentMount.removeChild(currentRenderer.domElement);
      }
      if (currentRenderer) {
        currentRenderer.dispose();
      }

      // Clean up scene
      if (sceneRef.current) {
        sceneRef.current.traverse((object: THREE.Object3D) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material: THREE.Material) =>
                material.dispose()
              );
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D Model Container */}
      <div
        ref={mountRef}
        className="w-full h-full max-w-[400px] max-h-[400px] relative"
        style={{ minHeight: "300px" }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles around the model */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Orbital rings */}
        <div
          className="absolute inset-8 border border-blue-400/15 rounded-full animate-spin"
          style={{ animationDuration: "25s" }}
        ></div>
        <div
          className="absolute inset-16 border border-purple-400/10 rounded-full animate-spin"
          style={{ animationDuration: "20s", animationDirection: "reverse" }}
        ></div>
      </div>
    </div>
  );
}
