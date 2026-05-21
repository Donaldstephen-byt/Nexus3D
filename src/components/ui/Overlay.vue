<script setup>
import { ref } from 'vue'

const props = defineProps({
  autoRotate: Boolean,
  starsActive: Boolean,
  bloomIntensity: Number,
  neonColor: String,
  selectedPanel: Object
})

const emit = defineEmits([
  'update:autoRotate',
  'update:starsActive',
  'update:bloomIntensity',
  'update:neonColor',
  'clear-selection'
])

const isMinimized = ref(false)

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
}

// Preset color chips
const colors = [
  { name: 'Neon Blue', value: '#00cfff' },
  { name: 'Neon Purple', value: '#7b2fff' },
  { name: 'Hot Pink', value: '#ff007b' },
  { name: 'Amber Gold', value: '#ffb800' }
]

const toggleAutoRotate = () => {
  emit('update:autoRotate', !props.autoRotate)
}

const toggleStars = () => {
  emit('update:starsActive', !props.starsActive)
}

const updateBloom = (e) => {
  emit('update:bloomIntensity', parseFloat(e.target.value))
}

const selectColor = (val) => {
  emit('update:neonColor', val)
}
</script>

<template>
  <div class="overlay-container">
    <!-- Top HUD Header -->
    <header class="hud-header">
      <div class="hud-logo">
        <span class="logo-pulse"></span>
        <h1 class="logo-text">NEXUS 3D</h1>
      </div>
      <div class="hud-status" style="display: flex; align-items: center; gap: 16px;">
        <button 
          id="btn-toggle-hud"
          class="hud-toggle-btn"
          @click="toggleMinimize"
        >
          {{ isMinimized ? '▶ EXPAND HUD' : '◀ COLLAPSE HUD' }}
        </button>
        <span class="status-label">SYS_STATUS:</span>
        <span class="status-value">ONLINE_SYNCED</span>
      </div>
    </header>

    <!-- Main Grid HUD -->
    <main class="hud-main">
      <!-- Left: System Control panel -->
      <section :class="['hud-section', 'controls-panel', { minimized: isMinimized }]">
        <h2 class="section-title">// SYSTEM CONTROLS</h2>
        
        <div class="control-group">
          <label class="control-label">GRID ROTATION</label>
          <button 
            id="btn-toggle-rotation"
            :class="['hud-button', { active: props.autoRotate }]"
            @click="toggleAutoRotate"
          >
            {{ props.autoRotate ? 'AUTO_ROTATION: ON' : 'AUTO_ROTATION: OFF' }}
          </button>
        </div>

        <div class="control-group">
          <label class="control-label">STARFIELD DUST</label>
          <button 
            id="btn-toggle-starfield"
            :class="['hud-button', { active: props.starsActive }]"
            @click="toggleStars"
          >
            {{ props.starsActive ? 'STARFIELD: VISIBLE' : 'STARFIELD: HIDDEN' }}
          </button>
        </div>

        <div class="control-group">
          <label class="control-label">GLOW BLOOM: {{ props.bloomIntensity.toFixed(1) }}</label>
          <input 
            id="input-bloom-intensity"
            type="range" 
            min="0" 
            max="5" 
            step="0.1" 
            :value="props.bloomIntensity" 
            @input="updateBloom"
            class="hud-slider"
          />
        </div>

        <div class="control-group">
          <label class="control-label">NEON CORE VECTOR COLOR</label>
          <div class="color-chips">
            <button 
              v-for="c in colors" 
              :key="c.value"
              :id="'btn-color-' + c.name.toLowerCase().replace(' ', '-')"
              :class="['color-chip', { active: props.neonColor === c.value }]"
              :style="{ backgroundColor: c.value, boxShadow: props.neonColor === c.value ? `0 0 10px ${c.value}` : 'none' }"
              @click="selectColor(c.value)"
              :title="c.name"
            />
          </div>
        </div>
      </section>

      <!-- Right: Node inspector -->
      <section :class="['hud-section', 'inspector-panel', { minimized: isMinimized }]">
        <h2 class="section-title">// NODE INSPECTOR</h2>
        
        <div v-if="props.selectedPanel" class="inspector-content">
          <div class="node-header">
            <span class="node-indicator" :style="{ backgroundColor: props.selectedPanel.color, boxShadow: `0 0 8px ${props.selectedPanel.color}` }"></span>
            <h3 class="node-name">{{ props.selectedPanel.name }}</h3>
          </div>
          
          <table class="node-specs">
            <tbody>
              <tr>
                <td>STATUS:</td>
                <td :class="['spec-value', props.selectedPanel.status.toLowerCase()]">
                  {{ props.selectedPanel.status }}
                </td>
              </tr>
              <tr>
                <td>TELEMETRY_LOAD:</td>
                <td class="spec-value load-value">{{ props.selectedPanel.load }}</td>
              </tr>
            </tbody>
          </table>

          <p class="node-description">{{ props.selectedPanel.description }}</p>

          <button id="btn-deselect-node" class="hud-button secondary" @click="emit('clear-selection')">
            DESELECT NODE
          </button>
        </div>
        
        <div v-else class="inspector-placeholder">
          <div class="scanner-line"></div>
          <p>AWAITING CORE BEACON INTERACTION...</p>
          <span class="placeholder-tip">Click on any floating 3D panel to inspect realtime telemetry.</span>
        </div>
      </section>
    </main>

    <!-- Footer HUD stats -->
    <footer class="hud-footer">
      <div class="footer-stat">PING: <span class="highlight">14ms</span></div>
      <div class="footer-stat">FPS: <span class="highlight">60</span></div>
      <div class="footer-stat">TREJS_VERSION: <span class="highlight">v3.x</span></div>
    </footer>
  </div>
</template>

<style scoped>
.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none; /* Let clicks pass through to Canvas if not on UI elements */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  box-sizing: border-box;
}

.hud-header, .hud-main, .hud-footer {
  pointer-events: auto; /* Re-enable pointer events for UI */
}

/* Header styling */
.hud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 207, 255, 0.2);
  padding-bottom: 12px;
  background: linear-gradient(180deg, rgba(8, 8, 16, 0.8) 0%, rgba(8, 8, 16, 0) 100%);
}

.hud-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-pulse {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #00cfff;
  box-shadow: 0 0 10px #00cfff;
  animation: pulse 1.5s infinite alternate;
}

@keyframes pulse {
  0% { opacity: 0.3; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1.1); }
}

.logo-text {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 0 0 8px rgba(0, 207, 255, 0.5);
  margin: 0;
}

.hud-status {
  font-family: monospace;
  font-size: 13px;
  color: #00cfff;
  letter-spacing: 1px;
}

.status-label {
  color: #6b7280;
}

.status-value {
  color: #00ff88;
  font-weight: bold;
}

/* Main layouts */
.hud-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; /* Align elements to bottom to stay clear of top canvas content */
  flex-grow: 1;
  margin: 24px 0;
  gap: 24px;
  pointer-events: none;
}

.hud-section {
  pointer-events: auto;
  width: 320px;
  background: rgba(10, 10, 25, 0.6);
  border: 1px solid rgba(0, 207, 255, 0.25);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  padding: 20px;
  color: #9ca3af;
  font-family: monospace;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.hud-section:hover {
  border-color: rgba(0, 207, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 207, 255, 0.15);
}

.section-title {
  font-size: 14px;
  color: #00cfff;
  letter-spacing: 1px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 6px;
  margin-top: 0;
}

/* Controls */
.control-group {
  margin-bottom: 20px;
}

.control-label {
  font-size: 11px;
  color: #6b7280;
  display: block;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.hud-button {
  width: 100%;
  background: rgba(0, 207, 255, 0.05);
  border: 1px solid rgba(0, 207, 255, 0.3);
  color: #00cfff;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-family: monospace;
  font-weight: bold;
  font-size: 12px;
  transition: all 0.2s ease;
  text-shadow: 0 0 4px rgba(0, 207, 255, 0.3);
}

.hud-button:hover {
  background: rgba(0, 207, 255, 0.2);
  border-color: #00cfff;
  color: #fff;
  box-shadow: 0 0 12px rgba(0, 207, 255, 0.3);
}

.hud-button.active {
  background: rgba(0, 207, 255, 0.25);
  border-color: #00cfff;
  color: #fff;
}

.hud-button.secondary {
  background: rgba(239, 68, 68, 0.05);
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.hud-button.secondary:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  color: #fff;
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.3);
}

.hud-slider {
  width: 100%;
  accent-color: #00cfff;
  cursor: pointer;
}

.color-chips {
  display: flex;
  gap: 12px;
}

.color-chip {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-chip:hover {
  transform: scale(1.15);
}

.color-chip.active {
  border-color: #fff;
  transform: scale(1.1);
}

/* Inspector */
.node-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.node-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.node-name {
  font-size: 16px;
  color: #fff;
  margin: 0;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
}

.node-specs {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin-bottom: 16px;
}

.node-specs td {
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.spec-value {
  text-align: right;
  font-weight: bold;
}

.spec-value.active {
  color: #10b981;
}

.spec-value.idle {
  color: #6b7280;
}

.spec-value.synchronizing {
  color: #f59e0b;
}

.spec-value.overloaded {
  color: #ef4444;
  animation: flash 1s infinite alternate;
}

@keyframes flash {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

.load-value {
  color: #fff;
}

.node-description {
  font-size: 12px;
  line-height: 1.5;
  color: #9ca3af;
  margin-bottom: 20px;
}

/* Inspector Placeholder */
.inspector-placeholder {
  position: relative;
  text-align: center;
  padding: 40px 10px;
  color: #4b5563;
  border: 1px dashed rgba(0, 207, 255, 0.15);
  border-radius: 8px;
  overflow: hidden;
}

.scanner-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, rgba(0,207,255,0) 0%, rgba(0,207,255,0.8) 50%, rgba(0,207,255,0) 100%);
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% { top: 0%; }
  100% { top: 100%; }
}

.inspector-placeholder p {
  font-size: 11px;
  color: #00cfff;
  opacity: 0.7;
  letter-spacing: 0.5px;
  margin: 10px 0;
}

.placeholder-tip {
  display: block;
  font-size: 10px;
  color: #6b7280;
  line-height: 1.4;
}

/* Footer styling */
.hud-footer {
  display: flex;
  justify-content: flex-start;
  gap: 32px;
  font-family: monospace;
  font-size: 11px;
  color: #4b5563;
  border-top: 1px solid rgba(0, 207, 255, 0.1);
  padding-top: 12px;
  background: linear-gradient(0deg, rgba(8, 8, 16, 0.8) 0%, rgba(8, 8, 16, 0) 100%);
}

.highlight {
  color: #00cfff;
  font-weight: bold;
}

/* Minimization sliding transitions */
.hud-section {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.controls-panel.minimized {
  transform: translateX(-360px);
  opacity: 0;
  pointer-events: none;
}

.inspector-panel.minimized {
  transform: translateX(360px);
  opacity: 0;
  pointer-events: none;
}

/* Holographic toggle button */
.hud-toggle-btn {
  background: rgba(0, 207, 255, 0.05);
  border: 1px solid rgba(0, 207, 255, 0.4);
  color: #00cfff;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  box-shadow: 0 0 8px rgba(0, 207, 255, 0.1);
}

.hud-toggle-btn:hover {
  background: rgba(0, 207, 255, 0.2);
  border-color: #00cfff;
  color: #fff;
  box-shadow: 0 0 12px rgba(0, 207, 255, 0.3);
}
</style>
