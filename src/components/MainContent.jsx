import React, { useState } from 'react';

// مكون مستقل لكل بطاقة مشروع (يدعم الصور والـ PDF والتكبير)
const ProjectCard = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const isPDF = (url) => url.toLowerCase().endsWith('.pdf');

  const handleViewFile = () => {
    if (project.items && project.items.length > 0) {
      if (isPDF(project.items[currentIndex])) {
        window.open(project.items[currentIndex], '_blank');
      } else {
        setIsOpen(true);
      }
    }
  };

  const nextItem = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === project.items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevItem = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? project.items.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="project-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', minHeight: '100%' }}>
        
        {project.items && project.items.length > 0 && (
          <div 
            style={{ 
              position: 'relative', width: '100%', height: '350px', 
              marginBottom: '15px', overflow: 'hidden', borderRadius: '12px',
              background: 'rgba(0,0,0,0.2)', cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.1)'
            }} 
            onClick={handleViewFile}
          >
            {isPDF(project.items[currentIndex]) ? (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <iframe
                  src={`${project.items[currentIndex]}#toolbar=0&navpanes=0&scrollbar=0`}
                  style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                  title={project.title}
                />
                <div style={zoomOverlayStyle}>
                  <div style={zoomBadgeStyle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <img 
                src={project.items[currentIndex]} 
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} 
              />
            )}
            
            {project.items.length > 1 && (
              <>
                <button onClick={prevItem} style={arrowStyle({ left: '5px' })}>❮</button>
                <button onClick={nextItem} style={arrowStyle({ right: '5px' })}>❯</button>
                <div style={dotContainerStyle}>
                  {project.items.map((_, idx) => (
                    <div key={idx} style={dotStyle(idx === currentIndex)} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{project.title}</h3>
        <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.2rem', flexGrow: 1 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
          {project.tools.map(tool => <span key={tool} className="tool-tag">{tool}</span>)}
        </div>
      </div>

      {isOpen && (
        <div style={lightboxOverlayStyle} onClick={() => setIsOpen(false)}>
          <button style={closeButtonStyle} onClick={() => setIsOpen(false)}>✕</button>
          <img src={project.items[currentIndex]} style={{ maxWidth: '95%', maxHeight: '95%', objectFit: 'contain' }} alt="Preview" />
        </div>
      )}
    </>
  );
};

// الستايلات
const zoomOverlayStyle = { position: 'absolute', top: '15px', right: '15px', zIndex: 5 };
const zoomBadgeStyle = { background: '#2dd4bf', color: '#111', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const arrowStyle = (pos) => ({ position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 10, ...pos });
const dotContainerStyle = { position: 'absolute', bottom: '15px', width: '100%', display: 'flex', justifyContent: 'center', gap: '5px' };
const dotStyle = (isActive) => ({ width: '6px', height: '6px', borderRadius: '50%', background: isActive ? '#2dd4bf' : 'rgba(255,255,255,0.3)' });
const lightboxOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 };
const closeButtonStyle = { position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', fontSize: '30px', cursor: 'pointer' };

const MainContent = () => {
  const projectsData = [
    {
      id: 1,
      title: "Automated Diabetic Maculopathy Detection Via Deep Learning",
      description: "Developed a deep learning-based system using Python to automate the detection of Diabetic Maculopathy in OCT images, achieving 96% accuracy to support physicians and improve early diagnosis.",
      tools: ["Python", "Deep Learning", "Medical Imaging", "TensorFlow"],
      items: ["/images/DeepSight.pdf"] 
    },
    {
      id: 2,
      title: "Najd Airlines – Airline Reservation System",
      description: "Designed a user-friendly airline reservation interface using Figma focused on flight search, booking flow, and passenger reviews using HCI principles.",
      tools: ["Figma", "UI/UX Design", "Prototyping", "Wireframing"],
      items: ["/images/Najd1.png", "/images/Najd2.png", "/images/Najd3.png", "/images/Najd4.png", "/images/Najd5.png"] 
    },
    {
      id: 3,
      title: "SLA Compliance Dashboard",
      description: "Designed and implemented interactive dashboards to analyze SLA compliance and monitor key project performance metrics during training at SDAIA. (Visuals are confidential due to security policies).",
      tools: ["Power BI", "Data Analysis", "Dashboard Development"],
      items: [] 
    }
  ];

  return (
    <div className="container">
      {/* About Me Section */}
      <section id="about">
        <h2>About Me</h2>
        <p style={{ color: 'var(--text-sub)', lineHeight: '1.8', fontSize: '1.1rem' }}>
          Fresh Information Technology graduate with hands-on experience in data analysis, dashboard development, and AI-based systems, along with professional training in project management at SDAIA. 
          Strong interest in Artificial Intelligence and data analysis.
        </p>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <h2>Experience</h2>
        <div className="project-card" style={{ padding: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ background: 'rgba(45, 212, 191, 0.1)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(45, 212, 191, 0.2)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Co-op Training in Project Management</h3>
              <p style={{ color: 'var(--accent)', margin: '2px 0', fontSize: '1rem', fontWeight: '500' }}>Saudi Data & Artificial Intelligence Authority (SDAIA)</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.95rem', paddingTop: '4px', minWidth: '70px' }}>09/2025 - 12/2025</div>
              <div style={{ position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: '3.5px', top: '12px', bottom: '12px', width: '1px', background: 'var(--accent)', opacity: 0.3 }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-20.5px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}></div>
                    <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>📊 Dashboard Development & SLA Analysis</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-20.5px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                    <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>📄 Project Reporting & Documentation</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-20.5px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                    <span style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>👥 Team Collaboration & Progress Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {["Power BI", "Team Collaboration","Project Documentation"].map(s => <span key={s} className="tool-tag">{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education">
        <h2>Education</h2>
        <div className="project-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Bachelor's Degree In Information Technology</h3>
          <p style={{ color: 'var(--text-sub)', marginBottom: '5px' }}>Princess Nourah bint Abdulrahman University</p>
          <p style={{ color: 'var(--accent)', fontWeight: 'bold' }}>08/2021 - 01/2026</p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <h2>Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {projectsData.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses">
        <h2>Courses</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: "Artificial Intelligence Fundamentals", org: "IBM SkillsBuild" },
            { title: "Artificial Intelligence Concepts and Advanced Applications", org: "SDAIA" },
            { title: "Fundamentals of Artificial Intelligence", org: "SDAIA" },
            { title: "Database Foundations", org: "Oracle Academy" },
            { title: "Introduction to Networks", org: "Cisco Networking Academy" },
            { title: "Networking Basics", org: "Cisco Networking Academy" },
            { title: "Cybersecurity Fundamentals", org: "IBM SkillsBuild" },
            { title: "Introduction to Cybersecurity", org: "Cisco Networking Academy" }
          ].map((course, i) => (
            <div key={i} className="skill-box" style={{ padding: '15px', textAlign: 'left' }}>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{course.title}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--accent)' }}>{course.org}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <h2>Skills</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text-main)' }}>Technical Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Java & JavaScript', 'SQL', 'PHP', 'Python', 'HTML', 'CSS', 'Data Analysis', 'Data Visualization', 'Deep Learning', 'Figma', 'UML', 'Dashboard Development', 'SDLC', 'Project Documentation'].map(s => <div key={s} className="skill-box">{s}</div>)}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text-main)' }}>Soft Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Team Collaboration', 'Time Management', 'Problem Solving'].map(s => <div key={s} className="skill-box">{s}</div>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainContent;