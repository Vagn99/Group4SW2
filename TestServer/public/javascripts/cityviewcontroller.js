
let gold = document.getElementById('gold2');
let common = document.getElementById('common2');
let troops = document.getElementById('troops2');

let name = document.getElementById('name');
let troopTrainingCost = document.getElementById('cost');
let upgradeButton = document.getElementById("buttonUpgrade");
upgradeButton.addEventListener("click", upgradeTownHall);

var popup = document.getElementById("myPopup");


//Runs at page load

getValues();

//Make the number update every X seconds

setInterval(()=>{
    getValues();
}, 500);
//setInterval(getCount, 500);

function getValues() {
    fetch('/cityview/getValues').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(valuePack => {
        let valueData = JSON.parse(valuePack);
        
        common.textContent = valueData.commonResources.toString();
        gold.textContent = valueData.goldResources.toString();
        troops.textContent = valueData.troopsInside.toString();
        name.textContent = valueData.playerName;
        troopTrainingCost.textContent = valueData.troopTrainingCost.toString();
        document.getElementById("currentLevel").textContent = "Current level: " + valueData.townHallLVL.toString();
        document.getElementById("resourcePassiveIncome").textContent = "Standard income: " + valueData.baseCommonResourcesPerSec.toString();
        document.getElementById("resourceOutsideIncome").textContent = "Outside income: " + (valueData.totalCommonIncome - valueData.baseCommonResourcesPerSec);
        document.getElementById("goldCost").textContent = valueData.upgradeCostTownHall[1].toString();
        document.getElementById("commonCost").textContent = valueData.upgradeCostTownHall[0].toString();
        document.getElementById("borderColor").style.borderColor = valueData.color;
        document.getElementById("level").textContent = 'Your level: ' + valueData.townHallLVL.toString();
        if (valueData.winner!=""){
            victoryChecker();
        }
    }).catch(error => {
        console.log(error);
    });
}

function upgradeTownHall() {
    fetch('/cityview/upgradeTownHall').then(response => {
        if (!response.ok) {
            throw new Error("Response error: " + response.status);
        }
        return response.text();
    }).then(upgradeResponse => {
        let upgradeText = document.getElementById("upgradeButtonInfo");
        if (isNaN(Number(upgradeResponse))){
            upgradeText.textContent = upgradeResponse;
        } else {
            let upgradeTime = Number(upgradeResponse);
            upgradeTimer(upgradeTime, upgradeText);
        }
    }).catch(error => {
        console.log(error);
    });
}

function upgradeTimer(upgradeTime, upgradeText) {
    upgradeText.textContent = "Upgrade finished in " + upgradeTime + " seconds";
    if (upgradeTime == 0){
        upgradeText.textContent = "Done";
    } else {
        setTimeout(() => {
            upgradeTime--;
            upgradeTimer(upgradeTime, upgradeText);
        }, 1000)
    }
}



window.onload = function() {

    var barrack = document.getElementsByClassName("selector1")[0];
    var townhall = document.getElementsByClassName("selector2")[0];
    var resource = document.getElementsByClassName("selector3")[0];

    barrack.style.display = "none";
    townhall.style.display = "none";
    resource.style.display = "none";

    //Im gonna switch it !
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




