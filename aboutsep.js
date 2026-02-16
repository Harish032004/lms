// ===== ABOUT PAGE - INTERACTIONS =====
(function() {
  'use strict';
  
  const aboutSection = document.querySelector('.about-page-hero');
  const statNumbers = document.querySelectorAll('.stat-number');
  const teamCards = document.querySelectorAll('.team-card');
  const chooseCards = document.querySelectorAll('.choose-card');
  
  let animationStarted = false;
  let countedStats = new Set();
  
  // Intersection Observer for scroll reveals
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });
  
  if (aboutSection) {
    observer.observe(aboutSection);
  }
  
  // Stats counter animation
  function startCounter(element, target) {
    let current = 0;
    const increment = target > 100 ? Math.ceil(target / 80) : 1;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const stepValue = target / steps;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        element.textContent = target + (target === 98 ? '%' : '');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + (target === 98 ? '%' : '');
      }
    }, stepTime);
  }
  
  // Observe stats section
  const statsSection = document.querySelector('.achievements');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;
          
          statNumbers.forEach(stat => {
            if (!countedStats.has(stat)) {
              countedStats.add(stat);
              const target = parseInt(stat.dataset.target, 10);
              startCounter(stat, target);
            }
          });
        }
      });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
  }
  
  // Team card hover effect enhancement
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      teamCards.forEach(c => {
        if (c !== card) {
          c.style.opacity = '0.7';
        }
      });
    });
    
    card.addEventListener('mouseleave', () => {
      teamCards.forEach(c => {
        c.style.opacity = '1';
      });
    });
  });
  
  // Choose card hover effect
  chooseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
  
  // Smooth reveal for vision/mission cards
  const visionMissionCards = document.querySelectorAll('.vision-card, .mission-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.3 });
  
  visionMissionCards.forEach(card => {
    cardObserver.observe(card);
  });
  
  // Breadcrumb navigation (prevent default for demo)
  const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
  breadcrumbLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
  
  // CTA button click
//   const ctaBtn = document.querySelector('.cta-button');
//   if (ctaBtn) {
//     ctaBtn.addEventListener('click', (e) => {
//       e.preventDefault();
//       alert('Enrollment process started. You will be redirected to courses page.');
//     });
//   }
  
  // Initialize on load
  window.addEventListener('load', () => {
    // Check if stats section is already visible
    if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight) {
      animationStarted = true;
      statNumbers.forEach(stat => {
        if (!countedStats.has(stat)) {
          countedStats.add(stat);
          const target = parseInt(stat.dataset.target, 10);
          startCounter(stat, target);
        }
      });
    }
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Adjust any responsive elements if needed
    }, 250);
  });
})();


// Enrollment Form Modal Functionality
(function() {
  'use strict';
  
  const openBtn = document.getElementById('openEnrollForm');
  const modal = document.getElementById('enrollModal');
  const closeBtn = document.getElementById('closeEnrollForm');
  const overlay = document.querySelector('.modal-overlay');
  const form = document.getElementById('enrollmentForm');
  
  // Form fields
  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('phoneNumber');
  const courseSelect = document.getElementById('selectCourse');
  
  // Error fields
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const courseError = document.getElementById('courseError');
  
  // WhatsApp number
  const WHATSAPP_NUMBER = '919789029012';
  
  // Open modal
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Close modal function
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    form.reset();
    clearErrors();
  }
  
  // Close on X click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }
  
  // Clear all errors
  function clearErrors() {
    nameError.textContent = '';
    phoneError.textContent = '';
    courseError.textContent = '';
  }
  
  // Validation functions
  function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  }
  
  function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }
  
  // Name input validation (only alphabets)
  if (nameInput) {
    nameInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^A-Za-z\s]/g, '');
      
      if (this.value.length > 0 && !validateName(this.value)) {
        nameError.textContent = 'Only alphabets allowed';
      } else {
        nameError.textContent = '';
      }
    });
  }
  
  // Phone input validation (only digits, max 10)
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '');
      
      if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
      }
      
      if (this.value.length > 0 && this.value.length !== 10) {
        phoneError.textContent = 'Phone number must be exactly 10 digits';
      } else {
        phoneError.textContent = '';
      }
    });
  }
  
  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const course = courseSelect.value;
      
      clearErrors();
      
      let isValid = true;
      
      // Validate name
      if (!name) {
        nameError.textContent = 'Name is required';
        isValid = false;
      } else if (!validateName(name)) {
        nameError.textContent = 'Only alphabets allowed';
        isValid = false;
      }
      
      // Validate phone
      if (!phone) {
        phoneError.textContent = 'Phone number is required';
        isValid = false;
      } else if (!validatePhone(phone)) {
        phoneError.textContent = 'Must be exactly 10 digits';
        isValid = false;
      }
      
      // Validate course
      if (!course) {
        courseError.textContent = 'Please select a course';
        isValid = false;
      }
      
      if (!isValid) return;
      
      // Prepare WhatsApp message
      const message = `*New Course Enrollment Request*%0A%0A` +
                     `*Name:* ${name}%0A` +
                     `*Phone:* ${phone}%0A` +
                     `*Selected Course:* ${course}%0A%0A` +
                     `I would like to enroll in this course. Please provide further details.`;
      
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      
      // Show loading state
      const submitBtn = document.getElementById('submitEnrollment');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Redirecting...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        closeModal();
        
        // Show success message
        showNotification('Redirecting to WhatsApp...', 'success');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 800);
    });
  }
  
  // Notification function
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'enroll-notification';
    
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
      z-index: 10001;
      animation: slideIn 0.3s ease, fadeOut 0.3s 2.7s ease forwards;
      font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  // Close modal on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
})();