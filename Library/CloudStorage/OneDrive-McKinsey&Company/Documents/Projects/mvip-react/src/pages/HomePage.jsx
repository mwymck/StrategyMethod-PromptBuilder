import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>McKinsey Value Intelligence Platform</h1>
        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>
          Choose your product to get started
        </p>
      </header>
      
      <div className="flex gap-lg" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ 
          border: '1px solid var(--color-border-medium)', 
          borderRadius: 'var(--border-radius-lg)', 
          padding: 'var(--spacing-xl)',
          textAlign: 'center',
          minWidth: '300px'
        }}>
          <h2>MVIA</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
            McKinsey Value Intelligence Assistant
          </p>
          <p style={{ marginBottom: 'var(--spacing-lg)' }}>
            Company performance analysis with peer comparison capabilities
          </p>
          <Link 
            to="/mvia/search" 
            style={{ 
              background: 'var(--color-primary)', 
              color: 'white', 
              padding: 'var(--spacing-sm) var(--spacing-lg)',
              borderRadius: 'var(--border-radius-md)',
              textDecoration: 'none'
            }}
          >
            Start MVIA Analysis
          </Link>
        </div>
        
        <div style={{ 
          border: '1px solid var(--color-border-medium)', 
          borderRadius: 'var(--border-radius-lg)', 
          padding: 'var(--spacing-xl)',
          textAlign: 'center',
          minWidth: '300px'
        }}>
          <h2>StrategyFlow</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
            Strategic Analysis Platform
          </p>
          <p style={{ marginBottom: 'var(--spacing-lg)' }}>
            Multi-step strategic analysis generation with comprehensive configuration
          </p>
          <Link 
            to="/strategyflow/search" 
            style={{ 
              background: 'var(--color-primary)', 
              color: 'white', 
              padding: 'var(--spacing-sm) var(--spacing-lg)',
              borderRadius: 'var(--border-radius-md)',
              textDecoration: 'none'
            }}
          >
            Start Strategic Analysis
          </Link>
        </div>
      </div>
      
      <footer style={{ textAlign: 'center', marginTop: '3rem', padding: 'var(--spacing-xl)' }}>
        <p style={{ color: 'var(--color-text-tertiary)' }}>
          React prototype for MVIP migration
        </p>
      </footer>
    </div>
  )
}

export default HomePage