<script setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Stars } from '@tresjs/cientos'
import Lights from './Lights.vue'
import ExplodedStack from '../objects/ExplodedStack.vue'
import AppMonitor from '../objects/AppMonitor.vue'
import NeuralNet from '../objects/NeuralNet.vue'
import NeonLine from '../objects/NeonLine.vue'
import ParticleCloud from '../objects/ParticleCloud.vue'
import BloomEffect from '../effects/BloomEffect.vue'

const props = defineProps({
  autoRotate: {
    type: Boolean,
    default: true
  },
  starsActive: {
    type: Boolean,
    default: true
  },
  bloomIntensity: {
    type: Number,
    default: 2.5
  },
  neonColor: {
    type: String,
    default: '#00cfff'
  },
  bgColor: {
    type: String,
    default: '#080810'
  },
  motionActive: {
    type: Boolean,
    default: true
  },
  motionKey: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['select-panel'])

// Isometric neon routing pathways (orthogonal paths routing along grid layout)
const routeLeftToCenter1 = [
  [-3.4, -0.6, 1.0],
  [-1.9, -0.6, 1.0],
  [-1.9, 0.1, 0.1],
  [-1.2, 0.1, 0.1]
]

const routeLeftToCenter2 = [
  [-3.2, -0.9, 1.3],
  [-1.6, -0.9, 0.8],
  [-1.6, 0.3, 0.3],
  [-1.0, 0.3, 0.3]
]

const routeCenterToRight1 = [
  [1.9, 0.1, -0.2],
  [2.8, 0.1, -0.2],
  [2.8, 0.8, -1.0],
  [3.6, 0.8, -1.0]
]

const routeCenterToRight2 = [
  [1.7, -0.2, -0.4],
  [2.5, -0.2, -0.4],
  [2.5, 0.5, -1.2],
  [3.3, 0.5, -1.2]
]
</script>

<template>
  <TresCanvas
    :clear-color="props.bgColor"
  >
    <TresPerspectiveCamera :position="[8.0, 5.5, 10.0]" :fov="50" />
    <Lights />
    
    <!-- Cybernetic Stars Background (disabled by default, reduced count) -->
    <Stars
      v-if="props.starsActive"
      :radius="60"
      :depth="50"
      :count="800"
      :factor="1.5"
      fade
    />

    <!-- LEFT CLUSTER: Exploded chip stack & core developer tools -->
    <ExplodedStack
      :key="props.motionKey"
      :position="[-4.5, -0.6, 1.5]"
      :neon-color="props.neonColor"
      :motion-active="props.motionActive"
      @select-panel="emit('select-panel', $event)"
    />
    <ParticleCloud :position="[-4.5, -0.6, 1.5]" :color="props.neonColor" :count="40" :motion-active="props.motionActive" />

    <!-- CENTER CLUSTER: Layered workspace panels & server unit -->
    <AppMonitor
      :key="props.motionKey"
      :position="[0, 0.1, 0]"
      :neon-color="props.neonColor"
      :motion-active="props.motionActive"
      @select-panel="emit('select-panel', $event)"
    />

    <!-- RIGHT CLUSTER: Neural Net and database layers -->
    <NeuralNet
      :key="props.motionKey"
      :position="[4.5, 0.8, -1.5]"
      :neon-color="props.neonColor"
      :motion-active="props.motionActive"
      @select-panel="emit('select-panel', $event)"
    />
    <ParticleCloud :position="[4.5, 0.8, -1.5]" color="#7b2fff" :count="30" :motion-active="props.motionActive" />

    <!-- ISOMETRIC NEON PIPELINES (Data flow paths) -->
    <!-- Left to Center (cyan/preset) -->
    <NeonLine
      :color="props.neonColor"
      :points="routeLeftToCenter1"
    />
    <!-- Left to Center (purple) -->
    <NeonLine
      color="#7b2fff"
      :points="routeLeftToCenter2"
    />
    <!-- Center to Right (cyan/preset) -->
    <NeonLine
      :color="props.neonColor"
      :points="routeCenterToRight1"
    />
    <!-- Center to Right (purple) -->
    <NeonLine
      color="#7b2fff"
      :points="routeCenterToRight2"
    />

    <!-- Glowing Bloom Postprocessing -->
    <BloomEffect :intensity="props.bloomIntensity" />

    <!-- Camera Navigation Controls -->
    <OrbitControls
      :enable-zoom="true"
      :enable-pan="false"
      :min-distance="4"
      :max-distance="16"
      :auto-rotate="props.autoRotate"
      :auto-rotate-speed="0.25"
    />
  </TresCanvas>
</template>
