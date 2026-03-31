// DOM 渲染模块

const lightenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.min(255, (num >> 16) + amt)
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt)
  const B = Math.min(255, (num & 0x0000FF) + amt)
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
}

const darkenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.max(0, (num >> 16) - amt)
  const G = Math.max(0, ((num >> 8) & 0x00FF) - amt)
  const B = Math.max(0, (num & 0x0000FF) - amt)
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
}

const drawGlass = (ctx, x, y, glassInfo, liquidColor) => {
  ctx.save()
  const w = glassInfo.width
  const h = glassInfo.height
  ctx.beginPath()
  ctx.ellipse(x, y - h/2 + 5, w/2, 6, 0, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.1)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.beginPath()
  switch(glassInfo.type) {
    case 'martini':
    case 'margarita':
      ctx.moveTo(x - w/2, y - h/2 + 10)
      ctx.lineTo(x + w/2, y - h/2 + 10)
      ctx.lineTo(x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.closePath()
      break
    case 'highball':
    case 'hurricane':
      ctx.moveTo(x - w/2 + 5, y - h/2)
      ctx.lineTo(x + w/2 - 5, y - h/2)
      ctx.quadraticCurveTo(x + w/2, y + h/2, x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.quadraticCurveTo(x - w/2, y + h/2, x - w/2 + 5, y - h/2)
      break
    case 'wine':
      ctx.moveTo(x - w/3, y - h/2 + 10)
      ctx.quadraticCurveTo(x - w/2, y - h/4, x - w/2 + 5, y)
      ctx.quadraticCurveTo(x - w/2 + 5, y + h/2, x - w/3, y + h/2)
      ctx.lineTo(x + w/3, y + h/2)
      ctx.quadraticCurveTo(x + w/2 - 5, y + h/2, x + w/2 - 5, y)
      ctx.quadraticCurveTo(x + w/2, y - h/4, x + w/3, y - h/2 + 10)
      break
    case 'copper':
      ctx.moveTo(x - w/2, y - h/2)
      ctx.lineTo(x + w/2, y - h/2)
      ctx.lineTo(x + w/2.5, y + h/2)
      ctx.lineTo(x - w/2.5, y + h/2)
      ctx.closePath()
      break
    case 'julep':
      ctx.moveTo(x - w/2 + 3, y - h/2)
      ctx.lineTo(x + w/2 - 3, y - h/2)
      ctx.quadraticCurveTo(x + w/2, y + h/2, x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.quadraticCurveTo(x - w/2, y + h/2, x - w/2 + 3, y - h/2)
      break
    case 'shot':
      ctx.moveTo(x - w/2, y - h/2 + 5)
      ctx.lineTo(x + w/2, y - h/2 + 5)
      ctx.lineTo(x + w/2.5, y + h/2)
      ctx.lineTo(x - w/2.5, y + h/2)
      ctx.closePath()
      break
    case 'rocks':
    default:
      ctx.moveTo(x - w/2 + 5, y - h/2 + 10)
      ctx.lineTo(x + w/2 - 5, y - h/2 + 10)
      ctx.quadraticCurveTo(x + w/2, y + h/2, x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.quadraticCurveTo(x - w/2, y + h/2, x - w/2 + 5, y - h/2 + 10)
      break
  }
  const liquidGrad = ctx.createLinearGradient(x, y - h/4, x, y + h/2)
  liquidGrad.addColorStop(0, lightenColor(liquidColor, 30))
  liquidGrad.addColorStop(0.5, liquidColor)
  liquidGrad.addColorStop(1, darkenColor(liquidColor, 20))
  ctx.fillStyle = liquidGrad
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(x, y - h/4, w/2.5, 8, 0, 0, Math.PI * 2)
  const surfaceGrad = ctx.createRadialGradient(x - 5, y - h/4 - 2, 2, x, y - h/4, w/2.5)
  surfaceGrad.addColorStop(0, lightenColor(liquidColor, 50))
  surfaceGrad.addColorStop(1, lightenColor(liquidColor, 30))
  ctx.fillStyle = surfaceGrad
  ctx.fill()
  ctx.beginPath()
  switch(glassInfo.type) {
    case 'martini':
    case 'margarita':
      ctx.moveTo(x - w/2, y - h/2 + 10)
      ctx.lineTo(x + w/2, y - h/2 + 10)
      ctx.lineTo(x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.closePath()
      break
    case 'highball':
    case 'hurricane':
      ctx.moveTo(x - w/2 + 5, y - h/2)
      ctx.lineTo(x + w/2 - 5, y - h/2)
      ctx.quadraticCurveTo(x + w/2, y + h/2, x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.quadraticCurveTo(x - w/2, y + h/2, x - w/2 + 5, y - h/2)
      break
    case 'wine':
      ctx.moveTo(x - w/3, y - h/2 + 10)
      ctx.quadraticCurveTo(x - w/2, y - h/4, x - w/2 + 5, y)
      ctx.quadraticCurveTo(x - w/2 + 5, y + h/2, x - w/3, y + h/2)
      ctx.lineTo(x + w/3, y + h/2)
      ctx.quadraticCurveTo(x + w/2 - 5, y + h/2, x + w/2 - 5, y)
      ctx.quadraticCurveTo(x + w/2, y - h/4, x + w/3, y - h/2 + 10)
      break
    case 'copper':
      ctx.moveTo(x - w/2, y - h/2)
      ctx.lineTo(x + w/2, y - h/2)
      ctx.lineTo(x + w/2.5, y + h/2)
      ctx.lineTo(x - w/2.5, y + h/2)
      ctx.closePath()
      break
    case 'julep':
      ctx.moveTo(x - w/2 + 3, y - h/2)
      ctx.lineTo(x + w/2 - 3, y - h/2)
      ctx.quadraticCurveTo(x + w/2, y + h/2, x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.quadraticCurveTo(x - w/2, y + h/2, x - w/2 + 3, y - h/2)
      break
    case 'shot':
      ctx.moveTo(x - w/2, y - h/2 + 5)
      ctx.lineTo(x + w/2, y - h/2 + 5)
      ctx.lineTo(x + w/2.5, y + h/2)
      ctx.lineTo(x - w/2.5, y + h/2)
      ctx.closePath()
      break
    case 'rocks':
    default:
      ctx.moveTo(x - w/2 + 5, y - h/2 + 10)
      ctx.lineTo(x + w/2 - 5, y - h/2 + 10)
      ctx.quadraticCurveTo(x + w/2, y + h/2, x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.quadraticCurveTo(x - w/2, y + h/2, x - w/2 + 5, y - h/2 + 10)
      break
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'
  ctx.lineWidth = 2
  ctx.stroke()
  if (['martini', 'margarita', 'champagne', 'wine'].includes(glassInfo.type)) {
    ctx.beginPath()
    ctx.moveTo(x, y + h/2)
    ctx.lineTo(x, y + h/2 + 25)
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(x, y + h/2 + 25, 18, 5, 0, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'
    ctx.lineWidth = 2
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.moveTo(x - w/3, y - h/4)
  ctx.quadraticCurveTo(x - w/4, y, x - w/3, y + h/3)
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'
  ctx.lineWidth = 6
  ctx.stroke()
  ctx.restore()
}

const drawIce = (ctx, x, y, size) => {
  ctx.save()
  const positions = [
    {x: x - 12, y: y - 8, rot: 0.2},
    {x: x + 6, y: y + 2, rot: -0.3},
    {x: x - 2, y: y + 10, rot: 0.5}
  ]
  positions.forEach(pos => {
    ctx.save()
    ctx.translate(pos.x, pos.y)
    ctx.rotate(pos.rot)
    ctx.beginPath()
    ctx.rect(-size/2, -size/2, size, size)
    const iceGrad = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2)
    iceGrad.addColorStop(0, 'rgba(255,255,255,0.4)')
    iceGrad.addColorStop(0.5, 'rgba(255,255,255,0.2)')
    iceGrad.addColorStop(1, 'rgba(255,255,255,0.3)')
    ctx.fillStyle = iceGrad
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.restore()
  })
  ctx.restore()
}

const drawDecoration = (ctx, type, x, y, scale = 1) => {
  ctx.save()
  switch(type) {
    case 'lime':
      ctx.beginPath()
      ctx.arc(x, y, 14 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#90EE90'
      ctx.fill()
      ctx.strokeStyle = '#228B22'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y, 10 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#98FB98'
      ctx.fill()
      ctx.strokeStyle = '#32CD32'
      ctx.lineWidth = 1
      ctx.stroke()
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * 9 * scale, y + Math.sin(angle) * 9 * scale)
        ctx.strokeStyle = '#32CD32'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(x, y, 2 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFFACD'
      ctx.fill()
      break
    case 'lemon':
      ctx.beginPath()
      ctx.arc(x, y, 14 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFE135'
      ctx.fill()
      ctx.strokeStyle = '#DAA520'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y, 10 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFF44F'
      ctx.fill()
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 1
      ctx.stroke()
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * 9 * scale, y + Math.sin(angle) * 9 * scale)
        ctx.strokeStyle = '#FFD700'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(x, y, 2 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFFACD'
      ctx.fill()
      break
    case 'orange':
      ctx.beginPath()
      ctx.arc(x, y, 16 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFA500'
      ctx.fill()
      ctx.strokeStyle = '#FF8C00'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y, 12 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFD700'
      ctx.fill()
      ctx.strokeStyle = '#FFB347'
      ctx.lineWidth = 1
      ctx.stroke()
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * 11 * scale, y + Math.sin(angle) * 11 * scale)
        ctx.strokeStyle = '#FF8C00'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(x, y, 2.5 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFE4B5'
      ctx.fill()
      break
    case 'mint':
      for (let i = 0; i < 3; i++) {
        const angle = (i - 1) * 0.6
        const mx = x + Math.sin(angle) * 8
        const my = y + Math.cos(angle) * 8
        ctx.save()
        ctx.translate(mx, my)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.moveTo(0, -8 * scale)
        ctx.quadraticCurveTo(6 * scale, -4 * scale, 6 * scale, 0)
        ctx.quadraticCurveTo(6 * scale, 4 * scale, 0, 8 * scale)
        ctx.quadraticCurveTo(-6 * scale, 4 * scale, -6 * scale, 0)
        ctx.quadraticCurveTo(-6 * scale, -4 * scale, 0, -8 * scale)
        ctx.fillStyle = '#228B22'
        ctx.fill()
        ctx.strokeStyle = '#006400'
        ctx.lineWidth = 0.5
        ctx.stroke()
        ctx.restore()
      }
      break
    case 'cherry':
      ctx.beginPath()
      ctx.arc(x, y, 10 * scale, 0, Math.PI * 2)
      const cherryGrad = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, 10)
      cherryGrad.addColorStop(0, '#FF1744')
      cherryGrad.addColorStop(0.7, '#DC143C')
      cherryGrad.addColorStop(1, '#8B0000')
      ctx.fillStyle = cherryGrad
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x - 3, y - 3, 3 * scale, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x, y - 8 * scale)
      ctx.quadraticCurveTo(x + 5 * scale, y - 15 * scale, x + 3 * scale, y - 18 * scale)
      ctx.strokeStyle = '#228B22'
      ctx.lineWidth = 2
      ctx.stroke()
      break
    case 'pineapple':
      ctx.beginPath()
      ctx.ellipse(x, y, 16 * scale, 12 * scale, 0, 0, Math.PI * 2)
      const pineGrad = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, 16)
      pineGrad.addColorStop(0, '#FFEB3B')
      pineGrad.addColorStop(1, '#FFD700')
      ctx.fillStyle = pineGrad
      ctx.fill()
      ctx.strokeStyle = '#DAA520'
      ctx.lineWidth = 1
      ctx.stroke()
      break
    case 'coffee':
      ctx.beginPath()
      ctx.ellipse(x, y, 8 * scale, 5 * scale, 0.3, 0, Math.PI * 2)
      const coffeeGrad = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, 8)
      coffeeGrad.addColorStop(0, '#6B4423')
      coffeeGrad.addColorStop(1, '#3E2723')
      ctx.fillStyle = coffeeGrad
      ctx.fill()
      break
    case 'cinnamon':
      ctx.beginPath()
      ctx.rect(x - 3, y - 18, 6, 36)
      const cinGrad = ctx.createLinearGradient(x - 3, y - 18, x + 3, y + 18)
      cinGrad.addColorStop(0, '#A0522D')
      cinGrad.addColorStop(0.5, '#8B4513')
      cinGrad.addColorStop(1, '#654321')
      ctx.fillStyle = cinGrad
      ctx.fill()
      ctx.strokeStyle = '#5D3A1A'
      ctx.lineWidth = 1
      ctx.stroke()
      break
    case 'grapefruit':
      ctx.beginPath()
      ctx.arc(x, y, 16 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FF6347'
      ctx.fill()
      ctx.strokeStyle = '#FF4500'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y, 12 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FF7F50'
      ctx.fill()
      ctx.strokeStyle = '#FF6347'
      ctx.lineWidth = 1
      ctx.stroke()
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * 11 * scale, y + Math.sin(angle) * 11 * scale)
        ctx.strokeStyle = '#FF4500'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(x, y, 2.5 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFE4E1'
      ctx.fill()
      break
    case 'ginger':
      ctx.beginPath()
      ctx.ellipse(x, y, 12 * scale, 8 * scale, 0.2, 0, Math.PI * 2)
      const ginGrad = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, 12)
      ginGrad.addColorStop(0, '#F5DEB3')
      ginGrad.addColorStop(1, '#DEB887')
      ctx.fillStyle = ginGrad
      ctx.fill()
      ctx.strokeStyle = '#D2691E'
      ctx.lineWidth = 1
      ctx.stroke()
      break
    case 'peach':
      ctx.beginPath()
      ctx.arc(x, y, 14 * scale, 0, Math.PI * 2)
      const peachGrad = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, 14)
      peachGrad.addColorStop(0, '#FFE4E1')
      peachGrad.addColorStop(0.5, '#FFDAB9')
      peachGrad.addColorStop(1, '#FFA07A')
      ctx.fillStyle = peachGrad
      ctx.fill()
      ctx.strokeStyle = '#FF8C69'
      ctx.lineWidth = 1
      ctx.stroke()
      break
    case 'blackberry':
      const bbPositions = [
        {x: x, y: y - 6}, {x: x - 5, y: y - 2}, {x: x + 5, y: y - 2},
        {x: x - 7, y: y + 4}, {x: x, y: y + 4}, {x: x + 7, y: y + 4},
        {x: x - 3, y: y + 8}, {x: x + 3, y: y + 8}
      ]
      bbPositions.forEach(pos => {
        ctx.beginPath()
        ctx.arc(pos.x * scale, pos.y * scale + y * (1 - scale), 4 * scale, 0, Math.PI * 2)
        const bbGrad = ctx.createRadialGradient(pos.x * scale - 1, pos.y * scale + y * (1 - scale) - 1, 0.5, pos.x * scale, pos.y * scale + y * (1 - scale), 4)
        bbGrad.addColorStop(0, '#6A0DAD')
        bbGrad.addColorStop(1, '#2D004D')
        ctx.fillStyle = bbGrad
        ctx.fill()
      })
      break
    case 'salt':
      ctx.fillStyle = '#FFFFFF'
      for (let i = 0; i < 12; i++) {
        const sx = x - 25 + i * 4.5
        const sy = y + Math.sin(i * 0.8) * 2
        const size = 1.5 + Math.random() * 1
        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.7 + Math.random() * 0.3})`
        ctx.fill()
      }
      break
  }
  ctx.restore()
}

const drawBubbles = (ctx, x, y, width, height) => {
  ctx.save()
  const bubbleCount = 8 + Math.floor(Math.random() * 6)
  for (let i = 0; i < bubbleCount; i++) {
    const bx = x - width/3 + Math.random() * (width * 0.6)
    const by = y + Math.random() * height * 0.4
    const size = 2 + Math.random() * 4
    ctx.beginPath()
    ctx.arc(bx, by, size, 0, Math.PI * 2)
    const bubbleGrad = ctx.createRadialGradient(bx - size/3, by - size/3, 0, bx, by, size)
    bubbleGrad.addColorStop(0, 'rgba(255,255,255,0.6)')
    bubbleGrad.addColorStop(0.7, 'rgba(255,255,255,0.3)')
    bubbleGrad.addColorStop(1, 'rgba(255,255,255,0.1)')
    ctx.fillStyle = bubbleGrad
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.lineWidth = 0.5
    ctx.stroke()
  }
  ctx.restore()
}

const getStepAction = (step) => {
  const text = step.toLowerCase()
  if (text.includes('倒入') || text.includes('加入') || text.includes('添加')) return 'pour'
  if (text.includes('摇晃') || text.includes('摇和')) return 'shake'
  if (text.includes('搅拌') || text.includes('搅匀')) return 'stir'
  if (text.includes('过滤') || text.includes('倒入杯中')) return 'pour'
  if (text.includes('装饰')) return 'garnish'
  return 'default'
}

const generatePlaceholder = (cocktail) => {
  const canvas = document.createElement('canvas')
  canvas.width = 400
  canvas.height = 250
  const ctx = canvas.getContext('2d')
  const bgColor = SPIRIT_COLORS[cocktail.baseSpirit] || '#4A4A4A'
  const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  bgGrad.addColorStop(0, darkenColor(bgColor, 30))
  bgGrad.addColorStop(1, lightenColor(bgColor, 20))
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.globalAlpha = 0.05
  for (let i = 0; i < 20; i++) {
    ctx.beginPath()
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 30 + 10, 0, Math.PI * 2)
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
  }
  ctx.restore()
  const glassInfo = GLASS_TYPES[cocktail.glassType] || GLASS_TYPES['古典杯']
  const liquidColor = bgColor
  const glassX = canvas.width / 2
  const glassY = canvas.height / 2 + 10
  if (!['shot', 'martini', 'margarita', 'champagne'].includes(glassInfo.type)) {
    drawIce(ctx, glassX - 5, glassY + 10, 12)
  }
  drawGlass(ctx, glassX, glassY, glassInfo, liquidColor)
  if (cocktail.flavor.includes('气泡')) {
    drawBubbles(ctx, glassX - glassInfo.width/3, glassY - 10, glassInfo.width, glassInfo.height/2)
  }
  if (cocktail.garnish && cocktail.garnish !== '无') {
    const garnishItems = cocktail.garnish.split('，').slice(0, 3)
    let decorX = glassX + glassInfo.width/2 + 20
    let decorY = glassY - 20
    garnishItems.forEach((item, index) => {
      const decorKey = Object.keys(DECORATIONS).find(k => item.includes(k))
      if (decorKey) {
        drawDecoration(ctx, DECORATIONS[decorKey].type, decorX, decorY, 0.8 - index * 0.1)
        decorX += 25
      }
    })
  }
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 18px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(0,0,0,0.5)'
  ctx.shadowBlur = 4
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2
  ctx.fillText(cocktail.name, canvas.width / 2, canvas.height - 35)
  ctx.font = '11px -apple-system, sans-serif'
  ctx.shadowBlur = 2
  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.fillText(cocktail.nameEn, canvas.width / 2, canvas.height - 18)
  return canvas.toDataURL('image/png')
}

const renderCocktailCard = (cocktail) => {
  const card = document.createElement('article')
  card.className = 'cocktail-card'
  card.dataset.id = cocktail.id

  const flavorsHTML = cocktail.flavor
    .slice(0, 3)
    .map(flavor => `<span class="flavor-tag">${flavor}</span>`)
    .join('')

  const placeholderUrl = generatePlaceholder(cocktail)

  const clickCount = getClickCount(cocktail.id)
  const popularity = getPopularityLevel(clickCount)

  card.innerHTML = `
    <div class="card-image">
      <img 
        src="./images/cocktails/${cocktail.image}" 
        alt="${cocktail.name}" 
        loading="lazy"
        onerror="this.onerror=null;this.src='${placeholderUrl}'"
      >
    </div>
    <div class="card-content">
      <div class="cocktail-name-row">
        <h3 class="cocktail-name">${cocktail.name}</h3>
        <span class="popularity" data-id="${cocktail.id}" style="--flame-color: ${popularity.color}">
          <svg class="popularity-flame" viewBox="0 0 24 24" fill="var(--flame-color)">
            <path d="M12 23c-3.866 0-7-3.134-7-7 0-3.127 2.504-5.834 4.5-7.5.37-.308.872-.308 1.242 0 .37.308.872.308 1.242 0C13.496 10.166 16 12.873 16 16c0 3.866-3.134 7-7 7zm0-18.5C8.5 7 5 10.5 5 14c0 2.761 2.239 5 5 5s5-2.239 5-5c0-3.5-3.5-7-3-9.5z"/>
            <path d="M12 20c-2.21 0-4-1.79-4-4 0-1.657 1.343-3.5 2.5-4.5.276-.24.676-.24.952 0C12.657 12.5 14 14.343 14 16c0 2.21-1.79 4-4 4z" opacity="0.6"/>
          </svg>
        </span>
      </div>
      <div class="cocktail-meta">
        <span class="base-spirit">${cocktail.baseSpirit}</span>
        <span class="alcohol-content">${cocktail.alcoholContent}%</span>
      </div>
      <div class="flavor-tags">
        ${flavorsHTML}
      </div>
    </div>
  `

  card.addEventListener('click', () => {
    const newCount = incrementClickCount(cocktail.id)
    updateCardPopularity(card, newCount)
    showCocktailDetail(cocktail)
  })
  return card
}

const updateCardPopularity = (card, count) => {
  const popularityEl = card.querySelector('.popularity')
  if (!popularityEl) return

  const popularity = getPopularityLevel(count)
  popularityEl.style.setProperty('--flame-color', popularity.color)
}

const renderCocktailList = (cocktails) => {
  elements.cocktailGrid.innerHTML = ''

  if (cocktails.length === 0) {
    elements.cocktailGrid.innerHTML = `
      <div class="no-results">
        <p>没有找到匹配的鸡尾酒</p>
        <button class="btn-secondary" onclick="clearAllFilters()">清除筛选条件</button>
      </div>
    `
    return
  }

  const fragment = document.createDocumentFragment()
  cocktails.forEach(cocktail => {
    fragment.appendChild(renderCocktailCard(cocktail))
  })
  elements.cocktailGrid.appendChild(fragment)
}

const updateCount = (count) => {
  if (elements.cocktailCount) {
    elements.cocktailCount.textContent = count
  }
}

const toggleEmptyState = (show) => {
  if (elements.emptyState) {
    elements.emptyState.classList.toggle('hidden', !show)
  }
  if (elements.cocktailGrid) {
    elements.cocktailGrid.classList.toggle('hidden', show)
  }
}

const showCocktailDetail = (cocktail) => {
  if (elements.detailImg) {
    const placeholderUrl = generatePlaceholder(cocktail)
    elements.detailImg.src = `./images/cocktails/${cocktail.image}`
    elements.detailImg.alt = cocktail.name
    elements.detailImg.onerror = function() {
      this.onerror = null
      this.src = placeholderUrl
    }
  }

  if (elements.detailName) {
    elements.detailName.textContent = cocktail.name
  }
  if (elements.detailNameEn) {
    elements.detailNameEn.textContent = cocktail.nameEn
  }

  if (elements.detailPopularity) {
    const clickCount = getClickCount(cocktail.id)
    const popularity = getPopularityLevel(clickCount)
    elements.detailPopularity.style.setProperty('--flame-color', popularity.color)
    elements.detailPopularity.querySelector('.detail-popularity-label').textContent = popularity.label
    elements.detailPopularity.querySelector('.detail-popularity-count').textContent = `${clickCount}次点击`
  }

  if (elements.detailSpirit) {
    elements.detailSpirit.textContent = cocktail.baseSpirit
  }
  if (elements.detailAlcohol) {
    elements.detailAlcohol.textContent = cocktail.alcoholContent
  }
  if (elements.detailDifficulty) {
    elements.detailDifficulty.textContent = cocktail.difficulty
  }
  if (elements.detailGlass) {
    elements.detailGlass.textContent = cocktail.glassType
  }

  if (elements.detailFlavors) {
    elements.detailFlavors.innerHTML = cocktail.flavor
      .map(flavor => `<span class="flavor-tag">${flavor}</span>`)
      .join('')
  }

  if (elements.detailIngredients) {
    elements.detailIngredients.innerHTML = cocktail.ingredients
      .map(ing => `<li>${ing.name} ${ing.amount}${ing.unit}</li>`)
      .join('')
  }

  if (elements.detailGarnish) {
    elements.detailGarnish.textContent = cocktail.garnish
  }

  if (elements.detailSteps) {
    elements.detailSteps.innerHTML = cocktail.preparation
      .map((step, index) => {
        const actionType = getStepAction(step)
        return `<li class="step-item" style="animation-delay: ${index * 0.1}s">
          <span class="step-icon step-${actionType}"></span>
          <span class="step-text">${step}</span>
        </li>`
      })
      .join('')
  }

  if (elements.detailHistory) {
    elements.detailHistory.textContent = cocktail.history
  }

  if (elements.modal.showModal) {
    elements.modal.showModal()
  } else {
    elements.modal.setAttribute('open', '')
  }
  document.body.style.overflow = 'hidden'

  currentDetailCocktail = cocktail

  requestAnimationFrame(() => {
    const content = document.querySelector('.detail-content')
    if (content) {
      content.scrollTop = 0
    }
  })
}

const closeModal = () => {
  if (elements.modal.close) {
    elements.modal.close()
  } else {
    elements.modal.removeAttribute('open')
  }
  document.body.style.overflow = ''
  currentDetailCocktail = null
}

const renderRecommendation = (cocktail) => {
  if (!cocktail) {
    elements.recommendResult.innerHTML = '<p class="caption">未找到匹配的鸡尾酒</p>'
    return
  }

  const animalTrait = ANIMAL_TRAITS[selectedAnimal]
  const colorTrait = COLOR_TRAITS[selectedColor]
  const placeholderUrl = generatePlaceholder(cocktail)

  elements.recommendResult.innerHTML = `
    <div class="recommend-result-card">
      <div class="recommend-result-image">
        <img 
          src="./images/cocktails/${cocktail.image}" 
          alt="${cocktail.name}"
          onerror="this.onerror=null;this.src='${placeholderUrl}'"
        >
      </div>
      <div class="recommend-result-info">
        <h3 class="recommend-result-name">${cocktail.name}</h3>
        <p class="recommend-result-name-en">${cocktail.nameEn}</p>
        <div class="recommend-result-meta">
          <span>${cocktail.baseSpirit}</span>
          <span>${cocktail.alcoholContent}%</span>
          <span>${cocktail.difficulty}</span>
        </div>
        <div class="recommend-result-flavors">
          ${cocktail.flavor.map(f => `<span class="flavor-tag">${f}</span>`).join('')}
        </div>
        <div class="recommend-reason">
          <p class="recommend-reason-title">为什么推荐这款？</p>
          <p>${animalTrait.reason}。${colorTrait.reason}，这款鸡尾酒的色彩与你的选择完美契合。</p>
        </div>
      </div>
    </div>
  `
}

const openRecommendModal = () => {
  selectedAnimal = null
  selectedColor = null
  elements.animalGrid.querySelectorAll('.animal-btn').forEach(b => b.classList.remove('selected'))
  elements.colorGrid.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'))
  elements.recommendBtn.disabled = true
  elements.recommendResult.innerHTML = ''

  if (elements.recommendModal.showModal) {
    elements.recommendModal.showModal()
  } else {
    elements.recommendModal.setAttribute('open', '')
  }
  document.body.style.overflow = 'hidden'
}

const closeRecommendModal = () => {
  if (elements.recommendModal.close) {
    elements.recommendModal.close()
  } else {
    elements.recommendModal.removeAttribute('open')
  }
  document.body.style.overflow = ''
}
