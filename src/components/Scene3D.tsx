import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingPhotoProps {
  imageUrl?: string;
}

const FloatingPhoto = ({ imageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" }: FloatingPhotoProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const frameRef = useRef<THREE.Mesh>(null!);
  
  // Load the texture
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  useFrame((state) => {
    if (meshRef.current && groupRef.current && frameRef.current) {
      // Smooth floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.4;
      groupRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * 0.2;
      
      // Dynamic rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Animated frame
      frameRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main photo with curved edges */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial
          map={texture}
          transparent
          roughness={0.1}
          metalness={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Animated holographic frame */}
      <mesh ref={frameRef} position={[0, 0, 0.2]}>
        <torusGeometry args={[2.4, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
          wireframe={true}
        />
      </mesh>
      
      {/* Outer glow ring */}
      <mesh position={[0, 0, -0.2]}>
        <ringGeometry args={[2.8, 3.2, 64]} />
        <meshStandardMaterial
          color="#ff6b6b"
          emissive="#ff6b6b"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Energy particles around photo */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3.5;
        return (
          <mesh 
            key={i} 
            position={[
              Math.cos(angle) * radius, 
              Math.sin(angle) * radius * 0.3, 
              Math.sin(angle) * 0.5
            ]}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#4ade80"
              emissive="#4ade80"
              emissiveIntensity={1.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const FloatingGeometry = () => {
  const torusRef = useRef<THREE.Mesh>(null!);
  const icosahedronRef = useRef<THREE.Mesh>(null!);
  const dodecahedronRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      torusRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
    }
    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x = -state.clock.elapsedTime * 0.3;
      icosahedronRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      icosahedronRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.7) * 1.5;
    }
    if (dodecahedronRef.current) {
      dodecahedronRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      dodecahedronRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      dodecahedronRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.6) * 2;
    }
  });

  return (
    <group>
      {/* Animated Torus */}
      <mesh ref={torusRef} position={[-4, 2, -2]}>
        <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
        <meshStandardMaterial
          color="#9333ea"
          emissive="#9333ea"
          emissiveIntensity={0.4}
          wireframe={false}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Icosahedron */}
      <mesh ref={icosahedronRef} position={[4, 1, -1]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          wireframe={true}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Dodecahedron */}
      <mesh ref={dodecahedronRef} position={[2, -2, 3]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};

const ParticleField = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const particlesCount = 80;
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const particles = Array.from({ length: particlesCount }, (_, i) => {
    const angle = (i / particlesCount) * Math.PI * 4;
    const radius = 6 + Math.random() * 4;
    const height = (Math.random() - 0.5) * 10;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const size = 0.03 + Math.random() * 0.02;
    
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return (
      <mesh key={i} position={[x, height, z]}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>
    );
  });

  return <group ref={groupRef}>{particles}</group>;
};

interface Scene3DProps {
  className?: string;
}

const Scene3D = ({ className = "" }: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <FloatingPhoto />
          <FloatingGeometry />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;