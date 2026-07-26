//elementor de la pagina que vamos a usar

console.log("JS CARGADO");

const contenedor = document.getElementById("contenedor-de-recetas");

const buscador = document.getElementById("buscador");

// botones del menu
const btnBuscar = document.getElementById("btnBuscar");
const menuPollo = document.getElementById("menuPollo");
const menuRes = document.getElementById("menuRes");
const menuCerdo = document.getElementById("menuCerdo");
const menuVegetal = document.getElementById("menuVegetal");
const menuInicio = document.getElementById("menuInicio");
const menuPopulares = document.getElementById("menuPopulares");

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

    //recorrer todas las recetas
    datos.meals.forEach(function (receta) {
      contenedor.innerHTML += `

            <div class="bg-white rounded-xl shadow-lg overflow-hidden w-80 p-4">

                <img
                  src="${receta.strMealThumb}"
                  class="w-full h-48 object-cover rounded-lg">

                  <h2 class="text-xl font-bold mt-4">
                    ${receta.strMeal}
                  </h2>

                  <p>
                    ${receta.strCategory}
                  </p>

                  <p>
                    ${receta.strArea || "País no disponible"}
                  </p>

                <button

                  class="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
                   📝 Ver recetas
                </button>

            </div>
            `;
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

//boton buscar
buscador.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        obtenerRecetas();
    }
});


//Menu inicio
menuInicio.addEventListener("click", function(event){

    event.preventDefault();

    buscador.value = "";

    contenedor.innerHTML = "";

});

//Menu pollo
menuPollo.addEventListener("click", function(event){

    event.preventDefault();

    buscador.value = "chicken";

    obtenerRecetas();

});

//Menu Res 
menuRes.addEventListener("click", function(event){

    event.preventDefault();

    buscador.value = "beef";

    obtenerRecetas();

});

//Menu cerdo
menuCerdo.addEventListener("click", function(event){

    event.preventDefault();

    buscador.value = "pork";

    obtenerRecetas();

});


//Menu vegetales
menuVegetal.addEventListener("click", function(event){

    event.preventDefault();

    buscador.value = "vegetarian";

    obtenerRecetas();

});

//Menu favoritas
menuPopulares.addEventListener("click", function(event){

    event.preventDefault();

    buscador.value = "a";

    obtenerRecetas();

});