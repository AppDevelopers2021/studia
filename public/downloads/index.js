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

// 'Sticky' Navbar
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}

// Detect OS Version
var OS = "unknown"
if(navigator.appVersion.indexOf("Win")!=-1) OS="Windows"
if(navigator.appVersion.indexOf("Mac")!=-1) OS="MacOS"
if(navigator.appVersion.indexOf("Linux")!=-1) OS="Linux"
if(navigator.appVersion.indexOf("Android")!=-1) OS="Android"
if(navigator.appVersion.indexOf("like Mac")!=-1) OS="iOS"