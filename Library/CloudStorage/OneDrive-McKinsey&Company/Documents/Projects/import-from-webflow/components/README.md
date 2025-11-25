# Component Architecture

This directory contains all reusable UI components following a modular, component-based architecture.

## Component Structure

Each component should be self-contained in its own directory:

```
components/
└── component-name/
    ├── component-name.css      # Component-specific styles
    ├── component-name.js        # Component logic and rendering
    └── component-name.data.js  # Component data (optional, if large/complex)
```

## Naming Conventions

- **Component folder**: `kebab-case` (e.g., `project-card`, `navigation-menu`)
- **CSS file**: `component-name.css`
- **JavaScript file**: `component-name.js`
- **CSS classes**: BEM methodology
  - Block: `.component-name`
  - Element: `.component-name__element`
  - Modifier: `.component-name--modifier`

## Component Requirements

### 1. Self-Contained
- All component-specific styles in `component-name.css`
- All component logic in `component-name.js`
- Component should work independently

### 2. Single Responsibility
- One component = one purpose
- Each component solves a specific UI problem
- Avoid mixing concerns

### 3. Reusable
- Components should be portable
- No hard dependencies on specific page structure
- Use semantic class names (not page-specific)

### 4. Documented
- Include JSDoc comments in JavaScript
- Document CSS classes and their purpose
- Provide usage examples

### 5. Tested
- Verify component works in isolation
- Test responsive breakpoints
- Ensure accessibility

## Creating a New Component

### Step 1: Create Component Directory
```bash
mkdir -p components/my-component
```

### Step 2: Create Component Files
- `components/my-component/my-component.css` - Component styles
- `components/my-component/my-component.js` - Component logic

### Step 3: Add Component to HTML
```html
<!-- Component Styles -->
<link rel="stylesheet" href="components/my-component/my-component.css">
<!-- Component Scripts -->
<script src="components/my-component/my-component.js" defer></script>
```

### Step 4: Use Component
Add the component's HTML structure or let JavaScript render it.

## Component CSS Guidelines

- **Scope**: Only include styles for the component itself
- **No global styles**: Don't modify global elements unless necessary
- **Use CSS variables**: Leverage design tokens from design system
- **Responsive**: Include all breakpoints within component CSS
- **BEM naming**: Follow Block__Element--Modifier pattern

## Component JavaScript Guidelines

- **Encapsulation**: Keep component logic isolated
- **Initialization**: Component should initialize itself
- **DOM ready**: Handle DOMContentLoaded appropriately
- **Error handling**: Include error handling for missing elements
- **Documentation**: Use JSDoc for functions and data structures

## Example: Project Card Component

See `components/project-card/` for a complete example:

- **project-card.css**: All project card styles including responsive breakpoints
- **project-card.js**: Component logic, data, and rendering functions

## Best Practices

1. **Keep components small**: One component = one UI element
2. **Avoid nesting**: Don't create components within components unnecessarily
3. **Use design tokens**: Reference CSS variables from design system
4. **Maintain consistency**: Follow established patterns
5. **Update documentation**: Keep README and component docs current

## File Organization

- **Global styles**: `styles.css` (layout, reset, global utilities)
- **Component styles**: `components/[component-name]/[component-name].css`
- **Component scripts**: `components/[component-name]/[component-name].js`
- **Assets**: `assets/` (images, fonts, etc.)

## Migration Checklist

When refactoring existing code into components:

- [ ] Extract component-specific CSS to component folder
- [ ] Move component JavaScript to component folder
- [ ] Update HTML to load component CSS and JS
- [ ] Remove component styles from global stylesheet
- [ ] Verify component works independently
- [ ] Update documentation

## Questions?

Refer to existing components (e.g., `project-card`) as examples, or consult the main `README.md` for project-wide conventions.

