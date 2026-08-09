// Get worker ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Get worker details
axios
    .get(`http://localhost:3000/skills/${id}`)

    .then(response => {

        const skill = response.data;

        document.getElementById("name").textContent =
            skill.name;

        document.getElementById("category").textContent =
            skill.category;

        document.getElementById("rating").textContent =
            skill.rating || "5.0";

        document.getElementById("description").textContent =
            skill.description;

        document.getElementById("availability").textContent =
            skill.availability;

        document.getElementById("location").textContent =
            skill.location;

        document.getElementById("contact").textContent =
            skill.contact;

        // Book button
        document.getElementById("bookBtn").href =
            `booking.html?id=${skill.id}`;

        // Review button
        document.getElementById("reviewBtn").href =
            `review.html?workerId=${skill.id}`;

        // Load reviews
        loadReviews(skill.id);

    })

    .catch(error => {

        console.log(error);

        alert("Profile not found!");

    });


// ==============================
// LOAD CUSTOMER REVIEWS
// ==============================

async function loadReviews(workerId) {

    try {

        const response =
            await axios.get(
                "http://localhost:3000/reviews"
            );

        const allReviews = response.data;

        // Match worker ID
        const reviews = allReviews.filter(review =>
            String(review.workerId) === String(workerId)
        );


        console.log("Worker ID:", workerId);
        console.log("Reviews:", reviews);


        // ==============================
        // AUTOMATIC RATING CALCULATION
        // ==============================

        if (reviews.length > 0) {

            let totalRating = 0;

            reviews.forEach(review => {

                totalRating += Number(review.rating);

            });

            const averageRating =
                totalRating / reviews.length;

            document.getElementById("rating").textContent =
                averageRating.toFixed(1) + " / 5";

        }

        else {

            document.getElementById("rating").textContent =
                "No ratings yet";

        }


        // ==============================
        // DISPLAY REVIEWS
        // ==============================

        const reviewContainer =
            document.getElementById("reviewContainer");

        reviewContainer.innerHTML = "";


        if (reviews.length === 0) {

            reviewContainer.innerHTML = `
                <div class="alert alert-info">
                    No customer reviews yet.
                </div>
            `;

            return;

        }


        reviews.forEach(review => {

            const stars =
                "⭐".repeat(Number(review.rating));


            reviewContainer.innerHTML += `

                <div class="card shadow-sm mb-3">

                    <div class="card-body">

                        <h5>
                            👤 ${review.customerName}
                        </h5>

                        <p>
                            ${stars}

                            <strong>
                                ${review.rating}/5
                            </strong>
                        </p>

                        <p class="mb-0">
                            "${review.review}"
                        </p>

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        console.log(
            "Error loading reviews:",
            error
        );

    }

}