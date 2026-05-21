<script setup>
import { computed } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  points: {
    type: Array,
    required: true
  },
  color: {
    type: String,
    default: '#00cfff'
  }
})

const geometry = computed(() => {
  const geom = new THREE.BufferGeometry()
  geom.setFromPoints(props.points.map((p) => new THREE.Vector3(...p)))
  return geom
})
</script>

<template>
  <TresLine :geometry="geometry">
    <TresLineBasicMaterial :color="props.color" :linewidth="2" :tone-mapped="false" />
  </TresLine>
</template>
