function Test(id) {
    var id = id
    console.log(id)
}

function show(btn) {
    console.log('Button id:',btn.id);
    document.getElementById("dev1").textContent = 'Hex id:\n' + btn.id;
  }