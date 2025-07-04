# MVIP (McKinsey Value Intelligence Platform) Documentation

## Executive Summary

This documentation provides comprehensive implementation guidance for the McKinsey Value Intelligence Platform (MVIP) - a Webflow-exported prototype containing two products: **MVIA** (McKinsey Value Intelligence Assistant) and **StrategyFlow**. The documentation enables one-to-one fidelity reconstruction using standard web development workflows.

**Status**: ✅ Complete - Ready for implementation
**Products**: MVIA (5 pages) + StrategyFlow (4 pages) + Shared Components
**Architecture**: Multi-product component system with shared infrastructure

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Shared Components](#shared-components)
3. [MVIA Product Documentation](#mvia-product-documentation)
4. [StrategyFlow Product Documentation](#strategyflow-product-documentation)
5. [Implementation Roadmap](#implementation-roadmap)
6. [Migration Planning](#migration-planning)

---

## Architecture Overview

### Multi-Product Component System

The MVIP platform uses a sophisticated multi-product architecture where components adapt behavior based on product context while maintaining visual consistency.

**Core Architecture Principles:**
- **Product Detection**: `document.body.dataset.product` determines active product ('mvia' or 'strategyflow')
- **JSON Configuration**: Product-specific data from `/json/mvia.json` and `/json/sf.json`  
- **Component Adaptation**: Shared components with product-specific behavior flags
- **State Isolation**: Entity selections don't persist across product switches

### Technology Stack

**Frontend Foundation:**
- **HTML5**: Semantic structure with data attributes for component identification
- **CSS3**: Custom properties system (2,200+ variables), CSS Grid, Flexbox
- **JavaScript**: ES6+ component architecture, JSON data integration
- **Responsive**: Mobile-first design with 5 breakpoints

**Key Dependencies:**
- **Fonts**: McKinsey Sans family + Bower Bold (verify licensing)
- **Icons**: Material Symbols (external CDN)
- **Data**: Local JSON files (migrated from GitHub Gists)

### Component Reusability Matrix

| Component | MVIA | StrategyFlow | Shared Implementation |
|-----------|------|-------------|----------------------|
| **Global Header** | ✅ | ✅ | 100% - Product-agnostic navigation |
| **Search System** | ✅ | ✅ | 80% - Shared core, different features |
| **Product Naming** | ✅ | ✅ | 100% - Dynamic via `data-product-name` |
| **Binary Toggle** | ✅ | ✅ | 100% - Company/Industry switching |
| **Modal System** | ✅ | ✅ | 90% - Different content, same mechanics |
| **Loading States** | ✅ | ✅ | 100% - GenAI simulation system |

---

## Shared Components

### 1. Global Header System

**Purpose**: Product-agnostic navigation with dynamic branding
**Reusability**: 100% shared across all pages

**Core Structure:**
```html
<div class="global-header-local-wrap">
  <div class="global-header-container">
    <div class="global-header-left-section">
      <div data-product-name="">Value Intelligence Platform</div>
      <div class="global-header-tabs-container">
        <!-- Product-specific navigation injected here -->
      </div>
    </div>
    <div class="global-header-right-section">
      <div data-js="avatar-wrap" class="avatar-menu-wrap">
        <!-- User avatar and dropdown -->
      </div>
    </div>
  </div>
</div>
```

**Key Features:**
- **Auto-hide behavior**: Disappears on scroll down, reappears on scroll up
- **Product-specific navigation**: Tabs change based on `data-product` context
- **User avatar dropdown**: Settings, Saved items, Log out
- **Responsive**: Collapses navigation on mobile (<768px)

### 2. Enhanced Search System

**Purpose**: Unified search interface for company/industry selection
**Reusability**: 80% shared core with product-specific extensions

#### Shared Search Architecture

**Base HTML Structure:**
```html
<div class="search-form-wrap w-form">
  <form class="search-wrap" method="get">
    <div class="search-components-wrap">
      <!-- Main Search Component -->
      <div data-search-component="main" class="search-chip">
        <div class="search-bar-icon">search</div>
        <input class="search-input" data-search-input="field" 
               placeholder="Company search" type="text">
        <div data-search-clear="button" class="data-search-clear">close</div>
        
        <!-- Search Results Dropdown -->
        <div data-search-enhanced="results" class="search-results">
          <div class="search-result-item">
            <div class="result-company-name">Company name</div>
            <div class="result-unavailable-tooltip">Unavailable</div>
          </div>
        </div>
      </div>
      
      <!-- Binary Toggle Component -->
      <div data-search-type="selector" class="search-type-selector">
        <div class="binary-button-track">
          <div class="binary-button-option" data-toggle="company">Company</div>
          <div class="binary-button-option" data-toggle="industry">Industry</div>
        </div>
      </div>
    </div>
  </form>
</div>
```

**Shared JavaScript Controller:**
```javascript
class EnhancedSearchController {
  constructor(productConfig) {
    this.productId = productConfig.productId;
    this.searchVariant = productConfig.searchVariant;
    this.currentSearchType = 'company';
    this.savedQueries = { company: '', industry: '' };
  }
  
  async initialize() {
    await this.waitForJsonData();
    this.loadStoredEntity();
    this.bindEventListeners();
  }
  
  // Product-specific extensions override this
  handleSelection(entityType, entityName) {
    // Base implementation - products can extend
  }
}
```

#### Product-Specific Search Extensions

**MVIA Search Features:**
- **Peer Management Integration**: Selected companies trigger peer suggestion system
- **Dashboard Navigation**: Company selection → Dashboard, Industry → Industry Overview
- **State Persistence**: Entity + peer selections maintained across dashboard pages

**StrategyFlow Search Features:**
- **Info Tiles System**: Educational content tiles with modal explanations
- **Analysis Navigation**: Company/Industry selection → Analysis Configuration
- **Immediate Industry Dropdown**: Industry search shows results without typing delay

### 3. Product Naming System

**Purpose**: Dynamic product branding across all pages
**Implementation**: All product names populated via `data-product-name` attributes

**Configuration:**
```javascript
const productNames = {
  'mvia': 'Operational Performance Assistant',
  'strategyflow': 'Strategic Analysis Platform'
};

// Applied to all elements with data-product-name
document.querySelectorAll('[data-product-name]').forEach(element => {
  element.textContent = productNames[currentProduct];
});
```

### 4. Modal System

**Purpose**: Consistent modal behavior across info displays, legal disclaimers, and product information
**Reusability**: 90% shared with different content templates

**Base Modal Structure:**
```html
<div class="modal-backdrop" data-modal="backdrop">
  <div class="modal-container">
    <div class="modal-header">
      <h3 class="modal-title">Modal Title</h3>
      <div class="modal-close" data-modal="close">close</div>
    </div>
    <div class="modal-content">
      <!-- Dynamic content injected here -->
    </div>
  </div>
</div>
```

### 5. Loading Simulation System

**Purpose**: GenAI processing simulation with context-specific durations
**Implementation**: Artificial loading states that enhance perceived AI processing

**Loading Duration Configuration:**
```javascript
const loadingDurations = {
  'analysis-generation': 4000,    // StrategyFlow analysis creation
  'peer-comparison': 2500,        // MVIA peer analysis
  'question-analysis': 3500,      // MVIA strategic questions
  'search-results': 1000,         // General search responsiveness
  'default': 3000
};
```

---

## MVIA Product Documentation

### Product Overview
MVIA (McKinsey Value Intelligence Assistant) is a company performance analysis tool focused on dashboard-style KPI analysis with peer comparison capabilities.

### Page Structure
1. **Company Search** (`/mvia/mvia-search.html`) - Entry point with search and peer selection
2. **Company Overview** (`/mvia/overview.html`) - Two-column KPI dashboard with driver expansion
3. **Peer Comparison** (`/mvia/peer-comparison.html`) - Competitive analysis with peer management
4. **Questions** (`/mvia/questions.html`) - Single-column strategic questions interface
5. **Product Overview** (`/mvia/product-overview.html`) - Legal disclaimers and AI transparency

### Key MVIA Features

#### 1. Two-Column Dashboard Layout
**Purpose**: KPI display with expandable driver analysis
**Responsive Behavior**: Collapses to overlay on mobile (<768px)

**Layout States:**
- **Default**: 100% left column (KPIs only)
- **Drivers Expanded**: 40% left / 60% right split
- **Mobile**: Overlay system with driver panel covering KPIs

#### 2. KPI Card System
**Purpose**: Performance metric display with benchmark indicators and driver expansion

**Card Structure:**
```html
<div class="kpi-card-wrap" data-card-type="kpi">
  <div class="kpi-card-header">
    <div class="kpi-card-title">Revenue Growth</div>
    <div class="kpi-card-benchmark" data-kpi-benchmark="thumb_up">
      <div class="icon">thumb_up</div>
    </div>
  </div>
  <div class="kpi-card-content">
    <div class="kpi-card-value">12.3%</div>
    <div class="kpi-card-context">vs. 8.1% industry average</div>
  </div>
  <div class="kpi-card-footer">
    <div class="kpi-drivers-button" data-kpi-show-drivers="revenue-growth">
      Show drivers
    </div>
  </div>
</div>
```

#### 3. Driver Expansion System
**Purpose**: Detailed analysis of KPI contributing factors

**Animation Pattern:**
```css
.columns-container {
  transition: all 300ms ease;
}

.columns-container.right-visible {
  grid-template-columns: 40% 60%;
}

.columns-container.right-visible .drivers-panel {
  transform: translateX(0);
  opacity: 1;
}
```

#### 4. Peer Management System
**Purpose**: Competitive company selection and comparison

**Peer Categories:**
- **Selected Peers**: Currently chosen companies for comparison
- **Suggested Peers**: Algorithm-recommended companies
- **Secondary Peers**: Extended comparison options

**Peer Selection Interface:**
```html
<div data-peer-lists="container" class="peer-lists-wrap">
  <div data-peer-chips="selected" class="peer-chips-selected">
    <div class="peer-chip">
      <div class="peer-company-name">Tesla</div>
      <div class="peer-remove-button" data-peer-remove="tesla">close</div>
    </div>
  </div>
  
  <div data-peer-chips="suggested" class="peer-chips-suggested">
    <div class="peer-chip suggested" data-peer-add="rivian">
      <div class="peer-company-name">Rivian</div>
      <div class="peer-add-button">add</div>
    </div>
  </div>
</div>
```

### MVIA Data Structure (`/json/mvia.json`)

**Key Data Objects:**
```json
{
  "config": {
    "productName": "Operational Performance Assistant",
    "searchTypes": ["company", "industry"],
    "showDriverButtons": true
  },
  "subject": {
    "name": "Polestar",
    "industry": "Electric Vehicle Manufacturing"
  },
  "peers": {
    "initial": ["Tesla", "Rivian"],
    "suggested": ["Lucid Motors", "Ford", "General Motors"],
    "secondary": ["Mercedes-Benz", "BMW", "Volkswagen"]
  },
  "kpis": [
    {
      "id": "revenue-growth",
      "title": "Revenue Growth",
      "value": "12.3%",
      "context": "vs. 8.1% industry average",
      "benchmark": "thumb_up",
      "pageId": "overview",
      "drivers": [
        {
          "title": "Market Expansion",
          "contribution": "+8.2%",
          "description": "Geographic expansion into European markets"
        }
      ]
    }
  ]
}
```

### MVIA User Journey Flow

1. **Search Entry**: User searches for company → Enhanced search provides autocomplete
2. **Peer Selection**: User selects initial peer companies for comparison
3. **Dashboard Navigation**: User proceeds to Company Overview dashboard
4. **KPI Analysis**: User explores KPIs and expands drivers for detailed analysis
5. **Peer Comparison**: User navigates to peer comparison for competitive analysis
6. **Strategic Questions**: User accesses executive-level strategic questions
7. **Legal Review**: User reviews product disclaimers and AI transparency information

---

## StrategyFlow Product Documentation

### Product Overview
StrategyFlow is a strategic planning application focused on multi-step analysis generation with comprehensive configuration workflows and library management.

### Page Structure
1. **Search** (`/strategyflow/sf-search.html`) - Industry-focused search with info tiles
2. **Analysis Configuration** (`/strategyflow/analysis.html`) - Multi-step analysis workflow
3. **Library** (`/strategyflow/library.html`) - Analysis tracking and download management
4. **Product Overview** (`/strategyflow/sf-product-overview.html`) - Legal disclaimers with StrategyFlow branding

### Key StrategyFlow Features

#### 1. Info Tiles System
**Purpose**: Educational content tiles explaining analysis capabilities

**Tile Structure:**
```html
<div class="info-tiles-section">
  <div class="info-tile">
    <div class="info-tile-header">
      <div class="info-tile-icon">insights</div>
      <div class="info-tile-title">Strategic Journey</div>
    </div>
    <div class="info-tile-content">
      <div class="info-tile-description">
        Comprehensive strategic analysis from current state to future vision
      </div>
      <div class="info-tile-actions">
        <div class="info-tile-button" data-modal-trigger="strategic-journey">
          Outputs summary
        </div>
      </div>
    </div>
  </div>
</div>
```

#### 2. Multi-Step Analysis Configuration
**Purpose**: Guided workflow for configuring strategic analyses

**Analysis Types:**
- **Strategic Journey**: Current state → Future vision pathway
- **Market Trends**: Industry analysis and trend identification  
- **Competitive Landscape**: Competitor analysis and positioning

**Configuration Workflow:**
```html
<div class="analysis-configuration-container">
  <div class="analysis-selector-section">
    <div class="analysis-type-card" data-analysis-selector="strategic-journey">
      <div class="analysis-type-title">Strategic Journey</div>
      <div class="analysis-type-description">...</div>
      <div class="analysis-select-button" data-analysis-action="select">
        Select analysis
      </div>
    </div>
  </div>
  
  <div class="analysis-config-panel" data-config-panel="strategic-journey">
    <div class="config-section" data-analysis-section="strategic-journey">
      <div class="config-field-group">
        <label class="config-field-label">Analysis Focus</label>
        <select class="config-dropdown" data-analysis-field="focus">
          <option>Market Entry Strategy</option>
          <option>Competitive Positioning</option>
          <option>Growth Strategy</option>
        </select>
      </div>
    </div>
  </div>
</div>
```

#### 3. Library Management System
**Purpose**: Track analysis status and provide download management

**Status Categories:**
- **Complete**: Analysis finished, ready for download
- **In Progress**: Analysis being generated (with progress indication)
- **Failed**: Analysis failed, retry available
- **Queued**: Analysis queued for processing

**Library Table Structure:**
```html
<div class="library-table-container" data-library="container">
  <div class="library-table-header">
    <div class="library-header-cell">Analysis</div>
    <div class="library-header-cell">Status</div>
    <div class="library-header-cell">Actions</div>
  </div>
  
  <div class="library-table-body" data-library-content="body">
    <div class="library-table-row">
      <div class="library-cell-content">
        <div class="library-analysis-name">Strategic Journey - Polestar</div>
        <div class="library-analysis-date">Generated July 2, 2025</div>
      </div>
      <div class="library-cell-status">
        <div class="library-status-badge complete" data-library-status="complete">
          Complete
        </div>
      </div>
      <div class="library-cell-actions">
        <div class="library-action-button" data-library-action="download">
          <div class="icon">download</div>
          Download
        </div>
      </div>
    </div>
  </div>
</div>
```

### StrategyFlow Data Structure (`/json/sf.json`)

**Key Data Objects:**
```json
{
  "config": {
    "productName": "Strategic Analysis Platform",
    "searchTypes": ["company", "industry"],
    "analysisTypes": ["strategic-journey", "market-trends", "competitive-landscape"]
  },
  "analysisOptions": {
    "strategic-journey": {
      "title": "Strategic Journey",
      "description": "Comprehensive strategic analysis",
      "configFields": [
        {
          "id": "focus",
          "label": "Analysis Focus",
          "type": "dropdown",
          "options": ["Market Entry Strategy", "Competitive Positioning", "Growth Strategy"]
        }
      ]
    }
  },
  "library": [
    {
      "id": "analysis-001",
      "name": "Strategic Journey - Polestar",
      "type": "strategic-journey",
      "status": "complete",
      "generatedDate": "2025-07-02",
      "downloadUrl": "/analyses/strategic-journey-polestar.pdf"
    }
  ]
}
```

### StrategyFlow User Journey Flow

1. **Search Entry**: User searches for company/industry → Enhanced search with immediate industry dropdown
2. **Info Tiles Review**: User explores analysis type explanations via info tiles
3. **Analysis Configuration**: User selects analysis types and configures parameters
4. **Generation Initiation**: User initiates analysis generation with loading simulation
5. **Library Management**: User tracks analysis progress and downloads completed analyses
6. **Legal Review**: User reviews product disclaimers and multi-tenant legal framework

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
**Priority**: Critical infrastructure for both products

#### 1.1 Asset Migration & Optimization
- [ ] **Font Licensing**: Verify McKinsey Sans usage rights outside Webflow
- [ ] **Image Optimization**: Convert 15 PNG charts to WebP (43% size reduction)
- [ ] **External Dependencies**: Download jQuery 3.5.1 locally, replace Webflow CDN links
- [ ] **Icon System**: Implement Material Symbols with proper loading strategy

#### 1.2 Multi-Product Architecture Setup
- [ ] **Product Detection System**: Implement `data-product` attribute detection
- [ ] **JSON Configuration**: Set up local data loading from `/json/mvia.json` and `/json/sf.json`
- [ ] **Dynamic Product Naming**: Implement `data-product-name` population system
- [ ] **Shared Component Library**: Create base component classes for extension

### Phase 2: Shared Components (Weeks 3-4)
**Priority**: High-reuse components that serve both products

#### 2.1 Global Header System
- [ ] **Auto-hide Navigation**: Implement scroll-based header visibility
- [ ] **Product-Specific Tabs**: Dynamic navigation based on product context
- [ ] **Avatar Dropdown**: User account management interface
- [ ] **Responsive Behavior**: Mobile navigation collapse (<768px)

#### 2.2 Enhanced Search System
- [ ] **Base Search Controller**: Shared `EnhancedSearchController` class
- [ ] **Binary Toggle**: Company/Industry switching mechanism
- [ ] **Autocomplete System**: Real-time search results with availability indicators
- [ ] **Entity Persistence**: Search selections maintained across navigation

#### 2.3 Modal & Loading Systems
- [ ] **Modal Framework**: Reusable modal system for info displays
- [ ] **Loading Simulation**: GenAI processing simulation with context-specific durations
- [ ] **State Management**: Session-based entity and selection persistence

### Phase 3: MVIA Implementation (Weeks 5-6)
**Priority**: Complete MVIA product functionality

#### 3.1 Dashboard System
- [ ] **Two-Column Layout**: Responsive KPI/driver split layout
- [ ] **KPI Card System**: Performance metric display with benchmarks
- [ ] **Driver Expansion**: Animated driver panel with detailed analysis
- [ ] **Mobile Overlay**: Driver panel overlay for mobile devices

#### 3.2 Peer Management System
- [ ] **Peer Selection Interface**: Selected, suggested, and secondary peer categories
- [ ] **Peer State Management**: Peer persistence across dashboard pages
- [ ] **Side Sheet Interface**: Peer management modal system

#### 3.3 MVIA Pages
- [ ] **Company Search**: Search interface with peer selection
- [ ] **Company Overview**: KPI dashboard with driver expansion
- [ ] **Peer Comparison**: Competitive analysis with peer management
- [ ] **Questions**: Single-column strategic questions interface
- [ ] **Product Overview**: Legal disclaimers and AI transparency

### Phase 4: StrategyFlow Implementation (Weeks 7-8)
**Priority**: Complete StrategyFlow product functionality

#### 4.1 Analysis Workflow System
- [ ] **Info Tiles System**: Educational content tiles with modal explanations
- [ ] **Multi-Step Configuration**: Analysis type selection and parameter configuration
- [ ] **Dynamic Form Generation**: Configuration fields based on analysis selections
- [ ] **Stateful Button System**: Visual feedback for analysis selections

#### 4.2 Library Management System
- [ ] **Table-Based Interface**: Analysis tracking with status management
- [ ] **Status Management**: Complete, in-progress, failed, queued states
- [ ] **Download Functionality**: File download for completed analyses
- [ ] **Retry System**: Re-initiate failed analyses

#### 4.3 StrategyFlow Pages
- [ ] **Search**: Industry-focused search with info tiles system
- [ ] **Analysis Configuration**: Multi-step analysis workflow
- [ ] **Library**: Analysis tracking and download management
- [ ] **Product Overview**: Legal disclaimers with StrategyFlow branding

### Phase 5: Testing & Optimization (Weeks 9-10)
**Priority**: Quality assurance and performance optimization

#### 5.1 Cross-Browser Testing
- [ ] **Browser Compatibility**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- [ ] **Mobile Testing**: iOS Safari, Chrome Mobile across device sizes
- [ ] **Responsive Validation**: All 5 breakpoints tested across both products

#### 5.2 Performance Optimization
- [ ] **Bundle Optimization**: CSS/JS minification and code splitting
- [ ] **Image Loading**: Lazy loading and proper responsive images
- [ ] **Font Loading**: Optimized font-display strategies
- [ ] **Core Web Vitals**: Performance benchmarking and optimization

#### 5.3 Accessibility & SEO
- [ ] **ARIA Implementation**: Screen reader compatibility
- [ ] **Keyboard Navigation**: Full keyboard access for all interactive elements
- [ ] **Semantic HTML**: Proper heading hierarchy and landmark roles
- [ ] **Meta Tags**: SEO optimization for both products

---

## Migration Planning

### Critical Migration Blockers

#### 1. CSS Variant System Crisis
**Issue**: 747 Webflow variant classes (`w-variant-[UUID]`) require complete refactoring
**Solution**: Map each variant to semantic class names with component state management

#### 2. JavaScript Bundle Analysis
**Issue**: 1MB `mvip.js` file contains embedded dependencies and Webflow-specific code
**Solution**: Decompile bundle, extract reusable components, create modular replacement

#### 3. External Data Dependencies
**Issue**: GitHub Gist data sources create external dependencies
**Solution**: Migrate to local `/json/` files with fallback mechanisms

### Asset Management Strategy

#### Font & Licensing Validation
- [ ] **McKinsey Font Rights**: Verify usage rights outside Webflow environment
- [ ] **Font Loading**: Implement proper font-display strategies
- [ ] **Fallback Fonts**: System font fallbacks for failed font loads

#### Image Optimization Pipeline
- [ ] **WebP Conversion**: Convert PNG charts to WebP format (43% size reduction)
- [ ] **Responsive Images**: Implement proper srcset for different screen densities
- [ ] **Lazy Loading**: Implement intersection observer for image loading

### Development Environment Setup

#### Modern Build Pipeline
- [ ] **Bundler**: Webpack, Vite, or Parcel for asset optimization
- [ ] **CSS Processing**: PostCSS for vendor prefixing and optimization
- [ ] **JavaScript Transpilation**: Babel for ES6+ browser compatibility
- [ ] **Development Server**: Hot module replacement for efficient development

#### Quality Assurance Framework
- [ ] **Testing Strategy**: Unit tests for component functionality
- [ ] **Visual Regression**: Automated visual testing for UI consistency
- [ ] **Performance Monitoring**: Bundle size and Core Web Vitals tracking
- [ ] **Error Tracking**: Implementation of error boundary and logging

### Success Criteria

#### Must-Have Requirements
- [ ] **Pixel-Perfect Fidelity**: Visual match to Webflow prototype
- [ ] **Functional Equivalence**: All user journeys work identically
- [ ] **Performance Parity**: Load times equal or better than Webflow
- [ ] **Mobile Responsiveness**: All responsive behaviors preserved
- [ ] **Cross-Product Navigation**: Seamless product switching

#### Enhanced Capabilities
- [ ] **Improved Performance**: Faster load times through optimization
- [ ] **Better Accessibility**: WCAG 2.1 AA compliance
- [ ] **Enhanced SEO**: Better search engine optimization
- [ ] **Modern Development**: Hot reload, debugging tools, maintainable code

---

## Technical Implementation Notes

### Responsive Breakpoints
```css
/* Standardized breakpoints across both products */
--large-desktop: 1280px;    /* Enhanced layouts, 4-column grids */
--medium-tablet: 992px;     /* Standard tablet, 2-column layouts */
--small-tablet: 768px;      /* Navigation collapse point */
--mobile: 480px;            /* Single column, stacked layouts */
--small-mobile: 479px;      /* Most compact configuration */
```

### CSS Custom Properties Architecture
```css
/* Core design system variables */
:root {
  /* Header system */
  --main-global-header-height: 88px;
  --sub-header-height: 56px;
  --initial-columns-padding-top: 40px;
  
  /* Animation system */
  --driver-animation-duration: 300ms;
  --modal-backdrop-transition: 200ms;
  
  /* Color system */
  --primary-blue: #0066cc;
  --text-primary: #333333;
  --background-light: #f8f9fa;
  
  /* Typography */
  --font-family-primary: 'McKinsey Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-display: 'Bower', 'McKinsey Sans', sans-serif;
}
```

### Component Data Attributes

#### Global Attributes (Both Products)
- `data-product-name` - Dynamic product naming
- `data-product` - Product detection (body attribute)
- `data-js` - JavaScript behavior binding
- `data-modal` - Modal system controls

#### MVIA-Specific Attributes
- `data-card-type` - KPI vs Driver card distinction
- `data-kpi-show-drivers` - Driver panel triggers
- `data-peer-*` - Peer management system
- `data-subject-name` - Subject company management

#### StrategyFlow-Specific Attributes
- `data-analysis-selector` - Analysis type selection
- `data-config-panel` - Configuration panel management
- `data-library-*` - Library system controls
- `data-dropdown-field` - Advanced dropdown components

### State Management Patterns
```javascript
// Centralized state management
const AppState = {
  activeProduct: 'mvia',
  selectedEntity: {
    type: 'company',
    name: 'Polestar',
    metadata: {}
  },
  selectedPeers: ['Tesla', 'Rivian'],
  currentPage: 'overview',
  isLoading: false
};

// Entity persistence across pages
class StateManager {
  static persistEntity(entityType, entityName, entityData) {
    AppState.selectedEntity = { type: entityType, name: entityName, metadata: entityData };
    sessionStorage.setItem('mvip-selected-entity', JSON.stringify(AppState.selectedEntity));
  }
  
  static restoreEntity() {
    const stored = sessionStorage.getItem('mvip-selected-entity');
    if (stored) {
      AppState.selectedEntity = JSON.parse(stored);
    }
  }
}
```

---

**Documentation Status**: Complete - Ready for Implementation  
**Migration Complexity**: High (8-10 weeks estimated)  
**Risk Level**: Manageable with proper planning  
**Recommended Team**: 2-3 senior developers + 1 designer  

*Last Updated: July 3, 2025*