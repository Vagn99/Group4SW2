let gold = document.getElementById('gold2');
let common = document.getElementById('common2');
let troops = document.getElementById('troops2');
let x;
let y;

playerdata();
//setInterval(playerdata, 500);

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
        sendId(event.target.id);

        document.getElementById("dev1").textContent = ""+ event.target.id;
    });
}

//Test function for sending troops
function sendId(id){
    if (id!="") {
        x = id.charAt(1);
        y = id.charAt(2);
        fetch('/mapview/sendId?x=' + x + "&y=" + y).then(response => {
            if (!response.ok) {
                throw new Error("Response error: " + response.status);
            }
            return response.text();
        }).then(handle => {
            console.log("Send nudes");
        }).catch(error => {
            console.log(error);
        });
    }
}