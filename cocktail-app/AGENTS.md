# AGENTS.md

## Project Overview

This is a **static HTML/CSS/JS** cocktail recipe application. No build tools, bundlers, or frameworks are used. The app loads via `<script>` tags in `index.html` — no ES modules or bundlers.

## Build & Run Commands

```bash
# No build step required - static files only
# Open directly in browser:
open index.html

# Or use a local HTTP server (required for fetch/CORS):
python3 -m http.server 8000
# Then visit http://localhost:8000
```

**No linting, type-checking, or testing tools are configured.** Add them only if explicitly requested.

---

## Project Structure

```
cocktail-app/
├── index.html               # Main entry point, loads all CSS/JS
├── css/
│   ├── base.css             # CSS variables, reset, utilities
│   ├── layout.css           # Navbar, filter panel, grid, responsive
│   ├── components.css       # Cards, buttons, tags, search, grids
│   ├── modals.css           # Detail modal, recommend modal
│   └── animations.css       # Keyframe animations
├── js/
│   ├── constants.js         # All constants: traits, colors, configs
│   ├── state.js             # Global state + DOM element references
│   ├── canvas.js            # Canvas drawing: glasses, decorations, placeholders
│   ├── renderer.js          # DOM rendering: cards, detail, recommend
│   ├── filter.js            # Filter logic: apply, clear
│   ├── recommend.js         # Recommendation algorithm
│   ├── animation.js         # Cocktail animation player
│   ├── events.js            # All event handlers
│   ├── bartender.js         # Greeting rotation
│   └── app.js               # Entry point: init + data load
├── data/
│   └── cocktails.json       # Cocktail data (Chinese content)
└── images/
    └── cocktails/           # Cocktail images
```

**Script load order matters** — modules share state via global scope. Always keep `app.js` last.

---

## Code Style Guidelines

### HTML
- Use **semantic HTML5** elements (`<header>`, `<main>`, `<section>`, `<article>`)
- `lang="zh-CN"` on `<html>`
- IDs and classes: **kebab-case** (`cocktail-card`, `filter-panel`)
- All images must have `alt` text in Chinese
- **2-space** indentation

### CSS
- Use **CSS custom properties** from `:root` — never hardcode colors/sizes
- Class names: **kebab-case** (`card-container`, `btn-primary`)
- Alphabetize properties within rules
- Mobile-first with `min-width` media queries
- Animation classes prefixed with `anim-`
- Put styles in the correct module file (base/layout/components/modals)

```css
/* Good */
.cocktail-card {
  background-color: var(--gray-900);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}
```

### JavaScript
- **No semicolons**
- **2-space** indentation
- `const` by default, `let` only when reassignment needed
- Functions: **camelCase** (`loadCocktails`, `filterBySpirit`)
- Constants: **UPPER_SNAKE_CASE** (`BASE_SPIRITS`, `ANIMAL_TRAITS`)
- Use `async/await` for async operations
- DOM queries: `querySelector` / `querySelectorAll`
- **No ES modules** — all files share global scope via `<script>` tags
- State is managed in `state.js` — access via `elements`, `allCocktails`, etc.

```javascript
// Good
const loadCocktails = async () => {
  const response = await fetch('./data/cocktails.json')
  return response.json()
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

Cocktail data in `data/cocktails.json`. Key fields:
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

---

## Common Tasks

### Add a new cocktail
1. Add entry to `data/cocktails.json`
2. Add image to `images/cocktails/` with matching filename
3. Verify JSON is valid

### Add new feature
1. Add constants to `constants.js`
2. Add state to `state.js` if needed
3. Add logic to appropriate module (`filter.js`, `recommend.js`, etc.)
4. Add event handlers to `events.js`
5. Wire up in `app.js`

---

## Known Issues & Solutions

- **CORS**: `fetch()` fails with `file://` — always use `python3 -m http.server 8000`
- **Duplicate declarations**: Check `state.js` before adding new global variables
- **Canvas animation**: Initialize only after `showCocktailDetail()` is called
