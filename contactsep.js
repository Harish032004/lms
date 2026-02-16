// ===== CONTACT PAGE - INTERACTIONS =====
(function() {
  'use strict';
  
  const contactSection = document.querySelector('.contact-page-hero');
  const contactForm = document.getElementById('contactForm');
  const whatsappBtn = document.getElementById('whatsappSupportBtn');
  const faqItems = document.querySelectorAll('.faq-item');
  const submitBtn = document.getElementById('contactSubmitBtn');
  
  // WhatsApp number
  const WHATSAPP_NUMBER = '919789029012';
  
  // Form fields
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  // Error fields
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  
  // Intersection Observer for scroll reveals
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });
  
  if (contactSection) {
    observer.observe(contactSection);
  }
  
  // FAQ Accordion - Fixed
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', function(e) {
          e.preventDefault();
          
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
  
  // Validation functions
  function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  }
  
  function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }
  
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Name validation (only alphabets)
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
  
  // Phone validation (only digits)
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
  
  // Email validation
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      if (this.value.length > 0 && !validateEmail(this.value)) {
        emailError.textContent = 'Please enter a valid email address';
      } else {
        emailError.textContent = '';
      }
    });
  }
  
  // Message validation
  if (messageInput) {
    messageInput.addEventListener('blur', function() {
      if (this.value.length > 0 && this.value.trim().length < 5) {
        messageError.textContent = 'Message must be at least 5 characters';
      } else {
        messageError.textContent = '';
      }
    });
  }
  
  // Form submission - Fixed WhatsApp navigation
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      
      // Clear all errors
      if (nameError) nameError.textContent = '';
      if (phoneError) phoneError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (messageError) messageError.textContent = '';
      
      let isValid = true;
      
      // Validate name
      if (!name) {
        if (nameError) nameError.textContent = 'Name is required';
        isValid = false;
      } else if (!validateName(name)) {
        if (nameError) nameError.textContent = 'Only alphabets allowed';
        isValid = false;
      }
      
      // Validate phone
      if (!phone) {
        if (phoneError) phoneError.textContent = 'Phone number is required';
        isValid = false;
      } else if (!validatePhone(phone)) {
        if (phoneError) phoneError.textContent = 'Must be exactly 10 digits';
        isValid = false;
      }
      
      // Validate email
      if (!email) {
        if (emailError) emailError.textContent = 'Email is required';
        isValid = false;
      } else if (!validateEmail(email)) {
        if (emailError) emailError.textContent = 'Invalid email format';
        isValid = false;
      }
      
      // Validate message
      if (!message) {
        if (messageError) messageError.textContent = 'Message is required';
        isValid = false;
      } else if (message.length < 5) {
        if (messageError) messageError.textContent = 'Minimum 5 characters';
        isValid = false;
      }
      
      if (!isValid) {
        // Scroll to first error
        const firstError = document.querySelector('.error-message:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      // Prepare WhatsApp message
      const whatsappMessage = `*New Contact Form Submission*%0A%0A` +
                             `*Name:* ${name}%0A` +
                             `*Phone:* ${phone}%0A` +
                             `*Email:* ${email}%0A` +
                             `*Subject:* ${subject || 'Not provided'}%0A` +
                             `*Message:* ${message}`;
      
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
      
      // Show loading state
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          // Open WhatsApp in new tab
          window.open(whatsappURL, '_blank');
          
          // Reset form
          contactForm.reset();
          
          // Restore button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          
          // Show success notification
          showNotification('Message sent! Redirecting to WhatsApp...', 'success');
        }, 800);
      }
    });
  }
  
  // WhatsApp support button - Fixed with proper message
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const message = `Hi! I'm interested in joining your courses. Can you please provide more details?`;
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappURL, '_blank');
      showNotification('Redirecting to WhatsApp support...', 'success');
    });
  }
  
  // Notification function
  function showNotification(message, type) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.contact-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'contact-notification';
    
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
      animation: slideIn 0.3s ease, fadeOut 0.3s 2.7s ease forwards;
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
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
      to { transform: translateX(100px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  // Breadcrumb navigation (prevent default)
  const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
  breadcrumbLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
  
  // Initialize on load
  window.addEventListener('load', () => {
    if (contactSection && contactSection.getBoundingClientRect().top < window.innerHeight) {
      contactSection.classList.add('in-view');
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
