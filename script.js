const categorias = {
  "Armas de proyectiles": [
    { nombre: "Arco", precio: 15.00, daño: "1d6", disparosPorAsalto: 2, alcance: "60 metros" },
    { nombre: "Ballesta ligera", precio: 12.00, daño: "1d4+1", disparosPorAsalto: 1, alcance: "70 meotros" },
    { nombre: "Daga", precio: 2.00, daño: "1d4", disparosPorAsalto: 1, alcance: "4 metros" },
    { nombre: "Honda", precio: 0.20, daño: "1d4", disparosPorAsalto: 1, alcance: "20 metros" },
    { nombre: "Lanza", precio: 1.00, daño: "1d4", disparosPorAsalto: 1, alcance: "8 metros" }
  ],
  "Armas cuerpo a cuerpo": [
    { nombre: "Hacha de Batalla", precio: 5.00, daño: "1d8" },
    { nombre: "Porra", precio: 0.00, daño: "1d4" },
    { nombre: "Daga", precio: 2.00, daño: "1d4" },
    { nombre: "Martillo de guerra", precio: 1.00, daño: "1d4+1" },
    { nombre: "Maza pesada", precio: 10.00, daño: "1d6" },
    { nombre: "Lanza", precio: 1.00, daño: "1d6" },
    { nombre: "Baston (a dos manos)", precio: 0.00, daño: "1d6" },
    { nombre: "Espada Larga", precio: 15.00, daño: "1d8" },
    { nombre: "Espada Corta", precio: 8.00, daño: "1d6" },
    { nombre: "Espada a dos manos", precio: 30.00, daño: "1d10" }
  ],
  "Armaduras": [
    { nombre: "Cuero", precio: 5.00, defensa: +2 },
    { nombre: "Anillos", precio: 30.00, defensa: +3 },
    { nombre: "Mallas", precio: 75.00, defensa: +4 },
    { nombre: "Placas*", precio: 100.00, defensa: +6 },
    { nombre: "Escudo", precio: 15.00, defensa: +1 },
  ],
  "Equipo de Iluminación": [
    { nombre: "Antorcha (1 hora)", precio: 0.01 },
    { nombre: "Farol con capuchón (4 horas)", precio: 7.00 },
    { nombre: "Farol de ojo de buey (4 horas)", precio: 12.00 },
    { nombre: "Yesca y pedernal", precio: 0.0 }
  ],
  "Equipo de Supervivencia": [
    { nombre: "Cantimplora (2 litros)", precio: 1.00 },
    { nombre: "Cuerda común (15 metros)", precio: 1.00 },
    { nombre: "Mochila (10 kg capacidad)", precio: 10.00 },
    { nombre: "Raciones comunes (1 día)", precio: 0.50 },
    { nombre: "Raciones de viaje (1 día)", precio: 1.00 },
    { nombre: "Saco de dormir", precio: 0.20 }
  ],
  "Equipo Religioso y Médico": [
    { nombre: "Agua sagrada (frasco)", precio: 25.00 },
    { nombre: "Símbolo religioso (plata)", precio: 25.00 },
    { nombre: "Vendas para heridas x1", precio: 0.10 },
  ],
  "Posadas": [
    { nombre: "Posada modesta", precio: 0.50 },
    { nombre: "Posada corriente", precio: 1.00 },
    { nombre: "Posada lujosa", precio: 3.00 },
    { nombre: "Comida corriente", precio: 0.20 },
    { nombre: "Botella de vino", precio: 2.00 },
    { nombre: "Jarra de cerveza", precio: 1.00 },
  ],
  "Equipo diverso": [
    { nombre: "Aceite para quemar (frasco)", precio: 0.50 },
    { nombre: "Carcaj y 20 flechas", precio: 0.80 },
    { nombre: "Espejo, pequeño de acero", precio: 20.00 },
    { nombre: "Estacas (4) y maza de madera", precio: 3.00 },
    { nombre: "Garfio de escalada", precio: 1.00 },
    { nombre: "Herramientas de ladrón", precio: 25.00 },
    { nombre: "Instrumento musical", precio: 5.00 },
    { nombre: "Libro de conjuros (50 hojas)", precio: 25.00 },
    { nombre: "Palanca", precio: 0.20 },
    { nombre: "Pértiga de madera (3 metros)", precio: 0.20 },
    { nombre: "Piquetas de hierro (10)", precio: 0.50 },
    { nombre: "Saco (10 kilos)", precio: 0.20 }
  ]
};

const categoriasContainer = document.getElementById("categorias-container");
const totalGeneralElement = document.getElementById("total-general");
let totalGeneral = 0;

for (const categoriaNombre in categorias) {
  const categoria = categorias[categoriaNombre];

  const categoriaDiv = document.createElement("div");
  categoriaDiv.classList.add("categoria");

  const titulo = document.createElement("h2");
  titulo.textContent = categoriaNombre;
  categoriaDiv.appendChild(titulo);

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

  let totalCategoria = 0;

  categoria.forEach(producto => {
    const fila = document.createElement("tr");
    campos.forEach(campo => {
      const celda = document.createElement("td");
      if (campo === "Cantidad") {
        const cantidadInput = document.createElement("input");
        cantidadInput.type = "number";
        cantidadInput.value = 1;
        cantidadInput.min = 0;
        cantidadInput.addEventListener("change", actualizarTotal);
        celda.appendChild(cantidadInput);
      } else {
        celda.textContent = producto[campo];
      }
      fila.appendChild(celda);
    });
    tabla.appendChild(fila);
  });

  const totalFila = document.createElement("tr");
  const totalCelda = document.createElement("td");
  totalCelda.textContent = `Total: $${totalCategoria.toFixed(2)}`;
  totalCelda.colSpan = campos.length;
  totalFila.appendChild(totalCelda);
  tabla.appendChild(totalFila);

  categoriaDiv.appendChild(tabla);
  categoriasContainer.appendChild(categoriaDiv);

  function actualizarTotal() {
    totalCategoria = 0;
    const filasTabla = tabla.querySelectorAll("tr");
    filasTabla.forEach((fila, index) => {
      if (index > 0 && index < filasTabla.length - 1) {
        const cantidadInput = fila.querySelector("input");
        totalCategoria += categoria[index - 1].precio * parseInt(cantidadInput.value);
      }
    });

    totalCelda.textContent = `Total: $${totalCategoria.toFixed(2)}`;
    actualizarTotalGeneral();
  }

  function actualizarTotalGeneral() {
    totalGeneral = 0;
    const totalesCategoria = document.querySelectorAll(".categoria table tr:last-child td");
    totalesCategoria.forEach(total => {
      let valor = parseFloat(total.textContent.replace("Total: $", ""));
      totalGeneral += valor;
    });
    totalGeneralElement.textContent = `Total General: $${totalGeneral.toFixed(2)}`;
  }

  actualizarTotalGeneral();
}

function generarContenidoArchivo() {
  let contenido = "Categoría,Producto,Cantidad,Precio\n";

  for (const categoriaNombre in categorias) {
    const categoria = categorias[categoriaNombre];
    const tabla = document.querySelector(`#categorias-container div:nth-child(${Object.keys(categorias).indexOf(categoriaNombre) + 1}) table`);
    const filasTabla = tabla.querySelectorAll("tr");

    filasTabla.forEach((fila, index) => {
      if (index > 0 && index < filasTabla.length - 1) {
        const cantidadInput = fila.querySelector("input");
        const cantidad = parseInt(cantidadInput.value);

        if (cantidad > 0) {
          const producto = categoria[index - 1];
          contenido += `${categoriaNombre},${producto.nombre},${cantidad},${producto.precio}\n`;
        }
      }
    });
  }

  return contenido;
}

function descargarArchivo() {
  const contenido = generarContenidoArchivo();
  const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
  const enlace = document.createElement("a");
  const url = URL.createObjectURL(blob);

  enlace.href = url;
  enlace.download = "lista_productos.csv";
  enlace.click();

  URL.revokeObjectURL(url);
}

function abrirArchivo(event) {
  const archivo = event.target.files[0];
  const lector = new FileReader();

  lector.onload = function(evento) {
    const contenido = evento.target.result;
    const lineas = contenido.split("\n");
    const encabezados = lineas[0].split(",");

    for (let i = 1; i < lineas.length; i++) {
      const valores = lineas[i].split(",");
      if (valores.length === encabezados.length) {
        const categoriaNombre = valores[0];
        const productoNombre = valores[1];
        const cantidad = parseInt(valores[2]);

        if (categorias[categoriaNombre]) {
          const producto = categorias[categoriaNombre].find(p => p.nombre === productoNombre);
          if (producto) {
            const tabla = document.querySelector(`#categorias-container div:nth-child(${Object.keys(categorias).indexOf(categoriaNombre) + 1}) table`);
            const filasTabla = tabla.querySelectorAll("tr");

            filasTabla.forEach((fila, index) => {
              if (index > 0 && index < filasTabla.length - 1) {
                if (categorias[categoriaNombre][index - 1].nombre === productoNombre) {
                  const cantidadInput = fila.querySelector("input");
                  cantidadInput.value = cantidad;
                  cantidadInput.dispatchEvent(new Event("change")); // Simular un cambio para actualizar los totales
                }
              }
            });
          }
        }
      }
    }
  };

  lector.readAsText(archivo);
}

const descargarListaBtn = document.getElementById("descargar-lista");
descargarListaBtn.addEventListener("click", descargarArchivo);

const abrirArchivoInput = document.getElementById("abrir-archivo");
abrirArchivoInput.addEventListener("change", abrirArchivo);