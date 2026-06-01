document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : 'auto';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // 3. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link:not(.btn-primary)');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // 4. Form Submission (Redirect to WhatsApp)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const interestElement = document.getElementById('interest');
            const interestText = interestElement.options[interestElement.selectedIndex].text;
            const message = document.getElementById('message').value;
            
            // Construct WhatsApp Message
            let whatsappText = `नमस्ते अमन जी,\n\nवेबसाइट से एक नई इन्क्वायरी आई है:\n\n*नाम:* ${name}\n*फ़ोन नंबर:* ${phone}\n*रुचि:* ${interestText}\n*संदेश:* ${message}`;
            
            // Encode for URL
            const encodedText = encodeURIComponent(whatsappText);
            const whatsappNumber = "919680827311";
            
            // Open WhatsApp
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
            
            // Show alert and reset form
            alert('धन्यवाद! आपका संदेश WhatsApp पर तैयार है। कृपया सेंड (Send) बटन दबाएं।');
            contactForm.reset();
        });
    }

    // 5. Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
});
