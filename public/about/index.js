const hamburger = document.getElementsByClassName("nav_hamburger")[0];
const navbar = document.getElementById("navbar");
const sidenav = document.getElementById("sidenav");
const close_nav_button = document.getElementById("close_nav");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("bar_open");
    sidenav.classList.toggle("side_open");
})
close_nav_button.addEventListener("click", function () {
    hamburger.className = "nav_hamburger center";
    sidenav.className = "";
})

// ScrollMagic
var controller = new ScrollMagic.Controller();

var tween1 = TweenMax.to("#cover", 0.5, {
    width: "100vw"
})

var scene1 = new ScrollMagic.Scene({
    triggerElement: ".trigger",
    duration: "900px"
})
.setTween(tween1)
.addTo(controller);