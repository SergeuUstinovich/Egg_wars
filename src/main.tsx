import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global/index.scss'
import StoreProviders from './provider/StoreProvider/StoreProviders.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProviders>
      <App />
    </StoreProviders>
  </React.StrictMode>,
)
