import { Float } from "@react-three/drei";

export default function FloatingPanel({
  position = [0, 0, 0],
  size = [1.6, 1, 0.02],
  speed = 1.5,
  color = "#00cfff",
}) {
  return (
    <Float speed={speed} floatIntensity={0.5} rotationIntensity={0.3}>
      <mesh position={position}>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
      {/* Panel border glow */}
      <mesh position={position}>
        <boxGeometry args={[size[0] + 0.02, size[1] + 0.02, 0.01]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
}
