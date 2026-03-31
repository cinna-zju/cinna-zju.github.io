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
  elements.searchInput.addEventListener('input', handleSearch)

  if (elements.searchClear) {
    elements.searchClear.addEventListener('click', () => {
      elements.searchInput.value = ''
      currentFilters.search = ''
      applyFilters()
    })
  }

  if (elements.filterToggle) {
    elements.filterToggle.addEventListener('click', () => {
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        elements.filterPanel.classList.toggle('active')
        elements.filterToggleMobile?.classList.toggle('active', elements.filterPanel.classList.contains('active'))
      } else {
        elements.filterBody.classList.toggle('collapsed')
        elements.filterToggle.classList.toggle('collapsed')
      }
    })
  }

  if (elements.filterToggleMobile) {
    elements.filterToggleMobile.addEventListener('click', () => {
      elements.filterPanel.classList.toggle('active')
      elements.filterToggleMobile.classList.toggle('active', elements.filterPanel.classList.contains('active'))
    })
  }
  if (elements.filterClose) {
    elements.filterClose.addEventListener('click', () => {
      elements.filterPanel.classList.remove('active')
      elements.filterToggleMobile?.classList.remove('active')
    })
  }

  elements.spiritFilters.addEventListener('change', handleSpiritFilter)

  elements.flavorFilters.addEventListener('click', handleFlavorFilter)

  elements.alcoholFilters.addEventListener('click', handleAlcoholFilter)

  elements.filterClear.addEventListener('click', clearAllFilters)

  if (elements.emptyClear) {
    elements.emptyClear.addEventListener('click', clearAllFilters)
  }

  elements.detailClose.addEventListener('click', closeModal)
  elements.modal.addEventListener('click', (event) => {
    if (event.target === elements.modal) {
      closeModal()
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && elements.modal.open) {
      closeModal()
    }
  })

  if (elements.funRecommend) {
    elements.funRecommend.addEventListener('click', openRecommendModal)
  }

  if (elements.recommendClose) {
    elements.recommendClose.addEventListener('click', closeRecommendModal)
  }

  if (elements.recommendModal) {
    elements.recommendModal.addEventListener('click', (event) => {
      if (event.target === elements.recommendModal) {
        closeRecommendModal()
      }
    })
  }

  if (elements.animalGrid) {
    elements.animalGrid.addEventListener('click', handleAnimalSelect)
  }

  if (elements.colorGrid) {
    elements.colorGrid.addEventListener('click', handleColorSelect)
  }

  if (elements.recommendBtn) {
    elements.recommendBtn.addEventListener('click', handleRecommend)
  }

  if (elements.myBarBtn) {
    elements.myBarBtn.addEventListener('click', openMyBarModal)
  }
  if (elements.myBarClose) {
    elements.myBarClose.addEventListener('click', closeMyBarModal)
  }
  if (elements.myBarModal) {
    elements.myBarModal.addEventListener('click', (event) => {
      if (event.target === elements.myBarModal) {
        closeMyBarModal()
      }
    })
  }

  if (elements.rouletteBtn) {
    elements.rouletteBtn.addEventListener('click', openRouletteModal)
  }
  if (elements.rouletteClose) {
    elements.rouletteClose.addEventListener('click', closeRouletteModal)
  }
  if (elements.rouletteModal) {
    elements.rouletteModal.addEventListener('click', (event) => {
      if (event.target === elements.rouletteModal) {
        closeRouletteModal()
      }
    })
  }

  if (elements.worldmapBtn) {
    elements.worldmapBtn.addEventListener('click', openWorldMapModal)
  }
  if (elements.worldmapClose) {
    elements.worldmapClose.addEventListener('click', closeWorldMapModal)
  }
  if (elements.worldmapModal) {
    elements.worldmapModal.addEventListener('click', (event) => {
      if (event.target === elements.worldmapModal) {
        closeWorldMapModal()
      }
    })
  }

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
