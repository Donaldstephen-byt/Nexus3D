export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[-4, 2, 0]} color="#7b2fff" intensity={15} />
      <pointLight position={[4, 2, 0]} color="#00cfff" intensity={15} />
      <pointLight position={[0, 4, 2]} color="#ffffff" intensity={5} />
    </>
  );
}
