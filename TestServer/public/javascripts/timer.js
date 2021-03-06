let timer = document.getElementById('timer');
let local_timer = 0;

//Fetch timer on load
fetch('/timer').then(response => {
    if(!response.ok) {
        throw new Error("Response error: " + response.status);
    }
    return response.text();
}).then(text =>{
    timer.textContent = `Server time ${text} s`;
    local_timer = text;
}).catch(error => {
    console.log(error);
});

//Continue timer locally
setInterval(() => {
    local_timer++;
    timer.textContent = `Server time ${local_timer} s`;
}, 1000);


function victoryChecker() {
        console.log("Someone won!");
        fetch('/timer/victory').then(response => {

        });
}