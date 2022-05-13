let gold = document.getElementById('gold2');
let common = document.getElementById('common2');
let troops = document.getElementById('troops2');
let user = document.getElementById("name").textContent;

let numberOfTroops = document.getElementById("numberOfTroops");
let attackButton = document.getElementById("buttonAttack");
attackButton.addEventListener("click", sendTroopsToLocation);
let x;
let y;
let array = [];
let selected = '';

var img = document.createElement("img");
img.src = "../images/assets/sword_3.png";
img.setAttribute("style", "width:50px; text-align:center; margin-top: 20%; position: absolute; left: 8%;");
img.setAttribute("id", "selectedTile");

getValues();

setInterval(() => {
    getValues();
}, 5000);

window.onload = function () {
    document.addEventListener('click', function handleClick(event) {
        currentTileSelected(event.target.id);
        console.log(event.target.id);
        if (event.target.id === "selectedTile") {
            document.getElementById(selected).removeChild(img);
            document.getElementById(selected).style.filter = "brightness(100%)"
            x = undefined;
            y = undefined;
        } else if (event.target.id.charAt(0) === 'i') {
            if (selected != '') {
                document.getElementById(selected).style.filter = "brightness(100%)"
            }
            document.getElementById(event.target.id).appendChild(img);
            document.getElementById(event.target.id).style.filter = "brightness(80%)"
            selected = event.target.id;
        }
    });
}

/*
function tile(id) {
    array = id.split('i')
    return array[1];
}
*/

function currentTileSelected(id) {
    if (id != "" && Number(id.charAt(1)) < 10) {
        x = id.charAt(1);
        y = id.charAt(2);
    }
}

//Test function for sending troops
function sendTroopsToLocation() {
    if (Number(document.querySelector('input').value) > Number(troops.textContent))
        document.querySelector('input').value = troops.textContent;
    else if (Number(document.querySelector('input').value) < 0)
        document.querySelector('input').value = 0;
    if (x != undefined && y != undefined && document.getElementById("i"+x+y).getAttribute("type")!="empty") {
        fetch('/mapview/sendTroopsToLocation?x=' + x + "&y=" + y + "&troopsSend=" + document.querySelector('input').value)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Response error: " + response.status);
                }
                return response.text();
            })
            .then(handle => {
                let battleOutcome = JSON.parse(handle);
                console.log(document.querySelector('input').value);
                console.log("Send nudes");
                console.log(battleOutcome.message);
                if (battleOutcome.victory) {
                    document.getElementById("i" + x.toString() + y.toString()).setAttribute("owner", user);
                }

            })
            .catch(error => {
                console.log(error);
            });
    }
}

function getValues() {
    fetch('/mapview/getValues').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(responseObject => {
        let loadValues = JSON.parse(responseObject);
        let someString = "";
        let endString = "";
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (i < 5) {
                    if (j < i + 5) {
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("owner", loadValues.mapObject[i][j].owner);
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("troopsInside", loadValues.mapObject[i][j].troopsInside);
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("type", loadValues.mapObject[i][j].type);
                        someString += i.toString() + j.toString() + " ";
                    } else {
                        someString += "xx ";
                    }
                } else {
                    if (j < i - 4) {
                        someString += "xx ";
                    } else {
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("owner", loadValues.mapObject[i][j].owner);
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("troopsInside", loadValues.mapObject[i][j].troopsInside);
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("type", loadValues.mapObject[i][j].type);
                        someString += i.toString() + j.toString() + " ";
                    }
                }
            }
            endString = someString + "\n" + endString;
            someString = "";
        }
        console.log(endString);

        common.textContent = loadValues.playerObject.common.toString();
        gold.textContent = loadValues.playerObject.gold.toString();
        troops.textContent = loadValues.playerObject.troops.toString();
        numberOfTroops.setAttribute("max", troops.textContent);

        document.getElementById("i20").childNodes[0].textContent = loadValues.playerObject.user1LVL;
        document.getElementById("i02").childNodes[0].textContent = loadValues.playerObject.user2LVL;
        document.getElementById("i68").childNodes[0].textContent = loadValues.playerObject.user3LVL;
        document.getElementById("i62").childNodes[0].textContent = loadValues.playerObject.user4LVL;
        document.getElementById("i86").childNodes[0].textContent = loadValues.playerObject.user5LVL;
        document.getElementById("i26").childNodes[0].textContent = loadValues.playerObject.user6LVL;

        document.getElementById("level").textContent = 'Your level: ' + loadValues.playerObject.myLevel;
        document.getElementById("borderColor").style.borderColor = loadValues.playerObject.color;

        if (loadValues.playerObject.winner != "") {
            victoryChecker();
        }
        console.log("Update done");
    }).catch(error => {
        console.log(error);
    });
}


/* put it all into a collective get function called getValues()
function playerData() {
    fetch('/mapview/playerData').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(playerObject => {
        let playerData = JSON.parse(playerObject);
        common.textContent =  playerData.common.toString();
        gold.textContent =  playerData.gold.toString();
        troops.textContent =  playerData.troops.toString();
        numberOfTroops.setAttribute("max", troops.textContent);
    }).catch(error => {
        console.log(error);
    });
}
*/