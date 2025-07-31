# Phase 2 Development Plan: Interactive Prototype Assembly
## StrategyMethod Prompt Builder - Webflow-Equivalent Mock Interactions

### Executive Summary

Phase 2 transforms our Section Card component from a static HTML demo into a **Webflow-equivalent interactive prototype** with realistic mock functionality. The goal is creating a high-fidelity prototype for **user testing validation** and **engineering handoff specification** - not production-ready code.

**Current Status**: ✅ Phase 1 Complete
- Section Card component with Material Symbols icons
- Complete design system with 200+ CSS variables  
- McKinsey brand fonts and custom color palette
- Mobile-responsive wireframe-aligned layout

**Primary Objectives:**
- Add convincing mock interactions (@ reference system, field management, form behaviors)
- Extract components into reusable JavaScript functions with configuration
- Build multi-page prototype with navigation and realistic user workflows
- Validate prompt builder experience through authentic user testing
- Provide comprehensive specifications for engineering team implementation

**Success Criteria:** Prototype feels as polished and interactive as a Webflow prototype, enabling meaningful user testing while serving as a detailed reference for production development.

---

## Phase 2A: Mock Interaction Development
*Target: 2-3 hours total implementation time*

### 2A.1: @ Reference System Mock Implementation
**Target: 45 minutes**

**Current State Analysis:**
Our Section Card component already includes reference chips with hover states and "Add reference" buttons, but currently shows placeholder alerts. We need to implement a convincing autocomplete system.

**Mock Implementation Specifications:**

#### Hierarchical Reference Menu System
```javascript
// Workflow-scoped mock data structure
const workflowReferences = {
  currentWorkflow: {
    id: 'workflow_001',
    name: 'Market Analysis Workflow',
    currentPromptId: 'prompt_001'
  },
  
  prompts: [
    {
      id: 'prompt_001',
      name: 'Consumer Behavior Analysis',
      isCurrentPrompt: true,
      sections: [
        { id: 'user-input', name: 'User Input', fields: [
          { id: 'field_001', label: 'Customer Demographics', value: 'Target market analysis...' }
        ]},
        { id: 'context', name: 'Context', fields: [
          { id: 'field_002', label: 'Market Context', value: 'Consumer electronics market...' }
        ]}
      ]
    },
    {
      id: 'prompt_002', 
      name: 'Competitive Landscape Review',
      isCurrentPrompt: false,
      sections: [...]
    }
  ]
};

// Hierarchical Interaction Flow:
// 1. Type @ → Primary popup: ["Field reference", "Prompt reference"]
// 2. Select "Field reference" → Secondary popup: ["Field from current prompt", "Field from current workflow"]
// 3a. "Field from current prompt" → Sidebar Mode 1: Current prompt fields only
// 3b. "Field from current workflow" → Sidebar Mode 2: Select prompt → Mode 3: Select field
// 4. "Prompt reference" → Sidebar Mode 4: Workflow prompt selection
// 5. Side panel opens alongside content (flexbox layout, not overlay)
```

#### Visual Feedback Requirements
- **Popup Menu Animation:** Smooth slide-down with opacity transition (200ms)
- **Sidebar Panel Animation:** Flexbox width transition (300ms ease)
- **Workflow Context:** Clear workflow name display in sidebar header
- **Reference Path Indicators:** Breadcrumb-style navigation in sidebar
- **Selection States:** Keyboard focus with blue background
- **Insertion Animation:** New reference chips fade in with slight scale effect
- **Cross-Prompt Indicators:** Show source prompt context in field reference chips

### 2A.2: Dynamic Field Management System
**Target: 30 minutes**

**Current State Analysis:**
The "Add input field" button currently shows a placeholder alert, while field removal works with basic animation. We need to implement realistic field creation and management.

**Mock Implementation Specifications:**

#### Add Field Functionality
```javascript
// Field creation with realistic workflow
function createNewInputField(fieldNumber) {
  return {
    id: generateFieldId(),
    label: `Input field ${fieldNumber}`,
    content: '',
    size: 'medium',
    characterLimit: 500,
    references: [],
    required: false
  };
}

// Interaction Behaviors:
// 1. Click "Add input field" → Slide in new field component
// 2. Auto-focus new field label for immediate editing
// 3. Animate character counter appearance
// 4. Update field numbering automatically
// 5. Show "Field added" toast notification
```

#### Field Management Controls
- **Reordering:** Drag handles appear on hover (visual only - no functional drag)
- **Duplication:** Right-click menu shows "Duplicate field" option
- **Field Templates:** Dropdown with pre-configured field types
- **Bulk Actions:** Select multiple fields for batch operations

### 2A.3: Progressive Character Feedback System
**Target: 20 minutes**

**Current State Analysis:**
Character counting currently works with threshold colors and warning/error states applied to text inputs. We need to enhance this with contextual guidance.

**Enhanced Mock Behaviors:**

#### Contextual Guidance System
```javascript
// Progressive feedback levels
const feedbackLevels = {
  normal: { threshold: 0, message: null, color: 'gray-300' },
  approaching: { threshold: 0.7, message: 'Consider wrapping up', color: 'warning' },
  warning: { threshold: 0.9, message: 'Approaching limit', color: 'warning' },
  error: { threshold: 1.0, message: 'Content too long', color: 'error' },
  critical: { threshold: 1.2, message: 'Significantly over limit', color: 'error-dark' }
};

// Interactive Features:
// 1. Hover over character count → Show optimization suggestions
// 2. Warning state → Highlight longest sentences for editing
// 3. Error state → Show "Compress content" action button
// 4. Auto-save indicator during typing pauses
```

### 2A.4: Rich Text Toolbar Mock Functionality
**Target: 25 minutes**

**Current State Analysis:**
Formatting buttons currently toggle active states but don't apply actual formatting to text. We need to implement realistic formatting behaviors.

**Mock Implementation Specifications:**

#### Realistic Formatting Behaviors
```javascript
// Text selection and formatting
function applyFormatting(type, selection) {
  // Mock formatting that shows visual feedback
  const formatters = {
    bold: (text) => `**${text}**`,
    italic: (text) => `*${text}*`,
    list: (text) => text.split('\n').map(line => `• ${line}`).join('\n'),
    link: (text) => `[${text}](url-placeholder)`
  };
  
  // Visual behaviors:
  // 1. Select text → Formatting toolbar appears near selection
  // 2. Apply formatting → Text updates with markdown-style indicators
  // 3. Multiple formats → Toolbar shows combined state
  // 4. Undo/redo → Show format history mini-panel
}
```

---

## Phase 2B: Component Extraction & Configuration
*Target: 1-1.5 hours total implementation time*

### 2B.1: JavaScript Function Extraction
**Target: 45 minutes**

**Conversion Strategy:**
Transform static HTML sections into configurable JavaScript functions while preserving all Phase 1 visual fidelity.

#### Section Card Component Structure
```javascript
// prototype/components/section-card.js
function createSectionCard(config) {
  const {
    title,
    badge,
    description,
    descriptionList,
    fields,
    controls,
    alerts,
    references,
    sectionType,
    isOptional = false,
    isCollapsed = false
  } = config;
  
  return `
    <article class="section-card ${isOptional ? 'section-card--optional' : ''} ${isCollapsed ? 'section-card--collapsed' : ''}">
      ${createSectionHeader(title, badge, description, descriptionList, controls)}
      ${createSectionContent(fields, alerts, references, sectionType)}
    </article>
  `;
}

// Individual section type configurations
const sectionConfigurations = {
  'prompt-name': {
    title: 'Prompt name',
    badge: { text: 'Required', type: 'required' },
    description: 'Help users understand what they can expect from this prompt\'s outputs.',
    fields: [{ type: 'simple-text', label: 'Prompt title', characterLimit: 40 }],
    features: { toolbar: false, references: false, sizeControls: false }
  },
  
  'user-input': {
    title: 'User input',
    badge: { text: 'Required', type: 'required' },
    description: 'Add two input fields to collect parameters and other information from users.',
    fields: [
      { type: 'rich-text', label: 'Input field 1', characterLimit: 500 },
      { type: 'rich-text', label: 'Input field 2', characterLimit: 300 }
    ],
    features: { toolbar: true, references: true, sizeControls: true, addFields: true }
  },
  
  'context': {
    title: 'Context',
    badge: { text: 'Required', type: 'required' },
    description: 'Provide background information and context for this prompt.',
    descriptionList: [
      'Include relevant background details that inform the analysis',
      'Reference related prompts or previous work where applicable'
    ],
    fields: [{ type: 'rich-text', label: 'Context information', characterLimit: 1000 }],
    features: { toolbar: true, references: true, sizeControls: true },
    references: { prompt: 2, field: 1 }
  },
  
  'sequential-instructions': {
    title: 'Sequential instructions',
    badge: { text: 'Optional', type: 'optional' },
    description: 'Guide users through a step-by-step process to complete their analysis.',
    fields: [{ type: 'rich-text', label: 'Step-by-step instructions', characterLimit: 500 }],
    features: { toolbar: true, references: true, sizeControls: true },
    alerts: [{ type: 'info', title: 'Section not included', message: 'This optional section isn\'t currently part of the prompt. Click "Add to prompt" to include it.' }]
  }
};
```

### 2B.2: Mock Data Architecture
**Target: 30 minutes**

#### Comprehensive Mock Data System
```javascript
// prototype/data/prompt-builder-data.js
const promptBuilderMockData = {
  currentPrompt: {
    id: 'prompt_001',
    name: 'Market Analysis and Consumer Behavior Tool',
    status: 'draft',
    lastModified: '2024-12-20T10:30:00Z',
    sections: {
      'prompt-name': { enabled: true, order: 1 },
      'context': { enabled: true, order: 2 },
      'user-input': { enabled: true, order: 3 },
      'sequential-instructions': { enabled: false, order: 4 },
      'examples': { enabled: false, order: 5 },
      'output-format': { enabled: false, order: 6 },
      'constraints': { enabled: false, order: 7 }
    }
  },
  
  fieldReferences: [
    { id: 'ref_001', name: 'Customer Demographics', section: 'user-input', field: 'Input field 1' },
    { id: 'ref_002', name: 'Market Analysis Scope', section: 'context', field: 'Context information' },
    { id: 'ref_003', name: 'Timeline Requirements', section: 'user-input', field: 'Input field 2' }
  ],
  
  promptReferences: [
    { id: 'prompt_ref_001', name: 'Market Research Framework', category: 'Analysis Tools' },
    { id: 'prompt_ref_002', name: 'Customer Segmentation Tool', category: 'Strategy Templates' },
    { id: 'prompt_ref_003', name: 'Competitive Intelligence Report', category: 'Research Methods' }
  ],
  
  userPreferences: {
    defaultFieldSize: 'medium',
    autoSave: true,
    showCharacterCounts: true,
    enableAdvancedFeatures: false
  }
};
```

---

## Phase 2C: Multi-Page Prototype Assembly
*Target: 1.5-2 hours total implementation time*

### 2C.1: Navigation Architecture
**Target: 45 minutes**

#### Page Structure and Flow
```
prototype/pages/
├── index.html                    # Prompt Builder Dashboard
├── prompt-editor.html            # Main editing interface
├── section-library.html          # Available section types
├── references-manager.html       # Field/Prompt reference system
└── preview-mode.html            # Generated prompt preview
```

#### Navigation System Implementation
```javascript
// prototype/shared/navigation.js
const navigationSystem = {
  currentPage: 'prompt-editor',
  breadcrumbs: ['Dashboard', 'Market Analysis Tool', 'Edit Sections'],
  
  // Main navigation items
  primaryNav: [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: 'index.html' },
    { id: 'editor', label: 'Prompt Editor', icon: 'edit', href: 'prompt-editor.html' },
    { id: 'preview', label: 'Preview', icon: 'preview', href: 'preview-mode.html' },
    { id: 'references', label: 'References', icon: 'link', href: 'references-manager.html' }
  ],
  
  // Section navigation (left sidebar in editor)
  sectionNav: [
    { id: 'prompt-name', label: 'Prompt Name', status: 'complete', required: true },
    { id: 'context', label: 'Context', status: 'complete', required: true },
    { id: 'user-input', label: 'User Input', status: 'in-progress', required: true },
    { id: 'sequential-instructions', label: 'Sequential Instructions', status: 'disabled', required: false },
    { id: 'examples', label: 'Examples', status: 'disabled', required: false },
    { id: 'output-format', label: 'Output Format', status: 'disabled', required: false }
  ]
};

// Page transitions with realistic loading states
function navigateTo(pageId, options = {}) {
  // 1. Show loading spinner
  // 2. Fade out current content
  // 3. Update URL and breadcrumbs
  // 4. Load new page content
  // 5. Fade in with success animation
  // 6. Focus management for accessibility
}
```

### 2C.2: Dashboard Interface
**Target: 30 minutes**

#### Prompt Builder Dashboard Features
```javascript
// Mock dashboard data and interactions
const dashboardData = {
  recentPrompts: [
    {
      id: 'prompt_001',
      name: 'Market Analysis and Consumer Behavior Tool',
      status: 'draft',
      lastModified: '2 hours ago',
      sections: 3,
      collaborators: ['Sarah Chen', 'Mike Rodriguez'],
      usage: { thisMonth: 145, trend: '+12%' }
    },
    {
      id: 'prompt_002', 
      name: 'Strategic Planning Workshop Guide',
      status: 'published',
      lastModified: '1 day ago',
      sections: 5,
      collaborators: ['Alex Johnson'],
      usage: { thisMonth: 67, trend: '+3%' }
    }
  ],
  
  quickActions: [
    { id: 'new-prompt', label: 'Create New Prompt', icon: 'add', primary: true },
    { id: 'browse-templates', label: 'Browse Templates', icon: 'library_books' },
    { id: 'import-prompt', label: 'Import Existing', icon: 'upload' }
  ],
  
  // Interactive elements
  searchAndFilter: {
    placeholder: 'Search prompts by name, tag, or collaborator...',
    filters: ['All Prompts', 'My Prompts', 'Shared with Me', 'Published', 'Drafts'],
    sortOptions: ['Last Modified', 'Name', 'Usage', 'Created Date']
  }
};

// Dashboard interactions
// 1. Search functionality with live filtering
// 2. Prompt cards with hover states and quick actions
// 3. "Create New Prompt" workflow with template selection
// 4. Bulk actions for multiple prompt management
```

### 2C.3: References Management System
**Target: 45 minutes**

#### Reference Manager Interface
```javascript
// Advanced reference management features
const referenceManagerFeatures = {
  // Field reference browser
  fieldReferences: {
    search: { placeholder: 'Search fields across all sections...', filters: ['Section', 'Type', 'Status'] },
    views: ['List View', 'Section View', 'Dependency Map'],
    bulkActions: ['Create Reference Set', 'Export References', 'Update Multiple']
  },
  
  // Prompt reference library
  promptReferences: {
    categories: ['Analysis Tools', 'Strategy Templates', 'Research Methods', 'Report Generators'],
    search: { placeholder: 'Search prompt library...', filters: ['Category', 'Complexity', 'Usage'] },
    preview: true, // Show prompt preview in modal
    usage: true // Show usage statistics and recommendations
  },
  
  // Dependency visualization
  dependencyMap: {
    showConnections: true,
    interactiveNodes: true,
    exportOptions: ['PNG', 'PDF', 'JSON'],
    collaborative: true // Multiple users can see real-time changes
  }
};

// Reference creation workflow
// 1. Select reference type (field vs prompt)
// 2. Browse/search available options
// 3. Preview selection with context
// 4. Configure reference parameters
// 5. Insert with animation back to editor
```

---

## Phase 2D: Interaction Polish & Testing Preparation
*Target: 1 hour total implementation time*

### 2D.1: Animation and Micro-Interactions
**Target: 30 minutes**

#### Polished Interaction Library
```css
/* Smooth state transitions */
.section-card {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.section-card--expanded {
  transform: scale(1.02);
  box-shadow: var(--shadow-elevated);
}

/* Loading states */
.section-card--loading {
  opacity: 0.7;
  pointer-events: none;
}

.section-card--loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 1.5s infinite;
}

/* Success states */
.field-saved {
  border-color: var(--color-success);
  background: var(--color-success-bg);
  animation: saved-pulse 600ms ease-out;
}

@keyframes saved-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
```

#### Toast Notification System
```javascript
// User feedback for all actions
const notificationSystem = {
  types: {
    success: { icon: 'check_circle', color: 'success', duration: 3000 },
    warning: { icon: 'warning', color: 'warning', duration: 4000 },
    error: { icon: 'error', color: 'error', duration: 5000 },
    info: { icon: 'info', color: 'info', duration: 3500 }
  },
  
  messages: {
    fieldAdded: { type: 'success', title: 'Field Added', message: 'New input field created successfully' },
    fieldRemoved: { type: 'info', title: 'Field Removed', message: 'Input field deleted from section' },
    referenceAdded: { type: 'success', title: 'Reference Added', message: 'Field reference inserted into text' },
    autoSaved: { type: 'info', title: 'Changes Saved', message: 'Your progress has been automatically saved' },
    sectionEnabled: { type: 'success', title: 'Section Added', message: 'Sequential instructions added to prompt' }
  }
};
```

### 2D.2: User Testing Preparation
**Target: 30 minutes**

#### Testing Scenario Configuration
```javascript
// Realistic user testing scenarios
const testingScenarios = {
  scenario1: {
    name: 'New User Onboarding',
    description: 'First-time user creates a market analysis prompt',
    startingState: 'empty-prompt',
    expectedActions: [
      'Set prompt name',
      'Add context information', 
      'Configure user input fields',
      'Add field references',
      'Preview final prompt'
    ],
    successCriteria: ['Completed prompt in <15 minutes', 'Used reference system', 'No critical errors']
  },
  
  scenario2: {
    name: 'Experienced User Enhancement',
    description: 'Existing user adds advanced features to current prompt',
    startingState: 'basic-prompt-complete',
    expectedActions: [
      'Enable optional sections',
      'Add prompt references',
      'Configure sequential instructions',
      'Test different field sizes'
    ],
    successCriteria: ['Found advanced features easily', 'Reference system intuitive', 'Confident in changes']
  },
  
  scenario3: {
    name: 'Reference System Mastery',
    description: 'User creates complex prompt with multiple interconnected references',
    startingState: 'multi-section-prompt',
    expectedActions: [
      'Add field references in context',
      'Create prompt references',
      'Use @ symbol for inline references',
      'Navigate reference manager'
    ],
    successCriteria: ['Reference relationships clear', 'Autocomplete helpful', 'No confusion about types']
  }
};

// Analytics and feedback collection
const userTestingMetrics = {
  taskCompletion: { target: '90% completion rate', measure: 'scenario completion' },
  timeToComplete: { target: '<15 minutes per scenario', measure: 'task duration' },
  errorRecovery: { target: '<3 errors per session', measure: 'user mistakes' },
  satisfaction: { target: '4.5/5 average rating', measure: 'post-task survey' },
  learnability: { target: '85% find it intuitive', measure: 'ease of use rating' }
};
```

---

## Engineering Handoff Specifications

### Technical Architecture Documentation

#### Component API Specifications
```javascript
// Production implementation guidance
const componentSpecs = {
  SectionCard: {
    props: {
      config: 'SectionConfiguration', // Type-safe configuration object
      data: 'SectionData', // Current section content
      onChange: '(data: SectionData) => void', // Data change handler
      onValidate: '(data: SectionData) => ValidationResult', // Validation handler
      readOnly: 'boolean', // View-only mode
      collaborators: 'CollaboratorInfo[]' // Real-time collaboration data
    },
    
    events: {
      'field:added': 'Emitted when user adds new input field',
      'reference:inserted': 'Emitted when reference added to text',
      'validation:changed': 'Emitted when validation state changes',
      'autosave:triggered': 'Emitted when auto-save occurs'
    },
    
    methods: {
      validate: '() => ValidationResult', // Trigger validation
      save: '() => Promise<SaveResult>', // Persist changes
      reset: '() => void', // Reset to last saved state
      export: '(format: ExportFormat) => ExportData' // Export section data
    }
  }
};
```

#### Data Schema Requirements
```typescript
// TypeScript interfaces for production implementation
interface SectionConfiguration {
  id: string;
  title: string;
  badge: BadgeConfig;
  description: string;
  descriptionList?: string[];
  fields: FieldConfiguration[];
  features: FeatureFlags;
  validation: ValidationRules;
  references?: ReferenceConfiguration;
  alerts?: AlertConfiguration[];
}

interface FieldConfiguration {
  id: string;
  type: 'simple-text' | 'rich-text' | 'select' | 'multi-select';
  label: string;
  placeholder: string;
  characterLimit: number;
  required: boolean;
  validation: FieldValidationRules;
  references: ReferenceSettings;
}

interface ReferenceConfiguration {
  allowFieldReferences: boolean;
  allowPromptReferences: boolean;
  maxReferences: number;
  autoCompleteEnabled: boolean;
  inlineReferencesEnabled: boolean;
}
```

#### API Integration Points
```javascript
// Backend service integration requirements
const apiEndpoints = {
  // Section management
  'GET /api/sections/{sectionId}': 'Retrieve section configuration and data',
  'PUT /api/sections/{sectionId}': 'Update section data',
  'POST /api/sections': 'Create new section',
  'DELETE /api/sections/{sectionId}': 'Remove section',
  
  // Reference system
  'GET /api/references/fields': 'List available field references',
  'GET /api/references/prompts': 'List available prompt references', 
  'POST /api/references/search': 'Search references with filters',
  'GET /api/references/{id}/preview': 'Get reference preview data',
  
  // Auto-save and collaboration
  'POST /api/autosave': 'Auto-save section changes',
  'GET /api/collaboration/{promptId}/users': 'Get active collaborators',
  'POST /api/collaboration/{promptId}/cursor': 'Update user cursor position',
  
  // Validation and export
  'POST /api/validate/section': 'Validate section data',
  'POST /api/export/prompt': 'Export complete prompt data'
};
```

---

## Implementation Timeline

### Week 1: Mock Interactions (Phase 2A)
- **Days 1-2:** @ Reference system with autocomplete dropdown
- **Days 3-4:** Dynamic field management and character feedback
- **Day 5:** Rich text toolbar mock functionality and testing

### Week 2: Component Extraction (Phase 2B) 
- **Days 1-2:** JavaScript function extraction from HTML
- **Days 3-4:** Configuration system and mock data architecture
- **Day 5:** Component testing and refinement

### Week 3: Multi-Page Assembly (Phase 2C)
- **Days 1-2:** Navigation system and dashboard interface
- **Days 3-4:** References management system
- **Day 5:** Page transitions and workflow testing

### Week 4: Polish & Testing (Phase 2D)
- **Days 1-2:** Animation polish and micro-interactions
- **Days 3-4:** User testing scenario setup and metrics
- **Day 5:** Engineering handoff documentation and final review

---

## Success Metrics

### User Testing Validation
- **Task Completion Rate:** 90%+ users complete typical prompt creation
- **Time to Competency:** <15 minutes to create first functional prompt
- **Error Recovery:** <3 user errors per session with clear recovery paths
- **Satisfaction Score:** 4.5/5 average rating for overall experience

### Engineering Handoff Quality
- **API Specifications:** Complete endpoint documentation with examples
- **Component Architecture:** Type-safe interfaces and clear integration points
- **Behavioral Documentation:** Detailed interaction specifications for all features
- **Performance Requirements:** Loading states, animation timings, and optimization targets

### Prototype Fidelity
- **Webflow Equivalent:** Interactions feel as polished as professional design tools
- **Mock Realism:** All functionality demonstrates intended behavior convincingly
- **Multi-Page Flow:** Seamless navigation between different prototype views
- **Cross-Device Experience:** Responsive design works effectively on mobile and desktop

This Phase 2 plan transforms our Section Card component into a comprehensive interactive prototype that validates the prompt builder experience while providing engineering teams with detailed specifications for production implementation.

