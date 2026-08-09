const API_URL = "http://localhost:3000/bookings";

// Load all bookings
async function loadBookings() {

    try {

        const response = await axios.get(API_URL);

        const bookings = response.data;

        const table = document.getElementById("bookingTable");

        table.innerHTML = "";

        bookings.forEach(booking => {

            table.innerHTML += `
                <tr>
                    <td>${booking.workerName}</td>
                    <td>${booking.customerName}</td>
                    <td>${booking.phone}</td>
                    <td>${booking.date}</td>
                    <td>${booking.time}</td>
                    <td>${booking.message}</td>
                    <td>
                        <button class="btn btn-danger btn-sm"
                            onclick="deleteBooking('${booking.id}')">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.log(error);

        alert("Cannot load bookings!");

    }

}

// Delete booking
async function deleteBooking(id) {

    if (confirm("Are you sure you want to delete this booking?")) {

        await axios.delete(`${API_URL}/${id}`);

        loadBookings();

    }

}

// Load bookings when page opens
loadBookings();