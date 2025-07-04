import { Routes, Route } from 'react-router-dom'
import './styles/mds-overrides.css'

// Import pages (to be created)
import HomePage from './pages/HomePage'
import MVIASearchPage from './pages/MVIASearchPage'
import StrategyFlowSearchPage from './pages/StrategyFlowSearchPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mvia/search" element={<MVIASearchPage />} />
        <Route path="/strategyflow/search" element={<StrategyFlowSearchPage />} />
        {/* Add more routes as you build additional pages */}
      </Routes>
    </div>
  )
}

export default App