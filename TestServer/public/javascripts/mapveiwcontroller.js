let gold = document.getElementById('gold2');
let common = document.getElementById('common2');
let troops = document.getElementById('troops2');

let numberOfTroops = document.getElementById("numberOfTroops");
let attackButton = document.getElementById("buttonAttack");
attackButton.addEventListener("click", sendId);
let x;
let y;

playerdata();
setInterval(playerdata, 5000);

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
    if (x!=undefined&&y!=undefined) {
        fetch('/mapview/sendId?x=' + x + "&y=" + y + "&troopsSend=" + document.querySelector('input').value)
        .then(response => {
            if (!response.ok) {
                throw new Error("Response error: " + response.status);
            }
            return response.text();
        })
        .then(handle => {
            console.log(document.querySelector('input').value);
            console.log("Send nudes");
        })
        .catch(error => {
            console.log(error);
        });
    }
}