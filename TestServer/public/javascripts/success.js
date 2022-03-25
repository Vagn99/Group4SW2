//Add event listener to button
let button = document.getElementById("button");
button.addEventListener("click", setCount);

let countDown = document.getElementById("countDown");
let showQueue = document.getElementById("queue");
let working = false;
let queue = 0;


//Runs at page load
getCount();

//Make the number update every X seconds
setInterval(getCount, 5000);



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