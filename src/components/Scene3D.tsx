import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DeveloperCartoon = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Mesh>(null!);
  const laptopRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (groupRef.current && headRef.current && laptopRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
      
      // Head nodding animation
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Slight rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Laptop screen glow animation
      const laptop = laptopRef.current.material as THREE.MeshStandardMaterial;
      laptop.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#ffdbac"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color="#8b4513"
          roughness={0.9}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.15, 1.85, 0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 1.85, 0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Glasses */}
      <mesh position={[0, 1.85, 0.4]}>
        <torusGeometry args={[0.12, 0.02, 8, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[-0.15, 1.85, 0.4]}>
        <torusGeometry args={[0.12, 0.02, 8, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0.15, 1.85, 0.4]}>
        <torusGeometry args={[0.12, 0.02, 8, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 1.2, 32]} />
        <meshStandardMaterial
          color="#4a90e2"
          roughness={0.7}
        />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.8, 0.8, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.8, 0.8, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      
      {/* Hands on laptop */}
      <mesh position={[-0.3, 0.3, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.3, 0.3, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      
      {/* Laptop */}
      <group position={[0, 0.2, 0.4]}>
        {/* Laptop base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 0.05, 0.7]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        
        {/* Laptop screen */}
        <mesh ref={laptopRef} position={[0, 0.35, -0.3]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.9, 0.6, 0.02]} />
          <meshStandardMaterial
            color="#1a1a1a"
            emissive="#00ff41"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Code on screen */}
        <mesh position={[0, 0.35, -0.29]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[0.8, 0.5]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#00ff41"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
      
      {/* Legs */}
      <mesh position={[-0.2, -0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.2, -0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.2, -1.1, 0.1]}>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.2, -1.1, 0.1]}>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Coffee cup */}
      <mesh position={[1, 0.5, 0.2]}>
        <cylinderGeometry args={[0.08, 0.1, 0.2, 16]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Coffee steam particles */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[1, 0.7 + i * 0.1, 0.2]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.8 - i * 0.15}
          />
        </mesh>
      ))}
    </group>
  );
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
          
          <DeveloperCartoon />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;