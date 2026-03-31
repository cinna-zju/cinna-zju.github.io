// 常量定义

const COCKTAILS_URL = './data/cocktails.json'
const BASE_SPIRITS = ['伏特加', '金酒', '朗姆酒', '威士忌', '龙舌兰', '白兰地', '利口酒']

const GREETINGS = [
  '今晚想喝点什么？',
  '来杯清醒还是糊涂？',
  '人生苦短，先干为敬',
  '调酒如人生，苦涩后是回甘',
  '您来了，老位置？',
  '今晚微醺，刚刚好',
  '这杯我请，下杯你付',
  '酒是粮食精，越喝越年轻',
  '一杯敬明天，一杯敬过往',
  '喝到位了，烦恼就退位了',
  '来，走一个？',
  '今天适合小酌一杯',
  '喝完这杯，还有三杯',
  '好酒不怕巷子深',
  '酒逢知己千杯少'
]

const FLAVOR_TAGS = ['清爽', '果味', '甜味', '酸味', '苦味', '香料', '奶油']

const ALCOHOL_LEVELS = [
  { label: '低', min: 0, max: 15 },
  { label: '中', min: 15, max: 25 },
  { label: '高', min: 25, max: 100 }
]

const ANIMAL_TRAITS = {
  lion: {
    emoji: '🦁',
    name: '狮子',
    spirits: ['威士忌'],
    flavors: ['强劲', '香料', '苦味'],
    alcoholLevel: 'high',
    reason: '狮子代表力量与威严，这款鸡尾酒强劲有力，如同狮王般令人敬畏'
  },
  rabbit: {
    emoji: '🐰',
    name: '兔子',
    spirits: ['金酒'],
    flavors: ['清爽', '果味', '草本'],
    alcoholLevel: 'low',
    reason: '兔子活泼可爱，这款鸡尾酒清新爽口，如同小兔子般轻盈灵动'
  },
  fox: {
    emoji: '🦊',
    name: '狐狸',
    spirits: ['龙舌兰'],
    flavors: ['酸味', '清爽', '果味'],
    alcoholLevel: 'medium',
    reason: '狐狸机智狡猾，这款鸡尾酒层次丰富，如同狐狸般充满变化'
  },
  bear: {
    emoji: '🐻',
    name: '熊',
    spirits: ['朗姆酒'],
    flavors: ['甜味', '果味', '奶油'],
    alcoholLevel: 'medium',
    reason: '熊代表沉稳与温暖，这款鸡尾酒圆润饱满，如同熊般令人安心'
  },
  owl: {
    emoji: '🦉',
    name: '猫头鹰',
    spirits: ['金酒'],
    flavors: ['草本', '苦味', '清爽'],
    alcoholLevel: 'medium',
    reason: '猫头鹰象征智慧，这款鸡尾酒经典优雅，如同猫头鹰般深邃'
  },
  dolphin: {
    emoji: '🐬',
    name: '海豚',
    spirits: ['金酒', '伏特加', '葡萄酒'],
    flavors: ['清爽', '气泡', '果味'],
    alcoholLevel: 'low',
    reason: '海豚活泼快乐，这款鸡尾酒充满气泡，如同海豚般欢快跳跃'
  },
  butterfly: {
    emoji: '🦋',
    name: '蝴蝶',
    spirits: ['葡萄酒'],
    flavors: ['花香', '果味', '清爽'],
    alcoholLevel: 'low',
    reason: '蝴蝶优雅美丽，这款鸡尾酒芬芳迷人，如同蝴蝶般翩翩起舞'
  },
  snake: {
    emoji: '🐍',
    name: '蛇',
    spirits: ['威士忌', '白兰地'],
    flavors: ['苦味', '香料', '复杂'],
    alcoholLevel: 'high',
    reason: '蛇神秘莫测，这款鸡尾酒复杂深邃，如同蛇般令人着迷'
  },
  eagle: {
    emoji: '🦅',
    name: '鹰',
    spirits: ['威士忌'],
    flavors: ['强劲', '苦味', '烟熏'],
    alcoholLevel: 'high',
    reason: '鹰代表自由与力量，这款鸡尾酒烈性十足，如同鹰般翱翔天际'
  },
  panda: {
    emoji: '🐼',
    name: '熊猫',
    spirits: ['伏特加'],
    flavors: ['甜味', '奶油', '咖啡'],
    alcoholLevel: 'low',
    reason: '熊猫可爱温顺，这款鸡尾酒甜美柔和，如同熊猫般惹人喜爱'
  },
  wolf: {
    emoji: '🐺',
    name: '狼',
    spirits: ['威士忌'],
    flavors: ['烟熏', '香料', '强劲'],
    alcoholLevel: 'high',
    reason: '狼野性不羁，这款鸡尾酒烟熏浓烈，如同狼般充满野性魅力'
  },
  hummingbird: {
    emoji: '🐦',
    name: '蜂鸟',
    spirits: ['朗姆酒', '金酒'],
    flavors: ['果味', '甜味', '清爽'],
    alcoholLevel: 'low',
    reason: '蜂鸟灵巧敏捷，这款鸡尾酒轻盈甜美，如同蜂鸟般充满活力'
  }
}

const COLOR_TRAITS = {
  red: {
    emoji: '🔴',
    name: '红色',
    keywords: ['蔓越莓', '石榴', '樱桃', '红色'],
    reason: '红色热情奔放'
  },
  orange: {
    emoji: '🟠',
    name: '橙色',
    keywords: ['橙汁', '橙', '橙皮', '橙利口酒', '阿佩罗'],
    reason: '橙色温暖活力'
  },
  yellow: {
    emoji: '🟡',
    name: '黄色',
    keywords: ['柠檬', '金酒', '菠萝', '黄色', '金黄'],
    reason: '黄色明亮欢快'
  },
  green: {
    emoji: '🟢',
    name: '绿色',
    keywords: ['薄荷', '青柠', '绿色', '草本', '查特酒'],
    reason: '绿色清新自然'
  },
  blue: {
    emoji: '🔵',
    name: '蓝色',
    keywords: ['蓝橙', '蓝色'],
    reason: '蓝色深邃神秘'
  },
  purple: {
    emoji: '🟣',
    name: '紫色',
    keywords: ['黑莓', '黑加仑', '紫色', '蓝莓'],
    reason: '紫色优雅神秘'
  },
  white: {
    emoji: '⚪',
    name: '白色',
    keywords: ['奶油', '伏特加', '白色', '椰浆', '牛奶'],
    reason: '白色纯净高雅'
  },
  brown: {
    emoji: '🟤',
    name: '棕色',
    keywords: ['咖啡', '威士忌', '棕色', '朗姆酒', '白兰地', '可乐'],
    reason: '棕色沉稳温暖'
  }
}

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

const ANIMATION_CONFIG = {
  pour: { duration: 1500, name: '倒入' },
  shake: { duration: 1200, name: '摇晃' },
  stir: { duration: 1500, name: '搅拌' },
  ice: { duration: 800, name: '加冰' },
  garnish: { duration: 800, name: '装饰' },
  default: { duration: 1000, name: '操作' }
}
