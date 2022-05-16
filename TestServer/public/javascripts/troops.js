//Add event listener to button
let button = document.getElementById("buttonTrain");
button.addEventListener("click", setCount);

let countDown = document.getElementById("queueTime");
let showQueue = document.getElementById("queue");

let working = false;
let queue = 0;
let barrackTrainingTime = 0;


//Runs at page load
getStart();

//Make the number update every X seconds


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
        troops.textContent = town.troopsInside.toString();
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
        troops.textContent = text;
    }).catch(error => {
        console.log(error);
    });
}


//Request server to count
function setCount() {
    fetch('/number/set')
        .then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status)
        }
        return response.text();})
        .then(text => {
        queue = Number(text);

        if (!working && queue > 0) {
            //Function
            showQueue.textContent = queue.toString();
            displayWork(barrackTrainingTime/10);
        } else if (queue === 0){
            showQueue.textContent = "Not enough resources!"
            new Notify ({
                title: 'Barrack',
                text: 'Not enough resources!',
                autoclose: true,
                autotimeout: 3000,
                position: 'left top',
                status: 'error'
            });
        } else if (queue > 0){
            showQueue.textContent = queue.toString();
        } else {
            showQueue.textContent = "";
        }
        console.log(text);})
        .catch(error => {
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
                showQueue.textContent = "0";
                working = false;
            }
        } else {
            j--;
            countDown.textContent = "Next troop ready in " + j + " seconds";
        }
    }, 1005)

}
