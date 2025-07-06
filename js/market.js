// Espera que todos los elementos del DOM esten cargados para ejecutar las funciones
document.addEventListener("DOMContentLoaded", async () => {
  // Dirección de la API (en este caso ubicación del archivo json)
  const API_URL = "./json/burger.json";
  // Creamos un array para almacenar los datos de los productos
  let todosProductos = [];
  // Contenedor de las tarjetas de los productos
  const productFlex = document.getElementById("product-flex");
  // Inicializamos el carrito de compras
  let carrito = JSON.parse(localStorage.getItem("carritoDeCompras")) || [];
  // Contador de productos en el carrito
  const cartCount = document.getElementById("cart-count");

  // Función para realizar la petición a la API y obtener los productos
  async function llamarAPI(API) {
    try {
      const response = await fetch(API);
      // Evaluamos si se pudo conectar con la API
      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }
      // Almacenamos todo los productos de la API
      todosProductos = await response.json();
      // Llamamos a la función para cargar los productos
      cargarProductos(todosProductos);
    } catch (error) {
      console.error("Error al obtener los productos de la API:", error);
      return [];
    }
  }

  // Función para crear las tarjetas de productos
  function cargarProductos(productos) {
    // Recorremos el array de productos
    productos.forEach((producto) => {
      // Creamos un div con su clase correspondiente
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      // Utilizamos un template literal para construir todo el HTML de las cartas del producto
      productCard.innerHTML = `<img src=${producto.imagen} alt=${producto.nombre} class="card-img" />
                               <h3 class="card-title">${producto.nombre}</h3>
                               <p class="card-text">${producto.descripción}</p>
                               <p class="card-price">$ ${producto.precio}</p>
                               <button id="add-btn-${producto.código}" class="card-button">PEDIR AHORA</button>`;

      // Agregamos todo al contenedor principal
      productFlex.appendChild(productCard);
    });
    // Llamamos a la función para los eventos de los botones
    adjuntarEventosCarrito();
  }

  // Función para adjuntar los eventos al boton
  function adjuntarEventosCarrito() {
    todosProductos.forEach((producto) => {
      const boton = document.getElementById(`add-btn-${producto.código}`);
      // Nos aseguramos que el boton exista
      if (boton) {
        boton.addEventListener("click", () => {
          // Cuando se hace clic, ya tenemos acceso al objeto 'producto' original
          // Llamamos a la función para agregar el producto al carrito
          agregarProductoAlCarrito(producto);
        });
      }
    });
  }

  // Función para agregar productos al localStorage
  function agregarProductoAlCarrito(producto) {
    // Buscamos en el carrito si el producto existe
    const indiceProductoExistente = carrito.findIndex(
      (item) => item.código === producto.código
    );
    // Si el producto ya está en el carrito aumentamos la cantidad
    // Si no existe guardas la información del nuevo producto
    if (indiceProductoExistente !== -1) {
      carrito[indiceProductoExistente].cantidad++;
    } else {
      carrito.push({
        código: producto.código,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1,
      });
    }
    // Guardamos los datos en el localStorage
    localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));
    // Llamamos a la función para actualizar el contador
    actualizarContadorCarrito();
  }

  // Función para actualizar el contador del carrito
  function actualizarContadorCarrito() {
    // Inicializamos el contador
    let totalProductos = 0;
    // Buscamos en el carrito la cantidad de productos
    carrito.forEach((item) => {
      totalProductos += item.cantidad;
    });
    // Actualizamos la cantidad de productos
    cartCount.textContent = totalProductos;
  }

  // Llamamos las funciones para que se ejecuten
  llamarAPI(API_URL);
  actualizarContadorCarrito();
});
