document.addEventListener('DOMContentLoaded', () => {
    console.log('HTML project loaded');
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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

