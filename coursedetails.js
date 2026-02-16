// ===== COURSE DETAILS - INTERACTIONS WITH WHATSAPP =====
(function() {
  'use strict';
  
  const courseSection = document.querySelector('.course-details-premium');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const sidebarEnrollBtn = document.getElementById('sidebarEnrollBtn');
  
  // WhatsApp configuration
  const WHATSAPP_NUMBER = '919789029012'; // 9789029012 with country code
  const COURSE_NAME = 'Pediatric Dentistry Fundamentals';
  const COURSE_PRICE = '$1,299';
  const COURSE_DURATION = '12 weeks';
  
  // Intersection Observer for scroll reveals
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });
  
  if (courseSection) {
    observer.observe(courseSection);
  }
  
  // Accordion functionality
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      accordionItems.forEach(accItem => {
        accItem.classList.remove('active');
        const icon = accItem.querySelector('.header-icon');
        if (icon) icon.textContent = '+';
      });
      
      // Open current item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.header-icon');
        if (icon) icon.textContent = '−';
      }
    });
  });
  
  // WhatsApp enrollment function
  function handleEnrollment() {
    // Prepare WhatsApp message with course details
    const message = `*New Course Enrollment Request*%0A%0A` +
                   `*Course:* ${COURSE_NAME}%0A` +
                   `*Price:* ${COURSE_PRICE}%0A` +
                   `*Duration:* ${COURSE_DURATION}%0A%0A` +
                   `I would like to enroll in this course. Please provide more information.`;
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Show feedback (optional)
    showNotification('Redirecting to WhatsApp...', 'success');
  }
  
  // Enroll button click handler (only one button now)
  if (sidebarEnrollBtn) {
    sidebarEnrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const originalText = sidebarEnrollBtn.textContent;
      sidebarEnrollBtn.textContent = 'Redirecting...';
      sidebarEnrollBtn.disabled = true;
      
      // Small delay for better UX
      setTimeout(() => {
        handleEnrollment();
        sidebarEnrollBtn.textContent = originalText;
        sidebarEnrollBtn.disabled = false;
      }, 500);
    });
  }
  
  // Notification system
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `course-notification ${type}`;
    
    notification.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="var(--accent)"/>
        <path d="M8 12L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>${message}</span>
    `;
    
    notification.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: white;
      color: var(--text-dark);
      padding: 16px 24px;
      border-radius: 50px;
      box-shadow: var(--shadow);
      border-left: 5px solid var(--accent);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      animation: notificationSlide 0.3s ease, notificationFade 0.3s 2.2s ease forwards;
      font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 2500);
  }
  
  // Add notification styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes notificationSlide {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes notificationFade {
      to { transform: translateX(100px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  // Breadcrumb navigation
  const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link');
  breadcrumbLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
  
  // Highlight items hover effect
  const highlightItems = document.querySelectorAll('.highlight-item');
  highlightItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-3px)';
      item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0)';
    });
  });
  
  // Module list items hover
  const moduleItems = document.querySelectorAll('.module-list li');
  moduleItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(5px)';
      item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateX(0)';
    });
  });
  
  // Smooth scroll reveal for content blocks
  const contentBlocks = document.querySelectorAll('.content-block');
  
  const blockObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.3 });
  
  contentBlocks.forEach(block => {
    blockObserver.observe(block);
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const sidebar = document.querySelector('.course-sidebar');
      if (sidebar && window.innerWidth <= 768) {
        sidebar.style.position = 'static';
      } else if (sidebar) {
        sidebar.style.position = 'sticky';
      }
    }, 250);
  });
  
  // Initialize on load
  window.addEventListener('load', () => {
    if (courseSection && courseSection.getBoundingClientRect().top < window.innerHeight) {
      courseSection.classList.add('in-view');
    }
  });
})();
// Add these enhancements to your existing JavaScript

(function() {
  'use strict';
  
  // Existing code plus new enhancements
  
  const courseSection = document.querySelector('.course-details-premium');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const sidebarEnrollBtn = document.getElementById('sidebarEnrollBtn');
  const faqItems = document.querySelectorAll('.faq-item');
  const downloadBtn = document.querySelector('.download-syllabus-btn');
  
  // WhatsApp configuration
  const WHATSAPP_NUMBER = '919789029012';
  const COURSE_NAME = 'Pediatric Dentistry Fundamentals';
  const COURSE_PRICE = '$1,299';
  const COURSE_DURATION = '12 weeks';
  
  // Countdown Timer
  function startCountdown() {
    // Set the date we're counting down to (48 hours from now)
    let countDownDate = new Date().getTime() + (48 * 60 * 60 * 1000);
    
    const timerDays = document.querySelector('.timer-days');
    const timerHours = document.querySelector('.timer-hours');
    const timerMinutes = document.querySelector('.timer-minutes');
    const timerSeconds = document.querySelector('.timer-seconds');
    
    if (!timerDays) return;
    
    const timer = setInterval(function() {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      timerDays.textContent = String(days).padStart(2, '0');
      timerHours.textContent = String(hours).padStart(2, '0');
      timerMinutes.textContent = String(minutes).padStart(2, '0');
      timerSeconds.textContent = String(seconds).padStart(2, '0');
      
      if (distance < 0) {
        clearInterval(timer);
        timerDays.textContent = '00';
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }, 1000);
  }
  
  // Start countdown if timer exists
  if (document.querySelector('.timer-display')) {
    startCountdown();
  }
  
  // FAQ Accordion
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(faq => {
        faq.classList.remove('active');
        const icon = faq.querySelector('.faq-icon');
        if (icon) icon.textContent = '+';
      });
      
      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.faq-icon');
        if (icon) icon.textContent = '−';
      }
    });
  });
  
  // Download Syllabus
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Simulate PDF download
      showNotification('Preparing syllabus PDF...', 'info');
      
      setTimeout(() => {
        showNotification('Syllabus downloaded successfully!', 'success');
      }, 1500);
    });
  }
  
  // Course rating hover effect
  const ratingStars = document.querySelectorAll('.rating-stars span');
  ratingStars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
      for (let i = 0; i <= index; i++) {
        ratingStars[i].style.transform = 'scale(1.2)';
        ratingStars[i].style.transition = 'transform 0.2s ease';
      }
    });
    
    star.addEventListener('mouseleave', () => {
      ratingStars.forEach(s => {
        s.style.transform = 'scale(1)';
      });
    });
  });
  
  // Instructor card social effect
  const instructorCard = document.querySelector('.instructor-card');
  if (instructorCard) {
    instructorCard.addEventListener('mousemove', (e) => {
      const rect = instructorCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      instructorCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    instructorCard.addEventListener('mouseleave', () => {
      instructorCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  }
  
  // Testimonial auto-rotate (optional)
  let testimonialIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial-card');
  
  function rotateTestimonials() {
    if (testimonials.length <= 2) return;
    
    testimonials.forEach((t, i) => {
      t.style.opacity = '0';
      t.style.transition = 'opacity 0.5s ease';
    });
    
    for (let i = 0; i < 2; i++) {
      const index = (testimonialIndex + i) % testimonials.length;
      testimonials[index].style.opacity = '1';
    }
    
    testimonialIndex = (testimonialIndex + 2) % testimonials.length;
  }
  
  // Start auto-rotate if more than 2 testimonials
  if (testimonials.length > 2) {
    setInterval(rotateTestimonials, 5000);
  }
  
  // Smooth scroll to sections
  const moduleLinks = document.querySelectorAll('.header-title');
  moduleLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Smooth scroll implementation
    });
  });
  
  // Payment method hover
  const paymentIcons = document.querySelectorAll('.payment-icons span');
  paymentIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'translateY(-3px) scale(1.1)';
      icon.style.background = 'var(--accent)';
      icon.style.color = 'white';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = '';
      icon.style.background = 'var(--glass-bg)';
      icon.style.color = 'var(--primary)';
    });
  });
  
  // Enhanced notification system
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `course-notification ${type}`;
    
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ'
    };
    
    notification.innerHTML = `
      <span class="notification-icon">${icons[type]}</span>
      <span class="notification-message">${message}</span>
    `;
    
    notification.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: white;
      color: var(--text-dark);
      padding: 16px 24px;
      border-radius: 50px;
      box-shadow: var(--shadow);
      border-left: 5px solid ${type === 'success' ? 'var(--accent)' : type === 'error' ? '#ff4444' : 'var(--primary)'};
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      animation: notificationSlide 0.3s ease, notificationFade 0.3s 2.7s ease forwards;
      font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }
  
  // WhatsApp enrollment with enhanced message
  function handleEnrollment() {
    // Get current date and time for tracking
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    
    const message = `*New Course Enrollment Request*%0A%0A` +
                   `*Course:* ${COURSE_NAME}%0A` +
                   `*Price:* ${COURSE_PRICE}%0A` +
                   `*Duration:* ${COURSE_DURATION}%0A` +
                   `*Date:* ${dateStr}%0A` +
                   `*Time:* ${timeStr}%0A%0A` +
                   `I would like to enroll in this course. Please provide payment instructions and next steps.`;
    
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappURL, '_blank');
    
    showNotification('Redirecting to WhatsApp...', 'success');
  }
  
  // Enroll button click handler
  if (sidebarEnrollBtn) {
    sidebarEnrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const originalText = sidebarEnrollBtn.textContent;
      sidebarEnrollBtn.textContent = 'Preparing...';
      sidebarEnrollBtn.disabled = true;
      
      setTimeout(() => {
        handleEnrollment();
        sidebarEnrollBtn.textContent = originalText;
        sidebarEnrollBtn.disabled = false;
      }, 800);
    });
  }
  
  // Initialize
  window.addEventListener('load', () => {
    if (courseSection && courseSection.getBoundingClientRect().top < window.innerHeight) {
      courseSection.classList.add('in-view');
    }
  });
  
  // Resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const sidebar = document.querySelector('.course-sidebar');
      if (sidebar && window.innerWidth <= 768) {
        sidebar.style.position = 'static';
      } else if (sidebar) {
        sidebar.style.position = 'sticky';
      }
    }, 250);
  });
})();