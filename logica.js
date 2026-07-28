//elementos de la pagina que vamos a usar

  const contenedor = document.getElementById("contenedor-de-recetas");
  const buscador = document.getElementById("buscador");

//contenedor del boton buscar
  const btnBuscar = document.getElementById("btnBuscar");


// botones del menu de navegación 
  const menuInicio = document.getElementById("menuInicio");
  const menuPollo = document.getElementById("menuPollo");
  const menuRes = document.getElementById("menuRes");
  const menuCerdo = document.getElementById("menuCerdo");
  const menuVegetal = document.getElementById("menuVegetal");
  const menuMasBuscadas = document.getElementById("menuMasBuscadas");
  const modoOscuro = document.getElementById("modoOscuro");
//construcción del modal
//aca se muestra toda la info del modal
  const modal = document.getElementById("modal");

//boton cerrar
  const cerrarModal = document.getElementById("cerrarModal");

//componentes del modal
  const imagenModal = document.getElementById("imagenModal");
  const tituloModal = document.getElementById("tituloModal");
  const categoriaModal = document.getElementById("categoriaModal");
  const paisModal = document.getElementById("paisModal");
  const ingredientesModal = document.getElementById("ingredientesModal");
  const preparacionModal = document.getElementById("preparacionModal");

// URL de la API
  const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const API_DETALLE = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

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

    // consulta por el texto del usuario
    const respuesta = await fetch(API_URL + texto);
    console.log("Estado:", respuesta.status);

    // traduciomos la respuesta para poder usarla
    const datos = await respuesta.json();
    console.log(datos);

    // validando que la API encuentre la respuesta
    if (datos.meals == null) {
      alert("No se encontraron recetas.");
      return;
    }

    // Limpiar el contenedor antes de mostrar resultados
    contenedor.innerHTML = "";

    //recorrer todas las recetas con el for each y se crean las tarjetas
    //una por una con cada informacion correspondiente
    datos.meals.forEach(function (receta) {
      contenedor.innerHTML += `

            <div class="bg-white rounded-xl shadow-lg overflow-hidden w-80 p-4">

  <!-- imagen -->            
                <img
                  src="${receta.strMealThumb}"
                  alt="${receta.strMeal}"
                  class="w-full h-48 object-cover rounded-lg">

<!-- titulo -->                  
                  <h2 class="text-xl font-bold mt-4">
                    ${receta.strMeal}
                  </h2>

                 
<!-- categoria -->
                  <p class="text-gray-600">
                    ${receta.strCategory}
                  </p>

<!-- País -->
                  <p class="text-gray-600">
                    ${receta.strArea || "País no disponible"}
                  </p>

<!-- ver receta -->                  
                <button class="verReceta mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                     data-id="${receta.idMeal}">
                   📝 Ver recetas                

                </button>
                

            </div>
            `;
    });

    /// activacion de los botones para ver receta

    const botones = document.querySelectorAll(".verReceta");
      botones.forEach(function (boton) {
        boton.addEventListener("click", function () {
        const id = boton.dataset.id;
        console.log("id de la receta", id);
        obtenerDetalleReceta(id);
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

//función para obtener cada receta y llenar el modal con la info de cada receta

async function obtenerDetalleReceta(id){
  try {
//consulta la Api por la id 
    const respuesta = await fetch(API_DETALLE + id);
    const datos = await respuesta.json();

//la API dedvuelve un solo elemento
    const receta = datos.meals[0];

//mostrar imagen
    imagenModal.src = receta.strMealThumb;
    imagenModal.alt = receta.strMeal;

//mostrar nombre
    tituloModal.textContent = receta.strMeal;

//mostrar categoria
    categoriaModal.textContent = " 🔖 Categoria:" + receta.strCategory;

//mostrar pais de origen 
    paisModal.textContent = "🗺️ País:" + (receta.strArea || "No Disponible");

//mostrar la preparacion 
    preparacionModal.textContent = receta.strInstructions;
  
// ingredientes
    let ingredientes = "";
      for (let i= 1; i<=20;i++){
        const ingrediente = receta [ "strIngredient" + i];
        const medida = receta ["strMeasure" + i];

      if(
        ingrediente &&
        ingrediente.trim() !== ""
      ){
        ingredientes +=  
        "• " +
        ingrediente +
        " _ " +
        medida +
        "\n";
       }
      }

//mostrar ingredientes
      ingredientesModal.textContent = ingredientes;

//mostrar el modal
      modal.classList.remove ("hidden");

}

  catch (error) {
  console.error ("Error:", error);
  }
}
// cerrar modal 
  cerrarModal.addEventListener("click", function(){
    modal.classList.add("hidden");
  })

//boton buscar
//con click
  btnBuscar.addEventListener("click", function () {
    obtenerRecetas();
  });

//con enter
  buscador.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        obtenerRecetas();
      }
  });
  
  
//cerrar modal
//click en la x
  cerrarModal.addEventListener("click", function () {
      modal.classList.add("hidden");  
  });
// click por fuera 
  modal.addEventListener("click", function (event){
   if(event.target=== modal){
    modal.classList.add("hidden");
   }
  });


//Menu inicio
  menuInicio.addEventListener("click", function (event) {
    event.preventDefault();
      buscador.value = "";
      contenedor.innerHTML = "";
});

//Menu pollo
  menuPollo.addEventListener("click", function (event) {
    event.preventDefault();
    buscador.value = "chicken";
    obtenerRecetas();
});

//Menu Res
  menuRes.addEventListener("click", function (event) {
    event.preventDefault();
    buscador.value = "beef";
    obtenerRecetas();
});

//Menu cerdo
  menuCerdo.addEventListener("click", function (event) {
    event.preventDefault();
    buscador.value = "pork";
    obtenerRecetas();
});

//Menu vegetales
  menuVegetal.addEventListener("click", function (event) {
    event.preventDefault();
    buscador.value = "vegetarian";
    obtenerRecetas();
});

//Menu mas buscadas
  menuMasBuscadas.addEventListener("click", function (event) {
    event.preventDefault();
    buscador.value = "a";
    obtenerRecetas();
});


console.log("🍏 NutriChef iniciado correctamente");

