// ===== MASTERPIECE COURSES - ULTRA PREMIUM INTERACTIONS =====
(function() {
  'use strict';
  
  // DOM Elements
  const section = document.querySelector('.courses-masterpiece');
  const cards = document.querySelectorAll('.course-card-master');
  const buttons = document.querySelectorAll('.course-btn-master');
  
  // State
  let animationsInitialized = false;
  let mousePosition = { x: 0, y: 0 };
  let rafId = null;
  
  // ===== ADVANCED INTERSECTION OBSERVER =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationsInitialized) {
        animationsInitialized = true;
        
        // Staggered reveal for cards (already in CSS, but we ensure it)
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 100);
        });
        
        // Initialize premium effects
        initPremiumEffects();
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px'
  });
  
  if (section) {
    observer.observe(section);
  }
  
  // ===== PREMIUM EFFECTS INITIALIZATION =====
  function initPremiumEffects() {
    // Add 3D tilt effect on mouse move (desktop only)
    if (window.innerWidth > 768) {
      cards.forEach(card => {
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
      });
    }
    
    // Add particle generator on hover
    cards.forEach(card => {
      card.addEventListener('mouseenter', generateParticles);
    });
    
    // Add magnetic effect on buttons
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', magneticEffect);
      btn.addEventListener('mouseleave', resetMagnetic);
    });
  }
  
  // ===== 3D TILT EFFECT =====
  function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = (x - centerX) / 15;
    const rotateX = (centerY - y) / 15;
    
    requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      card.style.transition = 'transform 0.1s ease';
    });
  }
  
  function resetCardTilt(e) {
    const card = e.currentTarget;
    requestAnimationFrame(() => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1)';
    });
  }
  
  // ===== PARTICLE GENERATOR =====
  function generateParticles(e) {
    const card = e.currentTarget;
    const particlesContainer = card.querySelector('.card-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${1 + Math.random()}s ease-out forwards`;
        particle.style.background = Math.random() > 0.5 ? 'var(--primary)' : 'var(--accent)';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
          particle.remove();
        }, 1500);
      }, i * 50);
    }
  }
  
  // ===== MAGNETIC BUTTON EFFECT =====
  function magneticEffect(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) * 0.3;
    const deltaY = (y - centerY) * 0.3;
    
    requestAnimationFrame(() => {
      btn.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    });
  }
  
  function resetMagnetic(e) {
    const btn = e.currentTarget;
    requestAnimationFrame(() => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.3s ease';
    });
  }
  
  // ===== BUTTON CLICK INTERACTION =====
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.left = e.offsetX + 'px';
      ripple.style.top = e.offsetY + 'px';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'rippleMaster 0.8s ease-out forwards';
      
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 800);
      
      // Button loading state
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>Loading...</span>';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        
        // Success toast
        const toast = document.createElement('div');
        toast.className = 'premium-toast';
        toast.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" fill="var(--accent)" stroke="white" stroke-width="2"/>
            <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Course details loaded</span>
        `;
        
        toast.style.cssText = `
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: white;
          color: var(--primary);
          padding: 12px 24px;
          border-radius: 50px;
          box-shadow: 0 20px 40px -10px var(--accent);
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 9999;
          animation: toastSlide 0.3s ease, toastFade 3s forwards;
          font-weight: 600;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
          toast.remove();
        }, 3000);
      }, 800);
    });
  });
  
  // ===== ADD TOAST ANIMATION =====
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleMaster {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(20); opacity: 0; }
    }
    
    @keyframes toastSlide {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes toastFade {
      0%, 70% { opacity: 1; transform: translateX(0); }
      100% { opacity: 0; transform: translateX(100px); }
    }
    
    @keyframes particleFloat {
      0% { transform: translate(0, 0) scale(1); opacity: 1; }
      100% { transform: translate(30px, -30px) scale(0); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  // ===== PARALLAX ON SECTION BACKGROUND =====
  if (section) {
    window.addEventListener('mousemove', (e) => {
      if (!animationsInitialized) return;
      
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      const bgGradient = section.querySelector('.ambient-gradient');
      const bgParticles = section.querySelector('.ambient-particles');
      const bgGrid = section.querySelector('.ambient-grid');
      
      if (bgGradient && bgParticles && bgGrid) {
        if (rafId) cancelAnimationFrame(rafId);
        
        rafId = requestAnimationFrame(() => {
          bgGradient.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
          bgParticles.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
          bgGrid.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
      }
    });
  }
  
  // ===== LOAD CHECK =====
  window.addEventListener('load', () => {
    if (section && section.getBoundingClientRect().top < window.innerHeight) {
      animationsInitialized = true;
      initPremiumEffects();
    }
    
    // Add floating animation to first card
    if (cards.length > 0) {
      cards[0].style.animation = 'floatMaster 4s ease-in-out infinite';
    }
  });
  
  // ===== CLEANUP =====
  window.addEventListener('beforeunload', () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  });
  
  // ===== ADD FLOAT ANIMATION =====
  const floatStyle = document.createElement('style');
  floatStyle.textContent = `
    @keyframes floatMaster {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(floatStyle);
})();