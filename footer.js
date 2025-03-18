document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    let socialBar = document.getElementById("socialBar");
    let footer = document.querySelector("footer"); // Detects the footer element

    function checkScroll() {
        if (!footer) return; // If no footer is found, exit

        let footerRect = footer.getBoundingClientRect(); // Get footer position
        let windowHeight = window.innerHeight;

        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Hide when the footer is visible
        if (footerRect.top < windowHeight) {
            socialBar.style.opacity = "0";
            socialBar.style.visibility = "hidden";
        } 
        // Show only if scrolling up
        else if (currentScroll < lastScrollTop) {
            socialBar.style.opacity = "1";
            socialBar.style.visibility = "visible";
        }

        lastScrollTop = currentScroll;
    }

    // Run on scroll
    window.addEventListener("scroll", checkScroll);
});
