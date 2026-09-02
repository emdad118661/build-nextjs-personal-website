'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#home"
          className="text-2xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          EH
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="nav-link text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass mt-4 mx-6 rounded-xl overflow-hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const profileImages = [
    "https://i.postimg.cc/vmsRX2Cx/profile.jpg",
    "https://i.postimg.cc/mDFB518Q/profile2-modified.jpg",
    "https://i.postimg.cc/gc8GyRxg/profile3-modified.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Generate particles on client-side only (after mount)
  useEffect(() => {
    setIsClient(true);
    const generatedParticles = [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${Math.random() * 10 + 10}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Animation - Client Side Only */}
      <div className="absolute inset-0 overflow-hidden">
        {isClient && particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              width: particle.width,
              height: particle.height,
              background: `linear-gradient(135deg, #00d4ff, #7c3aed)`,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="text-cyan-400 text-lg mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I&apos;m
            </motion.p>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="gradient-text">Emdadul Haque</span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              MERN Stack Developer
            </motion.h2>

            <motion.p
              className="text-gray-400 text-lg mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Building full-stack web applications with MongoDB, Express.js, React.js, Node.js, and Next.js. 
              Passionate about AI-assisted development and clean, maintainable code.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="#projects"
                className="btn-primary px-8 py-3 rounded-full font-semibold text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="glass px-8 py-3 rounded-full font-semibold text-white border border-cyan-400/30"
                whileHover={{ scale: 1.05, background: 'rgba(0, 212, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
              <motion.a
                href="https://drive.google.com/uc?export=download&id=17tdxmY1iQKgpNpI-8Ti1f5EQgbqAx_K7"
                download="Emdadul_Haque_CV.pdf"
                className="glass px-8 py-3 rounded-full font-semibold text-white border border-purple-400/30"
                whileHover={{ scale: 1.05, background: 'rgba(124, 58, 237, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
            </motion.div>

            <motion.div
              className="flex gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.a
                href="https://github.com/emdad118661"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-6.27 0-1.38.48-2.535 1.26-3.435-.12-.315-.54-1.605.12-3.33 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.725.24 3.015.12 3.33.78.9 1.26 2.04 1.26 3.435 0 4.95-2.805 6-5.475 6.3.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/emdadul-haque-700691180"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://www.facebook.com/imdadulhaq.speaking/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="flex justify-center"
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Floating badges - positioned on top layer */}
              <motion.div
                className="absolute -top-4 -right-4 glass px-4 py-2 rounded-full z-50"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-cyan-400">MERN</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-full z-50"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <span className="text-purple-400">Next.js</span>
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-8 glass px-4 py-2 rounded-full z-50"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <span className="text-pink-400">AI-Assisted</span>
              </motion.div>

              {/* Image Carousel - Rectangular */}
              <div className="w-72 h-96 md:w-80 md:h-[450px] gradient-border flex items-center justify-center glow overflow-hidden rounded-xl relative z-10">
                <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center relative overflow-hidden rounded-lg">
                  {profileImages.map((img, index) => (
                    <motion.img
                      key={index}
                      src={img}
                      alt={`Emdadul Haque Profile ${index + 1}`}
                      className="absolute w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: index === currentImageIndex ? 1 : 0
                      }}
                      transition={{
                        opacity: {
                          duration: 1,
                          ease: 'easeInOut'
                        }
                      }}
                      style={{
                        zIndex: index === currentImageIndex ? 10 : 1
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="section-divider w-32 mx-auto" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeInLeft} className="space-y-6">
            <h3 className="text-2xl font-semibold text-cyan-400">Professional Summary</h3>
            <p className="text-gray-300 leading-relaxed">
              Motivated MERN Stack Developer with hands-on experience building full-stack web applications 
              using MongoDB, Express.js, React.js, Node.js, and Next.js. Proficient in AI-assisted development 
              — actively using Claude Code and Gemini for code generation, debugging, and refactoring to ship 
              faster without compromising code quality.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Completed a frontend internship at <span className="text-cyan-400">Daraz Bangladesh</span>, 
              gaining real-world experience in REST API integration, bug fixing, and Figma-to-UI conversion. 
              Passionate about writing clean, maintainable code and continuously learning modern web technologies.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.div
                variants={scaleIn}
                className="glass p-4 rounded-xl text-center"
              >
                <div className="text-3xl font-bold gradient-text">2+</div>
                <div className="text-gray-400">Years Experience</div>
              </motion.div>
              <motion.div
                variants={scaleIn}
                className="glass p-4 rounded-xl text-center"
              >
                <div className="text-3xl font-bold gradient-text">10+</div>
                <div className="text-gray-400">Projects Completed</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            className="relative"
          >
            <div className="gradient-border p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Location</div>
                    <div className="text-white">112, Poran Mondol Tek, Boro Dewra, Tongi West, Gazipur, Bangladesh</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Email</div>
                    <div className="text-white">emdad118661@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Phone</div>
                    <div className="text-white">+8801746653632</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const skillCategories = [
    {
      title: 'Front-End',
      skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'DaisyUI', 'GSAP', 'Context API'],
      color: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Back-End',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'SQL', 'JWT', 'REST API'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'AI-Assisted / Vibe Coding',
      skills: ['Claude Code', 'Gemini', 'Prompt Engineering', 'LLM-Assisted Coding & Debugging'],
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Other Skills',
      skills: ['OOP', 'MVC', 'Data Structures & Algorithms', 'Git', 'GitHub', 'Firebase Authentication', 'Postman', 'Responsive Design', 'WordPress (Beginner)'],
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Learning',
      skills: ['TypeScript', 'Redux', 'Docker', 'Testing (Jest)', 'CI/CD', 'GraphQL', 'WebSockets'],
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <div className="section-divider w-32 mx-auto" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={fadeInUp}
              className="gradient-border p-6"
            >
              <h3 className={`text-xl font-semibold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skill-badge glass px-4 py-2 rounded-full text-sm text-gray-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const experiences = [
    {
      title: 'Technology - Intern (Front End Development Focused)',
      company: 'Daraz Bangladesh',
      period: 'Nov 2023 – Feb 2024',
      description: 'Frontend internship focused on React.js development and REST API integration.',
      responsibilities: [
        'Identified and resolved application bugs',
        'Worked with QA team to gather requirements',
        'Supported developers in implementing features',
        'Converted Figma designs into UI',
        'Integrated REST APIs into frontend components'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="section-divider w-32 mx-auto" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="gradient-border p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{exp.title}</h3>
                  <p className="text-cyan-400">{exp.company}</p>
                </div>
                <div className="glass px-4 py-2 rounded-full mt-4 md:mt-0 w-fit">
                  <span className="text-gray-300">{exp.period}</span>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{exp.description}</p>
              <ul className="space-y-2">
                {exp.responsibilities.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-cyan-400 mt-1">▹</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const projects = [
    {
      title: 'Landing Page of an AI SAAS Product (Xai Workspace)',
      description: 'Developed a high-performance, visually engaging landing page using Next.js and Framer Motion, featuring smooth animations and responsive design optimized for fast load times and cross-browser compatibility.',
      tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      github: 'https://github.com/emdad118661/xai-workspace',
      live: 'https://xai-workspace.vercel.app/'
    },
    {
      title: 'MERN Stack Book Store App',
      description: 'Built a full-stack MERN application with reusable React components, Context API state management, REST API integration, and Firebase authentication, delivering a seamless user experience across devices.',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Firebase', 'Context API'],
      github: 'https://github.com/emdad118661/mern-book-client',
      liveClient: 'https://mern-book-client-6irz.onrender.com/',
      liveServer: 'https://emdad118661-mern-book-server.onrender.com/'
    },
    {
      title: 'MERN Dropshipping Site',
      description: 'Developed a full-stack dropshipping platform using React.js and Node.js, implementing role-based access control, RESTful APIs, and responsive UI with focus on performance and maintainable code structure.',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST API'],
      github: 'https://github.com/emdad118661/dropshipping-client',
      liveClient: 'https://dropshipping-client.onrender.com/',
      liveServer: 'https://dropshipping-server-rs3y.onrender.com/'
    },
    {
      title: 'E-commerce Landing Page (Figma to UI)',
      description: 'Converted Figma design into a pixel-perfect, responsive e-commerce landing page using Next.js and Tailwind CSS, ensuring cross-browser compatibility, smooth scrolling, and optimized performance across all screen sizes.',
      tech: ['Next.js', 'Tailwind CSS', 'Figma'],
      github: 'https://github.com/emdad118661/b2gsoft-project',
      live: 'https://b2gsoft-project.vercel.app/'
    },
    {
      title: 'Event Management Frontend Page',
      description: 'Built a responsive event management frontend using React.js with REST API integration and Firebase authentication, focusing on clean component architecture and consistent UI across different browsers and devices.',
      tech: ['React.js', 'REST API', 'Firebase', 'CSS3'],
      github: 'https://github.com/emdad118661/social-event-management-emdad118661',
      live: 'https://social-event-management-b206a.web.app/'
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <div className="section-divider w-32 mx-auto" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="project-card gradient-border p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-6.27 0-1.38.48-2.535 1.26-3.435-.12-.315-.54-1.605.12-3.33 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.725.24 3.015.12 3.33.78.9 1.26 2.04 1.26 3.435 0 4.95-2.805 6-5.475 6.3.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href={project.live || project.liveClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.2 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                </div>
              </div>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="glass px-3 py-1 rounded-full text-xs text-cyan-400">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  whileHover={{ x: 3 }}
                >
                  <span>Source Code</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
                {(project.live || project.liveClient) && (
                  <motion.a
                    href={project.live || project.liveClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                    whileHover={{ x: 3 }}
                  >
                    <span>Live Preview</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Education Section
function EducationSection() {
  const education = [
    {
      degree: 'Bachelor of Science in Computer Science & Engineering',
      institution: 'American International University – Bangladesh (AIUB)',
      gpa: 'CGPA: 3.57',
      icon: ''
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Safiuddin Sarker Academy & College',
      gpa: 'GPA: 3.58',
      icon: '📚'
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Safiuddin Sarker Academy & College',
      gpa: 'GPA: 5.00',
      icon: '📖'
    }
  ];

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="section-divider w-32 mx-auto" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="gradient-border p-6 text-center"
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {edu.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">{edu.degree}</h3>
              <p className="text-cyan-400 mb-2">{edu.institution}</p>
              <div className="glass inline-block px-4 py-2 rounded-full">
                <span className="text-gray-300">{edu.gpa}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Validation: Check if any field is empty
    if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
      setError('You have not completed the form');
      return;
    }

    // Submit to FormSubmit
    e.target.submit();
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <div className="section-divider w-32 mx-auto" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          <motion.div variants={fadeInLeft} className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">Contact Information</h3>
            <div className="space-y-4">
              <motion.a
                href="mailto:emdad118661@gmail.com"
                className="flex items-center gap-4 glass p-4 rounded-xl hover:bg-white/10 transition-all"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="text-white">emdad118661@gmail.com</div>
                </div>
              </motion.a>
              <motion.a
                href="tel:+8801746653632"
                className="flex items-center gap-4 glass p-4 rounded-xl hover:bg-white/10 transition-all"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Phone</div>
                  <div className="text-white">+8801746653632</div>
                </div>
              </motion.a>
              <motion.div
                className="flex items-center gap-4 glass p-4 rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Location</div>
                  <div className="text-white">112, Poran Mondol Tek, Boro Dewra, Tongi West, Gazipur, Bangladesh</div>
                </div>
              </motion.div>
            </div>

            <div className="pt-6">
              <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/emdad118661"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-6.27 0-1.38.48-2.535 1.26-3.435-.12-.315-.54-1.605.12-3.33 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.725.24 3.015.12 3.33.78.9 1.26 2.04 1.26 3.435 0 4.95-2.805 6-5.475 6.3.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/emdadul-haque-700691180"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInRight}>
            <div className="gradient-border p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Send Me a Message</h3>
              
              {/* FormSubmit Form */}
              <form
                action="https://formsubmit.co/emdad118661@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="New Message from Portfolio Website" />

                <div>
                  <label className="block text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full glass px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full glass px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Message</label>
                  <textarea
                    rows="4"
                    name="message"
                    required
                    className="w-full glass px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-xl font-semibold text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Emdadul Haque. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/emdad118661" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
              GitHub
            </a>
            <a href="https://linkedin.com/in/emdadul-haque-700691180" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
              LinkedIn
            </a>
            <a href="mailto:emdad118661@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
