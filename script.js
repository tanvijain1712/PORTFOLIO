document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Check if device supports hover (mouse/trackpad)
    if (window.matchMedia("(hover: hover)").matches) {
        document.body.classList.add('custom-cursor-active');
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Little delay for the outline to make it feel smooth
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect to links and buttons
        const hoverables = document.querySelectorAll('a, button, .project-card, .skill-category, .achievement-item');

        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.style.display === 'flex' && window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isMenuOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isMenuOpen ? 'none' : 'flex';

            if (!isMenuOpen) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '30px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                navLinks.style.alignItems = 'center';
                navLinks.style.zIndex = '999';
            }
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Fade In Animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                entry.target.classList.add('visible'); // For section title underline
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Apply fade-in class to elements we want to animate
    const animateElements = document.querySelectorAll('section, .project-card, .skill-category, .achievement-item, .timeline-item');

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');

        // Add stagger delay to grid items if they are siblings
        if (el.classList.contains('project-card') || el.classList.contains('skill-category')) {
            // Logic could be added here for automatic staggering based on index
            // For simplicity, CSS can handle basic delays or we rely on natural scroll
        }

        observer.observe(el);
    });
});
