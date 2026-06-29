import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.jpg'
import '../../styles/Navbar.css'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // navbar height
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        {/* Left Side: Logo */}
        <a href="/" className="navbar-logo-link">
          <img src={logoImg} alt="Sendi Logo" className="navbar-logo-image" />
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="navbar-desktop-nav">
          <a href="#home" className="nav-link active" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
          <a href="#how-it-works" className="nav-link" onClick={(e) => scrollToSection(e, 'how-it-works')}>How It Works</a>
          <a href="#products" className="nav-link" onClick={(e) => scrollToSection(e, 'products')}>Cover Options</a>
          <a href="#countries" className="nav-link" onClick={(e) => scrollToSection(e, 'countries')}>Countries</a>
          <a href="#faq" className="nav-link" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
        </nav>

        {/* Right Side: Desktop CTAs */}
        <div className="navbar-desktop-cta">
          <a href="/waitlist" className="nav-link-waitlist" onClick={(e) => { e.preventDefault(); navigate('/waitlist'); }}>Join Waitlist</a>
          <button className="cta-button" onClick={() => {
            const el = document.getElementById('quote')
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY - 80
              window.scrollTo({ top, behavior: 'smooth' })
            }
          }}>Check Availability</button>
        </div>

        {/* Mobile Hamburger Menu Trigger */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      <div className={`navbar-mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="navbar-mobile-nav">
          <a href="#home" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
          <a href="#how-it-works" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'how-it-works')}>How It Works</a>
          <a href="#products" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'products')}>Cover Options</a>
          <a href="#countries" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'countries')}>Countries</a>
          <a href="#faq" className="mobile-nav-link" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
          <a href="/waitlist" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigate('/waitlist'); }}>Join Waitlist</a>
          <div className="mobile-cta-container">
            <button className="cta-button mobile-cta" onClick={() => {
              setIsMobileMenuOpen(false)
              const el = document.getElementById('quote')
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top, behavior: 'smooth' })
              }
            }}>Check Availability</button>
          </div>
        </nav>
      </div>
    </header>
  )
}
