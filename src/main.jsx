import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar'
import Sobre from './components/Sobre'
import Projetos from './components/Projetos'
import Habilidades from './components/Habilidades'
import Contato from './components/Contato'
import Footer from './components/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Navbar />
    <Sobre />
    <Projetos />
    <Habilidades />
    <Contato />
    <Footer />

  </StrictMode>,
)
