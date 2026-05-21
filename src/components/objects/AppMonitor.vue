<script setup>
import { ref, watch } from 'vue'
import { Levioso } from '@tresjs/cientos'
import FloatingIcon from './FloatingIcon.vue'
import { createBrowserTexture, createTerminalTexture } from '../../utils/textureGenerator'

const props = defineProps({
  position: {
    type: Array,
    default: () => [0, 0, 0]
  },
  neonColor: {
    type: String,
    default: '#00cfff'
  }
})

const emit = defineEmits(['select-panel'])

const browserTexture = ref(null)
const terminalTexture = ref(null)

const updateTextures = () => {
  if (browserTexture.value) browserTexture.value.dispose()
  if (terminalTexture.value) terminalTexture.value.dispose()

  browserTexture.value = createBrowserTexture(props.neonColor)
  terminalTexture.value = createTerminalTexture(props.neonColor)
}

updateTextures()
watch(() => props.neonColor, updateTextures)

// Emits panel inspection details when clicked
const selectPanel = (name, status, load, description, color) => {
  emit('select-panel', {
    name,
    status,
    load,
    description,
    color
  })
}
</script>

<template>
  <!-- Group holding the entire Center Cluster, rotated isometrically -->
  <TresGroup :position="props.position" :rotation="[0, -Math.PI / 6, 0]">
    
    <!-- 1. LAYERED WINDOW 1: Main Browser Panel (Middle panel) -->
    <Levioso :speed="0.8" :float-intensity="0.3" :rotation-intensity="0.1">
      <TresGroup :position="[0.0, 0.4, -0.1]">
        <!-- Browser plate -->
        <TresMesh 
          @click="selectPanel('Nexus Dashboard GUI', 'Active', '45%', 'Web browser console visualizing layout templates, system health status, and live transaction flows.', props.neonColor)"
        >
          <TresBoxGeometry :args="[2.3, 1.6, 0.02]" />
          <TresMeshStandardMaterial
            :map="browserTexture"
            transparent
            :roughness="0.15"
            :metalness="0.7"
          />
        </TresMesh>
        
        <!-- Frame wireframe -->
        <TresMesh>
          <TresBoxGeometry :args="[2.32, 1.62, 0.03]" />
          <TresMeshStandardMaterial
            :color="props.neonColor"
            transparent
            :opacity="0.3"
            wireframe
          />
        </TresMesh>
      </TresGroup>
    </Levioso>

    <!-- 2. LAYERED WINDOW 2: Terminal/IDE (Front panel, shifted left and forward) -->
    <Levioso :speed="1.1" :float-intensity="0.4" :rotation-intensity="0.15">
      <TresGroup :position="[-0.5, 0.1, 0.4]">
        <!-- Terminal plate -->
        <TresMesh 
          @click="selectPanel('Log Terminal Daemon', 'Active', '62%', 'Terminal console output monitoring backend services, active node synchronization logs, and server compile signals.', '#7b2fff')"
        >
          <TresBoxGeometry :args="[1.8, 1.2, 0.02]" />
          <TresMeshStandardMaterial
            :map="terminalTexture"
            transparent
            :roughness="0.1"
            :metalness="0.8"
          />
        </TresMesh>
        
        <!-- Frame wireframe -->
        <TresMesh>
          <TresBoxGeometry :args="[1.82, 1.22, 0.03]" />
          <TresMeshStandardMaterial
            color="#7b2fff"
            transparent
            :opacity="0.4"
            wireframe
          />
        </TresMesh>
      </TresGroup>
    </Levioso>

    <!-- 3. LAYERED WINDOW 3: Background Code Plane (Shifted right and backmost) -->
    <Levioso :speed="0.6" :float-intensity="0.2" :rotation-intensity="0.05">
      <TresGroup :position="[0.6, 0.35, -0.6]">
        <!-- Tech grid plate -->
        <TresMesh>
          <TresBoxGeometry :args="[1.6, 1.1, 0.01]" />
          <TresMeshStandardMaterial
            color="#0b0f19"
            transparent
            :opacity="0.15"
            :roughness="0.2"
            :metalness="0.9"
          />
        </TresMesh>
        <TresMesh>
          <TresBoxGeometry :args="[1.62, 1.12, 0.02]" />
          <TresMeshStandardMaterial
            color="#ffffff"
            transparent
            :opacity="0.15"
            wireframe
          />
        </TresMesh>
      </TresGroup>
    </Levioso>

    <!-- 4. ROW OF 3 SMALL FLOATING ICONS (Directly below the browser frame) -->
    <FloatingIcon
      icon-type="git"
      :position="[-0.6, -0.65, 0.1]"
      :rotation="[0, 0, 0]"
      :size="0.35"
      :color="props.neonColor"
      name="HUD Mini Git Linker"
      status="Active"
      load="4%"
      description="Micro-agent tracing workspace commit offsets."
      @select-panel="emit('select-panel', $event)"
    />
    <FloatingIcon
      icon-type="cloud"
      :position="[0.0, -0.65, 0.1]"
      :rotation="[0, 0, 0]"
      :size="0.35"
      :color="props.neonColor"
      name="HUD Mini Cloud Sync"
      status="Active"
      load="2%"
      description="Handles quick cache flushes to edge node CDN."
      @select-panel="emit('select-panel', $event)"
    />
    <FloatingIcon
      icon-type="database"
      :position="[0.6, -0.65, 0.1]"
      :rotation="[0, 0, 0]"
      :size="0.35"
      color="#7b2fff"
      name="HUD Mini Data Cache"
      status="Idle"
      load="1%"
      description="Local storage chunk for front-end visual bindings."
      @select-panel="emit('select-panel', $event)"
    />

    <!-- 5. SERVER MODULE (Upright hardware cabinet) -->
    <Levioso :speed="0.9" :float-intensity="0.1" :rotation-intensity="0.05">
      <TresGroup :position="[1.6, -0.35, 0.1]">
        <!-- Main Chassis -->
        <TresMesh 
          @click="selectPanel('Server Unit SV-40', 'Active', '24%', 'Modular physical computing rack unit containing transaction blades and indicators.', props.neonColor)"
        >
          <TresBoxGeometry :args="[0.6, 1.1, 0.7]" />
          <TresMeshStandardMaterial
            color="#111827"
            emissive="#000000"
            :roughness="0.4"
            :metalness="0.9"
          />
        </TresMesh>
        
        <!-- Outer metal wireframe highlights -->
        <TresMesh>
          <TresBoxGeometry :args="[0.62, 1.12, 0.72]" />
          <TresMeshStandardMaterial
            color="#4b5563"
            transparent
            :opacity="0.5"
            wireframe
          />
        </TresMesh>

        <!-- Horizontal server blade divisions -->
        <TresMesh :position="[0, 0.35, 0.36]">
          <TresBoxGeometry :args="[0.5, 0.08, 0.02]" />
          <TresMeshStandardMaterial color="#374151" :metalness="0.8" />
        </TresMesh>
        <!-- Indicator LED 1 (Green) -->
        <TresMesh :position="[0.18, 0.35, 0.37]">
          <TresSphereGeometry :args="[0.025, 8, 8]" />
          <TresMeshStandardMaterial color="#10b981" emissive="#10b981" :emissive-intensity="2.0" />
        </TresMesh>

        <TresMesh :position="[0, 0.15, 0.36]">
          <TresBoxGeometry :args="[0.5, 0.08, 0.02]" />
          <TresMeshStandardMaterial color="#374151" :metalness="0.8" />
        </TresMesh>
        <!-- Indicator LED 2 (Orange) -->
        <TresMesh :position="[0.18, 0.15, 0.37]">
          <TresSphereGeometry :args="[0.025, 8, 8]" />
          <TresMeshStandardMaterial color="#f59e0b" emissive="#f59e0b" :emissive-intensity="1.5" />
        </TresMesh>

        <TresMesh :position="[0, -0.05, 0.36]">
          <TresBoxGeometry :args="[0.5, 0.08, 0.02]" />
          <TresMeshStandardMaterial color="#374151" :metalness="0.8" />
        </TresMesh>
        <!-- Indicator LED 3 (Green) -->
        <TresMesh :position="[0.18, -0.05, 0.37]">
          <TresSphereGeometry :args="[0.025, 8, 8]" />
          <TresMeshStandardMaterial color="#10b981" emissive="#10b981" :emissive-intensity="2.0" />
        </TresMesh>

        <TresMesh :position="[0, -0.25, 0.36]">
          <TresBoxGeometry :args="[0.5, 0.08, 0.02]" />
          <TresMeshStandardMaterial color="#374151" :metalness="0.8" />
        </TresMesh>
        <!-- Indicator LED 4 (Blue/Purple) -->
        <TresMesh :position="[0.18, -0.25, 0.37]">
          <TresSphereGeometry :args="[0.025, 8, 8]" />
          <TresMeshStandardMaterial :color="props.neonColor" :emissive="props.neonColor" :emissive-intensity="2.0" />
        </TresMesh>

        <TresMesh :position="[0, -0.45, 0.36]">
          <TresBoxGeometry :args="[0.5, 0.08, 0.02]" />
          <TresMeshStandardMaterial color="#374151" :metalness="0.8" />
        </TresMesh>
        <!-- Indicator LED 5 (Off) -->
        <TresMesh :position="[0.18, -0.45, 0.37]">
          <TresSphereGeometry :args="[0.025, 8, 8]" />
          <TresMeshStandardMaterial color="#1f2937" />
        </TresMesh>
      </TresGroup>
    </Levioso>

  </TresGroup>
</template>
