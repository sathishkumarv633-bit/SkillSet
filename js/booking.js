// Get worker ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Load worker details
axios.get(`http://localhost:3000/skills/${id}`)
.then(response => {

    const worker = response.data;

    // Show worker name
    document.getElementById("workerName").textContent = worker.name;

});

// Booking Form
const form = document.getElementById("bookingForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const booking = {
        workerId: id,
        workerName: document.getElementById("workerName").textContent,
        customerName: document.getElementById("customerName").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        message: document.getElementById("message").value
    };

    try {

        await axios.post("http://localhost:3000/bookings", booking);

        alert("✅ Booking Confirmed!");

        form.reset();

    } catch(error) {

        console.log(error);

        alert("Booking Failed!");

    }

});