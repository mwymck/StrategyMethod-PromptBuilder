# StrategyMethod Prompt Builder - UX Prototype

This prototype follows a two-phase development workflow optimized for rapid UX prototyping and iteration.

## Project Structure

```
prototype/
├── components/          # Phase 1: Standalone component demos
│   └── *.html          # Self-contained component files
├── pages/              # Phase 2: Multi-page prototype
│   └── *.html          # Complete page templates
├── data/               # Phase 2: Sample data files
│   └── *.js            # Structured content for components
├── shared/
│   ├── variables.css   # Design tokens and CSS variables
│   ├── base.css        # Global styles and utilities
│   ├── layout.css      # Page-level layout components
│   └── prototype.js    # Navigation and interaction system
└── assets/
    ├── images/         # Image assets
    └── icons/          # SVG icons
```

## Development Workflow

### Phase 1: Component Development
1. Create standalone HTML components in `components/`
2. Use CSS variables from `shared/variables.css`
3. Focus on visual fidelity and responsive behavior
4. Test components in isolation

**Speed Target**: 30 minutes from concept to shareable demo

### Phase 2: Interactive Prototype Assembly
1. Add mock interactions (reference system, form behaviors)
2. Extract components into reusable JavaScript functions
3. Build multi-page prototype with navigation
4. Create Webflow-equivalent interactive prototype for user testing

**Speed Targets**:
- Component migration: 15 minutes
- New page creation: 20 minutes
- Design iteration: 5 minutes

## Getting Started

### Local Development
```bash
# Option 1: VS Code Live Server
# Right-click any HTML file → "Open with Live Server"

# Option 2: Python server
cd prototype
python -m http.server 8000
# Open http://localhost:8000
```

### Creating Components
1. Start with `components/ComponentName.html`
2. Use the established HTML template pattern
3. Link to shared CSS files
4. Include multiple states and variations
5. Test responsiveness and accessibility

## Design System

All styling uses CSS variables from `shared/variables.css`:
- Colors: `--color-*`
- Spacing: `--space-*`
- Typography: `--font-*`
- Shadows: `--shadow-*`
- Transitions: `--transition-*`

## Quality Standards

- ✅ Semantic HTML with proper ARIA attributes
- ✅ Mobile-first responsive design
- ✅ CSS variables for all styling
- ✅ Keyboard navigation support
- ✅ Realistic placeholder content
- ✅ Cross-browser compatibility

## Sub-agents Available

- `phase1-component-creator`: Creates Phase 1 components
- `css-system-guardian`: Enforces design system compliance
- `prototype-assembler`: Handles Phase 2 migration, adds mock interactions, builds Webflow-equivalent prototypes