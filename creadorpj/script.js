// (Los objetos razas y clases son los mismos que antes)

// Función para llenar un selector con opciones
function llenarSelector(selector, opciones) {
    for (const clave in opciones) {
        const opcion = opciones[clave];
        const elementoOpcion = document.createElement("option");
        elementoOpcion.value = clave;
        elementoOpcion.textContent = opcion.nombre;
        selector.appendChild(elementoOpcion);
    }
}

// Función para mostrar la ficha del personaje
function mostrarFichaPersonaje(razaSeleccionada, claseSeleccionada) {
    const fichaPersonajeDiv = document.getElementById("fichaPersonaje");
    fichaPersonajeDiv.innerHTML = ""; // Limpia la ficha anterior

    if (razaSeleccionada && claseSeleccionada) {
        const raza = razas[razaSeleccionada];
        const clase = clases[claseSeleccionada];
        const habilidades = [...raza.habilidades, ...clase.habilidades]; // Combina habilidades de raza y clase
        const constitucionElement = document.querySelector("#tablaAtributos [data-atributo='constitucion']");
        const constitucion = constitucionElement ? parseInt(constitucionElement.textContent) : 0;
        const modificadorConstitucion = calcularModificador(constitucion);
        const pv = clase.dadosPV + modificadorConstitucion;

        const ficha = `
            <h2>Ficha de Personaje</h2>
            <table>
                <tr>
                    <th>Raza</th>
                    <td>${raza.nombre}</td>
                </tr>
                <tr>
                    <th>Movimiento</th>
                    <td>${raza.movimiento}</td>
                </tr>
                <tr>
                    <th>Clase</th>
                    <td>${clase.nombre}</td>
                </tr>
                <tr>
                    <th>PV</th>
                    <td>${pv}</td>
                </tr>
                <tr>
                    <th>Habilidades</th>
                    <td><ul>${habilidades.map(h => `<li>${h}</li>`).join("")}</ul></td>
                </tr>
            </table>
        `;
        fichaPersonajeDiv.innerHTML = ficha;
    }
}

// Función para calcular el modificador de atributo
function calcularModificador(valor) {
    if (valor <= 3) return -2;
    if (valor >= 4 && valor <= 6) return -1;
    if (valor >= 7 && valor <= 14) return 0;
    if (valor >= 15 && valor <= 17) return 1;
    if (valor >= 18) return 2;
    return 0; // Valor por defecto si no coincide con ninguna regla
}

// Función para mostrar la tabla de atributos
function mostrarAtributosPersonaje() {
    const atributosPersonajeDiv = document.getElementById("atributosPersonaje");
    atributosPersonajeDiv.innerHTML = `
        <h2>Atributos</h2>
        <table id="tablaAtributos">
            <thead>
                <tr>
                    <th>Atributo</th>
                    <th>Valor</th>
                    <th>Modificador</th>
                </tr>
            </thead>
            <tbody>
                ${Object.entries(atributosIniciales).map(([atributo, valor]) => `
                    <tr>
                        <td>${atributo}</td>
                        <td class="valor-atributo" draggable="true" data-atributo="${atributo}">${valor}</td>
                        <td>${calcularModificador(valor)}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    // Eventos de drag and drop
    const valoresAtributos = document.querySelectorAll(".valor-atributo");
    let valorArrastrado;

    valoresAtributos.forEach(valor => {
        valor.addEventListener("dragstart", (e) => {
            valorArrastrado = e.target;
            setTimeout(() => {
                valor.style.opacity = "0.5";
            }, 0);
        });

        valor.addEventListener("dragend", () => {
            valorArrastrado.style.opacity = "1";
            valorArrastrado = null;
        });

        valor.addEventListener("dragover", e => e.preventDefault());
        valor.addEventListener("dragenter", () => {});
        valor.addEventListener("dragleave", () => {});

        valor.addEventListener("drop", (e) => {
            if (valorArrastrado !== e.target) {
                const tabla = document.getElementById("tablaAtributos").querySelector("tbody");
                const filas = Array.from(tabla.querySelectorAll("tr"));
                const indiceArrastrado = filas.findIndex(fila => fila.querySelector(".valor-atributo") === valorArrastrado);
                const indiceDestino = filas.findIndex(fila => fila.querySelector(".valor-atributo") === e.target);

                // Intercambiar valores
                const valorArrastradoTexto = valorArrastrado.textContent;
                valorArrastrado.textContent = e.target.textContent;
                e.target.textContent = valorArrastradoTexto;

                // Actualizar modificadores
                const valorArrastradoFila = valorArrastrado.parentElement;
                const valorDestinoFila = e.target.parentElement;
                valorArrastradoFila.querySelector("td:last-child").textContent = calcularModificador(parseInt(valorArrastrado.textContent));
                valorDestinoFila.querySelector("td:last-child").textContent = calcularModificador(parseInt(e.target.textContent));

                // Actualizar PV si se intercambia la constitución
                if (valorArrastrado.dataset.atributo === "constitucion" || e.target.dataset.atributo === "constitucion") {
                    mostrarFichaPersonaje(document.getElementById("raza").value, document.getElementById("clase").value);
                }
            }
        });
    });

    // Llamar a mostrarFichaPersonaje después de crear la tabla de atributos
    mostrarFichaPersonaje(document.getElementById("raza").value, document.getElementById("clase").value);
}

function generarOroInicial() {
    let oroInicial = 0;
    for (let i = 0; i < 3; i++) {
        oroInicial += Math.floor(Math.random() * 6) + 1; // Tirada de 1d6
    }
    return oroInicial * 10;
}

function mostrarLimitacionesClase(claseSeleccionada) {
    const limitacionesDiv = document.getElementById("limitacionesClase");
    limitacionesDiv.innerHTML = "";

    if (claseSeleccionada) {
        const clase = clases[claseSeleccionada];
        const oroInicial = generarOroInicial(); // Usar la función generarOroInicial

        const tablaLimitaciones = `
            <h2>Limitaciones de Clase</h2>
            <table>
                <tr>
                    <th>Armas Permitidas</th>
                    <td>${clase.armasPermitidas}</td>
                </tr>
                <tr>
                    <th>Armaduras Permitidas</th>
                    <td>${clase.armadurasPermitidas}</td>
                </tr>
                <tr>
                    <th>Oro Inicial</th>
                    <td>${oroInicial}</td>
                </tr>
            </table>
        `;
        limitacionesDiv.innerHTML = tablaLimitaciones;
    }
}

//Cargar razas, clases y atributos al cargar la página

window.addEventListener("load", () => {
    const selectorRaza = document.getElementById("raza");
    const selectorClase = document.getElementById("clase");

    llenarSelector(selectorRaza, razas);
    llenarSelector(selectorClase, clases);

    mostrarAtributosPersonaje();
    mostrarLimitacionesClase(selectorClase.value);

    // Generar nombres iniciales
    crearCamposNombre();
    crearTablaTrasfondo(selectorRaza.value);
    selectorRaza.addEventListener("change", () => {
        mostrarFichaPersonaje(selectorRaza.value, selectorClase.value);
        crearCamposNombre();
        // Generar trasfondo inicial
        crearTablaTrasfondo(selectorRaza.value);
    });

    selectorClase.addEventListener("change", () => {
        mostrarFichaPersonaje(selectorRaza.value, selectorClase.value);
        mostrarLimitacionesClase(selectorClase.value);

        crearCamposNombre();
        // Generar trasfondo inicial
        crearTablaTrasfondo(selectorRaza.value);

        // Obtener y mostrar los nombres del personaje
        const nombres = obtenerNombresPersonaje();
        console.log("Nombre Principal:", nombres.nombrePrincipal);
        console.log("Nombre Secundario:", nombres.nombreSecundario);
    });
});