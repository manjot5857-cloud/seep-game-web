let selectedCoins = 100;

let selectedMode = 1;

document.querySelectorAll(".coin-card").forEach(card=>{

    card.onclick=()=>{

        document.querySelectorAll(".coin-card")
        .forEach(c=>c.classList.remove("selected"));

        card.classList.add("selected");

        selectedCoins=card.dataset.coins;

    };

});

document.querySelectorAll(".mode").forEach(btn=>{

    btn.onclick=()=>{

        document.querySelectorAll(".mode")
        .forEach(x=>x.classList.remove("active"));

        btn.classList.add("active");

        selectedMode=btn.dataset.mode;

    };

});

(async()=>{

    const player=await getPlayer();

    document.getElementById("coins").innerHTML=player.coins;

})();



document.getElementById("playNowBtn").onclick = async () => {

    try {

        const result = await api.post("/rooms/find-match", {

            entryFee: Number(selectedCoins),

            gameMode: Number(selectedMode)

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



};
