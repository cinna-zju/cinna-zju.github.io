// 鸡尾酒轮盘赌模块

const ROULETTE_COLORS = [
  '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6',
  '#1ABC9C', '#E67E22', '#00BCD4', '#8BC34A', '#FF5722',
  '#607D8B', '#795548', '#CDDC39', '#673AB7', '#009688',
  '#FF9800', '#4CAF50', '#2196F3', '#F44336', '#9C27B0'
]

let rouletteState = {
  isSpinning: false,
  currentAngle: 0,
  selectedCocktail: null,
  selectedIndex: -1,
  sliceCount: 12,
  sliceCocktails: []
}

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const getRandomCocktails = (count) => {
  return shuffle(allCocktails).slice(0, count)
}

const drawRouletteWheel = (angle = 0, highlightIndex = -1) => {
  const canvas = elements.rouletteCanvas
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const { width, height } = canvas
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(centerX, centerY) - 10

  ctx.clearRect(0, 0, width, height)

  const slices = rouletteState.sliceCocktails
  const sliceAngle = (2 * Math.PI) / slices.length

  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.rotate(angle)

  slices.forEach((cocktail, i) => {
    const startAngle = i * sliceAngle
    const endAngle = startAngle + sliceAngle

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, radius, startAngle, endAngle)
    ctx.closePath()

    if (i === highlightIndex) {
      ctx.fillStyle = '#FFD700'
    } else {
      ctx.fillStyle = ROULETTE_COLORS[i % ROULETTE_COLORS.length]
    }
    ctx.fill()

    ctx.strokeStyle = '#1A1A2E'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.save()
    ctx.rotate(startAngle + sliceAngle / 2)
    ctx.textAlign = 'right'
    ctx.fillStyle = i === highlightIndex ? '#1A1A2E' : '#FFFFFF'
    ctx.font = 'bold 12px -apple-system, sans-serif'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.shadowBlur = 4

    const text = cocktail.name
    const maxTextWidth = radius - 30
    let displayText = text
    if (ctx.measureText(text).width > maxTextWidth) {
      displayText = text.substring(0, 4) + '...'
    }
    ctx.fillText(displayText, radius - 15, 4)
    ctx.restore()
  })

  ctx.restore()

  ctx.beginPath()
  ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI)
  ctx.fillStyle = '#1A1A2E'
  ctx.fill()
  ctx.strokeStyle = '#FFC107'
  ctx.lineWidth = 3
  ctx.stroke()

  ctx.fillStyle = '#FFC107'
  ctx.font = 'bold 14px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Y\'s', centerX, centerY)
}

const spinWheel = () => {
  if (rouletteState.isSpinning) return
  if (rouletteState.sliceCocktails.length === 0) return

  rouletteState.isSpinning = true
  elements.rouletteSpinBtn.disabled = true
  elements.rouletteResult.classList.remove('visible')
  elements.rouletteResult.innerHTML = ''

  const n = rouletteState.sliceCount
  const sliceAngle = (2 * Math.PI) / n
  const winningIndex = Math.floor(Math.random() * n)

  const baseTarget = -Math.PI / 2 - winningIndex * sliceAngle - sliceAngle / 2
  const normalizedTarget = ((baseTarget % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
  const currentNorm = ((rouletteState.currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)

  let rotation = normalizedTarget - currentNorm
  if (rotation <= 0) rotation += 2 * Math.PI
  rotation += (5 + Math.random() * 3) * 2 * Math.PI

  const startAngle = rouletteState.currentAngle
  const duration = 4000 + Math.random() * 2000
  const startTime = performance.now()

  const easeOut = (t) => 1 - Math.pow(1 - t, 3)

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOut(progress)

    const currentAngle = startAngle + rotation * easedProgress
    rouletteState.currentAngle = currentAngle

    drawRouletteWheel(currentAngle)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      rouletteState.isSpinning = false
      elements.rouletteSpinBtn.disabled = false
      rouletteState.selectedIndex = winningIndex
      rouletteState.selectedCocktail = rouletteState.sliceCocktails[winningIndex]

      drawRouletteWheel(currentAngle, winningIndex)
      renderRouletteResult(rouletteState.selectedCocktail)
    }
  }

  requestAnimationFrame(animate)
}

const renderRouletteResult = (cocktail) => {
  const resultContainer = elements.rouletteResult
  if (!resultContainer) return

  resultContainer.classList.add('visible')

  const cardEl = document.createElement('div')
  cardEl.className = 'roulette-result-card'
  cardEl.dataset.cocktailId = cocktail.id

  const imageEl = document.createElement('div')
  imageEl.className = 'roulette-result-image'

  const placeholder = document.createElement('span')
  placeholder.className = 'placeholder'
  placeholder.textContent = '🍸'
  imageEl.appendChild(placeholder)

  const img = document.createElement('img')
  img.src = `./images/cocktails/${cocktail.image}`
  img.alt = cocktail.name
  img.onerror = () => {
    img.classList.add('hidden')
  }
  imageEl.appendChild(img)

  const infoEl = document.createElement('div')
  infoEl.className = 'roulette-result-info'

  const nameEl = document.createElement('h3')
  nameEl.className = 'roulette-result-name'
  nameEl.textContent = cocktail.name
  infoEl.appendChild(nameEl)

  const nameEnEl = document.createElement('p')
  nameEnEl.className = 'roulette-result-name-en'
  nameEnEl.textContent = cocktail.nameEn
  infoEl.appendChild(nameEnEl)

  const attrsEl = document.createElement('div')
  attrsEl.className = 'roulette-result-attrs'
  attrsEl.innerHTML = `
    <span class="roulette-result-attr">${cocktail.baseSpirit}</span>
    <span class="roulette-result-attr">${cocktail.alcoholContent}%</span>
    <span class="roulette-result-attr">${cocktail.difficulty}</span>
  `
  infoEl.appendChild(attrsEl)

  cardEl.appendChild(imageEl)
  cardEl.appendChild(infoEl)
  resultContainer.appendChild(cardEl)
}

const openRouletteModal = () => {
  elements.rouletteModal?.showModal()
  rouletteState.sliceCocktails = getRandomCocktails(rouletteState.sliceCount)
  rouletteState.currentAngle = 0
  rouletteState.selectedIndex = -1
  drawRouletteWheel(0)
  elements.rouletteResult.classList.remove('visible')
  elements.rouletteResult.innerHTML = ''
}

const closeRouletteModal = () => {
  elements.rouletteModal?.close()
}

const handleRouletteResultClick = (event) => {
  const card = event.target.closest('.roulette-result-card')
  if (!card) return

  const cocktailId = card.dataset.cocktailId
  const cocktail = allCocktails.find(c => c.id === cocktailId)
  if (cocktail) {
    closeRouletteModal()
    showCocktailDetail(cocktail)
  }
}

const initRoulette = () => {
  if (elements.rouletteSpinBtn) {
    elements.rouletteSpinBtn.addEventListener('click', spinWheel)
  }
  if (elements.rouletteResult) {
    elements.rouletteResult.addEventListener('click', handleRouletteResultClick)
  }
}
