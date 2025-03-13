document.addEventListener("DOMContentLoaded", function () {
    // ✅ Fix: Merging multiple event listeners into one
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
        });
    }

