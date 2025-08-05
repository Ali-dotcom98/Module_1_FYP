import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UsecontextProvider } from './Pages/ContextApi/UserContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsecontextProvider>
        <App />
    </UsecontextProvider>
    
  </StrictMode>,
)
