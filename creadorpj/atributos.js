// Función para lanzar 3d6
function lanzar3d6() {
    let resultado = 0;
    for (let i = 0; i < 3; i++) {
        resultado += Math.floor(Math.random() * 6) + 1;
    }
    return resultado;
}

// Genera atributos iniciales
const atributosIniciales = {
    fuerza: lanzar3d6(),
    destreza: lanzar3d6(),
    constitucion: lanzar3d6(),
    inteligencia: lanzar3d6(),
    sabiduria: lanzar3d6(),
    carisma: lanzar3d6()
};