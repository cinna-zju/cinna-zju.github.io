# AGENTS.md

## Project Overview

This is a **static HTML/CSS/JS** cocktail recipe application. No build tools, bundlers, or frameworks are used. The app runs by directly opening `index.html` in a browser.

## Build & Run Commands

```bash
# No build step required - static files only
# Open directly in browser:
open index.html

# Or use a local server (if needed):
python3 -m http.server 8000
# Then visit http://localhost:8000
```

**No linting or testing tools are configured.** Add them only if explicitly requested.

---

## Project Structure

```
cocktail-app/
├── index.html          # Main entry point
├── css/
│   ├── style.css       # Main styles
│   └── animations.css  # Animation definitions
├── js/
│   ├── app.js          # Main application logic
│   ├── data.js         # Data loading and processing
│   ├── filter.js       # Search and filter logic
│   └── render.js       # DOM rendering functions
├── data/
│   └── cocktails.json  # Cocktail data (Chinese content)
└── images/
    └── cocktails/      # Cocktail images
```

---

## Code Style Guidelines

### HTML

- Use **semantic HTML5** elements (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`)
- Include proper `lang="zh-CN"` attribute on `<html>`
- Use descriptive `id` and `class` names in **kebab-case** (`cocktail-card`, `filter-panel`)
- All images must have `alt` text in Chinese
- Indent with **2 spaces**

### CSS

- Use **CSS custom properties** (variables) defined in `:root`
- Follow the design system defined in `UI-DESIGN.md`
- Class names: **kebab-case** (`card-container`, `btn-primary`)
- One selector per line, properties alphabetically ordered
- Mobile-first approach with `min-width` media queries
- Prefix animation classes with `anim-`

```css
/* Good */
.cocktail-card {
  background-color: var(--gray-900);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

/* Bad */
.cocktailCard {
  padding: 16px;
  background: #212121;
}
```

### JavaScript

- Use **ES6+** syntax (const/let, arrow functions, template literals)
- **No semicolons** (follow standard JS style)
- **2-space** indentation
- Use `const` by default, `let` only when reassignment needed
- Functions: **camelCase** (`loadCocktails`, `filterBySpirit`)
- Constants: **UPPER_SNAKE_CASE** (`BASE_SPIRITS`, `FLAVOR_TAGS`)
- Use `async/await` for asynchronous operations
- DOM queries: use `querySelector` / `querySelectorAll`

```javascript
// Good
const loadCocktails = async () => {
  const response = await fetch('./data/cocktails.json')
  return response.json()
}

const renderCard = (cocktail) => {
  const card = document.createElement('article')
  card.className = 'cocktail-card'
  card.innerHTML = `
    <img src="./images/cocktails/${cocktail.image}" alt="${cocktail.name}">
    <h3>${cocktail.name}</h3>
  `
  return card
}

// Bad
function LoadCocktails(){
    var response = fetch('./data/cocktails.json');
    return response.json();
}
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| HTML IDs | kebab-case | `id="filter-panel"` |
| CSS Classes | kebab-case | `class="card-container"` |
| JS Functions | camelCase | `filterByBaseSpirit()` |
| JS Constants | UPPER_SNAKE | `const ALCOHOL_LEVELS` |
| Data IDs | kebab-case | `"id": "mojito"` |
| File Names | kebab-case | `cocktails.json` |

---

## Data Format

Cocktail data is stored in `data/cocktails.json`. Each entry must follow the schema defined in `PRD.md`. Key fields:

- `id`: kebab-case identifier
- `name`: Chinese display name
- `nameEn`: English name
- `alcoholContent`: percentage as number (0-100)
- `flavor`: array of flavor tags
- `ingredients`: array with `name`, `amount`, `unit`
- `preparation`: array of step strings

---

## Important References

- **PRD.md**: Product requirements, data schema, feature specs
- **UI-DESIGN.md**: Colors, typography, spacing, component styles

Always consult these files before making changes to ensure consistency.

---

## Common Tasks

### Add a new cocktail
1. Add entry to `data/cocktails.json` following the schema
2. Add image to `images/cocktails/` with matching filename
3. Verify JSON is valid

### Modify styles
1. Check `UI-DESIGN.md` for design tokens
2. Use CSS variables from `:root`
3. Test responsive behavior at 375px, 768px, 1024px

### Add new feature
1. Update `PRD.md` with requirements
2. Add HTML structure in `index.html`
3. Style in `css/style.css`
4. Logic in appropriate `js/` module
