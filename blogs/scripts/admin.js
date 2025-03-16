document.addEventListener("DOMContentLoaded", function() {
    loadComments();

    document.getElementById("submit-btn").addEventListener("click", function() {
        submitChanges();
    });
});

// ✅ Load Pending Comments
async function loadComments() {
    const container = document.getElementById("pending-comments");
    container.innerHTML = "<p>Loading comments...</p>";

    try {
        const response = await fetch("https://comment.sujay-m-1194.workers.dev/pending");
        if (!response.ok) throw new Error("Failed to load comments");

        const comments = await response.json();
        container.innerHTML = "";

        if (comments.length === 0) {
            container.innerHTML = "<p>No pending comments.</p>";
            return;
        }

        comments.forEach((comment, index) => {
            const commentBox = document.createElement("div");
            commentBox.classList.add("comment-box");

            commentBox.innerHTML = `
                <p class="comment-text"><strong>${comment.name}:</strong> ${comment.comment}</p>
                <input type="text" class="reply-input" placeholder="Reply (optional)" id="reply-${index}">
                <button class="approve-btn" onclick="approveComment(${index})">Approve</button>
                <button class="reject-btn" onclick="rejectComment(${index})">Reject</button>
            `;

            container.appendChild(commentBox);
        });
    } catch (error) {
        container.innerHTML = `<p style="color: red;">Error loading comments: ${error.message}</p>`;
    }
}

// ✅ Approve a Comment
async function approveComment(index) {
    const replyInput = document.getElementById(`reply-${index}`).value;

    try {
        const response = await fetch("https://comment.sujay-m-1194.workers.dev/approve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index, reply: replyInput })
        });

        if (!response.ok) throw new Error("Failed to approve comment");

        alert("Comment Approved!");
        loadComments(); // Reload comments after approval
    } catch (error) {
        alert("Error approving comment: " + error.message);
    }
}

// ✅ Reject a Comment
async function rejectComment(index) {
    try {
        const response = await fetch("https://comment.sujay-m-1194.workers.dev/reject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index })
        });

        if (!response.ok) throw new Error("Failed to reject comment");

        alert("Comment Rejected!");
        loadComments(); // Reload comments after rejection
    } catch (error) {
        alert("Error rejecting comment: " + error.message);
    }
}

// ✅ Submit all changes (optional)
async function submitChanges() {
    alert("All changes submitted successfully!");
    loadComments(); // Refresh the comment list
}
