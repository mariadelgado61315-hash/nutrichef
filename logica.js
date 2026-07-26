//elementor de la pagina que vamos a usar

const contenedor = document.getElementById("contenedor-de-recetas");

const buscador = document.getElementById("buscador");

const btnBuscar = document.getElementById("btnBuscar");

// URL de la API
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Función para consultar recetas
async function obtenerRecetas() {
  try {
    // leer el texto escrito por el usuario
    const texto = buscador.value.trim();

    // Validar que el usuario escriba algo
    if (texto === "") {
      alert("¿que receta deseas consultar hoy?.");
      return;
    }

    console.log("Buscando:", texto);

    // la URL se modifica cuando el usuario ingresa la informacion de busqueda
    const respuesta = await fetch(API_URL + texto);
    console.log("Estado:", respuesta.status);

    // Guardamos  y traduciomos la respuesta para poder usarla
    const datos = await respuesta.json();
    console.log(datos);

    // validando que la API encuentre la respuesta
    if (datos.meals == null) {
      alert("No se encontraron recetas.");
      return;
    }

    // Limpiar el contenedor antes de mostrar resultados
    contenedor.innerHTML = "";

    // Recorrer todas las recetas encontradas
    datos.meals.forEach(function (receta) {
      console.log(receta);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

//boton buscar
btnBuscar.addEventListener("click", obtenerRecetas);
