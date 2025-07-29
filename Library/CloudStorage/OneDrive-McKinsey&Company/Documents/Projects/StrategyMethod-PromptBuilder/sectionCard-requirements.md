Core User Experience

The prompt builder is comprised of multiple sections, each structured as a card. elements of the section card can be shown or hidden as needed to create each section in the prompt builder. 

  What the user experiences:
  - Each section appears as a distinct card with clear visual
  boundaries and depth
  - Section titles are prominently displayed with appropriate
  typography hierarchy
  - Required sections are visually distinguished from optional ones
  through badges and styling
  - The user can immediately understand which sections are mandatory vs
   optional

  Section State Management

  What the user experiences:
  - Optional sections--"sequential instructions" and "constraints"--can be collapsed/expanded by clicking the header
  area. The other cards are not collapsible. 
  - A chevron icon indicator shows the current state and responds to
  user interaction
  - Collapsed sections hide their content while maintaining the header
  for context
  - Mandatory sections remain always expanded and non-collapsible

  Text Input Experience

  What the user experiences:
  - Each input field is contained within a visually distinct container witha border that clearly defines the input area
  - Text input size can be adjusted via Small/Medium/Large buttons
  positioned above the text area
  - The active size selection is clearly indicated with dark styling
  while inactive options appear lighter
  - Character counting provides real-time feedback for sections with
  limits (like Prompt name with 40 character limit)
  - Users receive progressive feedback: normal → warning (>80%) → error
   (exceeded limit)

  Reference System Interaction

  What the user experiences:
  - Typing "@" in any text field triggers an inline reference menu that
   appears near the cursor
  - The reference menu offers "Field reference" and "Prompt reference"
  options
  - Selected references appear as blue chips inline with the text,
  showing the reference name
  - References can be removed by clicking an "x" button on each chip
  - An "Add reference" button below each text input provides an
  alternative way to access references
  - Reference availability is scoped to the current workflow context

  Input Field Management

  What the user experiences:
  - In User Input sections, multiple input fields can be added via an
  "Add input field" button
  - Individual input fields can be removed (when more than one exists)
  via a remove button in the field label area
  - Field labels are editable and clearly identify each input's purpose

  Card Controls

  What the user experiences:
  - Each section header contains contextual controls on the right side
  - Optional sections display an "Add to prompt" primary action when
  not included
  - Secondary controls placeholer exists but is not currently utilized by any section
  - Control buttons provide clear visual feedback on hover and click

  Error States and Validation

  What the user experiences:
  - Character limit violations show immediate visual feedback with red
  error text
  - Required fields that are empty show appropriate validation
  messaging
  - Error states are clearly distinguished from warning states through
  color and iconography
  - Users receive guidance on how to resolve validation issues

  Responsive Behavior

  What the user experiences:
  - On mobile devices, controls stack vertically for better touch
  interaction
  - Size buttons expand to fill available width on smaller screens
  - Touch targets are appropriately sized for mobile interaction
  - Content remains readable and accessible across all device sizes

  Accessibility Features

  What the user experiences:
  - All interactive elements are keyboard navigable
  - Focus indicators are clearly visible for all interactive elements
  - ARIA labels provide context for icon-only buttons and complex
  interactions

  Specialized Section Behaviors

  Context Section

  What the user experiences:
  - Can contain both free text and prompt references
  - Prompt references appear as counter chips above the text area
  showing "X prompt references"
  - Clicking the counter reveals details about referenced prompts

  Output Format Section

  What the user experiences:
  - Rich text formatting toolbar appears above the text area
  - Bold, italic, lists, and links formatting options are available
  - Formatted content displays appropriately within the text area