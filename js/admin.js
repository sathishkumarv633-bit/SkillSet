const SKILLS_API = "http://localhost:3000/skills";
const BOOKINGS_API = "http://localhost:3000/bookings";

// Load Dashboard
async function loadDashboard() {

    try {

        // Get Skills
        const skillsResponse = await axios.get(SKILLS_API);
        const skills = skillsResponse.data;

        // Get Bookings
        const bookingsResponse = await axios.get(BOOKINGS_API);
        const bookings = bookingsResponse.data;

        // Total Workers
        document.getElementById("workers").textContent = skills.length;

        // Total Bookings
        document.getElementById("bookings").textContent = bookings.length;

        // Total Categories
        const categories = [...new Set(skills.map(skill => skill.category))];
        document.getElementById("categories").textContent = categories.length;

    } catch (error) {

        console.log(error);
        alert("Cannot load dashboard!");

    }

}

// Run Dashboard
loadDashboard();