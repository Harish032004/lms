// Professional navbar with fixed mobile functionality
(function() {
  // DOM Elements
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileClose');
  const coursesToggle = document.getElementById('coursesToggle');
  const mobileSubmenu = document.getElementById('mobileSubmenu');
  const themeToggle = document.getElementById('themeToggleBtn');
  const themePanel = document.getElementById('themePanel');
  const closePanel = document.getElementById('closePanel');
  const themeOptions = document.querySelectorAll('.theme-option');
  const body = document.body;

  // Toggle Mobile Menu
  function toggleMobileMenu(show) {
    if (show) {
      mobileMenu.classList.add('active');
      mobileOverlay.classList.add('active');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('active');
      mobileOverlay.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
      
      // Close submenu when closing main menu
      if (coursesToggle) {
        coursesToggle.classList.remove('active');
        coursesToggle.innerHTML = '+';
      }
      if (mobileSubmenu) {
        mobileSubmenu.classList.remove('active');
      }
    }
  }

  // Hamburger click
  if (hamburger && mobileMenu && mobileOverlay) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = mobileMenu.classList.contains('active');
      toggleMobileMenu(!isActive);
    });
  }

  // Close button click
  if (mobileClose) {
    mobileClose.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  }

  // Overlay click
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  }

  // Courses accordion
  if (coursesToggle && mobileSubmenu) {
    coursesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      coursesToggle.classList.toggle('active');
      mobileSubmenu.classList.toggle('active');
      
      // Change + to ×
      coursesToggle.innerHTML = coursesToggle.classList.contains('active') ? '✕' : '+';
    });
  }

  // Theme panel toggle
  if (themeToggle && themePanel) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      themePanel.classList.toggle('active');
    });

    if (closePanel) {
      closePanel.addEventListener('click', () => {
        themePanel.classList.remove('active');
      });
    }

    document.addEventListener('click', (e) => {
      if (themePanel.classList.contains('active') &&
          !themePanel.contains(e.target) &&
          !themeToggle.contains(e.target)) {
        themePanel.classList.remove('active');
      }
    });
  }

  // Theme switching with COLORFUL variations
  function applyTheme(themeName) {
    body.className = '';
    body.classList.add(themeName);

    const themes = {
      theme1: '#5A3E98',
      theme2: '#2C5F2D',
      theme3: '#9B4F96',
      theme4: '#1B5E6B',
      theme5: '#FF6B35'
    };

    document.documentElement.style.setProperty('--primary', themes[themeName] || themes.theme1);
    
    // Update floating button background
    if (themeToggle) {
      themeToggle.style.backgroundColor = themes[themeName] || themes.theme1;
    }

    localStorage.setItem('preferredTheme', themeName);
  }

  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      if (theme) {
        applyTheme(theme);
        themePanel.classList.remove('active');
      }
    });
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('preferredTheme');
  if (savedTheme && savedTheme.match(/theme[1-5]/)) {
    applyTheme(savedTheme);
  } else {
    applyTheme('theme1');
  }

  // Active link handling
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Close mobile menu when link clicked
      if (this.closest('.mobile-nav-link') && mobileMenu.classList.contains('active')) {
        toggleMobileMenu(false);
      }
    });
  });

  // Mega menu prevent close
  document.querySelectorAll('.mega-menu').forEach(menu => {
    menu.addEventListener('click', (e) => e.stopPropagation());
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
      toggleMobileMenu(false);
    }
  });

  // Prevent body scroll on mobile menu open
  window.addEventListener('touchmove', (e) => {
    if (mobileMenu.classList.contains('active')) {
      e.preventDefault();
    }
  }, { passive: false });
})();


// ===== COMPLETE NAVIGATION FIX - FINAL WORKING SOLUTION =====
(function() {
  'use strict';
  
  // 1. FIRST: Remove ALL existing event listeners that might be blocking
  // Clone and replace all nav links to wipe out old event handlers
  
  const navLinks = document.querySelectorAll('.nav-item > .nav-link');
  
  navLinks.forEach(link => {
    // Create a clone of the link (which removes all event listeners)
    const newLink = link.cloneNode(true);
    
    // Copy over any attributes that might have been missed
    const href = link.getAttribute('href');
    if (href) newLink.setAttribute('href', href);
    
    // Replace the old link with the new clone
    link.parentNode.replaceChild(newLink, link);
  });
  
  // 2. SECOND: Ensure all main nav links have correct hrefs
  const homeLink = document.querySelector('.nav-link[href="index.html"], .nav-link:contains("Home")');
  const aboutLink = document.querySelector('.nav-link[href="about.html"], .nav-link:contains("About Us")');
  const blogLink = document.querySelector('.nav-link[href="blog.html"], .nav-link:contains("Blog")');
  const contactLink = document.querySelector('.nav-link[href="contactsep.html"], .nav-link:contains("Contact Us")');
  
  // Fix by text content if needed
  document.querySelectorAll('.nav-link').forEach(link => {
    const text = link.textContent.trim();
    
    if (text === 'Home') link.setAttribute('href', 'index.html');
    else if (text === 'About Us') link.setAttribute('href', 'about.html');
    else if (text === 'Blog') link.setAttribute('href', 'blog.html');
    else if (text === 'Contact Us') link.setAttribute('href', 'contactsep.html');
  });
  
  // 3. THIRD: Simple click handler that lets browser navigate normally
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // If href is valid, do NOTHING - let browser handle it
      if (href && href !== '#' && href !== '') {
        // IMPORTANT: Do NOT call e.preventDefault()
        // Do NOT return false
        // Let the browser navigate naturally
        console.log('Navigating to:', href);
        return true;
      }
    });
  });
  
  // 4. FOURTH: Remove any CSS that might be blocking clicks
  const style = document.createElement('style');
  style.textContent = `
    .nav-item,
    .nav-link,
    .nav-menu {
      pointer-events: auto !important;
      cursor: pointer !important;
      z-index: auto !important;
    }
    
    .nav-link {
      position: relative;
      z-index: 10;
    }
    
    /* Ensure mega menu doesn't block clicks on main links */
    .mega-menu {
      pointer-events: none;
    }
    
    .mega-menu a {
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);
  
  // 5. FIFTH: Log all links to verify
  console.log('=== NAVIGATION LINKS FIXED ===');
  document.querySelectorAll('.nav-link').forEach(link => {
    console.log(`${link.textContent.trim()}: ${link.getAttribute('href')}`);
  });
  
})();

// ===== COMPLETE MOBILE NAVIGATION FIX =====
(function() {
  'use strict';
  
  // FIX 1: Ensure all mobile links have correct hrefs
  function fixMobileLinks() {
    const mobileLinks = [
      { selector: 'a[href="index.html"]', text: 'Home', correct: 'index.html' },
      { selector: 'a[href="about.html"]', text: 'About Us', correct: 'about.html' },
      { selector: 'a[href="blog.html"]', text: 'Blog', correct: 'blog.html' },
      { selector: 'a[href="contactsep.html"]', text: 'Contact Us', correct: 'contactsep.html' }
    ];
    
    // Fix by selector first
    mobileLinks.forEach(item => {
      const links = document.querySelectorAll(item.selector);
      links.forEach(link => {
        link.setAttribute('href', item.correct);
        console.log(`Fixed ${item.text} link: ${item.correct}`);
      });
    });
    
    // Fix by text content
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      const text = link.textContent.trim();
      if (text === 'Home') link.setAttribute('href', 'index.html');
      else if (text === 'About Us') link.setAttribute('href', 'about.html');
      else if (text === 'Blog') link.setAttribute('href', 'blog.html');
      else if (text === 'Contact Us') link.setAttribute('href', 'contactsep.html');
    });
    
    // Fix submenu course links
    const courseLinks = [
      { selector: 'a[href="course1.html"]', correct: 'course1.html' },
      { selector: 'a[href="course2.html"]', correct: 'course2.html' },
      { selector: 'a[href="course3.html"]', correct: 'course3.html' },
      { selector: 'a[href="course4.html"]', correct: 'course4.html' },
      { selector: 'a[href="course5.html"]', correct: 'course5.html' },
      { selector: 'a[href="course6.html"]', correct: 'course6.html' }
    ];
    
    courseLinks.forEach(item => {
      const links = document.querySelectorAll(item.selector);
      links.forEach(link => {
        link.setAttribute('href', item.correct);
      });
    });
  }
  
  // FIX 2: Direct click handler that forces navigation
  function setupNavigation() {
    // Remove all existing click handlers by cloning
    const allLinks = document.querySelectorAll('.mobile-nav-link, .mobile-submenu a');
    
    allLinks.forEach(link => {
      // Store href before cloning
      const href = link.getAttribute('href');
      
      // Create new link
      const newLink = document.createElement('a');
      newLink.className = link.className;
      newLink.setAttribute('href', href || '#');
      newLink.innerHTML = link.innerHTML;
      
      // Replace old link
      link.parentNode.replaceChild(newLink, link);
    });
    
    // Add fresh click handler to all links
    document.querySelectorAll('.mobile-nav-link, .mobile-submenu a').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href && href !== '#' && href !== '') {
          e.preventDefault(); // Stop any other handlers
          window.location.href = href; // Force navigation
          console.log('Navigating to:', href);
          return false;
        }
      });
    });
  }
  
  // FIX 3: Submenu toggle fix
  function fixSubmenuToggle() {
    const toggleBtn = document.getElementById('coursesToggle');
    const submenu = document.getElementById('mobileSubmenu');
    const coursesLink = document.querySelector('.mobile-link-wrapper .mobile-nav-link');
    
    if (toggleBtn && submenu) {
      // Remove existing handlers
      const newToggle = toggleBtn.cloneNode(true);
      toggleBtn.parentNode.replaceChild(newToggle, toggleBtn);
      
      // Add new handler
      newToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const icon = this.querySelector('span');
        submenu.classList.toggle('active');
        
        if (submenu.classList.contains('active')) {
          icon.textContent = '−';
          submenu.style.display = 'block';
        } else {
          icon.textContent = '+';
          submenu.style.display = 'none';
        }
      });
    }
    
    // Fix courses parent link - should not navigate, just open submenu
    if (coursesLink) {
      coursesLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Optionally toggle submenu here too
        if (toggleBtn) toggleBtn.click();
      });
    }
  }
  
  // FIX 4: Mobile menu close button fix
  function fixMobileMenuControls() {
    const closeBtn = document.getElementById('mobileClose');
    const overlay = document.getElementById('mobileOverlay');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.menu-toggle'); // Assuming you have a menu toggle button
    
    if (closeBtn) {
      const newClose = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newClose, closeBtn);
      
      newClose.addEventListener('click', function() {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    if (overlay) {
      const newOverlay = overlay.cloneNode(true);
      overlay.parentNode.replaceChild(newOverlay, overlay);
      
      newOverlay.addEventListener('click', function() {
        if (mobileMenu) mobileMenu.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    if (menuToggle) {
      const newToggle = menuToggle.cloneNode(true);
      menuToggle.parentNode.replaceChild(newToggle, menuToggle);
      
      newToggle.addEventListener('click', function() {
        if (mobileMenu) mobileMenu.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  }
  
  // FIX 5: CSS fixes
  function addCSSFixes() {
    const style = document.createElement('style');
    style.textContent = `
      .mobile-nav-link, .mobile-submenu a {
        cursor: pointer !important;
        pointer-events: auto !important;
        z-index: 10000 !important;
        position: relative;
      }
      
      .mobile-menu {
        z-index: 9999;
      }
      
      .mobile-submenu {
        display: none;
        padding-left: 20px;
      }
      
      .mobile-submenu.active {
        display: block;
      }
      
      .mobile-link-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      
      .submenu-toggle {
        background: none;
        border: 1px solid var(--primary);
        border-radius: 50%;
        width: 32px;
        height: 32px;
        cursor: pointer;
        color: var(--primary);
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .submenu-toggle:hover {
        background: var(--accent);
        color: white;
        border-color: var(--accent);
      }
      
      .mobile-overlay.active {
        display: block;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Initialize all fixes
  function init() {
    fixMobileLinks();
    setupNavigation();
    fixSubmenuToggle();
    fixMobileMenuControls();
    addCSSFixes();
    
    console.log('Mobile navigation fixed!');
  }
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();







