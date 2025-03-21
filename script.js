// Execute after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change styles when menu is activated
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '60px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--primary-dark)';
                navLinks.style.padding = '20px';
                navLinks.style.zIndex = '999';
                
                // Apply styles to each link
                const links = navLinks.querySelectorAll('li');
                links.forEach(link => {
                    link.style.margin = '10px 0';
                });
            } else {
                navLinks.style.display = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.right = '';
                navLinks.style.backgroundColor = '';
                navLinks.style.padding = '';
                navLinks.style.zIndex = '';
            }
        });
    }
    
    // Navigation scroll effect
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close menu if it's active
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navLinks.style.display = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.right = '';
                navLinks.style.backgroundColor = '';
                navLinks.style.padding = '';
                navLinks.style.zIndex = '';
            }
            
            // Scroll smoothly to the section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation effect on scroll
    const fadeElements = document.querySelectorAll('.skill-card, .reason, .step');
    
    // Function to check if element is visible in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Scroll event handler
    function handleScroll() {
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial setup
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Register scroll event
    window.addEventListener('scroll', handleScroll);
    
    // Call once on page load
    handleScroll();
    
    // Contact form submission
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.querySelector('#user_name');
            const emailInput = document.querySelector('#user_email');
            const messageInput = document.querySelector('#message');
            
            // Simple form validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }
            
            // Collect form data
            const formData = {
                from_name: nameInput.value,
                from_email: emailInput.value,
                message: messageInput.value
            };
            
            // Display loading message
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Send email using EmailJS
            emailjs.send('service_9q9tu5g', 'template_fs92ir9', formData)
                .then(function(response) {
                    // Success message
                    alert('Your message has been sent successfully. Thank you!');
                    
                    // Reset form
                    nameInput.value = '';
                    emailInput.value = '';
                    messageInput.value = '';
                    
                    // Restore button state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                })
                .catch(function(error) {
                    // Error message
                    console.error('Email sending failed:', error);
                    alert('Failed to send the message. Please try again.');
                    
                    // Restore button state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }
}); 