# MVIP React Application

A React-based implementation of the McKinsey Value Intelligence Platform (MVIP) prototype, featuring both MVIA (McKinsey Value Intelligence Assistant) and StrategyFlow products.

## Project Overview

This project is a migration from a Webflow-exported prototype to a modern React application with self-contained, modular components. The architecture supports easy addition and removal of features while maintaining consistent styling and user experience.

## Technology Stack

- **React 18** - Component-based UI library
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **CSS Modules** - Component-scoped styling
- **McKinsey Design System** - Brand-consistent components (to be integrated)

## Project Structure

```
/src/
├── components/
│   ├── SearchModule/           # Main search component
│   ├── PeerSelector/          # Peer management component (MVIA)
│   └── shared/                # Reusable UI components
├── contexts/                  # React Context for state management
├── hooks/                     # Custom React hooks
├── pages/                     # Page components
├── styles/                    # Global styles and CSS variables
└── main.jsx                   # Application entry point

/public/
├── data/                      # JSON data files
│   ├── mvia.json             # MVIA search and peer data
│   └── sf.json               # StrategyFlow search and analysis data
└── fonts/                     # McKinsey brand fonts
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd /Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/mvip-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The application will automatically open at `http://localhost:3000`
   - Or manually navigate to the URL shown in your terminal

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality

## Current Implementation Status

### ✅ Completed
- [x] Project structure and configuration
- [x] CSS design system with variables
- [x] Basic routing setup (Home, MVIA Search, StrategyFlow Search)
- [x] Page layouts with placeholders
- [x] Documentation copied to project

### 🚧 In Progress
- [ ] SearchModule component implementation
- [ ] PeerSelector component implementation
- [ ] Context providers for state management
- [ ] Data loading hooks

### 📋 Next Steps
1. **Implement SearchModule component** following the interaction guide
2. **Add PeerSelector component** for MVIA functionality
3. **Integrate McKinsey Design System components**
4. **Implement state management with React Context**
5. **Add additional pages** (Dashboard, Analysis Configuration, etc.)

## Component Development Approach

### SearchModule Component
- **Location**: `src/components/SearchModule/`
- **Purpose**: Shared search interface for both MVIA and StrategyFlow
- **Features**: Company/industry toggle, real-time search, results dropdown
- **Props**: Product configuration, callback functions, feature flags

### PeerSelector Component
- **Location**: `src/components/PeerSelector/`
- **Purpose**: Peer management for MVIA product
- **Features**: Auto-selected peers, suggested peers, add peer functionality
- **Integration**: Separate component that works with or without SearchModule

## Styling Architecture

### CSS Variables
- Site-level variables in `src/styles/variables.css`
- Component-scoped styles using CSS Modules
- McKinsey Design System overrides in `src/styles/mds-overrides.css`

### Design System Integration
- Custom variants of MDS components (e.g., rounded buttons)
- Consistent color palette and typography
- Responsive design patterns

## Data Architecture

### JSON Data Sources
- **MVIA Data**: `/public/data/mvia.json` - Companies, peers, availability status
- **StrategyFlow Data**: `/public/data/sf.json` - Companies, industries, analysis types

### State Management
- React Context for product-specific global state
- Custom hooks for data loading and management
- Session-based persistence for user selections

## Documentation

This project includes comprehensive documentation:

- **MVIP-DOCUMENTATION.md** - Complete product documentation
- **Search-Component-Interaction-Guide.md** - Detailed search component specifications
- **PRE-MIGRATION-CHECKLIST.md** - Migration planning and considerations
- **CLAUDE.md** - AI assistant instructions and project context

## Development Workflow

1. **Start with SearchModule**: Implement the core search functionality
2. **Add Sub-components**: Build SearchInput, BinaryToggle, ResultsDropdown
3. **Integrate PeerSelector**: Add peer management for MVIA
4. **Test in Isolation**: Ensure each component works independently
5. **Add State Management**: Implement React Context for global state
6. **Style Integration**: Apply CSS Modules and MDS components

## Deployment

The application is configured for static deployment and can be hosted on:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

To build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Contributing

This is a prototype project for migration planning. Follow the documented component patterns and maintain the modular architecture when adding new features.

## License

Internal McKinsey project - not for external distribution.