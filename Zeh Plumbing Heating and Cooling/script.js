/* ========================================
   ZEH PLUMBING HEATING AND COOLING
   JavaScript Functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close mobile nav when clicking a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
    
    // ==========================================
    // STICKY HEADER EFFECT
    // ==========================================
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // FORM HANDLING
    // ==========================================
    const quoteForm = document.getElementById('quoteForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const zipcode = document.getElementById('zipcode').value.trim();
            
            // Basic validation
            if (!name || !phone || !service || !zipcode) {
                showFormError('Please fill in all fields.');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\d\s\-\(\)\.+]{10,}$/;
            if (!phoneRegex.test(phone)) {
                showFormError('Please enter a valid phone number.');
                return;
            }
            
            // Zipcode validation (basic US format)
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(zipcode)) {
                showFormError('Please enter a valid 5-digit zip code.');
                return;
            }
            
            // Simulate form submission (in production, this would send to a server)
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Reset form
                quoteForm.reset();
                
                // Show success modal
                if (successModal) {
                    successModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                
                // Log form data (for demo purposes)
                console.log('Form submitted:', { name, phone, service, zipcode });
            }, 1500);
        });
    }
    
    // Close modal
    if (closeModal && successModal) {
        closeModal.addEventListener('click', function() {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close on overlay click
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                successModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Form error display
    function showFormError(message) {
        // Remove existing error if any
        const existingError = quoteForm.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = `
            background: #fee;
            color: #c00;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // Insert at top of form
        quoteForm.insertBefore(errorDiv, quoteForm.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            errorDiv.remove();
        }, 5000);
    }
    
    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .difference-card, .review-card, .stat-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .service-card.visible,
        .difference-card.visible,
        .review-card.visible,
        .stat-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // PHONE NUMBER FORMATTING
    // ==========================================
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 10) {
                value = value.substring(0, 10);
                value = `(${value.substring(0,3)}) ${value.substring(3,6)}-${value.substring(6,10)}`;
            } else if (value.length >= 6) {
                value = `(${value.substring(0,3)}) ${value.substring(3,6)}-${value.substring(6)}`;
            } else if (value.length >= 3) {
                value = `(${value.substring(0,3)}) ${value.substring(3)}`;
            }
            
            e.target.value = value;
        });
    }
    
    // ==========================================
    // SERVICE CARD CLICK HANDLER
    // ==========================================
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceSelect = document.getElementById('service');
    
    serviceCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.btn');
        
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function(e) {
                // Get the service type from the card
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                
                // Map card titles to select values
                const serviceMap = {
                    'plumbing': 'plumbing',
                    'heating': 'heating',
                    'cooling': 'cooling'
                };
                
                // Pre-select the service in the form
                if (serviceSelect && serviceMap[cardTitle]) {
                    serviceSelect.value = serviceMap[cardTitle];
                }
            });
        }
    });
    
    // ==========================================
    // INITIALIZE
    // ==========================================
    console.log('Zeh Plumbing Heating and Cooling website loaded successfully!');
});
