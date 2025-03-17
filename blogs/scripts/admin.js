document.addEventListener("DOMContentLoaded", function () {
    loadComments();

    document.getElementById("submit-btn").addEventListener("click", submitChanges);
});

// ✅ Load and Display Pending Comments
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

        comments.forEach((comment, index) => displayComment(comment, index));
    } catch (error) {
        container.innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
    }
}

// ✅ Display Each Comment
function displayComment(comment, index) {
    const container = document.getElementById("pending-comments");
    const commentBox = document.createElement("div");
    commentBox.classList.add("comment-box");

    commentBox.innerHTML = `
        <div class="comment-header">
            <p><strong>Public Name:</strong> ${comment.name}</p>
            <p><strong>Public Email:</strong> ${comment.email}</p>
            <p><strong>Comment:</strong> ${comment.comment}</p>
            <p style="color:red;"><strong>Real Name (Admin Only):</strong> ${comment.realName}</p>
            <p style="color:red;"><strong>Real Email (Admin Only):</strong> ${comment.realEmail}</p>
        </div>
        <input type="text" class="reply-input" placeholder="Reply (optional)" id="reply-${index}">
        <div class="button-group">
            <button class="approve-btn" onclick="approveComment(${index})">Approve</button>
            <button class="reject-btn" onclick="rejectComment(${index})">Reject</button>
        </div>
    `;

    container.appendChild(commentBox);
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

        alert("✅ Comment Approved!");
        loadComments();
    } catch (error) {
        alert("❌ Error: " + error.message);
    }
}

// ✅ Reject a Comment and Remove it from UI Immediately
async function rejectComment(index) {
    try {
        const response = await fetch("https://comment.sujay-m-1194.workers.dev/reject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index })
        });

        if (!response.ok) throw new Error("Failed to reject comment");

        alert("🚫 Comment Rejected!");

        // 🔥 Immediately Remove the Rejected Comment from UI
        document.getElementById("pending-comments").children[index].remove();
        
        // 🔄 Refresh Comments List to Ensure UI is Updated
        loadComments();
    } catch (error) {
        alert("❌ Error: " + error.message);
    }
}

// ✅ Submit All Changes (Placeholder for Future Features)
async function submitChanges() {
    alert("✅ All changes submitted successfully!");
    loadComments();
}
