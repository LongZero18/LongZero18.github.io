// guardadoPersonaje.js

function guardarPersonaje() {
    const razaSeleccionada = document.getElementById("raza").value;
    const claseSeleccionada = document.getElementById("clase").value;
    const nombres = obtenerNombresPersonaje();
    const trasfondos = obtenerTrasfondosPersonaje();
    const atributos = obtenerAtributosPersonaje();

    const personaje = {
        raza: razaSeleccionada,
        clase: claseSeleccionada,
        nombres: nombres,
        trasfondos: trasfondos,
        atributos: atributos
    };

    const personajeJSON = JSON.stringify(personaje);
    const nombreArchivo = "personaje.js";

    // Crear un enlace para descargar el archivo
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = "data:text/json;charset=utf-8," + encodeURIComponent(personajeJSON);
    enlaceDescarga.download = nombreArchivo;

    // Simular un clic en el enlace para iniciar la descarga
    enlaceDescarga.click();
}

function cargarPersonaje() {
    const inputArchivo = document.createElement("input");
    inputArchivo.type = "file";
    inputArchivo.accept = ".js";

    inputArchivo.addEventListener("change", (evento) => {
        const archivo = evento.target.files[0];

        if (archivo) {
            const lector = new FileReader();

            lector.onload = (evento) => {
                try {
                    const personaje = JSON.parse(evento.target.result);

                    document.getElementById("raza").value = personaje.raza;
                    document.getElementById("clase").value = personaje.clase;
                    document.getElementById("nombrePrincipal").value = personaje.nombres.nombrePrincipal;
                    document.getElementById("nombreSecundario").value = personaje.nombres.nombreSecundario;

                    // Cargar trasfondos
                    document.querySelector("#tablaTrasfondo tbody td input").value = personaje.trasfondos.trasfondo;
                    if (personaje.trasfondos.trasfondo2) {
                        document.querySelector("#tablaTrasfondo2 tbody td input").value = personaje.trasfondos.trasfondo2;
                    }

                    // Cargar atributos
                    const valoresAtributos = document.querySelectorAll(".valor-atributo");
                    valoresAtributos.forEach(valor => {
                        valor.textContent = personaje.atributos[valor.dataset.atributo];
                        valor.parentElement.querySelector("td:last-child").textContent = calcularModificador(personaje.atributos[valor.dataset.atributo]);
                    });

                    mostrarFichaPersonaje(personaje.raza, personaje.clase);
                    mostrarLimitacionesClase(personaje.clase);
                    crearTablaTrasfondo(personaje.raza, obtenerHabilidades(personaje.raza, personaje.clase));

                    alert("Personaje cargado.");
                } catch (error) {
                    //alert("Error al cargar el personaje: archivo JSON inválido.");
                }
            };

            lector.readAsText(archivo);
        }
    });

    inputArchivo.click();
}
// Función auxiliar para obtener los atributos del personaje
function obtenerAtributosPersonaje() {
    const atributos = {};
    const valoresAtributos = document.querySelectorAll(".valor-atributo");
    valoresAtributos.forEach(valor => {
        atributos[valor.dataset.atributo] = parseInt(valor.textContent);
    });
    return atributos;
}