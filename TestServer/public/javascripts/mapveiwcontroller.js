let gold = document.getElementById('gold2');
let common = document.getElementById('common2');
let troops = document.getElementById('troops2');
let user = document.getElementById("name").textContent;

let numberOfTroops = document.getElementById("numberOfTroops");
let attackButton = document.getElementById("buttonAttack");
attackButton.addEventListener("click", sendId);
let x;
let y;

playerdata();
getStartView();

setInterval(()=>{
    playerdata();
    getStartView();
}, 5000);

function playerdata() {
    fetch('/mapview/playerdata').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(playerobject => {
        let playerdata = JSON.parse(playerobject);
        common.textContent =  playerdata.common.toString();
        gold.textContent =  playerdata.gold.toString();
        troops.textContent =  playerdata.troops.toString();
        numberOfTroops.setAttribute("max", troops.textContent);
    }).catch(error => {
        console.log(error);
    });
}

window.onload = function() {
    document.addEventListener('click', function handleClick(event) {
        console.log('Button id:',event.target.id);
        currentTileSelected(event.target.id);

        document.getElementById("dev1").textContent = ""+ event.target.id;
    });
}

function currentTileSelected(id){
    if (id!=""&&Number(id.charAt(1))<10) {
        x = id.charAt(1);
        y = id.charAt(2);
    }
}

//Test function for sending troops
function sendId(){
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

function getStartView(){
    fetch('/mapview/start').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(startObject => {
        let loadStartValues = JSON.parse(startObject);
        let someString = "";
        let endString = "";
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if(i<5) {
                    if (j < i + 5) {
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("owner", loadStartValues[i][j].owner)
                        someString += i.toString()+j.toString()+" ";
                    } else {
                        someString += "xx ";
                    }
                } else {
                    if (j<i-4){
                        someString += "xx ";
                    } else {
                        document.getElementById("i" + i.toString() + j.toString()).setAttribute("owner", loadStartValues[i][j].owner)
                        someString += i.toString()+j.toString()+" ";
                    }
                }
            }
            endString = someString+"\n"+endString;
            someString = "";
        }
        console.log(endString);
    }).catch(error => {
        console.log(error);
    });
}