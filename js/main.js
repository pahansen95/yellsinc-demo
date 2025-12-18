/**
 * YELLS, Inc. Website JavaScript
 * Youth Empowerment through Learning, Leading, & Serving
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNavigation();
        initSmoothScrolling();
        initContactForm();
    });

    /**
     * Mobile Navigation Toggle
     */
    function initMobileNavigation() {
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('nav__menu--open');

            // Update toggle button text
            navToggle.innerHTML = isExpanded ? '&#9776;' : '&#10005;';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('nav__menu--open');
                navToggle.innerHTML = '&#9776;';
            }
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('nav__menu--open');
                navToggle.innerHTML = '&#9776;';
            }
        });
    }

    /**
     * Smooth Scrolling for Anchor Links
     */
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');

                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    event.preventDefault();

                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without scrolling
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    /**
     * Contact Form Handler
     */
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');

        if (!contactForm) return;

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach(function(value, key) {
                data[key] = value;
            });

            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(data.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (replace with actual form handler)
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();

            // In production, you would send the data to a server:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
        });
    }

    /**
     * Show Form Message
     */
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = 'form-message form-message--' + type;
        messageEl.textContent = message;
        messageEl.style.cssText = 'padding: 1rem; margin-bottom: 1rem; border-radius: 4px;';

        if (type === 'success') {
            messageEl.style.backgroundColor = '#d4edda';
            messageEl.style.color = '#155724';
            messageEl.style.border = '1px solid #c3e6cb';
        } else {
            messageEl.style.backgroundColor = '#f8d7da';
            messageEl.style.color = '#721c24';
            messageEl.style.border = '1px solid #f5c6cb';
        }

        // Insert message before form
        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(messageEl, form);

        // Auto-remove success message after 5 seconds
        if (type === 'success') {
            setTimeout(function() {
                messageEl.remove();
            }, 5000);
        }
    }

    /**
     * Email Validation
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Newsletter Form (if present)
     */
    const newsletterForms = document.querySelectorAll('form:not(#contact-form)');
    newsletterForms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');

            if (emailInput && emailInput.value) {
                if (isValidEmail(emailInput.value)) {
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            }
        });
    });

})();
