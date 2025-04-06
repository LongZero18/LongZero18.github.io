export function generarContenidoArchivo(categorias) {
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
  
  export function descargarArchivo(categorias) {
    const contenido = generarContenidoArchivo(categorias);
    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    const enlace = document.createElement("a");
    const url = URL.createObjectURL(blob);
  
    enlace.href = url;
    enlace.download = "lista_productos.csv";
    enlace.click();
  
    URL.revokeObjectURL(url);
  }
  
  export function abrirArchivo(event, categorias) {
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
                    cantidadInput.dispatchEvent(new Event("change"));
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