let selectedCoins = 100;
let selectedMode = 1;

//-------------------------------------
// Load Player
//-------------------------------------

(async () => {

    try {

        const player = await getPlayer();

        document.getElementById("coins").innerHTML = player.coins;

    }
    catch {

        logout();

    }

})();

//-------------------------------------
// Select Coin Table
//-------------------------------------

document.querySelectorAll(".coin-card").forEach(card => {

    card.onclick = () => {

        document.querySelectorAll(".coin-card")
            .forEach(c => c.classList.remove("selected"));

        card.classList.add("selected");

        selectedCoins = Number(card.dataset.coins);

    };

});

//-------------------------------------
// Select Game Mode
//-------------------------------------

document.querySelectorAll(".mode").forEach(btn => {

    btn.onclick = () => {

        document.querySelectorAll(".mode")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        selectedMode = Number(btn.dataset.mode);

    };

});

//-------------------------------------
// Play Now
//-------------------------------------

document.getElementById("playNowBtn").onclick = async () => {

    try {

        const result = await api.post("/rooms/find-match", {

            entryFee: selectedCoins,

            gameMode: selectedMode

        });

        console.log(result);

        localStorage.setItem("roomId", result.roomId);

        window.location = "waiting-room.html";

    }
    catch (err) {

        console.error(err);

        alert("Unable to find a game.");

    }

};


document.getElementById("logoutBtn").onclick = () => {

    logout();

};
