/**
 * Ridwoanul Haque Rafe - Portfolio Website Script
 * Fully functional, modular, accessible vanilla JavaScript
 * Features DjangoBlog Theme Integration, Mouse Spotlight, Hero Typing, and Live Project Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initScrollProgress();
  initStickyNavbar();
  initMobileMenu();
  initScrollSpy();
  initScrollAnimations();
  initSpotlightEffect();
  initStatCounters();
  initSkillCategoryFilter();
  initHeroTyping();
  initProjectFilterAndModal();
  initContactForm();
  initBackToTop();
  initCvDownload();
  initLucideIcons();
  initCursorGlow();
  initThemeToggle();
  initGitHubStats();
});

/* ==========================================================================
   1. Lucide Icons Initialization
   ========================================================================== */
function initLucideIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

/* ==========================================================================
   1b. Ambient Cursor Spotlight Follower (Intelligent Sleep / 0% Idle CPU)
   ========================================================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursor-ambient-glow');
  if (
    !glow || 
    window.innerWidth < 768 || 
    'ontouchstart' in window || 
    navigator.maxTouchPoints > 0
  ) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isMoving = false;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      glow.style.opacity = '0.75';
      isVisible = true;
    }
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(animateGlow);
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    isVisible = false;
  }, { passive: true });

  function animateGlow() {
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;
    currentX += dx * 0.12;
    currentY += dy * 0.12;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;

    // Put animation loop to sleep when mouse stops moving to conserve 100% CPU/battery!
    if (Math.abs(dx) < 0.25 && Math.abs(dy) < 0.25) {
      isMoving = false;
      return;
    }
    requestAnimationFrame(animateGlow);
  }
}

/* ==========================================================================
   2. Interactive Mouse Spotlight & 3D Perspective Tilt (RAF Throttled)
   ========================================================================== */
function initSpotlightEffect() {
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
    window.innerWidth < 768 ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  ) {
    return;
  }

  const cards = document.querySelectorAll('.glass-card');
  if (cards.length === 0) return;

  cards.forEach(card => {
    let ticking = false;

    card.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // 3D Perspective Tilt Physics
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) translateY(-4px)`;
        ticking = false;
      });
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.35s ease, box-shadow 0.35s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out, border-color 0.35s ease, box-shadow 0.35s ease';
    });
  });
}

/* ==========================================================================
   2b. Animated Stat Counters on Scroll
   ========================================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (counters.length === 0) return;

  let hasAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          let current = 0;
          const duration = 1400;
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = Math.max(1, Math.ceil(target / totalSteps));

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = current;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.25 });

  const metricsSection = document.getElementById('about');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   2c. Skill Bar Progress Fill Animation on Scroll
   ========================================================================== */
function initSkillProgress() {
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  const skillsSection = document.getElementById('skills');
  if (skillBars.length === 0 || !skillsSection) return;

  let filled = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !filled) {
        filled = true;
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-target-width') || '75';
          bar.style.width = `${targetWidth}%`;
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillsSection);
}

/* ==========================================================================
   3. Dynamic Hero Role Typing Animation
   ========================================================================== */
function initHeroTyping() {
  const typingEl = document.getElementById('typing-role');
  if (!typingEl) return;

  const roles = [
    'Full Stack Web Developer',
    'Python & Django Developer',
    'React.js & Tailwind Specialist',
    'Frontend & UI/UX Craftsman',
    'Backend & Database Architect'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 85;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350; // Pause before new phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   5. Sticky Navbar & Background Change on Scroll
   ========================================================================== */
function initStickyNavbar() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;

  let ticking = false;
  const handleNavScroll = () => {
    const isScrolled = window.scrollY > 25;
    if (isScrolled) {
      if (!navbar.classList.contains('glass-nav-scrolled')) {
        navbar.classList.add('glass-nav-scrolled');
      }
    } else {
      if (navbar.classList.contains('glass-nav-scrolled')) {
        navbar.classList.remove('glass-nav-scrolled');
      }
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  }, { passive: true });

  handleNavScroll();
}

/* ==========================================================================
   6. Mobile Menu Drawer & Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!toggleBtn || !mobileMenu) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (menuIcon && closeIcon) {
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
    } else {
      mobileMenu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (menuIcon && closeIcon) {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    }
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   7. Active Section Indicator (Scroll Spy)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (sections.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        updateActiveNav(currentId);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function updateActiveNav(id) {
    desktopLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === id) {
        link.classList.add('active');
        link.classList.add('text-indigo-300');
        link.classList.remove('text-slate-300');
      } else {
        link.classList.remove('active');
        link.classList.remove('text-indigo-300');
        link.classList.add('text-slate-300');
      }
    });

    mobileLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === id) {
        link.classList.add('bg-slate-800/80', 'text-indigo-300', 'font-semibold');
        link.classList.remove('text-slate-300');
      } else {
        link.classList.remove('bg-slate-800/80', 'text-indigo-300', 'font-semibold');
        link.classList.add('text-slate-300');
      }
    });
  }
}

/* ==========================================================================
   7b. Skill Category Filter Handler
   ========================================================================== */
function initSkillCategoryFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillGroups = document.querySelectorAll('.skill-group-section');

  if (!filterBtns.length || !skillGroups.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetFilter = btn.getAttribute('data-skill-filter');

      // Update active tab styles
      filterBtns.forEach(b => {
        b.classList.remove('btn-djangoblog', 'text-white', 'shadow-md', 'scale-105');
        b.classList.add('bg-slate-800/60', 'text-slate-400', 'hover:text-slate-200');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.remove('bg-slate-800/60', 'text-slate-400', 'hover:text-slate-200');
      btn.classList.add('btn-djangoblog', 'text-white', 'shadow-md', 'scale-105');
      btn.setAttribute('aria-selected', 'true');

      // Show/hide category sections smoothly
      skillGroups.forEach(group => {
        const cat = group.getAttribute('data-skill-category');
        if (targetFilter === 'all' || cat === targetFilter) {
          group.style.display = 'block';
          group.style.opacity = '1';
        } else {
          group.style.display = 'none';
          group.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Reveal on Scroll Animations
   ========================================================================== */
function initScrollAnimations() {
  const elementsToReveal = document.querySelectorAll('.reveal-init');
  if (elementsToReveal.length === 0) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  elementsToReveal.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   9. Real Projects Data featuring DjangoBlog (Live Vercel Project)
   ========================================================================== */
const projectsData = [
  {
    id: 'djangoblog-live',
    title: 'DjangoBlog — Full-Stack Publishing Platform',
    subtitle: 'Live Deployed Web Application at blogdb-phi.vercel.app with Auth & Engagement',
    category: 'fullstack',
    categoryName: 'Full Stack (Live)',
    badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/35',
    image: 'assets/images/project-djangoblog.png',
    description: 'A live, full-stack blogging web application deployed on Vercel. Engineered with Django and Python, featuring secure user authentication (signup, login, profile management), interactive post authoring, like reactions (❤️), comments (💬), author profiles, and a responsive reading feed.',
    features: [
      'Live in production on Vercel at https://blogdb-phi.vercel.app/',
      'Full authentication system: user registration, login, author profile management',
      'Interactive community engagement with real-time like counters and comment threads',
      'Responsive card-based reading feed displaying author initials avatar and publication dates',
      'Database-driven architecture supporting dynamic article publishing and user contributions'
    ],
    technologies: ['Django', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'Vercel Deployment', 'SQLite'],
    challenges: 'Configuring serverless Django deployment on Vercel while managing static file pipelines, database migrations, and responsive UI scaling.',
    solutions: 'Configured serverless WSGI entrypoints, optimized database queries, and implemented responsive flex/grid layouts with clean visual hierarchy.',
    demoUrl: 'https://blogdb-phi.vercel.app/',
    repoUrl: 'https://github.com/rhrafe78'
  },
  {
    id: 'student-quiz-system',
    title: 'Student Management System with Quiz Module',
    subtitle: 'Academic Platform with Countdown Timer & Auto-Scoring Engine',
    category: 'fullstack',
    categoryName: 'Full Stack',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/35',
    image: 'assets/images/project-student-quiz.png',
    description: 'An academic evaluation and student records management platform. Built using Django and Python with an interactive online quiz module featuring active countdown timers, instantaneous scoring algorithms, and role-based student and instructor dashboards.',
    features: [
      'Interactive online quiz module with active countdown timer and automatic question progression',
      'Instantaneous score calculation and results summary with detailed answer breakdown',
      'Full authentication system and secure role-based access for students and instructors',
      'Comprehensive CRUD functionality for managing student records, departments, and courses',
      'Database-driven architecture with normalized relational schemas'
    ],
    technologies: ['Django', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'Vercel Deployment', 'SQLite'],
    challenges: 'Synchronizing the frontend countdown timer with backend quiz submission state to prevent expired submissions and ensure score integrity.',
    solutions: 'Implemented client-side timestamp validation combined with server-side expiry verification in Django view controllers, guaranteeing tamper-proof automatic submission when the timer reaches zero.',
    demoUrl: 'https://liquidtripler.vercel.app/register/',
    repoUrl: 'https://github.com/rhrafe78'
  },
  {
    id: 'hospital-management-system',
    title: 'Hospital Management System (MediCare Portal)',
    subtitle: 'Live Deployed Healthcare Platform with Doctor Scheduling & Patient REST APIs',
    category: 'fullstack',
    categoryName: 'Full Stack (Live)',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/35',
    image: 'assets/images/project-hospital.png',
    description: 'An enterprise healthcare management system built with Django and REST APIs. Features outpatient appointment scheduling, doctor availability calendars, electronic patient records, role-based access for medical staff, and normalized relational schemas.',
    features: [
      'Interactive appointment booking engine with doctor schedule conflict prevention',
      'Secure role-based authentication separating doctors, receptionists, and patients',
      'Electronic patient records management with diagnosis and prescription history',
      'RESTful API endpoints engineered for medical telemetry and patient search',
      'Normalized relational database architecture with PostgreSQL / SQLite support'
    ],
    technologies: ['Django', 'Python', 'Django REST Framework', 'JavaScript', 'HTML5/CSS3', 'Vercel Deployment', 'PostgreSQL / SQLite'],
    challenges: 'Designing a concurrency-safe appointment scheduling engine that prevents double-booking when multiple patients request the same doctor slot simultaneously.',
    solutions: 'Implemented database transactions with select_for_update locking in Django ORM, coupled with client-side real-time slot status validation.',
    demoUrl: 'https://hospital-management-services-rif8.vercel.app/',
    repoUrl: 'https://github.com/rhrafe78/Hospital-Management-System'
  },
  {
    id: 'aether-shopping-cart',
    title: 'Aether — Cyberpunk E-Commerce & Shopping Cart',
    subtitle: 'Live Deployed React Application at aether-shopping-cart-ten.vercel.app',
    category: 'frontend',
    categoryName: 'Frontend (React & Live)',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/35',
    image: 'assets/images/project-aether.png',
    description: 'A premium, modern cyberpunk-themed e-commerce and shopping cart web application deployed on Vercel. Engineered with React 18, ES Modules, and Tailwind CSS. Features category filtering (Electronics, Apparel, Accessories, Home), real-time cart state, dynamic quantity updates, tactile Add-to-Cart interactions, and a seamless slide-out cart drawer.',
    features: [
      'Live in production on Vercel at https://aether-shopping-cart-ten.vercel.app/',
      'Engineered with modern React 18 component hierarchy and native ES Modules',
      'Interactive category filtering across high-fidelity tech, apparel, and lifestyle gadgets',
      'Persistent shopping cart with dynamic item quantity controls and instantaneous total calculation',
      'Sleek dark-mode aesthetic with neon glowing accents and micro-interactions'
    ],
    technologies: ['React 18', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5', 'Lucide Icons', 'Vercel Deployment'],
    challenges: 'Designing a lightweight, high-performance shopping cart state manager in React with smooth animations, ensuring immediate cart drawer updates without layout shift.',
    solutions: 'Built with optimized React state hooks, modular component structure, and responsive flex/grid layouts with fluid cart drawer transitions.',
    demoUrl: 'https://aether-shopping-cart-ten.vercel.app/',
    repoUrl: 'https://github.com/rhrafe78'
  }
];

function initProjectFilterAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  let lastActiveElement = null;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('btn-djangoblog', 'text-white', 'shadow-lg', 'scale-105');
        b.classList.add('bg-slate-800/60', 'text-slate-400', 'hover:text-slate-200');
      });
      btn.classList.remove('bg-slate-800/60', 'text-slate-400', 'hover:text-slate-200');
      btn.classList.add('btn-djangoblog', 'text-white', 'shadow-lg', 'scale-105');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filter === 'all' || cardCategory === filter) {
          card.classList.remove('filter-hidden');
          card.classList.add('filter-show');
        } else {
          card.classList.remove('filter-show');
          card.classList.add('filter-hidden');
        }
      });
    });
  });

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = btn.getAttribute('data-project-id');
      const project = projectsData.find(p => p.id === projectId);
      if (project) {
        lastActiveElement = btn;
        openModal(project);
      }
    });
  });

  function openModal(project) {
    if (!modal) return;

    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-subtitle').textContent = project.subtitle;
    
    const categoryBadge = document.getElementById('modal-category');
    categoryBadge.textContent = project.categoryName;
    categoryBadge.className = `px-3 py-1 rounded-full text-xs font-medium border ${project.badgeClass}`;

    const modalImage = document.getElementById('modal-image');
    modalImage.src = project.image;
    modalImage.alt = `${project.title} Preview`;

    document.getElementById('modal-description').textContent = project.description;

    const featuresList = document.getElementById('modal-features');
    featuresList.innerHTML = '';
    project.features.forEach(feat => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2.5 text-slate-300 text-sm';
      li.innerHTML = `
        <span class="text-indigo-400 mt-0.5 shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </span>
        <span>${feat}</span>
      `;
      featuresList.appendChild(li);
    });

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'px-3 py-1 bg-slate-800 text-indigo-300 border border-slate-700/60 rounded-lg text-xs font-mono-code font-medium';
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    document.getElementById('modal-challenges').textContent = project.challenges;
    document.getElementById('modal-solutions').textContent = project.solutions;

    const demoLink = document.getElementById('modal-demo-link');
    const repoLink = document.getElementById('modal-repo-link');
    demoLink.href = project.demoUrl;
    repoLink.href = project.repoUrl;

    modal.classList.remove('modal-closed');
    modal.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (modalCloseBtn) modalCloseBtn.focus();
    }, 100);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('modal-open');
    modal.classList.add('modal-closed');
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('modal-open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   10. Contact Form Client-side Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('contact-submit-btn');
  const formStatus = document.getElementById('form-status');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const clearErrorOnInput = (input, errorEl) => {
    input.addEventListener('input', () => {
      if (input.classList.contains('input-error')) {
        input.classList.remove('input-error');
        errorEl.classList.add('hidden');
        errorEl.textContent = '';
      }
    });
  };

  clearErrorOnInput(nameInput, nameError);
  clearErrorOnInput(emailInput, emailError);
  clearErrorOnInput(subjectInput, subjectError);
  clearErrorOnInput(messageInput, messageError);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    formStatus.classList.add('hidden');

    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      setError(nameInput, nameError, 'Please enter your name.');
      isValid = false;
    } else if (nameVal.length < 2) {
      setError(nameInput, nameError, 'Name must be at least 2 characters.');
      isValid = false;
    } else {
      setSuccess(nameInput, nameError);
    }

    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      setError(emailInput, emailError, 'Please enter your email address.');
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      setError(emailInput, emailError, 'Please provide a valid email format (e.g. name@domain.com).');
      isValid = false;
    } else {
      setSuccess(emailInput, emailError);
    }

    const subjectVal = subjectInput.value.trim();
    if (!subjectVal) {
      setError(subjectInput, subjectError, 'Please enter a message subject.');
      isValid = false;
    } else if (subjectVal.length < 3) {
      setError(subjectInput, subjectError, 'Subject must be at least 3 characters.');
      isValid = false;
    } else {
      setSuccess(subjectInput, subjectError);
    }

    const messageVal = messageInput.value.trim();
    if (!messageVal) {
      setError(messageInput, messageError, 'Please write your message.');
      isValid = false;
    } else if (messageVal.length < 15) {
      setError(messageInput, messageError, 'Message should be at least 15 characters to explain your inquiry.');
      isValid = false;
    } else {
      setSuccess(messageInput, messageError);
    }

    if (!isValid) {
      const firstInvalid = form.querySelector('.input-error');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending to rafe734422@gmail.com...
    `;

    fetch('https://formsubmit.co/ajax/rafe734422@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: nameVal,
        email: emailVal,
        subject: subjectVal,
        message: messageVal,
        _subject: `Portfolio Contact: ${subjectVal} (from ${nameVal})`,
        _template: 'table',
        _captcha: 'false'
      })
    })
    .then(async (response) => {
      let result = {};
      try {
        result = await response.json();
      } catch (err) {}

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;

      if (response.ok && (result.success === 'true' || result.success === true)) {
        formStatus.innerHTML = `
          <div class="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 flex items-start gap-3 shadow-lg shadow-emerald-500/10">
            <svg class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div>
              <h5 class="font-semibold text-emerald-100">Message Delivered Successfully!</h5>
              <p class="text-xs text-emerald-200/90 mt-1">Thank you, <span class="font-semibold text-white">${escapeHtml(nameVal)}</span>. Your message has been sent directly to <strong class="text-white">rafe734422@gmail.com</strong>. I will reply to you as soon as possible.</p>
            </div>
          </div>
        `;
        formStatus.classList.remove('hidden');
        form.reset();
        [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
          inp.classList.remove('input-success');
        });
        showToast('Message sent to rafe734422@gmail.com!');
      } else if (result.message && result.message.toLowerCase().includes('activation')) {
        formStatus.innerHTML = `
          <div class="p-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 flex items-start gap-3 shadow-lg">
            <svg class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div>
              <h5 class="font-semibold text-amber-100">One-Time Activation Required</h5>
              <p class="text-xs text-amber-200/90 mt-1">FormSubmit has sent a confirmation email to <strong>rafe734422@gmail.com</strong>. Please check your inbox and click <em>'Activate Form'</em> once to receive all future messages directly.</p>
              <a href="mailto:rafe734422@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent('From: ' + nameVal + ' (' + emailVal + ')\n\n' + messageVal)}" class="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white transition-colors">
                <span>Send via Gmail App Now</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
            </div>
          </div>
        `;
        formStatus.classList.remove('hidden');
      } else {
        formStatus.innerHTML = `
          <div class="p-4 rounded-xl bg-indigo-500/15 border border-indigo-500/40 text-indigo-200 flex items-start gap-3 shadow-lg">
            <svg class="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h5 class="font-semibold text-indigo-100">Direct Email Dispatch</h5>
              <p class="text-xs text-indigo-200/90 mt-1">Your message is ready. Click below to dispatch directly to <strong class="text-white">rafe734422@gmail.com</strong> via your email app:</p>
              <a href="mailto:rafe734422@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent('From: ' + nameVal + ' (' + emailVal + ')\n\n' + messageVal)}" class="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md">
                <span>Open Gmail / Mail Client</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
            </div>
          </div>
        `;
        formStatus.classList.remove('hidden');
      }
    })
    .catch(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      formStatus.innerHTML = `
        <div class="p-4 rounded-xl bg-indigo-500/15 border border-indigo-500/40 text-indigo-200 flex items-start gap-3 shadow-lg">
          <div>
            <h5 class="font-semibold text-indigo-100">Send via Direct Mail</h5>
            <p class="text-xs text-indigo-200/90 mt-1">Click below to send your message directly to <strong class="text-white">rafe734422@gmail.com</strong>:</p>
            <a href="mailto:rafe734422@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent('From: ' + nameVal + ' (' + emailVal + ')\n\n' + messageVal)}" class="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md">
              <span>Send via Gmail / Email App</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      `;
      formStatus.classList.remove('hidden');
    });
  });

  function setError(input, errorEl, message) {
    input.classList.add('input-error');
    input.classList.remove('input-success');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }

  function setSuccess(input, errorEl) {
    input.classList.remove('input-error');
    input.classList.add('input-success');
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

/* ==========================================================================
   11. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   12. CV Download Feedback Toast
   ========================================================================== */
function initCvDownload() {
  const downloadBtns = document.querySelectorAll('.cv-download-btn');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Downloading Ridwoanul Haque Rafe CV (PDF)...');
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('toast-show');

  setTimeout(() => {
    toast.classList.remove('toast-show');
  }, 4000);
}

/* ==========================================================================
   13. Dark / Light Theme Toggle System
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileQuickThemeBtn = document.getElementById('mobile-quick-theme-btn');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
  const mobileThemeText = document.getElementById('mobile-theme-text');

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  function applyTheme(theme, showFeedback = false) {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
      if (mobileThemeText) mobileThemeText.textContent = 'Switch to Dark Mode';
      if (showFeedback) showToast('Light mode activated');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
      if (mobileThemeText) mobileThemeText.textContent = 'Switch to Light Mode';
      if (showFeedback) showToast('Dark mode activated');
    }
  }

  // Initial application
  applyTheme(savedTheme, false);

  function toggleTheme() {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    applyTheme(newTheme, true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (mobileQuickThemeBtn) {
    mobileQuickThemeBtn.addEventListener('click', toggleTheme);
  }

  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }
}

/* ==========================================================================
   14. Live GitHub Activity & Repositories Showcase (Cached & Fast)
   ========================================================================== */
function initGitHubStats() {
  const username = 'rhrafe78';
  const reposContainer = document.getElementById('github-repos-container');
  const publicReposCount = document.getElementById('gh-public-repos');
  const ghAvatar = document.getElementById('gh-avatar');

  // Language color map for visual clarity
  const langColors = {
    'Python': '#3572A5',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'C++': '#f34b7d',
    'C': '#555555',
    'Shell': '#89e051'
  };

  function sanitize(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function renderData(user, repos) {
    if (user) {
      if (publicReposCount && typeof user.public_repos === 'number') {
        publicReposCount.textContent = user.public_repos;
      }
      if (ghAvatar && user.avatar_url) {
        ghAvatar.src = user.avatar_url;
      }
    }

    if (Array.isArray(repos) && repos.length > 0 && reposContainer) {
      // Filter out assignments and task management repos, and prioritize Student_Management_Service as #1
      const excludedRepos = ['module29_assignment', 'task_management', 'task-management', 'taskflow'];
      let filteredRepos = repos.filter(repo => !excludedRepos.includes(repo.name.toLowerCase()));
      
      const studentIdx = filteredRepos.findIndex(repo => repo.name.toLowerCase() === 'student_management_service');
      if (studentIdx > -1) {
        const [studentRepo] = filteredRepos.splice(studentIdx, 1);
        filteredRepos.unshift(studentRepo);
      }

      // Exactly 5 repositories displayed
      const displayRepos = filteredRepos.slice(0, 5);

      reposContainer.innerHTML = displayRepos.map(repo => {
        const lang = repo.language || 'Python';
        const color = langColors[lang] || '#6366f1';
        const description = repo.description 
          ? sanitize(repo.description) 
          : 'Full-stack application built with clean architecture, modern APIs, and robust database models.';
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;

        return `
          <div class="glass-card github-card rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between hover:border-cyan-500/40 transition-all reveal-init opacity-100">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <i data-lucide="book-marked" class="w-5 h-5"></i>
                </div>
                <div class="flex items-center gap-2">
                  ${stars > 0 ? `
                    <span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                      <i data-lucide="star" class="w-3 h-3"></i> ${stars}
                    </span>
                  ` : ''}
                  ${forks > 0 ? `
                    <span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      <i data-lucide="git-fork" class="w-3 h-3"></i> ${forks}
                    </span>
                  ` : ''}
                  <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Public</span>
                </div>
              </div>
              <h4 class="text-lg font-bold text-white mb-2 break-all">${sanitize(repo.name)}</h4>
              <p class="text-slate-400 text-sm line-clamp-2 leading-relaxed">${description}</p>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span class="flex items-center gap-1.5 font-medium">
                <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${color};"></span>
                ${sanitize(lang)}
              </span>
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-white inline-flex items-center gap-1 transition-colors font-medium">
                <span>View Repo</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        `;
      }).join('');

      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
      initSpotlightEffect();
    }
  }

  // Check 15-minute session cache to eliminate redundant network traffic
  const CACHE_KEY = `gh_cache_v4_${username}`;
  const CACHE_TIME_KEY = `gh_time_v4_${username}`;
  const CACHE_TTL = 15 * 60 * 1000;

  try {
    const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    if (cachedTime && cachedData && (Date.now() - parseInt(cachedTime, 10) < CACHE_TTL)) {
      const parsed = JSON.parse(cachedData);
      renderData(parsed.user, parsed.repos);
      return;
    }
  } catch (e) {}

  // Fetch parallelized requests with fallback resilience
  Promise.all([
    fetch(`https://api.github.com/users/${username}`).then(r => r.ok ? r.json() : null).catch(() => null),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`).then(r => r.ok ? r.json() : null).catch(() => null)
  ]).then(([user, repos]) => {
    if (user || repos) {
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ user, repos }));
        sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
      } catch (e) {}
    }
    renderData(user, repos);
  }).catch(err => {
    console.warn('GitHub API fallback:', err);
  });
}

