document.addEventListener("DOMContentLoaded", function () {
    let socialBar = document.getElementById("socialBar");
    let footer = document.querySelector("footer"); // Make sure this matches your actual footer tag/class

    function checkFooterVisibility() {
        let footerRect = footer.getBoundingClientRect();
        let windowHeight = window.innerHeight;

        if (footerRect.top <= windowHeight) {
            // Footer is visible, hide the social bar
            socialBar.style.opacity = "0";
            socialBar.style.visibility = "hidden";
        } else {
            // Footer is not in view, show the social bar
            socialBar.style.opacity = "1";
            socialBar.style.visibility = "visible";
        }
    }

    // Listen for scroll events
    window.addEventListener("scroll", checkFooterVisibility);

    // Initial check when the page loads
    checkFooterVisibility();
});
