var Calculadora = {
  pantalla: {},
  operador1: "",
  operador2: "",
  resultado: "",
  operacion: "",
  repeticionOperacion: false,

  init: function(){
    pantalla = document.getElementById("display");
    this.inicializaTecladoPantalla();
  },

  //Función para asignar los eventos de los botones de tecla
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

  //Evento que se ejecuta al presionar una tecla y disminuye las dimensiones
  eventoOprimirTecla: function(event){
    if (event.target.id == "mas") {
      event.target.style.height = "99%";
      event.target.style.width = "89%";
    }else{
      event.target.style.height = "61.9167px";
      event.target.style.width = "77.0667px";
    }
  },
  //Evento que se ejecuta al soltar una tecla y restablece las dimensiones
  eventoLiberarTecla: function(event){
    if (event.target.id == "mas") {
      event.target.style.height = "100%";
      event.target.style.width = "90%";
    }else{
      event.target.style.height = "62.9167px";
      event.target.style.width = "77.8667px";
    }
  },

  //Evento para todas las teclas
  //Dependiendo de la tecla oprimida se ejecutará la función adecuada
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
        Calculadora.botonOperacion(target.id);
        break;
      case "igual":
        Calculadora.botonIgual();
        break;
    }
  },

  //Evento que se ejecuta cuando se hace clic en el botón ON/C
  botonON: function(event){
    Calculadora.escribirPantalla("0");
    console.clear();
  },
  //Evento que se ejecuta cuando se hace clic en un botón de operación aritmética
  botonOperacion: function(operacion){
    var texto = pantalla.innerHTML;

    Calculadora.operador1 = texto;
    Calculadora.operacion = operacion;
    Calculadora.repeticionOperacion = false;
    this.escribirPantalla("");
  },
  //Evento que se ejecuta al hacer clic en el botón igual
  botonIgual: function(){
    var texto = pantalla.innerHTML;

    //Lógica que permite la secuencia de operaciones al presionar el botón =
    if(Calculadora.repeticionOperacion){
      Calculadora.operador1 = Calculadora.resultado;
    }else{
      Calculadora.operador2 = texto;
    }

    Calculadora.repeticionOperacion = true;

    switch (Calculadora.operacion) {
      case "mas":
        Calculadora.resultado = parseFloat(Calculadora.operador1) + parseFloat(Calculadora.operador2);
        break;
      case "menos":
        Calculadora.resultado = parseFloat(Calculadora.operador1) - parseFloat(Calculadora.operador2);
        break;
      case "por":
        Calculadora.resultado = parseFloat(Calculadora.operador1) * parseFloat(Calculadora.operador2);
        break;
      case "dividido":
        Calculadora.resultado = parseFloat(Calculadora.operador1) / parseFloat(Calculadora.operador2);
        break;
    }

    console.log("Resultado: " + Calculadora.resultado);
    this.escribirPantalla("" + Calculadora.resultado);
  },

  //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
  //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

  //Función para imprimir cualquier texto en pantalla
  escribirPantalla: function(texto){
    console.log("Imprimiendo: " + texto);

    var cantCaracteres = 8;

    if(texto.includes(".")){
      cantCaracteres++;
    }
    if(texto.includes("-")){
      cantCaracteres++;
    }

    pantalla.innerHTML=texto.substring(0,cantCaracteres);
  },

  //Función que se ejecuta al hacer clic en un botón de número, punto o signo negativo
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
    else if(texto==0 && texto.includes(".")){
      this.escribirPantalla(texto + num);
    }
    else if(texto==0 && num!=0){
      this.escribirPantalla(num);
    }
    else if(texto!=0){
      this.escribirPantalla(texto + num);
    }

  }
};

//Inicializa los eventos y las propiedades del objeto Calculadora
Calculadora.init();
