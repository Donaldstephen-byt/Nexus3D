import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BLOOM_CONFIG } from "../../constants/config";

export default function BloomEffect() {
  return (
    <EffectComposer>
      <Bloom
        intensity={BLOOM_CONFIG.intensity}
        luminanceThreshold={BLOOM_CONFIG.luminanceThreshold}
        luminanceSmoothing={BLOOM_CONFIG.luminanceSmoothing}
      />
    </EffectComposer>
  );
}
