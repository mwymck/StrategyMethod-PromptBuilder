# Reference System Requirements - Current Understanding

## Overview

Based on the wireframe at `/Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinseyCompany/Documents/Projects/StrategyMethod-PromptBuilder/prompt builder wireframe.jpg`, the reference system appears to be a sophisticated feature for connecting different elements within the prompt builder. Here is my current understanding:

## Reference Types

### 1. Field References (Inline)
**Current Understanding:**
- **Inline chips** that appear within text content
- Triggered by typing "@" symbol in text fields
- Display as styled chip elements embedded in the text flow
- Reference other input fields within the same prompt
- Allow dynamic content injection from referenced fields
- Appear visually distinct from regular text (styled as chips/badges)

**Visual Representation:**
- Small, pill-shaped elements within text
- Background color to distinguish from regular text
- May include field name and type indicator
- Clickable/editable to modify or remove

**Use Case:**
When writing prompt instructions, users can reference values from other input fields. For example: "Analyze the market trends for @Customer Demographics in the @Timeline Requirements timeframe."

### 2. Prompt References (Non-Inline)
**Current Understanding:**
- **Non-inline references** that appear as chips above the 'Context' section.
- Reference external prompts or templates from the prompt library. These references essentially function to load the referenced prompt into the context window of the current prompt. for the prototype, this is simulated by selecting prompt reference, then selecting an existing prompt and seeing the prompt counted amount the prompt references in the counter above the 'Context' section.
- Used to load existing prompts into the context window of the current prompt
- Display in dedicated reference area above the Context section (not embedded in text). The display functions as a counter, showing the number of prompts that have been referenced. Clicking on this element opens the prompt reference memu where prompts can be selected/deselected as references. 

## Reference Management Interface

### Hierarchical Menu System
Based on the reference logic flowchart:

1. **@ Symbol Popup Menu** - Primary reference type selection:
   - "Field reference" (always available)
   - "Prompt reference" (only in Context section)

2. **Field Reference Sub-Menu** - Secondary scope selection:
   - "Field from current prompt"
   - "Field from current workflow"

3. **Side Panel Interface** - Four distinct modes:
   - Mode 1: Current prompt fields only
   - Mode 2: Workflow prompt selection (step 1 of cross-prompt field reference)
   - Mode 3: Selected prompt's fields (step 2 of cross-prompt field reference)
   - Mode 4: Workflow prompt references

### Reference Configuration Flow
1. User types "@" in text field
2. Primary popup menu appears with reference type options
3. If "Field reference" selected → Secondary popup with scope options
4. Side panel opens alongside main content (not overlay) based on selection
5. User navigates through appropriate workflow-scoped options
6. Reference inserted as inline chip or added to prompt reference counter

## Current Implementation Gaps

### What I Built vs What's Needed
**Current Implementation:**
- Simple dropdown menu triggered by @ symbol
- Basic type selection (field vs prompt)
- Immediate insertion without configuration
- No workflow scope restrictions

**Updated Requirements Show:**
- Hierarchical popup menu system (primary → secondary)
- Four distinct sidebar modes based on reference path
- Workflow-scoped reference boundaries (current workflow only)
- Side-by-side panel layout with flexbox transitions
- Cross-prompt field reference workflow (2-step selection process)

## Questions for Clarification

1. **Field Reference Behavior:**
   - Do inline field references show live values from referenced fields? No, they show the name of the referenced field (i.e., "Objectives" or "User input > Input field 1")
   - Are they read-only chips or editable inline? Clicking on a chip opens the chip reference menu where references can be selected or deselected.
   - How do they appear in the final generated prompt? It doesn't matter because we are not simulating the final prompt in this user experience. For this prototype, the user journey ends when the prompt builder is saved by the user clicking the 'Save' button (which appears in the prompt builder, not the SectionCard).

2. **Prompt Reference Behavior:**
   - Do prompt references inherit content/structure from referenced prompts? No. The only functionality is to select/deselect prompts. The 'Prompt reference' counter above the 'Context' section displays the count of selected prompts.
   - Are they display-only relationships or functional inclusions? display only
   - How do they affect the current prompt's execution? no effect

3. **Reference Management:**
   - Can users create custom references? No
   - Are references scoped to current prompt or global? References are scoped to the current workflow. Workflows are collections of prompts. User can reference fields or prompts from the current prompt or current workflow (but not from prompts nested in other workflows). 
   - Is there a master reference library/database? Let's create a JSON file with a list of workflows and nested prompts and nested fields to simulate this in the prototype. 

4. **UI Specifics:**
   - Should the sidesheet be modal or slide-over? Slide over so the reference panel can be viewed alongside the prompt builder. 
   - Are there different views (list, grid, search)? no
   - What information is shown for each reference option? For field references, the field label and value (as depicted in the references panel in the mockup /Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/StrategyMethod-PromptBuilder/prompt builder wireframe.jpg). Prompt references show the name of the prompt and its objective, as seen in the same wireframe.

5. **Inline Chip Styling:**
   - What should inline field reference chips look like? See /Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/StrategyMethod-PromptBuilder/Strategy Table Workflow - Inline field reference.jpg
   - Do they have hover states, edit modes, or remove options? On hover, the background color changes to indicate the chip is interactive. Clicking on the chip opens the reference sidebar. 

## Implementation Priority

1. **High Priority:** Inline field reference chips with proper styling. Functionality can be simplified for initial version.
2. **High Priority:** Sidesheet interface for reference selection. Sidesheet should be treated as a separate modular component. 
3. **Medium Priority:** Non-inline prompt reference management. Uses the same sidesheet as the field references but appears in its own tab. 
4. **Medium Priority:** Reference search and filtering - Can use static placeholders in prototype and add the interactivity in a late version. 
5. **Low Priority:** Advanced reference relationships and inheritance

---

*Please review and update this document with corrections and additional context so we can align the implementation with the actual requirements.*

