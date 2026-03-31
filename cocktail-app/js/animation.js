// 调酒动画播放器模块

const initAnimationPlayer = (cocktail) => {
  animationState.cocktail = cocktail
  animationState.currentStep = 0
  animationState.totalSteps = cocktail.preparation.length
  animationState.isPlaying = false
  animationState.isAutoPlay = false
  animationState.animationProgress = 0

  updateAnimationUI()
  drawAnimationFrame(0)
}

const updateAnimationUI = () => {
  const { currentStep, totalSteps, isPlaying } = animationState

  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0
  if (elements.progressFill) {
    elements.progressFill.style.width = `${progress}%`
  }

  if (elements.stepIndicator) {
    elements.stepIndicator.textContent = `步骤 ${currentStep}/${totalSteps}`
  }

  if (elements.animPrev) {
    elements.animPrev.disabled = currentStep <= 0
  }
  if (elements.animNext) {
    elements.animNext.disabled = currentStep >= totalSteps
  }

  if (elements.playIcon && elements.pauseIcon) {
    elements.playIcon.style.display = isPlaying ? 'none' : 'block'
    elements.pauseIcon.style.display = isPlaying ? 'block' : 'none'
  }

  if (elements.animPlay) {
    elements.animPlay.classList.toggle('playing', isPlaying)
  }
}

const drawAnimationFrame = (stepIndex) => {
  const canvas = elements.animationCanvas
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const { cocktail } = animationState
  if (!cocktail) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const glassInfo = GLASS_TYPES[cocktail.glassType] || GLASS_TYPES['古典杯']
  const liquidColor = SPIRIT_COLORS[cocktail.baseSpirit] || '#4A4A4A'

  const glassX = canvas.width / 2
  const glassY = canvas.height / 2 + 20

  drawCocktailStep(ctx, glassX, glassY, glassInfo, liquidColor, stepIndex, cocktail)
}

const drawCocktailStep = (ctx, x, y, glassInfo, liquidColor, stepIndex, cocktail) => {
  const steps = cocktail.preparation

  ctx.fillStyle = '#212121'
  ctx.fillRect(0, 0, 300, 250)

  drawGlass(ctx, x, y, glassInfo, liquidColor)

  if (stepIndex > 0) {
    const currentStepText = steps[stepIndex - 1] || ''
    const actionType = getStepAction(currentStepText)

    drawStepIcon(ctx, x, y - 80, actionType)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = '12px -apple-system, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const maxWidth = 260
    const words = currentStepText.split('')
    let line = ''
    let lineY = y + glassInfo.height / 2 + 30

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i]
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, x, lineY)
        line = words[i]
        lineY += 16
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, x, lineY)
  } else {
    ctx.fillStyle = '#9E9E9E'
    ctx.font = '14px -apple-system, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('点击播放开始调酒动画', x, y + glassInfo.height / 2 + 40)
  }
}

const playAnimationStep = async () => {
  if (!animationState.isPlaying) return

  const { currentStep, totalSteps, cocktail } = animationState

  if (currentStep >= totalSteps) {
    animationState.isPlaying = false
    animationState.isAutoPlay = false
    updateAnimationUI()
    return
  }

  const stepText = cocktail.preparation[currentStep]
  const actionType = getStepAction(stepText)
  const config = ANIMATION_CONFIG[actionType] || ANIMATION_CONFIG.default

  drawAnimationFrame(currentStep + 1)

  animationState.currentStep++
  updateAnimationUI()

  await new Promise(resolve => setTimeout(resolve, config.duration + 500))

  if (animationState.isAutoPlay && animationState.isPlaying) {
    playAnimationStep()
  } else {
    animationState.isPlaying = false
    updateAnimationUI()
  }
}

const startAutoPlay = () => {
  animationState.isAutoPlay = true
  animationState.isPlaying = true
  updateAnimationUI()
  playAnimationStep()
}

const pauseAnimation = () => {
  animationState.isPlaying = false
  animationState.isAutoPlay = false
  updateAnimationUI()
}

const nextStep = () => {
  if (animationState.currentStep < animationState.totalSteps) {
    animationState.isPlaying = true
    animationState.isAutoPlay = false
    updateAnimationUI()
    playAnimationStep()
  }
}

const prevStep = () => {
  if (animationState.currentStep > 0) {
    animationState.currentStep--
    drawAnimationFrame(animationState.currentStep)
    updateAnimationUI()
  }
}

const togglePlay = () => {
  if (animationState.isPlaying) {
    pauseAnimation()
  } else {
    if (animationState.currentStep >= animationState.totalSteps) {
      animationState.currentStep = 0
      drawAnimationFrame(0)
    }
    startAutoPlay()
  }
}
