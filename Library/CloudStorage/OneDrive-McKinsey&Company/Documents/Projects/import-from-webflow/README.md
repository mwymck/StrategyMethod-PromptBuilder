# Drawings & Renderings

A portfolio site showcasing architectural drawings and renderings.

## Setup

### Design System

This project uses the Material Design 3 design system. To set up:

```bash
# Add design system as git submodule
git submodule add https://github.com/mwyuwono/m3-guidelines.git design-system

# Initialize submodules
git submodule update --init --recursive
```

Once the design system is installed, design tokens will be automatically loaded from `design-system/tokens/material3.web.css`.

## Project Structure

```
/
├── index.html              # Main page
├── styles.css              # Global styles (layout, reset, utilities)
├── components/             # Reusable UI components
│   ├── project-card/       # Project card component
│   │   ├── project-card.css
│   │   └── project-card.js
│   └── README.md          # Component architecture guidelines
├── design-system/         # Design system (git submodule)
├── assets/
│   ├── images/             # Image assets (logo, project images)
│   └── pdfs/               # PDF files (project documents)
└── README.md              # This file
```

## Assets

All assets have been imported from Webflow and are stored locally:

- **Logo**: `assets/images/wy-logo.svg`
- **Project Images**: All responsive image variants in `assets/images/`
- **PDFs**: Project documents in `assets/pdfs/`

The site no longer depends on Webflow CDN URLs - all assets are self-hosted.

## Component Architecture

This project follows a **modular component-based architecture**. Each component is self-contained with its own CSS and JavaScript files.

### Component Structure

All components live in the `components/` directory:

```
components/
└── component-name/
    ├── component-name.css  # Component-specific styles
    └── component-name.js   # Component logic and rendering
```

### Component Guidelines

- **Self-contained**: Each component includes its own CSS and JS
- **Single responsibility**: One component = one UI element
- **Reusable**: Components are portable and independent
- **Documented**: Components include usage examples

See `components/README.md` for detailed component architecture guidelines and best practices.

### Components

#### Project Card Component

Location: `components/project-card/`

The project cards are rendered using a modular component with self-contained styles and logic.

**To add a new project:**
1. Edit `components/project-card/project-card.js`
2. Add a new object to the `projects` array:

```javascript
{
  title: 'Project Name',
  pdfUrl: 'assets/pdfs/project-name.pdf',
  image: {
    src: 'assets/images/project-name.jpg',
    srcset: 'assets/images/project-name-500.jpg 500w, ...',
    sizes: '(max-width: 479px) 30vw, ...',
    alt: 'Project Name'
  }
}
```

The component automatically renders all projects in the `projects` array into the `.project-grid` container.

**To modify project card styling:**
- Edit `components/project-card/project-card.css`
- All component-specific styles are contained in this file
- Changes automatically apply to all project cards

**To modify project card behavior:**
- Edit `components/project-card/project-card.js`
- Component logic is isolated and self-contained

## Code Conventions

### Naming Conventions
- **Components**: `kebab-case` folder names (e.g., `project-card`)
- **CSS classes**: BEM methodology
  - Block: `.component-name`
  - Element: `.component-name__element`
  - Modifier: `.component-name--modifier`
- **Files**: `component-name.css`, `component-name.js`

### HTML5
- Use semantic elements (`<header>`, `<main>`, `<section>`)
- Maintain accessibility standards

### CSS
- **Global styles**: `styles.css` (layout, reset, utilities only)
- **Component styles**: `components/[component-name]/[component-name].css`
- Use design tokens via CSS custom properties
- Keep component styles scoped to components

### JavaScript
- **Component scripts**: `components/[component-name]/[component-name].js`
- Use JSDoc for documentation
- Handle DOM ready states appropriately

## Development

Open `index.html` in a browser to view the site locally.

