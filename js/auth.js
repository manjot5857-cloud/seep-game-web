function getToken() {
    return localStorage.getItem("token");
}

async function getPlayer() {

    const response = await fetch(API_URL + "/players/me", {

        headers: {
            "Authorization": "Bearer " + getToken()
        }

    });

    if (response.status === 401) {

        logout();
        return;

    }

    return await response.json();
}

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";
}
