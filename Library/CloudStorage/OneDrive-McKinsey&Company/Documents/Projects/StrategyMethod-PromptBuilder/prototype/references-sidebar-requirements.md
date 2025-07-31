# References Sidebar Component Requirements

## Overview

The References Sidebar is a side panel component that enables users to browse and select field and prompt references for insertion into their prompt builder sections. The sidebar appears alongside the main content (not as an overlay) to allow simultaneous viewing of both the prompt builder and reference options. All references are scoped to the current workflow - users cannot reference fields or prompts from other workflows.

## Component Architecture

### Sidebar Structure
```
References Sidebar (Side Panel - No Search/Filtering)
├── Header Section
│   ├── Workflow Context: "Market Analysis Workflow"
│   ├── Title: "Add reference"
│   ├── Close Button (X)
│   └── Tab Navigation (Field | Prompt)
├── Content Area (Dynamic based on reference path)
│   ├── Mode 1: Field from Current Prompt
│   │   ├── Current Prompt Fields Only
│   │   │   ├── Section Group: User Input
│   │   │   ├── Section Group: Context  
│   │   │   └── Section Group: Objectives
│   │   └── Single Selection Actions
│   ├── Mode 2: Field from Current Workflow (Step 1)
│   │   ├── Workflow Prompt Selection
│   │   │   ├── "Competitive Analysis" (Published)
│   │   │   ├── "Market Sizing" (Draft)
│   │   │   └── "Consumer Behavior" (Current - Disabled)
│   │   └── Prompt Selection Actions
│   ├── Mode 3: Field from Current Workflow (Step 2)
│   │   ├── Selected Prompt Fields
│   │   │   ├── Section Group: User Input
│   │   │   └── Section Group: Context
│   │   └── Field Selection Actions
│   └── Mode 4: Prompt References
│       ├── Available Workflow Prompts
│       │   ├── "Competitive Analysis" (Published)
│       │   ├── "Market Sizing" (Draft)
│       │   └── "Consumer Behavior" (Current - Disabled)
│       └── Multi-Selection Actions
└── Footer Section
    ├── Selected Count Indicator
    ├── Cancel Button
    └── Add Selected Button
```

## Reference Menu Structure (@ Symbol Popup)

### Primary Reference Menu
When user types "@", a small popup appears with:
```
┌─────────────────────┐
│ Field reference     │
│ Prompt reference    │ (only in Context section)
└─────────────────────┘
```

### Secondary Field Reference Menu  
When "Field reference" is selected, secondary popup appears:
```
┌─────────────────────────────────┐
│ Field from current prompt       │
│ Field from current workflow     │
└─────────────────────────────────┘
```

### Menu Navigation Flow
1. **Field from current prompt** → Sidebar opens with current prompt fields only
2. **Field from current workflow** → Sidebar opens with workflow prompt selection, then field selection
3. **Prompt reference** → Sidebar opens directly with workflow prompt selection

## Behavioral Requirements

### Opening the Sidebar
- **Trigger 1:** User clicks "Add Prompt Reference" button above Context section
  - Opens sidebar with Prompt tab active
- **Trigger 2:** User types "@" symbol in text field
  - Shows small popup menu with reference type options:
    - "Field reference" (always available)  
    - "Prompt reference" (only available when in Context section)
  - Sidebar opens when user selects reference type from popup
- **Trigger 3:** User clicks existing reference chip
  - Opens sidebar for editing that specific reference

### Sidebar Animation & Layout
- Appears as side panel alongside main content (not overlay)
- Uses flexbox layout: main content shrinks, sidebar expands
- Animation duration: ~300ms with smooth easing
- Sidebar width: 400px on desktop
- Main content maintains readability when sidebar is open

### Tab Navigation
- **Field References Tab:** For inline chip references within text
- **Prompt References Tab:** For non-inline references that appear as counters
- Active tab highlighted with blue underline/background
- Clicking tab switches content area instantly

## Workflow Scope & Reference Logic

### Current Workflow Context
- **Workflow Boundary:** All references must come from the current workflow only
- **Workflow Structure:** Each workflow contains multiple prompts, each prompt contains multiple sections with fields
- **Reference Scope:** Users can reference:
  - Fields from any section within the current prompt
  - Fields from any section within other prompts in the same workflow
  - Entire prompts from the current workflow (for prompt references)

### Workflow Data Structure
```javascript
const currentWorkflow = {
  id: 'workflow_001',
  name: 'Market Analysis Workflow',
  prompts: [
    {
      id: 'prompt_001',
      name: 'Consumer Behavior Analysis',
      sections: [
        { id: 'user-input', fields: [...] },
        { id: 'context', fields: [...] }
      ]
    },
    {
      id: 'prompt_002', 
      name: 'Competitive Landscape Review',
      sections: [...]
    }
  ]
};
```

## Field References Tab

### Display Format
Each field reference shows (grouped by prompt and section):
- **Prompt Name:** "Consumer Behavior Analysis" 
- **Section Name:** "User Input"
- **Field Label:** "Customer Demographics"
- **Field Value Preview:** Truncated current content or placeholder
- **Selection Checkbox:** For multi-select functionality

### Selection Behavior
- Single-click on field item selects/deselects it
- Checkbox reflects selection state
- Selected items highlighted with blue background
- For inline references: Only single selection allowed
- Multiple selections allowed for batch operations

### Field List Organization
- Group by Prompt → Section → Field hierarchy
- Current prompt fields shown first, then other workflow prompts
- Expandable/collapsible prompt groups
- Show field count per section
- Display empty state if no fields available in workflow

## Prompt References Tab

### Display Format
Each prompt reference shows (from current workflow only):
- **Prompt Name:** "Consumer Behavior Analysis"
- **Prompt Objective/Description:** Brief description of what the prompt accomplishes
- **Status Indicator:** Draft, Published, In Review
- **Selection Checkbox:** For multi-select functionality
- **Current Prompt Indicator:** Show which prompt user is currently editing

### Selection Behavior
- Multiple prompt references can be selected from current workflow
- Selected prompts increment the counter above Context section
- Cannot reference the currently active prompt (disabled state)
- Selection state persists when switching tabs
- Prompts listed in workflow order

## Interaction Patterns

### For Inline Field References
1. User types "@" in text field
2. Small popup menu appears with reference type options:
   - "Field reference" (always available)
   - "Prompt reference" (only if in Context section)
3. User selects "Field reference"
4. Secondary popup menu appears with field scope options:
   - "Field from current prompt"
   - "Field from current workflow"
5a. If "Field from current prompt" selected:
   - Sidebar opens with current prompt fields only
   - User selects field, sidebar closes, chip inserted
5b. If "Field from current workflow" selected:
   - Sidebar opens showing workflow prompts (excluding current)
   - User selects prompt, then selects field from that prompt
   - Sidebar closes, chip inserted with prompt context

### For Prompt Reference Counter
1. User clicks "Add Prompt Reference" button above Context section
2. Sidebar opens alongside content with Prompt tab active
3. User selects one or more prompt references from current workflow
4. User clicks "Add Selected" button
5. Sidebar closes, counter above Context updates

### For @ Symbol in Context Section
1. User types "@" in Context section text field
2. Popup menu shows both options:
   - "Field reference" → Follows field reference sub-menu pattern above
   - "Prompt reference" → Opens sidebar directly with workflow prompts
3. Sidebar behavior follows respective patterns above

### For Editing Existing References
1. User clicks existing reference chip or counter
2. Sidebar opens alongside content with appropriate tab
3. Current selection pre-highlighted
4. User can change selection within current workflow scope
5. Changes applied when "Update" button clicked

## Visual Design Requirements

### Layout Specifications
- **Sidebar Width:** 400px on desktop
- **Main Content:** Uses flexbox to shrink when sidebar opens
- **Header Height:** 64px with title and tabs
- **Content Area:** Scrollable list with padding, no search bars
- **Footer Height:** 72px with action buttons

### Flexbox Layout System
```css
.page-container {
  display: flex;
  transition: all 300ms ease;
}

.main-content {
  flex: 1;
  min-width: 0; /* Allows shrinking */
  transition: all 300ms ease;
}

.references-sidebar {
  width: 0;
  overflow: hidden;
  transition: all 300ms ease;
}

.references-sidebar--open {
  width: 400px;
}
```

### Styling Elements
- **Background:** White with subtle border-left shadow
- **Tab Style:** Underlined active state, gray inactive
- **List Items:** 56px height with hover states, grouped by prompt/section
- **Selection State:** Blue background (#2563eb) with white text
- **Buttons:** Primary blue for "Add Selected", secondary gray for "Cancel"
- **Workflow Context:** Header showing current workflow name

### Interactive States
- **Hover:** Subtle background color change on list items
- **Selected:** Blue background with white text
- **Disabled:** Grayed out for current prompt in prompt references
- **Empty State:** Message indicating no fields/prompts in current workflow

## Data Requirements

### Mock Data Structure
```javascript
const workflowScopeData = {
  currentWorkflow: {
    id: 'workflow_001',
    name: 'Market Analysis Workflow',
    currentPromptId: 'prompt_001'
  },
  
  fieldReferences: [
    {
      id: 'field_001',
      promptId: 'prompt_001',
      promptName: 'Consumer Behavior Analysis',
      sectionId: 'user-input',
      sectionName: 'User Input', 
      fieldLabel: 'Customer Demographics',
      fieldValue: 'Analyze market trends for consumer electronics...',
      fieldType: 'rich-text',
      isCurrentPrompt: true
    },
    {
      id: 'field_002',
      promptId: 'prompt_002', 
      promptName: 'Competitive Landscape Review',
      sectionId: 'context',
      sectionName: 'Context',
      fieldLabel: 'Market Analysis Scope',
      fieldValue: 'Focus on consumer electronics market in North America',
      fieldType: 'rich-text',
      isCurrentPrompt: false
    }
  ],
  
  promptReferences: [
    {
      id: 'prompt_001',
      name: 'Consumer Behavior Analysis',
      objective: 'Analyze customer behavior patterns and preferences',
      status: 'draft',
      isCurrentPrompt: true, // Cannot be selected
      isSelected: false
    },
    {
      id: 'prompt_002',
      name: 'Competitive Landscape Review',
      objective: 'Comprehensive analysis of competitive market conditions',
      status: 'published',
      isCurrentPrompt: false,
      isSelected: true
    },
    {
      id: 'prompt_003',
      name: 'Market Sizing Analysis',
      objective: 'Quantify market opportunities and sizing estimates',
      status: 'draft',
      isCurrentPrompt: false,
      isSelected: false
    }
  ]
};
```

## Accessibility Requirements

### Keyboard Navigation
- Tab key navigates between interactive elements
- Arrow keys navigate within reference lists
- Enter/Space selects/deselects references
- Escape key closes sidebar

### Screen Reader Support
- Proper ARIA labels for all interactive elements
- Live region announcements for selection changes
- Clear heading hierarchy for navigation
- Focus management when opening/closing

### Focus Management
- Focus moves to sidebar when opened
- Focus returns to trigger element when closed
- Visible focus indicators on all interactive elements

## Technical Implementation Notes

### Component Integration
- Sidebar component should be modular and reusable
- State management for selections and current tab
- Event handlers for opening/closing and selections
- Integration with main prompt builder for data updates

### Performance Considerations
- Lazy load reference data when sidebar opens
- Virtual scrolling for large reference lists
- Debounced search functionality
- Efficient re-rendering on selection changes

### Responsive Behavior
- **Desktop:** Side panel layout with flexbox shrinking
- **Tablet:** Reduced sidebar width (320px) with main content compression
- **Mobile:** Full-width overlay when opened (traditional mobile pattern)
- Touch-friendly interaction targets (44px minimum)
- Adjusted spacing and typography for smaller screens

## Success Criteria

### User Experience Goals  
- Users can find and select references within current workflow scope
- Clear visual hierarchy showing prompt → section → field relationships
- Side-by-side viewing enables context while selecting references
- Workflow boundary clearly communicated (no external references)
- Smooth flexbox animations that don't disrupt main content flow

### Prototype Fidelity Targets
- Accurate workflow scoping with realistic data relationships
- Proper @ symbol popup menu with contextual options
- Side panel layout that maintains main content readability
- Workflow-aware reference filtering and organization
- Consistent with overall design system and flexbox layout principles

---

*This document outlines the requirements for the References Sidebar component. Please review and refine based on additional context and specific implementation needs.*