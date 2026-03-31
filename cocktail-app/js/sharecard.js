// 分享卡片生成器模块

let currentShareCocktail = null

const renderShareCard = (cocktail) => {
  currentShareCocktail = cocktail
  const canvas = elements.shareCanvas
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  // Background gradient
  const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
  bgGradient.addColorStop(0, '#1A1A2E')
  bgGradient.addColorStop(1, '#16213E')
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)

  // Decorative border
  ctx.strokeStyle = '#FFC107'
  ctx.lineWidth = 4
  ctx.strokeRect(20, 20, width - 40, height - 40)

  // Inner decorative line
  ctx.strokeStyle = 'rgba(255, 193, 7, 0.3)'
  ctx.lineWidth = 1
  ctx.strokeRect(30, 30, width - 60, height - 60)

  // Top decorative element
  ctx.fillStyle = '#FFC107'
  ctx.font = '24px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('✦  ✦  ✦', width / 2, 60)

  // Y's Bar branding
  ctx.fillStyle = '#FFC107'
  ctx.font = 'bold 28px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText("Y's Bar", width / 2, 100)

  // Cocktail image placeholder
  const imgX = width / 2 - 120
  const imgY = 130
  const imgWidth = 240
  const imgHeight = 240

  ctx.fillStyle = '#212121'
  ctx.fillRect(imgX, imgY, imgWidth, imgHeight)

  // Try to load and draw cocktail image
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const aspectRatio = img.width / img.height
    let drawWidth = imgWidth
    let drawHeight = imgWidth / aspectRatio
    let drawX = imgX
    let drawY = imgY

    if (drawHeight > imgHeight) {
      drawHeight = imgHeight
      drawWidth = imgHeight * aspectRatio
      drawX = imgX + (imgWidth - drawWidth) / 2
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
    renderCardText(ctx, cocktail, width, imgY + imgHeight + 30)
  }
  img.onerror = () => {
    // Draw placeholder if image fails to load
    ctx.fillStyle = '#4A4A4A'
    ctx.fillRect(imgX, imgY, imgWidth, imgHeight)
    ctx.fillStyle = '#9E9E9E'
    ctx.font = '16px -apple-system, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🍸', width / 2, imgY + imgHeight / 2 + 5)
    renderCardText(ctx, cocktail, width, imgY + imgHeight + 30)
  }
  img.src = `./images/cocktails/${cocktail.image}`
}

const renderCardText = (ctx, cocktail, width, startY) => {
  let y = startY

  // Cocktail name
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 36px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(cocktail.name, width / 2, y)
  y += 35

  // English name
  ctx.fillStyle = '#9E9E9E'
  ctx.font = '20px -apple-system, sans-serif'
  ctx.fillText(cocktail.nameEn, width / 2, y)
  y += 40

  // Divider
  ctx.strokeStyle = '#FFC107'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(width / 2 - 60, y)
  ctx.lineTo(width / 2 + 60, y)
  ctx.stroke()
  y += 30

  // Attributes
  ctx.font = '18px -apple-system, sans-serif'
  ctx.fillStyle = '#D4A574'
  const attrs = [
    `${cocktail.baseSpirit}`,
    `${cocktail.alcoholContent}%`,
    `${cocktail.difficulty}`,
    `${cocktail.glassType}`
  ]
  const attrWidth = width / attrs.length
  attrs.forEach((attr, i) => {
    ctx.textAlign = 'center'
    ctx.fillText(attr, attrWidth * i + attrWidth / 2, y)
  })
  y += 40

  // Flavors
  if (cocktail.flavor && cocktail.flavor.length > 0) {
    ctx.fillStyle = '#9E9E9E'
    ctx.font = '16px -apple-system, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(cocktail.flavor.join(' · '), width / 2, y)
    y += 30
  }

  // Divider
  ctx.strokeStyle = 'rgba(255, 193, 7, 0.3)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(width / 2 - 60, y)
  ctx.lineTo(width / 2 + 60, y)
  ctx.stroke()
  y += 30

  // Key ingredients
  ctx.fillStyle = '#D4A574'
  ctx.font = 'bold 18px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('主要原料', width / 2, y)
  y += 25

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '16px -apple-system, sans-serif'
  const ingredients = cocktail.ingredients.slice(0, 4)
  ingredients.forEach(ing => {
    ctx.fillText(`${ing.name} ${ing.amount}${ing.unit}`, width / 2, y)
    y += 22
  })

  // Bottom decorative element
  y += 20
  ctx.fillStyle = '#FFC107'
  ctx.font = '24px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('✦  ✦  ✦', width / 2, y)
  y += 30

  // Footer
  ctx.fillStyle = '#9E9E9E'
  ctx.font = '14px -apple-system, sans-serif'
  ctx.fillText("Y's Bar - 鸡尾酒百科", width / 2, y)
}

const openShareModal = (cocktail) => {
  elements.shareModal?.showModal()
  renderShareCard(cocktail)
}

const closeShareModal = () => {
  elements.shareModal?.close()
}

const downloadShareCard = () => {
  const canvas = elements.shareCanvas
  if (!canvas || !currentShareCocktail) return

  const link = document.createElement('a')
  link.download = `${currentShareCocktail.name}-share.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

const initShareCard = () => {
  if (elements.shareBtn) {
    elements.shareBtn.addEventListener('click', () => {
      if (currentDetailCocktail) {
        openShareModal(currentDetailCocktail)
      }
    })
  }
  if (elements.shareClose) {
    elements.shareClose.addEventListener('click', closeShareModal)
  }
  if (elements.shareModal) {
    elements.shareModal.addEventListener('click', (event) => {
      if (event.target === elements.shareModal) {
        closeShareModal()
      }
    })
  }
  if (elements.shareDownloadBtn) {
    elements.shareDownloadBtn.addEventListener('click', downloadShareCard)
  }
}
