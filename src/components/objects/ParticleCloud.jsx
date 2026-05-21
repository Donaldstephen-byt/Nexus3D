import { Sparkles } from "@react-three/drei";

export default function ParticleCloud({
  position = [0, 0, 0],
  color = "#00cfff",
  count = 60,
}) {
  return (
    <Sparkles
      position={position}
      count={count}
      scale={3}
      size={1.5}
      speed={0.4}
      color={color}
    />
  );
}
