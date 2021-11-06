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

const button = document.getElementById("iforgot_button");
const loader = document.getElementById("iforgot_loader");
const email = document.getElementById("iforgot_id");
const done = document.getElementById("iforgot_done");

function shakeInput(elem) {
    elem.classList.add("iforgot_error");
}

button.addEventListener("click", function () {
    loader.classList.add("loading");
    firebase.auth().sendPasswordResetEmail(email.value)
        .then(() => {
            // Email is sent
            loader.classList.remove("loading");
            done.hidden = false;
        })
        .catch((error) => {
            // Error
            switch (error.code) {
                case "auth/user-not-found":
                    shakeInput(email);
                    break;
                case "auth/invalid-email":
                    shakeInput(email);
                    break;
                default:
                    console.error(`Error while sending Password Reset Email :: ${error.code} : ${error.message}`);
            }
            loader.classList.remove("loading")
        })
})