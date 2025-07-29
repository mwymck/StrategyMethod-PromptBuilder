// Prototype Navigation and Interaction System

function initializePrototype() {
    handlePrototypeNavigation();
    initializeInteractiveElements();
    console.log('Prototype system initialized');
}

// Simple client-side routing for prototype
function handlePrototypeNavigation() {
    document.addEventListener('click', function(e) {
        // Handle internal navigation links
        if (e.target.matches('a[data-route]')) {
            e.preventDefault();
            const route = e.target.dataset.route;
            navigateToPage(route);
        }
    });
}

function navigateToPage(route) {
    // Simple page navigation for prototype
    const routes = {
        'home': '../pages/index.html',
        'components': '../pages/components.html',
        'section-card': '../components/SectionCard.html'
    };
    
    if (routes[route]) {
        window.location.href = routes[route];
    } else {
        console.warn(`Route not found: ${route}`);
    }
}

// Initialize common interactive elements
function initializeInteractiveElements() {
    addHoverEffects();
    setupFormValidation();
    initializeTooltips();
}

function addHoverEffects() {
    // Add smooth hover transitions to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .card, .nav-link');
    interactiveElements.forEach(element => {
        element.style.transition = 'all var(--transition-fast)';
    });
}

function setupFormValidation() {
    // Basic form validation for prototype
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted (prototype mode)');
            
            // Show success message
            showNotification('Form submitted successfully!', 'success');
        });
    });
}

function initializeTooltips() {
    // Simple tooltip system
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltipText = e.target.dataset.tooltip;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--color-text);
        color: white;
        padding: var(--space-xs) var(--space-sm);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-sm);
        z-index: var(--z-tooltip);
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Notification system for prototype feedback
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: var(--space-lg);
        right: var(--space-lg);
        background: var(--color-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'});
        color: white;
        padding: var(--space-md);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: var(--z-modal);
        animation: slideIn 0.3s ease;
    `;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Component state management helpers
function toggleComponentState(element, state) {
    element.classList.toggle(`${element.className.split(' ')[0]}--${state}`);
}

function setComponentData(element, data) {
    // Simple data binding for prototype components
    const dataElements = element.querySelectorAll('[data-bind]');
    dataElements.forEach(el => {
        const prop = el.dataset.bind;
        if (data[prop]) {
            if (el.tagName === 'IMG') {
                el.src = data[prop];
            } else {
                el.textContent = data[prop];
            }
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePrototype);
} else {
    initializePrototype();
}