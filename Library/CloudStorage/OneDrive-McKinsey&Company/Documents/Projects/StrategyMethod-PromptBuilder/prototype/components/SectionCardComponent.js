/**
 * Section Card Component - Reusable Function
 * Extracts the complete Section Card implementation from SectionCard.html
 * for use in the Prompt Builder layout
 */

function createSectionCard(config) {
    const {
        id,
        title,
        badge,
        badgeType = 'required', // 'required' or 'optional'
        description,
        additionalDescription,
        features = {},
        collapsed = false,
        references = { enabled: false },
        richText = { enabled: false },
        fieldSizeControls = { enabled: false },
        dynamicFields = { enabled: false },
        characterLimit = null,
        placeholder = '',
        alertContent = null,
        learnMore = { enabled: false },
        addToPromptButton = false
    } = config;

    // Generate unique IDs for this section
    const sectionId = `section-${id}`;
    const textareaId = `${id}-textarea`;
    
    // Build CSS classes
    const sectionClasses = ['section-card'];
    if (collapsed) sectionClasses.push('section-card--collapsed');
    if (features.simple) sectionClasses.push('section-card--simple');
    
    const badgeClass = `section-card__badge--${badgeType}`;
    
    // Build header controls
    let headerControls = '';
    if (learnMore.enabled) {
        headerControls += `<button class="btn btn--secondary" onclick="showContextLearnMoreModal()">Learn more</button>`;
    }
    if (addToPromptButton && collapsed) {
        headerControls += `<button class="btn btn--primary" onclick="expandOptionalSection('${id}')">Add to prompt</button>`;
    } else if (!collapsed) {
        headerControls += `<button class="btn btn--primary">Save</button>`;
    }
    
    // Build alert component
    let alertHtml = '';
    if (alertContent) {
        alertHtml = `
            <div class="alert">
                <div class="alert__icon">
                    <span class="material-symbols-outlined material-symbols-outlined--sm">lightbulb</span>
                </div>
                <div class="alert__content">
                    <p class="alert__description">${alertContent}</p>
                </div>
            </div>
        `;
    }
    
    // Build reference controls section (for Context section)
    let referenceControlsHtml = '';
    if (references.enabled && references.counters) {
        referenceControlsHtml = `
            <div class="reference-controls-section">
                <a href="#" class="add-reference-btn" onclick="openReferenceSidebar('${id}', 'add')">
                    <span class="material-symbols-outlined material-symbols-outlined--sm">add</span>
                    Add reference
                </a>
                <div class="reference-chips">
                    <a href="#" class="reference-chip" onclick="openReferenceSidebar('${id}', 'prompt')" aria-label="Edit prompt references">
                        <span id="${id}-prompt-count">0 prompt references</span>
                        <span class="reference-chip__edit" aria-hidden="true">
                            <span class="material-symbols-outlined material-symbols-oriented--sm">edit</span>
                        </span>
                    </a>
                    <a href="#" class="reference-chip" onclick="openReferenceSidebar('${id}', 'field')" aria-label="Edit field references">
                        <span id="${id}-field-count">0 field references</span>
                        <span class="reference-chip__edit" aria-hidden="true">
                            <span class="material-symbols-outlined material-symbols-outlined--sm">edit</span>
                        </span>
                    </a>
                </div>
            </div>
        `;
        
        // Add horizontal divider for Context section
        if (id === 'context') {
            referenceControlsHtml += `<div class="section-divider"></div>`;
        }
    }
    
    // Build rich text toolbar
    let richTextToolbar = '';
    if (richText.enabled && !features.simple) {
        richTextToolbar = `
            <div class="rich-text-toolbar">
                <div class="rich-text-toolbar__group">
                    <button class="formatting-btn" title="Bold" aria-pressed="false" onclick="toggleFormat('${textareaId}', 'bold')">
                        <span class="material-symbols-outlined">format_bold</span>
                    </button>
                    <button class="formatting-btn" title="Italic" aria-pressed="false" onclick="toggleFormat('${textareaId}', 'italic')">
                        <span class="material-symbols-outlined">format_italic</span>
                    </button>
                </div>
                <div class="rich-text-toolbar__group">
                    <button class="formatting-btn" title="Bullet List" aria-pressed="false" onclick="toggleFormat('${textareaId}', 'list')">
                        <span class="material-symbols-outlined">format_list_bulleted</span>
                    </button>
                    <button class="formatting-btn" title="Add Link" aria-pressed="false" onclick="toggleFormat('${textareaId}', 'link')">
                        <span class="material-symbols-outlined">link</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    // Build field size controls
    let fieldSizeControls = '';
    if (fieldSizeControls.enabled && !features.simple) {
        fieldSizeControls = `
            <div class="text-field-size-controls">
                <button class="text-field-size-controls__option">Small</button>
                <button class="text-field-size-controls__option text-field-size-controls__option--active">Medium</button>
                <button class="text-field-size-controls__option">Large</button>
            </div>
        `;
    }
    
    // Build input controls section
    let inputControls = '';
    if (richTextToolbar || fieldSizeControls) {
        inputControls = `
            <div class="input-controls">
                ${richTextToolbar}
                ${fieldSizeControls}
            </div>
        `;
    }
    
    // Build character counter
    let characterCounter = '';
    if (characterLimit) {
        const referenceButton = references.enabled && !references.counters ? 
            `<div class="character-counter__actions">
                <a href="#" class="btn btn--secondary" onclick="openReferenceSidebar('${id}', 'field')">Add field reference</a>
            </div>` : '';
            
        characterCounter = `
            <div class="character-counter">
                <span class="character-counter__count" id="${id}-char-count">0 / ${characterLimit} characters</span>
                ${referenceButton}
            </div>
        `;
    }
    
    // Build main input field
    const textareaClasses = ['text-input'];
    if (id === 'prompt-name') textareaClasses.push('text-input--small');
    
    const mainInputField = `
        <div class="input-field">
            <div class="field-header">
                <span class="field-label">${title}</span>
            </div>
            
            ${inputControls}
            
            <div class="text-input-container">
                <textarea 
                    id="${textareaId}"
                    class="${textareaClasses.join(' ')}" 
                    placeholder="${placeholder}"
                    data-section="${id}"
                    data-references="${references.enabled ? 'true' : 'false'}"
                    data-reference-types="${references.types ? references.types.join(',') : ''}"
                    ${characterLimit ? `data-char-limit="${characterLimit}"` : ''}
                ></textarea>
            </div>
            
            ${characterCounter}
        </div>
    `;
    
    // Build dynamic fields section (for User Input)
    let dynamicFieldsHtml = '';
    if (dynamicFields.enabled) {
        dynamicFieldsHtml = `
            <div id="${id}-dynamic-fields">
                ${createDynamicField(id, 1, 'Input field 1', fieldSizeControls.enabled)}
            </div>
            <div class="field-actions">
                <button class="btn btn--secondary" onclick="addDynamicField('${id}')">
                    <span class="material-symbols-outlined material-symbols-outlined--sm">add</span>
                    + Add input field
                </button>
            </div>
        `;
    }
    
    // Build content section
    let contentHtml = '';
    if (!collapsed) {
        contentHtml = `
            <div class="section-card__content">
                ${referenceControlsHtml}
                ${alertHtml}
                ${dynamicFields.enabled ? dynamicFieldsHtml : mainInputField}
            </div>
        `;
    }
    
    // Build description section
    let descriptionHtml = '';
    if (description) {
        descriptionHtml = `<p class="section-card__description">${description}</p>`;
        if (additionalDescription) {
            descriptionHtml += `<p class="section-card__description">${additionalDescription}</p>`;
        }
    }
    
    return `
        <article class="${sectionClasses.join(' ')}" id="${sectionId}" data-section-id="${id}">
            <header class="section-card__header">
                <div class="section-card__header-row">
                    <div class="section-card__title-group">
                        <h3 class="section-card__title">${title}</h3>
                        <span class="section-card__badge ${badgeClass}">${badge}</span>
                    </div>
                    <div class="section-card__controls">
                        ${headerControls}
                    </div>
                </div>
                ${descriptionHtml}
            </header>
            ${contentHtml}
        </article>
    `;
}

function createDynamicField(sectionId, fieldNumber, label, hasSizeControls = false) {
    const fieldId = `${sectionId}-field-${fieldNumber}`;
    const textareaId = `${sectionId}-textarea-${fieldNumber}`;
    
    const sizeControls = hasSizeControls ? `
        <div class="text-field-size-controls">
            <button class="text-field-size-controls__option">Small</button>
            <button class="text-field-size-controls__option text-field-size-controls__option--active">Medium</button>
            <button class="text-field-size-controls__option">Large</button>
        </div>
    ` : '';
    
    const removeButton = fieldNumber > 1 ? `
        <button class="field-remove" aria-label="Remove field" onclick="removeDynamicField('${fieldId}')">
            <span class="material-symbols-outlined">close</span>
        </button>
    ` : '';
    
    return `
        <div class="input-field" id="${fieldId}">
            <div class="field-header">
                <input type="text" class="field-label field-label--editable" value="${label}">
                ${removeButton}
            </div>
            
            ${sizeControls ? `<div class="input-controls">${sizeControls}</div>` : ''}
            
            <div class="text-input-container">
                <textarea 
                    id="${textareaId}"
                    class="text-input" 
                    placeholder="Enter field description or requirements..."
                    data-section="${sectionId}"
                    data-field-number="${fieldNumber}"
                ></textarea>
            </div>
        </div>
    `;
}

// Section Configuration Objects
const sectionConfigs = {
    'prompt-name': {
        id: 'prompt-name',
        title: 'Prompt name',
        badge: 'REQUIRED',
        badgeType: 'required',
        description: 'Help users understand what they can expect from this prompt\'s output.',
        features: { simple: true },
        collapsed: false,
        references: { enabled: false },
        richText: { enabled: false },
        fieldSizeControls: { enabled: false },
        dynamicFields: { enabled: false },
        characterLimit: 40,
        placeholder: 'Enter a descriptive name for this prompt...'
    },
    
    'user-input': {
        id: 'user-input',
        title: 'User input',
        badge: 'REQUIRED', 
        badgeType: 'required',
        description: 'Add text input fields to collect parameters and other information from users.',
        collapsed: false,
        references: { enabled: false },
        richText: { enabled: false },
        fieldSizeControls: { enabled: true },
        dynamicFields: { enabled: true }
    },
    
    'objectives': {
        id: 'objectives',
        title: 'Objectives',
        badge: 'REQUIRED',
        badgeType: 'required', 
        description: 'Describe the objectives for this prompt. Be descriptive, but concise.',
        collapsed: false,
        references: { 
            enabled: true,
            types: ['field']
        },
        richText: { enabled: false },
        fieldSizeControls: { enabled: false },
        dynamicFields: { enabled: false },
        placeholder: 'Describe the objectives for this prompt...',
        alertContent: 'Tip: use the \'@\' symbol to reference other fields in this workflow.'
    },
    
    'output-format': {
        id: 'output-format',
        title: 'Output format',
        badge: 'REQUIRED',
        badgeType: 'required',
        collapsed: false,
        references: { enabled: false },
        richText: { enabled: true },
        fieldSizeControls: { enabled: false },
        dynamicFields: { enabled: false },
        placeholder: 'Specify the desired output format...'
    },
    
    'context': {
        id: 'context',
        title: 'Context', 
        badge: 'REQUIRED',
        badgeType: 'required',
        description: 'Provide background information and context for this prompt.',
        additionalDescription: 'Use the @ key to reference other fields or prompts. The complete context of referenced prompts will be added to the context window of this prompt.',
        collapsed: false,
        references: { 
            enabled: true,
            types: ['field', 'prompt'],
            counters: true
        },
        richText: { enabled: false },
        fieldSizeControls: { enabled: false }, 
        dynamicFields: { enabled: false },
        placeholder: 'Provide background information and context...',
        learnMore: { enabled: true }
    },
    
    'sequential-instructions': {
        id: 'sequential-instructions',
        title: 'Sequential instructions',
        badge: 'OPTIONAL',
        badgeType: 'optional',
        description: 'Define the step-by-step process the agent should follow when responding to this prompt.',
        collapsed: true,
        references: { 
            enabled: true,
            types: ['field', 'prompt']
        },
        richText: { enabled: false },
        fieldSizeControls: { enabled: false },
        dynamicFields: { enabled: false },
        placeholder: 'Define the step-by-step process...',
        addToPromptButton: true
    },
    
    'constraints': {
        id: 'constraints',
        title: 'Constraints',
        badge: 'OPTIONAL', 
        badgeType: 'optional',
        description: 'List actions and behaviors the agent should avoid.',
        collapsed: true,
        references: { 
            enabled: true,
            types: ['field', 'prompt']
        },
        richText: { enabled: false },
        fieldSizeControls: { enabled: false },
        dynamicFields: { enabled: false },
        placeholder: 'List actions and behaviors to avoid...',
        addToPromptButton: true
    }
};