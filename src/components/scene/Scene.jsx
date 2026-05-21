import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Lights from "./Lights";
import FloatingPanel from "../objects/FloatingPanel";
import NeonLine from "../objects/NeonLine";
import ParticleCloud from "../objects/ParticleCloud";
import ServerBox from "../objects/ServerBox";
import BloomEffect from "../effects/BloomEffect";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 1, 8], fov: 60 }}
      style={{ background: "#080810" }}
    >
      <Lights />
      <Stars radius={60} depth={50} count={3000} factor={3} fade />

      {/* LEFT CLUSTER — tools & icons */}
      <FloatingPanel position={[-4.5, 0.5, 0]} color="#7b2fff" />
      <FloatingPanel
        position={[-3.8, -0.4, 0.5]}
        color="#00cfff"
        size={[1, 0.7, 0.02]}
      />
      <FloatingPanel
        position={[-5, -0.2, -0.3]}
        color="#7b2fff"
        size={[0.8, 0.6, 0.02]}
      />
      <ParticleCloud position={[-4, 0, 0]} color="#7b2fff" count={50} />

      {/* NEON LINES connecting left → center */}
      <NeonLine
        color="#00cfff"
        points={[
          [-3, 0, 0],
          [-1.5, 0, 0],
        ]}
      />
      <NeonLine
        color="#7b2fff"
        points={[
          [-3, -0.3, 0],
          [-1.5, -0.3, 0],
        ]}
      />

      {/* CENTER — main monitor/screen panels */}
      <FloatingPanel
        position={[0, 0.6, 0]}
        size={[2.2, 1.4, 0.02]}
        color="#00cfff"
        speed={1}
      />
      <FloatingPanel
        position={[0.3, 0.4, -0.3]}
        size={[2, 1.2, 0.02]}
        color="#7b2fff"
        speed={0.8}
      />
      <FloatingPanel
        position={[-0.2, 0.2, -0.6]}
        size={[1.8, 1, 0.02]}
        color="#00cfff"
        speed={1.2}
      />
      <ServerBox position={[1.5, -0.3, 0]} />

      {/* NEON LINES connecting center → right */}
      <NeonLine
        color="#00cfff"
        points={[
          [1.5, 0.3, 0],
          [3, 0.6, 0],
        ]}
      />
      <NeonLine
        color="#7b2fff"
        points={[
          [1.5, 0, 0],
          [3, -0.2, 0],
        ]}
      />
      <NeonLine
        color="#00cfff"
        points={[
          [1.5, -0.3, 0],
          [3, -0.8, 0],
        ]}
      />

      {/* RIGHT CLUSTER — neural net / database */}
      <FloatingPanel
        position={[4.5, 1, 0]}
        size={[0.7, 0.7, 0.02]}
        color="#00cfff"
      />
      <FloatingPanel
        position={[5, 0.2, 0]}
        size={[0.7, 0.7, 0.02]}
        color="#7b2fff"
      />
      <FloatingPanel
        position={[4.2, -0.5, 0]}
        size={[0.7, 0.7, 0.02]}
        color="#00cfff"
      />
      <FloatingPanel
        position={[5.2, -0.3, 0.3]}
        size={[0.6, 0.6, 0.02]}
        color="#7b2fff"
      />
      <ParticleCloud position={[4.8, 0.3, 0]} color="#00cfff" count={40} />

      {/* Postprocessing */}
      <BloomEffect />

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={14}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
}
