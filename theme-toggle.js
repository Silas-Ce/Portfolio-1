// Theme Management System
class ThemeManager {
  constructor() {
    this.themes = ['dark', 'light', 'custom-light'];
    this.currentThemeIndex = 0;
    this.init();
  }

  init() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('dark'); // Default theme
    }

    // Create and append theme toggle button
    this.createThemeToggle();
    
    // Add scroll spy functionality
    this.initScrollSpy();
    
    // Add current page indication
    this.setCurrentPageActive();
    
    // Add scroll animations
    this.initScrollAnimations();
  }

  createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');
    toggle.innerHTML = `
      <i class="fas fa-palette"></i>
      <span class="theme-text">Theme</span>
    `;
    
    toggle.addEventListener('click', () => this.cycleTheme());
    document.body.appendChild(toggle);
  }

  cycleTheme() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
    const newTheme = this.themes[this.currentThemeIndex];
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('light-mode', 'custom-light-mode');
    
    // Add appropriate theme class
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else if (theme === 'custom-light') {
      document.body.classList.add('custom-light-mode');
    }
    
    // Update current theme index
    this.currentThemeIndex = this.themes.indexOf(theme);
    
    // Save to localStorage
    localStorage.setItem('preferredTheme', theme);
    
    // Update toggle button text
    this.updateToggleText(theme);
    
    // Dispatch custom event for other scripts
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  updateToggleText(theme) {
    const toggle = document.querySelector('.theme-toggle');
    const textSpan = toggle.querySelector('.theme-text');
    const icon = toggle.querySelector('i');
    
    const themeLabels = {
      'dark': 'Dark',
      'light': 'Light', 
      'custom-light': 'Custom'
    };
    
    const themeIcons = {
      'dark': 'fa-moon',
      'light': 'fa-sun',
      'custom-light': 'fa-palette'
    };
    
    textSpan.textContent = themeLabels[theme];
    icon.className = `fas ${themeIcons[theme]}`;
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = entry.target.getAttribute('id');
          this.updateActiveNavLink(targetId);
        }
      });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
  }

  updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    navLinks.forEach(link => {
      link.classList.remove('scroll-active');
      
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('scroll-active');
      }
    });
  }

  setCurrentPageActive() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Check if this is the current page
      if (href === currentPage || 
          (currentPage === 'index.html' && href === 'index.html') ||
          (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
        // Add a subtle animation to the active link
        link.style.animation = 'pulse 2s ease-in-out infinite';
      } else {
        link.classList.remove('active');
        link.style.animation = '';
      }
    });
  }

  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.card, .section h2, .section p').forEach(el => {
      observer.observe(el);
    });
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Enhanced navbar functionality
function initNavbar() {
  const toggle = document.querySelector('.navbar-toggle');
  const links = document.querySelector('.navbar-links');
  
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('active');
      const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
      toggle.setAttribute('aria-expanded', !expanded);
    });
  }
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        links.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && links.classList.contains('active')) {
      links.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Enhanced contact form functionality
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const messageDiv = document.getElementById('formMessage');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Show loading message
    if (messageDiv) {
      messageDiv.textContent = 'Sending message...';
      messageDiv.className = 'message info';
    }
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success state
      if (messageDiv) {
        messageDiv.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        messageDiv.className = 'message success';
      }
      
      form.reset();
      
    } catch (error) {
      // Error state
      if (messageDiv) {
        messageDiv.textContent = 'Failed to send message. Please try again.';
        messageDiv.className = 'message error';
      }
    } finally {
      // Remove loading state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  // Remove existing error styling
  field.classList.remove('error');
  
  // Validate based on field type
  let isValid = true;
  let errorMessage = '';
  
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  } else if (field.type === 'email' && value && !isValidEmail(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid email address';
  }
  
  if (!isValid) {
    field.classList.add('error');
    showFieldError(field, errorMessage);
  }
}

function clearFieldError(e) {
  const field = e.target;
  field.classList.remove('error');
  
  // Remove error message if it exists
  const errorMsg = field.parentNode.querySelector('.field-error');
  if (errorMsg) {
    errorMsg.remove();
  }
}

function showFieldError(field, message) {
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Create new error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: var(--accent-error);
    font-size: var(--font-size-sm);
    margin-top: var(--space-1);
    display: block;
  `;
  
  field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Animation on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.card, .section > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Performance optimization: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme manager
  window.themeManager = new ThemeManager();
  
  // Initialize other functionality
  initSmoothScrolling();
  initNavbar();
  initContactForm();
  initScrollAnimations();
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + T to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
      e.preventDefault();
      window.themeManager.cycleTheme();
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    const links = document.querySelector('.navbar-links');
    const toggle = document.querySelector('.navbar-toggle');
    if (window.innerWidth > 900 && links.classList.contains('active')) {
      links.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }, 250));
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ThemeManager };
}
