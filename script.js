// Initialize Lucide Icons
lucide.createIcons();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(3, 7, 18, 0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(3, 7, 18, 0.5)';
        navbar.style.boxShadow = 'none';
    }
});

// Simple animation for elements coming into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles and observe
document.querySelectorAll('.sector-card, .price-card, .section-header, .testimonial-card, .accordion-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// FAQ Accordion Logic
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        // Close all other accordions
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open the clicked one if it wasn't active
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// AJAX Form Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando... <i data-lucide="loader" class="spin"></i>';
        submitBtn.disabled = true;
        lucide.createIcons();
        
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                contactForm.style.display = 'none';
                formMessage.className = 'form-message success';
                formMessage.innerHTML = '¡Solicitud enviada con éxito!<br>Revisa tu bandeja de entrada (o carpeta de Spam) para el correo de confirmación.';
                formMessage.style.display = 'block';
            } else {
                throw new Error('Network response was not ok.');
            }
        }).catch(error => {
            formMessage.className = 'form-message error';
            formMessage.innerHTML = 'Hubo un error al enviar la solicitud. Por favor intenta de nuevo.';
            formMessage.style.display = 'block';
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}
