import { useCallback, useState } from 'react'
import { useSmoothScroll } from './lib/smoothScroll'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import About from './components/About'
import CreativeStack from './components/CreativeStack'
import FeaturedWork from './components/FeaturedWork'
import ProcessInMotion from './components/ProcessInMotion'
import ContactPortal from './components/ContactPortal'
import FooterKinetic from './components/FooterKinetic'
import GrainOverlay from './components/GrainOverlay'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useSmoothScroll()

  const handleLoaded = useCallback(() => setLoaded(true), [])

  return (
    <>
      <Preloader onComplete={handleLoaded} />
      <GrainOverlay />
      <main>
        <Hero start={loaded} />
        <About />
        <CreativeStack />
        <FeaturedWork />
        <ProcessInMotion />
        <ContactPortal />
      </main>
      <FooterKinetic />
    </>
  )
}
