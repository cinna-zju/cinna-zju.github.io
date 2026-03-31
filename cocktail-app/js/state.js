// 全局状态管理

let allCocktails = []
let filteredCocktails = []

let currentFilters = {
  search: '',
  spirits: [],
  flavors: [],
  alcoholLevel: null
}

let selectedAnimal = null
let selectedColor = null
let currentDetailCocktail = null

const elements = {
  cocktailGrid: document.querySelector('#cocktail-grid'),
  cocktailCount: document.querySelector('#cocktail-count'),
  searchInput: document.querySelector('#search-input'),
  searchClear: document.querySelector('#search-clear'),
  filterToggle: document.querySelector('#filter-toggle'),
  filterToggleMobile: document.querySelector('#filter-toggle-mobile'),
  filterPanel: document.querySelector('#filter-panel'),
  filterBody: document.querySelector('#filter-body'),
  filterClose: document.querySelector('#filter-close'),
  spiritFilters: document.querySelector('#base-spirit-filters'),
  flavorFilters: document.querySelector('#flavor-filters'),
  alcoholFilters: document.querySelector('#alcohol-filters'),
  filterClear: document.querySelector('#filter-clear'),
  emptyState: document.querySelector('#empty-state'),
  emptyClear: document.querySelector('#empty-clear'),
  modal: document.querySelector('#detail-modal'),
  detailClose: document.querySelector('#detail-close'),
  detailImg: document.querySelector('#detail-img'),
  detailName: document.querySelector('#detail-name'),
  detailNameEn: document.querySelector('#detail-name-en'),
  detailPopularity: document.querySelector('#detail-popularity'),
  detailSpirit: document.querySelector('#detail-spirit'),
  detailAlcohol: document.querySelector('#detail-alcohol'),
  detailDifficulty: document.querySelector('#detail-difficulty'),
  detailGlass: document.querySelector('#detail-glass'),
  detailFlavors: document.querySelector('#detail-flavors'),
  detailIngredients: document.querySelector('#detail-ingredients'),
  detailGarnish: document.querySelector('#detail-garnish'),
  detailSteps: document.querySelector('#detail-steps'),
  detailHistory: document.querySelector('#detail-history'),
  funRecommend: document.querySelector('#fun-recommend'),
  recommendModal: document.querySelector('#recommend-modal'),
  recommendClose: document.querySelector('#recommend-close'),
  animalGrid: document.querySelector('#animal-grid'),
  colorGrid: document.querySelector('#color-grid'),
  recommendBtn: document.querySelector('#recommend-btn'),
  recommendResult: document.querySelector('#recommend-result'),
  greetingText: document.querySelector('#greeting-text'),
  myBarBtn: document.querySelector('#my-bar-btn'),
  myBarModal: document.querySelector('#my-bar-modal'),
  myBarClose: document.querySelector('#my-bar-close'),
  myBarIngredients: document.querySelector('#my-bar-ingredients'),
  myBarResults: document.querySelector('#my-bar-results'),
  rouletteBtn: document.querySelector('#roulette-btn'),
  rouletteModal: document.querySelector('#roulette-modal'),
  rouletteClose: document.querySelector('#roulette-close'),
  rouletteCanvas: document.querySelector('#roulette-canvas'),
  rouletteSpinBtn: document.querySelector('#roulette-spin-btn'),
  rouletteResult: document.querySelector('#roulette-result'),
  worldmapBtn: document.querySelector('#worldmap-btn'),
  worldmapModal: document.querySelector('#worldmap-modal'),
  worldmapClose: document.querySelector('#worldmap-close'),
  worldmapContainer: document.querySelector('#worldmap-container'),
  worldmapResults: document.querySelector('#worldmap-results'),
  shareBtn: document.querySelector('#share-btn'),
  shareModal: document.querySelector('#share-modal'),
  shareClose: document.querySelector('#share-close'),
  shareCanvas: document.querySelector('#share-canvas'),
  shareDownloadBtn: document.querySelector('#share-download-btn')
}

const getClicks = () => {
  try {
    const data = localStorage.getItem(CLICK_STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

const saveClicks = (clicks) => {
  try {
    localStorage.setItem(CLICK_STORAGE_KEY, JSON.stringify(clicks))
  } catch (e) {
    console.warn('Failed to save click counts:', e)
  }
}

const getClickCount = (id) => {
  const clicks = getClicks()
  return clicks[id] || 0
}

const incrementClickCount = (id) => {
  const clicks = getClicks()
  clicks[id] = (clicks[id] || 0) + 1
  saveClicks(clicks)
  return clicks[id]
}

const getPopularityLevel = (count) => {
  return POPULARITY_LEVELS.find(level => count >= level.min && count <= level.max) || POPULARITY_LEVELS[0]
}

const on = (el, event, handler) => {
  if (el) el.addEventListener(event, handler)
}
