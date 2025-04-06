document.addEventListener('DOMContentLoaded', function() {
    const resultadoDiv = document.getElementById('resultado');
    const botonTirar = document.getElementById('boton-tirar');
    const tipoSelect = document.getElementById('tipo');
    const tipoDadoLabel = document.createElement('p');
    tipoDadoLabel.id = 'tipo-dado-label';
    document.getElementById('formulario-dados').insertBefore(tipoDadoLabel, botonTirar);

    function actualizarTipoDadoLabel() {
        const tipoTexto = tipoSelect.options[tipoSelect.selectedIndex].text;
        tipoDadoLabel.textContent = `Dado seleccionado: ${tipoTexto}`;
    }

    actualizarTipoDadoLabel();
    tipoSelect.addEventListener('change', actualizarTipoDadoLabel);

    botonTirar.addEventListener('click', function() {
        const cantidadInput = document.getElementById('cantidad');
        const cantidad = parseInt(cantidadInput.value);
        const tipo = parseInt(tipoSelect.value);
        const tieneVentaja = document.getElementById('ventaja').checked;
        const tieneDesventaja = document.getElementById('desventaja').checked;

        if (tieneVentaja && tieneDesventaja) {
            resultadoDiv.textContent = "Selecciona solo Ventaja o Desventaja.";
            return;
        }

        resultadoDiv.innerHTML = '';
        let todosLosResultados = [];

        function animateRoll(numDados, callback) {
            const numTiradasAnimacion = (tieneVentaja || tieneDesventaja) ? cantidad * 2 : cantidad;
            const animacionDuracion = 300;

            for (let i = 0; i < numTiradasAnimacion; i++) {
                const dice = document.createElement('div');
                dice.classList.add('dice', 'rolling');
                resultadoDiv.appendChild(dice);
            }

            setTimeout(() => {
                resultadoDiv.innerHTML = '';
                let primerasTiradas = [];
                let segundasTiradas = [];
                let resultadosFinales = [];

                if (tieneVentaja || tieneDesventaja) {
                    // Generar todas las primeras tiradas
                    for (let i = 0; i < cantidad; i++) {
                        primerasTiradas.push(tirarDado(tipo));
                    }
                    // Generar todas las segundas tiradas
                    for (let i = 0; i < cantidad; i++) {
                        segundasTiradas.push(tirarDado(tipo));
                    }

                    // Mostrar todas las primeras tiradas
                    primerasTiradas.forEach(tiro => mostrarTiradaIndividual(tiro, tipo, resultadoDiv));

                    // Añadir la coma si hay tiradas con ventaja/desventaja
                    if (cantidad > 0 && (tieneVentaja || tieneDesventaja)) {
                        const coma = document.createElement('span');
                        coma.textContent = ',';
                        coma.classList.add('separador-tiradas'); // Opcional: para estilos CSS si deseas
                        resultadoDiv.appendChild(coma);
                    }

                    // Mostrar todas las segundas tiradas
                    segundasTiradas.forEach(tiro => mostrarTiradaIndividual(tiro, tipo, resultadoDiv));
                    todosLosResultados.push(...primerasTiradas, ...segundasTiradas);

                    if (tieneVentaja) {
                        for (let i = 0; i < cantidad; i++) {
                            resultadosFinales.push(Math.max(primerasTiradas[i], segundasTiradas[i]));
                        }
                        mostrarResultadoFinal(resultadosFinales, tipo, "Ventaja");
                    } else if (tieneDesventaja) {
                        for (let i = 0; i < cantidad; i++) {
                            resultadosFinales.push(Math.min(primerasTiradas[i], segundasTiradas[i]));
                        }
                        mostrarResultadoFinal(resultadosFinales, tipo, "Desventaja");
                    }
                } else {
                    for (let i = 0; i < cantidad; i++) {
                        const resultado = tirarDado(tipo);
                        resultadosFinales.push(resultado);
                        mostrarTiradaIndividual(resultado, tipo, resultadoDiv);
                        todosLosResultados.push(resultado);
                    }
                    if (cantidad > 1) {
                        mostrarSumaTotal(resultadosFinales);
                    }
                }

                if (cantidad > 1 && !(tieneVentaja || tieneDesventaja)) {
                    // La suma total ya se muestra en el bloque else si no hay ventaja/desventaja
                } else if (cantidad >= 1 && (tieneVentaja || tieneDesventaja)) {
                    mostrarSumaTotal(resultadosFinales);
                }

                if (callback) {
                    callback(resultadosFinales);
                }
            }, animacionDuracion * numTiradasAnimacion);
        }

        animateRoll(cantidad, function(finalResults) {
            // Opcional
        });
    });

    function tirarDado(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function mostrarTiradaIndividual(resultado, tipo, contenedor) {
        const dice = document.createElement('div');
        dice.classList.add('dice');
        dice.textContent = resultado;
        contenedor.appendChild(dice);
    }

    function mostrarResultadoFinal(resultados, tipo, tipoTirada) {
        const contenedorFinal = document.createElement('div');
        contenedorFinal.classList.add('resultado');
        const textoResultado = document.createElement('p');
        textoResultado.textContent = `Resultado con ${tipoTirada}: ${resultados.join(', ')}`;
        contenedorFinal.appendChild(textoResultado);
        document.getElementById('resultado').appendChild(contenedorFinal);
    }

    function mostrarSumaTotal(resultados) {
        const suma = resultados.reduce((acc, current) => acc + current, 0);
        const sumaParrafo = document.createElement('p');
        sumaParrafo.textContent = `Suma total: ${suma}`;
        document.getElementById('resultado').appendChild(sumaParrafo);
    }
});