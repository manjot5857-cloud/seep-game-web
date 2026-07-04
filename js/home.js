const player = await getPlayer();

document.getElementById("playerName").textContent = player.fullName;
document.getElementById("coins").textContent = player.coins;
document.getElementById("level").textContent = player.level;
