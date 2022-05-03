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

getValues();

setInterval(()=>{
    getValues();
}, 5000);

window.onload = function() {
    document.addEventListener('click', function handleClick(event) {
        console.log('Button id:',event.target.id);
        currentTileSelected(event.target.id);
       
        array = event.target.id.split('i')
        document.getElementsByClassName('i1')[0].textContent = array[1];

    });
}

/*
function tile(id) {
    array = id.split('i')
    return array[1];
}
*/

function currentTileSelected(id){
    if (id!=""&&Number(id.charAt(1))<10) {
        x = id.charAt(1);
        y = id.charAt(2);
    }
}

//Test function for sending troops
function sendTroopsToLocation(){
    if (Number(document.querySelector('input').value)>Number(troops.textContent))
        document.querySelector('input').value = troops.textContent;
    if (x!=undefined&&y!=undefined) {
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
            if (battleOutcome.victory){
                document.getElementById("i" + x.toString() + y.toString()).setAttribute("owner", user);
            }

        })
        .catch(error => {
            console.log(error);
        });
    }
}

function getValues(){
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
                if(i<5) {
                    if (j < i + 5) {
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("owner", loadValues.mapObject[i][j].owner);
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("troopsInside", loadValues.mapObject[i][j].troopsInside);
                        someString += i.toString()+j.toString()+" ";
                    } else {
                        someString += "xx ";
                    }
                } else {
                    if (j<i-4){
                        someString += "xx ";
                    } else {
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("owner", loadValues.mapObject[i][j].owner);
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("troopsInside", loadValues.mapObject[i][j].troopsInside);
                        someString += i.toString()+j.toString()+" ";
                    }
                }
            }
            endString = someString+"\n"+endString;
            someString = "";
        }
        console.log(endString);

        common.textContent =  loadValues.playerObject.common.toString();
        gold.textContent =  loadValues.playerObject.gold.toString();
        troops.textContent =  loadValues.playerObject.troops.toString();
        numberOfTroops.setAttribute("max", troops.textContent);


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