// 鸡尾酒应用主逻辑

// 常量定义
const COCKTAILS_URL = './data/cocktails.json'
const BASE_SPIRITS = ['伏特加', '金酒', '朗姆酒', '威士忌', '龙舌兰', '白兰地', '利口酒']
const FLAVOR_TAGS = ['清爽', '果味', '甜味', '酸味', '苦味', '香料', '奶油']
const ALCOHOL_LEVELS = [
  { label: '低', min: 0, max: 15 },
  { label: '中', min: 15, max: 25 },
  { label: '高', min: 25, max: 100 }
]

// 基酒对应颜色（用于占位图）
const SPIRIT_COLORS = {
  '伏特加': '#B8C5D6',
  '金酒': '#8EC8D9',
  '朗姆酒': '#C4A98B',
  '威士忌': '#D4A052',
  '龙舌兰': '#A8C686',
  '白兰地': '#8B6544',
  '利口酒': '#D4849A',
  '香槟': '#E8D68B',
  '多重基酒': '#B8B8D6',
  '葡萄酒': '#E8D68B'
}

// 杯子类型定义
const GLASS_TYPES = {
  '玛格丽特杯': { type: 'margarita', width: 80, height: 90 },
  '马天尼杯': { type: 'martini', width: 85, height: 80 },
  '高球杯': { type: 'highball', width: 55, height: 130 },
  '古典杯': { type: 'rocks', width: 70, height: 80 },
  '飓风杯': { type: 'hurricane', width: 60, height: 140 },
  '香槟杯': { type: 'champagne', width: 50, height: 100 },
  '葡萄酒杯': { type: 'wine', width: 60, height: 90 },
  '铜杯': { type: 'copper', width: 65, height: 85 },
  '利口酒杯': { type: 'shot', width: 35, height: 50 },
  '岩石杯': { type: 'rocks', width: 70, height: 80 },
  '金属杯': { type: 'julep', width: 70, height: 75 }
}

// 装饰元素定义
const DECORATIONS = {
  '盐边': { type: 'salt', color: '#FFFFFF' },
  '糖边': { type: 'salt', color: '#FFFFFF' },
  '青柠角': { type: 'lime', color: '#90EE90' },
  '青柠片': { type: 'lime', color: '#90EE90' },
  '青柠皮': { type: 'lime', color: '#90EE90' },
  '柠檬片': { type: 'lemon', color: '#FFE135' },
  '柠檬皮': { type: 'lemon', color: '#FFE135' },
  '橙片': { type: 'orange', color: '#FFA500' },
  '橙皮': { type: 'orange', color: '#FFA500' },
  '薄荷枝': { type: 'mint', color: '#228B22' },
  '薄荷叶': { type: 'mint', color: '#228B22' },
  '樱桃': { type: 'cherry', color: '#DC143C' },
  '菠萝块': { type: 'pineapple', color: '#FFD700' },
  '菠萝角': { type: 'pineapple', color: '#FFD700' },
  '芹菜梗': { type: 'celery', color: '#228B22' },
  '咖啡豆': { type: 'coffee', color: '#4B3621' },
  '肉桂棒': { type: 'cinnamon', color: '#8B4513' },
  '西柚片': { type: 'grapefruit', color: '#FF6347' },
  '姜片': { type: 'ginger', color: '#DEB887' },
  '桃子片': { type: 'peach', color: '#FFDAB9' },
  '黑莓': { type: 'blackberry', color: '#4B0082' }
}

// 绘制卡通杯子轮廓
const drawGlass = (ctx, x, y, glassInfo, liquidColor) => {
  ctx.save()
  
  const w = glassInfo.width
  const h = glassInfo.height
  
  // 杯子主体
  ctx.beginPath()
  
  switch(glassInfo.type) {
    case 'martini':
    case 'margarita':
      // 锥形杯
      ctx.moveTo(x - w/2, y - h/2 + 20)
      ctx.lineTo(x + w/2, y - h/2 + 20)
      ctx.lineTo(x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.closePath()
      break
    case 'highball':
    case 'hurricane':
      // 长杯
      ctx.moveTo(x - w/2 + 5, y - h/2)
      ctx.lineTo(x + w/2 - 5, y - h/2)
      ctx.quadraticCurveTo(x + w/2, y + h/2, x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.quadraticCurveTo(x - w/2, y + h/2, x - w/2 + 5, y - h/2)
      break
    case 'wine':
      // 葡萄酒杯
      ctx.moveTo(x - w/3, y - h/2 + 10)
      ctx.quadraticCurveTo(x - w/2, y - h/4, x - w/2 + 5, y)
      ctx.quadraticCurveTo(x - w/2 + 5, y + h/2, x - w/3, y + h/2)
      ctx.lineTo(x + w/3, y + h/2)
      ctx.quadraticCurveTo(x + w/2 - 5, y + h/2, x + w/2 - 5, y)
      ctx.quadraticCurveTo(x + w/2, y - h/4, x + w/3, y - h/2 + 10)
      break
    case 'copper':
      // 铜杯（稍带锥形）
      ctx.moveTo(x - w/2, y - h/2)
      ctx.lineTo(x + w/2, y - h/2)
      ctx.lineTo(x + w/2.5, y + h/2)
      ctx.lineTo(x - w/2.5, y + h/2)
      ctx.closePath()
      break
    case 'julep':
      // 金属杯（厚壁）
      ctx.moveTo(x - w/2 + 3, y - h/2)
      ctx.lineTo(x + w/2 - 3, y - h/2)
      ctx.quadraticCurveTo(x + w/2, y + h/2, x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.quadraticCurveTo(x - w/2, y + h/2, x - w/2 + 3, y - h/2)
      break
    case 'shot':
      // 小杯
      ctx.moveTo(x - w/2, y - h/2 + 5)
      ctx.lineTo(x + w/2, y - h/2 + 5)
      ctx.lineTo(x + w/2.5, y + h/2)
      ctx.lineTo(x - w/2.5, y + h/2)
      ctx.closePath()
      break
    case 'rocks':
    default:
      // 古典杯/岩石杯
      ctx.moveTo(x - w/2 + 5, y - h/2 + 10)
      ctx.lineTo(x + w/2 - 5, y - h/2 + 10)
      ctx.quadraticCurveTo(x + w/2, y + h/2, x + w/3, y + h/2)
      ctx.lineTo(x - w/3, y + h/2)
      ctx.quadraticCurveTo(x - w/2, y + h/2, x - w/2 + 5, y - h/2 + 10)
      break
  }
  
  // 填充液体
  const liquidGrad = ctx.createLinearGradient(x, y - h/4, x, y + h/2)
  liquidGrad.addColorStop(0, lightenColor(liquidColor, 30))
  liquidGrad.addColorStop(0.5, liquidColor)
  liquidGrad.addColorStop(1, darkenColor(liquidColor, 20))
  ctx.fillStyle = liquidGrad
  ctx.fill()
  
  // 绘制液体表面
  ctx.beginPath()
  ctx.ellipse(x, y - h/4, w/2.5, 8, 0, 0, Math.PI * 2)
  ctx.fillStyle = lightenColor(liquidColor, 40)
  ctx.fill()
  
  // 杯子轮廓
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'
  ctx.lineWidth = 2
  ctx.stroke()
  
  // 杯脚（如果有）
  if (['martini', 'margarita', 'champagne', 'wine'].includes(glassInfo.type)) {
    ctx.beginPath()
    ctx.moveTo(x, y + h/2)
    ctx.lineTo(x, y + h/2 + 25)
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'
    ctx.lineWidth = 3
    ctx.stroke()
    
    // 杯底
    ctx.beginPath()
    ctx.ellipse(x, y + h/2 + 25, 15, 4, 0, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'
    ctx.lineWidth = 2
    ctx.stroke()
  }
  
  // 高光效果
  ctx.beginPath()
  ctx.moveTo(x - w/3, y - h/4)
  ctx.quadraticCurveTo(x - w/4, y, x - w/3, y + h/3)
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'
  ctx.lineWidth = 8
  ctx.stroke()
  
  ctx.restore()
}

// 绘制冰块
const drawIce = (ctx, x, y, size) => {
  ctx.save()
  ctx.fillStyle = 'rgba(255,255,255,0.3)'
  ctx.strokeStyle = 'rgba(255,255,255,0.5)'
  ctx.lineWidth = 1
  
  // 绘制不规则冰块
  const positions = [
    {x: x - 10, y: y - 5},
    {x: x + 8, y: y + 3},
    {x: x, y: y + 10}
  ]
  
  positions.forEach(pos => {
    ctx.beginPath()
    ctx.rect(pos.x, pos.y, size, size)
    ctx.fill()
    ctx.stroke()
  })
  
  ctx.restore()
}

// 绘制装饰
const drawDecoration = (ctx, type, x, y, scale = 1) => {
  ctx.save()
  
  switch(type) {
    case 'lime':
      // 青柠片
      ctx.beginPath()
      ctx.arc(x, y, 12 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#90EE90'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x - 3 * scale, y - 2 * scale, 3 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFFACD'
      ctx.fill()
      ctx.strokeStyle = '#228B22'
      ctx.lineWidth = 1
      ctx.stroke()
      break
      
    case 'lemon':
      // 柠檬片
      ctx.beginPath()
      ctx.arc(x, y, 12 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFE135'
      ctx.fill()
      // 柠檬籽
      ctx.fillStyle = '#DAA520'
      ctx.beginPath()
      ctx.ellipse(x - 2, y, 2, 3, 0.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#DAA520'
      ctx.lineWidth = 1
      ctx.stroke()
      break
      
    case 'orange':
      // 橙片
      ctx.beginPath()
      ctx.arc(x, y, 14 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFA500'
      ctx.fill()
      ctx.strokeStyle = '#FF8C00'
      ctx.lineWidth = 1
      ctx.stroke()
      break
      
    case 'mint':
      // 薄荷叶
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        const angle = (i - 1) * 0.5
        const mx = x + Math.sin(angle) * 5
        const my = y + Math.cos(angle) * 5
        ctx.ellipse(mx, my, 8 * scale, 5 * scale, angle, 0, Math.PI * 2)
        ctx.fillStyle = '#228B22'
        ctx.fill()
        // 叶脉
        ctx.beginPath()
        ctx.moveTo(mx - 6 * scale, my)
        ctx.lineTo(mx + 6 * scale, my)
        ctx.strokeStyle = '#006400'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      break
      
    case 'cherry':
      // 樱桃
      ctx.beginPath()
      ctx.arc(x, y, 10 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#DC143C'
      ctx.fill()
      // 高光
      ctx.beginPath()
      ctx.arc(x - 3, y - 3, 3 * scale, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.fill()
      // 梗
      ctx.beginPath()
      ctx.moveTo(x, y - 8 * scale)
      ctx.quadraticCurveTo(x + 5 * scale, y - 15 * scale, x + 3 * scale, y - 18 * scale)
      ctx.strokeStyle = '#228B22'
      ctx.lineWidth = 2
      ctx.stroke()
      break
      
    case 'pineapple':
      // 菠萝块
      ctx.beginPath()
      ctx.ellipse(x, y, 15 * scale, 10 * scale, 0, 0, Math.PI * 2)
      ctx.fillStyle = '#FFD700'
      ctx.fill()
      // 纹理
      ctx.strokeStyle = '#DAA520'
      ctx.lineWidth = 1
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath()
        ctx.moveTo(x + i * 5, y - 7)
        ctx.lineTo(x + i * 5, y + 7)
        ctx.stroke()
      }
      break
      
    case 'coffee':
      // 咖啡豆
      ctx.beginPath()
      ctx.ellipse(x, y, 6 * scale, 4 * scale, 0.3, 0, Math.PI * 2)
      ctx.fillStyle = '#4B3621'
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x - 4, y)
      ctx.lineTo(x + 4, y)
      ctx.strokeStyle = '#2D1810'
      ctx.lineWidth = 1
      ctx.stroke()
      break
      
    case 'cinnamon':
      // 肉桂棒
      ctx.beginPath()
      ctx.rect(x - 3, y - 15, 6, 30)
      ctx.fillStyle = '#8B4513'
      ctx.fill()
      // 纹理
      ctx.strokeStyle = '#A0522D'
      ctx.lineWidth = 0.5
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(x - 2, y - 10 + i * 8)
        ctx.lineTo(x + 2, y - 10 + i * 8)
        ctx.stroke()
      }
      break
      
    case 'grapefruit':
      // 西柚片
      ctx.beginPath()
      ctx.arc(x, y, 14 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FF6347'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x, y, 10 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FF7F50'
      ctx.fill()
      break
      
    case 'ginger':
      // 姜片
      ctx.beginPath()
      ctx.ellipse(x, y, 10 * scale, 6 * scale, 0.2, 0, Math.PI * 2)
      ctx.fillStyle = '#DEB887'
      ctx.fill()
      ctx.strokeStyle = '#D2691E'
      ctx.lineWidth = 1
      ctx.stroke()
      break
      
    case 'peach':
      // 桃子片
      ctx.beginPath()
      ctx.arc(x, y, 12 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFDAB9'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x - 2, y - 2, 4 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#FFCBA4'
      ctx.fill()
      break
      
    case 'blackberry':
      // 黑莓
      ctx.beginPath()
      ctx.arc(x, y, 8 * scale, 0, Math.PI * 2)
      ctx.fillStyle = '#4B0082'
      ctx.fill()
      // 高光
      ctx.beginPath()
      ctx.arc(x - 2, y - 2, 2 * scale, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.fill()
      break
      
    case 'salt':
      // 盐边（装饰在杯口）
      ctx.fillStyle = '#FFFFFF'
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.arc(x - 20 + i * 5, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
      break
  }
  
  ctx.restore()
}

// 绘制气泡
const drawBubbles = (ctx, x, y, width, height) => {
  ctx.save()
  const bubbleCount = 5 + Math.random() * 5
  
  for (let i = 0; i < bubbleCount; i++) {
    const bx = x - width/3 + Math.random() * (width * 0.6)
    const by = y + Math.random() * height * 0.4
    const size = 2 + Math.random() * 3
    
    ctx.beginPath()
    ctx.arc(bx, by, size, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.fill()
  }
  ctx.restore()
}

// 颜色辅助函数
const lightenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.min(255, (num >> 16) + amt)
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt)
  const B = Math.min(255, (num & 0x0000FF) + amt)
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
}

const darkenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.max(0, (num >> 16) - amt)
  const G = Math.max(0, ((num >> 8) & 0x00FF) - amt)
  const B = Math.max(0, (num & 0x0000FF) - amt)
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
}

const getStepAction = (step) => {
  const text = step.toLowerCase()
  if (text.includes('倒入') || text.includes('加入') || text.includes('添加')) return 'pour'
  if (text.includes('摇晃') || text.includes('摇和')) return 'shake'
  if (text.includes('搅拌') || text.includes('搅匀')) return 'stir'
  if (text.includes('过滤') || text.includes('倒入杯中')) return 'pour'
  if (text.includes('装饰')) return 'garnish'
  return 'default'
}

// 生成占位图
const generatePlaceholder = (cocktail) => {
  const canvas = document.createElement('canvas')
  canvas.width = 400
  canvas.height = 250
  const ctx = canvas.getContext('2d')

  // 背景渐变
  const bgColor = SPIRIT_COLORS[cocktail.baseSpirit] || '#4A4A4A'
  const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  bgGrad.addColorStop(0, darkenColor(bgColor, 30))
  bgGrad.addColorStop(1, lightenColor(bgColor, 20))
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 添加微弱的背景图案
  ctx.save()
  ctx.globalAlpha = 0.05
  for (let i = 0; i < 20; i++) {
    ctx.beginPath()
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 30 + 10,
      0, Math.PI * 2
    )
    ctx.fillStyle = '#FFFFFF'
    ctx.fill()
  }
  ctx.restore()

  // 确定杯子类型
  const glassInfo = GLASS_TYPES[cocktail.glassType] || GLASS_TYPES['古典杯']
  const liquidColor = bgColor
  
  // 绘制位置
  const glassX = canvas.width / 2
  const glassY = canvas.height / 2 + 10
  
  // 绘制冰块
  if (!['shot', 'martini', 'margarita', 'champagne'].includes(glassInfo.type)) {
    drawIce(ctx, glassX - 5, glassY + 10, 12)
  }
  
  // 绘制杯子
  drawGlass(ctx, glassX, glassY, glassInfo, liquidColor)
  
  // 绘制气泡（如果是气泡类鸡尾酒）
  if (cocktail.flavor.includes('气泡')) {
    drawBubbles(ctx, glassX - glassInfo.width/3, glassY - 10, glassInfo.width, glassInfo.height/2)
  }
  
  // 绘制装饰物
  if (cocktail.garnish && cocktail.garnish !== '无') {
    const garnishItems = cocktail.garnish.split('，').slice(0, 3)
    let decorX = glassX + glassInfo.width/2 + 20
    let decorY = glassY - 20
    
    garnishItems.forEach((item, index) => {
      const decorKey = Object.keys(DECORATIONS).find(k => item.includes(k))
      if (decorKey) {
        drawDecoration(ctx, DECORATIONS[decorKey].type, decorX, decorY, 0.8 - index * 0.1)
        decorX += 25
      }
    })
  }
  
  // 绘制鸡尾酒名称
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 18px -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(0,0,0,0.5)'
  ctx.shadowBlur = 4
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2
  ctx.fillText(cocktail.name, canvas.width / 2, canvas.height - 35)
  
  // 绘制英文名称
  ctx.font = '11px -apple-system, sans-serif'
  ctx.shadowBlur = 2
  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.fillText(cocktail.nameEn, canvas.width / 2, canvas.height - 18)

  return canvas.toDataURL('image/png')
}

// 全局状态
let allCocktails = []
let filteredCocktails = []
let currentFilters = {
  search: '',
  spirits: [],
  flavors: [],
  alcoholLevel: null
}

// DOM 元素引用
const elements = {
  cocktailGrid: document.querySelector('#cocktail-grid'),
  cocktailCount: document.querySelector('#cocktail-count'),
  searchInput: document.querySelector('#search-input'),
  searchClear: document.querySelector('#search-clear'),
  filterToggle: document.querySelector('#filter-toggle'),
  filterPanel: document.querySelector('#filter-panel'),
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
  detailHistory: document.querySelector('#detail-history')
}

// 数据加载
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

// 渲染单个鸡尾酒卡片
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

// 渲染鸡尾酒列表
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

// 渲染鸡尾酒数量
const updateCount = (count) => {
  if (elements.cocktailCount) {
    elements.cocktailCount.textContent = count
  }
}

// 显示/隐藏空状态
const toggleEmptyState = (show) => {
  if (elements.emptyState) {
    elements.emptyState.classList.toggle('hidden', !show)
  }
  if (elements.cocktailGrid) {
    elements.cocktailGrid.classList.toggle('hidden', show)
  }
}

// 筛选逻辑
const applyFilters = () => {
  filteredCocktails = allCocktails.filter(cocktail => {
    // 搜索过滤
    const matchesSearch = currentFilters.search === '' ||
      cocktail.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
      cocktail.nameEn.toLowerCase().includes(currentFilters.search.toLowerCase())

    // 基酒过滤
    const matchesSpirit = currentFilters.spirits.length === 0 ||
      currentFilters.spirits.includes(cocktail.baseSpirit)

    // 风味过滤
    const matchesFlavor = currentFilters.flavors.length === 0 ||
      currentFilters.flavors.some(flavor => cocktail.flavor.includes(flavor))

    // 酒精度过滤
    const matchesAlcohol = currentFilters.alcoholLevel === null ||
      (cocktail.alcoholContent >= currentFilters.alcoholLevel.min &&
       cocktail.alcoholContent < currentFilters.alcoholLevel.max)

    return matchesSearch && matchesSpirit && matchesFlavor && matchesAlcohol
  })

  renderCocktailList(filteredCocktails)
  updateCount(filteredCocktails.length)
  toggleEmptyState(filteredCocktails.length === 0)
}

// 搜索处理
const handleSearch = (event) => {
  currentFilters.search = event.target.value.trim()
  applyFilters()
}

// 基酒筛选处理
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

// 风味筛选处理
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

// 酒精度筛选处理
const handleAlcoholFilter = (event) => {
  const button = event.target.closest('.filter-tag')
  if (!button || !button.dataset.level) return

  // 移除其他按钮的活动状态
  elements.alcoholFilters.querySelectorAll('.filter-tag').forEach(btn => {
    btn.classList.remove('active')
  })

  const levelLabel = button.dataset.level
  const level = ALCOHOL_LEVELS.find(l => l.label === levelLabel)

  if (currentFilters.alcoholLevel?.label === levelLabel) {
    // 再次点击取消选择
    currentFilters.alcoholLevel = null
    button.classList.remove('active')
  } else {
    currentFilters.alcoholLevel = level
    button.classList.add('active')
  }
  applyFilters()
}

// 清除所有筛选
const clearAllFilters = () => {
  currentFilters = {
    search: '',
    spirits: [],
    flavors: [],
    alcoholLevel: null
  }

  // 重置UI
  elements.searchInput.value = ''
  
  // 基酒复选框
  const spiritCheckboxes = elements.spiritFilters.querySelectorAll('input[type="checkbox"]')
  spiritCheckboxes.forEach(cb => {
    cb.checked = false
  })

  // 风味标签
  const flavorLabels = elements.flavorFilters.querySelectorAll('.filter-tag')
  flavorLabels.forEach(label => {
    label.classList.remove('active')
  })

  // 酒精度按钮
  const alcoholButtons = elements.alcoholFilters.querySelectorAll('.filter-tag')
  alcoholButtons.forEach(btn => {
    btn.classList.remove('active')
  })

  applyFilters()
}

// 显示鸡尾酒详情
const showCocktailDetail = (cocktail) => {
  // 设置图片（带占位图处理）
  if (elements.detailImg) {
    const placeholderUrl = generatePlaceholder(cocktail)
    elements.detailImg.src = `./images/cocktails/${cocktail.image}`
    elements.detailImg.alt = cocktail.name
    elements.detailImg.onerror = function() {
      this.onerror = null
      this.src = placeholderUrl
    }
  }

  // 设置名称
  if (elements.detailName) {
    elements.detailName.textContent = cocktail.name
  }
  if (elements.detailNameEn) {
    elements.detailNameEn.textContent = cocktail.nameEn
  }

  // 设置属性
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

  // 设置风味标签
  if (elements.detailFlavors) {
    elements.detailFlavors.innerHTML = cocktail.flavor
      .map(flavor => `<span class="flavor-tag">${flavor}</span>`)
      .join('')
  }

  // 设置配方
  if (elements.detailIngredients) {
    elements.detailIngredients.innerHTML = cocktail.ingredients
      .map(ing => `<li>${ing.name} ${ing.amount}${ing.unit}</li>`)
      .join('')
  }

  // 设置装饰物
  if (elements.detailGarnish) {
    elements.detailGarnish.textContent = cocktail.garnish
  }

  // 设置调制步骤（带动画）
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

  // 设置背景故事
  if (elements.detailHistory) {
    elements.detailHistory.textContent = cocktail.history
  }

  // 显示模态框
  if (elements.modal.showModal) {
    elements.modal.showModal()
  } else {
    elements.modal.setAttribute('open', '')
  }
  document.body.style.overflow = 'hidden'

  // 定位到弹窗头部（延迟执行确保DOM渲染完成）
  requestAnimationFrame(() => {
    const content = document.querySelector('.detail-content')
    if (content) {
      content.scrollTop = 0
    }
  })
}

// 关闭详情模态框
const closeModal = () => {
  if (elements.modal.close) {
    elements.modal.close()
  } else {
    elements.modal.removeAttribute('open')
  }
  document.body.style.overflow = ''
}

// 初始化事件监听
const initEventListeners = () => {
  // 搜索输入
  elements.searchInput.addEventListener('input', handleSearch)

  // 清除搜索
  if (elements.searchClear) {
    elements.searchClear.addEventListener('click', () => {
      elements.searchInput.value = ''
      currentFilters.search = ''
      applyFilters()
    })
  }

  // 筛选器面板开关
  if (elements.filterToggle) {
    elements.filterToggle.addEventListener('click', () => {
      elements.filterPanel.classList.toggle('active')
    })
  }
  if (elements.filterClose) {
    elements.filterClose.addEventListener('click', () => {
      elements.filterPanel.classList.remove('active')
    })
  }

  // 基酒筛选
  elements.spiritFilters.addEventListener('change', handleSpiritFilter)

  // 风味筛选
  elements.flavorFilters.addEventListener('click', handleFlavorFilter)

  // 酒精度筛选
  elements.alcoholFilters.addEventListener('click', handleAlcoholFilter)

  // 清除筛选按钮
  elements.filterClear.addEventListener('click', clearAllFilters)

  // 空状态清除按钮
  if (elements.emptyClear) {
    elements.emptyClear.addEventListener('click', clearAllFilters)
  }

  // 关闭模态框
  elements.detailClose.addEventListener('click', closeModal)
  elements.modal.addEventListener('click', (event) => {
    if (event.target === elements.modal) {
      closeModal()
    }
  })

  // ESC键关闭模态框
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && elements.modal.open) {
      closeModal()
    }
  })
}

// 应用初始化
const initApp = async () => {
  // 加载数据
  allCocktails = await loadCocktails()
  filteredCocktails = [...allCocktails]

  // 渲染列表
  renderCocktailList(filteredCocktails)
  updateCount(filteredCocktails.length)

  // 初始化事件监听
  initEventListeners()
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp)

// 暴露全局函数供HTML调用
window.clearAllFilters = clearAllFilters