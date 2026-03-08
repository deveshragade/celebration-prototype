/**
 * Celebration Clothing Store - Landing Page Scripts
 * Smooth scrolling, scroll animations, and mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initMobileMenu();
    initScrollAnimations();
    initHeroFadeIn();
});

/**
 * Smooth scroll for navigation links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Close mobile menu if open
                const mobileNav = document.getElementById('mobile-nav');
                if (mobileNav && mobileNav.classList.contains('block')) {
                    mobileNav.classList.add('hidden');
                }
            }
        });
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });
    }
}

/**
 * Intersection Observer for scroll-triggered animations
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const galleryItems = document.querySelectorAll('.gallery-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                entry.target.classList.add('visible');
            }
        });
    }, { ...observerOptions, threshold: 0.05 });

    fadeElements.forEach(el => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    galleryItems.forEach(el => {
        galleryObserver.observe(el);
    });
}

/**
 * Hero section text fade-in on load
 */
function initHeroFadeIn() {
    const heroHeadline = document.querySelector('#home h1');
    const heroSubheadline = document.querySelector('#home p');

    if (heroHeadline) {
        heroHeadline.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
        setTimeout(() => heroHeadline.classList.add('visible'), 100);
    }
    if (heroSubheadline) {
        heroSubheadline.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
        setTimeout(() => heroSubheadline.classList.add('visible'), 400);
    }
}
