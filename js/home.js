(async function () {

    const player = await getPlayer();

    document.getElementById("welcomeText").innerHTML =
        "Welcome, " + player.fullName;

    document.getElementById("coins").innerHTML =
        player.coins;

    document.getElementById("level").innerHTML =
        player.level;

})();

document.getElementById("logoutBtn").onclick = function () {

    logout();

};

document.getElementById("playOnlineBtn").onclick = function () {

    alert("Create Room - Coming Next");

};

document.getElementById("playFriendBtn").onclick = function () {

    alert("Play With Friend - Coming Next");

};

document.getElementById("practiceBtn").onclick = function () {

    alert("Practice Mode - Coming Next");

};

document.getElementById("profileBtn").onclick = function () {

    alert("Profile - Coming Next");

};
