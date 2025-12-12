// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Language Toggle
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'pt';

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');

        if (lang !== currentLang) {
            currentLang = lang;

            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content
            updateLanguage(lang);

            // Store preference
            localStorage.setItem('preferredLanguage', lang);
        }
    });
});

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-pt][data-en]');

    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.innerHTML = text;
            }
        }
    });
}

// Load saved language preference
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');

    if (savedLang && savedLang !== 'pt') {
        const langBtn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
        if (langBtn) {
            langButtons.forEach(b => b.classList.remove('active'));
            langBtn.classList.add('active');
            currentLang = savedLang;
            updateLanguage(savedLang);
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
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
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// Animation on scroll
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

// Observe elements for animation
window.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.category-card, .portfolio-item, .about-content');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
