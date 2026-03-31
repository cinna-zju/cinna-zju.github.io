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

let animationState = {
  isPlaying: false,
  isAutoPlay: false,
  currentStep: 0,
  totalSteps: 0,
  animationFrame: null,
  cocktail: null,
  animationProgress: 0
}

const elements = {
  cocktailGrid: document.querySelector('#cocktail-grid'),
  cocktailCount: document.querySelector('#cocktail-count'),
  searchInput: document.querySelector('#search-input'),
  searchClear: document.querySelector('#search-clear'),
  filterToggle: document.querySelector('#filter-toggle'),
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
  animationCanvas: document.querySelector('#animation-canvas'),
  progressFill: document.querySelector('#progress-fill'),
  stepIndicator: document.querySelector('#step-indicator'),
  animPrev: document.querySelector('#anim-prev'),
  animPlay: document.querySelector('#anim-play'),
  animNext: document.querySelector('#anim-next'),
  playIcon: document.querySelector('#play-icon'),
  pauseIcon: document.querySelector('#pause-icon'),
  greetingText: document.querySelector('#greeting-text')
}
