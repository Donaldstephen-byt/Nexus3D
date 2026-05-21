import * as THREE from 'three'

/**
 * Creates a CanvasTexture representing a code terminal window.
 */
export function createTerminalTexture(color = '#00cfff') {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 384
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = 'rgba(8, 8, 16, 0.9)'
  ctx.fillRect(0, 0, 512, 384)

  // Glow Border
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.strokeRect(2, 2, 508, 380)

  // Title Bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
  ctx.fillRect(4, 4, 504, 30)

  // Window Controls (Red, Yellow, Green dots)
  ctx.fillStyle = '#ff5f56'
  ctx.beginPath()
  ctx.arc(20, 19, 6, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#ffbd2e'
  ctx.beginPath()
  ctx.arc(38, 19, 6, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#27c93f'
  ctx.beginPath()
  ctx.arc(56, 19, 6, 0, Math.PI * 2)
  ctx.fill()

  // Console Text
  ctx.font = 'bold 14px monospace'
  ctx.fillStyle = '#fff'
  ctx.fillText('> npm run start', 20, 65)

  ctx.fillStyle = '#8b5cf6'
  ctx.fillText('system.init() - Loading Nexus core modules...', 20, 95)
  ctx.fillStyle = color
  ctx.fillText('● Left Cluster: Exploded Core [SYNCED]', 30, 125)
  ctx.fillText('● Center Cluster: Workspace Node [ACTIVE]', 30, 155)
  ctx.fillText('● Right Cluster: Neural Ledger [STANDBY]', 30, 185)

  ctx.fillStyle = '#10b981'
  ctx.fillText('SUCCESS: Pipeline connected at 12:44:09 MST', 20, 220)

  // Simulated code block lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
  ctx.fillRect(20, 250, 240, 8)
  ctx.fillRect(20, 265, 320, 8)
  ctx.fillRect(20, 280, 180, 8)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.fillText('LOGS COMPILING...', 20, 315)

  // Blinking terminal cursor
  ctx.fillStyle = color
  ctx.fillRect(160, 303, 10, 14)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Creates a CanvasTexture representing a browser application frame.
 */
export function createBrowserTexture(color = '#7b2fff') {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 384
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = 'rgba(10, 10, 25, 0.85)'
  ctx.fillRect(0, 0, 512, 384)

  // Glow Border
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.strokeRect(2, 2, 508, 380)

  // Title Bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.fillRect(4, 4, 504, 32)

  // Window Controls
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.beginPath()
  ctx.arc(20, 20, 5, 0, Math.PI * 2)
  ctx.arc(36, 20, 5, 0, Math.PI * 2)
  ctx.arc(52, 20, 5, 0, Math.PI * 2)
  ctx.fill()

  // Address Bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.fillRect(80, 10, 320, 20)
  ctx.font = '10px monospace'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('https://nexus-mesh.local/dashboard', 90, 24)

  // Mock layout grid wireframe
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 2
  
  // Left panel sidebar
  ctx.strokeRect(20, 56, 120, 300)
  
  // Main dashboard panel
  ctx.strokeRect(160, 56, 330, 180)
  
  // Bottom analytics boxes
  ctx.strokeRect(160, 256, 155, 100)
  ctx.strokeRect(335, 256, 155, 100)

  // Add layout mock graphs inside main panel
  ctx.strokeStyle = color
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(180, 180)
  ctx.lineTo(230, 120)
  ctx.lineTo(280, 150)
  ctx.lineTo(330, 90)
  ctx.lineTo(380, 160)
  ctx.lineTo(430, 110)
  ctx.lineTo(470, 140)
  ctx.stroke()

  ctx.fillStyle = color
  ctx.font = 'bold 12px monospace'
  ctx.fillText('ANALYTICS ENGINE', 180, 80)
  
  ctx.fillStyle = '#fff'
  ctx.fillText('CPU: 45%', 180, 285)
  ctx.fillText('MEM: 62%', 180, 305)

  ctx.fillStyle = '#00ff88'
  ctx.fillText('STATUS: OK', 350, 285)
  ctx.fillText('TPS: 1,490', 350, 305)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Creates a CanvasTexture representing specific technology/code icons.
 */
export function createIconTexture(iconType, color = '#00cfff') {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  // Glassmorphic translucent panel background
  const grad = ctx.createLinearGradient(0, 0, 256, 256)
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)')
  grad.addColorStop(1, 'rgba(255, 255, 255, 0.01)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 256, 256)

  // Neon glowing outer border
  ctx.strokeStyle = color
  ctx.lineWidth = 6
  ctx.shadowColor = color
  ctx.shadowBlur = 15
  ctx.strokeRect(3, 3, 250, 250)

  // Draw Specific Icon
  ctx.shadowBlur = 10
  ctx.lineWidth = 5
  ctx.strokeStyle = '#ffffff'
  ctx.fillStyle = '#ffffff'

  const cx = 128
  const cy = 128

  switch (iconType) {
    case 'git': {
      // Git branch fork representation
      ctx.beginPath()
      // Main trunk line
      ctx.moveTo(cx - 30, cy + 60)
      ctx.lineTo(cx - 30, cy - 60)
      ctx.stroke()
      
      // Fork branch line
      ctx.beginPath()
      ctx.arc(cx, cy, 30, Math.PI, Math.PI * 1.5, false)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cx, cy - 30)
      ctx.lineTo(cx + 30, cy - 30)
      ctx.stroke()

      // Trunk bottom node
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(cx - 30, cy + 60, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Trunk top node
      ctx.beginPath()
      ctx.arc(cx - 30, cy - 60, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Branch tip node
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(cx + 30, cy - 30, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      break
    }

    case 'python': {
      // Procedural python snake curves
      ctx.lineWidth = 4
      ctx.strokeStyle = color
      // Drawing loop 1
      ctx.beginPath()
      ctx.arc(cx - 15, cy - 15, 25, Math.PI * 0.5, Math.PI * 1.5)
      ctx.lineTo(cx + 15, cy - 40)
      ctx.arc(cx + 15, cy - 15, 25, Math.PI * 1.5, Math.PI * 2)
      ctx.stroke()

      // Drawing loop 2
      ctx.strokeStyle = '#fff'
      ctx.beginPath()
      ctx.arc(cx + 15, cy + 15, 25, Math.PI * 1.5, Math.PI * 0.5)
      ctx.lineTo(cx - 15, cy + 40)
      ctx.arc(cx - 15, cy + 15, 25, Math.PI * 0.5, Math.PI * 1.0)
      ctx.stroke()

      // Snake eyes
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(cx - 22, cy - 25, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(cx + 22, cy + 25, 4, 0, Math.PI * 2)
      ctx.fill()
      break
    }

    case 'cloud': {
      // Cloud silhouette
      ctx.beginPath()
      ctx.moveTo(cx - 50, cy + 30)
      ctx.arc(cx - 50, cy + 10, 20, Math.PI * 0.5, Math.PI * 1.5)
      ctx.arc(cx - 20, cy - 15, 30, Math.PI * 1.0, Math.PI * 2.0)
      ctx.arc(cx + 25, cy - 5, 25, Math.PI * 1.3, Math.PI * 0.1)
      ctx.arc(cx + 50, cy + 15, 18, Math.PI * 1.7, Math.PI * 0.5)
      ctx.closePath()
      ctx.stroke()
      break
    }

    case 'database': {
      // Three stacked database cylinders
      ctx.lineWidth = 4
      const drawCylinder = (y) => {
        ctx.beginPath()
        ctx.ellipse(cx, y, 50, 15, 0, 0, Math.PI * 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(cx - 50, y)
        ctx.lineTo(cx - 50, y + 25)
        ctx.ellipse(cx, y + 25, 50, 15, 0, 0, Math.PI)
        ctx.lineTo(cx + 50, y)
        ctx.stroke()
      }
      ctx.strokeStyle = color
      drawCylinder(cy - 45)
      ctx.strokeStyle = '#fff'
      drawCylinder(cy + 5)
      break
    }

    case 'cpp': {
      // C++ styled hexagon & icon logo
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const x = cx + 65 * Math.cos(angle)
        const y = cy + 65 * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = color
      ctx.stroke()

      // "C++" text
      ctx.font = 'bold 36px monospace'
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('C++', cx, cy)
      break
    }

    case 'brain': {
      // Neural / Brain Nodes
      ctx.strokeStyle = color
      ctx.beginPath()
      // Draw interconnected network nodes
      ctx.moveTo(cx - 40, cy - 20)
      ctx.lineTo(cx, cy - 40)
      ctx.lineTo(cx + 40, cy - 20)
      ctx.lineTo(cx + 20, cy + 30)
      ctx.lineTo(cx - 20, cy + 30)
      ctx.closePath()
      ctx.stroke()
      
      // Node cross lines
      ctx.beginPath()
      ctx.moveTo(cx - 40, cy - 20)
      ctx.lineTo(cx + 40, cy - 20)
      ctx.moveTo(cx, cy - 40)
      ctx.lineTo(cx - 20, cy + 30)
      ctx.moveTo(cx, cy - 40)
      ctx.lineTo(cx + 20, cy + 30)
      ctx.stroke()

      // Draw node dots
      ctx.fillStyle = '#fff'
      const nodes = [
        [cx - 40, cy - 20],
        [cx, cy - 40],
        [cx + 40, cy - 20],
        [cx + 20, cy + 30],
        [cx - 20, cy + 30]
      ]
      nodes.forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
      })
      break
    }

    case 'gears': {
      // Standard Gear representation
      ctx.strokeStyle = color
      ctx.beginPath()
      ctx.arc(cx, cy, 35, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(cx, cy, 12, 0, Math.PI * 2)
      ctx.stroke()

      // Teeth
      ctx.lineWidth = 8
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4
        ctx.beginPath()
        ctx.moveTo(cx + 32 * Math.cos(angle), cy + 32 * Math.sin(angle))
        ctx.lineTo(cx + 48 * Math.cos(angle), cy + 48 * Math.sin(angle))
        ctx.stroke()
      }
      break
    }

    case 'chart': {
      // Analytics trend icon
      ctx.lineWidth = 4
      ctx.strokeStyle = color
      // Axis lines
      ctx.beginPath()
      ctx.moveTo(cx - 60, cy - 50)
      ctx.lineTo(cx - 60, cy + 50)
      ctx.lineTo(cx + 60, cy + 50)
      ctx.stroke()

      // Trend line
      ctx.strokeStyle = '#fff'
      ctx.beginPath()
      ctx.moveTo(cx - 50, cy + 35)
      ctx.lineTo(cx - 20, cy + 10)
      ctx.lineTo(cx + 10, cy + 20)
      ctx.lineTo(cx + 45, cy - 35)
      ctx.stroke()

      // Dot markers
      ctx.fillStyle = color
      const pts = [
        [cx - 50, cy + 35],
        [cx - 20, cy + 10],
        [cx + 10, cy + 20],
        [cx + 45, cy - 35]
      ]
      pts.forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
      })
      break
    }

    default: {
      // Generic fallback geometric symbol
      ctx.strokeStyle = color
      ctx.strokeRect(64, 64, 128, 128)
      ctx.strokeStyle = '#fff'
      ctx.beginPath()
      ctx.moveTo(64, 64)
      ctx.lineTo(192, 192)
      ctx.moveTo(192, 64)
      ctx.lineTo(64, 192)
      ctx.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
