// Hero Section JavaScript - WhatsApp Integration
(function() {
  'use strict';

  // DOM Elements
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const exploreBtn = document.getElementById('exploreBtn');
  const contactBtn = document.getElementById('contactBtn');

  // WhatsApp Number (constant)
  const WHATSAPP_NUMBER = '919789029012'; // Format: country code + number without +

  // Form Submit Handler
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const course = document.getElementById('course').value;
      const message = document.getElementById('message').value.trim();

      // Validation
      if (!name || !phone || !email || !course) {
        // Show error message with classy alert
        showNotification('Please fill in all required fields', 'error');
        return;
      }

      // Phone validation
      if (phone.length < 10) {
        showNotification('Please enter a valid phone number', 'error');
        return;
      }

      // Email validation
      if (!email.includes('@') || !email.includes('.')) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }

      // Format WhatsApp message with classic styling
      const whatsappMessage = 
        `*NEW COURSE INQUIRY - PEDIATRIC DENTISTRY*%0A%0A` +
        `*─────────────────────*%0A%0A` +
        `*👤 NAME:* ${name}%0A` +
        `*📞 PHONE:* ${phone}%0A` +
        `*✉️ EMAIL:* ${email}%0A` +
        `*🦷 COURSE:* ${course}%0A` +
        `*💬 MESSAGE:* ${message || 'No message provided'}%0A%0A` +
        `*─────────────────────*%0A%0A` +
        `*Sent from:* Pediatric Dental Excellence Website`;

      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

      // Show loading state with classic animation
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Opening WhatsApp... ⚡';
      submitBtn.disabled = true;

      // Open WhatsApp in new tab
      window.open(whatsappURL, '_blank');

      // Show success notification
      showNotification('WhatsApp opened successfully! ✅', 'success');

      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    });
  }

  // Classy Notification System
  function showNotification(message, type) {
    // Remove existing notification
    const existingNotif = document.querySelector('.classic-notification');
    if (existingNotif) {
      existingNotif.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `classic-notification ${type}`;
    notification.innerHTML = message;
    
    // Style it classically
    notification.style.cssText = `
      position: fixed;
      top: 30px;
      right: 30px;
      background: ${type === 'success' ? 'rgba(122, 201, 67, 0.95)' : 'rgba(90, 62, 152, 0.95)'};
      color: white;
      padding: 16px 32px;
      border-radius: 60px;
      font-weight: 500;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.3);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      z-index: 9999;
      animation: slideIn 0.5s ease;
      font-size: 1rem;
      letter-spacing: 0.5px;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // Explore Courses Button - Classic smooth scroll
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function() {
      // Smooth scroll to courses with classic animation
      const coursesSection = document.querySelector('.mega-menu') || document.getElementById('coursesSection');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        showNotification('Our courses: Pediatric Dentistry, Child Orthodontics, Pulp Therapy, Dental Radiology, Preventive Dentistry, Sedation Dentistry', 'info');
      }
    });
  }

  // Talk to Advisor Button
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      // Smooth scroll to form with classic emphasis
      const formCard = document.querySelector('.form-card');
      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add classic pulse effect
        formCard.style.transition = 'box-shadow 0.5s ease';
        formCard.style.boxShadow = '0 40px 80px rgba(122, 201, 67, 0.4)';
        setTimeout(() => {
          formCard.style.boxShadow = 'var(--shadow)';
        }, 1000);
      }
    });
  }

  // Floating labels enhancement for select
  const courseSelect = document.getElementById('course');
  if (courseSelect) {
    courseSelect.addEventListener('change', function() {
      if (this.value) {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
    });
  }

  // Parallax effect on background (subtle classic touch)
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgImage = document.querySelector('.hero-bg-image');
    if (bgImage) {
      bgImage.style.transform = `scale(1.1) translateY(${scrolled * 0.05}px)`;
    }
  });

  // Mouse move parallax for floating shapes (ultra subtle)
  document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 10;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Add CSS animations for notifications
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100px); opacity: 0; }
    }
    
    .classic-notification {
      transition: all 0.5s ease;
    }
  `;
  document.head.appendChild(style);
})();