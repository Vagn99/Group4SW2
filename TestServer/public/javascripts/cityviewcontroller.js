let gold = document.getElementById('gold');
let common = document.getElementById('common');
let troops = document.getElementById('troops');

playerdata();
setInterval(playerdata, 500);

function playerdata() {
    fetch('/cityview/playerdata').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(playerobject => {
        let playerdata = JSON.parse(playerobject);
        common.textContent = 'Common: ' + playerdata.common.toString();
        gold.textContent = 'Gold: ' + playerdata.gold.toString();
        troops.textContent = 'Troops: ' + playerdata.troops.toString();
    
    }).catch(error => {
        console.log(error);
    });
}

window.onload = function() {
    document.addEventListener('click', function handleClick(event) {
        console.log('Button id:',event.target.id);
        document.getElementById("dev1").textContent = ""+ event.target.id;
        if (event.target.id == 'nav1') {
            location.href = 'cityview';
        }
        if (event.target.id == 'nav2') {
            location.href = 'mapview';
        }
    });
}

