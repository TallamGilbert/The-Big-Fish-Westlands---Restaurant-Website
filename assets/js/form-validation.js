// Fade-in Animation for Elements
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
      );
    }
  
    // Animate elements when they come into view
    function animateOnScroll() {
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach(function(element) {
        if (isInViewport(element)) {
          element.classList.add('visible');
        }
      });
    }
  
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
  
    // Form validation and submission
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
      bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.style.display = 'none');
        
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(input => input.classList.remove('error'));
        
        // Basic validation
        let isValid = true;
        
        // Name validation
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
          showError(nameInput, 'Please enter your full name');
          isValid = false;
        }
        
        // Email validation
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          showError(emailInput, 'Please enter a valid email address');
          isValid = false;
        }
        
        // Phone validation
        const phoneInput = document.getElementById('phone');
        if (!phoneInput.value.trim() || phoneInput.value.trim().length < 10) {
          showError(phoneInput, 'Please enter a valid phone number');
          isValid = false;
        }
        
        // Date validation
        const dateInput = document.getElementById('date');
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (!dateInput.value || selectedDate < today) {
          showError(dateInput, 'Please select a future date');
          isValid = false;
        }
        
        // Time validation
        const timeInput = document.getElementById('time');
        if (!timeInput.value) {
          showError(timeInput, 'Please select a time');
          isValid = false;
        }
        
        // Guests validation
        const guestsInput = document.getElementById('guests');
        if (!guestsInput.value || guestsInput.value < 1 || guestsInput.value > 20) {
          showError(guestsInput, 'Please enter a number between 1 and 20');
          isValid = false;
        }
        
        // If valid, submit the form or show success message
        if (isValid) {
          // Here you would typically send the data to your server
          // For demonstration, we'll just show a success message
          showSuccessMessage();
          bookingForm.reset();
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            const successMessage = document.querySelector('.success-message');
            if (successMessage) {
              successMessage.style.display = 'none';
            }
          }, 5000);
        }
      });
    }
    
    // Function to show error messages
    function showError(input, message) {
      input.classList.add('error');
      
      // Check if error message element exists, create if not
      let errorElement = input.parentElement.querySelector('.error-message');
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentElement.appendChild(errorElement);
      }
      
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    
    // Function to show success message
    function showSuccessMessage() {
      // Check if success message exists, create if not
      let successElement = bookingForm.querySelector('.success-message');
      if (!successElement) {
        successElement = document.createElement('div');
        successElement.className = 'success-message';
        bookingForm.prepend(successElement);
      }
      
      successElement.textContent = 'Reservation request sent successfully! We will contact you shortly to confirm your booking.';
      successElement.style.display = 'block';
      
      // Smooth scroll to the success message
      successElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Add smooth date selection with a date picker enhancement
    // This is a simplified version, you might want to use a library like flatpickr for production
    const dateInput = document.getElementById('date');
    if (dateInput) {
      // Set minimum date to today
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      const todayStr = yyyy + '-' + mm + '-' + dd;
      
      dateInput.min = todayStr;
      
      // Set maximum date to 3 months from now
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      const maxDD = String(maxDate.getDate()).padStart(2, '0');
      const maxMM = String(maxDate.getMonth() + 1).padStart(2, '0');
      const maxYYYY = maxDate.getFullYear();
      const maxDateStr = maxYYYY + '-' + maxMM + '-' + maxDD;
      
      dateInput.max = maxDateStr;
    }
    
    // Add time validation for business hours (e.g., 10 AM to 10 PM)
    const timeInput = document.getElementById('time');
    if (timeInput) {
      timeInput.addEventListener('change', function() {
        const selectedTime = this.value;
        const [hours, minutes] = selectedTime.split(':').map(Number);
        
        // Assuming business hours are 10 AM to 10 PM
        if (hours < 10 || hours >= 22) {
          showError(timeInput, 'Please select a time between 10:00 AM and 10:00 PM');
          this.value = ''; // Reset the time
        } else {
          // Clear error if previously shown
          timeInput.classList.remove('error');
          const errorElement = timeInput.parentElement.querySelector('.error-message');
          if (errorElement) {
            errorElement.style.display = 'none';
          }
        }
      });
    }
    
    // Add nice focus effects
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(input => {
      // Add floating label effect
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });
      
      // Check initial state (useful if browser autofills the fields)
      if (input.value) {
        input.parentElement.classList.add('focused');
      }
    });
  });
  
  // Theme support - sync with system theme if used
  function syncThemeWithSystem() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }
  
  // Call on page load
  syncThemeWithSystem();
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncThemeWithSystem);