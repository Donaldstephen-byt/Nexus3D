<script setup>
import { computed, watch, ref } from 'vue'
import { Levioso } from '@tresjs/cientos'
import { createIconTexture } from '../../utils/textureGenerator'

const props = defineProps({
  iconType: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#00cfff'
  },
  position: {
    type: Array,
    default: () => [0, 0, 0]
  },
  size: {
    type: Number,
    default: 1.0
  },
  speed: {
    type: Number,
    default: 1.5
  },
  rotation: {
    type: Array,
    default: () => [0, 0, 0]
  },
  // Telemetry metadata for inspection
  name: {
    type: String,
    default: 'System Node'
  },
  status: {
    type: String,
    default: 'Active'
  },
  load: {
    type: String,
    default: '0%'
  },
  description: {
    type: String,
    default: 'Modular system dashboard node.'
  }
})

const emit = defineEmits(['select-panel'])

const texture = ref(null)

const updateTexture = () => {
  if (texture.value) {
    texture.value.dispose()
  }
  texture.value = createIconTexture(props.iconType, props.color)
}

// Generate texture initially and update if type or color changes
updateTexture()
watch(() => [props.iconType, props.color], updateTexture)

const handleClick = () => {
  emit('select-panel', {
    name: props.name,
    status: props.status,
    load: props.load,
    description: props.description,
    color: props.color
  })
}
</script>

<template>
  <Levioso :speed="props.speed" :float-intensity="0.4" :rotation-intensity="0.2">
    <!-- Main interactive glass plate -->
    <TresMesh :position="props.position" :rotation="props.rotation" @click="handleClick">
      <TresBoxGeometry :args="[props.size, props.size, 0.02]" />
      <TresMeshStandardMaterial
        :map="texture"
        transparent
        :roughness="0.1"
        :metalness="0.8"
        :emissive="props.color"
        :emissive-intensity="0.3"
      />
    </TresMesh>

    <!-- Glowing wireframe shell for visual premium detail -->
    <TresMesh :position="props.position" :rotation="props.rotation">
      <TresBoxGeometry :args="[props.size + 0.04, props.size + 0.04, 0.03]" />
      <TresMeshStandardMaterial
        :color="props.color"
        :emissive="props.color"
        :emissive-intensity="1.5"
        transparent
        :opacity="0.35"
        wireframe
      />
    </TresMesh>
  </Levioso>
</template>
