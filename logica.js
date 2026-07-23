// NutriChef-  Proyecto Final

console.log("Voy a buscar recetas...");

console.log(" NutriChef iniciado correctamente");

const contenedor = document.getElementById("contenedor-de-recetas");

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function obtenerRecetas() {
  console.log("Voy a buscar recetas...");

  const respuesta = await fetch(API_URL);

  const datos = await respuesta.json();

  console.log(datos);
}

obtenerRecetas();
