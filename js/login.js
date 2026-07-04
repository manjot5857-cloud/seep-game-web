const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", login);

async function login() {

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    message.innerHTML = "";

    if (!email || !password) {

        message.innerHTML = "Please enter email and password.";

        return;

    }

    try {

        const response = await fetch(API_URL + "/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,
                password

            })

        });

        const data = await response.json();

        if (!response.ok) {

            message.innerHTML = data.message;

            return;

        }

        localStorage.setItem("token", data.token);

        localStorage.setItem("player", JSON.stringify(data.player));

        window.location.href = "home.html";

    }

    catch {

        message.innerHTML = "Unable to connect to server.";

    }

}
