# Section Card Wireframe Audit & Alignment Instructions

## Executive Summary

After reviewing the wireframe `/Prompt Buolder - Card Component.jpg` and comparing it to the current Section Card implementation, there are significant structural misalignments. The current implementation follows a complex multi-section card pattern, while the wireframe shows a simpler, more focused single-section card structure.

## Wireframe Analysis

### Key Elements Identified in Wireframe:

1. **Card Structure:**
   - Single card container with rounded corners and shadow
   - Light gray/white background with subtle border

2. **Header Section:**
   - **Card headline** (large, bold text - "Card headline")
   - **Card Badge** (gray pill - "Card Badge") 
   - **Secondary card control** (blue text link - "Secondary card control")
   - **Primary card control** (blue button - "Primary card control")
   - **Card description** (smaller gray text below headline)
   - **Optional description list** (bullet points with "Optional description list item")

3. **Alert System:**
   - **Blue info alert banner** with:
     - Info icon (circle with 'i')
     - "Alert headline" text
     - "Alert description" text  
     - Close 'X' button on the right

4. **Reference Controls Section:**
   - **"+ Add reference"** button (blue with plus icon)
   - **Reference chips:**
     - "2 Prompt references" (blue pill with number and edit icon)
     - "1 Field reference" (blue pill with number and edit icon)

5. **Input Field Section:**
   - **Field label:** "Text input field label" with X button (for removal)
   - **Rich text toolbar** with formatting buttons (T dropdown, Bold, Italic, more options)
   - **Text field size controls:** "Small", "Medium", "Large" tabs (Medium selected) to adjust textarea height
   - **Text input area** with:
     - Placeholder text about supporting inline references
     - Example of inline reference chip "inline field reference" with X
     - @ symbol trigger for reference menu
     - Reference dropdown showing "Field" and "Prompt" options

6. **Add Input Field Button:**
   - Blue button with "+ Add input field" at bottom

## Misalignments with Current Implementation

### 1. **Card Structure Issues:**
- ❌ **Current:** Complex multi-section card with collapsible sections
- ✅ **Wireframe:** Simple single card with one main input section
- **Action Required:** Simplify to single card structure

### 2. **Header Layout Problems:**
- ❌ **Current:** Title and controls in separate rows with complex header-top structure
- ✅ **Wireframe:** Title, badge, and controls in a single horizontal row
- **Action Required:** Restructure header to single-line layout

### 3. **Section Management Mismatch:**
- ❌ **Current:** Multiple collapsible sections (Sequential Instructions, Constraints, User Input)
- ✅ **Wireframe:** One main input section only
- **Action Required:** Remove collapsible section system

### 4. **Reference System Issues:**
- ❌ **Current:** Reference controls scattered within character counter
- ✅ **Wireframe:** Reference controls prominently displayed above input field
- **Action Required:** Move reference controls to dedicated section above input

### 5. **Text Field Size Control Placement:**
- ❌ **Current:** Text field size controls in field label area
- ✅ **Wireframe:** Text field size controls integrated with rich text toolbar (controls textarea height)
- **Action Required:** Move size controls adjacent to formatting toolbar

### 6. **Input Field Management:**
- ❌ **Current:** Multiple input fields with individual labels and remove buttons
- ✅ **Wireframe:** Single input field with field label and remove functionality
- **Action Required:** Simplify to single input field model

## Requirements Mapping to Wireframe

### Correctly Mapped Elements:
✅ **Alert System** - Matches wireframe info alert with icon, headline, description, close
✅ **Reference Chips** - Blue chips with counts and edit capabilities match wireframe
✅ **@ Reference Dropdown** - Field/Prompt options match wireframe
✅ **Rich Text Toolbar** - Formatting buttons match wireframe toolbar
✅ **Character Counting** - Referenced in requirements but not shown in wireframe
✅ **Add Input Field Button** - Blue button matches wireframe

### Incorrectly Implemented Elements:
❌ **Card Header Layout** - Should be single row, not multi-row
❌ **Section Structure** - Should be flat, not nested collapsible sections
❌ **Reference Control Placement** - Should be above input, not in counter area
❌ **Text Field Size Integration** - Should be with toolbar, not in field label (controls textarea height)

## Alignment Instructions

### Phase 1: Restructure Card Layout

1. **Simplify Card Header:**
   ```html
   <header class="section-card__header">
     <div class="section-card__header-row">
       <h3 class="section-card__title">Card headline</h3>
       <div class="section-card__meta">
         <span class="section-card__badge">Card Badge</span>
         <a href="#" class="btn btn--link">Secondary card control</a>
         <button class="btn btn--primary">Primary card control</button>
       </div>
     </div>
     <p class="section-card__description">Card description</p>
     <ul class="section-card__description-list">
       <li>Optional description list item</li>
       <li>Optional description list item</li>
     </ul>
   </header>
   ```

2. **Remove Section System:**
   - Delete all `.section-item` containers
   - Remove collapsible functionality
   - Flatten content to single level

3. **Restructure Content Area:**
   ```html
   <div class="section-card__content">
     <!-- Alert (if needed) -->
     <div class="alert">...</div>
     
     <!-- Reference Controls -->
     <div class="reference-controls-section">
       <button class="btn btn--secondary">+ Add reference</button>
       <div class="reference-chips">
         <span class="reference-chip">2 Prompt references <button>edit</button></span>
         <span class="reference-chip">1 Field reference <button>edit</button></span>
       </div>
     </div>
     
     <!-- Input Field -->
     <div class="input-field">
       <div class="field-header">
         <span class="field-label">Text input field label</span>
         <button class="field-remove">×</button>
       </div>
       
       <div class="input-controls">
         <div class="rich-text-toolbar">
           <!-- Formatting buttons -->
         </div>
         <div class="text-field-size-controls">
           <button>Small</button>
           <button class="active">Medium</button>
           <button>Large</button>
         </div>
       </div>
       
       <div class="text-input-container">
         <textarea>...</textarea>
       </div>
     </div>
     
     <!-- Add Input Field -->
     <button class="btn btn--primary">+ Add input field</button>
   </div>
   ```

### Phase 2: Update CSS Architecture

1. **Remove Collapsible CSS:**
   - Delete `.section-item__*` classes
   - Remove chevron and expansion styles
   - Remove collapsible content styles

2. **Restructure Header CSS:**
   - Create `.section-card__header-row` for single-line layout
   - Update `.section-card__meta` for right-aligned controls
   - Add `.section-card__description-list` styles

3. **Create Reference Controls Section:**
   - Add `.reference-controls-section` styles
   - Position reference chips prominently
   - Style add reference button

4. **Integrate Text Field Size with Toolbar:**
   - Move text field size controls adjacent to toolbar (controls textarea height)
   - Create unified input controls area
   - Update responsive behavior

### Phase 3: Update JavaScript Functionality

1. **Remove Collapsible Logic:**
   - Delete section toggle functionality
   - Remove chevron rotation code
   - Remove ARIA expansion states

2. **Simplify Field Management:**
   - Update add/remove field functionality for single field model
   - Simplify reference system integration
   - Focus on single input field experience

## Questions for Clarification

1. **Optional Sections:** The requirements mention "Sequential instructions" and "Constraints" as collapsible optional sections, but the wireframe only shows a single input section. Should these be separate cards entirely, or should we follow the wireframe's single-section approach? "Sequential instructions" and "Constraints" both represent separate instances of the SectionCard. Refer to the mockup /Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/StrategyMethod-PromptBuilder/SectionCard Instances.jpg to see an example of how the SectionCard can be used as the basis for multiple sections. The mockup shows 7 separate instances of the Section Card (Prompt name, User input, Objectives, Output format, Context, Sequential instructions,Constraints). 

2. **Multiple Input Fields:** The wireframe shows "Add input field" functionality, but it's unclear how multiple fields should be displayed. Should they stack vertically within the same card? In the wireframe, each input field (Input field 1, and Input field 2) represent separate input fields. Additional fields would have the same stacked appearance. 

3. **Reference System Integration:** The wireframe shows reference controls above the input field, but the requirements describe them as inline with text and in counter areas. Which pattern should take precedence? The field references should appear inline, while prompt reference controls appear above the input field. Prompt references are not inline.  

4. **Character Counting:** The requirements specify character counting with progressive feedback, but this isn't visible in the wireframe. Should this be implemented as described in requirements or omitted to match wireframe? Yes

## Implementation Priority

**High Priority (Core Structure):**
1. Restructure card header to single-row layout
2. Remove collapsible section system
3. Move reference controls to dedicated section
4. Integrate text field size controls with toolbar

**Medium Priority (Polish):**
1. Update CSS architecture for new structure
2. Simplify JavaScript for flat card model
3. Test responsive behavior with new layout

**Low Priority (Enhancement):**
1. Add description list styling
2. Refine reference chip interactions
3. Optimize mobile touch targets

## Updated Understanding Based on Requirements

### Template-Based Approach Confirmed
The Section Card is a **single, reusable template** that creates 7 separate card instances:
1. Prompt name (Required)
2. User input (Required) 
3. Objectives (Required)
4. Output format (Required)
5. Context (Required)
6. Sequential instructions (Optional)
7. Constraints (Optional)

Each section is an **independent card**, not collapsible sections within one card.

### Key Clarifications Applied
- **Text Field Size Controls**: Controls textarea height (Small/Medium/Large), not font size
- **Reference System**: Field references inline, Prompt references above input field
- **Multiple Input Fields**: Stack vertically within same card (User Input section)
- **Character Counting**: Implemented with progressive feedback as specified
- **Card Structure**: Single-row header with title, badge, and controls horizontally aligned
- **Optional Sections**: Show "Add to prompt" primary action when not included

This audit provides clear direction for aligning the Section Card component with the provided wireframe while maintaining the functionality described in the updated requirements document. The template approach allows one component to serve all 7 section types through configuration.