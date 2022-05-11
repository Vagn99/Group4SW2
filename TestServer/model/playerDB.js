var Player = require('./playerClass.js');

let players = new Map();
players
    .set("user1", user1 = new Player.Player(1, "user1", "Player 1's Town", 2, 0,"red"))
    .set("user2", user2 = new Player.Player(2, "user2", "Player 2's Town", 0, 2,"blue"))
    .set("user3", user3 = new Player.Player(3, "user3", "Player 3's Town", 6, 8,"orange"))
    .set("user4", user4 = new Player.Player(4, "user4", "Player 4's Town", 6, 2,"pink"))
    .set("user5", user5 = new Player.Player(5, "user5", "Player 5's Town", 8, 6,"yellow"))
    .set("user6", user6 = new Player.Player(6, "user6", "Player 6's Town", 2, 6,"green"));

// Starts the income (I think - stefan)

players.forEach(player=>{
    player.generateIncome();
})

let winner = "";


module.exports = {
    players,
    winner,
}