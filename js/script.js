const API_URL = "http://localhost:3000/skills";

let currentCategory = "All";
let currentSearch = "";

// =========================
// DISPLAY SKILLS
// =========================

async function displaySkills() {

    try {

        const response = await axios.get(API_URL);

        let skills = response.data;

        // Category filter
        if (currentCategory !== "All") {
            skills = skills.filter(skill =>
                skill.category === currentCategory
            );
        }

        // Search filter
        if (currentSearch.trim() !== "") {

            const searchText = currentSearch.toLowerCase();

            skills = skills.filter(skill =>
                skill.name.toLowerCase().includes(searchText) ||
                skill.category.toLowerCase().includes(searchText) ||
                skill.location.toLowerCase().includes(searchText) ||
                skill.description.toLowerCase().includes(searchText)
            );
        }

        const container = document.getElementById("skillContainer");

        container.innerHTML = "";

        // No results
        if (skills.length === 0) {

            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-warning">
                        No workers found.
                    </div>
                </div>
            `;

            return;
        }


        // Display worker cards
        skills.forEach(skill => {

            container.innerHTML += `

                <div class="col-md-4 mb-4">

                    <a
                        href="profile.html?id=${skill.id}"
                        style="text-decoration:none; color:inherit;">

                        <div class="card h-100 shadow">

                            <div class="card-body">

                                <h5>
                                    ${skill.name}
                                </h5>

                                <span class="badge bg-primary">
                                    ${skill.category}
                                </span>

                                <p class="mt-2">
                                    ${skill.description}
                                </p>

                                <p>
                                    <strong>⭐ Rating:</strong>
                                    ${skill.rating || "5.0"}
                                </p>

                                <p>
                                    <strong>Availability:</strong>
                                    ${skill.availability}
                                </p>

                                <p>
                                    <strong>Location:</strong>
                                    ${skill.location}
                                </p>

                                <p>
                                    <strong>Contact:</strong>
                                    ${skill.contact}
                                </p>

                            </div>

                        </div>

                    </a>

                </div>

            `;

        });

    }

    catch (error) {

        console.log(error);

        alert(
            "Unable to load workers. Please start JSON Server."
        );

    }
}


// =========================
// INITIAL LOAD
// =========================

displaySkills();


// =========================
// SEARCH
// =========================

const searchInput =
    document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        currentSearch = this.value;

        displaySkills();

    });

}


// =========================
// CATEGORY FILTER
// =========================

const buttons =
    document.querySelectorAll(".filter-btn");

buttons.forEach(button => {

    button.addEventListener("click", function () {

        // Change button style
        buttons.forEach(btn => {

            btn.classList.remove("btn-primary");

            btn.classList.add("btn-outline-primary");

        });


        this.classList.remove("btn-outline-primary");

        this.classList.add("btn-primary");


        // Set category
        currentCategory =
            this.dataset.category;


        displaySkills();

    });

});


// =========================
// ADD SKILL
// =========================

const form =
    document.getElementById("skillForm");

if (form) {

    form.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const newSkill = {

                name:
                    document.getElementById("name").value,

                category:
                    document.getElementById("category").value,

                description:
                    document.getElementById("description").value,

                availability:
                    document.getElementById("availability").value,

                location:
                    document.getElementById("location").value,

                contact:
                    document.getElementById("contact").value,

                rating: 5.0

            };


            // Validation
            if (
                !newSkill.name ||
                !newSkill.category ||
                !newSkill.description ||
                !newSkill.availability ||
                !newSkill.location ||
                !newSkill.contact
            ) {

                alert("Please fill all fields!");

                return;

            }


            try {

                await axios.post(
                    API_URL,
                    newSkill
                );


                alert(
                    "Skill added successfully!"
                );


                form.reset();


                displaySkills();

            }

            catch (error) {

                console.log(error);

                alert(
                    "Unable to add skill!"
                );

            }

        }
    );

}