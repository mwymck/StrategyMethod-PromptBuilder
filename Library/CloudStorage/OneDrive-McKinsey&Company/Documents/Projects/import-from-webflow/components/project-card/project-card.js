/**
 * Project Card Component
 * Modular component for rendering project cards
 */

/**
 * Project data structure
 * @type {Array<{title: string, pdfUrl: string, image: {src: string, srcset: string, sizes: string, alt: string}}>}
 */
const projects = [
  {
    title: 'Rome Renovation',
    pdfUrl: 'assets/pdfs/rome-renovation.pdf',
    image: {
      src: 'assets/images/rome-renovation.jpg',
      srcset: 'assets/images/rome-renovation-500.jpg 500w, assets/images/rome-renovation-800.jpg 800w, assets/images/rome-renovation.jpg 999w',
      sizes: '(max-width: 479px) 30vw, (max-width: 767px) 35vw, (max-width: 991px) 24vw, 20vw',
      alt: 'Rome Renovation'
    }
  },
  {
    title: 'Connecticut Cottage Design',
    pdfUrl: 'assets/pdfs/connecticut-cottage.pdf',
    image: {
      src: 'assets/images/103smain.jpeg',
      srcset: 'assets/images/103smain.jpeg',
      sizes: '(max-width: 479px) 30vw, (max-width: 767px) 35vw, (max-width: 991px) 24vw, 20vw',
      alt: 'Connecticut Cottage Design'
    }
  }
];

/**
 * Creates a project card HTML element
 * @param {Object} project - Project data object
 * @returns {HTMLElement} Project card anchor element
 */
function createProjectCard(project) {
  const card = document.createElement('a');
  card.href = project.pdfUrl;
  card.target = '_blank';
  card.className = 'project-card';
  
  // Content wrapper
  const content = document.createElement('div');
  content.className = 'project-card__content';
  
  // Title
  const title = document.createElement('div');
  title.className = 'project-card__title';
  title.textContent = project.title;
  
  // Subtitle
  const subtitle = document.createElement('div');
  subtitle.className = 'project-card__subtitle';
  subtitle.textContent = 'PDF download';
  
  content.appendChild(title);
  content.appendChild(subtitle);
  
  // Image
  const image = document.createElement('img');
  image.src = project.image.src;
  image.srcset = project.image.srcset;
  image.sizes = project.image.sizes;
  image.alt = project.image.alt;
  image.className = 'project-card__image';
  image.loading = 'lazy';
  
  card.appendChild(content);
  card.appendChild(image);
  
  return card;
}

/**
 * Renders all project cards into the project grid
 * @param {HTMLElement} container - Container element to render cards into
 */
function renderProjectCards(container) {
  if (!container) {
    console.error('Project grid container not found');
    return;
  }
  
  projects.forEach(project => {
    const card = createProjectCard(project);
    container.appendChild(card);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');
    renderProjectCards(projectGrid);
  });
} else {
  // DOM already loaded
  const projectGrid = document.querySelector('.project-grid');
  renderProjectCards(projectGrid);
}

