const WORKER_URL = "https://comment.sujay-m-1194.workers.dev";

// ✅ Wrap fetch in an async function
async function loadComments() {
    try {
        const response = await fetch(WORKER_URL.replace(/\/$/, "") + "/approved", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) throw new Error("Failed to fetch comments");

        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error("Error loading comments:", error);
    }
}

// ✅ Function to display comments
function displayComments(comments) {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = ""; // Clear previous comments

    if (comments.length === 0) {
        commentsList.innerHTML = "<p>No comments yet.</p>";
        return;
    }

    comments.forEach(comment => {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");
        commentItem.innerHTML = `
            <p><strong>${comment.name}</strong> (${new Date(comment.timestamp).toLocaleString()})</p>
            <p>${comment.comment}</p>
        `;
        commentsList.appendChild(commentItem);
    });
}

// ✅ Load comments on page load
document.addEventListener("DOMContentLoaded", loadComments);
