
var foundDanger = {};
var data = '';

function toggleFiltri(){
    var overlay_filtri = document.querySelector('.overlay_filtri');
    overlay_filtri.classList.toggle('active');

}

function getPericoli(){
    var orso = document.getElementById("orso").checked;
    var incendio = document.getElementById("incendio").checked;
    var valanga = document.getElementById("valanga").checked;
    var zonaDiCaccia = document.getElementById("zonaDiCaccia").checked;

    console.log(orso);
    console.log(incendio);
    console.log(valanga);
    console.log(zonaDiCaccia);

    if(orso == true){
        fetch(`../api/v1/dangers/orsi`, {
            method: 'GET'
        })
        .then((resp) => {
            data = resp.json();
            return data;
        })
        .then(function(data) { // Here you get the data to modify as you please
            foundDanger.self = data.self;
            foundDanger.type = data.telefono;
            foundDanger.coordX = data.coordX;
            foundDanger.coordY = data.coordY;
            console.log(data);
          
        })
          
        .catch(error => console.error(error));
    }

    if(incendio == true){
        fetch(`../api/v1/dangers/incendio`, {
            method: 'GET'
        })
        .then((resp) => {
            data = resp.json();
            return data;
        })
        .then(function(data) { // Here you get the data to modify as you please
            foundDanger.self = data.self;
            foundDanger.type = data.telefono;
            foundDanger.coordX = data.coordX;
            foundDanger.coordY = data.coordY;
            console.log(data);
          
        })
          
        .catch(error => console.error(error));        
    }

    if(valanga == true){
        fetch(`../api/v1/dangers/valanga`, {
            method: 'GET'
        })
        .then((resp) => {
            data = resp.json();
            return data;
        })
        .then(function(data) { // Here you get the data to modify as you please
            foundDanger.self = data.self;
            foundDanger.type = data.telefono;
            foundDanger.coordX = data.coordX;
            foundDanger.coordY = data.coordY;
            console.log(data);
          
        })
          
        .catch(error => console.error(error));  
    }

    if(zonaDiCaccia == true){
        fetch(`../api/v1/dangers/zona di caccia`, {
            method: 'GET'
        })
        .then((resp) => {
            data = resp.json();
            return data;
        })
        .then(function(data) { // Here you get the data to modify as you please
            foundDanger.self = data.self;
            foundDanger.type = data.telefono;
            foundDanger.coordX = data.coordX;
            foundDanger.coordY = data.coordY;
            console.log(data);
          
        })
          
        .catch(error => console.error(error));  
    }
}

function Sos_Button(){

    window.location.href = "tel:3487156282"; //number of one of the member of the team work, please change if testing the application
}
