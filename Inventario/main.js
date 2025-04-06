import { categorias } from './categorias.js';
import { crearCategorias } from './ui.js';
import { descargarArchivo, abrirArchivo } from './utilidades.js';

const categoriasContainer = document.getElementById("categorias-container");
const totalGeneralElement = document.getElementById("total-general");
const descargarListaBtn = document.getElementById("descargar-lista");
const abrirArchivoInput = document.getElementById("abrir-archivo");

crearCategorias(categoriasContainer, totalGeneralElement);

descargarListaBtn.addEventListener("click", () => descargarArchivo(categorias));
abrirArchivoInput.addEventListener("change", (event) => abrirArchivo(event, categorias));