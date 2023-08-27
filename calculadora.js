const botonesNumero = document.querySelectorAll(".numero");
const botonesOperador = document.querySelectorAll(".operador");
const botonEqual = document.getElementById("equal");

let valorAnterior = document.getElementById("valorAnterior");
let valorActual = document.getElementById("valorActual");

let operador = "";
let nuevoNumero = false;

botonesNumero.forEach((boton) => {
  boton.addEventListener("click", () => {
    if (nuevoNumero) {
      valorActual.innerHTML = boton.textContent;
      nuevoNumero = false;
    } else {
      actualizarValorActual(boton);
    }
  });
});

botonesOperador.forEach((boton) => {
  boton.addEventListener("click", () => {
    operador = boton.value;

    if (valorActual.innerHTML !== "") {
      actualizarValorAnterior(valorActual.textContent, boton.textContent);
      nuevoNumero = true;
    }
  });
});

botonEqual.addEventListener("click", () => {
  if (valorAnterior.innerHTML !== "" && valorActual.innerHTML !== "") {
    let expresion = valorAnterior.textContent + valorActual.textContent;
    expresion = expresion.replace(/x/g, "*");
    const resultado = eval(expresion);

    valorActual.innerHTML = resultado;
    valorAnterior.innerHTML = "";
    operador = "";
    nuevoNumero = true;
  }
});

const actualizarValorActual = (numero) => {
  if (valorActual.innerHTML.charAt(0) === "0" || valorActual.innerHTML === "") {
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
