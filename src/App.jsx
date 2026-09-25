import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import BackToTopButton from './components/BackToTopButton'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CaseStudyAria from './pages/CaseStudyAria'
import CaseStudyCSI from './pages/CaseStudyCSI'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Work from './pages/Work'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/customer-signals-intelligence" element={<CaseStudyCSI />} />
          <Route path="/work/aria-operations-for-networks" element={<CaseStudyAria />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
      <BackToTopButton />
    </div>
  )
}

export default App
