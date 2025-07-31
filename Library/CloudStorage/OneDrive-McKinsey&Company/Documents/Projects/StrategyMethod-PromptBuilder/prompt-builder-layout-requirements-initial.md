Prompt builder layout

 this is a vertical layout containing seven stacked Section cards. The top of the page includes the product logo on the left and controls on the right for saving and closing the prompt builder.


If the user clicks the 'Save' button, a "prompt notes" model (see /Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/StrategyMethod-PromptBuilder/Prompt notes log.jpg) opens so the user can document helpful information for collaborators or any changes they made to the prompt. The 'Dismiss' button closes the notes modal. Save button within the prompt notes modal adds a row to the 'prompt notes' table with the note and an automatic date stamp and automatic editor stamp (name of logged-in user). 

If the user clicks the close prompt button with unsaved changes, a confirmation dialogue, informs the user "you have unsaved changes" "if you continue without saving all changes will be discarded". the dialogue modal has "continue editing" and "close without saving" buttons.

Below the logo and controls is a page header that includes a headline, description, and a row of buttons including "prompt notes" which opens the prompt notes modal, "example prompt" which will open a modal showing an example prompt (to be added later) and "Support" button which will intiate an email to the team. 

Below the page header, the five expanded section cards are stacked in the order: prompt name, user input, objectives, output, format, context.

Below the five stacked cards is a section header that includes a headline with the text "optional section" and description "ad fields for more precise control of prompt outputs".

Below the section header are two collapsed sections, "sequential instructions" and "constraints".  Collapsed cards show only the card heading and description as well as an ad to prompt button which expands the card on click. The idea is that these cards are not a default. Part of prompts built using this prompt builder, but the user has the option to add them. If these cards are added to the prompt builder, they appear in their expanded form.

Prompt builder sections

Prompt name (required): includes the card heading which consist of a headline "Prompt name" and description "help users, understand what they can expect from this prompt's outputs". Includes a text input fuel with a maximum 40 characters.
User input (required): includes the card heading with the headline "user input" and description "add text input fields to collect parameters and other information for users" includes one custom input component, which consist of the input label "Input field 1" and controls to control the height of the text input field, and a text input field that does not have a character limit. Below, this is a button to add an additional input field with the label. "+ Add input field". Clicking the button adds another instance of the custom input component.
Objectives (required): includes the card, heading with the headline "objectives" and description "describe the objectives for this prompt be descriptive, but concise", an alert that functions as a tip to inform users of the field, referencing functionality with the headline "Tip:" and description "use the '@' symbol to reference other fields in this workflow". Below this is a text input field that supports field references, but no prompt references so the '@' menu only contains the "field" option.
Output format (required): includes the card heading with the headline "Output format" and a text input field with rich text controls (which can be simulated in the prototype).
Context (required): includes the card heading with the headline "context" and description "provide background information and context for this prompt" and sub-description "Use the '@' key to reference other fields or prompts. The complete content of referenced prompts will be added to the context window of this prompt." The card header also contains a 'learn more' button that opens a modal explaining how to use the context section. a horizontal divider appears below the heading. Below this is the text input field with controls for references. The reference controls include:1. "Add reference" button that opens the references sidebar (same behavior as using the '@' key inline). 2. counter showing "[2] prompt references" and edit button; entire counter is clickable to open the prompts references in the sidebar3. counter showing "[1] field reference" and edit button; entire counter is clickable to open the field references in the sidebar

Sections that can be optionally added to the prompt:
Sequential instructions: with the headline "Sequential instructions" and description "Outline the step-by-step process the agent should follow when responding to this prompt." and an 'add to prompt' button
Constraints: with the headline "Constraints" and description "List actions and behaviors the agent should avoid." and an 'add to prompt' button


Clarifying Questions:

  1. Header Layout & Navigation

  - I see the StrategyMethod.AI logo and "Close prompt" + "Save" buttons in the header. Should there be any breadcrumb
  navigation or back navigation to indicate where users came from? No
  - Is there a specific workflow for returning to a previous screen after saving/closing? When the prompt is closed, the user goes to the prompt library, where this prompt will be listed among all other saved prompts. from the library, users can open and edit prompts. 

  2. Section Card Ordering

  - Your initial requirements mention the order as: "prompt name, user input, objectives, output format, context"
  - The wireframe shows: "Prompt name, User input, Objectives, Output format, Context"
  - This matches, but I want to confirm this is the final intended order: yes it is

  3. Reference System Integration

  - In the Context section, I see "Add reference" button and reference counters
  - Should these reference counters be interactive (clickable to edit/remove references)? yes
  - The wireframe shows a popup menu for "Field/Prompt" - this should integrate with our recently implemented hierarchical
  reference system, correct? yes

  4. Optional Sections Behavior

  - When "Sequential instructions" or "Constraints" are added via "Add to prompt" button, do they get inserted in a specific
   position in the stack, or do they remain in the "Optional section" area but expand? they remain in the optional section and can be optionally removed and would then return to their original state
  - Should there be a way to remove optional sections once added? yes

  5. Responsive Behavior

  - How should this layout adapt on mobile devices? Should it remain a single column, or are there any layout changes
  needed? single column. 

  6. Prompt Notes Modal

  - You mentioned a "Prompt notes log.jpg" wireframe - should I reference this for the modal design, or do you have updated
  specifications? reference this as a start

  7. Page State Management

  - Should there be any auto-save functionality, or only manual save? manual save only
  - How should validation errors be displayed if required fields are empty when user tries to save? propose a standard error pattern for a form based experience and implement according to best practices 

  8. Text Input Specifications

  - For text inputs without character limits (like User Input fields), should there be any visual feedback for length, or
  completely unlimited? unlimited
  - Should the rich text toolbar in Output format be the same as what we implemented in the Section Card? yes because the 'Output format' card and the other sections in this prompt-builder all leverage the sectionCard. That was the whole point of creating the section card--it is intended for use in this prompt builder layout. 

  9. Section Card Visual States

  - Should there be any visual indicators for completion status of each section? No
  - Any hover states or focus indicators for the section cards themselves? No

  10. Integration Points

  - This layout will use the Section Card components we just built, correct? Should I specify how the individual Section
  Card configurations map to this layout? Yes and yes. And I want you to state your plan before we actually implement. 

  Please clarify these points so I can create comprehensive and accurate requirements for the prompt builder layout.