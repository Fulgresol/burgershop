document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("navLinks");

  // Función para alternar la visibilidad del menú
  function toggleMenu() {
    navLinks.classList.toggle("active");
    mobileMenuButton.classList.toggle("active");
  }

  // Escucha el evento clic en el botón de hamburguesa
  mobileMenuButton.addEventListener("click", toggleMenu);

  // Cierra el menú si se hace clic en un enlace
  const navLinksList = navLinks.querySelectorAll("a");
  navLinksList.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Cierrar el menú al redimensionar la ventana
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });
});
