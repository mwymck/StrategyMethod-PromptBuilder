# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a UX prototyping system for the StrategyMethod Prompt Builder, implementing a two-phase development workflow optimized for rapid component creation and multi-page prototype assembly. The system prioritizes speed (30-minute component creation target), visual fidelity, and easy iteration.

## Development Commands

### Local Development Server
```bash
# Start development server (choose one)
cd prototype
python -m http.server 8000  # Then open http://localhost:8000

# Or use VS Code Live Server extension
# Right-click any HTML file → "Open with Live Server"
```

### Component Development Workflow
```bash
# Phase 1: Create standalone component
# Create file: prototype/components/ComponentName.html
# Link to: ../shared/variables.css, ../shared/base.css
# Test in isolation before moving to Phase 2

# Phase 2: Extract to reusable modules  
# Convert HTML to JavaScript functions in prototype/components/
# Create data files in prototype/data/
# Build page templates in prototype/pages/
```

## Architecture Overview

### Two-Phase Development System

**Phase 1 - Rapid Component Development:**
- Create self-contained HTML files in `prototype/components/`
- Use embedded CSS with shared design tokens from `shared/variables.css`
- Include multiple component states and realistic content
- Target: 30 minutes from concept to shareable demo

**Phase 2 - Prototype Assembly:**
- Extract components into `createComponentName(data)` JavaScript functions
- Separate content into structured data files (`prototype/data/`)
- Combine components into full page templates (`prototype/pages/`)
- Add navigation system via `shared/prototype.js`

### Design System Architecture

**CSS Variable System (`shared/variables.css`):**
- 67+ design tokens covering colors, typography, spacing, shadows, transitions
- Prompt Builder specific tokens: `--color-electric-blue-500`, `--color-chip-bg`, etc.
- All component styling must use these variables - no hardcoded values

**File Structure:**
```
prototype/
├── components/     # Phase 1: *.html standalone demos
├── pages/         # Phase 2: *.html complete pages  
├── data/          # Phase 2: *.js structured content
├── shared/        # Design system and utilities
│   ├── variables.css  # Design tokens (67+ CSS variables)
│   ├── base.css       # Reset, typography, utilities
│   ├── layout.css     # Page-level components (cards, buttons, forms)
│   └── prototype.js   # Navigation and interaction system
└── assets/        # Images and icons
```

### Component Template Pattern

All Phase 1 components follow this structure:
- Semantic HTML with proper ARIA attributes
- Mobile-first responsive design
- Multiple states/variations for testing
- CSS using shared variables exclusively
- Basic interactions only (complex logic deferred to Phase 2)
- Realistic placeholder content (no lorem ipsum)

## Specialized Sub-agents

This project includes three specialized AI agents for different tasks:

- **`phase1-component-creator`**: Creates standalone HTML/CSS components with semantic structure, accessibility compliance, and responsive design
- **`css-system-guardian`**: Enforces design system compliance, detects hardcoded values, maintains CSS variable usage
- **`prototype-assembler`**: Handles Phase 1 to Phase 2 migration, extracts components to JavaScript functions, builds multi-page prototypes

## Speed Targets

- Individual component creation: 30 minutes
- Component migration (Phase 1 → Phase 2): 15 minutes  
- New page creation: 20 minutes
- Design iteration across prototype: 5 minutes

## Component Requirements (Section Card Focus)

The primary component being developed is a Section Card with:
- Collapsible/expandable states for optional sections
- Rich text input with @ reference system (Field/Prompt references)
- Character counting with progressive feedback (normal → warning → error)
- Text input size controls (Small/Medium/Large)
- Alert/notification system integration
- Multiple input field management (add/remove functionality)
- Responsive behavior for mobile touch interaction

## Quality Standards

- Semantic HTML structure (use `<article>`, `<section>`, `<header>` appropriately)
- CSS variables for all styling (zero hardcoded values)
- Mobile-first responsive design
- Keyboard navigation and ARIA compliance
- Component states documented and visually distinct
- Cross-browser compatibility maintained