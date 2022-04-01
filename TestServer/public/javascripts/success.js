//Add event listener to button
let button = document.getElementById("button");
button.addEventListener("click", setCount);

let countDown = document.getElementById("countDown");
let showQueue = document.getElementById("queue");

let working = false;
let queue = 0;
let barrackTrainingTime = 0;


//Runs at page load
getStart();

//Make the number update every X seconds
setInterval(getCount, 5000);


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
        document.querySelector("#count").textContent = town.troopsInside.toString() + " troops in town";
        barrackTrainingTime = town.trainingTime;
        if (town.queue>0) {
            queue = town.queue;
            console.log("queue is: "+ queue);
            showQueue.textContent = queue.toString() + " troops in queue";
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
        document.querySelector("#count").textContent = text;
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

            if (!working) {
                //Function
                displayWork(barrackTrainingTime/10);
            } else {
                showQueue.textContent = queue.toString() + " troops in queue";
            }
            console.log(text);
        }).catch(error => {
            console.log(error);
        });
}

function displayWork(workTime) {
    working = true;
    let j = parseInt(workTime);
    countDown.textContent = "Troop ready in " + j + " seconds";
    let intervalCount = setInterval(() => {
        if (j === 0) {
            clearInterval(intervalCount);
            countDown.textContent = "";
            getCount();
            console.log("Queue is: "+ queue);
            if (queue > 0) {
                queue--;
                queue===0?showQueue.textContent = "" : showQueue.textContent = queue.toString() + " troops in queue";
                displayWork(barrackTrainingTime/10);
            } else {
                showQueue.textContent = "";
                working = false;
            }
        } else {
            j--;
            countDown.textContent = "Troop ready in " + j + " seconds";
        }
        //console.log(j);
    }, 1005)

}
/*
//Request server to count
function setCount() {
    if (!working) {
        working = true;
        fetch('/number/set'
        ).then(response => {
            if (!response.ok) {
                throw new Error("Response error: " + response.status)
            }
            return response.text();
        }).then(text => {
            let j = Number(text);
            console.log(j);
            countDown.textContent = "Troop ready in " + j + " seconds";
            let intervalCount = setInterval(() => {
                j--;
                countDown.textContent = "Troop ready in " + j + " seconds";
                if (j === 0) {
                    clearInterval(intervalCount);
                    countDown.textContent = "";
                    working = false;
                    getCount();
                    if (queue>0){
                        queue--;
                        showQueue.textContent = queue.toString() + " troops in queue";
                        setCount();
                    } else {
                        showQueue.textContent = "";
                    }
                }
                console.log(j);
            }, 1000)
            console.log(text);

        }).catch(error => {
            console.log(error);
        });
        getCount();
    } else {
        queue++;
        showQueue.textContent = queue.toString() + " troops in queue";
    }
}
*/