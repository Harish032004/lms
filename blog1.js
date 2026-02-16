// ===== SINGLE BLOG CLASSIC - INTERACTIONS =====
(function() {
  'use strict';
  
  const classicSection = document.querySelector('.single-blog-classic');
  const commentForm = document.getElementById('classicCommentForm');
  const searchBtn = document.querySelector('.search-btn');
  const ctaBtn = document.querySelector('.cta-btn');
  const shareLinks = document.querySelectorAll('.share-link');
  
  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });
  
  if (classicSection) {
    observer.observe(classicSection);
  }
  
  // Comment form submission
  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('commentName').value.trim();
      const email = document.getElementById('commentEmail').value.trim();
      const message = document.getElementById('commentMessage').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill all fields');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      const submitBtn = commentForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Posting...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Comment posted successfully!');
        commentForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }
  
  // Email validation
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Search functionality
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchInput = document.querySelector('.search-input');
      const query = searchInput.value.trim();
      
      if (query) {
        alert(`Searching for: "${query}"`);
        searchInput.value = '';
      } else {
        alert('Please enter a search term');
      }
    });
  }
  
  // CTA button
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      alert('Newsletter subscription opened');
    });
  }
  
  // Share links
  shareLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (link.textContent === 'copy') {
        const dummy = document.createElement('input');
        dummy.value = window.location.href;
        document.body.appendChild(dummy);
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Link copied to clipboard!');
      } else {
        alert(`Share on ${link.textContent}`);
      }
    });
  });
  
  // Navigation links
  const navLinks = document.querySelectorAll('.nav-prev, .nav-next');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Navigating to article...');
    });
  });
  
  // Category links
  const categoryLinks = document.querySelectorAll('.category-list a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert(`Filtering by: ${link.textContent.split(' ')[0]}`);
    });
  });
  
  // Recent post links
  const recentLinks = document.querySelectorAll('.recent-list a');
  recentLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert(`Opening: ${link.textContent}`);
    });
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const sidebar = document.querySelector('.classic-sidebar');
      if (sidebar && window.innerWidth <= 768) {
        sidebar.style.position = 'static';
      } else if (sidebar) {
        sidebar.style.position = 'sticky';
      }
    }, 250);
  });
  
  // Initialize on load
  window.addEventListener('load', () => {
    if (classicSection && classicSection.getBoundingClientRect().top < window.innerHeight) {
      classicSection.classList.add('in-view');
    }
  });
})();