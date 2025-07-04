import { useNavigate } from 'react-router-dom'
// import SearchModule from '../components/SearchModule/SearchModule'
// import { StrategyFlowProvider } from '../contexts/StrategyFlowContext'

function StrategyFlowSearchPage() {
  const navigate = useNavigate()
  
  const handleCompanySelect = (company) => {
    console.log('Company selected:', company)
    // Navigate to analysis configuration when implemented
    // navigate(`/strategyflow/analysis?company=${company.id}`)
  }
  
  const handleIndustrySelect = (industry) => {
    console.log('Industry selected:', industry)
    // Navigate to analysis configuration when implemented
    // navigate(`/strategyflow/analysis?industry=${industry.id}`)
  }
  
  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>StrategyFlow Search</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Search for a company or industry to begin strategic analysis
        </p>
      </header>
      
      {/* Info Tiles Placeholder */}
      <div style={{ 
        border: '2px dashed var(--color-border-medium)', 
        borderRadius: 'var(--border-radius-lg)',
        padding: 'var(--spacing-xl)',
        textAlign: 'center',
        marginBottom: 'var(--spacing-xl)'
      }}>
        <h3>Info Tiles Section</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
          Educational content tiles about analysis types
        </p>
        <div className="flex gap-md" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ 
            border: '1px solid var(--color-border-light)', 
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--spacing-md)',
            minWidth: '200px'
          }}>
            <strong>Strategic Journey</strong>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Current state → Future vision
            </p>
          </div>
          <div style={{ 
            border: '1px solid var(--color-border-light)', 
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--spacing-md)',
            minWidth: '200px'
          }}>
            <strong>Market Trends</strong>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Industry analysis & trends
            </p>
          </div>
          <div style={{ 
            border: '1px solid var(--color-border-light)', 
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--spacing-md)',
            minWidth: '200px'
          }}>
            <strong>Competitive Landscape</strong>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Competitor analysis & positioning
            </p>
          </div>
        </div>
      </div>
      
      {/* SearchModule Placeholder */}
      <div style={{ 
        border: '2px dashed var(--color-border-medium)', 
        borderRadius: 'var(--border-radius-lg)',
        padding: 'var(--spacing-xl)',
        textAlign: 'center'
      }}>
        <h3>SearchModule Component</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
          This is where the SearchModule component will be implemented
        </p>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
          Features: Company/Industry toggle, immediate industry dropdown, analysis context
        </p>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border-medium)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--border-radius-md)',
            cursor: 'pointer'
          }}
        >
          ← Back to Home
        </button>
      </div>
      
      {/* 
      Uncomment when components are implemented:
      
      <StrategyFlowProvider>
        <SearchModule 
          product="strategyflow"
          onCompanySelect={handleCompanySelect}
          onIndustrySelect={handleIndustrySelect}
          showPeerSelector={false}
          config={{ 
            enableIndustrySearch: true,
            showAvailabilityIndicators: false,
            placeholder: "Company or industry search" 
          }}
        />
      </StrategyFlowProvider>
      */}
    </div>
  )
}

export default StrategyFlowSearchPage