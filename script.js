// script.js
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
});
