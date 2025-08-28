import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'
import Sobre from './components/Sobre'
import Projetos from './components/Projetos'
import Habilidades from './components/Habilidades'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Navbar />
    <Sobre />
    <Projetos />
    <Habilidades />

  </StrictMode>,
)
