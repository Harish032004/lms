// ===== FOOTER PREMIUM - INTERACTIONS =====
(function() {
  'use strict';
  
  const footer = document.querySelector('.footer-premium');
  const socialLinks = document.querySelectorAll('.social-link');
  const footerLinks = document.querySelectorAll('.footer-link, .bottom-link');
  const contactItems = document.querySelectorAll('.contact-item');
  
  // Current year for copyright
  const copyrightElement = document.querySelector('.copyright');
  if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.textContent = `© ${currentYear} Pedodontic Practice. All rights reserved.`;
  }
  
  // Social link hover effect with glow
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-5px) scale(1.1)';
      link.style.boxShadow = '0 15px 25px -8px var(--accent)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
      link.style.boxShadow = '';
    });
  });
  
  // Footer link click tracking (optional)
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // e.preventDefault(); // Uncomment if you want to prevent navigation
      console.log('Footer link clicked:', link.textContent.trim());
      
      // Add subtle active state
      link.style.transform = 'scale(0.95)';
      setTimeout(() => {
        link.style.transform = '';
      }, 200);
    });
  });
  
  // Contact item hover enhancement
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const icon = item.querySelector('svg');
      if (icon) {
        icon.style.transform = 'scale(1.2)';
        icon.style.filter = 'drop-shadow(0 0 8px var(--accent))';
      }
    });
    
    item.addEventListener('mouseleave', () => {
      const icon = item.querySelector('svg');
      if (icon) {
        icon.style.transform = '';
        icon.style.filter = '';
      }
    });
  });
  
  // Intersection Observer for fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('footer-visible');
        
        // Stagger animation for columns
        const columns = document.querySelectorAll('.footer-col');
        columns.forEach((col, index) => {
          col.style.opacity = '0';
          col.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            col.style.transition = 'all 0.5s ease';
            col.style.opacity = '1';
            col.style.transform = 'translateY(0)';
          }, 100 * index);
        });
      }
    });
  }, { threshold: 0.1 });
  
  if (footer) {
    observer.observe(footer);
  }
  
  // Smooth scroll to top when clicking logo (optional)
  const logoWrapper = document.querySelector('.footer-logo-wrapper');
  if (logoWrapper) {
    logoWrapper.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Add ripple effect to social links on click
  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Create ripple
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'rippleEffect 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
      link.style.position = 'relative';
      link.style.overflow = 'hidden';
      link.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // Open in new tab (simulate)
      setTimeout(() => {
        window.open('#', '_blank');
      }, 300);
    });
  });
  
  // Add ripple animation style
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(20);
        opacity: 0;
      }
    }
    
    .footer-col {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s ease;
    }
    
    .footer-visible .footer-col {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // Preconnect for external fonts if needed
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = 'https://fonts.googleapis.com';
  document.head.appendChild(preconnect);
  
  // Handle window resize for responsive adjustments
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Adjust any dynamic elements if needed
      if (window.innerWidth <= 480) {
        // Mobile specific adjustments
      }
    }, 250);
  });
  
  // Initialize
  window.addEventListener('load', () => {
    if (footer && footer.getBoundingClientRect().top < window.innerHeight) {
      footer.classList.add('footer-visible');
      
      const columns = document.querySelectorAll('.footer-col');
      columns.forEach((col, index) => {
        setTimeout(() => {
          col.style.opacity = '1';
          col.style.transform = 'translateY(0)';
        }, 100 * index);
      });
    }
  });
})();