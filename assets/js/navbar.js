//Global vars
let count = 0;
var header = document.querySelector('#header');
var navbar = document.querySelector('.navbar');
var iconMenu = document.querySelector('.icon-menu');

//Menu animation
function pimpMenu(x) {
  //Style in header
  var headerHeight = window.getComputedStyle(document.querySelector('#header')).height;
  //(headerHeight == "68.8906px" ? header.style.height = '40vh' : header.style.height = '10vh');

  //Style in navbar
  //(headerHeight != "68.8906px" ? navbar.style.display = 'none' : navbar.style.display = 'flex');

  //Style in menu animation
  x.classList.toggle("change");
  if(count < 1) {
    count += 1;
    header.style.height = '40vh';
    navbar.style.display = 'flex';
  } else if(count >= 1) {
    count -= 1;
    header.style.height = '10vh';
    navbar.style.display = 'none';
  }
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
