// ==========================================
// SKILLSETU HOME PAGE
// ==========================================

const API_URL = "http://localhost:3000/skills";

let allSkills = [];
let currentCategory = "All";

// ==========================================
// LOAD ALL WORKERS
// ==========================================

async function loadSkills() {

    try {

        const response = await axios.get(API_URL);

        allSkills = response.data;

        console.log("Workers loaded:", allSkills);

        displaySkills();

    } catch (error) {

        console.error("Error loading workers:", error);

        document.getElementById("skillContainer").innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger text-center">
                    ❌ Unable to load workers.
                    <br>
                    Make sure JSON Server is running.
                </div>
            </div>
        `;
    }
}

// ==========================================
// DISPLAY WORKERS
// ==========================================

function displaySkills() {

    const container =
        document.getElementById("skillContainer");

    if (!container) {
        console.error("skillContainer not found");
        return;
    }

    const searchInput =
        document.getElementById("searchInput");

    const searchText =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    // Filter workers
    const filteredSkills = allSkills.filter(skill => {

        // Category filter
        const categoryMatch =
            currentCategory === "All" ||
            skill.category === currentCategory;

        // Search filter
        const searchMatch =
            !searchText ||
            skill.name.toLowerCase().includes(searchText) ||
            skill.category.toLowerCase().includes(searchText) ||
            skill.location.toLowerCase().includes(searchText);

        return categoryMatch && searchMatch;

    });

    // Clear old cards
    container.innerHTML = "";

    // No workers
    if (filteredSkills.length === 0) {

        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    No workers found.
                </div>
            </div>
        `;

        return;
    }

    // ==========================================
    // CREATE WORKER CARDS
    // ==========================================

    filteredSkills.forEach(skill => {

        const rating =
            skill.rating || "No rating";

        container.innerHTML += `

            <div class="col-md-6 col-lg-4 mb-4">

                <div class="card h-100 shadow-sm">

                    <div class="card-body">

                        <div class="d-flex justify-content-between
                                    align-items-start mb-2">

                            <h4 class="card-title mb-0">
                                👤 ${skill.name}
                            </h4>

                            <span class="badge bg-primary">
                                ${skill.category}
                            </span>

                        </div>


                        <hr>


                        <p class="card-text">

                            <strong>🛠 Skill:</strong>
                            ${skill.description}

                        </p>


                        <p>

                            <strong>📍 Location:</strong>
                            ${skill.location}

                        </p>


                        <p>

                            <strong>🕒 Availability:</strong>
                            ${skill.availability}

                        </p>


                        <p>

                            <strong>⭐ Rating:</strong>
                            ${rating}/5

                        </p>


                        <p>

                            <strong>📞 Contact:</strong>
                            ${skill.contact}

                        </p>


                        <div class="d-grid gap-2">

                            <a
                                href="profile.html?id=${skill.id}"
                                class="btn btn-primary">

                                👤 View Profile

                            </a>


                            <a
                                href="booking.html?id=${skill.id}"
                                class="btn btn-success">

                                📅 Book Worker

                            </a>

                        </div>

                    </div>

                </div>

            </div>

        `;

    });

}

// ==========================================
// SEARCH
// ==========================================

const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            displaySkills();

        }
    );

}

// ==========================================
// CATEGORY BUTTONS
// ==========================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        currentCategory =
            this.dataset.category;

        // Change button style
        filterButtons.forEach(btn => {

            btn.classList.remove("btn-primary");

            btn.classList.add("btn-outline-primary");

        });

        this.classList.remove("btn-outline-primary");

        this.classList.add("btn-primary");

        displaySkills();

    });

});

// ==========================================
// ADD NEW WORKER / SKILL
// ==========================================

const skillForm =
    document.getElementById("skillForm");

if (skillForm) {

    skillForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const newSkill = {

                name:
                    document.getElementById("name")
                        .value.trim(),

                category:
                    document.getElementById("category")
                        .value,

                description:
                    document.getElementById("description")
                        .value.trim(),

                availability:
                    document.getElementById("availability")
                        .value.trim(),

                location:
                    document.getElementById("location")
                        .value.trim(),

                contact:
                    document.getElementById("contact")
                        .value.trim(),

                rating: 5

            };

            try {

                await axios.post(
                    API_URL,
                    newSkill
                );

                alert(
                    "Worker added successfully! 🎉"
                );

                skillForm.reset();

                // Reload workers
                loadSkills();

                // Go to skill section
                document
                    .getElementById("skills")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            } catch (error) {

                console.error(
                    "Error adding worker:",
                    error
                );

                alert(
                    "Unable to add worker. " +
                    "Make sure JSON Server is running."
                );

            }

        }
    );

}

// ==========================================
// START
// ==========================================

loadSkills();