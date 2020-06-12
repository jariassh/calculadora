/*=============================================
OBJETO CON LAS PROPIEDADES DE LA CALCULADORA
=============================================*/

var p = {

	teclas: document.querySelectorAll("#calculadora ul li"),
	accion: null,
	digito: null,
	operaciones: document.querySelector("#operaciones"),
	cantidadSignos: 0,
	cantidadDecimal: false,
	resultado: false,
	hayNumero: false,
	haySigno: false
}



/*=============================================
OBJETO CON LOS METODOS DE LA CALCULADORA
=============================================*/
var m = {

	inicio: function() {

		for (var i = 0; i < p.teclas.length; i++) {
			p.teclas[i].addEventListener("click", m.oprimirTeclas);
		}
	},

	teclado: function() {

		document.addEventListener("keydown", m.oprimir);
	},

	oprimir: function(tecla) {


		if (tecla.keyCode == 48 || tecla.keyCode == 96) {
			p.accion = "numero";
			p.digito = 0;
		} else

		if (tecla.keyCode == 49 || tecla.keyCode == 97) {
			p.accion = "numero";
			p.digito = 1;
		} else

		if (tecla.keyCode == 50 || tecla.keyCode == 98) {
			p.accion = "numero";
			p.digito = 2;
		} else

		if (tecla.keyCode == 51 || tecla.keyCode == 99) {
			p.accion = "numero";
			p.digito = 3;
		} else

		if (tecla.keyCode == 52 || tecla.keyCode == 100) {
			p.accion = "numero";
			p.digito = 4;
		} else

		if (tecla.keyCode == 53 || tecla.keyCode == 101) {
			p.accion = "numero";
			p.digito = 5;
		} else

		if (tecla.keyCode == 54 || tecla.keyCode == 102) {
			p.accion = "numero";
			p.digito = 6;
		} else

		if (tecla.keyCode == 55 || tecla.keyCode == 103) {
			p.accion = "numero";
			p.digito = 7;
		} else

		if (tecla.keyCode == 56 || tecla.keyCode == 104) {
			p.accion = "numero";
			p.digito = 8;
		} else

		if (tecla.keyCode == 57 || tecla.keyCode == 105) {
			p.accion = "numero";
			p.digito = 9;
		} else

		if (tecla.keyCode == 187 || tecla.keyCode == 107) {
			p.accion = "signo";
			p.digito = "+";
		} else

		if (tecla.keyCode == 189 || tecla.keyCode == 109) {
			p.accion = "signo";
			p.digito = "-";
		} else

		if (tecla.keyCode == 88 || tecla.keyCode == 106) {
			p.accion = "signo";
			p.digito = "*";
		} else

		if (tecla.keyCode == 111) {
			p.accion = "signo";
			p.digito = "/";
		} else

		if (tecla.keyCode == 190 || tecla.keyCode == 110) {
			p.accion = "decimal";
			p.digito = ".";
		} else

		if (tecla.keyCode == 13) {
			p.accion = "igual";
		} else

		if (tecla.keyCode == 8) {
			p.accion = ""
			m.limpiarDisplay();

		} else {
			p.accion = "";
			p.digito = "";
		}

		m.calculadora(p.accion, p.digito);
	},

	oprimirTeclas: function(tecla) {
		p.accion = tecla.target.getAttribute("class");
		p.digito = tecla.target.innerHTML;

		m.calculadora(p.accion, p.digito);

	},

	calculadora: function(accion, digito) {

		switch (accion) {

			case "numero":

				p.cantidadSignos = 0;

				if (p.operaciones.innerHTML == "0") {
					p.operaciones.innerHTML = digito;
					p.hayNumero = true;

				} else {

					if (p.resultado) {
						p.resultado = false;
						p.operaciones.innerHTML = digito;
						p.hayNumero = true;
					} else {
						p.operaciones.innerHTML += digito;
						p.hayNumero = true;
					}
				}
				break;

			case "signo":
				p.cantidadSignos++;


				if (p.cantidadSignos == 1) {

					if (p.operaciones.innerHTML == "0") {

						p.operaciones.innerHTML = 0

					} else if (p.cantidadDecimal && !p.hayNumero) {

						p.operaciones.innerHTML += ("0" + digito);
						p.cantidadSignos = 0;
						p.cantidadDecimal = false;
						p.haySigno = true;



					} else {

						p.operaciones.innerHTML += digito;
						p.cantidadDecimal = false;
						p.resultado = false;
						p.hayNumero = false;
						p.haySigno = true;
					}
				}

				break;

			case "decimal":

				if (!p.cantidadDecimal && p.cantidadSignos != 1 && !p.haySigno ) {
					
					p.operaciones.innerHTML += ("0" + digito);
					p.cantidadDecimal = true;
					p.resultado = false;
					p.hayNumero = false;

				} else if (!p.cantidadDecimal && p.cantidadSignos != 1) {
						

						p.operaciones.innerHTML += digito;
						p.cantidadDecimal = true;
						p.cantidadSignos = 0;
						p.resultado = false;
						p.hayNumero = false;
						

					}else{

					}
				


				break;

			case "igual":
				p.operaciones.innerHTML = eval(p.operaciones.innerHTML);
				var expresion = /./g;

				if (!expresion.test(p.operaciones.innerHTML)) {
					p.cantidadDecimal = true;
				}
				p.resultado = true;

				break;
		}

		// console.log("p.resultado", p.resultado);
		console.log("p.hayNumero", p.hayNumero);
		console.log("p.cantidadDecimal", p.cantidadDecimal);
		console.log("p.cantidadSignos", p.cantidadSignos);
		console.log("p.haySigno", p.haySigno);
	},

	limpiarDisplay: function() {
		p.resultado = false;
		p.cantidadDecimal = false;

		p.operaciones.innerHTML = 0;
	}
}

m.inicio();
m.teclado();