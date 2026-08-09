// ==============================
// WORKER DASHBOARD
// ==============================

const API_URL = "http://localhost:3000";

// ==============================
// GET WORKER ID FROM URL
// ==============================

const params =
    new URLSearchParams(window.location.search);

const workerId =
    params.get("id");

// ==============================
// CHECK WORKER ID
// ==============================

if (!workerId) {

    alert("Worker ID is missing!");

}


// ==============================
// LOAD WORKER
// ==============================

async function loadWorker() {

    try {

        const response =
            await axios.get(
                `${API_URL}/skills/${workerId}`
            );

        const worker = response.data;


        // Worker name
        document.getElementById("workerName").textContent =
            worker.name;


        // Category
        document.getElementById("workerCategory").textContent =
            worker.category;


        // Location
        document.getElementById("workerLocation").textContent =
            worker.location;


        // Contact
        document.getElementById("workerContact").textContent =
            worker.contact;


        // Initial rating
        document.getElementById("workerRating").textContent =
            worker.rating || "No rating";


        // Load reviews
        loadReviews(workerId);


        // Load bookings
        loadBookings(workerId);

    }

    catch (error) {

        console.log(error);

        alert("Worker information could not be loaded.");

    }

}


// ==============================
// LOAD REVIEWS
// ==============================

async function loadReviews(workerId) {

    try {

        const response =
            await axios.get(
                `${API_URL}/reviews`
            );

        const allReviews = response.data;


        // Find this worker's reviews
        const reviews =
            allReviews.filter(review =>
                String(review.workerId) === String(workerId)
            );


        console.log("Worker Reviews:", reviews);


        // Review count
        document.getElementById("reviewCount").textContent =
            reviews.length;


        const reviewContainer =
            document.getElementById("reviewContainer");


        reviewContainer.innerHTML = "";


        // No reviews
        if (reviews.length === 0) {

            document.getElementById("ratingBox").textContent =
                "0";

            reviewContainer.innerHTML = `
                <div class="alert alert-info">
                    No customer reviews yet.
                </div>
            `;

            return;

        }


        // ==============================
        // CALCULATE AVERAGE RATING
        // ==============================

        let totalRating = 0;


        reviews.forEach(review => {

            totalRating += Number(review.rating);

        });


        const averageRating =
            totalRating / reviews.length;


        const finalRating =
            averageRating.toFixed(1);


        // Show average rating
        document.getElementById("ratingBox").textContent =
            finalRating;


        document.getElementById("workerRating").textContent =
            finalRating + " / 5";


        // ==============================
        // DISPLAY REVIEWS
        // ==============================

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


// ==============================
// LOAD BOOKINGS
// ==============================

async function loadBookings(workerId) {

    try {

        const response =
            await axios.get(
                `${API_URL}/bookings`
            );

        const allBookings = response.data;


        // Find this worker's bookings
        const bookings =
            allBookings.filter(booking =>
                String(booking.workerId) === String(workerId)
            );


        console.log(
            "Worker Bookings:",
            bookings
        );


        // Booking count
        document.getElementById("bookingCount").textContent =
            bookings.length;


        const bookingContainer =
            document.getElementById("bookingContainer");


        bookingContainer.innerHTML = "";


        // No bookings
        if (bookings.length === 0) {

            bookingContainer.innerHTML = `
                <div class="alert alert-info">
                    No booking requests yet.
                </div>
            `;

            return;

        }


        // ==============================
        // DISPLAY BOOKINGS
        // ==============================

        bookings.forEach(booking => {

            const status =
                booking.status || "Pending";


            let statusBadge;


            if (status === "Accepted") {

                statusBadge = `
                    <span class="badge bg-success">
                        ✅ Accepted
                    </span>
                `;

            }

            else if (status === "Rejected") {

                statusBadge = `
                    <span class="badge bg-danger">
                        ❌ Rejected
                    </span>
                `;

            }

            else {

                statusBadge = `
                    <span class="badge bg-warning text-dark">
                        ⏳ Pending
                    </span>
                `;

            }


            bookingContainer.innerHTML += `

                <div class="card shadow-sm mb-3">

                    <div class="card-body">

                        <h5>
                            👤 ${booking.customerName}
                        </h5>

                        <p>
                            📞 ${booking.phone}
                        </p>

                        <p>
                            📅 ${booking.date}
                        </p>

                        <p>
                            ⏰ ${booking.time}
                        </p>

                        <p>
                            💬 ${booking.message}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            ${statusBadge}
                        </p>


                        ${
                            status === "Pending"
                            ?
                            `

                            <button
                                class="btn btn-success me-2"
                                onclick="updateBooking('${booking.id}', 'Accepted')">

                                ✅ Accept

                            </button>


                            <button
                                class="btn btn-danger"
                                onclick="updateBooking('${booking.id}', 'Rejected')">

                                ❌ Reject

                            </button>

                            `
                            :
                            ""
                        }

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        console.log(
            "Error loading bookings:",
            error
        );

    }

}


// ==============================
// ACCEPT / REJECT BOOKING
// ==============================

async function updateBooking(bookingId, status) {

    try {

        await axios.patch(
            `${API_URL}/bookings/${bookingId}`,
            {
                status: status
            }
        );


        // ACCEPTED
        if (status === "Accepted") {

            alert(
                "Booking accepted successfully! ✅"
            );

        }


        // REJECTED
        else if (status === "Rejected") {

            alert(
                "Booking rejected."
            );

        }


        // Reload worker dashboard
        loadBookings(workerId);

    }

    catch (error) {

        console.log(
            "Error updating booking:",
            error
        );

        alert(
            "Could not update booking status."
        );

    }

}


// ==============================
// START DASHBOARD
// ==============================

if (workerId) {

    loadWorker();

}