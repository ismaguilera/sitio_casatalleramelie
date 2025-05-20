document.addEventListener('DOMContentLoaded', () => {
    console.log('HTML project loaded');
    document.getElementById('year').textContent = new Date().getFullYear();
});

