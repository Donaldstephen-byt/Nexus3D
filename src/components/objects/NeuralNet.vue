<script setup>
import { computed } from 'vue'
import * as THREE from 'three'
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
  }
})

const emit = defineEmits(['select-panel'])

// 3D coordinates for Neural Network nodes
const inputNodes = [
  [-0.6, 0.7, 0],
  [-0.6, 0.3, 0],
  [-0.6, -0.1, 0]
]

const hiddenNodes = [
  [0.0, 0.8, 0.25],
  [0.0, 0.5, -0.2],
  [0.0, 0.2, 0.25],
  [0.0, -0.1, -0.2]
]

const outputNodes = [
  [0.6, 0.6, 0],
  [0.6, 0.2, 0]
]

// Computed BufferGeometries for the connection lines (synapses)
const synapseGeometries = computed(() => {
  const geoms = []

  // Connect Input -> Hidden
  inputNodes.forEach(ip => {
    hiddenNodes.forEach(hp => {
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...ip),
        new THREE.Vector3(...hp)
      ])
      geoms.push(geom)
    })
  })

  // Connect Hidden -> Output
  hiddenNodes.forEach(hp => {
    outputNodes.forEach(op => {
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...hp),
        new THREE.Vector3(...op)
      ])
      geoms.push(geom)
    })
  })

  return geoms
})

// Emits panel inspection details
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
  <!-- Group holding the entire Right Cluster, rotated isometrically -->
  <TresGroup :position="props.position" :rotation="[0, -Math.PI / 6, 0]">

    <!-- 1. NEURAL NETWORK GRAPH -->
    <Levioso :speed="0.8" :float-intensity="0.25" :rotation-intensity="0.1">
      <TresGroup :position="[-0.4, 0.2, 0.2]">
        
        <!-- Synapse lines connecting layers -->
        <TresLine 
          v-for="(lineGeom, idx) in synapseGeometries" 
          :key="idx" 
          :geometry="lineGeom"
        >
          <TresLineBasicMaterial 
            :color="props.neonColor" 
            transparent 
            :opacity="0.25" 
            :tone-mapped="false" 
          />
        </TresLine>

        <!-- Input Nodes (Green glow) -->
        <TresMesh 
          v-for="(nodePos, idx) in inputNodes" 
          :key="'in-' + idx"
          :position="nodePos"
          @click="selectPanel('Neural Input Node ' + (idx+1), 'Active', '12%', 'Accepts pre-processed feature tensors from client events and passes them down network layers.', '#10b981')"
        >
          <TresSphereGeometry :args="[0.08, 16, 16]" />
          <TresMeshStandardMaterial 
            color="#10b981" 
            emissive="#10b981" 
            :emissive-intensity="1.5" 
            :roughness="0.1"
          />
        </TresMesh>

        <!-- Hidden Nodes (Theme color glow) -->
        <TresMesh 
          v-for="(nodePos, idx) in hiddenNodes" 
          :key="'hid-' + idx"
          :position="nodePos"
          @click="selectPanel('Neural Hidden Node ' + (idx+1), 'Active', '45%', 'Executes mathematical activations, weight calculations, and backpropagation optimization loops.', props.neonColor)"
        >
          <TresSphereGeometry :args="[0.08, 16, 16]" />
          <TresMeshStandardMaterial 
            :color="props.neonColor" 
            :emissive="props.neonColor" 
            :emissive-intensity="2.0" 
            :roughness="0.1"
          />
        </TresMesh>

        <!-- Output Nodes (Purple glow) -->
        <TresMesh 
          v-for="(nodePos, idx) in outputNodes" 
          :key="'out-' + idx"
          :position="nodePos"
          @click="selectPanel('Neural Output Node ' + (idx+1), 'Active', '8%', 'Emits prediction results, log vectors, and classifications to downstream API routes.', '#7b2fff')"
        >
          <TresSphereGeometry :args="[0.08, 16, 16]" />
          <TresMeshStandardMaterial 
            color="#7b2fff" 
            emissive="#7b2fff" 
            :emissive-intensity="1.5" 
            :roughness="0.1"
          />
        </TresMesh>

      </TresGroup>
    </Levioso>

    <!-- 2. DOUBLE CYLINDER DATABASE UNITS -->
    <Levioso :speed="1.1" :float-intensity="0.2" :rotation-intensity="0.05">
      <!-- Database Stack A -->
      <TresGroup :position="[0.8, -0.6, -0.6]">
        
        <!-- Disk 1 (Bottom) -->
        <TresMesh :position="[0, 0, 0]">
          <TresCylinderGeometry :args="[0.32, 0.32, 0.15, 24]" />
          <TresMeshStandardMaterial color="#1f2937" :metalness="0.8" :roughness="0.3" />
        </TresMesh>
        <!-- Glow Ring 1 -->
        <TresMesh :position="[0, 0.08, 0]">
          <TresCylinderGeometry :args="[0.33, 0.33, 0.02, 24]" />
          <TresMeshStandardMaterial :color="props.neonColor" :emissive="props.neonColor" :emissive-intensity="2.0" />
        </TresMesh>

        <!-- Disk 2 (Middle) -->
        <TresMesh :position="[0, 0.18, 0]">
          <TresCylinderGeometry :args="[0.32, 0.32, 0.15, 24]" />
          <TresMeshStandardMaterial color="#1f2937" :metalness="0.8" :roughness="0.3" />
        </TresMesh>
        <!-- Glow Ring 2 -->
        <TresMesh :position="[0, 0.26, 0]">
          <TresCylinderGeometry :args="[0.33, 0.33, 0.02, 24]" />
          <TresMeshStandardMaterial :color="props.neonColor" :emissive="props.neonColor" :emissive-intensity="2.0" />
        </TresMesh>

        <!-- Disk 3 (Top) -->
        <TresMesh :position="[0, 0.36, 0]" @click="selectPanel('User DB Replica', 'Active', '56%', 'Distributed database storage storing user session states and replication transactions.', props.neonColor)">
          <TresCylinderGeometry :args="[0.32, 0.32, 0.15, 24]" />
          <TresMeshStandardMaterial color="#1f2937" :metalness="0.8" :roughness="0.3" />
        </TresMesh>
      </TresGroup>

      <!-- Database Stack B (Slightly smaller, placed further back/right) -->
      <TresGroup :position="[1.5, -0.4, -0.9]">
        
        <!-- Disk 1 -->
        <TresMesh :position="[0, 0, 0]">
          <TresCylinderGeometry :args="[0.25, 0.25, 0.12, 24]" />
          <TresMeshStandardMaterial color="#1f2937" :metalness="0.8" :roughness="0.3" />
        </TresMesh>
        <TresMesh :position="[0, 0.065, 0]">
          <TresCylinderGeometry :args="[0.26, 0.26, 0.02, 24]" />
          <TresMeshStandardMaterial color="#7b2fff" emissive="#7b2fff" :emissive-intensity="1.5" />
        </TresMesh>

        <!-- Disk 2 -->
        <TresMesh :position="[0, 0.14, 0]" @click="selectPanel('Analytics Ledger Store', 'Active', '12%', 'Immutable transaction ledger holding raw telemetry logs and system audit records.', '#7b2fff')">
          <TresCylinderGeometry :args="[0.25, 0.25, 0.12, 24]" />
          <TresMeshStandardMaterial color="#1f2937" :metalness="0.8" :roughness="0.3" />
        </TresMesh>
      </TresGroup>
    </Levioso>

    <!-- 3. FLOATING AI/ML HELPERS (Gears, Brain, Chart, Database icons around neural net) -->
    <!-- gears (top left, facing forward) -->
    <FloatingIcon
      icon-type="gears"
      :position="[-0.8, 1.1, -0.4]"
      :rotation="[0, Math.PI / 2, 0]"
      :size="0.5"
      color="#7b2fff"
      name="Automation Scheduler"
      status="Active"
      load="18%"
      description="Schedules automated routine checks, health telemetry pings, and database optimization tasks."
      @select-panel="emit('select-panel', $event)"
    />

    <!-- python (top right, facing right) -->
    <FloatingIcon
      icon-type="python"
      :position="[0.2, 1.2, -0.8]"
      :rotation="[0, 0, 0]"
      :size="0.5"
      :color="props.neonColor"
      name="ML Feature Compiler"
      status="Active"
      load="22%"
      description="Converts raw web user metrics into standardized model training arrays."
      @select-panel="emit('select-panel', $event)"
    />

    <!-- chart (middle right, facing forward) -->
    <FloatingIcon
      icon-type="chart"
      :position="[1.5, 0.4, -0.2]"
      :rotation="[0, Math.PI / 2, 0]"
      :size="0.5"
      :color="props.neonColor"
      name="System Analytics Engine"
      status="Active"
      load="29%"
      description="Draws real-time statistics, monitors network throughput indices, and alerts admin of anomalies."
      @select-panel="emit('select-panel', $event)"
    />

    <!-- brain (bottom right, facing right) -->
    <FloatingIcon
      icon-type="brain"
      :position="[0.8, -0.4, 0.8]"
      :rotation="[0, 0, 0]"
      :size="0.5"
      :color="props.neonColor"
      name="Cognitive Logic Array"
      status="Processing"
      load="84%"
      description="Coordinates decision trees, token distribution checks, and neural heuristics in real-time."
      @select-panel="emit('select-panel', $event)"
    />

    <!-- database (bottom left, facing right) -->
    <FloatingIcon
      icon-type="database"
      :position="[1.6, -0.2, 0.6]"
      :rotation="[0, 0, 0]"
      :size="0.5"
      color="#7b2fff"
      name="Synapse Ledger"
      status="Active"
      load="15%"
      description="Replicates weights, losses, and active neural checkpoints to local clusters."
      @select-panel="emit('select-panel', $event)"
    />

  </TresGroup>
</template>
