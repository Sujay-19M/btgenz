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
            container.innerHTML = "<p class='no-comments'>No pending comments.</p>";
            return;
        }

        comments.forEach((comment, index) => {
            const commentBox = document.createElement("div");
            commentBox.classList.add("comment-box");

            commentBox.innerHTML = `
                <div class="comment-header">
                    <p class="comment-text"><strong>${comment.name}:</strong> ${comment.comment}</p>
                </div>
                <input type="text" class="reply-input" placeholder="Reply (optional)" id="reply-${index}">
                <div class="button-group">
                    <button class="approve-btn" onclick="approveComment(${index})">Approve</button>
                    <button class="reject-btn" onclick="rejectComment(${index})">Reject</button>
                </div>
            `;

            container.appendChild(commentBox);
        });
    } catch (error) {
        container.innerHTML = `<p class="error-message">Error loading comments: ${error.message}</p>`;
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
        loadComments();
    } catch (error) {
        alert("Error approving comment: " + error.message);
    }
}

// ✅ Reject a Comment
async function rejectComment(index) {
    try {
        const comments = await fetch("https://comment.sujay-m-1194.workers.dev/pending").then(res => res.json());
        const commentId = comments[index]?.id; // ✅ Get the actual comment ID

        if (!commentId) throw new Error("Comment ID not found");

        const response = await fetch("https://comment.sujay-m-1194.workers.dev/reject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: commentId }) // ✅ Send correct `id`
        });

        if (!response.ok) throw new Error("Failed to reject comment");

        alert("Comment Rejected!");
        loadComments();
    } catch (error) {
        alert("Error rejecting comment: " + error.message);
    }
}


// ✅ Submit all changes
async function submitChanges() {
    alert("All changes submitted successfully!");
    loadComments();
}
