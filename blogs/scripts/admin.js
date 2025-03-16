document.addEventListener("DOMContentLoaded", function() {
    loadComments(); // Load existing comments on page load

    // Listen for submit button click to handle form submission
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
        loadComments(); // Reload comments
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
        loadComments(); // Reload comments
    } catch (error) {
        alert("Error rejecting comment: " + error.message);
    }
}

// ✅ Submit all changes (including comment submission)
async function submitChanges() {
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;

    if (!name || !email || !comment) {
        alert("All fields are mandatory!");
        return;
    }

    const commentData = {
        name: name,
        email: email,
        comment: comment
    };

    try {
        const response = await fetch("https://comment.sujay-m-1194.workers.dev/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentData)
        });

        if (!response.ok) throw new Error("Failed to submit comment");

        alert("Comment Submitted Successfully!");
        document.getElementById("comment-form").reset(); // Reset form fields after submission
    } catch (error) {
        alert("Error submitting comment: " + error.message);
    }
}
