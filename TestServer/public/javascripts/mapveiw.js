window.onload = function() {
    document.addEventListener('click', function handleClick(event) {
        console.log('Button id:',event.target.id);
        document.getElementById("dev1").textContent = ""+ event.target.id;
    });
}

function start() {
    fetch
}