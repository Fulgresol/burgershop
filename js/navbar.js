// Esperamos que todos los elementos del DOM esten cargados para ejecutar las funciones
document.addEventListener("DOMContentLoaded", function () {
  const toggleNav = document.getElementById("toggle-nav");
  const linksNav = document.getElementById("links-nav");

  // Función para alternar la visibilidad del menú
  function toggleMenu() {
    linksNav.classList.toggle("active");
    toggleNav.classList.toggle("active");
  }

  // Agregamos el evento 'click' al botón del menú
  toggleNav.addEventListener("click", toggleMenu);

  // Si hacemos clic en un enlace el menú se cierra
  const navLinksList = linksNav.querySelectorAll("a");
  navLinksList.forEach((link) => {
    link.addEventListener("click", () => {
      if (linksNav.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Al cambiar el tamaño de la ventana el menú se cierra
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && linksNav.classList.contains("active")) {
      toggleMenu();
    }
  });
});
