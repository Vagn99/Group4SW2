function getCount(){
    fetch('/number/get').then(response => {
        if(!response.ok){
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
    setInterval(getCount,5000);

    //Add event listener to button
    let button = document.getElementById("button");
    button.addEventListener("click", setCount);

    //Request server to count 
    function setCount(){
    fetch('/number/set').then(response => {
        if(!response.ok){
        throw new Error("Response error: " + response.status)
        }
        return response.text();
    }).then(text =>{
        console.log(text);
    }).catch(error => {
        console.log(error);
    });
    getCount();
    }