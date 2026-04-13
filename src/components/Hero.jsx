import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) { document.body.classList.add('dark'); }
    else { document.body.classList.remove('dark'); }
  }, [isDarkMode]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/cv_.pdf'; 
    link.download = 'Anhar_Altamimi_CV.pdf';
    link.click();
  };

  const iconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s'
  };

  return (
    /* الحل الجذري: إزالة أي Padding علوي تماماً واستخدام margin: 0 */
    <section id="home" style={{ border: 'none', padding: '0', margin: '0' }}>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'fixed', // تغيير إلى fixed لضمان التحكم الكامل بالموضع
        top: '0', 
        left: '0',
        right: '0',
        padding: '0 2rem', // لا يوجد padding علوي هنا
        maxWidth: '100%', 
        height: '80px', // تحديد ارتفاع الهيدر
        backgroundColor: 'transparent',
        zIndex: '1000',
        margin: '0'
      }}>
        <div className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/images/Logo.png" 
            alt="Anhar Saud Logo" 
            style={{ 
              height: '70px', // تصغير بسيط ليناسب الالتصاق بالأعلى
              width: 'auto',
              filter: isDarkMode ? 'invert(1) brightness(2)' : 'none',
              transition: 'all 0.3s ease',
              marginTop: '-5px' // رفع يدوي إضافي إذا لزم الأمر
            }} 
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.85rem' }}>
            <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
            <a href="#experience" style={{ color: 'inherit', textDecoration: 'none' }}>Experience</a>
            <a href="#education" style={{ color: 'inherit', textDecoration: 'none' }}>Education</a>
            <a href="#projects" style={{ color: 'inherit', textDecoration: 'none' }}>Projects</a>
            <a href="#courses" style={{ color: 'inherit', textDecoration: 'none' }}>Courses</a>
            <a href="#skills" style={{ color: 'inherit', textDecoration: 'none' }}>Skills</a>
          </div>

          <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ cursor: 'pointer', background: 'none', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '5px 12px', color: 'inherit' }}>
            {isDarkMode ? '🌙 Night' : '☀️ Morning'}
          </button>
        </div>
      </nav>

      {/* المحتوى النصي يبدأ بعد مسافة كافية لكي لا يختفي تحت الهيدر الـ Fixed */}
      <div style={{ padding: '120px 2rem 4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '4rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>
          ANHAR | <span style={{ color: 'var(--accent)' }}>Software Engineer & AI Developer</span>
        </h1>
        <p style={{ color: 'var(--text-sub)', fontSize: '1.25rem', maxWidth: '750px', marginBottom: '3rem', lineHeight: '1.6' }}>
          Fresh Information Technology graduate specializing in AI-based systems and data analysis.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={handleDownload} style={{ padding: '0.9rem 2.8rem', background: 'var(--text-main)', color: 'var(--bg-color)', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            Download CV
          </button>

          <div style={{ display: 'flex', gap: '1rem' }}>
            {/* أيقونات التواصل */}
            <a href="https://linkedin.com/in/anhar-altamimi-1a182831a" target="_blank" rel="noreferrer" style={iconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto:anhar.altamimi24@gmail.com" style={iconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
            <a href="tel:+966568486002" style={iconStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;