var foundUser = {};
var data = '';

function goMap(){
  var telefono = document.getElementById("NumeroTelefono").value;
  console.log(telefono);

  const url = `../api/v1/users/telefoni/${telefono}`;

  console.log(url);

  fetch(url, {
    method: 'GET'
  })

  .then((resp) => {
      data = resp.json();
      return data;
  })

.then(function(data) { // Here you get the data to modify as you please
  foundUser.self = data.self;
  foundUser.telefono = data.telefono;
  foundUser.coordX = data.coordX;
  foundUser.coordY = data.coordY;
  console.log(data);

  sessionStorage.setItem('userCoordinates', JSON.stringify({ coordX: data.coordX, coordY: data.coordY }));
  Enter(data.success );

})

.catch(error => console.error(error));
};

function goBack() {
  window.location.href = "../";
}

function Enter(dato){

  if( dato === true ){
    window.location.href = "./MapCall.html";
  
  }else{
    console.log("L'utente non è stato autenticato correttamente. Gestisci l'errore appropriatamente.");
  }
  return;
}