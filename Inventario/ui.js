import { categorias } from './categorias.js';

export function crearCategorias(categoriasContainer, totalGeneralElement) {
  let totalGeneral = 0;

  for (const categoriaNombre in categorias) {
    const categoria = categorias[categoriaNombre];
    const categoriaDiv = document.createElement("div");
    categoriaDiv.classList.add("categoria");

    const titulo = document.createElement("h2");
    titulo.textContent = categoriaNombre;
    categoriaDiv.appendChild(titulo);

    const tabla = crearTablaCategoria(categoria);
    categoriaDiv.appendChild(tabla);
    categoriasContainer.appendChild(categoriaDiv);

    actualizarTotalGeneral(totalGeneralElement);
  }
}

function crearTablaCategoria(categoria) {
  const tabla = document.createElement("table");
  const encabezado = document.createElement("tr");
  const campos = Object.keys(categoria[0]);
  campos.push("Cantidad");

  campos.forEach(campo => {
    const th = document.createElement("th");
    th.textContent = campo.charAt(0).toUpperCase() + campo.slice(1);
    encabezado.appendChild(th);
  });
  tabla.appendChild(encabezado);

  categoria.forEach(producto => {
    const fila = crearFilaProducto(producto, campos, tabla);
    tabla.appendChild(fila);
  });

  const totalFila = crearFilaTotalCategoria(campos);
  tabla.appendChild(totalFila);

  return tabla;
}

function crearFilaProducto(producto, campos, tabla) {
  const fila = document.createElement("tr");
  campos.forEach(campo => {
    const celda = document.createElement("td");
    if (campo === "Cantidad") {
      const cantidadInput = document.createElement("input");
      cantidadInput.type = "number";
      cantidadInput.value = 1;
      cantidadInput.min = 0;
      cantidadInput.addEventListener("change", () => actualizarTotalCategoria(tabla));
      celda.appendChild(cantidadInput);
    } else {
      celda.textContent = producto[campo];
    }
    fila.appendChild(celda);
  });
  return fila;
}

function crearFilaTotalCategoria(campos) {
  const totalFila = document.createElement("tr");
  const totalCelda = document.createElement("td");
  totalCelda.textContent = `Total: $0.00`;
  totalCelda.colSpan = campos.length;
  totalFila.appendChild(totalCelda);
  return totalFila;
}

function actualizarTotalCategoria(tabla) {
  let totalCategoria = 0;
  const filasTabla = tabla.querySelectorAll("tr");
  filasTabla.forEach((fila, index) => {
    if (index > 0 && index < filasTabla.length - 1) {
      const cantidadInput = fila.querySelector("input");
      const precio = categorias[Object.keys(categorias)[Array.from(tabla.parentNode.parentNode.children).indexOf(tabla.parentNode) - 1]][index - 1].precio;
      totalCategoria += precio * parseInt(cantidadInput.value);
    }
  });

  const totalCelda = tabla.querySelector("tr:last-child td");
  totalCelda.textContent = `Total: $${totalCategoria.toFixed(2)}`;
  actualizarTotalGeneral(document.getElementById("total-general"));
}

export function actualizarTotalGeneral(totalGeneralElement) {
  let totalGeneral = 0;
  const totalesCategoria = document.querySelectorAll(".categoria table tr:last-child td");
  totalesCategoria.forEach(total => {
    let valor = parseFloat(total.textContent.replace("Total: $", ""));
    if(!isNaN(valor)) {
      totalGeneral += valor;
    }
  });
  totalGeneralElement.textContent = `Total General: $${totalGeneral.toFixed(2)}`;
}