<script setup>
import { EffectComposerPmndrs, BloomPmndrs } from '@tresjs/post-processing'

const props = defineProps({
  intensity: {
    type: Number,
    default: 2.5
  }
})
</script>

<template>
  <Suspense>
    <EffectComposerPmndrs>
      <BloomPmndrs
        :intensity="props.intensity"
        :luminance-threshold="0.1"
        :luminance-smoothing="0.9"
        mipmap-blur
      />
    </EffectComposerPmndrs>
  </Suspense>
</template>
