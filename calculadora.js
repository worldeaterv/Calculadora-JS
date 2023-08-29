const botonesNumero = document.querySelectorAll(".numero");
const botonesOperador = document.querySelectorAll(".operador");
const botonEqual = document.getElementById("equal");
const botonBorrar = document.getElementById("borrar");
const botonBorrarTodo = document.getElementById("borrarTodo");

let valorAnterior = document.getElementById("valorAnterior");
let valorActual = document.getElementById("valorActual");

let operador = "";
let nuevoNumero = false;
let errorOcurrido = false;

botonesNumero.forEach((boton) => {
  boton.addEventListener("click", () => {
    if (nuevoNumero) {
      valorActual.innerHTML = boton.textContent;
      nuevoNumero = false;
    } else if (valorActual.textContent === "No se puede dividir por 0") {
      valorActual.innerHTML = boton.textContent;
    } else {
      actualizarValorActual(boton);
    }
  });
});

botonesOperador.forEach((boton) => {
  boton.addEventListener("click", () => {
    if (errorOcurrido) {
      return;
    }

    operador = boton.value;

    if (valorActual.innerHTML !== "") {
      actualizarValorAnterior(valorActual.textContent, boton.textContent);
      nuevoNumero = true;
    }
  });
});

botonEqual.addEventListener("click", () => {
  if (errorOcurrido || valorAnterior.innerHTML === "") {
    return;
  }

  let expresion = valorAnterior.textContent + valorActual.textContent;
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
    valorAnterior.innerHTML = null;
    valorActual.innerHTML = "<h6>No se puede dividir por 0</h6>";
    errorOcurrido = true;
  }
});

botonBorrar.addEventListener("click", () => {
  if (errorOcurrido) {
    errorOcurrido = false;
    valorAnterior.innerHTML = null;
    valorActual.innerHTML = "0";
  }

  if (valorActual.textContent.length <= 1) {
    valorActual.innerHTML = "0";
  }
  if (valorActual.innerHTML.charAt(0) === "0") {
    return;
  }

  valorActual.innerHTML = valorActual.textContent.slice(0, -1);
});

botonBorrarTodo.addEventListener("click", () => {
  if (errorOcurrido) {
    errorOcurrido = false;
  }

  valorAnterior.innerHTML = null;
  valorActual.innerHTML = "0";
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
  valorActual.innerHTML =
    valorActual.innerHTML.charAt(0) === "0" || valorActual.innerHTML === ""
      ? numero.textContent
      : valorActual.innerHTML + numero.textContent;
};

const actualizarValorAnterior = (numero, operador) => {
  if (valorAnterior.innerHTML === "") {
    valorAnterior.innerHTML = numero + operador;
  } else {
    valorAnterior.innerHTML = valorAnterior.textContent.slice(0, -1) + operador;
  }
};
