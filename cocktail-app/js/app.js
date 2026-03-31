// 应用入口

const loadCocktails = async () => {
  try {
    const response = await fetch(COCKTAILS_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('加载鸡尾酒数据失败:', error)
    return []
  }
}

const initApp = async () => {
  allCocktails = await loadCocktails()
  filteredCocktails = [...allCocktails]

  renderCocktailList(filteredCocktails)
  updateCount(filteredCocktails.length)

  initEventListeners()

  setInterval(changeGreeting, 6000)
}

document.addEventListener('DOMContentLoaded', initApp)

window.clearAllFilters = clearAllFilters
