// 世界地图模块

const COUNTRY_COORDS = {
  '美国': { x: 180, y: 120, label: '美国' },
  '墨西哥': { x: 150, y: 160, label: '墨西哥' },
  '古巴': { x: 200, y: 180, label: '古巴' },
  '波多黎各': { x: 220, y: 190, label: '波多黎各' },
  '巴西': { x: 280, y: 260, label: '巴西' },
  '秘鲁': { x: 230, y: 240, label: '秘鲁' },
  '牙买加': { x: 210, y: 185, label: '牙买加' },
  '百慕大': { x: 250, y: 140, label: '百慕大' },
  '哥伦比亚': { x: 240, y: 220, label: '哥伦比亚' },
  '智利': { x: 250, y: 300, label: '智利' },
  '阿根廷': { x: 270, y: 320, label: '阿根廷' },
  '玻利维亚': { x: 260, y: 280, label: '玻利维亚' },
  '英国': { x: 440, y: 80, label: '英国' },
  '法国': { x: 460, y: 100, label: '法国' },
  '意大利': { x: 480, y: 110, label: '意大利' },
  '德国': { x: 480, y: 80, label: '德国' },
  '爱尔兰': { x: 420, y: 80, label: '爱尔兰' },
  '西班牙': { x: 440, y: 120, label: '西班牙' },
  '瑞典': { x: 490, y: 50, label: '瑞典' },
  '俄罗斯': { x: 600, y: 60, label: '俄罗斯' },
  '日本': { x: 780, y: 120, label: '日本' },
  '新加坡': { x: 700, y: 220, label: '新加坡' },
  '澳大利亚': { x: 780, y: 320, label: '澳大利亚' },
  '南非': { x: 500, y: 300, label: '南非' },
  '印度': { x: 650, y: 180, label: '印度' },
  '马来西亚': { x: 720, y: 230, label: '马来西亚' },
  '特立尼达': { x: 240, y: 200, label: '特立尼达' },
  '加勒比': { x: 230, y: 190, label: '加勒比' },
  '摩洛哥': { x: 420, y: 140, label: '摩洛哥' },
  '泰国': { x: 710, y: 200, label: '泰国' }
}

let selectedCountry = null

const getCocktailsByOrigin = () => {
  const result = {}
  allCocktails.forEach(c => {
    if (c.origin && c.origin !== '未知') {
      if (!result[c.origin]) {
        result[c.origin] = []
      }
      result[c.origin].push(c)
    }
  })
  return result
}

const renderWorldMap = () => {
  const container = elements.worldmapContainer
  if (!container) return

  const cocktailsByOrigin = getCocktailsByOrigin()
  const countriesWithCocktails = Object.keys(cocktailsByOrigin)

  const svgWidth = 900
  const svgHeight = 400

  let svgContent = `<svg class="worldmap-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">`

  // Draw simplified world map paths for major regions
  svgContent += `
    <path class="country" data-country="美国" d="M120,80 L250,80 L280,120 L260,180 L200,200 L150,180 L100,140 Z" />
    <path class="country" data-country="加拿大" d="M120,40 L280,40 L260,80 L120,80 Z" />
    <path class="country" data-country="墨西哥" d="M150,180 L200,200 L180,240 L140,220 Z" />
    <path class="country" data-country="古巴" d="M200,190 L230,185 L225,200 L195,205 Z" />
    <path class="country" data-country="巴西" d="M260,240 L320,240 L310,300 L280,320 L250,280 Z" />
    <path class="country" data-country="秘鲁" d="M220,220 L260,220 L260,260 L230,270 Z" />
    <path class="country" data-country="阿根廷" d="M260,300 L290,300 L280,360 L250,350 Z" />
    <path class="country" data-country="哥伦比亚" d="M230,200 L260,200 L260,230 L230,230 Z" />
    <path class="country" data-country="智利" d="M250,280 L270,280 L260,340 L240,330 Z" />
    <path class="country" data-country="英国" d="M430,60 L460,60 L455,100 L435,100 Z" />
    <path class="country" data-country="法国" d="M450,90 L490,90 L485,130 L455,130 Z" />
    <path class="country" data-country="意大利" d="M470,100 L500,100 L490,140 L475,130 Z" />
    <path class="country" data-country="德国" d="M470,60 L510,60 L505,100 L475,100 Z" />
    <path class="country" data-country="西班牙" d="M430,120 L470,120 L465,150 L435,150 Z" />
    <path class="country" data-country="爱尔兰" d="M410,60 L430,60 L425,100 L415,100 Z" />
    <path class="country" data-country="俄罗斯" d="M520,30 L800,30 L780,100 L520,100 Z" />
    <path class="country" data-country="日本" d="M770,100 L790,100 L785,150 L775,150 Z" />
    <path class="country" data-country="新加坡" d="M690,210 L720,210 L715,230 L695,230 Z" />
    <path class="country" data-country="澳大利亚" d="M740,290 L830,290 L820,350 L750,350 Z" />
    <path class="country" data-country="印度" d="M630,160 L680,160 L670,220 L640,220 Z" />
    <path class="country" data-country="南非" d="M480,280 L530,280 L520,330 L490,330 Z" />
    <path class="country" data-country="摩洛哥" d="M420,140 L450,140 L445,160 L425,160 Z" />
    <path class="country" data-country="马来西亚" d="M700,220 L740,220 L735,240 L705,240 Z" />
    <path class="country" data-country="牙买加" d="M210,190 L225,188 L222,200 L208,202 Z" />
    <path class="country" data-country="波多黎各" d="M230,195 L245,192 L242,205 L228,208 Z" />
    <path class="country" data-country="百慕大" d="M260,140 L270,138 L268,148 L258,150 Z" />
    <path class="country" data-country="特立尼达" d="M240,205 L255,202 L252,215 L238,218 Z" />
    <path class="country" data-country="加勒比" d="M220,185 L250,180 L245,200 L215,205 Z" />
    <path class="country" data-country="玻利维亚" d="M250,260 L280,260 L275,290 L255,290 Z" />
    <path class="country" data-country="瑞典" d="M480,30 L500,30 L495,70 L485,70 Z" />
    <path class="country" data-country="泰国" d="M700,180 L730,180 L725,210 L705,210 Z" />
  `

  // Mark countries with cocktails
  countriesWithCocktails.forEach(country => {
    const paths = container.querySelectorAll(`[data-country="${country}"]`)
    // We'll handle this via JS after rendering
  })

  // Add country labels for countries with cocktails
  countriesWithCocktails.forEach(country => {
    const coords = COUNTRY_COORDS[country]
    if (coords) {
      svgContent += `<text x="${coords.x}" y="${coords.y - 5}" text-anchor="middle" fill="var(--gray-300)" font-size="8">${coords.label}</text>`
    }
  })

  svgContent += '</svg>'

  container.innerHTML = svgContent

  // Add legend
  const legendHtml = `
    <div class="worldmap-legend">
      <div class="worldmap-legend-item">
        <div class="worldmap-legend-color" style="background-color: var(--primary-500)"></div>
        <span>有鸡尾酒的国家</span>
      </div>
      <div class="worldmap-legend-item">
        <div class="worldmap-legend-color" style="background-color: var(--gray-700)"></div>
        <span>无鸡尾酒的国家</span>
      </div>
    </div>
  `
  container.insertAdjacentHTML('afterend', legendHtml)

  // Highlight countries with cocktails
  countriesWithCocktails.forEach(country => {
    const paths = container.querySelectorAll(`[data-country="${country}"]`)
    paths.forEach(path => path.classList.add('has-cocktails'))
  })
}

const renderCountryCocktails = (country) => {
  const resultsContainer = elements.worldmapResults
  if (!resultsContainer) return

  const cocktailsByOrigin = getCocktailsByOrigin()
  const cocktails = cocktailsByOrigin[country] || []

  if (cocktails.length === 0) {
    resultsContainer.classList.remove('visible')
    return
  }

  resultsContainer.classList.add('visible')

  const titleEl = document.createElement('h3')
  titleEl.className = 'worldmap-results-title'
  titleEl.textContent = `${country} - ${cocktails.length} 款鸡尾酒`

  const listEl = document.createElement('ul')
  listEl.className = 'worldmap-results-list'

  cocktails.forEach(cocktail => {
    const itemEl = document.createElement('li')
    itemEl.className = 'worldmap-result-item'
    itemEl.dataset.cocktailId = cocktail.id

    const imageEl = document.createElement('div')
    imageEl.className = 'worldmap-result-image'
    const img = document.createElement('img')
    img.src = `./images/cocktails/${cocktail.image}`
    img.alt = cocktail.name
    imageEl.appendChild(img)

    const infoEl = document.createElement('div')
    infoEl.className = 'worldmap-result-info'

    const nameEl = document.createElement('h4')
    nameEl.className = 'worldmap-result-name'
    nameEl.textContent = cocktail.name
    infoEl.appendChild(nameEl)

    const nameEnEl = document.createElement('p')
    nameEnEl.className = 'worldmap-result-name-en'
    nameEnEl.textContent = cocktail.nameEn
    infoEl.appendChild(nameEnEl)

    itemEl.appendChild(imageEl)
    itemEl.appendChild(infoEl)
    listEl.appendChild(itemEl)
  })

  resultsContainer.innerHTML = ''
  resultsContainer.appendChild(titleEl)
  resultsContainer.appendChild(listEl)
}

const openWorldMapModal = () => {
  elements.worldmapModal?.showModal()
  renderWorldMap()
  elements.worldmapResults.classList.remove('visible')
  elements.worldmapResults.innerHTML = ''
  selectedCountry = null
}

const closeWorldMapModal = () => {
  elements.worldmapModal?.close()
}

const handleCountryClick = (event) => {
  const countryEl = event.target.closest('.country')
  if (!countryEl) return

  const country = countryEl.dataset.country

  // Remove previous selection
  elements.worldmapContainer?.querySelectorAll('.country').forEach(el => {
    el.classList.remove('active')
  })

  if (selectedCountry === country) {
    selectedCountry = null
    elements.worldmapResults.classList.remove('visible')
    elements.worldmapResults.innerHTML = ''
    return
  }

  selectedCountry = country
  countryEl.classList.add('active')
  renderCountryCocktails(country)
}

const handleWorldMapResultClick = (event) => {
  const item = event.target.closest('.worldmap-result-item')
  if (!item) return

  const cocktailId = item.dataset.cocktailId
  const cocktail = allCocktails.find(c => c.id === cocktailId)
  if (cocktail) {
    closeWorldMapModal()
    showCocktailDetail(cocktail)
  }
}

const initWorldMap = () => {
  if (elements.worldmapContainer) {
    elements.worldmapContainer.addEventListener('click', handleCountryClick)
  }
  if (elements.worldmapResults) {
    elements.worldmapResults.addEventListener('click', handleWorldMapResultClick)
  }
}
