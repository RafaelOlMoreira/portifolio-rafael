import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'
import Sobre from './components/Sobre'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Navbar />
    <Sobre />

  </StrictMode>,
)
