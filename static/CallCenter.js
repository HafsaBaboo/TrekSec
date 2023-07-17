var searchA = {};
var data = '';

function GoMap(){

    var telefono = document.getElementById("NumeroTelefono").value;

    fetch('../api/v1/authentications',{

      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({telefono:telefono}),
    
    })

    
  .then((resp) => {
    data = resp.json();
    return data;
  })
 

  .then(function(data){
    searchAdmin.telefono = data.telefono;
    searchAdmin.coordX = data.coordX;
    searchAdmin.coordY = data.coordY;
    searchAdmin.id = data.id;
    searchAdmin.self = data.self;

  console.log(data.success);
  
  sessionStorage.setItem('searchAdmin', searchAdmin.id); // Salvataggio dei dati nel session storage
  Enter(data.success);     

  sessionStorage.setItem('isCall', data.success);

})
.catch(error => console.error(error));
};

function updateCoordinates() {
  
  const loggedUsersData = sessionStorage.getItem('loggedUsers'); // Recupero dei dati dal session storage
  const token = sessionStorage.getItem('loggedUserToken'); // Salvataggio dei dati nel session storage
  const success = sessionStorage.getItem('isLoggedUser');

  console.log(success);
  if(success){
    console.log("TRUE");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coordX = position.coords.latitude;
            const coordY = position.coords.longitude;
    
            fetch('../api/v1/users/' + loggedUsersData + '/coordinates', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
              },
              body: JSON.stringify({ coordX, coordY }),
            })
    
    
              .then((response) => response.json())
              .then((data) => {
                console.log('Risposta dal server:', data);
              })
              .catch((error) => {
                // Gestisci gli errori di rete o altri errori
                console.error(error);
              });
          },
          (error) => {
            // Gestisci gli errori di geolocalizzazione
            console.error(error);
          }
        );
      } else {
        // Il browser non supporta la geolocalizzazione
        console.error('Geolocation is not supported by this browser.');
      }
      setTimeout(updateCoordinates, 20000);
    } else {
      console.log("FALSO");
    }
  return;
  }



function Enter(dato){

  if(dato === true){
    updateCoordinates();
    //setInterval(updateCoordinates, 20000);
    window.location.href = "./MapCall.html";
    
  }else{
    console.log("L'utente non è stato autenticato correttamente. Gestisci l'errore appropriatamente.");
  }
  return;
}

function goBack() {
  window.location.href = "../";
}