import React, { useState } from 'react'
import HomePage from "../../pages/borad/HomePage.jsx";

export default function NavbarB4Login() {
  const [isDarkMode, setIsDarkMode] = useState(true); 

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="font-roboto" style={{ backgroundColor: 'white', padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '55px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            backgroundColor: '#10B981', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: 'white', 
              borderRadius: '50%' 
            }}></div>
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333333' }}>TaskFlow</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="home" className="text-default" style={{ textDecoration: 'none', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'all 0.2s ease' }}>
            Home
          </a>
          <a href="features" className="text-default" style={{ textDecoration: 'none', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'all 0.2s ease' }}>
            Features
          </a>
          <a href="#templates" className="text-default" style={{ textDecoration: 'none', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'all 0.2s ease' }}>
            Templates
          </a>
          <a href="about" className="text-default" style={{ textDecoration: 'none', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '6px', transition: 'all 0.2s ease' }}>
            About Us
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="text-default" style={{ 
            background: 'none', 
            border: 'none', 
            fontWeight: '500', 
            padding: '0.5rem 1rem', 
            cursor: 'pointer', 
            borderRadius: '6px', 
            transition: 'all 0.2s ease',
            fontFamily: 'inherit'
          }}>
            Log in
          </button>
          <button style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'white', 
            border: 'none', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '8px', 
            fontWeight: '500', 
            cursor: 'pointer', 
            transition: 'all 0.2s ease',
            fontFamily: 'inherit'
          }}>
            Sign up - It's free!
          </button>
          <div 
            onClick={toggleDarkMode}
            style={{
              width: '60px',
              height: '30px',
              backgroundColor: '#2D3748',
              borderRadius: '15px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 8px'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ zIndex: 2, position: 'relative' }}>
              <circle cx="12" cy="12" r="4" stroke={!isDarkMode ? "#ffffff" : "#9CA3AF"} strokeWidth="2"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" 
                stroke={!isDarkMode ? "#ffffff" : "#9CA3AF"} 
                strokeWidth="2" 
                strokeLinecap="round"/>
            </svg>
  
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ zIndex: 2, position: 'relative' }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
                stroke={isDarkMode ? "#ffffff" : "#9CA3AF"} 
                strokeWidth="2" 
                fill="none"/>
            </svg>
            <div style={{
              width: '26px',
              height: '26px',
              backgroundColor: isDarkMode ? '#3B82F6' : '#FF8C42',
              borderRadius: '50%',
              position: 'absolute',
              right: isDarkMode ? '2px' : '32px',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}