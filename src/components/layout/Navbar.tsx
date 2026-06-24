import { useState, useEffect } from 'react'
import logoImg from '../../assets/logo.jpg'
import '../../styles/Navbar.css'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position to add class for premium scroll styling (e.g. shadow, border)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Toggle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        {/* Left Side: Logo */}
        <a href="/" className="navbar-logo-link">
          <img src={logoImg} alt="Sendi Logo" className="navbar-logo-image" />
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="navbar-desktop-nav">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#problem" className="nav-link">The Problem</a>
          <a href="#how-it-works" className="nav-link">How It works</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        {/* Right Side: Desktop CTA */}
        <div className="navbar-desktop-cta">
          <button className="cta-button">Get Quote</button>
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
          <a 
            href="#home" 
            className="mobile-nav-link" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </a>
          <a 
            href="#problem" 
            className="mobile-nav-link" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            The Problem
          </a>
          <a 
            href="#how-it-works" 
            className="mobile-nav-link" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It works
          </a>
          <a 
            href="#faq" 
            className="mobile-nav-link" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQ
          </a>
          <div className="mobile-cta-container">
            <button className="cta-button mobile-cta">Get Quote</button>
          </div>
        </nav>
      </div>
    </header>
  )
}
