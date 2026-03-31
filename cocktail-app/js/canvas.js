// Canvas 绘制模块

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

  // 杯口椭圆（透视效果）
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

  // 填充液体
  const liquidGrad = ctx.createLinearGradient(x, y - h/4, x, y + h/2)
  liquidGrad.addColorStop(0, lightenColor(liquidColor, 30))
  liquidGrad.addColorStop(0.5, liquidColor)
  liquidGrad.addColorStop(1, darkenColor(liquidColor, 20))
  ctx.fillStyle = liquidGrad
  ctx.fill()

  // 液体表面椭圆（透视效果）
  ctx.beginPath()
  ctx.ellipse(x, y - h/4, w/2.5, 8, 0, 0, Math.PI * 2)
  const surfaceGrad = ctx.createRadialGradient(x - 5, y - h/4 - 2, 2, x, y - h/4, w/2.5)
  surfaceGrad.addColorStop(0, lightenColor(liquidColor, 50))
  surfaceGrad.addColorStop(1, lightenColor(liquidColor, 30))
  ctx.fillStyle = surfaceGrad
  ctx.fill()

  // 杯子轮廓
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

  // 杯脚和杯底
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

  // 玻璃高光效果 - 左侧
  ctx.beginPath()
  ctx.moveTo(x - w/3, y - h/4)
  ctx.quadraticCurveTo(x - w/4, y, x - w/3, y + h/3)
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'
  ctx.lineWidth = 6
  ctx.stroke()

  // 玻璃高光效果 - 右侧小高光
  ctx.beginPath()
  ctx.moveTo(x + w/4, y - h/6)
  ctx.quadraticCurveTo(x + w/5, y + h/6, x + w/4, y + h/4)
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.lineWidth = 4
  ctx.stroke()

  // 杯口反光
  ctx.beginPath()
  ctx.ellipse(x, y - h/2 + 10, w/2 - 5, 4, 0, Math.PI, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255,255,255,0.3)'
  ctx.lineWidth = 1
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

    // 冰块主体
    ctx.beginPath()
    ctx.rect(-size/2, -size/2, size, size)
    const iceGrad = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2)
    iceGrad.addColorStop(0, 'rgba(255,255,255,0.4)')
    iceGrad.addColorStop(0.5, 'rgba(255,255,255,0.2)')
    iceGrad.addColorStop(1, 'rgba(255,255,255,0.3)')
    ctx.fillStyle = iceGrad
    ctx.fill()

    // 边框
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'
    ctx.lineWidth = 1
    ctx.stroke()

    // 高光
    ctx.beginPath()
    ctx.moveTo(-size/3, -size/3)
    ctx.lineTo(-size/6, -size/3)
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.restore()
  })

  ctx.restore()
}

const drawDecoration = (ctx, type, x, y, scale = 1) => {
  ctx.save()

  switch(type) {
    case 'lime':
      // 青柠片 - 带纹理和果肉
      ctx.beginPath()
      ctx.arc(x, y, 14 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#90EE90'
      ctx.fill()
      ctx.strokeStyle = '#228B22'
      ctx.lineWidth = 1.5
      ctx.stroke()
      // 内圈
      ctx.beginPath()
      ctx.arc(x, y, 10 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#98FB98'
      ctx.fill()
      ctx.strokeStyle = '#32CD32'
      ctx.lineWidth = 1
      ctx.stroke()
      // 果肉分隔线
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * 9 * scale, y + Math.sin(angle) * 9 * scale)
        ctx.strokeStyle = '#32CD32'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      // 中心点
      ctx.beginPath()
      ctx.arc(x, y, 2 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFFACD'
      ctx.fill()
      break

    case 'lemon':
      // 柠檬片 - 带籽和纹理
      ctx.beginPath()
      ctx.arc(x, y, 14 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFE135'
      ctx.fill()
      ctx.strokeStyle = '#DAA520'
      ctx.lineWidth = 1.5
      ctx.stroke()
      // 内圈
      ctx.beginPath()
      ctx.arc(x, y, 10 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFF44F'
      ctx.fill()
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 1
      ctx.stroke()
      // 果肉分隔线
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * 9 * scale, y + Math.sin(angle) * 9 * scale)
        ctx.strokeStyle = '#FFD700'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      // 柠檬籽
      ctx.fillStyle = '#DAA520'
      ctx.beginPath()
      ctx.ellipse(x - 3 * scale, y - 2 * scale, 2 * scale, 3 * scale, 0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(x + 4 * scale, y + 3 * scale, 1.5 * scale, 2.5 * scale, -0.2, 0, Math.PI * 2)
      ctx.fill()
      // 中心点
      ctx.beginPath()
      ctx.arc(x, y, 2 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFFACD'
      ctx.fill()
      break

    case 'orange':
      // 橙片 - 带果肉纹理
      ctx.beginPath()
      ctx.arc(x, y, 16 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFA500'
      ctx.fill()
      ctx.strokeStyle = '#FF8C00'
      ctx.lineWidth = 1.5
      ctx.stroke()
      // 白皮层
      ctx.beginPath()
      ctx.arc(x, y, 12 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFD700'
      ctx.fill()
      ctx.strokeStyle = '#FFB347'
      ctx.lineWidth = 1
      ctx.stroke()
      // 果肉分隔线
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * 11 * scale, y + Math.sin(angle) * 11 * scale)
        ctx.strokeStyle = '#FF8C00'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      // 中心点
      ctx.beginPath()
      ctx.arc(x, y, 2.5 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFE4B5'
      ctx.fill()
      break

    case 'mint':
      // 薄荷叶 - 更真实的叶子形状
      for (let i = 0; i < 3; i++) {
        const angle = (i - 1) * 0.6
        const mx = x + Math.sin(angle) * 8
        const my = y + Math.cos(angle) * 8
        ctx.save()
        ctx.translate(mx, my)
        ctx.rotate(angle)
        // 叶子形状
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
        // 叶脉
        ctx.beginPath()
        ctx.moveTo(0, -6 * scale)
        ctx.lineTo(0, 6 * scale)
        ctx.strokeStyle = '#006400'
        ctx.lineWidth = 0.8
        ctx.stroke()
        // 侧脉
        for (let j = -1; j <= 1; j += 2) {
          ctx.beginPath()
          ctx.moveTo(0, j * 2 * scale)
          ctx.lineTo(j * 4 * scale, j * 4 * scale)
          ctx.stroke()
        }
        ctx.restore()
      }
      break

    case 'cherry':
      // 樱桃 - 更立体
      ctx.beginPath()
      ctx.arc(x, y, 10 * scale, 0, Math.PI * 2)
      const cherryGrad = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, 10)
      cherryGrad.addColorStop(0, '#FF1744')
      cherryGrad.addColorStop(0.7, '#DC143C')
      cherryGrad.addColorStop(1, '#8B0000')
      ctx.fillStyle = cherryGrad
      ctx.fill()
      // 高光
      ctx.beginPath()
      ctx.arc(x - 3, y - 3, 3 * scale, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.fill()
      // 梗
      ctx.beginPath()
      ctx.moveTo(x, y - 8 * scale)
      ctx.quadraticCurveTo(x + 5 * scale, y - 15 * scale, x + 3 * scale, y - 18 * scale)
      ctx.strokeStyle = '#228B22'
      ctx.lineWidth = 2
      ctx.stroke()
      // 小叶
      ctx.beginPath()
      ctx.ellipse(x + 4 * scale, y - 16 * scale, 3 * scale, 1.5 * scale, 0.5, 0, Math.PI * 2)
      ctx.fillStyle = '#228B22'
      ctx.fill()
      break

    case 'pineapple':
      // 菠萝块 - 带纹理
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
      // 纹理
      ctx.strokeStyle = '#DAA520'
      ctx.lineWidth = 0.8
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath()
        ctx.moveTo(x + i * 6 * scale, y - 10 * scale)
        ctx.lineTo(x + i * 6 * scale, y + 10 * scale)
        ctx.stroke()
      }
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath()
        ctx.moveTo(x - 14 * scale, y + i * 6 * scale)
        ctx.lineTo(x + 14 * scale, y + i * 6 * scale)
        ctx.stroke()
      }
      // 边缘
      ctx.beginPath()
      ctx.ellipse(x, y, 16 * scale, 12 * scale, 0, 0, Math.PI * 2)
      ctx.fillStyle = '#8B4513'
      ctx.lineWidth = 2
      ctx.stroke()
      break

    case 'coffee':
      // 咖啡豆 - 更真实
      ctx.beginPath()
      ctx.ellipse(x, y, 8 * scale, 5 * scale, 0.3, 0, Math.PI * 2)
      const coffeeGrad = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, 8)
      coffeeGrad.addColorStop(0, '#6B4423')
      coffeeGrad.addColorStop(1, '#3E2723')
      ctx.fillStyle = coffeeGrad
      ctx.fill()
      // 中间裂缝
      ctx.beginPath()
      ctx.moveTo(x - 5 * scale, y)
      ctx.quadraticCurveTo(x, y - 2 * scale, x + 5 * scale, y)
      ctx.strokeStyle = '#2D1810'
      ctx.lineWidth = 1.5
      ctx.stroke()
      // 高光
      ctx.beginPath()
      ctx.arc(x - 2 * scale, y - 2 * scale, 2 * scale, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.2)'
      ctx.fill()
      break

    case 'cinnamon':
      // 肉桂棒 - 卷曲的树皮
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
      // 纹理
      ctx.strokeStyle = '#A0522D'
      ctx.lineWidth = 0.5
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(x - 2, y - 14 + i * 7)
        ctx.lineTo(x + 2, y - 14 + i * 7)
        ctx.stroke()
      }
      // 卷曲效果
      ctx.beginPath()
      ctx.arc(x + 3, y - 18, 3, 0, Math.PI * 2)
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 1
      ctx.stroke()
      break

    case 'grapefruit':
      // 西柚片 - 粉红色果肉
      ctx.beginPath()
      ctx.arc(x, y, 16 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FF6347'
      ctx.fill()
      ctx.strokeStyle = '#FF4500'
      ctx.lineWidth = 1.5
      ctx.stroke()
      // 白皮层
      ctx.beginPath()
      ctx.arc(x, y, 12 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FF7F50'
      ctx.fill()
      ctx.strokeStyle = '#FF6347'
      ctx.lineWidth = 1
      ctx.stroke()
      // 果肉分隔线
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * 11 * scale, y + Math.sin(angle) * 11 * scale)
        ctx.strokeStyle = '#FF4500'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      // 中心点
      ctx.beginPath()
      ctx.arc(x, y, 2.5 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFE4E1'
      ctx.fill()
      break

    case 'ginger':
      // 姜片 - 不规则形状
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
      // 纤维纹理
      ctx.strokeStyle = '#CD853F'
      ctx.lineWidth = 0.5
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath()
        ctx.moveTo(x - 8 * scale, y + i * 4 * scale)
        ctx.quadraticCurveTo(x, y + i * 4 * scale + 2, x + 8 * scale, y + i * 4 * scale)
        ctx.stroke()
      }
      // 边缘
      ctx.beginPath()
      ctx.ellipse(x, y, 12 * scale, 8 * scale, 0.2, 0, Math.PI * 2)
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 1.5
      ctx.stroke()
      break

    case 'peach':
      // 桃子片 - 粉红色渐变
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
      // 果核
      ctx.beginPath()
      ctx.ellipse(x - 2 * scale, y - 2 * scale, 5 * scale, 4 * scale, 0.3, 0, Math.PI * 2)
      ctx.fillStyle = '#D2691E'
      ctx.fill()
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 1
      ctx.stroke()
      // 高光
      ctx.beginPath()
      ctx.arc(x - 4 * scale, y - 4 * scale, 3 * scale, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.fill()
      break

    case 'blackberry':
      // 黑莓 - 颗粒状
      const positions = [
        {x: x, y: y - 6}, {x: x - 5, y: y - 2}, {x: x + 5, y: y - 2},
        {x: x - 7, y: y + 4}, {x: x, y: y + 4}, {x: x + 7, y: y + 4},
        {x: x - 3, y: y + 8}, {x: x + 3, y: y + 8}
      ]
      positions.forEach(pos => {
        ctx.beginPath()
        ctx.arc(pos.x * scale, pos.y * scale + y * (1 - scale), 4 * scale, 0, Math.PI * 2)
        const bbGrad = ctx.createRadialGradient(pos.x * scale - 1, pos.y * scale + y * (1 - scale) - 1, 0.5, pos.x * scale, pos.y * scale + y * (1 - scale), 4)
        bbGrad.addColorStop(0, '#6A0DAD')
        bbGrad.addColorStop(1, '#2D004D')
        ctx.fillStyle = bbGrad
        ctx.fill()
        // 高光
        ctx.beginPath()
        ctx.arc(pos.x * scale - 1, pos.y * scale + y * (1 - scale) - 1, 1.5 * scale, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.3)'
        ctx.fill()
      })
      break

    case 'salt':
      // 盐边 - 更自然的晶体效果
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

    // 气泡主体
    ctx.beginPath()
    ctx.arc(bx, by, size, 0, Math.PI * 2)
    const bubbleGrad = ctx.createRadialGradient(bx - size/3, by - size/3, 0, bx, by, size)
    bubbleGrad.addColorStop(0, 'rgba(255,255,255,0.6)')
    bubbleGrad.addColorStop(0.7, 'rgba(255,255,255,0.3)')
    bubbleGrad.addColorStop(1, 'rgba(255,255,255,0.1)')
    ctx.fillStyle = bubbleGrad
    ctx.fill()

    // 气泡边框
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.lineWidth = 0.5
    ctx.stroke()

    // 高光点
    ctx.beginPath()
    ctx.arc(bx - size/3, by - size/3, size/4, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.fill()
  }
  ctx.restore()
}

const drawStepIcon = (ctx, x, y, actionType) => {
  ctx.save()
  ctx.fillStyle = '#FFC107'
  ctx.strokeStyle = '#FFC107'
  ctx.lineWidth = 2

  switch (actionType) {
    case 'pour':
      // 倒酒图标 - 瓶子和液体流
      ctx.fillStyle = '#FFC107'
      ctx.strokeStyle = '#FFC107'
      ctx.lineWidth = 1.5
      // 瓶子主体
      ctx.beginPath()
      ctx.moveTo(x - 8, y - 10)
      ctx.lineTo(x - 6, y - 10)
      ctx.lineTo(x - 6, y - 18)
      ctx.lineTo(x - 4, y - 20)
      ctx.lineTo(x - 4, y - 24)
      ctx.lineTo(x + 4, y - 24)
      ctx.lineTo(x + 4, y - 20)
      ctx.lineTo(x + 6, y - 18)
      ctx.lineTo(x + 6, y - 10)
      ctx.lineTo(x + 8, y - 10)
      ctx.lineTo(x + 8, y + 8)
      ctx.quadraticCurveTo(x + 8, y + 12, x + 4, y + 12)
      ctx.lineTo(x - 4, y + 12)
      ctx.quadraticCurveTo(x - 8, y + 12, x - 8, y + 8)
      ctx.closePath()
      ctx.stroke()
      // 瓶口倾斜
      ctx.beginPath()
      ctx.moveTo(x + 4, y - 24)
      ctx.lineTo(x + 10, y - 18)
      ctx.lineTo(x + 8, y - 16)
      ctx.lineTo(x + 2, y - 22)
      ctx.closePath()
      ctx.stroke()
      // 液体流
      ctx.beginPath()
      ctx.moveTo(x + 9, y - 17)
      ctx.quadraticCurveTo(x + 10, y, x + 6, y + 14)
      ctx.strokeStyle = '#FFC107'
      ctx.lineWidth = 2
      ctx.stroke()
      // 液滴
      ctx.beginPath()
      ctx.arc(x + 6, y + 16, 2, 0, Math.PI * 2)
      ctx.fillStyle = '#FFC107'
      ctx.fill()
      break

    case 'shake':
      // 摇酒壶图标
      ctx.fillStyle = '#FFC107'
      ctx.strokeStyle = '#FFC107'
      ctx.lineWidth = 1.5
      // 摇酒壶主体
      ctx.beginPath()
      ctx.moveTo(x - 8, y - 12)
      ctx.lineTo(x - 6, y - 16)
      ctx.lineTo(x + 6, y - 16)
      ctx.lineTo(x + 8, y - 12)
      ctx.lineTo(x + 8, y + 8)
      ctx.quadraticCurveTo(x + 8, y + 14, x + 4, y + 14)
      ctx.lineTo(x - 4, y + 14)
      ctx.quadraticCurveTo(x - 8, y + 14, x - 8, y + 8)
      ctx.closePath()
      ctx.stroke()
      // 盖子
      ctx.beginPath()
      ctx.moveTo(x - 7, y - 16)
      ctx.lineTo(x - 5, y - 20)
      ctx.lineTo(x + 5, y - 20)
      ctx.lineTo(x + 7, y - 16)
      ctx.stroke()
      // 中间装饰线
      ctx.beginPath()
      ctx.moveTo(x - 7, y - 4)
      ctx.lineTo(x + 7, y - 4)
      ctx.stroke()
      // 摇动线条
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x - 14, y - 8)
      ctx.lineTo(x - 10, y - 4)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x - 14, y)
      ctx.lineTo(x - 10, y + 4)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x + 14, y - 8)
      ctx.lineTo(x + 10, y - 4)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x + 14, y)
      ctx.lineTo(x + 10, y + 4)
      ctx.stroke()
      break

    case 'stir':
      // 搅拌图标 - 杯子和搅拌棒
      ctx.fillStyle = '#FFC107'
      ctx.strokeStyle = '#FFC107'
      ctx.lineWidth = 1.5
      // 玻璃杯
      ctx.beginPath()
      ctx.moveTo(x - 10, y - 10)
      ctx.lineTo(x + 10, y - 10)
      ctx.lineTo(x + 8, y + 10)
      ctx.lineTo(x - 8, y + 10)
      ctx.closePath()
      ctx.stroke()
      // 搅拌棒
      ctx.beginPath()
      ctx.moveTo(x + 2, y - 16)
      ctx.lineTo(x - 4, y + 8)
      ctx.lineWidth = 2
      ctx.stroke()
      // 搅拌棒顶部
      ctx.beginPath()
      ctx.arc(x + 2, y - 18, 2, 0, Math.PI * 2)
      ctx.fillStyle = '#FFC107'
      ctx.fill()
      // 旋转箭头
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(x - 2, y, 6, -Math.PI * 0.8, Math.PI * 0.3)
      ctx.stroke()
      // 箭头头
      ctx.beginPath()
      ctx.moveTo(x + 3, y - 4)
      ctx.lineTo(x + 5, y - 2)
      ctx.lineTo(x + 1, y - 2)
      ctx.closePath()
      ctx.fillStyle = '#FFC107'
      ctx.fill()
      break

    case 'garnish':
      // 装饰图标 - 柠檬片和樱桃
      ctx.fillStyle = '#FFC107'
      ctx.strokeStyle = '#FFC107'
      ctx.lineWidth = 1.5
      // 柠檬片
      ctx.beginPath()
      ctx.arc(x - 6, y - 4, 8, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x - 6, y - 4, 5, 0, Math.PI * 2)
      ctx.stroke()
      // 柠檬籽
      ctx.beginPath()
      ctx.arc(x - 8, y - 4, 1, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x - 4, y - 4, 1, 0, Math.PI * 2)
      ctx.fill()
      // 樱桃
      ctx.beginPath()
      ctx.arc(x + 8, y + 2, 5, 0, Math.PI * 2)
      ctx.fill()
      // 樱桃梗
      ctx.beginPath()
      ctx.moveTo(x + 8, y - 3)
      ctx.quadraticCurveTo(x + 12, y - 10, x + 10, y - 12)
      ctx.lineWidth = 1.5
      ctx.stroke()
      // 薄荷叶
      ctx.beginPath()
      ctx.ellipse(x + 2, y + 10, 6, 3, 0.3, 0, Math.PI * 2)
      ctx.fillStyle = '#FFC107'
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x - 4, y + 10)
      ctx.lineTo(x + 8, y + 10)
      ctx.strokeStyle = '#212121'
      ctx.lineWidth = 0.5
      ctx.stroke()
      break

    default:
      // 默认图标 - 鸡尾酒杯
      ctx.fillStyle = '#FFC107'
      ctx.strokeStyle = '#FFC107'
      ctx.lineWidth = 1.5
      // 杯身
      ctx.beginPath()
      ctx.moveTo(x - 12, y - 8)
      ctx.lineTo(x + 12, y - 8)
      ctx.lineTo(x + 4, y + 8)
      ctx.lineTo(x - 4, y + 8)
      ctx.closePath()
      ctx.stroke()
      // 杯脚
      ctx.beginPath()
      ctx.moveTo(x, y + 8)
      ctx.lineTo(x, y + 16)
      ctx.lineWidth = 2
      ctx.stroke()
      // 杯底
      ctx.beginPath()
      ctx.moveTo(x - 6, y + 16)
      ctx.lineTo(x + 6, y + 16)
      ctx.lineWidth = 1.5
      ctx.stroke()
      // 橄榄
      ctx.beginPath()
      ctx.arc(x - 4, y - 2, 2, 0, Math.PI * 2)
      ctx.fillStyle = '#FFC107'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x + 4, y - 2, 2, 0, Math.PI * 2)
      ctx.fill()
      // 牙签
      ctx.beginPath()
      ctx.moveTo(x - 6, y - 4)
      ctx.lineTo(x + 6, y)
      ctx.strokeStyle = '#FFC107'
      ctx.lineWidth = 1
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
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 30 + 10,
      0, Math.PI * 2
    )
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
