/**
 * Citadel Creative - Script
 * Handles smooth scrolling and subtle reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.section, .service-card, .product-text, .product-visual');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // --- Scroll Indicator Fade ---
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                scrollIndicator.classList.add('fade-out');
            } else {
                scrollIndicator.classList.remove('fade-out');
            }
        });
    }

    // --- Hexagon Scroll Rotation (GSAP ScrollTrigger) ---
    // Only run on larger screens where hexagon is visible
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && window.innerWidth > 900) {
        gsap.registerPlugin(ScrollTrigger);

        const hexFrame = document.querySelector('.hex-frame');
        if (hexFrame) {
            // Count main content sections for rotation calculation
            const sections = document.querySelectorAll('.hero, .section');
            const totalRotation = (sections.length - 1) * 60; // 60° per section transition

            gsap.to('.hex-frame', {
                rotation: totalRotation,
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5, // Smooth 1.5-second lag for silky feel
                }
            });
        }
    }
});
