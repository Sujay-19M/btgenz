export async function onRequest(context) {
    const { request, env } = context;

    if (request.method === "POST") {
        try {
            // Parse the incoming JSON request
            const data = await request.json();

            // Extract fields from the request
            const postId = data.postId || "general"; // Default category if no postId is provided
            const name = data.name;
            const email = data.email;
            const comment = data.comment;

            // Basic validation
            if (!name || !email || !comment) {
                return new Response(JSON.stringify({ message: "All fields are required!" }), {
                    headers: { "Content-Type": "application/json" },
                    status: 400
                });
            }

            // Generate a unique comment ID using timestamp
            const commentId = `comment-${postId}-${Date.now()}`;

            // Store comment in Cloudflare KV
            await env.COMMENTS.put(commentId, JSON.stringify({ name, email, comment, timestamp: new Date().toISOString() }));

            // Return success response
            return new Response(JSON.stringify({ message: "Comment submitted successfully!" }), {
                headers: { "Content-Type": "application/json" },
                status: 200
            });

        } catch (error) {
            return new Response(JSON.stringify({ message: "Error processing request!" }), {
                headers: { "Content-Type": "application/json" },
                status: 500
            });
        }
    }

    return new Response("Not Found", { status: 404 });
}
