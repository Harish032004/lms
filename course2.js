// ===== COURSE DETAILS - OFFLINE INSTITUTE VERSION =====
(function() {
  'use strict';
  
  const courseSection = document.querySelector('.course-details-premium');
  const accordionItems = document.querySelectorAll('.accordion-item');
  const faqItems = document.querySelectorAll('.faq-item');
  const sidebarEnrollBtn = document.getElementById('sidebarEnrollBtn');
  
  // Institute WhatsApp Number
  const INSTITUTE_WHATSAPP = '919789029012';
  const COURSE_NAME = 'Pediatric Dentistry Fundamentals';
  const COURSE_FEE = '₹24,999';
  
  // Intersection Observer for scroll reveals
  if (courseSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(courseSection);
  }
  
  // Accordion functionality
  if (accordionItems.length > 0) {
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      
      if (header) {
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
      }
    });
  }
  
  // FAQ Accordion
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all FAQ items
          faqItems.forEach(faq => {
            faq.classList.remove('active');
            const icon = faq.querySelector('.faq-icon');
            if (icon) icon.textContent = '+';
          });
          
          // Open current item if it wasn't active
          if (!isActive) {
            item.classList.add('active');
            const icon = item.querySelector('.faq-icon');
            if (icon) icon.textContent = '−';
          }
        });
      }
    });
  }
  
  // WhatsApp enrollment for offline institute
  function handleInstituteEnrollment() {
    try {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN');
      const timeStr = now.toLocaleTimeString('en-IN');
      
      const message = `*New Course Enrollment Inquiry - Offline Institute*%0A%0A` +
                     `*Course:* ${COURSE_NAME}%0A` +
                     `*Fee:* ${COURSE_FEE}%0A` +
                     `*Mode:* Offline Classroom Training%0A` +
                     `*Date:* ${dateStr}%0A` +
                     `*Time:* ${timeStr}%0A%0A` +
                     `I am interested in enrolling for this offline course. Please provide:%0A%0A` +
                     `1. Available batch dates%0A` +
                     `2. Payment options%0A` +
                     `3. Institute address details%0A` +
                     `4. Required documents`;
      
      const whatsappURL = `https://wa.me/${INSTITUTE_WHATSAPP}?text=${message}`;
      window.open(whatsappURL, '_blank');
      
      showNotification('Redirecting to WhatsApp for offline course inquiry...', 'success');
    } catch (error) {
      console.error('Error in WhatsApp enrollment:', error);
      showNotification('Something went wrong. Please try again.', 'error');
    }
  }
  
  // Enroll button click handler
  if (sidebarEnrollBtn) {
    sidebarEnrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const originalText = sidebarEnrollBtn.textContent;
      sidebarEnrollBtn.textContent = 'Processing...';
      sidebarEnrollBtn.disabled = true;
      
      setTimeout(() => {
        handleInstituteEnrollment();
        sidebarEnrollBtn.textContent = originalText;
        sidebarEnrollBtn.disabled = false;
      }, 800);
    });
  }
  
  // Notification system
  function showNotification(message, type = 'success') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.course-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `course-notification ${type}`;
    
    const iconColor = type === 'success' ? 'var(--accent)' : '#ff4444';
    const iconPath = type === 'success' 
      ? '<path d="M8 12L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round"/>'
      : '<path d="M8 8L16 16M8 16L16 8" stroke="white" stroke-width="2" stroke-linecap="round"/>';
    
    notification.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="${iconColor}"/>
        ${iconPath}
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
      border-left: 5px solid ${iconColor};
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      animation: notificationSlide 0.3s ease, notificationFade 0.3s 2.7s ease forwards;
      font-weight: 500;
      max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
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
  
  // Check if style already exists
  if (!document.querySelector('style[data-notification="true"]')) {
    style.setAttribute('data-notification', 'true');
    document.head.appendChild(style);
  }
  
  // Breadcrumb navigation (prevent default)
  const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link');
  breadcrumbLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
  
  // Smooth scroll reveal for content blocks
  const contentBlocks = document.querySelectorAll('.content-block');
  
  if (contentBlocks.length > 0) {
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
  }
  
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
  
  // Contact info click handlers
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.addEventListener('click', () => {
      const span = item.querySelector('span');
      if (!span) return;
      
      const text = span.textContent || '';
      
      if (text.includes('@')) {
        // Copy email
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            showNotification('Email copied to clipboard!', 'success');
          }).catch(() => {
            showNotification('Failed to copy email', 'error');
          });
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showNotification('Email copied to clipboard!', 'success');
        }
      } else if (text.includes('+91')) {
        // Copy phone
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            showNotification('Phone number copied!', 'success');
          }).catch(() => {
            showNotification('Failed to copy phone number', 'error');
          });
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showNotification('Phone number copied!', 'success');
        }
      }
    });
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const sidebar = document.querySelector('.course-sidebar');
      if (sidebar) {
        if (window.innerWidth <= 768) {
          sidebar.style.position = 'static';
        } else {
          sidebar.style.position = 'sticky';
          sidebar.style.top = '100px';
        }
      }
    }, 250);
  });
  
  // Initialize on load
  window.addEventListener('load', () => {
    if (courseSection) {
      const rect = courseSection.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        courseSection.classList.add('in-view');
      }
    }
    
    // Set initial sidebar position
    const sidebar = document.querySelector('.course-sidebar');
    if (sidebar) {
      if (window.innerWidth <= 768) {
        sidebar.style.position = 'static';
      } else {
        sidebar.style.position = 'sticky';
        sidebar.style.top = '100px';
      }
    }
  });
  
})();