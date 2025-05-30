// Set current year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

// Function to open mobile menu
function openMobileMenu() {
    mobileMenu.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
}

// Function to close mobile menu
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    body.style.overflow = ''; // Restore scrolling
}

// Event listeners
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking outside of it
document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
    
    if (mobileMenu.classList.contains('active') && !isClickInsideMenu && !isClickOnMenuBtn) {
        closeMobileMenu();
    }
});

// Add scroll animation for sections
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .testimonial-card, .section-header');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .testimonial-card, .section-header');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation once on page load
    setTimeout(animateOnScroll, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbwanzoI7bS_n99EbtYHmsg57ErlM8_Ofs9NGnZfkh0dOwD9V8tHdtYDekzGZrIPy820gw/exec';
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let isValid = true;

        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        if (!name || name.length < 2) {
            document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            isValid = false;
        }

        if (!message || message.length < 10) {
            document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }

        if (isValid) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    if (response.ok) {
                        const formContainer = document.querySelector('.contact-form-container');
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.innerHTML = `
                            <i class="fas fa-check-circle"></i>
                            <h3>Message Sent!</h3>
                            <p>Thank you for your message! We will get back to you soon.</p>
                            <button class="btn btn-accent" id="send-another">Send Another Message</button>
                        `;
                        formContainer.innerHTML = '';
                        formContainer.appendChild(successMessage);

                        document.getElementById('send-another').addEventListener('click', function () {
                            formContainer.innerHTML = '';
                            formContainer.appendChild(contactForm);
                            contactForm.reset();
                        });
                    } else {
                        alert("Failed to send the message. Please try again.");
                    }
                })
                .catch(error => {
                    console.error('Error!', error.message);
                });
        }
    });
}


