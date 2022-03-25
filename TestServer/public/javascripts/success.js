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

//Runs at page load
getCount();

//Make the number update every X seconds
setInterval(getCount, 5000);

//Add event listener to button
let button = document.getElementById("button");
button.addEventListener("click", setCount);

let countDown = document.getElementById("countDown");

//Request server to count
function setCount() {
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
                getCount();
            }
            console.log(j);
        }, 1000)
        console.log(text);

    }).catch(error => {
        console.log(error);
    });
    getCount();
}