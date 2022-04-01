var GameMap = require('./mapClass.js');
var Players = require('./../model/userDB.js');
players = Players.players;
let townArray = [
    players.get("user1").town,
    players.get("user2").town,
    players.get("user3").town,
    players.get("user4").town,
    players.get("user5").town,
    players.get("user6").town
];

gameMap = new GameMap.GameMap(9, 9, townArray);


module.exports = {
    gameMap,
}