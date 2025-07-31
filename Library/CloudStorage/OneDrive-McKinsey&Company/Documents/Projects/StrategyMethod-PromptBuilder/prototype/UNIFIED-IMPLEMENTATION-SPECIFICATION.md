# Unified Prompt Builder Implementation Specification

## Executive Summary

This document consolidates all requirements, wireframe specifications, and component architecture into a single implementation specification for rebuilding the Prompt Builder page from scratch. The implementation follows the established Section Card component structure while fixing architectural issues identified in the wireframe audit.

## Architecture Overview

### Page Structure
The Prompt Builder is a single-page application with the following layout hierarchy:

```
Prompt Builder Layout
├── Application Header
│   ├── StrategyMethod.AI Logo (left)
│   └── Action Controls (right)
│       ├── Close prompt button
│       └── Save button
├── Page Header Section  
│   ├── Title: "Prompt builder"
│   ├── Description: "This tool supports iterative development of StrategyMethod.AI prompts"
│   └── Action Bar
│       ├── Prompt notes button
│       ├── Example prompt button  
│       └── Support button
├── Main Content Container
│   ├── Required Sections Stack (5 Section Cards)
│   │   ├── 1. Prompt name (Required)
│   │   ├── 2. User input (Required)
│   │   ├── 3. Objectives (Required)
│   │   ├── 4. Output format (Required)
│   │   └── 5. Context (Required)
│   ├── Optional Sections Header
│   │   ├── Title: "Optional section"
│   │   └── Description: "Add fields for more precise control of prompt outputs"
│   └── Optional Sections Stack (2 Section Cards)
│       ├── 6. Sequential instructions (Collapsible)
│       └── 7. Constraints (Collapsible)
└── References Sidebar (Side Panel - opens when needed)
```

## Section Card Configuration Matrix

Each section uses the same Section Card template with specific configurations:

| Section | Badge | Rich Text | Multiple Fields | Field Refs | Prompt Refs | Character Limit | Special Features |
|---------|-------|-----------|----------------|------------|-------------|-----------------|------------------|
| Prompt name | Required | No | No | No | No | 40 chars | Simple text input |
| User input | Required | Yes | Yes | No | No | Unlimited | Add/remove fields |
| Objectives | Required | Yes | No | Yes | No | Unlimited | @ field references, alert tip |
| Output format | Required | Yes | No | No | No | Unlimited | Rich formatting only |
| Context | Required | Yes | No | Yes | Yes | Unlimited | Full reference system, learn more |
| Sequential instructions | Optional | Yes | No | Yes | Yes | Unlimited | "Add to prompt" collapsed state |
| Constraints | Optional | Yes | No | Yes | Yes | Unlimited | "Add to prompt" collapsed state |

## Section Card Structure (Aligned to Wireframe)

### Card Header Layout
Based on wireframe analysis, the header must be a **single horizontal row**:

```html
<header class="section-card__header">
    <div class="section-card__header-row">
        <div class="section-card__title-group">
            <h3 class="section-card__title">Card headline</h3>
            <span class="section-card__badge">Required/Optional</span>
        </div>
        <div class="section-card__controls">
            <a href="#" class="btn btn--link">Secondary control</a>
            <button class="btn btn--primary">Primary control</button>
        </div>
    </div>
    <p class="section-card__description">Card description text</p>
    <ul class="section-card__description-list">
        <li>Optional description list item</li>
        <li>Optional description list item</li>
    </ul>
</header>
```

### Content Structure
Simplified single-section content area (no collapsible subsections):

```html
<div class="section-card__content">
    <!-- Alert System (when needed) -->
    <div class="alert alert--info">
        <span class="alert__icon">info</span>
        <div class="alert__content">
            <div class="alert__headline">Alert headline</div>
            <div class="alert__description">Alert description</div>
        </div>
        <button class="alert__close">×</button>
    </div>
    
    <!-- Reference Controls Section (prompt references) -->
    <div class="reference-controls-section">
        <button class="btn btn--secondary">
            <span class="material-symbols-outlined">add</span>
            Add reference
        </button>
        <div class="reference-chips">
            <button class="reference-chip">
                <span class="reference-chip__count">2</span>
                <span class="reference-chip__label">Prompt references</span>
                <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="reference-chip">
                <span class="reference-chip__count">1</span>
                <span class="reference-chip__label">Field reference</span>
                <span class="material-symbols-outlined">edit</span>
            </button>
        </div>
    </div>
    
    <!-- Input Field -->
    <div class="input-field">
        <div class="field-header">
            <span class="field-label">Text input field label</span>
            <button class="field-remove">×</button>
        </div>
        
        <!-- Input Controls - toolbar and size controls side by side -->
        <div class="input-controls">
            <div class="rich-text-toolbar">
                <button class="toolbar-btn">T</button>
                <button class="toolbar-btn">B</button>
                <button class="toolbar-btn">I</button>
                <button class="toolbar-btn">•••</button>
            </div>
            <div class="text-field-size-controls">
                <button class="size-btn">Small</button>
                <button class="size-btn size-btn--active">Medium</button>
                <button class="size-btn">Large</button>
            </div>
        </div>
        
        <!-- Text Input Container -->
        <div class="text-input-container">
            <textarea class="text-input" placeholder="Enter text...">
                Text with inline field reference [chip] and @ menu
            </textarea>
        </div>
        
        <!-- Character Counter -->
        <div class="character-counter">
            <span class="character-count">45 / 40</span>
        </div>
    </div>
    
    <!-- Add Input Field Button -->
    <button class="btn btn--primary add-field-btn">
        <span class="material-symbols-outlined">add</span>
        Add input field
    </button>
</div>
```

## Section-Specific Configurations

### 1. Prompt Name Section
```javascript
{
    id: 'prompt-name',
    title: 'Prompt name',
    badge: 'Required',
    description: 'Help users understand what they can expect from this prompt\'s outputs.',
    richText: false,
    multipleFields: false,
    fieldReferences: false,
    promptReferences: false,
    characterLimit: 40,
    textFieldSizes: false,
    addFieldButton: false
}
```

### 2. User Input Section  
```javascript
{
    id: 'user-input',
    title: 'User input',
    badge: 'Required',
    description: 'Add text input fields to collect parameters and other information from users.',
    richText: true,
    multipleFields: true,
    fieldReferences: false,
    promptReferences: false,
    characterLimit: null,
    textFieldSizes: true,
    addFieldButton: true,
    defaultFields: ['Input field 1']
}
```

### 3. Objectives Section
```javascript
{
    id: 'objectives',
    title: 'Objectives',
    badge: 'Required',
    description: 'Describe of the objectives for this prompt. Be descriptive but concise.',
    richText: true,
    multipleFields: false,
    fieldReferences: true,
    promptReferences: false,
    characterLimit: null,
    textFieldSizes: true,
    addFieldButton: false,
    alert: {
        type: 'info',
        headline: 'Tip',
        description: 'Use the \'@\' symbol to reference other fields in this workflow.'
    }
}
```

### 4. Output Format Section
```javascript
{
    id: 'output-format',
    title: 'Output format',
    badge: 'Required',
    description: null,
    richText: true,
    multipleFields: false,
    fieldReferences: false,
    promptReferences: false,
    characterLimit: null,
    textFieldSizes: true,
    addFieldButton: false
}
```

### 5. Context Section
```javascript
{
    id: 'context',
    title: 'Context',
    badge: 'Required',
    description: 'Provide background information and context for this prompt.',
    descriptionList: [
        'Add background information',
        'Share field references across prompts from your library for the context',
        'Reference of future prompts'
    ],
    richText: true,
    multipleFields: false,
    fieldReferences: true,
    promptReferences: true,
    characterLimit: null,
    textFieldSizes: true,
    addFieldButton: false,
    secondaryControl: 'Learn more',
    referenceControls: true
}
```

### 6. Sequential Instructions Section (Optional)
```javascript
{
    id: 'sequential-instructions',
    title: 'Sequential instructions',
    badge: 'Optional',
    description: 'Outline the step-by-step process the agent should follow when responding to this prompt.',
    richText: true,
    multipleFields: false,
    fieldReferences: true,
    promptReferences: true,
    characterLimit: null,
    textFieldSizes: true,
    addFieldButton: false,
    collapsible: true,
    primaryControl: 'Add to prompt',
    expandedPrimaryControl: 'Remove from prompt'
}
```

### 7. Constraints Section (Optional)
```javascript
{
    id: 'constraints',
    title: 'Constraints',
    badge: 'Optional',
    description: 'Set specific parameters and limitations the agent should avoid.',
    richText: true,
    multipleFields: false,
    fieldReferences: true,
    promptReferences: true,
    characterLimit: null,
    textFieldSizes: true,
    addFieldButton: false,
    collapsible: true,
    primaryControl: 'Add to prompt',
    expandedPrimaryControl: 'Remove from prompt'
}
```

## Reference System Integration

### @ Symbol Popup Menu Hierarchy
```
@ Symbol Trigger
├── Field reference (always available)
│   ├── Field from current prompt → Opens sidebar with current prompt fields
│   └── Field from current workflow → Opens sidebar with workflow prompt selection
└── Prompt reference (Context section only) → Opens sidebar with workflow prompts
```

### References Sidebar Behavior
- **Layout**: Side panel using flexbox (main content shrinks, sidebar expands)
- **Width**: 400px on desktop
- **Animation**: 300ms smooth transition
- **Scoping**: Current workflow only - no cross-workflow references
- **Tab System**: Field References | Prompt References

## Modal Interactions

### 1. Prompt Notes Modal
**Triggered by**: Save button or Prompt notes button

```html
<div class="modal">
    <div class="modal__header">
        <h2>Prompt notes</h2>
        <button class="modal__close">×</button>
    </div>
    <div class="modal__content">
        <p>Note any changes or information that will be helpful to collaborators</p>
        <textarea class="modal__textarea"></textarea>
        <div class="notes-history">
            <table>
                <thead>
                    <tr>
                        <th>Prompt notes</th>
                        <th>Date</th>
                        <th>Editor</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- History entries -->
                </tbody>
            </table>
        </div>
    </div>
    <div class="modal__actions">
        <button class="btn btn--secondary">Dismiss</button>
        <button class="btn btn--primary">Save note</button>
    </div>
</div>
```

### 2. Unsaved Changes Confirmation
**Triggered by**: Close prompt button when changes exist

```html
<div class="modal">
    <div class="modal__content">
        <h2>You have unsaved changes</h2>
        <p>If you continue without saving all changes will be discarded</p>
    </div>
    <div class="modal__actions">
        <button class="btn btn--secondary">Continue editing</button>
        <button class="btn btn--primary">Close without saving</button>
    </div>
</div>
```

### 3. Context Learn More Modal
**Triggered by**: "Learn more" button in Context section header

```html
<div class="modal">
    <div class="modal__header">
        <h2>Context Section Guide</h2>
        <button class="modal__close">×</button>
    </div>
    <div class="modal__content">
        <p>Explanation of how to use the context section and reference system...</p>
    </div>
</div>
```

## Validation & Error Handling

### Form Validation Rules
- **Required Sections**: All 5 required sections must have content
- **Character Limits**: Only Prompt name has 40 character limit
- **Field Requirements**: User input must have at least one field with content
- **Reference Validation**: All references must be from current workflow

### Error Display Pattern
```html
<!-- Inline field error -->
<div class="text-input-container error">
    <textarea class="text-input text-input--error"></textarea>
    <div class="error-message">Character limit exceeded</div>
</div>

<!-- Section-level error -->
<div class="section-card section-card--error">
    <!-- Section content -->
</div>
```

### Progressive Character Count Feedback
- **Normal**: `<span class="character-count">25 / 40</span>`
- **Warning (>80%)**: `<span class="character-count character-count--warning">35 / 40</span>`
- **Error (exceeded)**: `<span class="character-count character-count--error">45 / 40</span>`

## State Management

### Save Workflow
1. User clicks "Save" button
2. Validation check performed on all required sections
3. If valid: Prompt notes modal opens
4. User adds note (optional) and clicks "Save note"
5. Prompt saved with note entry added to history
6. User navigated to prompt library

### Optional Section State
- **Collapsed State**: Shows title, description, "Add to prompt" button
- **Expanded State**: Full section card with all features enabled
- **Toggle Behavior**: "Add to prompt" expands, "Remove from prompt" collapses
- **State Persistence**: Section state maintained during session

### Navigation Workflow  
- **Close Prompt**: Returns to prompt library with unsaved changes check
- **From Library**: Users can open and edit existing prompts
- **No Breadcrumbs**: Simple back/forth between library and editor

## Responsive Design Requirements

### Desktop Layout (768px+)
- **Container**: Max-width 800px, centered
- **References Sidebar**: 400px side panel with flexbox shrinking
- **Section Cards**: Full width within container
- **Header**: Horizontal button layout

### Mobile Layout (<768px)
- **Layout**: Single column maintained
- **References Sidebar**: Full screen overlay (not side-by-side)
- **Header**: Responsive button sizing and stacking
- **Modals**: Full screen on mobile devices
- **Touch Targets**: Minimum 44px for all interactive elements

## Technical Implementation Requirements

### CSS Architecture
- **Variables**: Use existing CSS variables from `/shared/variables.css`
- **Component Isolation**: All Section Card styles prefixed with `.section-card__`
- **Responsive**: Mobile-first approach with breakpoint mixins
- **Animations**: Smooth transitions for state changes (300ms)

### JavaScript Functionality
- **Configuration-Driven**: Each section configured via JavaScript object
- **State Management**: Track form state, validation, and changes
- **Reference System**: @ symbol popup and sidebar integration
- **Modal System**: Reusable modal framework
- **Auto-Save**: Disabled - manual save only

### Accessibility Standards
- **Keyboard Navigation**: Full keyboard support for all interactions
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Visible focus indicators and logical tab order
- **Semantic HTML**: Use appropriate HTML elements for structure
- **Color Contrast**: Meet WCAG AA standards

## File Structure

### Primary Files
- `/prototype/pages/PromptBuilder.html` - Main implementation file
- `/prototype/shared/variables.css` - Design system variables (existing)
- `/prototype/shared/base.css` - Base styles (existing)

### Data Files (Future Phase 2)
- `/prototype/data/prompt-builder-config.js` - Section configurations
- `/prototype/data/workflow-scope-data.js` - Reference system data
- `/prototype/data/mock-prompts.js` - Sample prompt data

## Success Criteria

### User Experience Goals
- **Intuitive Flow**: Clear progression through required then optional sections
- **Reference Integration**: Seamless @ symbol usage with sidebar
- **Save Confidence**: Clear feedback on save status and validation
- **Wireframe Fidelity**: Exact match to provided wireframe layouts

### Technical Goals  
- **Component Reuse**: Single Section Card template for all 7 sections
- **Reference System**: Full workflow-scoped reference functionality
- **Responsive Design**: Consistent experience across devices
- **Performance**: Fast loading and responsive interactions

### Validation Goals
- **Error Prevention**: Clear validation feedback prevents invalid saves
- **Data Integrity**: All required content captured before save
- **User Guidance**: Helpful error messages guide users to completion
- **Recovery**: Easy path back to editing from error states

## Implementation Priority

### Phase 1: Core Structure (High Priority)
1. Application and page headers with proper actions
2. Section Card template with wireframe-aligned structure
3. All 7 section configurations implemented
4. Basic form validation and error handling

### Phase 2: Reference System (High Priority)
1. @ symbol popup menu hierarchy
2. References sidebar with flexbox layout
3. Workflow-scoped data integration
4. Inline field reference chips

### Phase 3: Modal System (Medium Priority)
1. Prompt notes modal with history table
2. Unsaved changes confirmation
3. Context learn more modal
4. Modal accessibility and responsive behavior

### Phase 4: Polish & Testing (Low Priority)
1. Responsive design refinement
2. Animation polish and performance
3. Accessibility audit and fixes
4. Cross-browser testing

---

This specification serves as the definitive guide for rebuilding the Prompt Builder page with correct Section Card architecture, proper wireframe alignment, and full functionality as specified in all requirements documents.