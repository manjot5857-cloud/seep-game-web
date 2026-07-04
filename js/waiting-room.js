const roomId = localStorage.getItem("roomId");

if (!roomId) {

    window.location = "home.html";

}

let refreshTimer = null;

loadRoom();

refreshTimer = setInterval(loadRoom, 2000);

async function loadRoom() {

    try {

        const response = await fetch(API_URL + "/rooms/" + roomId, {

            headers: {

                "Authorization": "Bearer " + getToken()

            }

        });

        if (!response.ok) {

            alert("Room not found.");

            window.location = "home.html";

            return;

        }

        const room = await response.json();

        //--------------------------------------------------
        // Room Info
        //--------------------------------------------------

        document.getElementById("roomCode").innerHTML =
            room.roomCode;

        document.getElementById("playersJoined").innerHTML =
            room.players.length;

        document.getElementById("playersRequired").innerHTML =
            room.maxPlayers;

        //--------------------------------------------------
        // Show seats
        //--------------------------------------------------

        if (room.maxPlayers === 2) {

            document.getElementById("seat3").classList.add("hidden");
            document.getElementById("seat4").classList.add("hidden");

        }
        else {

            document.getElementById("seat3").classList.remove("hidden");
            document.getElementById("seat4").classList.remove("hidden");

        }

        //--------------------------------------------------
        // Reset Seats
        //--------------------------------------------------

        for (let i = 1; i <= room.maxPlayers; i++) {

            document.getElementById("seat" + i + "Name").innerHTML =
                "Searching...";

        }

        //--------------------------------------------------
        // Fill Players
        //--------------------------------------------------

        room.players.forEach(player => {

            document.getElementById(
                "seat" + player.seatNumber + "Name"
            ).innerHTML =
                player.fullName;

        });

        //--------------------------------------------------
        // Game Started?
        //--------------------------------------------------

        if (room.status === 2 || room.status === "Playing") {

            clearInterval(refreshTimer);

            window.location = "game.html";

        }

    }
    catch (err) {

        console.error(err);

    }

}

document.getElementById("leaveRoomBtn").onclick = async function () {

    if (!confirm("Leave this room?"))
        return;

    await fetch(API_URL + "/rooms/" + roomId + "/leave", {

        method: "POST",

        headers: {

            "Authorization": "Bearer " + getToken()

        }

    });

    clearInterval(refreshTimer);

    localStorage.removeItem("roomId");

    window.location = "home.html";

};
