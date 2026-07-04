(async function () {

    const player = await getPlayer();

    document.getElementById("playerName").innerHTML =
        player.fullName;

    document.getElementById("coins").innerHTML =
        player.coins;

    document.getElementById("level").innerHTML =
        player.level;

})();

document.getElementById("logoutBtn").onclick = function () {

    logout();

};

document.getElementById("singleGameBtn").onclick = function () {

    window.location.href = "single-game.html";

};

document.getElementById("friendsBtn").onclick = function () {

    alert("Play With Friends - Coming Soon");

};

document.getElementById("profileBtn").onclick = function () {

    alert("Profile - Coming Soon");

};
