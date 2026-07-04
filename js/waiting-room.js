const roomId = localStorage.getItem("roomId");

if (!roomId) {

    window.location = "home.html";

}

let refreshTimer = null;

loadRoom();

refreshTimer = setInterval(loadRoom, 2000);

async function loadRoom() {

    try {

        const room = await api.get("/rooms/" + roomId);

        //-----------------------------------
        // Room Information
        //-----------------------------------

        document.getElementById("roomCode").innerHTML =
            room.roomCode;

        document.getElementById("playersJoined").innerHTML =
            room.currentPlayers;

        document.getElementById("playersRequired").innerHTML =
            room.maxPlayers;

        //-----------------------------------
        // 1vs1 or 2vs2
        //-----------------------------------

        if (room.maxPlayers == 2) {

            document.getElementById("seat3").classList.add("hidden");
            document.getElementById("seat4").classList.add("hidden");

        }
        else {

            document.getElementById("seat3").classList.remove("hidden");
            document.getElementById("seat4").classList.remove("hidden");

        }

        //-----------------------------------
        // Reset Seats
        //-----------------------------------

        for (let i = 1; i <= room.maxPlayers; i++) {

            document.getElementById("seat" + i + "Name").innerHTML =
                "Searching...";

        }

        //-----------------------------------
        // Players
        //-----------------------------------

        room.players.forEach(player => {

            let text = player.fullName;

            if (player.isHost)
                text += " 👑";

            document.getElementById(
                "seat" + player.seatNumber + "Name"
            ).innerHTML = text;

        });

        //-----------------------------------
        // Status
        //-----------------------------------

        if (room.status == 0 || room.status == "Waiting") {

            document.getElementById("statusMessage").innerHTML =
                "Waiting for players...";

        }

        if (room.status == 1 || room.status == "Starting") {

            document.getElementById("statusMessage").innerHTML =
                "🎲 Starting Game...";

        }

        if (room.status == 2 || room.status == "Playing") {

            clearInterval(refreshTimer);

            window.location = "game.html";

        }

    }
    catch (err) {

        console.error(err);

        clearInterval(refreshTimer);

        alert("Room not found.");

        window.location = "home.html";

    }

}

document.getElementById("leaveRoomBtn").onclick = async () => {

    if (!confirm("Are you sure you want to leave the room?"))
        return;

    try {

        await api.post("/rooms/" + roomId + "/leave", {});

        clearInterval(refreshTimer);

        localStorage.removeItem("roomId");

        window.location = "single-game.html";

    }
    catch (err) {

        console.error(err);

        alert("Unable to leave room.");

    }

};
