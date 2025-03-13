document.addEventListener("DOMContentLoaded", function () {
    // ✅ Fix: Merging multiple event listeners into one
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
        });
    }

    // ✅ Timed Popup Model - Shows After 10 Sec, Disappears After Countdown
    setTimeout(() => {
        let timedBox = document.createElement("div");
        timedBox.id = "timed-subscribe-box";
        timedBox.innerHTML = `
            <h3>✉ Stay Updated</h3>
            <form action="https://outlook.us19.list-manage.com/subscribe/post?u=7f3d305e9a28d7d8f98ef6a6a&id=d96bc5a23f" method="POST" target="_blank">
                <input type="email" name="EMAIL" placeholder="Enter your email" required>
                <button type="submit">Subscribe</button>
            </form>
            <span id="timed-close" onclick="document.getElementById('timed-subscribe-box').remove()">✖</span>
        `;
        document.body.appendChild(timedBox);

        // ✅ Remove after 10-second countdown
        setTimeout(() => {
            let countdown = 10;
            let interval = setInterval(() => {
                countdown--;
                if (countdown === 0) {
                    timedBox.remove();
                    clearInterval(interval);
                }
            }, 1000);
        }, 4000);
    }, 10000);

    // ✅ Load Expandable Subscribe Box & Attach Events Properly
    fetch('/subscribe-box.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
            console.log("Subscribe box loaded!");
            attachSubscribeBoxEvents(); // ✅ Attach events only after loading
        })
        .catch(error => console.error('Error loading subscribe box:', error));

    // ✅ Ensure toggle function is globally accessible
    window.toggleSubscribeBox = function () {
        let box = document.getElementById("subscribe-box");
        if (box) {
            box.style.display = (box.style.display === "block") ? "none" : "block";
        }
    };

    // ✅ Attach events to Subscribe Box Elements
    function attachSubscribeBoxEvents() {
        let minimizeButton = document.getElementById("subscribe-minimized");
        let closeButton = document.getElementById("close-subscribe");

        if (minimizeButton) {
            minimizeButton.addEventListener("click", toggleSubscribeBox);
        }

        if (closeButton) {
            closeButton.addEventListener("click", toggleSubscribeBox);
        }
    }
});
