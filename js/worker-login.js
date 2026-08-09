const API_URL = "http://localhost:3000/skills";

const loginForm =
    document.getElementById("workerLoginForm");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const message =
        document.getElementById("loginMessage");

    try {

        const response =
            await axios.get(API_URL);

        const workers =
            response.data;

        // Find worker
        const worker =
            workers.find(worker =>
                worker.username === username &&
                worker.password === password
            );

        if (worker) {

            // Save logged-in worker
            localStorage.setItem(
                "worker",
                JSON.stringify(worker)
            );

            localStorage.setItem(
                "userType",
                "worker"
            );

            message.innerHTML = `
                <div class="alert alert-success">
                    ✅ Worker login successful!
                </div>
            `;

            setTimeout(() => {

                window.location.href =
                    `worker-dashboard.html?id=${worker.id}`;

            }, 500);

        } else {

            message.innerHTML = `
                <div class="alert alert-danger">
                    ❌ Invalid worker username or password.
                </div>
            `;

        }

    } catch (error) {

        console.log(error);

        message.innerHTML = `
            <div class="alert alert-danger">
                ❌ Cannot connect to server.
                <br>
                Make sure JSON Server is running.
            </div>
        `;

    }

});