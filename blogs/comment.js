document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ comments.js loaded!");

    const form = document.getElementById("commentForm");
    if (!form) {
        console.error("❌ Form not found!");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("🟡 Submit button clicked!");

        const formData = new FormData(form);
        const data = {
            full_name: formData.get("full_name"),
            email: formData.get("email"),
            comment: formData.get("comment"),
            hide_info: formData.get("hide_info") ? true : false
        };

        console.log("🔵 Data to send:", data);

        try {
            const response = await fetch(WORKER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            console.log("🟢 Response status:", response.status);

            if (response.ok) {
                document.getElementById("message").innerHTML =
                    "<p style='color: green;'>✅ Comment submitted for review.</p>";
                form.reset();
            } else {
                document.getElementById("message").innerHTML =
                    "<p style='color: red;'>❌ Failed to submit!</p>";
            }
        } catch (error) {
            console.error("🚨 Error submitting comment:", error);
            document.getElementById("message").innerHTML =
                "<p style='color: red;'>❌ Error submitting comment.</p>";
        }
    });
});
