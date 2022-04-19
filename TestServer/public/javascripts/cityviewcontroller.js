//var troopsFile = require('./troops.js')

let gold = document.getElementById('gold2');
let common = document.getElementById('common2');
let troops = document.getElementById('troops2');
let troops2 = document.getElementById('insideTroops');
let name = document.getElementById('name');
let troopTrainingCost = document.getElementById('cost');
//let button2 = document.createElement('buttonTrain');

//button2.addEventListener('click', troopsFile.setCount);

playerdata();
setInterval(playerdata, 500);
//setInterval(troopsFile.getCount, 500);

function playerdata() {
    fetch('/cityview/start').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(playerobject => {
        let playerdata = JSON.parse(playerobject);
        
        common.textContent = playerdata.commonResources.toString();
        gold.textContent = playerdata.goldResources.toString();
        troops2.textContent = playerdata.troopsInside.toString();
        troops.textContent = playerdata.troopsInside.toString();
        insideTroops.textContent = playerdata.troopsInside.toString();
        name.textContent = playerdata.playerName;
        troopTrainingCost.textContent = playerdata.troopTrainingCost.toString();

    }).catch(error => {
        console.log(error);
    });
}



window.onload = function() {
    document.addEventListener('click', function handleClick(event) {
        console.log('Button id:',event.target.id);
    });
}