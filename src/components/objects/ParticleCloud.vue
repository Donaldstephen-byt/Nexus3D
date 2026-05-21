<script setup>
import { Sparkles } from '@tresjs/cientos'

const props = defineProps({
  position: {
    type: Array,
    default: () => [0, 0, 0]
  },
  color: {
    type: String,
    default: '#00cfff'
  },
  count: {
    type: Number,
    default: 60
  }
})
</script>

<template>
  <Sparkles
    :position="props.position"
    :count="props.count"
    :scale="3"
    :size="1.5"
    :speed="0.4"
    :color="props.color"
  />
</template>
