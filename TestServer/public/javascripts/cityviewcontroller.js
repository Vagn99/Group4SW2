
let gold = document.getElementById('gold2');
let common = document.getElementById('common2');
let troops = document.getElementById('troops2');
//let troops2 = document.getElementById('insideTroops');
let name = document.getElementById('name');
let troopTrainingCost = document.getElementById('cost');

//Add event listener to button
/*
let button = document.getElementById("buttonTrain");
button.addEventListener("click", setCount);

let countDown = document.getElementById("queueTime");
let showQueue = document.getElementById("queue");

let working = false;
let queue = 0;
let barrackTrainingTime = 0;
*/


//Runs at page load
//getStart();
playerdata();

//Make the number update every X seconds

setInterval(()=>{
    playerdata();
}, 500);
//setInterval(getCount, 500);

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
        //troops2.textContent = playerdata.troopsInside.toString();
        troops.textContent = playerdata.troopsInside.toString();
        name.textContent = playerdata.playerName;
        troopTrainingCost.textContent = playerdata.troopTrainingCost.toString();

    }).catch(error => {
        console.log(error);
    });
}

function upgradeTownHall() {
    fetch('/upgradeTownHall').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(upgradeResponse => {
        //Set name displaying response = upgrade response.
        //the responses are either time to upgrade complete in secs (as a string), or "Not enough resources"
    }).catch(error => {
        console.log(error);
    });
}







window.onload = function() {

    var barrack = document.getElementsByClassName("selector1")[0];
    var townhall = document.getElementsByClassName("selector2")[0];
    var resource = document.getElementsByClassName("selector3")[0];

    barrack.style.display = "none";
    townhall.style.display = "none";
    resource.style.display = "none";

    document.addEventListener('click', function handleClick(event) {
        console.log('Button id:',event.target.id);
        if (event.target.id == 'button_barrack') {
                if (townhall.style.display === "grid" || resource.style.display === "grid") {
                    townhall.style.display = "none";
                    resource.style.display = "none";
                    
            }
            barrack.style.display = "grid";
        }        
        if (event.target.id == 'button_townhall') {
                if (barrack.style.display === "grid" || resource.style.display === "grid") {
                    barrack.style.display = "none";
                    resource.style.display = "none";
                    
            }
            townhall.style.display = "grid";
        }  
        if (event.target.id == 'button_resource') {
                if (barrack.style.display === "grid" || townhall.style.display === "grid") {
                    barrack.style.display = "none";
                    townhall.style.display = "none";
                    
            }
            resource.style.display = "grid";
        }
    });
}

//This!!!
/*

function getStart(){
    fetch('/number/start').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(townJason => {
        //Object parsing dont work!!!
        let town = JSON.parse(townJason);
        console.log(town);
        troops2.textContent = town.troopsInside.toString();
        barrackTrainingTime = town.trainingTime;
        if (town.queue>0) {
            queue = town.queue;
            console.log("queue is: "+ queue);
            showQueue.textContent = queue.toString();
        }
        if (town.barrackInUse){
            //needs time from server
            displayWork(parseInt(town.trainingTimeLeft/10));
        }

        console.log("View started");
    }).catch(error => {
        console.log(error);
    });
}

function getCount() {
    fetch('/number/get').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(text => {
        console.log("Updating count!");
        troops2.textContent = text;
    }).catch(error => {
        console.log(error);
    });
}


//Request server to count
function setCount() {
    fetch('/number/set'
    ).then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status)
        }
        return response.text();
    }).then(text => {
        queue = Number(text);

        if (!working && queue > 0) {
            //Function
            showQueue.textContent = queue.toString();
            displayWork(barrackTrainingTime/10);
        } else if (queue === 0){
            showQueue.textContent = "Not enough resources!"
        } else if (queue > 0){
            showQueue.textContent = queue.toString();
        } else {
            showQueue.textContent = "";
        }
        console.log(text);
    }).catch(error => {
        console.log(error);
    });
}

function displayWork(workTime) {
    working = true;
    let j = parseInt(workTime);
    countDown.textContent = "Next troop ready in " + j + " seconds";
    let intervalCount = setInterval(() => {
        if (j === 1) {
            clearInterval(intervalCount);
            countDown.textContent = "";
            getCount();
            console.log("Queue is: "+ queue);
            if (queue > 1) {
                queue--;
                showQueue.textContent = queue.toString();
                displayWork(barrackTrainingTime/10);
            } else {
                showQueue.textContent = "";
                working = false;
            }
        } else {
            j--;
            countDown.textContent = "Next troop ready in " + j + " seconds";
        }
    }, 1005)

} */


