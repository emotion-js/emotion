import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
