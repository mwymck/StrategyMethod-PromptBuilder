# Search Component Interaction Guide

## Overview

This guide documents the user interaction patterns and experience flows for the shared search component used across both MVIA and StrategyFlow products. The focus is on **what users experience** and **when interactions occur**, enabling implementers to use modern best practices while maintaining the exact look and feel.

---

## General Search Behavior Pattern

### Core User Flow
1. **Initial State** → User sees search interface with placeholder text
2. **Input Interaction** → User begins typing, real-time results appear
3. **Results Display** → Autocomplete dropdown shows relevant matches
4. **Selection** → User clicks/taps result or uses keyboard navigation
5. **Navigation** → User proceeds to product-specific destination

### Shared Interaction Patterns

#### Search Input Behavior
- **Initial State**: Empty input field with placeholder text "Company search"
- **Focus State**: Input gains focus, placeholder remains visible until typing begins
- **Typing Behavior**: Results appear after 2-3 characters typed and have a very brief loading animation
- **Real-time Results**: Search results update as user continues typing. The subject is always displayed in the search results for this prototype (to ensure demo users can follow a prescribed journey with a specific subject).
- **Clear Functionality**: X button appears when input has content, clears field when activated

#### Binary Toggle Interaction
- **Default State**: "Company" option selected (blue active state)
- **Toggle Action**: User can switch between "Company" and "Industry" modes
- **State Persistence**: Selected toggle state persists during session
- **Visual Feedback**: Active option highlighted with primary brand color

#### Results Dropdown Behavior
- **Appearance**: Dropdown appears below search input when results are available
- **Timing**: Results appear with slight delay (following Material Design timing)
- **Positioning**: Dropdown aligns with search input width
- **Scrolling**: Results list scrolls if more than 6-8 items available
- **Dismissal**: Dropdown closes when user clicks outside or selects result

#### Selection Interaction
- **Hover State**: Individual results highlight on mouse hover
- **Click Selection**: User clicks result to select
- **Keyboard Navigation**: Arrow keys navigate results, Enter key selects
- **Confirmation**: Selected result populates input field
- **Navigation Trigger**: Selection immediately triggers navigation to next page

### Visual State Descriptions

#### Search Component States
- **Idle**: Clean, minimal appearance with subtle border
- **Focused**: Enhanced border visibility, dropdown preparation
- **Active**: Dropdown visible, results highlighted
- **Selected**: Input populated, ready for navigation
- **Loading**: Subtle loading indicator during search (if applicable)

#### Transition Timing
- **Input Focus**: Immediate feedback (0ms delay)
- **Search Results**: Appear after brief delay (~200ms) following Material Design principles
- **Hover States**: Immediate visual feedback (0ms delay)
- **Selection Confirmation**: Immediate input population and navigation trigger

---

## Product-Specific Variations

### MVIA Search Behavior

#### Search Scope
- **Company-Only Search**: Search primarily optimized for company entities
- **Peer Integration**: Company selections trigger peer suggestion workflow

#### Unique Interaction Patterns
- **Peer Context**: After company selection, a group of 5 peers is automatically selected and displayed alongside a list of suggested peers. The quantity of peers displayed can be controlled in the JSON file.
- **Dashboard Navigation**: User journey begins on a dedicated search page where the user searches for and selects a company. The Company selection is maintained as the user progresses to dashboard pages (Overview, Peer Comparison, Questions)

#### Data Context
- **Search Results**: Publicly traded companies; pulled from JSON file. 
- **Availability Indicators**: If data is not available because a company has not released its earnings (or we dont have the data), the company appears in the list of search result but the link is disabled and an alert is displayed within the search result to indicate the item is not available.
- **Peers**: 5 peers are automatically selected and additional Related companies are suggested based on the selected company. These peers are pulled from the JSON file. 

### StrategyFlow Search Behavior

#### Search Scope
- **Dual-Entity Search**: Ability to toggle between company and industry searches
- **Industry Optimization**: Industry search shows immediate dropdown results on click, even before the user starts typing. 
- **Analysis Integration**: user searches for and selects a company or industry, then clicks the 'analyze' button to proceed to analysis configuration workflow

#### Unique Interaction Patterns
- **Info Tiles Context**: Search page includes educational info tiles about analysis types
- **Immediate Industry Results**: Industry toggle shows dropdown results without requiring typed input
- **Analysis Navigation**: Both company and industry selections lead to analysis configuration page

#### Data Context
- **Search Results**: Broader result set including industry categories
- **Analysis Context**: StrategyFlow Results do not include availability indicators as only companies with available data are included. These results come from the JSON. 
- **Industry Categories**: Structured industry taxonomy with subcategories

---

## User Experience Flows

### Flow 1: Company Search and Selection

#### MVIA Company Flow
1. **Search Initiation**: User arrives at search page, sees "Company search" placeholder
2. **Input Interaction**: User begins typing company name (e.g., "Tesla")
3. **Results Display**: Autocomplete shows matching companies with availability status
4. **Selection**: User clicks "Tesla, Inc." from dropdown
5. **Peer Context**: Upon selection, peers are displayed and can be selected, deselected, moved from suggested to selected, or the user can click 'add peer' to search for a peer that is not currently shown. Peers data comes from the JSON. 
6. **Dashboard Navigation**: User proceeds to Company Overview dashboard

#### StrategyFlow Company Flow
1. **Search Initiation**: User arrives at search page, sees info tiles and search interface
2. **Input Interaction**: User begins typing company name (e.g., "Polestar")
3. **Results Display**: Autocomplete shows matching companies
4. **Selection**: User clicks "Polestar" from dropdown
5. **Analysis Navigation**: User proceeds to Analysis Configuration page

### Flow 2: Industry Search and Selection

#### MVIA Industry Flow
1. **Toggle Activation**: User clicks "Industry" toggle button
2. **Placeholder Update**: Input placeholder changes to "Industry search"
3. **Input Interaction**: User begins typing industry term (e.g., "Electric Vehicle")
4. **Results Display**: Autocomplete shows matching industries and sectors
5. **Selection**: User clicks "Electric Vehicle Manufacturing" from dropdown
6. **Industry Navigation**: User proceeds to Industry Analysis page
7. **Industry Search Quicklink**: When a company is selected, the Industry Analysis page displays the industry of the selected company. this serves as a quicklink and clicking the industry name displaus a dialog asking the user if they wish to start a new search with the selected industry. If so, the analysis configuration page is updated to replace the selected company with the newly selected industry. the overview section on the Industry Analysis page will simulate LLM generation and then load an overview of the selected industry. The data comes from JSON (note: you will help me remember to update the JSON file accordingly).

#### StrategyFlow Industry Flow
1. **Toggle Activation**: User clicks "Industry" toggle button
2. **Immediate Dropdown**: Industry dropdown appears immediately without typing
3. **Category Display**: Structured industry categories displayed (Technology, Healthcare, etc.)
4. **Selection**: User clicks "Electric Vehicle Manufacturing" from dropdown
5. **Analysis Navigation**: User proceeds to Analysis Configuration with industry context, which comes from the JSON (remind me to update JSON as needed). 

### Flow 3: Search State Persistence

#### Session Continuity
1. **Initial Selection**: User selects entity (company or industry)
2. **Navigation**: User navigates to product-specific pages
3. **State Maintenance**: Entity selection persists across page navigation
4. **Return Behavior**: If user returns to search, previous selection is remembered
5. **Product Isolation**: Selections don't persist across MVIA ↔ StrategyFlow switches. 

#### Toggle State Persistence
1. **Toggle Selection**: User selects "Industry" mode
2. **Session Storage**: Toggle preference stored for session
3. **Page Navigation**: Toggle state maintains across pages within product
4. **Return Behavior**: Search interface remembers last toggle state
5. **Product Context**: Toggle state may vary between MVIA and StrategyFlow

---

## Data Sources & Content Specifications

### Search Result Data Sources

#### MVIA Search Data
- **Source**: `/json/mvia.json` (to be migrated from external GitHub Gist)
- **Company Data**: Company names, industries, data availability status, overview content for selected company that appears on the Analysis Configuration page.
- **Industry Data**: Industry categories, subcategories, company counts
- **Peer Data**: List of selected peers, list of suggested peers for companies. This comes from the JSON file, and we should be sure that the peers feature does not break if the JSON is empty (rather the peers component is displayed without peer chips). JSON also needs a place to control visibility of the Peers component. The Peers component is part of the search module. 

#### StrategyFlow Search Data
- **Source**: `/json/sf.json` (migrated from external GitHub Gist)
- **Company Data**: Company names, industries, content for the overview section on Analysis Configuration page, Available analysis types (single setting applies to all companies)
- **Industry Data**: Industry taxonomy, overview content for selected industry on the Analysis Configuration page, Available analysis types (single setting applies to all industries)
- **Analysis Data**: Available analysis types per entity, applies to all items of the entity type

### Search Result Formatting

#### Company Results Structure
- **Primary Display**: Company name (e.g., "Tesla, Inc.")
- **Secondary Context**: Industry classification (e.g., "Electric Vehicle Manufacturing"); secondary context can be hidden from the results list from the JSON file.
- **Availability Status**: Data availability indicator (Available/Unavailable)
- **Visual Indicators**: Icons or badges indicating data status

#### Industry Results Structure
- **Primary Display**: Industry name (e.g., "Electric Vehicle Manufacturing")
- **Analysis Indicators**: Available analysis types for industry (not displayed in the list of search results)

### Content Availability Indicators

#### Data Availability States
- **Available**: Full data set available, indicated by standard result formatting
- **Unavailable**: No data available, indicated by disabled state and tooltip
- **Processing**: Data being prepared, indicated by loading state

#### Availability Messaging
- **Available**: Standard result with no additional messaging
- **Unavailable**: "Unavailable - No earnings call data" or similar contextual message
- **Processing**: "One moment..." or similar status message

---

## Integration with Product Workflows

### MVIA Integration Points

#### Search to Dashboard Flow
1. **Company Selection**: User selects company from search results
2. **Entity Persistence**: Company selection stored in session state
3. **Navigation**: User navigates to Company Overview dashboard
4. **Data Population**: Dashboard populates with company-specific KPIs and analysis
5. **Peer Context**: Peer selection interface available throughout dashboard

#### Search to Peer Management Flow
1. **Company Selection**: User selects primary company
2. **Peer Interface**: Peer selection interface appears or is accessible
3. **Peer Selection**: User selects competitor companies for comparison
4. **Comparative Analysis**: User proceeds to peer comparison dashboards
5. **State Persistence**: Both primary company and peer selections maintained

### StrategyFlow Integration Points

#### Search to Analysis Configuration Flow
1. **Entity Selection**: User selects company or industry
2. **Analysis Context**: Entity selection determines available analysis types
3. **Configuration Navigation**: User proceeds to Analysis Configuration page
4. **Analysis Selection**: User selects specific analysis types (Strategic Journey, Market Trends, etc.)
5. **Parameter Configuration**: User configures analysis parameters based on entity type

#### Search to Info Tiles Flow
1. **Educational Context**: User explores info tiles to understand analysis capabilities
2. **Analysis Preview**: User views "Outputs summary" modals from info tiles
3. **Search Integration**: User returns to search with better understanding of analysis types
4. **Informed Selection**: User makes entity selection with analysis context
5. **Optimized Configuration**: User proceeds to analysis configuration with informed choices

---

## Responsive Behavior

### Desktop Experience (1280px+)
- **Full Layout**: Search interface displayed with complete feature set
- **Expanded Results**: Dropdown results show full content with secondary information
- **Hover States**: Full hover interaction available for all elements
- **Keyboard Navigation**: Complete keyboard navigation support

### Tablet Experience (768px-1279px)
- **Adapted Layout**: Search interface maintains core functionality
- **Condensed Results**: Dropdown results may show condensed secondary information
- **Touch Optimization**: Tap targets optimized for touch interaction
- **Gesture Support**: Swipe gestures for dismissing dropdowns

### Mobile Experience (<768px)
- **Simplified Interface**: Search interface optimized for mobile interaction
- **Full-Screen Results**: Dropdown may expand to full-screen overlay on very small screens
- **Touch-First Design**: All interactions optimized for touch
- **Simplified Navigation**: Streamlined interaction patterns for mobile context

---

## React Implementation Architecture

### Technology Stack
- **Framework**: React with JavaScript (no TypeScript initially)
- **Build Tool**: Vite for fast development and building
- **Styling**: CSS Modules for component-scoped styling
- **State Management**: React Context for product-specific global state
- **Design System**: McKinsey Design System components where applicable, custom variants as needed

### Project Structure
```
/src/
├── components/
│   ├── SearchModule/
│   │   ├── SearchModule.jsx           # Main search component
│   │   ├── SearchModule.module.css    # Component-scoped styles
│   │   ├── components/
│   │   │   ├── SearchInput.jsx        # Search input field
│   │   │   ├── BinaryToggle.jsx       # Company/Industry toggle
│   │   │   ├── ResultsDropdown.jsx    # Search results display
│   │   │   └── LoadingIndicator.jsx   # Loading states
│   │   └── hooks/
│   │       ├── useSearchState.js      # Search behavior logic
│   │       └── useSearchResults.js    # Results filtering/formatting
│   ├── PeerSelector/
│   │   ├── PeerSelector.jsx           # Separate peer management component
│   │   ├── PeerSelector.module.css    # Peer-specific styles
│   │   └── components/
│   │       ├── PeerChip.jsx           # Individual peer display
│   │       ├── PeerSearch.jsx         # Add peer functionality
│   │       └── PeerModal.jsx          # Peer search modal
│   └── shared/
│       ├── Button/                    # Custom MDS button variants
│       ├── Modal/                     # Reusable modal component
│       └── LoadingStates/             # Shared loading animations
├── contexts/
│   ├── MVIAContext.jsx               # MVIA global state management
│   └── StrategyFlowContext.jsx       # StrategyFlow global state
├── hooks/
│   ├── useProductData.js             # JSON data loading by product
│   └── useNavigation.js              # Navigation handling
├── styles/
│   ├── variables.css                 # Site-level CSS variables
│   ├── globals.css                   # Global styles
│   └── mds-overrides.css             # McKinsey Design System customizations
└── data/
    ├── mvia.json                     # MVIA search and peer data
    └── sf.json                       # StrategyFlow search and analysis data
```

### Component Integration Pattern

#### SearchModule Props Interface
```jsx
<SearchModule 
  product="mvia"                      // Product context: 'mvia' | 'strategyflow'
  onCompanySelect={handleCompanySelect}  // Callback for company selection
  onIndustrySelect={handleIndustrySelect} // Callback for industry selection
  showPeerSelector={true}             // Whether to show peer component (MVIA only)
  config={{                           // Product-specific configuration
    enableIndustrySearch: false,      // MVIA: false, StrategyFlow: true
    showAvailabilityIndicators: true, // MVIA: true, StrategyFlow: false
    placeholder: "Company search"     // Customizable placeholder text
  }}
/>
```

#### PeerSelector Integration (MVIA Only)
```jsx
<PeerSelector
  selectedCompany="Tesla"             // Currently selected primary company
  onPeerChange={handlePeerChange}     // Callback for peer selection changes
  maxPeers={5}                        // Maximum number of peers
  showAddPeerButton={true}            // Enable "Add Peer" functionality
/>
```

### State Management Architecture

#### React Context for Product Isolation
```jsx
// MVIAContext.jsx - Manages MVIA-specific state
const MVIAContext = createContext();

export function MVIAProvider({ children }) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedPeers, setSelectedPeers] = useState([]);
  const [searchToggle, setSearchToggle] = useState('company');
  
  return (
    <MVIAContext.Provider value={{
      selectedCompany, setSelectedCompany,
      selectedPeers, setSelectedPeers,
      searchToggle, setSearchToggle
    }}>
      {children}
    </MVIAContext.Provider>
  );
}

// StrategyFlowContext.jsx - Manages StrategyFlow-specific state
const StrategyFlowContext = createContext();

export function StrategyFlowProvider({ children }) {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [entityType, setEntityType] = useState('company'); // 'company' | 'industry'
  const [searchToggle, setSearchToggle] = useState('company');
  
  return (
    <StrategyFlowContext.Provider value={{
      selectedEntity, setSelectedEntity,
      entityType, setEntityType,
      searchToggle, setSearchToggle
    }}>
      {children}
    </StrategyFlowContext.Provider>
  );
}
```

#### Page-Level Context Usage
```jsx
// MVIA Search Page
function MVIASearchPage() {
  return (
    <MVIAProvider>
      <SearchModule 
        product="mvia"
        onCompanySelect={(company) => navigateToOverview(company)}
        showPeerSelector={true}
        config={{ enableIndustrySearch: false }}
      />
      <PeerSelector />
    </MVIAProvider>
  );
}

// StrategyFlow Search Page
function StrategyFlowSearchPage() {
  return (
    <StrategyFlowProvider>
      <SearchModule 
        product="strategyflow"
        onCompanySelect={(company) => navigateToAnalysis(company)}
        onIndustrySelect={(industry) => navigateToAnalysis(industry)}
        showPeerSelector={false}
        config={{ enableIndustrySearch: true }}
      />
    </StrategyFlowProvider>
  );
}
```

### Data Loading Strategy

#### Product-Specific Data Loading
```jsx
// useProductData.js - Custom hook for loading JSON data
export function useProductData(productId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const dataMap = {
      'mvia': '/json/mvia.json',
      'strategyflow': '/json/sf.json'
    };
    
    fetch(dataMap[productId])
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [productId]);
  
  return { data, loading, error };
}
```

#### SearchModule Data Integration
```jsx
// SearchModule.jsx
function SearchModule({ product, onCompanySelect, onIndustrySelect, config }) {
  const { data, loading, error } = useProductData(product);
  const [searchResults, setSearchResults] = useState([]);
  
  // Product-specific data access
  const companies = data?.companies || [];
  const industries = data?.industries || [];
  
  // Search logic with product-specific filtering
  const handleSearch = (query) => {
    if (config.searchType === 'company') {
      const filtered = companies.filter(company => 
        company.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      const filtered = industries.filter(industry => 
        industry.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };
  
  return (
    <div className={styles.searchModule}>
      {/* Search interface components */}
    </div>
  );
}
```

### Event Handling & Navigation

#### Callback-Based Navigation Pattern
```jsx
// Parent page defines what happens after selection
function MVIASearchPage() {
  const navigate = useNavigate(); // React Router navigation
  
  const handleCompanySelect = (company) => {
    // Update global state
    setSelectedCompany(company);
    // Navigate to next page
    navigate(`/mvia/overview/${company.id}`);
  };
  
  return (
    <SearchModule 
      onCompanySelect={handleCompanySelect}
      // Component handles the selection UI, parent handles the navigation
    />
  );
}
```

#### SearchModule Internal Event Handling
```jsx
// SearchModule.jsx - Internal event handling
function SearchModule({ onCompanySelect, onIndustrySelect }) {
  const handleResultClick = (result) => {
    if (currentSearchType === 'company') {
      onCompanySelect(result); // Calls parent's navigation function
    } else {
      onIndustrySelect(result); // Calls parent's navigation function
    }
  };
  
  return (
    <ResultsDropdown 
      results={searchResults}
      onResultClick={handleResultClick}
    />
  );
}
```

### Styling Integration

#### CSS Modules with Site Variables
```css
/* SearchModule.module.css */
.searchModule {
  /* Access site-level variables */
  color: var(--primary-text-color);
  font-family: var(--font-family-primary);
  
  /* Component-specific styles */
  padding: 1rem;
  border-radius: 8px;
  background: var(--background-light);
}

.searchInput {
  /* McKinsey Design System integration */
  border: 1px solid var(--mds-border-color);
  font-size: var(--mds-font-size-body);
  
  /* Custom overrides */
  border-radius: 12px; /* Override MDS square buttons */
}

.searchInput:focus {
  border-color: var(--mds-primary-blue);
  box-shadow: 0 0 0 2px var(--mds-primary-blue-light);
}
```

#### McKinsey Design System Integration
```jsx
// Custom MDS component variants
import { Button as MDSButton } from '@mckinsey/design-system';
import styles from './CustomButton.module.css';

function CustomButton({ variant = 'primary', rounded = false, children, ...props }) {
  const buttonClass = `${styles.customButton} ${rounded ? styles.rounded : ''}`;
  
  return (
    <MDSButton 
      className={buttonClass}
      variant={variant}
      {...props}
    >
      {children}
    </MDSButton>
  );
}
```

### Component Modularity

#### Self-Contained Component Design
- **Independent**: Each component can function without others
- **Configurable**: Props control behavior and appearance
- **Composable**: Components can be combined in different layouts
- **Testable**: Each component can be tested in isolation

#### Add/Remove Pattern
```jsx
// Easy to add search to any page
import SearchModule from './components/SearchModule/SearchModule';

function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
      <SearchModule product="mvia" onCompanySelect={handleSelection} />
    </div>
  );
}

// Easy to remove - just comment out or delete the import/usage
// No other components break when SearchModule is removed
```

### Development Workflow

#### Component Development Process
1. **Start with SearchModule**: Build main search component first
2. **Add Sub-components**: Build SearchInput, BinaryToggle, ResultsDropdown
3. **Integrate PeerSelector**: Add as separate component for MVIA
4. **Test in Isolation**: Each component works independently
5. **Integrate with Pages**: Connect components to page navigation
6. **Add State Management**: Implement React Context for global state
7. **Style Integration**: Apply CSS Modules and MDS components

#### File Organization Benefits
- **Easy Maintenance**: All search-related code in one folder
- **Easy Extension**: Add new features to search without affecting other components
- **Easy Removal**: Delete entire SearchModule folder to remove feature
- **Easy Testing**: Each component and hook can be tested separately
- **Easy Reuse**: Import SearchModule into any page or layout

---
