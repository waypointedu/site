// ====================================
// WAYPOINT INSTITUTE - MAIN JAVASCRIPT
// GitHub Pages compatible, vanilla JS
// ====================================

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearSpans = document.querySelectorAll('#year');
    yearSpans.forEach(span => {
        span.textContent = new Date().getFullYear();
    });
});

// ====================================
// HEADER / NAVIGATION SANITY CHECKS
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const headers = Array.from(document.querySelectorAll('.site-header'));

    headers.forEach(header => {
        const navs = Array.from(header.querySelectorAll('.main-nav'));

        navs.forEach(nav => {
            const links = Array.from(nav.querySelectorAll('a'));
            const hasBrokenAttributes = Boolean(nav.querySelector('[href__]'));
            const invalidLinks = links.filter(link => !link.hasAttribute('href') || link.getAttribute('href').trim() === '');

            if (hasBrokenAttributes || (links.length > 0 && invalidLinks.length === links.length)) {
                const headerContainer = nav.closest('.site-header');
                if (headerContainer) {
                    headerContainer.remove();
                } else {
                    nav.remove();
                }
            }
        });
    });

    const remainingHeaders = Array.from(document.querySelectorAll('.site-header'));
    if (remainingHeaders.length > 1) {
        remainingHeaders.slice(1).forEach(header => header.remove());
    }
});

// ====================================
// MOBILE MENU TOGGLE
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        const setNavState = (open) => {
            menuToggle.setAttribute('aria-expanded', open);
            mainNav.classList.toggle('active', open);
            mainNav.setAttribute('aria-hidden', (!open).toString());
        };

        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            setNavState(!isExpanded);
        });

        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    setNavState(false);
                }
            });
        });

        if (window.innerWidth <= 900) {
            mainNav.setAttribute('aria-hidden', 'true');
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                setNavState(false);
                mainNav.removeAttribute('aria-hidden');
            } else if (menuToggle.getAttribute('aria-expanded') !== 'true') {
                mainNav.setAttribute('aria-hidden', 'true');
            }
        });
    }
});

// ====================================
// HEADER SEARCH TOGGLE
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.querySelector('.utility-search');
    const searchPanel = document.getElementById('site-search-panel');
    const searchClose = searchPanel ? searchPanel.querySelector('.search-close') : null;
    const searchInput = searchPanel ? searchPanel.querySelector('.search-input') : null;

    if (searchToggle && searchPanel) {
        const setSearchState = (open) => {
            searchToggle.setAttribute('aria-expanded', open);
            searchPanel.classList.toggle('active', open);
            searchPanel.setAttribute('aria-hidden', (!open).toString());
            if (open && searchInput) {
                setTimeout(() => searchInput.focus(), 60);
            }
        };

        searchToggle.addEventListener('click', () => {
            const isExpanded = searchToggle.getAttribute('aria-expanded') === 'true';
            setSearchState(!isExpanded);
        });

        if (searchClose) {
            searchClose.addEventListener('click', () => setSearchState(false));
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setSearchState(false);
            }
        });

        document.addEventListener('click', (event) => {
            if (!searchPanel.classList.contains('active')) {
                return;
            }

            const clickTarget = event.target;
            if (searchPanel.contains(clickTarget) || searchToggle.contains(clickTarget)) {
                return;
            }

            setSearchState(false);
        });
    }
});

// ====================================
// FAQ ACCORDION
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.parentElement.querySelector('.faq-answer');

            // Close all other answers
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.setAttribute('aria-expanded', 'false');
                    const otherAnswer = q.parentElement.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                }
            });

            // Toggle current answer
            this.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
});

// ====================================
// CERTIFICATE VERIFICATION (DEMO)
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const verifyForm = document.getElementById('verify-form');
    const resultDiv = document.getElementById('verify-result');

    if (verifyForm && resultDiv) {
        verifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const certId = document.getElementById('cert-id').value.trim();
            
            // TODO: In production, this would query a real database or JSON file
            // For now, we'll simulate with a mock dataset
            const mockCertificates = {
                'WPT-2025-AB123': {
                    course: 'Biblical Theology I: Scripture, Canon, and Interpretation',
                    date: 'January 15, 2025',
                    cohort: 'Winter 2025 Cohort A'
                },
                'WPT-2025-CD456': {
                    course: 'Christian Doctrine I: Creed, Trinity, Christology',
                    date: 'February 10, 2025',
                    cohort: 'Winter 2025 Cohort B'
                },
                'WPT-2025-EF789': {
                    course: 'Apologetics for Restricted Contexts',
                    date: 'March 5, 2025',
                    cohort: 'Secure Cohort 1'
                }
            };

            const certificate = mockCertificates[certId];

            if (certificate) {
                resultDiv.innerHTML = `
                    <h3 style="color: var(--accent);">✓ Certificate Verified</h3>
                    <p><strong>Course:</strong> ${certificate.course}</p>
                    <p><strong>Completion Date:</strong> ${certificate.date}</p>
                    <p><strong>Cohort:</strong> ${certificate.cohort}</p>
                    <p style="margin-top: 1rem; color: var(--gray-600);"><small>For privacy, student names are not displayed. This certificate is authentic and issued by Waypoint Academy.</small></p>
                `;
                resultDiv.className = 'verify-result verify-success';
            } else {
                resultDiv.innerHTML = `
                    <h3 style="color: #DC2626;">✗ Certificate Not Found</h3>
                    <p>The certificate ID <strong>${certId}</strong> was not found in our records.</p>
                    <p style="margin-top: 1rem;">Please check the ID and try again. If you believe this is an error, <a href="contact.html">contact us</a>.</p>
                `;
                resultDiv.className = 'verify-result verify-error';
            }

            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
});

// ====================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#privacy' && href !== '#conduct') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ====================================
// FORM MICRO-INTERACTIONS
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const fields = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

    fields.forEach(field => {
        const group = field.closest('.form-group');
        if (!group) {
            return;
        }

        const syncValueState = () => {
            if (field.value && field.value.trim().length > 0) {
                group.classList.add('has-value');
            } else {
                group.classList.remove('has-value');
            }
        };

        field.addEventListener('focus', () => {
            group.classList.add('is-focused');
        });

        field.addEventListener('blur', () => {
            group.classList.remove('is-focused');
            syncValueState();
        });

        field.addEventListener('input', syncValueState);

        // Initialize state for pre-filled values
        syncValueState();
    });
});

// ====================================
// SCROLL REVEAL ANIMATIONS
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const revealSelector = [
        'section',
        '.hero',
        '.page-hero',
        '.program-card',
        '.course-card',
        '.faculty-card',
        '.leader-feature',
        '.tier-card',
        '.login-card',
        '.login-help',
        '.verify-info',
        '.verify-result',
        '.contact-col',
        '.contact-form',
        '.faq-item',
        '.footer-grid > *',
        '.cta-row .btn',
        '.hero-actions .btn'
    ].join(', ');

    const revealTargets = document.querySelectorAll(revealSelector);

    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach(target => target.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    });

    revealTargets.forEach(target => {
        target.classList.add('reveal-on-scroll');
        observer.observe(target);
    });
});

// ====================================
// SCROLL PROGRESS BAR
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.scroll-progress')) {
        return;
    }

    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progressBar);

    const updateProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    updateProgress();

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
});

// ====================================
// POINTER-AWARE CARDS
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const pointerTargets = document.querySelectorAll('.program-card, .course-card, .faculty-card, .leader-feature, .tier-card, .login-card, .login-help, .verify-info, .faq-item');

    const handlePointerMove = event => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        target.style.setProperty('--mouse-x', `${x}%`);
        target.style.setProperty('--mouse-y', `${y}%`);
    };

    const resetPointer = event => {
        const target = event.currentTarget;
        target.style.removeProperty('--mouse-x');
        target.style.removeProperty('--mouse-y');
    };

    pointerTargets.forEach(target => {
        target.addEventListener('pointermove', handlePointerMove);
        target.addEventListener('pointerleave', resetPointer);
    });
});
