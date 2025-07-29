# UX Prototyping Workflow: Component-to-Prototype System

## Overview

This workflow enables rapid UX prototyping through a two-phase approach: individual component development followed by multi-page prototype assembly. The system prioritizes speed, visual fidelity, and easy iteration while maintaining consistency across components and pages.

**Speed Target**: What takes 2 hours in Webflow should take 30 minutes in conversation.

**End Goal**: High-fidelity, interactive prototypes that accurately represent the final product for user testing and stakeholder review.

---

## Core Philosophy

### Structure First, Complexity Later
1. **HTML Structure**: Semantic, accessible markup
2. **CSS Layout**: Responsive design with CSS Grid/Flexbox
3. **Basic Interactions**: Hover, focus, active states
4. **Visual Refinement**: Designer handles detailed styling
5. **Complex Interactions**: Added only after structure is locked

### Component-Driven Development
- Each component is developed in isolation first
- Components become reusable "stamps" for page assembly
- Shared CSS variables ensure visual consistency
- Single source of truth for design tokens

---

## Phase 1: Rapid Component Development

### Objective
Create isolated, standalone components optimized for speed and shareability.

### File Structure
```
prototype/
├── components/
│   ├── UserCard.html          # Standalone component demos
│   ├── NavigationBar.html     # Easy to share/review
│   ├── ProductCard.html       # Quick iteration
│   ├── SearchFilter.html      # Individual testing
│   └── ContactForm.html       # Isolated development
├── shared/
│   ├── variables.css          # Design tokens (colors, spacing, etc.)
│   └── base.css               # Global resets and utilities
└── assets/
    ├── images/                # Placeholder images
    └── icons/                 # SVG icons if needed
```

### Component Template Pattern
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ComponentName Demo</title>
    <link rel="stylesheet" href="../shared/variables.css">
    <link rel="stylesheet" href="../shared/base.css">
    <style>
        /* Component-specific CSS using shared variables */
        .component-name {
            background: var(--color-bg-card);
            border-radius: var(--radius-md);
            padding: var(--space-md);
            /* All styling uses CSS variables for easy modification */
        }
        
        .component-name:hover {
            box-shadow: var(--shadow-hover);
        }
        
        /* Mobile-first responsive design */
        @media (min-width: 768px) {
            .component-name {
                padding: var(--space-lg);
            }
        }
    </style>
</head>
<body>
    <!-- Semantic HTML structure -->
    <article class="component-name">
        <!-- Realistic placeholder content -->
        <h2>Component Title</h2>
        <p>Realistic content that represents actual use case</p>
        <button class="btn-primary">Primary Action</button>
    </article>
    
    <!-- Multiple variations for testing -->
    <article class="component-name component-name--variant">
        <!-- Different states or content variations -->
    </article>
    
    <script>
        // Basic interactions only - no complex logic
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Button clicked - ready for complex interactions later');
            });
        });
    </script>
</body>
</html>
```

### CSS Variables System (`shared/variables.css`)
```css
:root {
    /* Colors */
    --color-primary: #2563eb;
    --color-primary-hover: #1d4ed8;
    --color-secondary: #64748b;
    --color-text: #1e293b;
    --color-text-muted: #64748b;
    --color-bg: #ffffff;
    --color-bg-card: #f8fafc;
    --color-border: #e2e8f0;
    --color-error: #dc2626;
    --color-success: #059669;
    
    /* Typography */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --line-height-tight: 1.25;
    --line-height-base: 1.5;
    --line-height-relaxed: 1.75;
    
    /* Spacing */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    
    /* Layout */
    --container-sm: 640px;
    --container-md: 768px;
    --container-lg: 1024px;
    --container-xl: 1280px;
    
    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-full: 9999px;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-hover: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
    
    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-base: 300ms ease;
    --transition-slow: 500ms ease;
    
    /* Z-Index Scale */
    --z-dropdown: 10;
    --z-sticky: 20;
    --z-modal: 30;
    --z-popover: 40;
    --z-tooltip: 50;
}
```

### Phase 1 Workflow Steps

#### Step 1: Define Component Requirements
```
Component: UserCard
Purpose: Display user information with photo, name, role
States: Default, hover, loading
Content: Real user data structure
Interactions: Click to view profile (basic)
```

#### Step 2: Create Component Structure
- Semantic HTML with proper ARIA labels
- Mobile-first responsive layout
- CSS using shared variables exclusively
- Basic hover/focus states
- Realistic placeholder content

#### Step 3: Test and Iterate
- Open HTML file in browser
- Test responsive behavior
- Verify accessibility (keyboard navigation, screen reader)
- Share file for feedback
- Iterate on styling using CSS variables

#### Step 4: Document Component
```html
<!-- Add to component file -->
<!--
Component: UserCard
Props needed for Phase 2: {name, role, avatar, id}
Variants: default, compact, featured
Dependencies: variables.css, base.css
-->
```

### Phase 1 Success Criteria
- ✅ Component looks pixel-perfect at all screen sizes
- ✅ All styling uses CSS variables from shared system
- ✅ Basic interactions work (hover, focus, click)
- ✅ Accessibility requirements met
- ✅ File is easily shareable for review
- ✅ Ready for extraction to Phase 2

---

## Phase 2: Multi-Page Prototype Assembly

### Objective
Transform individual components into reusable modules and compose them into connected multi-page prototypes.

### Enhanced File Structure
```
prototype/
├── pages/
│   ├── index.html              # Homepage
│   ├── product-listing.html    # Product catalog
│   ├── product-detail.html     # Individual product
│   ├── user-profile.html       # User account
│   └── checkout.html           # Purchase flow
├── components/
│   ├── navigation.js           # Reusable navigation
│   ├── user-card.js            # User card stamp
│   ├── product-card.js         # Product card stamp
│   ├── search-filter.js        # Filter component
│   └── contact-form.js         # Form component
├── data/
│   ├── users.js                # Sample user data
│   ├── products.js             # Sample product data
│   └── navigation.js           # Menu structure
├── shared/
│   ├── variables.css           # Same design tokens
│   ├── base.css                # Global styles
│   ├── layout.css              # Page-level layouts
│   └── prototype.js            # Navigation/routing system
├── assets/
│   ├── images/                 # Organized image assets
│   └── icons/                  # SVG icon library
└── README.md                   # Setup and usage instructions
```

### Component Module Pattern
```javascript
// components/user-card.js
function createUserCard(userData, variant = 'default') {
    const variantClass = variant !== 'default' ? ` user-card--${variant}` : '';
    
    return `
        <article class="user-card${variantClass}" data-user-id="${userData.id}">
            <img src="${userData.avatar}" alt="${userData.name}" class="user-card__avatar">
            <div class="user-card__content">
                <h3 class="user-card__name">${userData.name}</h3>
                <p class="user-card__role">${userData.role}</p>
                ${userData.department ? `<span class="user-card__department">${userData.department}</span>` : ''}
            </div>
            <button class="user-card__action" data-action="view-profile">
                View Profile
            </button>
        </article>
    `;
}

// Auto-initialize for standalone demo
if (document.getElementById('user-card-demo')) {
    // Sample data for standalone testing
    const sampleUser = {
        id: 1,
        name: "Sarah Chen",
        role: "Senior Product Designer",
        department: "Design",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    };
    
    document.getElementById('user-card-demo').innerHTML = createUserCard(sampleUser);
}

// Event handling for interactive elements
document.addEventListener('click', function(e) {
    if (e.target.matches('.user-card__action')) {
        const userId = e.target.closest('.user-card').dataset.userId;
        handleUserCardClick(userId);
    }
});

function handleUserCardClick(userId) {
    // Basic prototype navigation
    console.log(`Navigate to user profile: ${userId}`);
    // In full prototype, this would route to user-profile.html?id=${userId}
}
```

### Data Structure Pattern
```javascript
// data/users.js
const users = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Senior Product Designer",
        department: "Design",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        email: "sarah.chen@company.com",
        location: "San Francisco, CA",
        status: "active"
    },
    {
        id: 2,
        name: "Mike Rodriguez",
        role: "Frontend Developer",
        department: "Engineering",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        email: "mike.rodriguez@company.com",
        location: "Austin, TX",
        status: "active"
    }
    // ... more realistic data
];

// Make data available globally
window.userData = users;
```

### Page Template Pattern
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Directory - Prototype</title>
    <link rel="stylesheet" href="../shared/variables.css">
    <link rel="stylesheet" href="../shared/base.css">
    <link rel="stylesheet" href="../shared/layout.css">
</head>
<body>
    <!-- Navigation (consistent across pages) -->
    <header id="site-navigation">
        <!-- Will be populated by navigation.js -->
    </header>
    
    <!-- Page-specific content -->
    <main class="page-container">
        <section class="page-header">
            <h1>Team Directory</h1>
            <p>Meet our amazing team members</p>
        </section>
        
        <section class="filters-section">
            <div id="search-filter">
                <!-- Will be populated by search-filter.js -->
            </div>
        </section>
        
        <section class="team-grid">
            <div id="team-members" class="grid grid--responsive">
                <!-- User cards will be populated here -->
            </div>
        </section>
    </main>
    
    <!-- Footer (consistent across pages) -->
    <footer id="site-footer">
        <!-- Will be populated by footer.js if needed -->
    </footer>
    
    <!-- Load dependencies -->
    <script src="../data/users.js"></script>
    <script src="../data/navigation.js"></script>
    <script src="../components/navigation.js"></script>
    <script src="../components/user-card.js"></script>
    <script src="../components/search-filter.js"></script>
    <script src="../shared/prototype.js"></script>
    
    <!-- Page-specific initialization -->
    <script>
        // Initialize navigation
        document.getElementById('site-navigation').innerHTML = createNavigation(navigationData.main);
        
        // Initialize search filter
        document.getElementById('search-filter').innerHTML = createSearchFilter({
            placeholder: "Search team members...",
            filters: ["All Departments", "Design", "Engineering", "Product", "Marketing"]
        });
        
        // Populate team members
        const teamContainer = document.getElementById('team-members');
        window.userData.forEach(user => {
            teamContainer.innerHTML += createUserCard(user, 'default');
        });
        
        // Initialize prototype functionality
        initializePrototype();
    </script>
</body>
</html>
```

### Prototype Navigation System
```javascript
// shared/prototype.js
function initializePrototype() {
    // Simple client-side routing for prototype
    handlePrototypeNavigation();
    initializeInteractiveElements();
}

function handlePrototypeNavigation() {
    document.addEventListener('click', function(e) {
        // Handle internal navigation links
        if (e.target.matches('a[data-route]')) {
            e.preventDefault();
            const route = e.target.dataset.route;
            navigateToPage(route);
        }
    });
}

function navigateToPage(route) {
    // Simple page navigation for prototype
    const routes = {
        'home': '../pages/index.html',
        'team': '../pages/team.html',
        'projects': '../pages/projects.html',
        'profile': '../pages/user-profile.html'
    };
    
    if (routes[route]) {
        window.location.href = routes[route];
    }
}

function initializeInteractiveElements() {
    // Add consistent interactions across all pages
    addHoverEffects();
    initializeModals();
    setupFormValidation();
}
```

### Phase 2 Migration Process

#### Step 1: Extract Component Logic
Take your Phase 1 HTML and convert it to a reusable function:

**Before (Phase 1):**
```html
<!-- UserCard.html -->
<article class="user-card">
    <img src="sarah.jpg" alt="Sarah Chen">
    <h3>Sarah Chen</h3>
    <p>Senior Designer</p>
</article>
```

**After (Phase 2):**
```javascript
// components/user-card.js
function createUserCard(user) {
    return `
        <article class="user-card">
            <img src="${user.avatar}" alt="${user.name}">
            <h3>${user.name}</h3>
            <p>${user.role}</p>
        </article>
    `;
}
```

#### Step 2: Maintain Standalone Demos
Keep your Phase 1 files working by updating them to use the new component modules:

```html
<!-- components/UserCard.html - still works for isolated testing -->
<div id="user-card-demo"></div>
<script src="user-card.js"></script>
<!-- Component auto-initializes with sample data -->
```

#### Step 3: Create Data Files
Organize your content in structured data files:

```javascript
// data/users.js
const users = [
    {name: "Sarah Chen", role: "Senior Designer", avatar: "sarah.jpg"},
    {name: "Mike Rodriguez", role: "Developer", avatar: "mike.jpg"}
];
```

#### Step 4: Compose Pages
Build complete pages using your component modules:

```html
<!-- pages/team.html -->
<div id="team-grid"></div>
<script src="../data/users.js"></script>
<script src="../components/user-card.js"></script>
<script>
    users.forEach(user => {
        document.getElementById('team-grid').innerHTML += createUserCard(user);
    });
</script>
```

### Phase 2 Success Criteria
- ✅ Components are reusable across multiple pages
- ✅ Data is separated from presentation
- ✅ Pages link together with consistent navigation
- ✅ Changes to a component reflect across all pages
- ✅ Prototype feels like a real application
- ✅ Easy to update content without touching code

---

## Component Structure Guardian

### Purpose
An AI subagent that enforces simplicity and consistency throughout the workflow.

### Activation Triggers
- Before creating any new component
- When adding complexity to existing components
- During Phase 1 to Phase 2 migration
- When components exceed complexity thresholds

### Enforcement Rules

#### Structure Before Complexity
```
❌ STOP: Adding complex interactions before structure is solid
✅ BUILD: HTML structure → CSS layout → Basic states → THEN interactions
```

#### Single Responsibility Components
```
❌ BLOCK: Components doing multiple jobs
✅ ENFORCE: One clear purpose per component
```

#### Component Health Metrics
- **File size**: <150 lines per component
- **Props count**: <8 props per component
- **State hooks**: <3 useState per component (when using React)
- **Nesting depth**: <4 levels in HTML
- **CSS variables**: All styling uses shared variables

### Intervention Responses

#### Complexity Detected
```
🛑 Structure Guardian Alert

Issue Detected: Adding complex state management before layout is finalized

Recommended Approach:
1. Focus on: Responsive layout and basic styling
2. Defer: Complex form validation logic
3. Quick win: Get hover states working first

Next Steps: Lock in the visual design, then we'll add form validation.
```

#### Migration Guidance
```
🔄 Phase 2 Migration Ready

This component is stable and ready for extraction:
- ✅ Layout works across screen sizes
- ✅ Uses CSS variables consistently
- ✅ Basic interactions implemented
- ✅ Content structure is clear

Suggested extraction: Convert to createComponentName(data) function
```

---

## Tools and Setup

### Required Tools
- **Code Editor**: VS Code with Live Server extension
- **Browser**: Chrome/Firefox with Developer Tools
- **Local Server**: Live Server extension or `python -m http.server`

### Optional Tools
- **Image Assets**: Unsplash for placeholder images
- **Icons**: Heroicons or Feather Icons (inline SVG)
- **Fonts**: System fonts or Google Fonts CDN

### Project Initialization
```bash
# Create project structure
mkdir prototype
cd prototype
mkdir components pages data shared assets
mkdir assets/images assets/icons

# Initialize basic files
touch shared/variables.css shared/base.css shared/layout.css
touch shared/prototype.js
touch README.md
```

### Development Server
```bash
# Option 1: VS Code Live Server
# Right-click any HTML file → "Open with Live Server"

# Option 2: Python server
cd prototype
python -m http.server 8000
# Open http://localhost:8000
```

---

## Quality Assurance

### Phase 1 Checklist
- [ ] Component displays correctly on mobile, tablet, desktop
- [ ] All styling uses CSS variables from shared system
- [ ] Hover, focus, and active states work properly
- [ ] Content is realistic and representative
- [ ] File can be easily shared and opened by others
- [ ] Basic accessibility requirements met
- [ ] Component purpose is clear and focused

### Phase 2 Checklist
- [ ] Component function generates consistent HTML
- [ ] Data structure supports all use cases
- [ ] Component works across multiple pages
- [ ] Navigation between pages functions properly
- [ ] Changes to shared styles update everywhere
- [ ] Prototype feels cohesive and realistic
- [ ] Performance is acceptable (pages load quickly)

### Accessibility Standards
- Semantic HTML elements (`<article>`, `<button>`, `<nav>`)
- Proper heading hierarchy (`<h1>`, `<h2>`, `<h3>`)
- Alt text for all images
- Focus indicators for interactive elements
- Keyboard navigation support
- Sufficient color contrast ratios

---

## Troubleshooting

### Common Phase 1 Issues

**CSS Variables Not Working**
```css
/* ❌ Wrong - variable not defined */
.component { color: var(--undefined-color); }

/* ✅ Correct - define in variables.css first */
:root { --text-color: #333; }
.component { color: var(--text-color); }
```

**Responsive Layout Problems**
```css
/* ❌ Wrong - desktop-first approach */
.component { 
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
}

/* ✅ Correct - mobile-first approach */
.component { 
    display: grid; 
    grid-template-columns: 1fr;
}
@media (min-width: 768px) {
    .component { grid-template-columns: 1fr 1fr 1fr; }
}
```

### Common Phase 2 Issues

**Component Function Not Working**
```javascript
// ❌ Wrong - function not returning HTML
function createCard(data) {
    console.log(data.name);
}

// ✅ Correct - return HTML string
function createCard(data) {
    return `<div class="card">${data.name}</div>`;
}
```

**Data Not Loading**
```html
<!-- ❌ Wrong - script order matters -->
<script src="components/user-card.js"></script>
<script src="data/users.js"></script>

<!-- ✅ Correct - load data first -->
<script src="data/users.js"></script>
<script src="components/user-card.js"></script>
```

---

## Success Metrics

### Speed Benchmarks
- **Individual Component**: 30 minutes from concept to shareable demo
- **Component Migration**: 15 minutes to extract from Phase 1 to Phase 2
- **New Page Creation**: 20 minutes using existing components
- **Design Iteration**: 5 minutes to update styling across entire prototype

### Quality Benchmarks
- **Visual Fidelity**: Matches design specifications pixel-perfectly
- **Responsiveness**: Works seamlessly on mobile, tablet, desktop
- **Consistency**: Design system applied uniformly across all components
- **Shareability**: Any stakeholder can open and interact with prototype
- **Maintainability**: Design changes can be made in minutes, not hours

### User Experience Benchmarks
- **Navigation**: Intuitive movement between prototype pages
- **Interactions**: Realistic feedback for all interactive elements
- **Performance**: Pages load instantly on local development
- **Accessibility**: Usable with keyboard and screen readers
- **Content**: Realistic data that represents actual use cases

---

This workflow transforms UX design concepts into high-fidelity, interactive prototypes optimized for rapid iteration and stakeholder communication. The two-phase approach balances speed with scalability, ensuring components remain simple during initial development while supporting complex multi-page prototypes when needed.