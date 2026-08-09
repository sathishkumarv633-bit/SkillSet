const API_URL = "http://localhost:3000/reviews";

// Get worker ID from URL
const params = new URLSearchParams(window.location.search);
const workerId = params.get("workerId");

console.log("Worker ID:", workerId);

const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {

    reviewForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const customerName =
            document.getElementById("customerName").value.trim();

        const rating =
            document.getElementById("rating").value;

        const reviewText =
            document.getElementById("reviewText").value.trim();

        if (!customerName || !rating || !reviewText) {
            alert("Please fill all fields!");
            return;
        }

        const newReview = {
            workerId: String(workerId),
            customerName: customerName,
            rating: Number(rating),
            review: reviewText
        };

        try {

            const response = await axios.post(
                API_URL,
                newReview
            );

            console.log("Review saved:", response.data);

            alert("Review submitted successfully! ⭐");

            reviewForm.reset();

            window.location.href =
                `profile.html?id=${workerId}`;

        } catch (error) {

            console.log("Review error:", error);

            alert(
                "Review submission failed. Make sure JSON Server is running."
            );
        }

    });

}