const WORKER_URL = "https://comment.sujay-m-1194.workers.dev";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("commentForm");
    const commentsList = document.getElementById("commentsList");
    const messageBox = document.getElementById("message");

    async function loadComments() {
        try {
            const response = await fetch(WORKER_URL + "/approved", { mode: "cors" });
            if (!response.ok) throw new Error("Failed to fetch comments");

            const comments = await response.json();
            commentsList.innerHTML = "";

            comments.forEach(comment => {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment-entry");
                commentElement.innerHTML = `
                    <strong>${comment.name}</strong> // 
                    <p>${comment.comment}</p>
                    <small>${new Date(comment.timestamp).toLocaleString()}</small>
                `;
                commentsList.appendChild(commentElement);
            });
        } catch (error) {
            console.error("Error loading comments:", error);
        }
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
                name: document.getElementById("full-name").value.trim(), // ✅ Send exactly as entered
                email: document.getElementById("email").value.trim(),
                comment: document.getElementById("comment").value.trim()
            };


        try {
            const response = await fetch(WORKER_URL + "/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                mode: "cors", // ✅ FIXED: Added CORS mode
                body: JSON.stringify(data)
            });

            if (response.ok) {
                messageBox.innerHTML = "<p style='color: green;'>✅ Comment submitted for review.</p>";
                form.reset();
            } else {
                messageBox.innerHTML = "<p style='color: red;'>❌ Failed to submit!</p>";
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    });

    loadComments();
});
