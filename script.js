// script.js
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Timed Popup Model
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
    }, 10000); // Shows after 10 sec

    // Expandable Subscribe Box Model
    fetch('/subscribe-box.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
        })
        .catch(error => console.error('Error loading subscribe box:', error));
});

function toggleSubscribeBox() {
    let box = document.getElementById("subscribe-box");
    box.style.display = (box.style.display === "block") ? "none" : "block";
}
