document.addEventListener('DOMContentLoaded', () => {
    console.log('HTML project loaded');
    if (document.getElementById('year')) {
        document.getElementById('year').textContent = new Date().getFullYear();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hrefAttribute = this.getAttribute('href');
        const targetElement = document.querySelector(hrefAttribute);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
// JavaScript to trigger animations on scroll

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
 rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add 'animate' class to elements in viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-up'); // Select elements with animation classes
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Run on page load to animate elements already in viewport
animateOnScroll();

// --- START: Read More Functionality ---
const TEXT_LENGTH_THRESHOLD = 250; // Characters

function setupReadMore() {
    const expandableParagraphs = document.querySelectorAll(
        '#nosotros .nosotros-parrafo, #nosotros ul li p, #talleres > p, .workshop-item > p:not(:last-child)' // Target specific paragraphs
    );

    expandableParagraphs.forEach(p => {
        // Ensure we're not adding buttons to already very short paragraphs or those intended for buttons
        if (p.classList.contains('cta-button') || p.classList.contains('cta-button-small')) {
            return;
        }

        const fullText = p.textContent.trim();
        if (fullText.length > TEXT_LENGTH_THRESHOLD) {
            p.classList.add('collapsed-text');

            const readMoreBtn = document.createElement('button');
            readMoreBtn.textContent = 'Leer Más';
            readMoreBtn.classList.add('read-more-btn');
            
            // Insert button after the paragraph
            p.parentNode.insertBefore(readMoreBtn, p.nextSibling);

            readMoreBtn.addEventListener('click', function() {
                const isExpanded = p.classList.toggle('expanded');
                this.textContent = isExpanded ? 'Leer Menos' : 'Leer Más';
            });
        }
    });
}

setupReadMore();
// --- END: Read More Functionality ---

