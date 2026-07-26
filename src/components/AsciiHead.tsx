import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";

export default function AsciiHead() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Set up dimensions
    const width = mountRef.current.clientWidth;
    const height = width * 1.2; // aspect ratio approximation for portrait

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ascii Effect
    const effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true, color: true });
    effect.setSize(width, height);
    effect.domElement.style.color = "#e2e8f0"; // Vibrant silver/white
    effect.domElement.style.backgroundColor = "transparent";
    mountRef.current.appendChild(effect.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);

    // Load Model
    const loader = new GLTFLoader();
    let headMesh: THREE.Object3D | null = null;
    
    loader.load(
      "/human_head.glb",
      (gltf) => {
        headMesh = gltf.scene;
        // Center and scale the model properly
        const box = new THREE.Box3().setFromObject(headMesh);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.5 / maxDim; // Adjust scale to fit camera
        headMesh.scale.set(scale, scale, scale);
        
        headMesh.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        
        const wrapper = new THREE.Group();
        wrapper.add(headMesh);
        // Slightly rotate to face forward or adjust as needed
        wrapper.rotation.y = -Math.PI / 8;
        
        scene.add(wrapper);
        headMesh = wrapper;
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // Animation Loop
    let animationFrameId: number;
    let mouseY = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const { top, height } = mountRef.current!.getBoundingClientRect();
      const y = (event.clientY - top) / height;
      mouseY = (y - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse rotation (X axis only, Y disabled)
      targetY = mouseY * 0.5;

      if (headMesh) {
        headMesh.rotation.x += (targetY - headMesh.rotation.x) * 0.05;
      }

      effect.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = newWidth * 1.2;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
      effect.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && effect.domElement) {
        mountRef.current.removeChild(effect.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-[280px] sm:w-[420px] md:w-[500px] lg:w-[600px] aspect-[1/1.2] opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
