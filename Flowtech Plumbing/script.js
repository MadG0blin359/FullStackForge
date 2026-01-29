// ===================================
// FLOW TECH PLUMBING - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking nav links
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '';
        }

        lastScroll = currentScroll;
    });

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Basic validation
            if (!data.name || !data.phone || !data.service) {
                alert('Please fill in all required fields.');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(data.phone) || data.phone.replace(/\D/g, '').length < 10) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Show success message
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');

                // Log the form data (in real app, this would be sent to server)
                console.log('Form submitted:', data);
            }, 1500);
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 6) {
                value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
            } else if (value.length >= 3) {
                value = `(${value.slice(0,3)}) ${value.slice(3)}`;
            }
            
            e.target.value = value;
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.service-card, .stat-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Add stagger delay to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger delay to stat cards
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});
