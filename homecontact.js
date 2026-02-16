// ===== CONTACT CONNECT - UNIQUE FORM HANDLER =====
(function() {
  'use strict';
  
  // Unique elements for this section only
  const connectSection = document.querySelector('.contact-connect');
  const connectForm = document.getElementById('connectForm');
  const connectSuccess = document.getElementById('connectSuccessMsg');
  const connectSubmit = document.getElementById('connectSubmitBtn');
  
  // Form fields - unique IDs
  const fieldFullName = document.getElementById('fullName');
  const fieldEmail = document.getElementById('emailAddress');
  const fieldMobile = document.getElementById('mobileNumber');
  const fieldMessage = document.getElementById('yourMessage');
  
  // Error message containers
  const errorFullName = document.getElementById('fullNameError');
  const errorEmail = document.getElementById('emailAddressError');
  const errorMobile = document.getElementById('mobileNumberError');
  const errorMessage = document.getElementById('yourMessageError');
  
  // WhatsApp configuration
  const WHATSAPP_NUMBER = '919789029012'; // 9789029012 with country code
  
  // ===== VALIDATION RULES =====
  
  // Only alphabets and spaces (no numbers, no special characters)
  function isValidName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  }
  
  // Valid email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Exactly 10 digits, no letters, no special characters
  function isValidPhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }
  
  // Message at least 5 characters
  function isValidMessage(msg) {
    return msg && msg.trim().length >= 5;
  }
  
  // ===== FIELD VALIDATION =====
  
  // Name field - block any non-alphabetic input
  if (fieldFullName) {
    fieldFullName.addEventListener('keydown', function(e) {
      const key = e.key;
      // Allow: backspace, delete, tab, escape, enter, space
      if (key === 'Backspace' || key === 'Delete' || key === 'Tab' || key === 'Escape' || key === 'Enter' || key === ' ') {
        return; // Allow these keys
      }
      
      // Allow letters (a-z, A-Z)
      if (!/^[a-zA-Z]$/.test(key)) {
        e.preventDefault(); // Block any other character
      }
    });
    
    // Additional paste protection
    fieldFullName.addEventListener('input', function() {
      this.value = this.value.replace(/[^A-Za-z\s]/g, ''); // Remove any non-alphabetic characters
      
      if (this.value.length > 0 && !isValidName(this.value)) {
        errorFullName.textContent = 'Only alphabets allowed';
      } else {
        errorFullName.textContent = '';
      }
    });
  }
  
  // Phone field - only digits, max 10
  if (fieldMobile) {
    fieldMobile.addEventListener('keydown', function(e) {
      const key = e.key;
      // Allow control keys
      if (key === 'Backspace' || key === 'Delete' || key === 'Tab' || key === 'Escape' || key === 'Enter') {
        return;
      }
      
      // Only allow digits
      if (!/^\d$/.test(key)) {
        e.preventDefault();
      }
    });
    
    fieldMobile.addEventListener('input', function() {
      // Remove any non-digits
      this.value = this.value.replace(/\D/g, '');
      
      // Limit to 10 digits
      if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
      }
      
      if (this.value.length > 0 && this.value.length !== 10) {
        errorMobile.textContent = 'Phone number must be exactly 10 digits';
      } else {
        errorMobile.textContent = '';
      }
    });
  }
  
  // Email validation on blur
  if (fieldEmail) {
    fieldEmail.addEventListener('blur', function() {
      if (this.value.length > 0 && !isValidEmail(this.value)) {
        errorEmail.textContent = 'Please enter a valid email address';
      } else {
        errorEmail.textContent = '';
      }
    });
  }
  
  // Message validation on blur
  if (fieldMessage) {
    fieldMessage.addEventListener('blur', function() {
      if (this.value.length > 0 && this.value.trim().length < 5) {
        errorMessage.textContent = 'Message must be at least 5 characters';
      } else {
        errorMessage.textContent = '';
      }
    });
  }
  
  // ===== FORM SUBMISSION =====
  if (connectForm) {
    connectForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get values
      const nameVal = fieldFullName ? fieldFullName.value.trim() : '';
      const emailVal = fieldEmail ? fieldEmail.value.trim() : '';
      const phoneVal = fieldMobile ? fieldMobile.value.trim() : '';
      const msgVal = fieldMessage ? fieldMessage.value.trim() : '';
      
      // Clear all errors
      if (errorFullName) errorFullName.textContent = '';
      if (errorEmail) errorEmail.textContent = '';
      if (errorMobile) errorMobile.textContent = '';
      if (errorMessage) errorMessage.textContent = '';
      
      let isFormValid = true;
      
      // Validate name
      if (!nameVal) {
        if (errorFullName) errorFullName.textContent = 'Name is required';
        isFormValid = false;
      } else if (!isValidName(nameVal)) {
        if (errorFullName) errorFullName.textContent = 'Only alphabets allowed';
        isFormValid = false;
      }
      
      // Validate email
      if (!emailVal) {
        if (errorEmail) errorEmail.textContent = 'Email is required';
        isFormValid = false;
      } else if (!isValidEmail(emailVal)) {
        if (errorEmail) errorEmail.textContent = 'Invalid email format';
        isFormValid = false;
      }
      
      // Validate phone
      if (!phoneVal) {
        if (errorMobile) errorMobile.textContent = 'Phone number is required';
        isFormValid = false;
      } else if (!isValidPhone(phoneVal)) {
        if (errorMobile) errorMobile.textContent = 'Must be exactly 10 digits';
        isFormValid = false;
      }
      
      // Validate message
      if (!msgVal) {
        if (errorMessage) errorMessage.textContent = 'Message is required';
        isFormValid = false;
      } else if (msgVal.length < 5) {
        if (errorMessage) errorMessage.textContent = 'Minimum 5 characters';
        isFormValid = false;
      }
      
      if (!isFormValid) {
        // Scroll to first error
        const firstError = document.querySelector('.row-error:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      // Show loading state
      const originalBtnText = connectSubmit.innerHTML;
      if (connectSubmit) {
        connectSubmit.innerHTML = '<span>Sending...</span>';
        connectSubmit.disabled = true;
      }
      
      // Prepare WhatsApp message
      const whatsappText = `*New Contact Form Submission*%0A%0A*Name:* ${nameVal}%0A*Email:* ${emailVal}%0A*Phone:* ${phoneVal}%0A*Message:* ${msgVal}`;
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;
      
      // Short delay for better UX
      setTimeout(function() {
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Hide form, show success
        if (connectForm) connectForm.style.display = 'none';
        if (connectSuccess) connectSuccess.style.display = 'block';
        
        // Reset form
        if (connectForm) connectForm.reset();
        
        // Restore button
        if (connectSubmit) {
          connectSubmit.innerHTML = originalBtnText;
          connectSubmit.disabled = false;
        }
        
        // Hide success after 5 seconds and show form again
        setTimeout(function() {
          if (connectSuccess) connectSuccess.style.display = 'none';
          if (connectForm) connectForm.style.display = 'block';
        }, 5000);
        
        // Show toast
        showConnectToast('Redirecting to WhatsApp...', 'success');
      }, 800);
    });
  }
  
  // ===== TOAST NOTIFICATION =====
  function showConnectToast(message, type) {
    const toastElement = document.createElement('div');
    toastElement.className = 'connect-toast';
    
    const iconSvg = type === 'success' 
      ? '<circle cx="12" cy="12" r="10" fill="var(--accent)"/><path d="M8 12L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round"/>'
      : '<circle cx="12" cy="12" r="10" fill="#ff4444"/><path d="M8 8L16 16M8 16L16 8" stroke="white" stroke-width="2" stroke-linecap="round"/>';
    
    toastElement.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        ${iconSvg}
      </svg>
      <span>${message}</span>
    `;
    
    toastElement.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: white;
      color: var(--text-dark);
      padding: 16px 24px;
      border-radius: 50px;
      box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);
      border-left: 5px solid ${type === 'success' ? 'var(--accent)' : '#ff4444'};
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      animation: connectSlideIn 0.3s ease, connectFadeOut 0.3s 2.7s ease forwards;
      font-weight: 500;
    `;
    
    document.body.appendChild(toastElement);
    
    setTimeout(function() {
      if (toastElement.parentNode) {
        toastElement.remove();
      }
    }, 3000);
  }
  
  // ===== ANIMATION STYLES =====
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes connectSlideIn {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes connectFadeOut {
      to { transform: translateX(100px); opacity: 0; }
    }
    
    .row-error {
      color: #ff4444;
      font-size: 0.8rem;
      margin-top: 5px;
      min-height: 18px;
      font-weight: 500;
      background: transparent;
      text-shadow: none;
    }
  `;
  document.head.appendChild(styleSheet);
  
  // ===== INTERSECTION OBSERVER =====
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });
  
  if (connectSection) {
    sectionObserver.observe(connectSection);
  }
  
  // ===== INITIALIZE =====
  window.addEventListener('load', function() {
    if (connectSection && connectSection.getBoundingClientRect().top < window.innerHeight) {
      connectSection.classList.add('in-view');
    }
  });
})();