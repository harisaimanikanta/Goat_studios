import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// 3D canvas viewport

export default function Hero3DModel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // State for user interactions
  const [wireframe, setWireframe] = useState(false);
  const [customModelUrl, setCustomModelUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Refs for animation & Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const customModelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 320;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.5);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // 4. Lighting Setup (Brightened for custom models + Cyber Accents)
    // Stronger ambient light so custom models with default materials are visible
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    // Directional light for clear shading on imported objects
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 10, 50);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x0055ff, 10, 50);
    blueLight.position.set(-5, -5, 5);
    scene.add(blueLight);

    const yellowLight = new THREE.PointLight(0xffe600, 5, 30);
    yellowLight.position.set(0, 6, -3);
    scene.add(yellowLight);

    // 5. Mesh Group Setup
    const meshGroup = new THREE.Group();
    meshGroupRef.current = meshGroup;
    scene.add(meshGroup);

    // Fallback geometry if the custom model isn't found
    const createFallback = () => {
      const geometry = new THREE.CylinderGeometry(0.8, 1.2, 2.6, 6, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0x0a0f24,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.15,
        wireframe: wireframe,
      });
      return new THREE.Mesh(geometry, material);
    };

    const loader = new GLTFLoader();
    const modelToLoad = customModelUrl || '/my-model.glb';
    
    loader.load(
      modelToLoad,
      (gltf) => {
        // Center and scale the model automatically with safety margin for zooming
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / maxDim; // Compact scale to prevent edge clipping in tight height
        
        gltf.scene.scale.setScalar(scale);
        gltf.scene.position.sub(center.multiplyScalar(scale));
        
        // Optional: apply cyber materials if wireframe is active
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (wireframe) {
              const wireMat = new THREE.MeshBasicMaterial({
                color: 0x00f0ff,
                wireframe: true,
                transparent: true,
                opacity: 0.6,
              });
              child.material = wireMat;
            }
          }
        });

        meshGroup.add(gltf.scene);
        customModelRef.current = gltf.scene;
      },
      undefined,
      (error) => {
        console.warn(`Custom model not found at '${modelToLoad}'. Showing default placeholder shape.`);
        const fallback = createFallback();
        meshGroup.add(fallback);
        customModelRef.current = fallback;
      }
    );

    // Ambient Quantum Particle Dust
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;

      if (Math.random() > 0.5) {
        colors[i] = 0; colors[i + 1] = 0.94; colors[i + 2] = 1;
      } else {
        colors[i] = 1; colors[i + 1] = 0.9; colors[i + 2] = 0;
      }
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Orbit Controls Setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 3.6; // Minimum distance keeps model fully within canvas when zoomed in
    controls.maxDistance = 10.0; // Maximum zoom out distance
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controlsRef.current = controls;

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      particleSystem.rotation.y += 0.001;

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [wireframe, customModelUrl]);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const objectUrl = URL.createObjectURL(file);
    setCustomModelUrl(objectUrl);
    setIsLoading(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] -my-2 sm:-my-4 md:-my-6 max-w-5xl mx-auto flex items-center justify-center select-none group bg-transparent"
    >
      {/* Interactive WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full outline-none"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
          <span className="text-cyan-400 font-mono text-sm tracking-widest animate-pulse font-bold">
            [PARSING_MODEL_DATA...]
          </span>
        </div>
      )}

      {/* Developer note overlay for user replacement */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="px-3 py-1 rounded bg-black/90 border border-cyan-400/40 text-[9px] font-mono text-cyan-300 shadow-lg tracking-widest flex items-center gap-2">
          [DRAG TO EXPLORE 360&deg; &bull; SCROLL TO ZOOM]
        </span>
      </div>
    </div>
  );
}
