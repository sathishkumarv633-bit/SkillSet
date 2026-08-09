// ==========================================
// CUSTOMER LOGIN
// ==========================================

const API_URL = "http://localhost:3000/customers";

const customerLoginForm =
    document.getElementById("customerLoginForm");


if (customerLoginForm) {

    customerLoginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username =
            document
                .getElementById("customerUsername")
                .value
                .trim();

        const password =
            document
                .getElementById("customerPassword")
                .value
                .trim();


        try {

            // Find customer
            const response = await axios.get(
                `${API_URL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
            );

            const customers = response.data;


            if (customers.length === 0) {

                alert("Invalid username or password!");
                return;

            }


            const customer = customers[0];


            // Save customer login
            sessionStorage.setItem(
                "customerLoggedIn",
                "true"
            );

            sessionStorage.setItem(
                "customerId",
                customer.id
            );

            sessionStorage.setItem(
                "customerName",
                customer.name
            );

            sessionStorage.setItem(
                "customerPhone",
                customer.phone
            );


            alert(
                "Customer login successful! 👤"
            );


            // IMPORTANT
            // Open customer home/dashboard
            window.location.href =
                "index.html";

        }

        catch (error) {

            console.log(
                "Customer login error:",
                error
            );

            alert(
                "Login failed. Make sure JSON Server is running."
            );

        }

    });

}