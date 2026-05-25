<script setup>
import { Levioso } from '@tresjs/cientos'
import FloatingIcon from './FloatingIcon.vue'

const props = defineProps({
  position: {
    type: Array,
    default: () => [0, 0, 0]
  },
  neonColor: {
    type: String,
    default: '#00cfff'
  },
  motionActive: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['select-panel'])
</script>

<template>
  <!-- Group holding the entire Left Cluster stack, rotated isometrically -->
  <TresGroup :position="props.position" :rotation="[0, -Math.PI / 6, 0]">
    
    <!-- 1. BASEBOARD (Motherboard substrate) -->
    <TresMesh :position="[0, -1.2, 0]">
      <TresBoxGeometry :args="[2.2, 0.1, 2.2]" />
      <TresMeshStandardMaterial
        color="#0b0f19"
        :roughness="0.5"
        :metalness="0.9"
      />
    </TresMesh>
    
    <!-- Baseboard decorative frame -->
    <TresMesh :position="[0, -1.2, 0]">
      <TresBoxGeometry :args="[2.25, 0.12, 2.25]" />
      <TresMeshStandardMaterial
        :color="props.neonColor"
        transparent
        :opacity="0.3"
        wireframe
      />
    </TresMesh>

    <!-- Motherboard decorative copper/gold circuit traces -->
    <TresMesh :position="[-0.5, -1.14, 0.3]">
      <TresBoxGeometry :args="[0.05, 0.01, 1.2]" />
      <TresMeshStandardMaterial color="#d97706" emissive="#d97706" :emissive-intensity="0.6" />
    </TresMesh>
    <TresMesh :position="[0.5, -1.14, -0.3]">
      <TresBoxGeometry :args="[0.05, 0.01, 1.2]" />
      <TresMeshStandardMaterial color="#d97706" emissive="#d97706" :emissive-intensity="0.6" />
    </TresMesh>
    <TresMesh :position="[0.0, -1.14, 0.0]" :rotation="[0, Math.PI / 2, 0]">
      <TresBoxGeometry :args="[0.05, 0.01, 1.6]" />
      <TresMeshStandardMaterial color="#d97706" emissive="#d97706" :emissive-intensity="0.6" />
    </TresMesh>

    <!-- 2. CPU DIE (Core Processor in center of motherboard) -->
    <TresMesh :position="[0, -1.1, 0]">
      <TresBoxGeometry :args="[0.9, 0.12, 0.9]" />
      <TresMeshStandardMaterial
        color="#1f2937"
        :emissive="props.neonColor"
        :emissive-intensity="0.2"
        :roughness="0.2"
        :metalness="0.95"
      />
    </TresMesh>
    
    <!-- CPU Die Golden contacts -->
    <TresMesh :position="[0, -1.04, 0]">
      <TresBoxGeometry :args="[0.6, 0.02, 0.6]" />
      <TresMeshStandardMaterial
        color="#d97706"
        emissive="#d97706"
        :emissive-intensity="0.5"
        :roughness="0.1"
        :metalness="1.0"
      />
    </TresMesh>

    <!-- 3. EXPLODED GLASS CIRCUITS (Floating stacks of processing layers) -->
    
    <!-- Layer 1: Bottom Logic Gates -->
    <Levioso 
      :speed="props.motionActive ? 0.9 : 0" 
      :float-intensity="props.motionActive ? 0.2 : 0" 
      :rotation-intensity="props.motionActive ? 0.1 : 0"
    >
      <TresMesh :position="[0, -0.6, 0]">
        <TresBoxGeometry :args="[1.8, 0.02, 1.8]" />
        <TresMeshStandardMaterial
          :color="props.neonColor"
          :emissive="props.neonColor"
          :emissive-intensity="0.2"
          transparent
          :opacity="0.15"
          :roughness="0.1"
          :metalness="0.9"
        />
      </TresMesh>
      <TresMesh :position="[0, -0.6, 0]">
        <TresBoxGeometry :args="[1.82, 0.03, 1.82]" />
        <TresMeshStandardMaterial
          color="#ffffff"
          transparent
          :opacity="0.2"
          wireframe
        />
      </TresMesh>
    </Levioso>

    <!-- Layer 2: Middle Interconnect routing layer -->
    <Levioso 
      :speed="props.motionActive ? 1.2 : 0" 
      :float-intensity="props.motionActive ? 0.3 : 0" 
      :rotation-intensity="props.motionActive ? 0.15 : 0"
    >
      <TresMesh :position="[0, -0.1, 0]">
        <TresBoxGeometry :args="[1.6, 0.02, 1.6]" />
        <TresMeshStandardMaterial
          color="#7b2fff"
          emissive="#7b2fff"
          :emissive-intensity="0.3"
          transparent
          :opacity="0.1"
          :roughness="0.1"
          :metalness="0.9"
        />
      </TresMesh>
      <TresMesh :position="[0, -0.1, 0]">
        <TresBoxGeometry :args="[1.62, 0.03, 1.62]" />
        <TresMeshStandardMaterial
          :color="props.neonColor"
          transparent
          :opacity="0.4"
          wireframe
        />
      </TresMesh>
    </Levioso>

    <!-- Layer 3: Top Silicon/Memory Core -->
    <Levioso 
      :speed="props.motionActive ? 1.5 : 0" 
      :float-intensity="props.motionActive ? 0.25 : 0" 
      :rotation-intensity="props.motionActive ? 0.1 : 0"
    >
      <TresMesh :position="[0, 0.4, 0]">
        <TresBoxGeometry :args="[1.4, 0.02, 1.4]" />
        <TresMeshStandardMaterial
          :color="props.neonColor"
          :emissive="props.neonColor"
          :emissive-intensity="0.4"
          transparent
          :opacity="0.25"
          :roughness="0.05"
          :metalness="0.95"
        />
      </TresMesh>
      <TresMesh :position="[0, 0.4, 0]">
        <TresBoxGeometry :args="[1.42, 0.03, 1.42]" />
        <TresMeshStandardMaterial
          color="#ffffff"
          transparent
          :opacity="0.3"
          wireframe
        />
      </TresMesh>
    </Levioso>

    <!-- Stack Corner Pins (Cylinders holding it in 3D visualization space) -->
    <TresMesh :position="[-0.8, -0.3, -0.8]">
      <TresCylinderGeometry :args="[0.02, 0.02, 1.8]" />
      <TresMeshStandardMaterial color="#4b5563" :metalness="0.9" :roughness="0.2" />
    </TresMesh>
    <TresMesh :position="[0.8, -0.3, -0.8]">
      <TresCylinderGeometry :args="[0.02, 0.02, 1.8]" />
      <TresMeshStandardMaterial color="#4b5563" :metalness="0.9" :roughness="0.2" />
    </TresMesh>
    <TresMesh :position="[-0.8, -0.3, 0.8]">
      <TresCylinderGeometry :args="[0.02, 0.02, 1.8]" />
      <TresMeshStandardMaterial color="#4b5563" :metalness="0.9" :roughness="0.2" />
    </TresMesh>
    <TresMesh :position="[0.8, -0.3, 0.8]">
      <TresCylinderGeometry :args="[0.02, 0.02, 1.8]" />
      <TresMeshStandardMaterial color="#4b5563" :metalness="0.9" :roughness="0.2" />
    </TresMesh>

    <!-- 4. FLOATING DEV TOOLS (6 icons positioned and rotated along isometric axes) -->
    <!-- Git Node (top right, facing right) -->
    <FloatingIcon
      icon-type="git"
      :position="[1.3, 0.8, -0.6]"
      :rotation="[0, 0, 0]"
      :size="0.65"
      :color="props.neonColor"
      :motion-active="props.motionActive"
      name="Git Core Service"
      status="Active"
      load="14%"
      description="Manages code synchronization, version indices, and deployment pipelines."
      @select-panel="emit('select-panel', $event)"
    />

    <!-- Python Script Node (mid right, facing forward) -->
    <FloatingIcon
      icon-type="python"
      :position="[1.1, 0.1, 1.2]"
      :rotation="[0, Math.PI / 2, 0]"
      :size="0.65"
      color="#7b2fff"
      :motion-active="props.motionActive"
      name="Python Analytics Compiler"
      status="Active"
      load="38%"
      description="Processes heavy backend computation, analytics parsing, and database transactions."
      @select-panel="emit('select-panel', $event)"
    />

    <!-- Cloud Host Node (bottom right, facing right) -->
    <FloatingIcon
      icon-type="cloud"
      :position="[1.4, -0.4, 0.2]"
      :rotation="[0, 0, 0]"
      :size="0.6"
      :color="props.neonColor"
      :motion-active="props.motionActive"
      name="Cloud CDN Edge"
      status="Active"
      load="5%"
      description="Caches content and handles user connections locally with minimal latency."
      @select-panel="emit('select-panel', $event)"
    />

    <!-- C++ Engine Node (top left, facing right) -->
    <FloatingIcon
      icon-type="cpp"
      :position="[-1.3, 0.7, -0.4]"
      :rotation="[0, 0, 0]"
      :size="0.6"
      :color="props.neonColor"
      :motion-active="props.motionActive"
      name="C++ Logic Runtime"
      status="Active"
      load="8%"
      description="Low-level kernel engine that executes mathematical calculations and raycasting loops."
      @select-panel="emit('select-panel', $event)"
    />

    <!-- Gears Automation Node (mid left, facing forward) -->
    <FloatingIcon
      icon-type="gears"
      :position="[-1.1, 0.1, 1.1]"
      :rotation="[0, Math.PI / 2, 0]"
      :size="0.6"
      color="#7b2fff"
      :motion-active="props.motionActive"
      name="Automation Scheduler"
      status="Active"
      load="18%"
      description="Schedules automated routine checks, health telemetry pings, and database optimization tasks."
      @select-panel="emit('select-panel', $event)"
    />

    <!-- DB Storage Node (bottom left, facing right) -->
    <FloatingIcon
      icon-type="database"
      :position="[-1.4, -0.5, 0.3]"
      :rotation="[0, 0, 0]"
      :size="0.6"
      color="#7b2fff"
      :motion-active="props.motionActive"
      name="Local Buffer DB"
      status="Idle"
      load="1%"
      description="Holds temporary state and session cache logs before replication."
      @select-panel="emit('select-panel', $event)"
    />

  </TresGroup>
</template>
