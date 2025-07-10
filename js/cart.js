// Esperamos que todos los elementos del DOM esten cargados para ejecutar las funciones
document.addEventListener("DOMContentLoaded", function () {
  // Obtenemos los datos del carrito de compras
  let carrito = JSON.parse(localStorage.getItem("carritoDeCompras")) || [];
  // Tabla de productos
  const productList = document.getElementById("product-list");

  // Función para crear la tabla de prudctosS
  function cargarProductosCarrito() {
    // Limpiamos el contenido existente de la tabla
    productList.innerHTML = "";
    // Inicializamos el total
    let subtotalCalculado = 0;
    // Nos aseguramos que el localStorage contenga datos
    if (carrito.length === 0) {
      // Mostramos un mensaje si el carrito está vacío
      productList.innerHTML =
        '<tr><td colspan="6" style="text-align: center; padding: 20px;">Tu carrito está vacío. Agrega productos desde la <a href="./index.html">tienda</a>.</td></tr>';
    } else {
      carrito.forEach((producto) => {
        const tabla = document.createElement("tr");
        const productoSubtotal = (producto.precio * producto.cantidad).toFixed(
          2
        );

        tabla.innerHTML = `<tr>
                            <td><button id="${producto.código}" class="remove-btn"><i class="far fa-times-circle"></i></button></td>
                            <td><img src=${producto.imagen} alt=${producto.nombre} style="height: 80px; width: auto; object-fit: contain;" /></td>
                            <td>${producto.nombre}</td>
                            <td>$ ${producto.precio}</td>
                            <td><input type="number" value="${producto.cantidad}" min="1" id="${producto.código}" class="cantidad-producto" /></td>
                            <td>$ ${productoSubtotal}</td>
                          </tr>`;

        // Agregamos todo al contenedor principal
        productList.appendChild(tabla);
        // Calculamos el total
        subtotalCalculado += producto.precio * producto.cantidad;
      });
      // Actualizamos el total
      actualizarTotalCarrito(subtotalCalculado);
      // Eventos a botones de eliminar o campos de cantidad
      eventosFila();
    }
  }

  // Función para calcular el total
  function actualizarTotalCarrito(subtotal) {
    document
      .querySelectorAll(".cart-total")
      .forEach((elemento) => (elemento.innerHTML = `$ ${subtotal.toFixed(2)}`));
  }

  // ------------------------------------------------- //
  // Lógica para eliminar o cambiar cantidad

  function eventosFila() {
    // Eventos para botones de eliminar
    //const botonesEliminar = document.querySelectorAll('.remove-btn');
    document.querySelectorAll(".remove-btn").forEach((boton) => {
      boton.addEventListener("click", () => {
        // Obtenemos el id del boton
        const productId = boton.id;
        // Encontrar el índice del producto en el carrito
        const indiceProducto = carrito.findIndex(
          (producto) => producto.código === productId
        );
        console.log(indiceProducto);
        if (indiceProducto !== -1) {
          // Eliminar el producto del array
          carrito.splice(indiceProducto, 1);

          // Actualizar localStorage
          localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));

          // Recargar la vista del carrito
          cargarProductosCarrito();

          // Recalcular y actualizar solo los totales (sin recargar toda la tabla)
          actualizarTotales();

          console.log(`Producto con ID ${productId} eliminado del carrito`);
        }
      });
    });

    // Eventos para cambiar cantidad

    document.querySelectorAll(".cantidad-producto").forEach((input) => {
      input.addEventListener("change", () => {
        // Obtener el input que fue modificado
        const input = document.activeElement;
        const productId = input.id;
        const nuevaCantidad = parseInt(input.value);

        // Validar que la cantidad sea válida
        if (nuevaCantidad < 1) {
          input.value = 1;
          return;
        }

        // Encontrar el producto en el carrito
        const producto = carrito.find((item) => item.código === productId);

        if (producto) {
          // Actualizar la cantidad
          producto.cantidad = nuevaCantidad;

          // Actualizar localStorage
          localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));

          // Recalcular y actualizar solo los totales (sin recargar toda la tabla)
          actualizarTotales();

          console.log(
            `Cantidad del producto ID ${productId} actualizada a ${nuevaCantidad}`
          );
        }
      });
    });
  }

  function actualizarTotales() {
    let subtotalCalculado = 0;
    // Recalcular subtotal
    carrito.forEach((producto) => {
      subtotalCalculado += producto.precio * producto.cantidad;
    });

    // Actualizar subtotales individuales en la tabla
    const filas = document.querySelectorAll("#product-list tr");
    filas.forEach((fila) => {
      const input = fila.querySelector(".cantidad-producto");
      if (input) {
        const productId = input.id;
        const producto = carrito.find((item) => item.código === productId);
        if (producto) {
          const subtotalCelda = fila.cells[5]; // La celda del subtotal es la sexta (índice 5)
          const subtotalProducto = (
            producto.precio * producto.cantidad
          ).toFixed(2);
          subtotalCelda.textContent = `$${subtotalProducto}`;
        }
      }
    });
    console.log(subtotalCalculado);
    // Actualizar el total general
    actualizarTotalCarrito(subtotalCalculado);
  }

  // Finalizar compra
  document.getElementById("cart-pay").addEventListener("click", () => {
    if (carrito.length > 0) {
      alert("Compra finalizada. ¡Gracias por su pedido!");
      carrito = [];
      localStorage.removeItem("carritoDeCompras");
      cargarProductosCarrito();
      actualizarTotales();
    } else {
      alert("El carrito está vacío.");
    }
  });

  // Llamamos las funciones para que se ejecuten
  cargarProductosCarrito();
});
