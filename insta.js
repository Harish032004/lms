// Instagram Spacious - Full Width with No Side Padding
(function() {
  'use strict';
  
  const section = document.querySelector('.instagram-spacious');
  const embedContainer = document.querySelector('.spacious-embed-container');
  const embedElement = document.querySelector('.elfsight-app-8f3eba95-0446-4f7c-9e9a-4386f21ac64d');
  
  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });
  
  if (section) {
    observer.observe(section);
  }
  
  // Handle Elfsight script loading
  function loadElfsightScript() {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
        // Script already exists, check if we need to reinitialize
        if (window.ElfSightAPI) {
          resolve();
        } else {
          // Wait for script to initialize
          setTimeout(resolve, 1000);
        }
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      
      script.onload = () => {
        console.log('Elfsight script loaded successfully');
        resolve();
      };
      
      script.onerror = () => {
        console.error('Failed to load Elfsight script');
        showFallbackContent();
        reject();
      };
      
      document.head.appendChild(script);
    });
  }
  
  // Simple fallback
  function showFallbackContent() {
    if (!embedContainer) return;
    
    // Clear any existing content
    embedContainer.innerHTML = '';
    
    const fallback = document.createElement('div');
    fallback.style.cssText = `
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(135deg, #ffffff, #f5f7fa);
      border-radius: 24px;
      width: 100%;
      max-width: 100%;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
    `;
    
    fallback.innerHTML = `
      <svg width="70" height="70" viewBox="0 0 24 24" fill="none" style="margin: 0 auto 20px;">
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="var(--primary)" stroke-width="2"/>
        <circle cx="12" cy="12" r="3" stroke="var(--primary)" stroke-width="2"/>
        <circle cx="18" cy="6" r="1.5" fill="var(--accent)"/>
      </svg>
      <h3 style="color: var(--primary); margin: 0 0 10px; font-size: 1.5rem;">@pedodontic_practice</h3>
      <p style="color: var(--text-soft); margin: 0 0 25px; font-size: 1rem;">Follow us for daily pediatric dental insights</p>
      <a href="https://instagram.com/pedodontic_practice" target="_blank" style="display: inline-block; background: var(--accent); color: white; text-decoration: none; padding: 12px 35px; border-radius: 50px; font-weight: 600; font-size: 1rem; border: 2px solid transparent; transition: all 0.3s;">Follow on Instagram</a>
    `;
    
    embedContainer.appendChild(fallback);
    
    // Add hover effect to fallback button
    const btn = fallback.querySelector('a');
    if (btn) {
      btn.addEventListener('mouseenter', () => {
        btn.style.background = 'white';
        btn.style.color = 'var(--accent)';
        btn.style.borderColor = 'var(--accent)';
        btn.style.transform = 'translateY(-3px)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = 'var(--accent)';
        btn.style.color = 'white';
        btn.style.borderColor = 'transparent';
        btn.style.transform = 'translateY(0)';
      });
    }
  }
  
  // Check embed loading status
  function checkEmbedStatus() {
    if (!embedElement) return;
    
    // If after 3 seconds embed is still empty, try fallback
    setTimeout(() => {
      if (embedElement.children.length === 0) {
        loadElfsightScript().catch(() => {
          showFallbackContent();
        });
      }
    }, 3000);
    
    // Additional check after 5 seconds
    setTimeout(() => {
      if (embedElement.children.length === 0) {
        showFallbackContent();
      }
    }, 5000);
  }
  
  // Initialize
  window.addEventListener('load', () => {
    checkEmbedStatus();
    
    // If section is already visible, ensure animations
    if (section && section.getBoundingClientRect().top < window.innerHeight) {
      section.classList.add('in-view');
    }
  });
  
  // Preconnect for faster loading
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = 'https://elfsightcdn.com';
  document.head.appendChild(preconnect);
  
  // Handle resize to maintain full width
  function handleResize() {
    const wrapper = document.querySelector('.spacious-embed-wrapper');
    if (wrapper) {
      // Ensure full viewport width
      wrapper.style.width = '100vw';
      wrapper.style.marginLeft = 'calc(-50vw + 50%)';
      wrapper.style.marginRight = 'calc(-50vw + 50%)';
    }
  }
  
  window.addEventListener('resize', handleResize);
  handleResize(); // Call once on load
  
  // Add smooth scroll reveal
  const style = document.createElement('style');
  style.textContent = `
    .instagram-spacious.in-view .spacious-text-content {
      animation: spaciousFadeUp 0.8s ease forwards;
    }
    .instagram-spacious.in-view .spacious-embed-wrapper {
      animation: spaciousFadeUp 0.8s 0.2s ease forwards;
    }
  `;
  document.head.appendChild(style);
  
  // Error handling for Elfsight
  window.addEventListener('error', (e) => {
    if (e.target.src && e.target.src.includes('elfsight')) {
      showFallbackContent();
    }
  }, true);
})();