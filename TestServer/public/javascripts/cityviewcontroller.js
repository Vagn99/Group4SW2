let gold = document.getElementById('gold2');
let common = document.getElementById('common2');
let troops = document.getElementById('troops2');
let name = document.getElementById('name');

playerdata();
setInterval(playerdata, 500);

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
        troops.textContent = playerdata.troopsInside.toString();
        name.textContent = playerdata.playerName;

    }).catch(error => {
        console.log(error);
    });
}

window.onload = function() {
    document.addEventListener('click', function handleClick(event) {
        console.log('Button id:',event.target.id);
    });
}

var barracksModal = document.getElementById("barracksModal");
var barracksBtn = document.getElementById("button_barrack");
var barracksSpan = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
barracksBtn.onclick = function() {
    barracksModal.style.display = "block";
}
  
// When the user clicks on <span> (x), close the modal
barracksSpan.onclick = function() {
    barracksModal.style.display = "none";
}
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === barracksModal) {
        barracksModal.style.display = "none";
    }
}