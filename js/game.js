//--------------------------------------
// Game Variables
//--------------------------------------

const roomId = localStorage.getItem("roomId");

if (!roomId) {

    window.location = "home.html";

}

let refreshTimer = null;

//--------------------------------------
// Start
//--------------------------------------

loadGame();

refreshTimer = setInterval(loadGame, 2000);

//--------------------------------------
// Load Game
//--------------------------------------

async function loadGame() {

    try {

        const room = await api.get("/rooms/" + roomId);

        //----------------------------------
        // Prize Pool
        //----------------------------------

        document.getElementById("prizePool").innerHTML =
            room.entryFee *
