// inserted import has to go AFTER polyfills
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)
