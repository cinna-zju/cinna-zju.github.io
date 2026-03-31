// DOM 渲染模块

const renderCocktailCard = (cocktail) => {
  const card = document.createElement('article')
  card.className = 'cocktail-card'
  card.dataset.id = cocktail.id

  const flavorsHTML = cocktail.flavor
    .slice(0, 3)
    .map(flavor => `<span class="flavor-tag">${flavor}</span>`)
    .join('')

  const placeholderUrl = generatePlaceholder(cocktail)

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
      <h3 class="cocktail-name">${cocktail.name}</h3>
      <div class="cocktail-meta">
        <span class="base-spirit">${cocktail.baseSpirit}</span>
        <span class="alcohol-content">${cocktail.alcoholContent}%</span>
      </div>
      <div class="flavor-tags">
        ${flavorsHTML}
      </div>
    </div>
  `

  card.addEventListener('click', () => showCocktailDetail(cocktail))
  return card
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

  initAnimationPlayer(cocktail)

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
