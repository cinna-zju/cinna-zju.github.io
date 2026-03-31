// Canvas 绘图模块

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

const GLASS_STEM_TYPES = ['martini', 'margarita', 'champagne', 'wine']

const drawGlassPath = (ctx, x, y, w, h, type) => {
  switch(type) {
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
  drawGlassPath(ctx, x, y, w, h, glassInfo.type)
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
  drawGlassPath(ctx, x, y, w, h, glassInfo.type)
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'
  ctx.lineWidth = 2
  ctx.stroke()

  if (GLASS_STEM_TYPES.includes(glassInfo.type)) {
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

const drawCitrusSlice = (ctx, x, y, scale, outerR, innerR, outerColor, outerStroke, innerColor, innerStroke, segmentColor, segmentCount, centerColor) => {
  ctx.beginPath()
  ctx.arc(x, y, outerR * scale, 0, Math.PI * 2)
  ctx.fillStyle = outerColor
  ctx.fill()
  ctx.strokeStyle = outerStroke
  ctx.lineWidth = 1.5
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(x, y, innerR * scale, 0, Math.PI * 2)
  ctx.fillStyle = innerColor
  ctx.fill()
  ctx.strokeStyle = innerStroke
  ctx.lineWidth = 1
  ctx.stroke()

  for (let i = 0; i < segmentCount; i++) {
    const angle = (i / segmentCount) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + Math.cos(angle) * (innerR - 1) * scale, y + Math.sin(angle) * (innerR - 1) * scale)
    ctx.strokeStyle = segmentColor
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  ctx.beginPath()
  ctx.arc(x, y, 2 * scale, 0, Math.PI * 2)
  ctx.fillStyle = centerColor
  ctx.fill()
}

const drawDecoration = (ctx, type, x, y, scale = 1) => {
  ctx.save()
  switch(type) {
    case 'lime':
      drawCitrusSlice(ctx, x, y, scale, 14, 10, '#90EE90', '#228B22', '#98FB98', '#32CD32', '#32CD32', 8, '#FFFACD')
      break
    case 'lemon':
      drawCitrusSlice(ctx, x, y, scale, 14, 10, '#FFE135', '#DAA520', '#FFF44F', '#FFD700', '#FFD700', 10, '#FFFACD')
      break
    case 'orange':
      drawCitrusSlice(ctx, x, y, scale, 16, 12, '#FFA500', '#FF8C00', '#FFD700', '#FFB347', '#FF8C00', 10, '#FFE4B5')
      break
    case 'grapefruit':
      drawCitrusSlice(ctx, x, y, scale, 16, 12, '#FF6347', '#FF4500', '#FF7F50', '#FF6347', '#FF4500', 10, '#FFE4E1')
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
  const glassX = canvas.width / 2
  const glassY = canvas.height / 2 + 10

  if (!['shot', 'martini', 'margarita', 'champagne'].includes(glassInfo.type)) {
    drawIce(ctx, glassX - 5, glassY + 10, 12)
  }
  drawGlass(ctx, glassX, glassY, glassInfo, bgColor)

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
