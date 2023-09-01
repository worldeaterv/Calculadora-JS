const botonesNumero = document.querySelectorAll(".numero");
const botonesOperador = document.querySelectorAll(".operador");

const botonEqual = document.getElementById("equal");
const botonBorrar = document.getElementById("borrar");
const botonBorrarTodo = document.getElementById("borrarTodo");
const botonCambiarSigno = document.getElementById("cambiarSigno");
const botonDecimal = document.getElementById("decimal");

let valorAnterior = document.getElementById("valorAnterior");
let valorActual = document.getElementById("valorActual");

let operador = "";
let nuevoNumero = false;
let errorOcurrido = false;

botonesNumero.forEach((numeroSeleccionado) => {
  numeroSeleccionado.addEventListener("click", () => {
    if (errorOcurrido) return;
    if (nuevoNumero) {
      valorActual.innerHTML = numeroSeleccionado.textContent;
      nuevoNumero = false;
    } else {
      actualizarValorActual(numeroSeleccionado);
    }
  });
});

botonesOperador.forEach((operadorSeleccionado) => {
  operadorSeleccionado.addEventListener("click", () => {
    if (errorOcurrido) return;

    operador = operadorSeleccionado.value;

    if (valorActual.innerHTML !== "") {
      actualizarValorAnterior(
        valorActual.textContent,
        operadorSeleccionado.textContent
      );
      nuevoNumero = true;
    }
  });
});

botonCambiarSigno.addEventListener("click", () => {
  if (errorOcurrido) return;
  valorActual.innerHTML = -valorActual.textContent;
});

botonEqual.addEventListener("click", () => {
  if (errorOcurrido || valorAnterior.innerHTML === "") return;

  let expresion = valorAnterior.textContent;
  if (expresion.endsWith("-") && valorActual.textContent.startsWith("-")) {
    expresion = expresion.substring(0, expresion.length - 1);
  }
  expresion += valorActual.textContent;

  expresion = expresion.replace(/x/g, "*");

  try {
    const resultado = calcular(expresion);

    if (!isNaN(resultado) && isFinite(resultado)) {
      valorActual.innerHTML = resultado;
      valorAnterior.innerHTML = "";
      operador = "";
      nuevoNumero = true;
    } else {
      throw new Error("Error de cálculo");
    }
  } catch (error) {
    errorOcurrido = true;
    valorAnterior.innerHTML = null;
    valorActual.innerHTML = "<h6>No se puede dividir entre 0</h6>";
  }
});

botonBorrar.addEventListener("click", () => {
  if (errorOcurrido) {
    errorOcurrido = false;
    resetCalculadora();
  }

  if (
    valorActual.textContent.length === 2 &&
    valorActual.textContent.startsWith("-")
  ) {
    valorActual.innerHTML = "0";
    return;
  }

  if (valorActual.textContent.length <= 1) {
    valorActual.innerHTML = "0";
  } else {
    valorActual.innerHTML = valorActual.textContent.slice(0, -1);
  }
});

botonBorrarTodo.addEventListener("click", () => {
  if (errorOcurrido) {
    errorOcurrido = false;
  }

  resetCalculadora();
});

botonDecimal.addEventListener("click", () => {
  if (valorActual.textContent.includes(".")) {
    return;
  }
  valorActual.innerHTML += ".";
});

const calcular = (expresion) => {
  try {
    return Function(`'use strict'; return (${expresion})`)();
  } catch (error) {
    console.error("Error en la expresión:", error);
    return null;
  }
};

const actualizarValorActual = (numero) => {
  if (valorActual.textContent === "0" && numero.textContent === "0") return;

  if (valorActual.textContent === "0" && numero.textContent != "0") {
    valorActual.innerHTML = numero.textContent;
  } else {
    valorActual.innerHTML += numero.textContent;
  }
};

const actualizarValorAnterior = (numero, operador) => {
  if (valorAnterior.innerHTML === "") {
    valorAnterior.innerHTML = numero + operador;
  } else {
    valorAnterior.innerHTML = valorAnterior.textContent.slice(0, -1) + operador;
  }
};

const resetCalculadora = () => {
  valorAnterior.innerHTML = null;
  valorActual.innerHTML = "0";
};
