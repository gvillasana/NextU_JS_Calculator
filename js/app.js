var Calculadora = {
  pantalla: {},
  self: this,
  operador1: "",
  operador2: "",
  resultado: "",
  operacion: "",

  init: function(){
    pantalla = document.getElementById("display");
    this.inicializaTecladoPantalla();
  },

  inicializaTecladoPantalla: function(){
    console.log("inicializando teclado en pantalla");
    var teclas = document.getElementsByClassName("tecla");

    for(i=0; i<teclas.length; i++){
      teclas[i].onclick = Calculadora.eventoClickTeclas;
      teclas[i].onmousedown = Calculadora.eventoOprimirTecla;
      teclas[i].onmouseup = Calculadora.eventoLiberarTecla;
    }
  },

  //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

  eventoOprimirTecla: function(event){
    if (event.target.id == "mas") {
      event.target.style.height = "99%";
      event.target.style.width = "89%";
    }else{
      event.target.style.height = "61.9167px";
      event.target.style.width = "77.0667px";
    }
  },
  eventoLiberarTecla: function(event){
    if (event.target.id == "mas") {
      event.target.style.height = "100%";
      event.target.style.width = "90%";
    }else{
      event.target.style.height = "62.9167px";
      event.target.style.width = "77.8667px";
    }
  },

  eventoClickTeclas: function(event){

    console.log("Click registrado: " + event.target.id);
    var target = event.target;

    switch (target.id) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "punto":
      case "sign":
        Calculadora.introducirNumeros(target.id);
        break;
      case "on":
        Calculadora.botonON();
        break;
      case "mas":
      case "menos":
      case "por":
      case "dividido":

        break;
      case "igual":

        break;
      default:
    }
  },

  botonON: function(event){
    Calculadora.escribirPantalla("0");
    console.clear();
  },
  botonIgual: function(){

  },

  //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

  escribirPantalla: function(texto){
    console.log("largo" + texto.replace(".","").length);

    if(texto.replace(".","").replace("-","").length<=8){

      var cantCaracteres = 8;

      if(texto.includes(".")){
        cantCaracteres++;
      }
      if(texto.includes("-")){
        cantCaracteres++;
      }

      pantalla.innerHTML=texto.substring(0,cantCaracteres);
    }
  },
  introducirNumeros: function(num){
    var texto = pantalla.innerHTML;

    if(num=="punto"){
      if(!texto.includes(".")){
        this.escribirPantalla(texto + ".");
      }
    }
    else if(num=="sign"){
      if(texto.includes("-")){
        this.escribirPantalla(texto.substring(1,10));
      }
      else{
        if(texto!=0){
          this.escribirPantalla("-" + texto);
        }
      }
    }
    else if(texto==0 && num!=0){
      this.escribirPantalla(num);
    }
    else if(texto!=0){
      this.escribirPantalla(texto + num);
    }

  }
};


Calculadora.init();
