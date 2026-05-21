import * as THREE from "three";

export default function NeonLine({ points, color = "#00cfff" }) {
  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(...p)),
  );

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} linewidth={2} toneMapped={false} />
    </line>
  );
}
