var map = L.map('map').setView([0, 0], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
  L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

function zoomIn() {
  map.zoomIn();
}

function zoomOut() {
  map.zoomOut();
}

// Recupera le coordinate utente da authentications.js
var userCoordinates = GoMap();

// Posiziona il marker sulla mappa utilizzando le coordinate utente
if (userCoordinates) {
  var userLatLng = L.latLng(userCoordinates.coordX, userCoordinates.coordY);
  L.marker(userLatLng).addTo(map).bindPopup("Posizione Utente").openPopup();
  map.setView(userLatLng, 13);
}

function GoMap() {

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

  sessionStorage.setItem('isCall', data.success);

    })
    .catch(error => console.error(error));


  // Restituisci le coordinate utente
  return {
    coordX: utente.coordX,
    coordY: utente.coordY
  };
}
