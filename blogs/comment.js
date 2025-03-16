const WORKER_URL = "https://comment.sujay-m-1194.workers.dev/"; // Replace with your actual Worker URL

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("commentForm");
    const commentsList = document.getElementById("commentsList");
    const messageBox = document.getElementById("message");

    async function loadComments() {
        try {
            const response = await fetch(WORKER_URL + "/approved");
            const comments = await response.json();
            
            commentsList.innerHTML = ""; // Clear old comments

            comments.forEach(comment => {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment-entry");

                commentElement.innerHTML = 
                    <strong>${comment.name || "Anonymous"}</strong>
                    <p>${comment.comment}</p>
                    <small>${new Date(comment.timestamp).toLocaleString()}</small>
                ;
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
            full_name: formData.get("full_name"),
            email: formData.get("email"),
            comment: formData.get("comment"),
            hide_info: formData.get("hide_info") ? true : false
        };

        try {
            const response = await fetch(WORKER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                messageBox.innerHTML = "<p style='color: green;'>âœ… Comment submitted for review.</p>";
                form.reset();
            } else {
                messageBox.innerHTML = "<p style='color: red;'>âŒ Failed to submit!</p>";
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    });

    loadComments();
});
