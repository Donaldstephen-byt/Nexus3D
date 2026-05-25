<script setup>
import { ref, watch } from 'vue'
import Scene from './components/scene/Scene.vue'
import Overlay from './components/ui/Overlay.vue'

// Shared control states for the 3D scene
const autoRotate = ref(false)
const starsActive = ref(false)
const bloomIntensity = ref(2.5)
const neonColor = ref('#00cfff')
const bgColor = ref('#080810')
const motionActive = ref(true)
const motionKey = ref(0)

// Active node selection state
const selectedPanel = ref(null)

// Reset floating positions whenever motion state changes (e.g. toggled to off or on)
watch(motionActive, () => {
  motionKey.value++
})

const resetPositions = () => {
  motionKey.value++
}

const selectPanel = (panelInfo) => {
  selectedPanel.value = panelInfo
}

const clearSelection = () => {
  selectedPanel.value = null
}
</script>

<template>
  <div class="app-container">
    <!-- 3D Canvas Viewport Container -->
    <div class="canvas-container">
      <Scene
        :auto-rotate="autoRotate"
        :stars-active="starsActive"
        :bloom-intensity="bloomIntensity"
        :neon-color="neonColor"
        :bg-color="bgColor"
        :motion-active="motionActive"
        :motion-key="motionKey"
        @select-panel="selectPanel"
      />
    </div>

    <!-- Interface Dashboard Overlay -->
    <Overlay
      v-model:auto-rotate="autoRotate"
      v-model:stars-active="starsActive"
      v-model:bloom-intensity="bloomIntensity"
      v-model:neon-color="neonColor"
      v-model:bg-color="bgColor"
      v-model:motion-active="motionActive"
      :selected-panel="selectedPanel"
      @clear-selection="clearSelection"
      @reset-positions="resetPositions"
    />
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(circle, #0e111d 0%, #030408 100%);
}

.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
