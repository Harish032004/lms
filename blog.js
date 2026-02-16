// ===== BLOG LISTING - INTERACTIONS =====
(function() {
  'use strict';
  
  const blogSection = document.querySelector('.blog-listing');
  const blogCards = document.querySelectorAll('.blog-card');
  const readMoreBtns = document.querySelectorAll('.read-more-btn');
  const viewAllBtn = document.querySelector('.view-all-btn');
  
  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('blog-in-view');
      }
    });
  }, { threshold: 0.2 });
  
  if (blogSection) {
    observer.observe(blogSection);
  }
  
  // Hover effect enhancement for cards
  blogCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add subtle parallax effect to image
      const img = card.querySelector('.card-image');
      if (img) {
        img.style.transform = 'scale(1.08)';
      }
      
      // Slightly dim other cards
      blogCards.forEach(c => {
        if (c !== card) {
          c.style.opacity = '0.7';
        }
      });
    });
    
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('.card-image');
      if (img) {
        img.style.transform = '';
      }
      
      blogCards.forEach(c => {
        c.style.opacity = '1';
      });
    });
  });
  
  // Read More button click handler
  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get card title for tracking
      const card = btn.closest('.blog-card');
      const title = card.querySelector('.card-title').textContent;
      
      // Ripple effect
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      ripple.style.background = 'rgba(122, 201, 67, 0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'blogRipple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // Simulate navigation with loading state
      btn.style.pointerEvents = 'none';
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>Loading...</span>';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.pointerEvents = 'auto';
        
        // Show toast notification
        showBlogToast(`Opening article: "${title.substring(0, 30)}..."`, 'info');
      }, 800);
    });
  });
  
  // View All button click
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      viewAllBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        viewAllBtn.style.transform = '';
      }, 200);
      
      showBlogToast('Loading all articles...', 'info');
    });
  }
  
  // Toast notification
  function showBlogToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'blog-toast';
    
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="var(--accent)"/>
        <path d="M12 8V12M12 16H12.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>${message}</span>
    `;
    
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: white;
      color: var(--text-dark);
      padding: 14px 24px;
      border-radius: 50px;
      box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2);
      border-left: 5px solid var(--accent);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      animation: blogSlideIn 0.3s ease, blogFadeOut 0.3s 2.2s ease forwards;
      font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 2500);
  }
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes blogSlideIn {
      from {
        transform: translateX(100px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes blogFadeOut {
      to {
        transform: translateX(100px);
        opacity: 0;
      }
    }
    
    @keyframes blogRipple {
      0% {
        transform: scale(0);
        opacity: 0.5;
      }
      100% {
        transform: scale(20);
        opacity: 0;
      }
    }
    
    .blog-card {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  `;
  document.head.appendChild(style);
  
  // Lazy loading for images
  const images = document.querySelectorAll('.card-image');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src; // Reload if needed
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth <= 480) {
        // Mobile specific adjustments
      }
    }, 250);
  });
  
  // Initialize
  window.addEventListener('load', () => {
    if (blogSection && blogSection.getBoundingClientRect().top < window.innerHeight) {
      blogSection.classList.add('blog-in-view');
    }
  });
  
  // Track reading time (optional)
  let startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    console.log(`Time spent on blog section: ${timeSpent} seconds`);
  });
})();