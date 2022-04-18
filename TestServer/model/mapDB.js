var GameMap = require('./mapClass.js');
var Players = require('./playerDB.js');
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
/*console.log(gameMap.cellArray);
console.log(gameMap.cellArray[0][2].type, gameMap.cellArray[2][6].type);
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        console.log(j + "," + i + " "+ gameMap.cellArray[j][i].type.type);
    }
} */

module.exports = {
    gameMap,
}