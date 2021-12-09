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
/*
var controller = new ScrollMagic.Controller();

var tween1 = TweenMax.to('.cross1>div', 0.5, {
    opacity: 0
})
var tween2 = TweenMax.to('.cross2>div', 0.5, {
    backgroundColor: '#2291ff',
    transform: 'rotate(-47deg) translate(15px, 15px)',
    height: '10px'
})
var tween3 = TweenMax.to('.cross3>div', 0.5, {
    opacity: 0
})
var tween4 = TweenMax.to('.cross4>div', 0.5, {
    backgroundColor: '#2291ff',
    transform: 'rotate(-47deg) translate(-20px, 2px)',
    height: '10px'
})
var tween5 = TweenMax.to('.cross5>div', 0.5, {
    backgroundColor: '#2291ff',
    transform: 'rotate(47deg) translate(-15px, 15px)',
    height: '10px'
})
var tween6 = TweenMax.to('.cross6>div', 0.5, {
    opacity: 0
})
var tween7 = TweenMax.to('.cross7>div', 0.5, {
    opacity: 0
})
var tween8 = TweenMax.to('.cross8>div', 0.5, {
    backgroundColor: '#2291ff',
    transform: 'rotate(47deg) translate(15px, -15px)',
    height: '10px'
})
var tween9 = TweenMax.to('.cross9>div', 0.5, {
    backgroundColor: '#2291ff',
    transform: 'rotate(-47deg) translate(20px, 0)',
    height: '10px'
})
var tween10 = TweenMax.to('.cross10>div', 0.5, {
    opacity: 0
})
var tween11 = TweenMax.to('.cross11>div', 0.5, {
    backgroundColor: '#2291ff',
    transform: 'rotate(-47deg) translate(-15px, -15px)',
    height: '10px'
})
var tween12 = TweenMax.to('.cross12>div', 0.5, {
    opacity: 0
})

var scene = new ScrollMagic.Scene({
    triggerElement: '#trigger',
    duration: '2000px'
})
.setTween([tween1, tween2, tween3, tween4, tween5, tween6, tween7, tween8, tween9, tween10, tween11, tween12])
.addTo(controller);*/