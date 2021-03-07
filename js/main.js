//Funcionalidad boton buscar
var buscarButton = document.getElementById("buscarButton");
buscarButton.addEventListener("click",test,false);



//Hotel o destino
var hotelDestino = document.getElementById("hotelDestino");
//fecha entrada
var fechaEntrada = document.getElementById("fechaEntrada");

// Comprobación fecha válida
var fechaactual = document.querySelector('#fechaEntrada');
var date = new Date();

let year = date.getFullYear();
let month = date.getMonth()+1 < 10 ? "0"+ (date.getMonth() + 1) : date.getMonth() + 1;
let day = date.getDate() < 10 ? "0"+ date.getDate() : date.getDate();

fechaactual.min = year + "-" + month + "-" + day;
fechaactual.value = year + "-" + month + "-" + day;


//Activo los popover
$(function () {
    $('[data-toggle="popover"]').popover({
        html:true
    });
});


//Gestion popover nº noches

function getNochesContent(){
    let temp = document.getElementsByTagName("template")[0];
    let clon = temp.content.cloneNode(true);
    return clon;
}
var noches = document.getElementById("noches");

noches.addEventListener("blur",getOption,true);

$('#noches').popover({
    html:true,
    content:getNochesContent,
    sanitize: false,
    placement:'bottom',
    trigger: "click"

});


function getOption() {

    /* Para obtener el valor */
    var select = document.getElementById("selectNoches");
    select.addEventListener("change",function(){
        var optSelected = document.getElementById("selectNoches").value;
        noches.value = optSelected;
        $("#noches").popover("hide");
    },false);
}




$('#inputHabitaciones').popover({
    html: true,
    placement: 'bottom',
    content: getHabContent,
    sanitize: false,
});

function getHabContent(){
     let temp = document.getElementsByTagName("template")[1];
     let clon = temp.content.cloneNode(true);
     
     return clon;
}


if(numHab == undefined){
    var numHab = 1;
}

function addHab(){
    var auxHabs = document.getElementsByClassName("hab");
    var newHab = auxHabs[0].cloneNode(true);
    numHab++;
    var delHabImg = newHab.firstElementChild.firstElementChild;
    delHabImg.addEventListener("click",deleteHab,false);
    document.querySelector(".habitaciones").appendChild(newHab);
}

function deleteHab() {
    this.parentNode.parentNode.remove();
}
if(nHabitaciones == undefined){
    var totalAdultos = 0;
    var totalChildren = 0;
    var nHabitaciones = 0;
}


function doneHab(){
    nHabitaciones = document.getElementsByClassName("hab").length;
    var inputHab = document.getElementById("inputHabitaciones");
    var nChildrens = document.getElementsByClassName("ninos");
    var nAdultos = document.getElementsByClassName("adulto");

    for(let i = 0; i < nAdultos.length; i++){
        totalAdultos += parseInt(nAdultos[i].value,10);
    }
    for(let i = 0; i < nChildrens.length; i++){
        totalChildren += parseInt(nChildrens[i].value,10);
    }
    var totalGuests = totalAdultos+totalChildren;
    inputHab.placeholder = nHabitaciones + " rooms & "+ totalGuests + " guests";
    
    $('#inputHabitaciones').popover("hide");
}

function getChildSelect(){
    var nChildrens = document.getElementsByClassName("ninos");
    var edades = document.getElementsByClassName("edades");

    let nEdades = nChildrens.length;
    let contador = 0;

    while(contador < nEdades){

        if(nChildrens[contador].value > 0){

            while(edades[contador].firstChild){
                edades[contador].removeChild(edades[contador].firstChild); 
            }

            for (let i = 0; i < nChildrens[contador].value; i++) {
                var select = edades[contador].appendChild(document.createElement('select'));
                let cont = 0;
                while (cont <= 12) {
                    var opcion = select.appendChild(document.createElement('option'));
                    opcion.appendChild(document.createTextNode(cont));
                    opcion.value = cont;
                    cont++;
                }
            }
        }
        if(nChildrens[contador.value == 0]){
            while(edades[contador].firstChild){
                edades[contador].removeChild(edades[contador].firstChild);
            }
        }
        contador++;
    }
}



function test(){
    console.log("RESERVA HOTELERA");
    console.log("Destino:"+hotelDestino.value);
    console.log("Fecha de entrada: "+fechaEntrada.value);
    console.log("Número de noches: "+noches.value);
    console.log("Habitaciones: "+nHabitaciones);
    console.log("Guests: ");
    console.log("   Adultos:" +totalAdultos);
    console.log("   Niños:" +totalChildren);
    
}