// nombrePersonaje.js

function generarNombreAleatorio() {
    const nombres = ["Aragorn", "Gandalf", "Frodo", "Legolas", "Gimli", "Bilbo", "Galadriel", "Boromir", "Sam", "Merry", "Pippin", "Conan", "Xena", "Achilles", "Spartacus", "Merlin", "Morgana", "Locke", "Sly", "Garrett", "Vax", "Elrond", "Arwen", "Celeborn", "Haldir", "Thranduil", "Thorin", "Balin", "Dwalin", "Fili", "Kili", "Alatar", "Pallando"];
    return nombres[Math.floor(Math.random() * nombres.length)];
}

function generarApellidoAleatorio() {
    const apellidos = ["Baggins", "Gamgee", "Oakenshield", "Greyjoy", "Stark", "Lannister", "Targaryen", "Snow", "Dumbledore", "Potter", "The Brave", "The Strong", "The Fearless", "The Wise", "The Mystic", "The Enchanter", "Shadowfoot", "Quickfingers", "Nightwhisper", "Greenleaf", "Lightbringer", "Starflower", "Silverstream", "Moonwhisper", "Stonefist", "Ironbeard", "Goldhammer", "Mountainheart"];
    return apellidos[Math.floor(Math.random() * apellidos.length)];
}

function crearCamposNombre() {
    const inputNombrePrincipal = document.getElementById("nombrePrincipal");
    const inputNombreSecundario = document.getElementById("nombreSecundario");

    if (inputNombrePrincipal && inputNombreSecundario) {
        inputNombrePrincipal.value = generarNombreAleatorio(); // Genera solo un nombre
        inputNombreSecundario.value = generarApellidoAleatorio(); // Genera solo un apellido
    }
}

function obtenerNombresPersonaje() {
    const nombrePrincipal = document.getElementById("nombrePrincipal").value;
    const nombreSecundario = document.getElementById("nombreSecundario").value;
    return { nombrePrincipal, nombreSecundario };
}