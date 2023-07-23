function Filtra(){
    var overlay_filtri = document.querySelector('.mappa_prova .overlay .overlay_filtri');
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
    
}