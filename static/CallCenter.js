var searchA = {};
var data = '';

function getUserCOordinates(){

    var telefono = document.getElementById("NumeroTelefono").value;

    fetch('../api/v1/users',{

        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({telefono:telefono}),
      
      })
      .then((resp) => {
        data = resp.json();
        return data;
      })

      .then(function(data){
        if(data.success){

            //save the coordinates of the user for future use
            sessionStorage.setItem('userCoordinates', JSON.stringify({ coordX: data.coordX, coordY: data.coordY }));
            Enter(data.success);
        }else{

            alert("telephone number not find in the database.");
        }
      })
    .catch(error=> console.error(error));
}

function Enter(dato){

  if(dato === true){
    window.location.href = "./MapCall.html";
    
  }else{
    console.log("L'utente non è stato autenticato correttamente. Gestisci l'errore appropriatamente.");
  }
  return;
}
