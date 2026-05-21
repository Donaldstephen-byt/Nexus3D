import { Float } from "@react-three/drei";

export default function ServerBox({ position = [0, 0, 0] }) {
  return (
    <Float speed={0.8} floatIntensity={0.3}>
      <mesh position={position}>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#7b2fff"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}
