// 我的吧台模块

const INGREDIENT_CATEGORIES = {
  '基酒': ['伏特加', '金酒', '白朗姆酒', '金朗姆酒', '深色朗姆酒', '波本威士忌', '黑麦威士忌', '苏格兰威士忌', '苏格兰调和威士忌', '龙舌兰酒', '龙舌兰酒（静置）', '干邑白兰地', '白兰地', '梅斯卡尔', '卡沙萨朗姆酒'],
  '利口酒': ['君度橙酒', '咖啡利口酒', '百利甜酒', '金巴利', '阿佩罗利口酒', '阿玛罗利口酒', '野格利口酒', '本尼迪克丁利口酒', '佩诺茴香酒', '接骨木花利口酒', 'Maraschino利口酒', '蓝橙利口酒', '橙利口酒', '橙皮利口酒', '黑加仑利口酒', '黑樱桃利口酒', '黑莓利口酒', '绿查特酒', '黄查特酒', '樱桃白兰地'],
  '果汁': ['鲜榨青柠汁', '鲜榨柠檬汁', '鲜榨橙汁', '鲜榨菠萝汁', '青柠汁', '柠檬汁', '橙汁', '菠萝汁', '蔓越莓汁', '西柚汁', '番茄汁', '白桃茸'],
  '糖浆与甜味': ['糖浆', '白砂糖', '方糖', '龙舌兰糖浆', '杏仁糖浆', '姜糖浆', '蜂蜜糖浆', '石榴糖浆'],
  '其他': ['苏打水', '干姜水', '可乐', '干味美思', '甜味美思', '香槟', '普罗赛克起泡酒', '勃艮第白葡萄酒', '椰浆', '淡奶油', '蛋清', '安格斯图拉苦精', '塔巴斯科辣酱', '辣酱油', '盐', '盐和胡椒', '青柠', '橙皮', '薄荷叶', '新鲜薄荷叶', '菠萝块', '现用意式浓缩咖啡', '能量饮料', '水']
}

let myBarIngredients = new Set()

const getAllIngredients = () => {
  const all = []
  for (const category of Object.values(INGREDIENT_CATEGORIES)) {
    all.push(...category)
  }
  return all
}

const matchCocktails = (selectedIngredients) => {
  if (selectedIngredients.size === 0) return []

  const results = []

  for (const cocktail of allCocktails) {
    const needed = cocktail.ingredients.map(i => i.name)
    const have = needed.filter(n => selectedIngredients.has(n))
    const missing = needed.filter(n => !selectedIngredients.has(n))

    if (have.length > 0) {
      const score = Math.round((have.length / needed.length) * 100)
      results.push({
        cocktail,
        score,
        have,
        missing
      })
    }
  }

  results.sort((a, b) => b.score - a.score)
  return results
}

const getScoreClass = (score) => {
  if (score === 100) return 'perfect'
  if (score >= 70) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

const renderMyBarIngredients = () => {
  const container = elements.myBarIngredients
  if (!container) return

  container.innerHTML = ''

  for (const [category, ingredients] of Object.entries(INGREDIENT_CATEGORIES)) {
    const categoryEl = document.createElement('div')
    categoryEl.className = 'my-bar-category'

    const titleEl = document.createElement('h4')
    titleEl.className = 'my-bar-category-title'
    titleEl.textContent = category
    categoryEl.appendChild(titleEl)

    const itemsEl = document.createElement('div')
    itemsEl.className = 'my-bar-category-items'

    for (const ingredient of ingredients) {
      const btn = document.createElement('button')
      btn.className = 'my-bar-ingredient-btn'
      btn.dataset.ingredient = ingredient
      btn.textContent = ingredient
      if (myBarIngredients.has(ingredient)) {
        btn.classList.add('selected')
      }
      itemsEl.appendChild(btn)
    }

    categoryEl.appendChild(itemsEl)
    container.appendChild(categoryEl)
  }
}

const renderMyBarResults = () => {
  const resultsContainer = elements.myBarResults
  if (!resultsContainer) return

  const results = matchCocktails(myBarIngredients)

  if (results.length === 0) {
    resultsContainer.classList.remove('visible')
    return
  }

  resultsContainer.classList.add('visible')

  const titleEl = document.createElement('h3')
  titleEl.className = 'my-bar-results-title'
  titleEl.textContent = `找到 ${results.length} 款可制作的鸡尾酒`

  const listEl = document.createElement('ul')
  listEl.className = 'my-bar-results-list'

  for (const result of results) {
    const { cocktail, score, missing } = result
    const itemEl = document.createElement('li')
    itemEl.className = 'my-bar-result-item'
    itemEl.dataset.cocktailId = cocktail.id

    const infoEl = document.createElement('div')
    infoEl.className = 'my-bar-result-info'

    const nameEl = document.createElement('span')
    nameEl.className = 'my-bar-result-name'
    nameEl.textContent = cocktail.name
    infoEl.appendChild(nameEl)

    const nameEnEl = document.createElement('span')
    nameEnEl.className = 'my-bar-result-name-en'
    nameEnEl.textContent = cocktail.nameEn
    infoEl.appendChild(nameEnEl)

    if (missing.length > 0) {
      const missingEl = document.createElement('div')
      missingEl.className = 'my-bar-result-missing'
      missingEl.innerHTML = `缺少: <span>${missing.join(', ')}</span>`
      infoEl.appendChild(missingEl)
    }

    const scoreEl = document.createElement('div')
    scoreEl.className = 'my-bar-result-score'

    const circleEl = document.createElement('div')
    circleEl.className = `my-bar-result-score-circle ${getScoreClass(score)}`
    circleEl.textContent = `${score}%`
    scoreEl.appendChild(circleEl)

    const labelEl = document.createElement('span')
    labelEl.className = 'my-bar-result-score-label'
    labelEl.textContent = score === 100 ? '完美' : '完成度'
    scoreEl.appendChild(labelEl)

    itemEl.appendChild(infoEl)
    itemEl.appendChild(scoreEl)
    listEl.appendChild(itemEl)
  }

  resultsContainer.innerHTML = ''
  resultsContainer.appendChild(titleEl)
  resultsContainer.appendChild(listEl)
}

const openMyBarModal = () => {
  elements.myBarModal?.showModal()
  renderMyBarIngredients()
  renderMyBarResults()
}

const closeMyBarModal = () => {
  elements.myBarModal?.close()
}

const handleMyBarIngredientToggle = (event) => {
  const btn = event.target.closest('.my-bar-ingredient-btn')
  if (!btn) return

  const ingredient = btn.dataset.ingredient
  btn.classList.toggle('selected')

  if (btn.classList.contains('selected')) {
    myBarIngredients.add(ingredient)
  } else {
    myBarIngredients.delete(ingredient)
  }

  renderMyBarResults()
}

const handleMyBarResultClick = (event) => {
  const item = event.target.closest('.my-bar-result-item')
  if (!item) return

  const cocktailId = item.dataset.cocktailId
  const cocktail = allCocktails.find(c => c.id === cocktailId)
  if (cocktail) {
    closeMyBarModal()
    showCocktailDetail(cocktail)
  }
}

const initMyBar = () => {
  if (elements.myBarIngredients) {
    elements.myBarIngredients.addEventListener('click', handleMyBarIngredientToggle)
  }
  if (elements.myBarResults) {
    elements.myBarResults.addEventListener('click', handleMyBarResultClick)
  }
}
