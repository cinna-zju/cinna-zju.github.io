# 鸡尾酒应用 - UI设计规范

## 1. 设计理念

### 1.1 设计关键词
- **优雅**: 体现鸡尾酒的文化底蕴
- **现代**: 简洁的界面，流畅的交互
- **沉浸**: 突出视觉内容，减少干扰

### 1.2 设计风格
采用深色主题为主，搭配琥珀色系点缀，营造酒吧氛围感。

---

## 2. 颜色系统

### 2.1 主色板
```css
:root {
  /* 主色调 - 琥珀/金色系 */
  --primary-50: #FFF8E1;
  --primary-100: #FFECB3;
  --primary-200: #FFE082;
  --primary-300: #FFD54F;
  --primary-400: #FFCA28;
  --primary-500: #FFC107;
  --primary-600: #FFB300;
  --primary-700: #FFA000;
  --primary-800: #FF8F00;
  --primary-900: #FF6F00;
}
```

### 2.2 中性色板
```css
:root {
  /* 深色背景系 */
  --gray-50: #FAFAFA;
  --gray-100: #F5F5F5;
  --gray-200: #EEEEEE;
  --gray-300: #E0E0E0;
  --gray-400: #BDBDBD;
  --gray-500: #9E9E9E;
  --gray-600: #757575;
  --gray-700: #616161;
  --gray-800: #424242;
  --gray-900: #212121;
  --gray-950: #121212;
}
```

### 2.3 功能色
```css
:root {
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #F44336;
  --info: #2196F3;
}
```

### 2.4 基酒主题色
```css
:root {
  --vodka: #E8EAF6;      /* 伏特加 - 冰蓝白 */
  --gin: #B3E5FC;        /* 金酒 - 清澈蓝 */
  --rum: #D7CCC8;        /* 朗姆 - 棕色调 */
  --whiskey: #FFB74D;    /* 威士忌 - 琥珀色 */
  --tequila: #C5E1A5;    /* 龙舌兰 - 青柠绿 */
  --brandy: #8D6E63;     /* 白兰地 - 深棕 */
  --liqueur: #F48FB1;    /* 利口酒 - 粉色 */
  --champagne: #FFF59D;  /* 香槟 - 金黄 */
}
```

### 2.5 颜色使用规范

| 场景 | 颜色 | 色值 |
|------|------|------|
| 主背景 | gray-950 | #121212 |
| 卡片背景 | gray-900 | #212121 |
| 主按钮 | primary-500 | #FFC107 |
| 主按钮悬停 | primary-600 | #FFB300 |
| 标题文字 | white | #FFFFFF |
| 正文文字 | gray-300 | #E0E0E0 |
| 次要文字 | gray-500 | #9E9E9E |
| 链接/强调 | primary-400 | #FFCA28 |
| 分割线 | gray-800 | #424242 |

---

## 3. 字体系统

### 3.1 字体族
```css
:root {
  /* 主字体 */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
               "Helvetica Neue", Arial, "Noto Sans SC", sans-serif;
  
  /* 装饰字体（标题） */
  --font-display: "Playfair Display", "Georgia", serif;
  
  /* 等宽字体 */
  --font-mono: "SF Mono", "Fira Code", monospace;
}
```

### 3.2 字号规范
```css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
}
```

### 3.3 字重规范
```css
:root {
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### 3.4 行高规范
```css
:root {
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### 3.5 文字样式预设
```css
/* 大标题 */
.heading-1 {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

/* 中标题 */
.heading-2 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
}

/* 小标题 */
.heading-3 {
  font-family: var(--font-sans);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}

/* 正文 */
.body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

/* 辅助文字 */
.caption {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--gray-500);
}
```

---

## 4. 间距系统

### 4.1 基础间距
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

### 4.2 间距使用规范
- **组件内边距**: space-2 到 space-4
- **卡片内边距**: space-4 到 space-6
- **区块间距**: space-8 到 space-12
- **页面边距**: space-4 (移动端) / space-8 (桌面端)

---

## 5. 圆角系统

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}
```

**使用规范**:
- 按钮: radius-md (8px)
- 卡片: radius-lg (12px)
- 标签/胶囊: radius-full
- 头像: radius-full

---

## 6. 阴影系统

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(255, 193, 7, 0.3);
}
```

**使用规范**:
- 卡片默认: shadow-md
- 卡片悬停: shadow-lg + shadow-glow
- 弹窗/模态框: shadow-xl
- 下拉菜单: shadow-lg

---

## 7. 动画系统

### 7.1 过渡时间
```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
}
```

### 7.2 缓动函数
```css
:root {
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### 7.3 预设动画
```css
/* 淡入 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 上滑淡入 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 缩放弹出 */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 摇晃 */
@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

/* 倒入液体 */
@keyframes pour {
  0% { height: 0%; }
  100% { height: 100%; }
}
```

---

## 8. 组件规范

### 8.1 导航栏
```
高度: 64px (桌面) / 56px (移动端)
背景: gray-950 + 毛玻璃效果
固定: 顶部固定
内边距: space-4 水平
```

### 8.2 搜索栏
```
高度: 48px
背景: gray-900
边框: 1px solid gray-800
圆角: radius-full
内边距: space-4 左右
图标: 左侧搜索图标，右侧清除按钮
```

### 8.3 鸡尾酒卡片
```
尺寸: 
  - 桌面: 宽度 100%，最小高度 320px
  - 移动端: 宽度 100%，最小高度 280px
背景: gray-900
圆角: radius-lg
阴影: shadow-md → shadow-lg (悬停)
过渡: transform 300ms, box-shadow 300ms

结构:
┌─────────────────────┐
│      [图片区]        │  ← 高度 60%
├─────────────────────┤
│  鸡尾酒名称          │
│  基酒 | 酒精度       │
│  [风味标签] [风味标签] │
└─────────────────────┘
```

### 8.4 标签 (Tag)
```
内边距: space-1 space-3
字号: text-xs
圆角: radius-full
背景: 
  - 默认: gray-800
  - 选中: primary-500
文字: 
  - 默认: gray-300
  - 选中: gray-950
```

### 8.5 按钮
```css
/* 主按钮 */
.btn-primary {
  padding: var(--space-2) var(--space-6);
  background: var(--primary-500);
  color: var(--gray-950);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all var(--duration-fast) var(--ease-default);
}

.btn-primary:hover {
  background: var(--primary-600);
  box-shadow: var(--shadow-glow);
}

/* 次按钮 */
.btn-secondary {
  padding: var(--space-2) var(--space-6);
  background: transparent;
  color: var(--primary-500);
  border: 1px solid var(--primary-500);
  border-radius: var(--radius-md);
}

.btn-secondary:hover {
  background: var(--primary-500);
  color: var(--gray-950);
}
```

### 8.6 筛选器面板
```
位置: 
  - 桌面: 左侧固定栏，宽度 280px
  - 移动端: 底部抽屉或顶部展开
背景: gray-900
分组: 按筛选维度分组
标题: text-sm, font-semibold, gray-400
选项: 标签样式，可多选
```

### 8.7 详情页布局
```
┌─────────────────────────────────────┐
│           ← 返回    鸡尾酒名称      │  ← 导航栏
├─────────────────────────────────────┤
│                                     │
│         [大图展示区]                 │  ← 图片区，高度 40vh
│                                     │
├─────────────────────────────────────┤
│  酒精度: 25%   难度: 中等   杯型: 高脚杯 │  ← 属性栏
├─────────────────────────────────────┤
│  [清爽] [果味] [酸甜]               │  ← 风味标签
├─────────────────────────────────────┤
│                                     │
│  配方材料                           │  ← 配方区
│  • 伏特加 45ml                      │
│  • 橙汁 90ml                        │
│  • ...                              │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  调制步骤                           │  ← 步骤区（带动画）
│  1. 在杯中加入冰块                   │
│  2. 倒入伏特加                       │
│  3. ...                             │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  背景故事                           │  ← 故事区
│  这款鸡尾酒起源于...                 │
│                                     │
└─────────────────────────────────────┘
```

---

## 9. 图标规范

### 9.1 图标尺寸
```css
:root {
  --icon-xs: 16px;
  --icon-sm: 20px;
  --icon-md: 24px;
  --icon-lg: 32px;
  --icon-xl: 48px;
}
```

### 9.2 必需图标
- 搜索 (Search)
- 清除/关闭 (X)
- 返回 (ArrowLeft)
- 过滤 (Filter)
- 酒杯 (Wine glass)
- 热度/难度 (Fire/Star)
- 播放 (Play)
- 下一步 (ChevronRight)

**推荐图标库**: Lucide Icons 或 Heroicons (均可离线使用)

---

## 10. 响应式设计

### 10.1 断点定义
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

### 10.2 布局适配

| 元素 | 移动端 (<768px) | 平板 (768-1024px) | 桌面 (>1024px) |
|------|-----------------|-------------------|----------------|
| 卡片列数 | 1列 | 2列 | 3-4列 |
| 筛选器 | 底部抽屉 | 顶部折叠栏 | 左侧固定栏 |
| 详情页 | 全屏 | 居中 80% | 居中 70% max-width 800px |
| 边距 | 16px | 24px | 32px |

### 10.3 触控优化
- 可点击元素最小尺寸: 44px × 44px
- 标签/按钮间距: 至少 8px
- 滑动手势支持（筛选器抽屉）

---

## 11. 可访问性

### 11.1 颜色对比度
- 正文文字: 对比度 ≥ 4.5:1
- 大标题: 对比度 ≥ 3:1
- 交互元素: 对比度 ≥ 3:1

### 11.2 键盘导航
- 所有交互元素可通过 Tab 访问
- 当前焦点元素有明显视觉指示
- 支持 Enter/Space 激活

### 11.3 屏幕阅读器
- 图片必须有 alt 文本
- 按钮有 aria-label
- 使用语义化 HTML 标签

---

## 12. 示例样式代码

### 12.1 完整的CSS变量定义
```css
:root {
  /* 颜色 */
  --primary-500: #FFC107;
  --primary-600: #FFB300;
  --gray-950: #121212;
  --gray-900: #212121;
  --gray-800: #424242;
  --gray-300: #E0E0E0;
  --gray-500: #9E9E9E;
  
  /* 字体 */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-display: "Playfair Display", Georgia, serif;
  
  /* 间距 */
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  
  /* 圆角 */
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* 阴影 */
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 20px rgba(255, 193, 7, 0.3);
  
  /* 动画 */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 深色模式基础样式 */
body {
  background-color: var(--gray-950);
  color: var(--gray-300);
  font-family: var(--font-sans);
  line-height: 1.5;
}
```

---

## 13. 设计资源

### 13.1 推荐字体
- 标题字体: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- 正文字体: 系统字体栈（无需额外加载）

### 13.2 推荐图标
- [Lucide Icons](https://lucide.dev/) - 简洁现代
- [Heroicons](https://heroicons.com/) - Tailwind出品

### 13.3 参考案例
- [Cocktail Builder](https://cocktailbuilder.com/)
- [Liquor.com](https://www.liquor.com/)
- [Difford's Guide](https://www.diffordsguide.com/)
