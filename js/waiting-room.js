const roomId = localStorage.getItem("roomId");

if (!roomId) {

    window.location = "home.html";

}

let refreshTimer = null;

loadRoom();

refreshTimer = setInterval(loadRoom, 2000);

//-------------------------------------
// Load Room
//-------------------------------------

async function loadRoom() {

    try {

        const room = await api.get("/rooms/" + roomId);

        //---------------------------------
        // Room Info
        //---------------------------------

        document.getElementById("roomCode").innerHTML =
            room.roomCode;

        document.getElementById("playersJoined").innerHTML =
            room.players.length;

        document.getElementById("playersRequired").innerHTML =
            room.maxPlayers;

        //---------------------------------
        // Hide Seats (1vs1)
        //---------------------------------

        if (room.maxPlayers == 2) {

            document.getElementById("seat3").style.display = "none";
            document.getElementById("seat4").style.display = "none";

        }
        else {

            document.getElementById("seat3").style.display = "block";
            document.getElementById("seat4").style.display = "block";

        }

        //---------------------------------
        // Reset Seats
        //---------------------------------

        for (let i = 1; i <= room.maxPlayers; i++) {

            document.getElementById("seat" + i + "Name").innerHTML =
                "Searching...";

        }

        //---------------------------------
        // Fill Players
        //---------------------------------

        room.players.forEach(player => {

            document.getElementById(
                "seat" + player.seatNumber + "Name"
            ).innerHTML = player.fullName;

        });

        //---------------------------------
        // Game Started?
        //---------------------------------

        if (room.status === 1 || room.status === "Playing") {

            clearInterval(refreshTimer);

            window.location = "game.html";

        }

    }
    catch (err) {

        console.error(err);

        clearInterval(refreshTimer);

        alert("Room no longer exists.");

        window.location = "home.html";

    }

}
