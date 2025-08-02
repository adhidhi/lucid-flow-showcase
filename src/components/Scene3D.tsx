import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AnimatedMeshProps {
  position: [number, number, number];
  color: string;
  type: 'sphere' | 'torus' | 'box';
}

const AnimatedMesh = ({ position, color, type }: AnimatedMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  const renderGeometry = () => {
    switch (type) {
      case 'sphere':
        return <sphereGeometry args={[0.8, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case 'box':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />;
      default:
        return <sphereGeometry args={[0.8, 32, 32]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
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
          
          <AnimatedMesh
            position={[-2, 0, 0]}
            color="#a855f7"
            type="sphere"
          />
          <AnimatedMesh
            position={[2, 0, 0]}
            color="#3b82f6"
            type="torus"
          />
          <AnimatedMesh
            position={[0, 2, 0]}
            color="#06b6d4"
            type="box"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;