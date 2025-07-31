# Prompt Builder Layout Requirements

## Overview

The Prompt Builder is a single-page application for creating and editing StrategyMethod.AI prompts. It uses a vertical layout containing seven Section Card components in a specific order, with integrated reference management, modal interactions, and comprehensive save/validation workflows.

## Layout Architecture

### Page Structure
```
Prompt Builder Layout
├── Header Section
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
├── Required Sections Stack (5 cards)
│   ├── Prompt name (Required)
│   ├── User input (Required)
│   ├── Objectives (Required)
│   ├── Output format (Required)
│   └── Context (Required)
├── Optional Sections Header
│   ├── Title: "Optional section"
│   └── Description: "Add fields for more precise control of prompt outputs"
└── Optional Sections Stack (2 cards)
    ├── Sequential instructions (Collapsible)
    └── Constraints (Collapsible)
```

## Section Card Configuration Mapping

### 1. Prompt Name Section
**Section Card Configuration: `prompt-name`**
- **Type:** Required, always expanded
- **Features:** Simple text input only
- **Character Limit:** 40 characters maximum
- **Rich Text:** Disabled
- **References:** Disabled
- **Field Management:** Single field only

### 2. User Input Section  
**Section Card Configuration: `user-input`**
- **Type:** Required, always expanded
- **Features:** Multiple field management, text size controls
- **Character Limit:** Unlimited for all fields
- **Rich Text:** Disabled (plain text areas)
- **References:** Disabled
- **Field Management:** Dynamic add/remove with "+ Add input field" button
- **Default State:** Starts with only "Input field 1"

### 3. Objectives Section
**Section Card Configuration: `objectives`**  
- **Type:** Required, always expanded
- **Features:** Field references only, alert tip
- **Reference System:** @ symbol triggers field references only (no prompt references)
- **Alert Component:** "Tip: use the '@' symbol to reference other fields in this workflow"
- **Character Limit:** Unlimited
- **Rich Text:** Disabled

### 4. Output Format Section
**Section Card Configuration: `output-format`**
- **Type:** Required, always expanded  
- **Features:** Rich text toolbar enabled
- **Rich Text:** Full toolbar (Bold, Italic, Lists, Links)
- **References:** Disabled
- **Character Limit:** Unlimited

### 5. Context Section
**Section Card Configuration: `context`**
- **Type:** Required, always expanded
- **Features:** Full reference system, reference counters, learn more modal
- **Reference System:** Both field and prompt references via @ symbol
- **Reference Controls:**
  - "Add reference" button (opens references sidebar)
  - "[X] prompt references" counter (clickable to edit)
  - "[X] field reference" counter (clickable to edit)
- **Additional Elements:**
  - "Learn more" button in header (opens context explanation modal)
  - Horizontal divider below header
- **Character Limit:** Unlimited

### 6. Sequential Instructions Section
**Section Card Configuration: `sequential-instructions`**
- **Type:** Optional, starts collapsed
- **Features:** Add to prompt functionality, full reference system when expanded
- **Collapsed State:** Shows title, description, "Add to prompt" button
- **Expanded State:** Full section card with text input and reference system
- **References:** Both field and prompt references when expanded

### 7. Constraints Section  
**Section Card Configuration: `constraints`**
- **Type:** Optional, starts collapsed
- **Features:** Add to prompt functionality, full reference system when expanded
- **Collapsed State:** Shows title, description, "Add to prompt" button  
- **Expanded State:** Full section card with text input and reference system
- **References:** Both field and prompt references when expanded

## Header Components

### Application Header
- **Logo:** StrategyMethod.AI branding (left side)
- **Close Button:** "Close prompt" - triggers unsaved changes confirmation if needed
- **Save Button:** "Save" - triggers prompt notes modal workflow

### Page Header
- **Title:** "Prompt builder" 
- **Description:** "This tool supports iterative development of StrategyMethod.AI prompts"
- **Action Buttons:**
  - **Prompt notes:** Opens prompt notes modal
  - **Example prompt:** Opens example prompt modal (future implementation)
  - **Support:** Initiates email to support team

## Modal Interactions

### 1. Prompt Notes Modal
**Trigger:** Save button click or Prompt notes button click

**Modal Structure:**
- **Header:** "Prompt notes" with X close button
- **Description:** "Note any changes or information that will be helpful to collaborators"
- **Text Area:** Large text input for note content
- **Actions:** 
  - "Dismiss" button (closes modal without saving)
  - "Save note" button (saves note and adds to history table)

**Notes History Table:**
- **Columns:** Prompt notes | Date | Editor
- **Auto-populated:** Date stamp and logged-in user name
- **Display:** Chronological list of all saved notes

### 2. Unsaved Changes Confirmation
**Trigger:** Close prompt button click when changes exist

**Modal Structure:**
- **Message:** "You have unsaved changes"
- **Subtitle:** "If you continue without saving all changes will be discarded"
- **Actions:**
  - "Continue editing" button (closes modal, returns to editor)
  - "Close without saving" button (navigates to prompt library)

### 3. Context Learn More Modal
**Trigger:** "Learn more" button in Context section header

**Content:** Explanation of how to use the context section and reference system

## Validation & Error Handling

### Form Validation Rules
- **Required Sections:** Prompt name, User input, Objectives, Output format, Context must have content
- **Character Limits:** Only Prompt name has 40 character limit
- **Field Requirements:** User input must have at least one field with content

### Error Display Pattern
- **Inline Errors:** Red border and error message below invalid fields
- **Section-Level Errors:** Error state applied to entire section card
- **Save Prevention:** Save button disabled when validation errors exist
- **Error Summary:** Modal showing all validation errors when save attempted with invalid data

## Reference System Integration

### Hierarchical Reference Menu
- **@ Symbol Trigger:** Opens primary popup menu
- **Context Section:** Both "Field reference" and "Prompt reference" options
- **Other Sections:** Only "Field reference" option (where applicable)
- **Secondary Menu:** Field scope selection (current prompt vs current workflow)
- **Sidebar Integration:** References sidebar opens alongside content (flexbox layout)

### Reference Counters (Context Section Only)
- **Prompt References Counter:** "[X] prompt references" with edit button
- **Field References Counter:** "[X] field references" with edit button  
- **Interactive:** Clicking counter opens references sidebar in appropriate mode
- **Real-time Updates:** Counters update when references added/removed

## Responsive Design

### Mobile Adaptation
- **Layout:** Single column maintained on all screen sizes
- **Section Cards:** Full width, stack vertically
- **References Sidebar:** Full screen overlay on mobile (not side-by-side)
- **Header:** Responsive button sizing and spacing
- **Modals:** Full screen on mobile devices

### Desktop Layout
- **Max Width:** Container with reasonable max-width for readability
- **References Sidebar:** 400px side panel with flexbox layout
- **Section Cards:** Consistent spacing and alignment
- **Typography:** Optimized for desktop reading

## State Management

### Save Workflow
1. User clicks "Save" button
2. Validation check performed
3. If valid: Prompt notes modal opens
4. User adds note (optional) and clicks "Save note"
5. Prompt saved with note entry added to history
6. User navigated to prompt library

### Navigation Workflow  
- **Close Prompt:** Returns to prompt library
- **From Library:** Users can open and edit existing prompts
- **No Breadcrumbs:** Simple back/forth between library and editor

### Optional Section State
- **Add to Prompt:** Expands collapsed section to full section card
- **Remove from Prompt:** Returns expanded section to collapsed state
- **State Persistence:** Section state maintained during session
- **Save Behavior:** Both collapsed and expanded states saved with prompt

## Technical Implementation Notes

### Section Card Reusability
- **Single Component:** All sections use the same Section Card component
- **Configuration-Driven:** Each section defined by configuration object
- **Dynamic Features:** Features enabled/disabled based on section type
- **Consistent Styling:** All sections follow same visual design system

### Integration Points
- **Reference System:** Leverages hierarchical reference system implemented in Section Card
- **Design System:** Uses established CSS variables and component patterns
- **Modal System:** Consistent modal framework for all overlays
- **Form Handling:** Standard form validation and error display patterns

### Performance Considerations
- **Lazy Loading:** Optional sections only fully initialize when expanded
- **Reference Data:** Workflow-scoped data loading for reference system
- **Auto-save:** Disabled - manual save only to prevent performance issues
- **State Optimization:** Efficient re-rendering of section cards on state changes

## Success Criteria

### User Experience Goals
- **Intuitive Flow:** Clear progression through required then optional sections
- **Reference Integration:** Seamless @ symbol usage across appropriate sections  
- **Save Confidence:** Clear feedback on save status and validation errors
- **Collaboration Support:** Notes system enables team coordination

### Technical Goals  
- **Component Reuse:** Efficient use of Section Card component across all sections
- **Reference System:** Smooth integration of hierarchical reference system
- **Responsive Design:** Consistent experience across all device sizes
- **Performance:** Fast loading and responsive interactions throughout

### Validation Goals
- **Error Prevention:** Clear validation feedback prevents invalid saves
- **Data Integrity:** All required content captured before save allowed
- **User Guidance:** Helpful error messages guide users to completion
- **Recovery:** Easy path back to editing from error states

---

*This requirements document serves as the comprehensive specification for implementing the Prompt Builder layout using the existing Section Card component system with integrated reference management capabilities.*