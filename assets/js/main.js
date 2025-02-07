import { Leon, Lobo, Oso, Serpiente, Aguila } from "./animal.js"; // Importamos las clases definidas en el archivo animals.js
// Declaramos el array que irá almacenando los animales
let animalesRegistrados = []; 


// Funciones usando el patrón IIFE
(function () {
    document.getElementById("animal").addEventListener("change", async function (event) { 
        const nombre = event.target.value;  // Obtiene el valor seleccionado (nombre del animal)
        const imagen = await obtenerImagen(nombre); 
        document.getElementById("preview").style.backgroundImage = `url(./assets/imgs/${imagen})`; // Cambia la imagen de fondo del elemento con id "preview" para mostrar la imagen del animal
    });

//añadimos un listener
    document.getElementById("btnRegistrar").addEventListener("click", async function (event) {
        // se previene que se recargue la página otra vez (acción x defecto)
        event.preventDefault(); 

        // Obtiene los valores del formulario
        const nombre = document.getElementById("animal").value;
        const edad = document.getElementById("edad").value;
        const comentarios = document.getElementById("comentarios").value;

        // Verificamos que todos los campos estén completos
        if (!nombre || !edad || !comentarios) { 
            alert("Por favor, completa todos los campos antes de registrar."); //alert si el usuario no completa todos los campos
            return;
        }


        // Llama a las funciones obtenerImagen y obtenerSonido de forma asíncrona
        const imagen = await obtenerImagen(nombre);
        const sonido = await obtenerSonido(nombre);


        // Crea una instancia del animal seleccionado según su clase específica (esto es cuando se ha seleccionado un animal en el formulario)
        let animal;
        switch (nombre) { //Se usa switch para validar las propiedades del animal que se seleccionó
            case "Leon":
                animal = new Leon(nombre, edad, imagen, comentarios, sonido);
                break;
            case "Lobo":
                animal = new Lobo(nombre, edad, imagen, comentarios, sonido);
                break;
            case "Oso":
                animal = new Oso(nombre, edad, imagen, comentarios, sonido);
                break;
            case "Serpiente":
                animal = new Serpiente(nombre, edad, imagen, comentarios, sonido);
                break;
            case "Aguila":
                animal = new Aguila(nombre, edad, imagen, comentarios, sonido);
                break;
            default:
                alert("Animal no válido");
        }


        // Agregar el animal a la tabla y haces reset al formulario
        agregarAnimalATabla(animal);
        resetFormulario();
    });
})(); //se invoca la función ife de manera inmediata



// Función asíncrona en donde se obtiene la imagen del animal en el archivo json, usando try y catch para manejar los errores
async function obtenerImagen(animal) {
    try {
        const respuesta = await fetch(`animales.json`);
      
        const datos = await respuesta.json();

        const animalEncontrado = datos.animales.find((item) => item.name === animal);
        return animalEncontrado.imagen;
        // Retorna la imagen del animal
    } catch (error) {
        //mostramos el error, si es que no se haya img
        console.error("Error al obtener la imagen:", error);
      
    }
}

// repetimos el paso para obtener el sonido del archivo .json, utilizando try y catch
async function obtenerSonido(animal) {
    try {
        const respuesta = await fetch(`animales.json`);
        const datos = await respuesta.json();
        const animalEncontrado = datos.animales.find((item) => item.name === animal);
        return animalEncontrado.sonido;
    } catch (error) {
        console.error("Error al obtener el sonido:", error);
    }
}

// Función que agregará el animal a la tabla de registros 
function agregarAnimalATabla(animal) {
    const animalesDiv = document.getElementById("Animales");
    // Selecciona el contenedor donde se mostrarán los animales registrados

    const card = document.createElement("div");
    // Crea un div para cada animal

    card.classList.add("card", "participante", "m-2");
    // Añade clases de Bootstrap para el estilo de la tarjeta

    card.style.width = "30%";
    // Define el ancho de la tarjeta

    // Define el contenido HTML de la tarjeta con la imagen y el botón de sonido
    card.innerHTML = `
        <img src="./assets/imgs/${animal.getImg()}" class="card-img-top img-fluid" alt="${animal.getNombre()}" style="height: 300px; width: 240px; object-fit: cover;">
        <div class="card-body">
        <button class="btn btn-reproducir"><img src="./assets/imgs/audio.svg" style="width: 25px; height: 25px;"></button>
        </div>
    `;

    // Añade un listener al botón de sonido para reproducir el sonido del animal
    const btnReproducir = card.querySelector(".btn-reproducir");
    btnReproducir.addEventListener("click", () => reproducirSonido(animal.getSonido()));

    // Añade un listener para mostrar el modal con los detalles del animal cuando se hace click en la tarjeta
    card.addEventListener("click", () => mostrarModal(animal));
    animalesDiv.appendChild(card);
    animalesRegistrados.push(animal);

}

// se define una función para reproducir el sonido del animal que el usuario seleccione
function reproducirSonido(sonido) {
    console.log("Reproduciendo sonido:", sonido); //muestra en la consula 

    new Audio(`./assets/sounds/${sonido}`).play();//reproduce el sonido
}

// Definimos una función para mostrar el modal de bootstrap
function mostrarModal(animal) {
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));//inicalizar

    const modalBody = document.querySelector("#exampleModal .modal-body");//seleccionamos el cuerpo del modal
    modalBody.innerHTML = `
       <img src="./assets/imgs/${animal.getImg()}" class="img-fluid" style="height: 300px; width: 240px; object-fit: cover; align-self-center;" alt="${animal.getNombre()}">
        <p><strong>Edad:</strong> ${animal.getEdad()}</p>
        <p><strong>Comentarios:</strong><br> ${animal.getComentarios()}</p>
    `;

    modal.show();
    // Muestra el modal en pantalla
}

// Finalmente una función para limpiar el formulario luego de que se haya realizado una búsqueda de algún animal, lo hacemos por cada campo del formulario
function resetFormulario() {
    const animalSelect = document.getElementById('animal');
    animalSelect.selectedIndex = 0; 

    const edadSelect = document.getElementById('edad');
    edadSelect.selectedIndex = 0;

    document.getElementById('comentarios').value = '';
    const preview = document.getElementById('preview');
    preview.style.backgroundImage = "url('./assets/imgs/lion.svg')";
}

