/* ===================================
   CITADEL - Interactive Scripts
   Smooth animations & background nodes
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Create animated background nodes
    createBackgroundNodes();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Intersection Observer for scroll animations
    initScrollAnimations();

    // Dynamic header logic
    initDynamicHeader();
});

/**
 * Handles header visibility and internal animations on scroll
 */
function initDynamicHeader() {
    const nav = document.getElementById('stickyNav');
    const pricingBtn = document.querySelector('.nav-pricing');

    if (!nav || !pricingBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            nav.classList.remove('nav-scroll-hidden');
            nav.classList.add('nav-centered');
            pricingBtn.classList.add('show');
        } else {
            nav.classList.add('nav-scroll-hidden');
            nav.classList.remove('nav-centered');
            pricingBtn.classList.remove('show');
        }
    });
}

/**
 * Creates floating node particles in the background
 */
function createBackgroundNodes() {
    const container = document.getElementById('bgNodes');
    if (!container) return;

    const nodeCount = 15;

    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'bg-node';

        // Random position
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;

        // Random animation delay
        node.style.animationDelay = `${Math.random() * 3}s`;

        // Random rotation for the connecting line
        const rotation = Math.random() * 360;
        node.style.setProperty('--rotation', `${rotation}deg`);

        container.appendChild(node);
    }

    // Add connecting lines between nearby nodes
    addNodeConnections(container);
}

/**
 * Draws SVG lines between nearby background nodes
 */
function addNodeConnections(container) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
    container.appendChild(svg);

    const nodes = container.querySelectorAll('.bg-node');
    const positions = Array.from(nodes).map(node => ({
        x: Number.parseFloat(node.style.left),
        y: Number.parseFloat(node.style.top)
    }));

    // Connect nodes that are within 30% distance of each other
    positions.forEach((pos1, i) => {
        positions.forEach((pos2, j) => {
            if (i >= j) return;

            const distance = Math.sqrt(
                Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
            );

            if (distance < 30) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', `${pos1.x}%`);
                line.setAttribute('y1', `${pos1.y}%`);
                line.setAttribute('x2', `${pos2.x}%`);
                line.setAttribute('y2', `${pos2.y}%`);
                line.style.cssText = 'stroke: rgba(16, 185, 129, 0.15); stroke-width: 1;';
                svg.appendChild(line);
            }
        });
    });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
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
}

/**
 * Intersection Observer for scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animateElements = document.querySelectorAll(
        '.problem-card, .step, .included-card, .pricing-card'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Add CSS for animated-in state
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
