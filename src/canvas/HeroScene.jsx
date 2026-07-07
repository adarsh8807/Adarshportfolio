
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bounds,
  ContactShadows,
  Environment,
  useGLTF,
} from "@react-three/drei";

function DesktopPC(props) {
  const group = useRef();

  const { scene } = useGLTF(
    "/models/gaming-desktop-pc/scene.gltf"
  );

  // Change this value if your monitor is not facing forward
  const INITIAL_ROTATION = 0;

  useFrame((state) => {
    if (!group.current) return;

    // Full 360° rotation with mouse
    const targetY =
      INITIAL_ROTATION + state.pointer.x * Math.PI * 2;

    // Slight up/down tilt
    const targetX = -state.pointer.y * 0.25;

    // Smooth rotation
    group.current.rotation.y +=
      (targetY - group.current.rotation.y) * 0.08;

    group.current.rotation.x +=
      (targetX - group.current.rotation.x) * 0.08;

    // Floating animation
    group.current.position.y =
      -0.9 +
      Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
  });

  return (
    <group
      ref={group}
      scale={1.8}
      position={[0, -0.9, 0]}
      {...props}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{
        position: [0, 1, 7],
        fov: 35,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.8} />

      {/* Main Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2.5}
        color="#ffffff"
      />

      {/* Fill Light */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={1.4}
        color="#66ffcc"
      />

      {/* RGB Light */}
      <pointLight
        position={[0, 2, 3]}
        intensity={3}
        color="#00ff88"
      />

      {/* Spotlight */}
      <spotLight
        position={[0, 6, 4]}
        angle={0.4}
        penumbra={1}
        intensity={3}
      />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.10}>
          <DesktopPC />
        </Bounds>

        <Environment preset="city" />

        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.7}
          scale={12}
          blur={2.5}
          far={5}
          color="#001a0d"
        />
      </Suspense>
    </Canvas>
  );
}

// Preload model
useGLTF.preload(
  "/models/gaming-desktop-pc/scene.gltf"
);