//Global vars
var header = document.querySelector('#header');
var navbar = document.querySelector('.navbar');
var iconMenu = document.querySelector('.icon-menu');

//Menu animation
function pimpMenu(x) {
  //Style in header
  var headerHeight = window.getComputedStyle(document.querySelector('#header')).height;
  (headerHeight == "68.8906px" ? header.style.height = '40vh' : header.style.height = '10vh');

  //Style in navbar
  (headerHeight != "68.8906px" ? navbar.style.display = 'none' : navbar.style.display = 'flex');

  //Style in menu animation
  x.classList.toggle("change");
}

//Evento de redimensionar la página
window.addEventListener("resize", function(event){
  var widthWindow = window.innerWidth;

  if (widthWindow <= 1024){
      if (navbar.style.display == 'flex' && !iconMenu.classList.contains("change")) {
        navbar.style.display = 'none';
      }
    } else {
      header.style.height = "10vh";
      iconMenu.classList.remove("change");
      navbar.style.display = 'flex';
    }
});
