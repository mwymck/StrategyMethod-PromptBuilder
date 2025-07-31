# Section Card Component Requirements

## Template Overview

The Section Card serves as a **single, reusable template** that can be configured to create 7 different section instances for the Prompt Builder:

1. **Prompt name** (Required)
2. **User input** (Required) 
3. **Objectives** (Required)
4. **Output format** (Required)
5. **Context** (Required)
6. **Sequential instructions** (Optional)
7. **Constraints** (Optional)

Each instance is a **separate, independent card** - not collapsible sections within a single card. The template adapts its behavior, controls, and features based on configuration.

## Core Card Structure

### Card Header Layout
- **Single-row header** with title, badge, and controls aligned horizontally
- **Card title** (large, bold text) on the left
- **Card badge** (Required/Optional pill) positioned after title
- **Secondary control** (text link) and **Primary control** (button) on the right
- **Card description** text below the header row
- **Optional description list** (bullet points) when applicable

### Card Content Areas
- **Alert system** for notifications and status messages
- **Reference controls section** for prompt references (when applicable)
- **Input field(s)** with rich text capabilities
- **Add input field** functionality (for applicable sections)

## Section Configuration Matrix

| Section | Badge | Rich Text | Multiple Fields | Prompt Refs | Character Limit | Special Features |
|---------|-------|-----------|----------------|-------------|-----------------|------------------|
| Prompt name | Required | No | No | No | 40 chars | Simple text input |
| User input | Required | Yes | Yes | No | Variable | Add/remove fields |
| Objectives | Required | Yes | No | Yes | Variable | @ references |
| Output format | Required | Yes | No | No | Variable | Rich formatting |
| Context | Required | Yes | No | Yes | Variable | Prompt ref counter |
| Sequential instructions | Optional | Yes | No | Yes | Variable | "Add to prompt" action |
| Constraints | Optional | Yes | No | Yes | Variable | "Add to prompt" action |

## User Experience Patterns

### Text Input System
- **Input field container** with distinct border defining the input area
- **Text field size controls** (Small/Medium/Large) integrated with rich text toolbar to adjust textarea height for more content without scrolling
- **Rich text formatting toolbar** with Bold, Italic, Lists, Links (when enabled)
- **Character counting** with real-time feedback and progressive warnings
- **Progressive feedback states**: normal → warning (>80%) → error (exceeded limit)

### Reference System Integration
**Field References (Inline):**
- Typing "@" triggers hierarchical popup menu system:
  - Primary popup: "Field reference" / "Prompt reference" (context-dependent)
  - Secondary popup for fields: "Field from current prompt" / "Field from current workflow"
- **Workflow-scoped**: All references limited to current workflow only
- **Cross-prompt field references**: 2-step selection (prompt → field) for fields from other workflow prompts
- Selected field references appear as **blue chips inline** with text, showing source context when from other prompts
- Field reference chips can be removed via "x" button or edited by clicking
- **Side panel interface**: Opens alongside content (flexbox layout, not overlay) for reference selection

**Prompt References (Above Input):**
- **Reference controls section** displays above input area (Context section only)
- **"+ Add Prompt Reference" button** opens side panel with workflow prompts
- **Reference counter chips** showing "X prompt references" with edit capability
- **Workflow-scoped**: Only prompts from current workflow available, excluding current prompt
- **Not inline** - appear as controls above the text input area

### Input Field Management
- **Multiple input fields** stack vertically within the same card (User Input section)
- **"Add input field" button** at bottom of card for applicable sections
- **Field labels** are editable and clearly identify purpose
- **Remove field button** (X) in field label area when multiple fields exist

### Card Control System
**Header Controls:**
- **Secondary control** (text link) - context-dependent functionality
- **Primary control button** - main action for the section
- **Optional sections** show "Add to prompt" as primary action when not included
- **Required sections** show section-specific primary actions

**Card State Management:**
Each section card is **independent and non-collapsible**. Optional sections can be added/removed from the prompt but remain as separate cards when active.

## Interaction States & Validation

### Error States and Validation
- **Character limit violations** show immediate red error text feedback
- **Required field validation** with appropriate messaging for empty fields
- **Visual distinction** between warning (orange) and error (red) states
- **Clear guidance** provided to help users resolve validation issues
- **Progressive feedback** integrated with character counting system

### Alert System
- **Info alerts** with blue styling, icon, headline, and description
- **Close button** (X) to dismiss alerts
- **Contextual messaging** for configuration requirements and status updates

## Responsive & Accessibility Standards

### Responsive Behavior
- **Mobile-first design** with touch-friendly interaction targets
- **Stacked controls** on smaller screens for better usability
- **Adaptive text field size controls** that expand to fill available mobile width
- **Readable content** maintained across all device sizes

### Accessibility Features
- **Full keyboard navigation** support for all interactive elements
- **Visible focus indicators** for all focusable elements
- **ARIA labels** providing context for icon-only buttons and complex interactions
- **Semantic HTML structure** with proper heading hierarchy
- **Screen reader compatibility** for all content and controls

## Section-Specific Behaviors

### Prompt Name Section
- **Simple text input** with 40-character limit
- **No rich text formatting** or reference system
- **Character counter** with progressive feedback
- Focus on brevity and clarity

### User Input Section  
- **Multiple input fields** with add/remove functionality
- **Rich text capabilities** with formatting toolbar
- **Field label editing** for customization
- **No prompt references** (field references via @ only)

### Objectives, Context, Sequential Instructions, Constraints
- **Rich text input** with full formatting toolbar
- **Prompt reference system** with controls above input
- **@ field references** inline within text
- **Character counting** with section-appropriate limits

### Output Format Section
- **Enhanced rich text toolbar** with comprehensive formatting options
- **No reference system** integration
- Focus on text formatting and structure

### Context Section Special Features
- **Prompt reference counter chips** showing "X prompt references"
- **Reference management** above text input area
- **Combined text and reference input** capabilities