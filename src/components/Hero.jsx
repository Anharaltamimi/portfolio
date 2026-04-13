import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/cv_.pdf';
    link.download = 'Anhar_Altamimi_CV.pdf';
    link.click();
  };

  return (
    <section id="home" className="hero">

      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="nav-logo">
          <img src="/images/Logo.png" alt="logo" />
        </div>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#projects">Projects</a>
          <a href="#courses">Courses</a>
          <a href="#skills">Skills</a>
        </div>

        <button
          className="mode-btn"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? '🌙 Night' : '☀️ Morning'}
        </button>
      </nav>

      {/* ===== HERO CONTENT ===== */}
      <div className="hero-container">

        <h1 className="hero-title">
          ANHAR
          <span>Software Engineer & AI Developer</span>
        </h1>

        <p className="hero-desc">
          Fresh Information Technology graduate specializing in AI-based systems and data analysis.
        </p>

        <div className="hero-actions">
          <button onClick={handleDownload} className="cv-btn">
            Download CV
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
