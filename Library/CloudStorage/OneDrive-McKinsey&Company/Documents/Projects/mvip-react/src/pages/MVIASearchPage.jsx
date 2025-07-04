import { useNavigate } from 'react-router-dom'
// import SearchModule from '../components/SearchModule/SearchModule'
// import PeerSelector from '../components/PeerSelector/PeerSelector'
// import { MVIAProvider } from '../contexts/MVIAContext'

function MVIASearchPage() {
  const navigate = useNavigate()
  
  const handleCompanySelect = (company) => {
    console.log('Company selected:', company)
    // Navigate to overview page when implemented
    // navigate(`/mvia/overview/${company.id}`)
  }
  
  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>MVIA Company Search</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Search for a company to begin performance analysis
        </p>
      </header>
      
      {/* Placeholder for SearchModule */}
      <div style={{ 
        border: '2px dashed var(--color-border-medium)', 
        borderRadius: 'var(--border-radius-lg)',
        padding: 'var(--spacing-xl)',
        textAlign: 'center',
        marginBottom: 'var(--spacing-xl)'
      }}>
        <h3>SearchModule Component</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
          This is where the SearchModule component will be implemented
        </p>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
          Features: Company search, availability indicators, real-time results
        </p>
      </div>
      
      {/* Placeholder for PeerSelector */}
      <div style={{ 
        border: '2px dashed var(--color-border-medium)', 
        borderRadius: 'var(--border-radius-lg)',
        padding: 'var(--spacing-xl)',
        textAlign: 'center'
      }}>
        <h3>PeerSelector Component</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
          This is where the PeerSelector component will be implemented
        </p>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
          Features: Auto-selected peers, suggested peers, add peer functionality
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
      
      <MVIAProvider>
        <SearchModule 
          product="mvia"
          onCompanySelect={handleCompanySelect}
          showPeerSelector={true}
          config={{ 
            enableIndustrySearch: false,
            showAvailabilityIndicators: true,
            placeholder: "Company search" 
          }}
        />
        <PeerSelector
          maxPeers={5}
          showAddPeerButton={true}
        />
      </MVIAProvider>
      */}
    </div>
  )
}

export default MVIASearchPage