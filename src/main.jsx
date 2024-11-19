import React from 'react'
import ReactDOM from 'react-dom/client'
import BudgetCalculator from './BudgetCalculator'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="min-h-screen bg-slate-50 py-8">
      <BudgetCalculator />
    </div>
  </React.StrictMode>,
)
