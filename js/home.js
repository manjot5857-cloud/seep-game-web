(async () => {

    const player = await getPlayer();

    document.getElementById("playerName").innerHTML =
        player.fullName;

    document.getElementById("coins").innerHTML =
        player.coins;

})();

document.getElementById("singleGameBtn").onclick = () => {

    window.location = "single-game.html";

};

document.getElementById("friendsBtn").onclick = () => {

    alert("Coming Soon!");

};

document.getElementById("logoutBtn").onclick = () => {

    logout();

};
