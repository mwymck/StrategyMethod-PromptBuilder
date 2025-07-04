# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a **Webflow-exported prototype** for the McKinsey Value Intelligence Platform (MVIP) featuring two products:
1. **MVIA (McKinsey Value Intelligence Assistant)** - Company performance analysis tool
2. **StrategyFlow** - Strategic planning application

**Primary Objective**: Create comprehensive documentation enabling one-to-one fidelity reconstruction using standard web development workflows.

## Current Status

**MVIA Documentation**: ✅ **COMPLETE** - All 5 pages fully documented
- Company Search Page (`/mvia/mvia-search.html`)
- Company Overview Page (`/mvia/overview.html`) 
- Peer Comparison Page (`/mvia/peer-comparison.html`)
- Questions Page (`/mvia/questions.html`)
- Product Overview Page (`/mvia/product-overview.html`)

**StrategyFlow Documentation**: ✅ **COMPLETE** - All 4 pages plus product selector documented
- Product Selector (`/index.html`) - Entry point for both products
- Search Page (`/strategyflow/sf-search.html`) - Enhanced search with industry dropdown and info tiles
- Analysis Configuration (`/strategyflow/analysis.html`) - Multi-step analysis workflow
- Analysis Library (`/strategyflow/library.html`) - Analysis tracking and download management  
- Product Overview (`/strategyflow/sf-product-overview.html`) - Multi-tenant legal framework

## Key Project Files

### Documentation
- **`/MVIA-Documentation.md`** - Complete MVIA documentation (1,600+ lines)
- **`/Documentation-Process-Guide.md`** - Methodology and best practices

### Source Files
- **`/index.html`** - Product selector (entry point for both MVIA and StrategyFlow)
- **`/mvia/*.html`** - 5 MVIA application pages
- **`/strategyflow/*.html`** - 4 StrategyFlow pages plus analysis sandbox
- **`/json/mvia.json`** - MVIA data structure and configuration
- **`/json/sf.json`** - StrategyFlow data structure with industry search data
- **`/js/mvip.js`** - Complete application logic with multi-product support
- **`/css/mvip.css`** - Main styling system supporting both products

## Architecture Overview

### Webflow-to-Standard Translation Project
- **Source**: Webflow-exported prototype with extensive CSS/JS
- **Target**: Modular component system for standard web development
- **Approach**: Each feature as self-contained HTML/CSS/JavaScript unit

### Multi-Product Component Architecture
```
Global Components (Both Products):
├── Product Selector (index.html) - Entry point
├── Global Header with Product-Specific Navigation
├── Multi-Tenant Product Name System (JSON-driven)
├── Material Symbols Icons
└── Responsive Layout System

MVIA Architecture:
├── Search Layout → Dashboard Pages → Legal Document
├── Two-Column Layout (Overview/Peer Comparison)
├── Single-Column Layout (Questions)
├── KPI Cards with Driver Expansion
├── Peer Management with Side Sheets
└── Performance-Focused Data Analysis

StrategyFlow Architecture:
├── Search Layout → Configuration → Library → Legal Document
├── Enhanced Search with Industry Dropdown
├── Multi-Step Analysis Configuration Workflow
├── Table-Based Analysis Library with Status Management
├── Info Tiles with Modal System
└── Strategic Analysis Generation Pipeline

Shared Infrastructure:
├── CSS Design System (40,000+ lines)
├── JavaScript Framework with Multi-Product Support
├── JSON-Driven Content Management
├── Legal Compliance Framework
└── Responsive Design Patterns
```

### Multi-Tenant Data Architecture
- **Product Detection**: `data-product` body attribute determines product context
- **JSON Configuration**: 
  - **MVIA**: `/json/mvia.json` - KPIs, subjects, peers, performance data
  - **StrategyFlow**: `/json/sf.json` - Analysis types, industry data, library items
- **Dynamic Content**: All product-specific text via `data-product-name` attributes
- **External Data Sources**:
  - **MVIA**: `https://gist.githubusercontent.com/.../mvia-data.json`
  - **StrategyFlow**: `https://gist.githubusercontent.com/.../sf-data.json`
- **State Management**: 
  - **MVIA**: Subject company and peer selections
  - **StrategyFlow**: Analysis selections, configuration parameters, library status
- **Multi-Product API**: Single codebase serves different data endpoints based on product context

## Development Commands

### Viewing the Application
```bash
# Serve locally (any static server)
python -m http.server 8000
# OR
npx serve .
# OR
php -S localhost:8000
```

### File Analysis
```bash
# Search for specific components
grep -r "data-card-type" mvia/
grep -r "data-product-name" .

# Find all interactive elements
grep -r "data-.*=" mvia/ | grep -E "(click|show|close|search)"

# Analyze CSS classes
grep -o "class=\"[^\"]*\"" mvia/*.html | sort | uniq
```

## Important Technical Details

### Responsive Breakpoints
```css
/* Defined in index.html */
--large-desktop: 1280px+
--medium-tablet: 992px-1279px  
--small-tablet: 768px-991px
--mobile: 480px-767px
--small-mobile: <479px
```

### Critical CSS Variables
```css
/* Header system */
--main-global-header-height: 88px
--sub-header-height: 56px
--initial-columns-padding-top: 40px

/* Animations */
--driver-animation-duration: 300ms
```

### Key Data Attributes for Implementation

#### Shared Attributes (Both Products)
- `data-product-name` - Dynamic product naming across all pages
- `data-product` - Product detection (body attribute: 'mvia' or 'strategyflow')
- `data-search-component` - Enhanced search functionality

#### MVIA-Specific Attributes
- `data-card-type` - KPI vs Driver card types
- `data-kpi-show-drivers` - Driver panel triggers
- `data-subject-name` - Subject company management
- `data-search-type` - Company/industry toggle

#### StrategyFlow-Specific Attributes
- `data-analysis-selector` - Analysis type selection (strategic-journey, market-trends, competitive-landscape)
- `data-config-panel` - Configuration panel container
- `data-analysis-section` - Configuration sections for each analysis type
- `data-library` - Library table management
- `data-library-content` - Library data population
- `data-library-status` - Analysis status indicators
- `data-library-action` - Download/retry functionality
- `data-dropdown-field` - Advanced dropdown form fields
- `data-analysis-field` - Configuration form inputs

## Implementation Roadmap

### Phase 1: Foundation (Critical)
1. **Multi-Product Architecture Setup**
   - Product detection system via `data-product` attributes
   - JSON configuration management for both products
   - Dynamic product naming system
   - Shared component library architecture

2. **Global Infrastructure**
   - Product selector entry point (`index.html`)
   - Global header with product-specific navigation
   - Responsive layout system (two-column, single-column, table-based)
   - Material Symbols icon integration

### Phase 2: MVIA Implementation (High Priority)
1. **Dashboard System**
   - Two-column layout with driver expansion
   - KPI card system with benchmark indicators
   - Peer management with side sheets
   - Subject company editing functionality

2. **Core MVIA Features**
   - Enhanced search with company focus
   - Driver panel expansion system
   - Source document modal system
   - Questions page single-column layout

### Phase 3: StrategyFlow Implementation (High Priority)
1. **Analysis Workflow System**
   - Multi-step configuration workflow
   - Dynamic form generation based on analysis selections
   - Stateful button systems with visual feedback
   - Advanced dropdown field components

2. **Library Management System**
   - Table-based analysis tracking
   - Status management (complete, in-progress, failed, queued)
   - Download functionality for completed analyses
   - Retry system for failed analyses

3. **StrategyFlow-Specific Features**
   - Industry search with immediate dropdown display
   - Info tiles section with modal system
   - Analysis generation alert system
   - Template-based table rendering

### Phase 4: Integration & Polish (Medium Priority)
1. **Cross-Product Features**
   - Multi-tenant legal framework
   - Shared feedback systems
   - External data source integration
   - Error handling and fallback systems

2. **Performance & Accessibility**
   - Animation performance optimization
   - Mobile gesture improvements
   - Accessibility compliance across both products
   - Advanced state management systems

## Component Reusability Matrix

### MVIA Components
| Component | Search | Overview | Peer Comp | Questions | Product |
|-----------|---------|----------|-----------|-----------|---------|
| Global Header | ✅ | ✅ | ✅ | ✅ | ✅ |
| Product Naming | ✅ | ✅ | ✅ | ✅ | ✅ |
| Two-Column Layout | ❌ | ✅ | ✅ | ❌ | ❌ |
| KPI Cards | ❌ | ✅ | ✅ | 🔄 | ❌ |
| Driver System | ❌ | ✅ | ✅ | ❌ | ❌ |
| Search System | ✅ | ❌ | ❌ | ❌ | ❌ |

### StrategyFlow Components
| Component | SF Search | SF Analysis | SF Library | SF Product |
|-----------|-----------|-------------|------------|------------|
| Global Header | ✅ | ✅ | ✅ | ✅ |
| Product Naming | ✅ | ✅ | ✅ | ✅ |
| Industry Search | ✅ | ❌ | ❌ | ❌ |
| Info Tiles System | ✅ | ❌ | ❌ | ❌ |
| Analysis Config | ❌ | ✅ | ❌ | ❌ |
| Dropdown Fields | ❌ | ✅ | ❌ | ❌ |
| Table System | ❌ | ❌ | ✅ | ❌ |
| Status Management | ❌ | ❌ | ✅ | ❌ |

### Cross-Product Shared Components
| Component | Used In | Notes |
|-----------|---------|-------|
| Global Header | All pages | Product-agnostic navigation |
| Product Naming | All pages | Dynamic via `data-product-name` |
| Binary Toggle | MVIA Search, SF Search | Company/Industry switching |
| Modal System | MVIA Questions, SF Search | Info display patterns |
| Legal Framework | MVIA Product, SF Product | Multi-tenant disclaimers |

✅ = Full reuse | 🔄 = Adapted version | ❌ = Not applicable

## Development Sequence

**Recommended Order:**
1. **Global Header** + basic layout system
2. **Search Page** (simplest, single purpose)  
3. **Company Overview** (core two-column functionality)
4. **Peer Comparison** (adds peer management)
5. **Questions Page** (single-column variant)
6. **Product Overview** (static content)

## Important Notes

### Webflow Class Translation
- `w-layout-hflex` → `.flex.flex-row`
- `w-layout-vflex` → `.flex.flex-col`
- `w-variant-[id]` → Replace with semantic class names
- `columns-container.right-visible` → Controls driver panel state

### Layout Behavior
- **Two-column**: 100% left → 40%/60% split when drivers shown
- **Mobile**: Two-column becomes overlay pattern below 768px
- **Single-column**: Questions page forces single column always
- **Headers**: Auto-hide on scroll with smooth transitions

### Data Integration
- **Subject**: `mvia.json > subject.name`
- **Peers**: `mvia.json > peers.initial[]`
- **KPIs**: `mvia.json > kpis[]` filtered by `pageId`
- **Config**: `mvia.json > config.productName`, `showDriverButtons`

## General Architecture & Implementation Strategy

### JSON Data Architecture & Transition Strategy

#### Current State (Webflow Prototype)
- **MVIA Data**: External GitHub Gist → `https://gist.githubusercontent.com/.../mvia-data.json`
- **StrategyFlow Data**: External GitHub Gist → `https://gist.githubusercontent.com/.../sf-data.json`
- **Product Detection**: `document.body.dataset.product` determines active product

#### Target State (Standard Web Implementation)
```javascript
// Centralized data loading system
const DataManager = {
  async loadProductData(productId = 'mvia') {
    const dataMap = {
      'mvia': '/json/mvia.json',
      'strategyflow': '/json/sf.json'
    };
    
    try {
      const response = await fetch(dataMap[productId]);
      return await response.json();
    } catch (error) {
      console.error(`Failed to load ${productId} data:`, error);
      return this.getFallbackData(productId);
    }
  }
};
```

#### Data-to-DOM Mapping Patterns
1. **Product Naming**: `data-product-name` attributes populated from `config.productName`
2. **Dynamic Content**: `data-*` attributes serve as selectors for JSON property mapping
3. **Conditional Rendering**: Elements show/hide based on data availability
4. **Template Population**: JSON arrays populate list components via DocumentFragment

### Module Reusability & Component Extraction

#### Tier 1: Core Shared Components (High Reuse)
```javascript
// Global Header Module
class GlobalHeader {
  constructor(config) {
    this.productId = config.productId;
    this.userAvatar = config.userAvatar;
  }
  
  render() {
    // Product-agnostic header with dynamic branding
  }
}

// Binary Toggle Module  
class BinaryToggle {
  constructor(container, options) {
    this.container = container;
    this.activeState = options.default || 'company';
    this.onToggle = options.callback;
  }
}

// Modal System Module
class ModalManager {
  // Handles info modals across MVIA questions and SF info tiles
}
```

#### Tier 2: Product-Specific Components (Medium Reuse)
```javascript
// Search System (adaptable for company vs industry focus)
class SearchSystem {
  constructor(productConfig) {
    this.searchType = productConfig.defaultSearchType;
    this.resultsData = productConfig.searchResults;
  }
}

// Layout Manager (two-column vs single-column vs table)
class LayoutManager {
  constructor(layoutType) {
    this.type = layoutType; // 'two-column', 'single-column', 'table'
  }
}
```

#### Tier 3: Unique Components (Low/No Reuse)
- MVIA: Driver expansion system, KPI cards, peer management
- StrategyFlow: Analysis configuration workflow, dropdown fields, library table

### State Management & Entity Persistence

#### Core State Objects
```javascript
const AppState = {
  // Entity selection persistence
  selectedEntity: {
    type: null,        // 'company' | 'industry'
    name: null,        // Selected entity name
    metadata: null     // Additional entity data
  },
  
  // Peer persistence (company selections only)
  selectedPeers: [],
  
  // Product context
  activeProduct: 'mvia', // 'mvia' | 'strategyflow'
  
  // Navigation state
  currentPage: null,
  
  // Loading states
  isLoading: false,
  loadingContext: null
};
```

#### Entity Persistence Rules
1. **Company Selection**: Persists across all pages until replaced
2. **Industry Selection**: Persists across all pages until replaced  
3. **Peer Selection**: Only applicable to company selections, persists until modified
4. **Cross-Product**: Entity selections do NOT persist across product switches
5. **Session Management**: State should persist within browser session

#### State Transition Patterns
```javascript
// Entity selection triggers state update
function selectEntity(entityType, entityName, entityData) {
  AppState.selectedEntity = {
    type: entityType,
    name: entityName,
    metadata: entityData
  };
  
  // Clear peers if switching from company to industry
  if (entityType === 'industry') {
    AppState.selectedPeers = [];
  }
  
  // Update UI across all relevant components
  StateManager.broadcast('entitySelected', AppState.selectedEntity);
}
```

### Loading Simulation & GenAI Effects

#### Artificial Loading Implementation
```javascript
class LoadingSimulator {
  constructor() {
    this.defaultDuration = 3000; // 3 seconds
    this.shimmerHeight = '400px';
  }
  
  async simulateGenAIProcessing(context) {
    // Show loading state
    this.showShimmerEffect(context);
    
    // Simulate processing time
    await this.delay(this.getDurationForContext(context));
    
    // Hide loading, show results
    this.hideShimmerEffect(context);
  }
  
  getDurationForContext(context) {
    const durations = {
      'analysis-generation': 4000,
      'peer-comparison': 2500,
      'question-analysis': 3500,
      'default': 3000
    };
    return durations[context] || durations.default;
  }
}
```

#### Loading States by Context
- **Analysis Generation**: 4s shimmer with progress indicators
- **Peer Comparison**: 2.5s loading with company data fetch simulation
- **Question Analysis**: 3.5s processing with AI thinking indicators
- **Search Results**: 1s delay for real-time feel

### Rendering Patterns

#### Template-Based Rendering (Library Table Example)
```javascript
class TableRenderer {
  constructor(container, templateSelector) {
    this.container = container;
    this.template = document.querySelector(templateSelector);
  }
  
  render(dataArray) {
    const fragment = document.createDocumentFragment();
    
    dataArray.forEach(item => {
      const row = this.template.cloneNode(true);
      this.populateRowData(row, item);
      fragment.appendChild(row);
    });
    
    this.container.appendChild(fragment);
  }
}
```

#### Dynamic Form Generation (Analysis Configuration)
```javascript
class DynamicFormGenerator {
  generateFieldsForAnalysisType(analysisType, availableOptions) {
    const fieldConfigs = this.getFieldConfigsForType(analysisType);
    
    fieldConfigs.forEach(config => {
      const field = this.createDropdownField(config, availableOptions[config.dataSource]);
      this.attachFieldBehaviors(field, config);
    });
  }
}
```

### Component Initialization & Dependencies

#### Initialization Order
1. **Data Loading**: Product JSON loaded first
2. **Global Components**: Header, layout manager initialized
3. **Page-Specific Components**: Search, tables, forms initialized  
4. **State Management**: Entity persistence restored from session
5. **Event Binding**: User interactions attached last

#### Dependency Graph
```javascript
const ComponentDependencies = {
  'GlobalHeader': [],
  'SearchSystem': ['GlobalHeader', 'DataManager'],
  'LayoutManager': ['GlobalHeader'],
  'KPICards': ['SearchSystem', 'DataManager'],
  'DriverSystem': ['KPICards', 'LayoutManager'],
  'TableRenderer': ['DataManager'],
  'AnalysisConfig': ['SearchSystem', 'DataManager']
};
```

### Cross-Product Architecture Patterns

#### Product Detection & Configuration
```javascript
class ProductManager {
  static detectProduct() {
    return document.body.dataset.product || 'mvia';
  }
  
  static async getProductConfig(productId) {
    const config = await DataManager.loadProductData(productId);
    return {
      productName: config.config.productName,
      searchTypes: config.config.searchTypes,
      features: this.getEnabledFeatures(productId),
      navigation: this.getNavigationConfig(productId)
    };
  }
}
```

#### Shared Component Adaptation
```javascript
// Components adapt behavior based on product context
class AdaptiveSearchSystem extends SearchSystem {
  constructor(productConfig) {
    super(productConfig);
    
    // MVIA: Company-focused with peer selection
    // StrategyFlow: Industry-focused with immediate dropdown
    this.adaptBehaviorForProduct(productConfig.productId);
  }
}
```

## Next Steps

### If Continuing MVIA Work
✅ Documentation complete - proceed directly to implementation

### If Starting StrategyFlow Documentation  
✅ StrategyFlow documentation complete - proceed to implementation

### For Implementation
- Reference complete specifications in `/MVIA-Documentation.md`
- Use architectural patterns documented above
- Implement modular component system for maximum reusability
- Prioritize entity persistence and loading simulation accuracy

### For Implementation Questions
- All user journeys, interactions, and technical details fully documented
- Architectural patterns provide clear guidance for standard web development
- Component reusability matrix guides shared vs. unique implementations