//anasayfaya ve restorantın ikonuna  tıklayınca sayfanın başına  kaydırır 
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


const showMenuButton = document.getElementById("showMenuButton");
const menuModal = document.getElementById("menuModal");
const closeMenu = document.getElementById("closeMenu");

showMenuButton.addEventListener("click", function() {
  menuModal.style.display = "block";
});

closeMenu.addEventListener("click", function() {
  menuModal.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target === menuModal) {
    menuModal.style.display = "none";
  }
});


document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll(".nav-link");

  for (const link of links) {
    link.addEventListener("click", clickHandler);
  }

  function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
      top: offsetTop,
      behavior: "smooth"
    });
  }
});
