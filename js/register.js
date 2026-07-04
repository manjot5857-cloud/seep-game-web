const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", register);

async function register() {

    const fullName = document.getElementById("fullname").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("message");

    message.innerHTML = "";

    if (!fullName || !username || !email || !password) {

        message.innerHTML = "Please fill all fields.";

        return;
    }

    if (password !== confirmPassword) {

        message.innerHTML = "Passwords do not match.";

        return;
    }

    try {

        const response = await fetch(API_URL + "/auth/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                fullName,
                username,
                email,
                password

            })

        });

        const data = await response.json();

        if (!response.ok) {

            message.innerHTML = data.message;

            return;

        }

        alert("Registration Successful!");

        window.location.href = "login.html";

    }

    catch {

        message.innerHTML = "Unable to connect to server.";

    }

}
