///////////////////////////////////////////////////////////////////////
// 𝓼𝓽𝓾𝓭𝓲𝓪 // The Best Way to Organize Your Notes. ////////////////////
///////////////////////////////////////////////////////////////////////
// Copyright (c) 2021 App Developers. All Rights Reserved. ////////////
///////////////////////////////////////////////////////////////////////

// Warn message in console
console.log("%cstudia\n%cThe Best Way to Organize Your Notes.", "font-family:'Courgette', cursive;color:#2291FF;font-size:40px;", "font-family:Arial;font-size:13px;color:#333;")
console.log("%c주의: 이 기능은 개발자들을 위한 것입니다. 알지 못하는 코드를 입력하지 마세요.", "font-family:Arial;color:red;font-size:15px;")

const hamburger = document.getElementsByClassName("nav_hamburger")[0];
const navbar = document.getElementById("navbar");
const sidenav = document.getElementById("sidenav");
const close_nav_button = document.getElementById("close_nav");
const blur_bg = document.getElementById("blur_bg");

const login_modal = document.getElementsByClassName("login_popup")[0];
const login_button = document.getElementById("login_button");
const login_google = document.getElementById("login_with_google");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("bar_open");
    sidenav.classList.toggle("side_open");
})
close_nav_button.addEventListener("click", function () {
    hamburger.className = "nav_hamburger center";
    sidenav.className = "";
})

// Pikaday
var field = document.getElementById("date_picker")
var date_picker = new Pikaday({field: field, format: "YYYY/MM/DD"});
date_picker.setDate(new Date())

// console.log(date_picker.toString('YYYYMMDD'))

// Open login modal when logged out
window.onload = function() {
    if(firebase.auth().currentUser) {
        // User already signed in
    } else {
        // User needs login
        // Show login modal
        blur_bg.className = "blur_filter blur";
        login_modal.className = "login_popup open";
    }
}

// Event listeners for login
login_button.addEventListener("click", function() {
    const email = document.getElementById("login_id");
    const password = document.getElementById("login_pw");
    const isPersistenceSet = document.getElementById("login_keep").checked;
    const loader = document.getElementById("login_loader");

    loader.classList.add("loading")

    function shakeInput(elem) {
        elem.classList.add("login_error");
    }

    if(isPersistenceSet) {
        // 로그인 유지
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                // Persistence is set to LOCAL
                return firebase.auth().signInWithEmailAndPassword(email.value, password.value)
                    .then(() => {
                        // Signed in successfully
                        console.log("Logged in successfully.");
                        loader.classList.remove("loading");
                        blur_bg.className = "blur_filter";
                        login_modal.className = "login_popup";
                    })
                    .catch((error) => {
                        // Error while login
                        loader.classList.remove("loading");
                        switch(error.code) {
                            case "auth/wrong-password":
                                shakeInput(password);
                                break;
                            case "auth/user-not-found":
                                shakeInput(email);
                                break;
                            case "auth/invalid-email":
                                shakeInput(email);
                                break;
                            default:
                                console.error(`Error while Auth :: ${error.code} : ${error.message}`);
                        }
                    })
            })
            .catch((error) => {
                // Error while setting persistence
                loader.classList.remove("loading");
                console.error(`Error while setting persistence to LOCAL :: ${error.code} : ${error.message}`);
            })
    } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                // Persistence is set to SESSION
                return firebase.auth().signInWithEmailAndPassword(email.value, password.value)
                    .then(() => {
                        // Signed in successfully
                        console.log("Logged in successfully.")
                        loader.classList.remove("loading");
                        blur_bg.className = "blur_filter";
                        login_modal.className = "login_popup";
                    })
                    .catch((error) => {
                        // Error while login
                        loader.classList.remove("loading");
                        switch(error.code) {
                            case "auth/wrong-password":
                                shakeInput(password);
                                break;
                            case "auth/user-not-found":
                                shakeInput(email);
                                break;
                            case "auth/invalid-email":
                                shakeInput(email);
                                break;
                            default:
                                console.error(`Error while Auth :: ${error.code} : ${error.message}`);
                        }
                    })
            })
            .catch((error) => {
                // Error while setting persistence
                loader.classList.remove("loading");
                console.error(`Error while setting persistence to SESSION :: ${error.code} : ${error.message}`);
            })
    }
})

// Login with google
login_google.addEventListener("click", function() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(() => {
            // Signed in successfully
            // Signed in successfully
            console.log("Logged in successfully.")
            blur_bg.className = "blur_filter";
            login_modal.className = "login_popup";
        }).catch((error) => {
            console.error(`Error while Google Auth :: ${error.code} : ${error.message}`);
        })
})