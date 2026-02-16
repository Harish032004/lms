// ===== FINAL ABOUT SECTION - RELIABLE ANIMATIONS =====
(function() {
  'use strict';
  
  // DOM Elements
  const section = document.querySelector('.about-pedodontics-final');
  const statItems = document.querySelectorAll('.stat-final-item');
  const progressBars = document.querySelectorAll('.progress-final-bar');
  const valueElements = document.querySelectorAll('.stat-final-value');
  
  // State
  let animationStarted = false;
  let countedStats = new Set();
  
  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationStarted) {
        animationStarted = true;
        
        // Start animations
        setTimeout(() => {
          startAllCounters();
          animateProgressBars();
        }, 300);
      }
    });
  }, { threshold: 0.2 });
  
  if (section) {
    observer.observe(section);
  }
  
  // Counter animation
  function startAllCounters() {
    statItems.forEach((item, index) => {
      if (countedStats.has(item)) return;
      
      const target = parseInt(item.dataset.target, 10);
      const valueElement = item.querySelector('.stat-final-value');
      if (!valueElement) return;
      
      countedStats.add(item);
      
      setTimeout(() => {
        animateCounter(valueElement, target, 2000);
      }, index * 150);
    });
  }
  
  function animateCounter(element, target, duration) {
    let startTimestamp = null;
    
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(eased * target);
      
      element.textContent = currentValue;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    }
    
    window.requestAnimationFrame(step);
  }
  
  // Progress bar animation
  function animateProgressBars() {
    progressBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.width = '100%';
      }, index * 200);
    });
  }
  
  // Check if already visible on load
  window.addEventListener('load', () => {
    if (section && section.getBoundingClientRect().top < window.innerHeight) {
      setTimeout(() => {
        startAllCounters();
        animateProgressBars();
      }, 300);
    }
  });
  
  // Ensure images are loaded
  const images = document.querySelectorAll('.showcase-img-final');
  images.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });
})();