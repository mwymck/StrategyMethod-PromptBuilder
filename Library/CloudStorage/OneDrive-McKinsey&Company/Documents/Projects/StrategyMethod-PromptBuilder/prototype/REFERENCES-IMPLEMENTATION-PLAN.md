# References Sidebar Implementation Plan
*Target: 30 minutes total implementation*

## Implementation Focus
**Single Objective:** Add hierarchical reference system to existing Section Card component with side-by-side sidebar interface.

## Pre-Implementation Checklist
- ✅ Section Card component exists at `prototype/components/SectionCard.html`
- ✅ CSS variables system in place (`shared/variables.css`)
- ✅ Current @ symbol detection already implemented
- ✅ Basic reference chip styling exists

## Implementation Steps

### Step 1: Update @ Symbol Popup (8 minutes)
**Current:** Simple dropdown with field/prompt options  
**Target:** Hierarchical popup with secondary menu for field references

```javascript
// Replace existing @ detection with:
function showReferenceTypeMenu(event, sectionType) {
  const isContextSection = sectionType === 'context';
  const primaryOptions = [
    { id: 'field', label: 'Field reference', available: true },
    { id: 'prompt', label: 'Prompt reference', available: isContextSection }
  ];
  
  showPopupMenu(primaryOptions, (selection) => {
    if (selection === 'field') {
      showFieldScopeMenu();
    } else {
      openSidebar('prompt-mode');
    }
  });
}

function showFieldScopeMenu() {
  const scopeOptions = [
    { id: 'current-prompt', label: 'Field from current prompt' },
    { id: 'current-workflow', label: 'Field from current workflow' }
  ];
  
  showPopupMenu(scopeOptions, (selection) => {
    if (selection === 'current-prompt') {
      openSidebar('current-fields-mode');
    } else {
      openSidebar('workflow-prompts-mode');
    }
  });
}
```

### Step 2: Create Sidebar HTML Structure (5 minutes)
**Add to existing SectionCard.html:**

```html
<!-- References Sidebar (initially hidden) -->
<div id="references-sidebar" class="references-sidebar">
  <div class="sidebar-header">
    <div class="workflow-context">Market Analysis Workflow</div>
    <h3>Add reference</h3>
    <button class="sidebar-close" onclick="closeSidebar()">×</button>
  </div>
  
  <div class="sidebar-content" id="sidebar-content">
    <!-- Dynamic content based on mode -->
  </div>
  
  <div class="sidebar-footer">
    <span class="selection-count">0 selected</span>
    <button class="btn-secondary" onclick="closeSidebar()">Cancel</button>
    <button class="btn-primary" onclick="addSelectedReferences()">Add Selected</button>
  </div>
</div>
```

### Step 3: Add Flexbox Layout CSS (5 minutes)
**Add to existing CSS:**

```css
.page-container {
  display: flex;
  transition: all 300ms ease;
}

.main-content {
  flex: 1;
  min-width: 0;
  transition: all 300ms ease;
}

.references-sidebar {
  width: 0;
  overflow: hidden;
  background: white;
  border-left: 1px solid var(--colors--border);
  transition: all 300ms ease;
}

.references-sidebar--open {
  width: 400px;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid var(--colors--border);
}

.sidebar-content {
  padding: 16px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.reference-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.reference-item:hover {
  background: var(--colors--surface-hover);
}

.reference-item--selected {
  background: var(--colors--electric-blue-500);
  color: white;
}
```

### Step 4: Create Mock Workflow Data (4 minutes)
**Add to JavaScript section:**

```javascript
const mockWorkflowData = {
  currentWorkflow: {
    id: 'workflow_001',
    name: 'Market Analysis Workflow',
    currentPromptId: 'prompt_001'
  },
  
  currentPromptFields: [
    { id: 'field_001', label: 'Customer Demographics', section: 'User Input', value: 'Target market analysis...' },
    { id: 'field_002', label: 'Market Context', section: 'Context', value: 'Consumer electronics market...' }
  ],
  
  workflowPrompts: [
    { id: 'prompt_001', name: 'Consumer Behavior Analysis', isCurrentPrompt: true, status: 'draft' },
    { id: 'prompt_002', name: 'Competitive Landscape Review', isCurrentPrompt: false, status: 'published' },
    { id: 'prompt_003', name: 'Market Sizing Analysis', isCurrentPrompt: false, status: 'draft' }
  ],
  
  workflowFields: [
    { id: 'field_003', label: 'Competitive Analysis', section: 'Context', promptName: 'Competitive Landscape Review', value: 'Key competitors include...' },
    { id: 'field_004', label: 'Market Size Estimates', section: 'User Input', promptName: 'Market Sizing Analysis', value: 'Total addressable market...' }
  ]
};
```

### Step 5: Implement Sidebar Mode Switching (5 minutes)
**Add sidebar content rendering:**

```javascript
function openSidebar(mode) {
  const sidebar = document.getElementById('references-sidebar');
  const sidebarContent = document.getElementById('sidebar-content');
  
  sidebar.classList.add('references-sidebar--open');
  
  switch(mode) {
    case 'current-fields-mode':
      sidebarContent.innerHTML = renderCurrentFields();
      break;
    case 'workflow-prompts-mode':
      sidebarContent.innerHTML = renderWorkflowPrompts();
      break;
    case 'prompt-mode':
      sidebarContent.innerHTML = renderPromptReferences();
      break;
  }
}

function renderCurrentFields() {
  return mockWorkflowData.currentPromptFields.map(field => `
    <div class="reference-item" data-field-id="${field.id}">
      <input type="checkbox" />
      <div class="reference-info">
        <div class="reference-label">${field.label}</div>
        <div class="reference-section">${field.section}</div>
      </div>
    </div>
  `).join('');
}

function renderWorkflowPrompts() {
  return mockWorkflowData.workflowPrompts
    .filter(prompt => !prompt.isCurrentPrompt)
    .map(prompt => `
      <div class="reference-item" data-prompt-id="${prompt.id}">
        <div class="reference-info">
          <div class="reference-label">${prompt.name}</div>
          <div class="reference-status">${prompt.status}</div>
        </div>
      </div>
    `).join('');
}
```

### Step 6: Add Reference Insertion Logic (3 minutes)
**Simple chip insertion:**

```javascript
function addSelectedReferences() {
  const selectedItems = document.querySelectorAll('.reference-item--selected');
  selectedItems.forEach(item => {
    const fieldId = item.dataset.fieldId;
    const field = mockWorkflowData.currentPromptFields.find(f => f.id === fieldId);
    if (field) {
      insertReferenceChip(field.label, fieldId);
    }
  });
  closeSidebar();
}

function insertReferenceChip(label, fieldId) {
  const chip = `<span class="reference-chip" data-field-id="${fieldId}">
    ${label}
    <button class="chip-remove" onclick="removeChip(this)">×</button>
  </span>`;
  
  // Insert at current cursor position (simplified for prototype)
  const activeTextarea = document.activeElement;
  if (activeTextarea && activeTextarea.tagName === 'TEXTAREA') {
    const cursorPos = activeTextarea.selectionStart;
    const textBefore = activeTextarea.value.substring(0, cursorPos);
    const textAfter = activeTextarea.value.substring(cursorPos);
    activeTextarea.value = textBefore + chip + textAfter;
  }
}
```

## Success Criteria (30 minutes total)
- ✅ @ symbol triggers hierarchical popup menus
- ✅ Sidebar opens alongside content (flexbox layout)
- ✅ Basic workflow-scoped reference selection
- ✅ Reference chips inserted into text
- ✅ All existing Section Card functionality preserved

## What We're NOT Building (Out of Scope)
- ❌ Multi-page navigation system
- ❌ Dashboard interface
- ❌ Complex field management
- ❌ Rich text toolbar enhancements
- ❌ Auto-save functionality
- ❌ Production API integration
- ❌ User testing scenarios
- ❌ Engineering handoff documentation

## Testing Checklist
1. Type "@" in any text field → Primary popup appears
2. Select "Field reference" → Secondary popup appears
3. Select scope option → Sidebar opens alongside content
4. Select reference → Chip inserted into text
5. All existing Phase 1 functionality still works
6. Sidebar closes and reopens smoothly
7. Flexbox layout maintains content readability

This focused plan transforms the 724-line comprehensive document into an actionable 30-minute implementation targeting only the essential reference system functionality.