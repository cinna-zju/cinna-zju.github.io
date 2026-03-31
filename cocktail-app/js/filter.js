// 筛选逻辑模块

const applyFilters = () => {
  filteredCocktails = allCocktails.filter(cocktail => {
    const matchesSearch = currentFilters.search === '' ||
      cocktail.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
      cocktail.nameEn.toLowerCase().includes(currentFilters.search.toLowerCase())

    const matchesSpirit = currentFilters.spirits.length === 0 ||
      currentFilters.spirits.includes(cocktail.baseSpirit)

    const matchesFlavor = currentFilters.flavors.length === 0 ||
      currentFilters.flavors.some(flavor => cocktail.flavor.includes(flavor))

    const matchesAlcohol = currentFilters.alcoholLevel === null ||
      (cocktail.alcoholContent >= currentFilters.alcoholLevel.min &&
       cocktail.alcoholContent < currentFilters.alcoholLevel.max)

    return matchesSearch && matchesSpirit && matchesFlavor && matchesAlcohol
  })

  renderCocktailList(filteredCocktails)
  updateCount(filteredCocktails.length)
  toggleEmptyState(filteredCocktails.length === 0)
}

const clearAllFilters = () => {
  currentFilters = {
    search: '',
    spirits: [],
    flavors: [],
    alcoholLevel: null
  }

  elements.searchInput.value = ''

  const spiritCheckboxes = elements.spiritFilters.querySelectorAll('input[type="checkbox"]')
  spiritCheckboxes.forEach(cb => {
    cb.checked = false
  })

  const flavorLabels = elements.flavorFilters.querySelectorAll('.filter-tag')
  flavorLabels.forEach(label => {
    label.classList.remove('active')
  })

  const alcoholButtons = elements.alcoholFilters.querySelectorAll('.filter-tag')
  alcoholButtons.forEach(btn => {
    btn.classList.remove('active')
  })

  applyFilters()
}
