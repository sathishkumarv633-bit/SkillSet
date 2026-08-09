// ==========================================
// ADMIN LOGIN
// ==========================================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";

const adminLoginForm =
    document.getElementById("adminLoginForm");


if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document
                    .getElementById("adminUsername")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("adminPassword")
                    .value
                    .trim();


            // Check login

            if (
                username === ADMIN_USERNAME &&
                password === ADMIN_PASSWORD
            ) {

                // Save admin login

                sessionStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                alert(
                    "Admin login successful! 🔐"
                );


                // Open admin dashboard

                window.location.href =
                    "admin.html";

            }

            else {

                alert(
                    "Invalid admin username or password!"
                );

            }

        }
    );

}