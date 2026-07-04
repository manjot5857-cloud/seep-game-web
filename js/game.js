//----------------------------------------
// Game
//----------------------------------------

const roomId = localStorage.getItem("roomId");

if (!roomId) {

    window.location = "home.html";

}

let refreshTimer = null;

loadGame();

refreshTimer = setInterval(loadGame, 2000);

//----------------------------------------
// Load Game
//----------------------------------------

async function loadGame() {

    try {

        const room = await api.get("/rooms/" + roomId);

        //--------------------------------
        // Prize Pool
        //--------------------------------

        document.getElementById("prizePool").innerHTML =
            room.entryFee * room.maxPlayers;

        //--------------------------------
        // Live Score
        //--------------------------------

        document.getElementById("team1Score").innerHTML =
            room.team1Score ?? 0;

        document.getElementById("team2Score").innerHTML =
            room.team2Score ?? 0;

        //--------------------------------
        // 1v1 or 2v2
        //--------------------------------

        if (room.maxPlayers == 2) {

            document.getElementById("leftPlayer").style.display = "none";

            document.getElementById("rightPlayer").style.display = "none";

        }
        else {

            document.getElementById("leftPlayer").style.display = "block";

            document.getElementById("rightPlayer").style.display = "block";

        }

        //--------------------------------
        // Reset Players
        //--------------------------------

        document.getElementById("player1Name").innerHTML = "Waiting...";
        document.getElementById("player2Name").innerHTML = "Waiting...";
        document.getElementById("player3Name").innerHTML = "Waiting...";
        document.getElementById("player4Name").innerHTML = "Waiting...";

        document.getElementById("player1Points").innerHTML = "0";
        document.getElementById("player2Points").innerHTML = "0";
        document.getElementById("player3Points").innerHTML = "0";
        document.getElementById("player4Points").innerHTML = "0";

        document.getElementById("player1Dealer").style.visibility = "hidden";
        document.getElementById("player2Dealer").style.visibility = "hidden";
        document.getElementById("player3Dealer").style.visibility = "hidden";
        document.getElementById("player4Dealer").style.visibility = "hidden";

        //--------------------------------
        // Populate Players
        //--------------------------------

        room.players.forEach(player => {

            const seat = player.seatNumber;

            document.getElementById("player" + seat + "Name").innerHTML =
                player.fullName;

            document.getElementById("player" + seat + "Points").innerHTML =
                player.score ?? 0;

            if (player.isDealer) {

                document.getElementById("player" + seat + "Dealer").style.visibility =
                    "visible";

            }

        });

        //--------------------------------
        // Game Finished
        //--------------------------------

        if (room.status == 3 || room.status == "Finished") {

            clearInterval(refreshTimer);

            alert("Game Finished!");

            localStorage.removeItem("roomId");

            window.location = "home.html";

        }

    }
    catch (err) {

        console.error(err);

        clearInterval(refreshTimer);

        alert("Unable to load game.");

        window.location = "home.html";

    }

}

//----------------------------------------
// Leave Game
//----------------------------------------

document.getElementById("leaveGameBtn").onclick = async () => {

    if (!confirm("Leave the game? You will lose the match.")) {

        return;

    }

    try {

        await api.post("/game/leave", {

            roomId: Number(roomId)

        });

        clearInterval(refreshTimer);

        localStorage.removeItem("roomId");

        window.location = "home.html";

    }
    catch (err) {

        alert(err.message);

    }

};
