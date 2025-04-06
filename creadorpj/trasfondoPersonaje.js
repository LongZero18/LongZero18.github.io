// trasfondoPersonaje.js

const trasfondos = [
    "Granjero",
    "Joyero",
    "Herrero",
    "Mercader",
    "Aprendiz de mago",
    "Ladrón de poca monta",
    "Soldado retirado",
    "Cazador de bestias",
    "Minero",
    // Agrega más trasfondos aquí
];

function generarTrasfondoAleatorio() {
    return trasfondos[Math.floor(Math.random() * trasfondos.length)];
}

function crearTablaTrasfondo(razaSeleccionada) {
    const contenedorTrasfondo = document.getElementById("contenedorTrasfondo");  
    contenedorTrasfondo.innerHTML = "<h2>Trasfondo</h2> "; // Limpia el contenido anterior

    const tablaTrasfondo = document.createElement("table");
    tablaTrasfondo.id = "tablaTrasfondo"; // Asigna un id a la tabla

    tablaTrasfondo.innerHTML = `
        <thead>
            <tr>
                <th>Trasfondo</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="text" value="${generarTrasfondoAleatorio()}"></td>
            </tr>
        </tbody>
    `;

    contenedorTrasfondo.appendChild(tablaTrasfondo);

    // Si la raza es humano, agregar un segundo trasfondo
    if (razaSeleccionada === "humano") {
        const tablaTrasfondo2 = document.createElement("table");
        tablaTrasfondo2.id = "tablaTrasfondo2"; // Asigna un id a la tabla

        tablaTrasfondo2.innerHTML = `
            <thead>
                <tr>
                    <th>Trasfondo Adicional (Humano)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" value="${generarTrasfondoAleatorio()}"></td>
                </tr>
            </tbody>
        `;

        contenedorTrasfondo.appendChild(tablaTrasfondo2);
    }
}

function obtenerTrasfondosPersonaje() {
    // Obtener los trasfondos de las tablas
    const trasfondoTabla = document.querySelector("#tablaTrasfondo tbody td input");
    const trasfondo = trasfondoTabla ? trasfondoTabla.value : null;

    let trasfondo2 = null;
    const trasfondoTabla2 = document.querySelector("#tablaTrasfondo2 tbody td input");
    if (trasfondoTabla2) {
        trasfondo2 = trasfondoTabla2.value;
    }

    return { trasfondo, trasfondo2 };
}