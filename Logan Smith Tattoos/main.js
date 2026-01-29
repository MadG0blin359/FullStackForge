/* ========================================
   Logan Smith Tattoos - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initFAQ();
    initLightbox();
    initContactForm();
});

/* ========================================
   Navbar Scroll Effect
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ========================================
   Mobile Menu Toggle
   ======================================== */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ========================================
   Smooth Scroll for Anchor Links
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Scroll Reveal Animations
   ======================================== */
function initScrollReveal() {
    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.about-grid, .portfolio-item, .service-card, .testimonial-card, ' +
        '.faq-item, .contact-info, .contact-form-wrapper, .section-header'
    );
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    // Stagger animation for grid items
    const staggerContainers = [
        { selector: '.portfolio-grid', items: '.portfolio-item' },
        { selector: '.services-grid', items: '.service-card' },
        { selector: '.testimonials-grid', items: '.testimonial-card' },
        { selector: '.faq-grid', items: '.faq-item' }
    ];
    
    staggerContainers.forEach(container => {
        const containerEl = document.querySelector(container.selector);
        if (containerEl) {
            const items = containerEl.querySelectorAll(container.items);
            items.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        }
    });
}

/* ========================================
   FAQ Accordion
   ======================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* ========================================
   Portfolio Lightbox
   ======================================== */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const portfolioZooms = document.querySelectorAll('.portfolio-zoom');
    
    // Open lightbox
    portfolioZooms.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const portfolioItem = btn.closest('.portfolio-item');
            const img = portfolioItem.querySelector('img');
            
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Also open on image click
    document.querySelectorAll('.portfolio-image img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/* ========================================
   Contact Form Handling
   ======================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const placement = form.querySelector('#placement').value;
        const idea = form.querySelector('#idea').value.trim();
        
        if (!name || !email || !placement || !idea) {
            showFormError('Please fill in all required fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        
        // Simulate form submission (since this is static)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        form.classList.add('hidden');
        formSuccess.classList.add('show');
        
        // Store submission in localStorage (for demo purposes)
        const submission = {
            name,
            email,
            phone: form.querySelector('#phone').value,
            placement,
            size: form.querySelector('#size').value,
            idea,
            newsletter: form.querySelector('#newsletter').checked,
            timestamp: new Date().toISOString()
        };
        
        const submissions = JSON.parse(localStorage.getItem('tattoo_submissions') || '[]');
        submissions.push(submission);
        localStorage.setItem('tattoo_submissions', JSON.stringify(submissions));
        
        console.log('Form submitted:', submission);
    });
    
    // Validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Error display
    function showFormError(message) {
        // Remove existing error
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = `
            background: rgba(220, 38, 38, 0.1);
            border: 1px solid rgba(220, 38, 38, 0.3);
            color: #fca5a5;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        errorDiv.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            ${message}
        `;
        
        form.insertBefore(errorDiv, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = 'rgba(220, 38, 38, 0.5)';
            } else {
                input.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
}

/* ========================================
   Parallax Effect for Hero (Optional)
   ======================================== */
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (!hero || window.innerWidth < 768) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const parallaxValue = scrolled * 0.4;
            hero.style.backgroundPositionY = `${parallaxValue}px`;
        }
    });
}

// Initialize parallax if desired
// initParallax();

/* ========================================
   Active Nav Link on Scroll
   ======================================== */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Initialize active nav link tracking
initActiveNavLink();
