// 事件绑定模块

const handleSearch = (event) => {
  currentFilters.search = event.target.value.trim()
  applyFilters()
}

const handleSpiritFilter = (event) => {
  const checkbox = event.target
  if (checkbox.type !== 'checkbox') return

  const spirit = checkbox.value
  if (checkbox.checked) {
    currentFilters.spirits.push(spirit)
  } else {
    currentFilters.spirits = currentFilters.spirits.filter(s => s !== spirit)
  }
  applyFilters()
}

const handleFlavorFilter = (event) => {
  const button = event.target.closest('.filter-tag')
  if (!button) return

  button.classList.toggle('active')
  const flavor = button.dataset.flavor

  if (button.classList.contains('active')) {
    currentFilters.flavors.push(flavor)
  } else {
    currentFilters.flavors = currentFilters.flavors.filter(f => f !== flavor)
  }
  applyFilters()
}

const handleAlcoholFilter = (event) => {
  const button = event.target.closest('.filter-tag')
  if (!button || !button.dataset.level) return

  elements.alcoholFilters.querySelectorAll('.filter-tag').forEach(btn => {
    btn.classList.remove('active')
  })

  const levelLabel = button.dataset.level
  const level = ALCOHOL_LEVELS.find(l => l.label === levelLabel)

  if (currentFilters.alcoholLevel?.label === levelLabel) {
    currentFilters.alcoholLevel = null
    button.classList.remove('active')
  } else {
    currentFilters.alcoholLevel = level
    button.classList.add('active')
  }
  applyFilters()
}

const handleAnimalSelect = (event) => {
  const btn = event.target.closest('.animal-btn')
  if (!btn) return

  elements.animalGrid.querySelectorAll('.animal-btn').forEach(b => b.classList.remove('selected'))

  btn.classList.add('selected')
  selectedAnimal = btn.dataset.animal

  updateRecommendBtn()
}

const handleColorSelect = (event) => {
  const btn = event.target.closest('.color-btn')
  if (!btn) return

  elements.colorGrid.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'))

  btn.classList.add('selected')
  selectedColor = btn.dataset.color

  updateRecommendBtn()
}

const updateRecommendBtn = () => {
  elements.recommendBtn.disabled = !(selectedAnimal && selectedColor)
}

const handleRecommend = () => {
  const cocktail = getRecommendation()
  renderRecommendation(cocktail)
}

const initEventListeners = () => {
  on(elements.searchInput, 'input', handleSearch)

  on(elements.searchClear, 'click', () => {
    elements.searchInput.value = ''
    currentFilters.search = ''
    applyFilters()
  })

  on(elements.filterToggle, 'click', () => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      elements.filterPanel.classList.toggle('active')
      elements.filterToggleMobile?.classList.toggle('active', elements.filterPanel.classList.contains('active'))
    } else {
      elements.filterBody.classList.toggle('collapsed')
      elements.filterToggle.classList.toggle('collapsed')
    }
  })

  on(elements.filterToggleMobile, 'click', () => {
    elements.filterPanel.classList.toggle('active')
    elements.filterToggleMobile.classList.toggle('active', elements.filterPanel.classList.contains('active'))
  })

  on(elements.filterClose, 'click', () => {
    elements.filterPanel.classList.remove('active')
    elements.filterToggleMobile?.classList.remove('active')
  })

  on(elements.spiritFilters, 'change', handleSpiritFilter)
  on(elements.flavorFilters, 'click', handleFlavorFilter)
  on(elements.alcoholFilters, 'click', handleAlcoholFilter)
  on(elements.filterClear, 'click', clearAllFilters)
  on(elements.emptyClear, 'click', clearAllFilters)
  on(elements.detailClose, 'click', closeModal)

  on(elements.modal, 'click', (event) => {
    if (event.target === elements.modal) closeModal()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && elements.modal.open) closeModal()
  })

  on(elements.funRecommend, 'click', openRecommendModal)
  on(elements.recommendClose, 'click', closeRecommendModal)

  on(elements.recommendModal, 'click', (event) => {
    if (event.target === elements.recommendModal) closeRecommendModal()
  })

  on(elements.animalGrid, 'click', handleAnimalSelect)
  on(elements.colorGrid, 'click', handleColorSelect)
  on(elements.recommendBtn, 'click', handleRecommend)

  on(elements.myBarBtn, 'click', openMyBarModal)
  on(elements.myBarClose, 'click', closeMyBarModal)
  on(elements.myBarModal, 'click', (event) => {
    if (event.target === elements.myBarModal) closeMyBarModal()
  })

  on(elements.rouletteBtn, 'click', openRouletteModal)
  on(elements.rouletteClose, 'click', closeRouletteModal)
  on(elements.rouletteModal, 'click', (event) => {
    if (event.target === elements.rouletteModal) closeRouletteModal()
  })

  on(elements.worldmapBtn, 'click', openWorldMapModal)
  on(elements.worldmapClose, 'click', closeWorldMapModal)
  on(elements.worldmapModal, 'click', (event) => {
    if (event.target === elements.worldmapModal) closeWorldMapModal()
  })
}
