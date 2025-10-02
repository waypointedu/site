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
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
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
                    <p style="margin-top: 1rem; color: var(--gray-600);"><small>For privacy, student names are not displayed. This certificate is authentic and issued by Waypoint Institute.</small></p>
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
