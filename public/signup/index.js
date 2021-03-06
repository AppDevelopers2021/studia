///////////////////////////////////////////////////////////////////////
// πΌπ½πΎπ­π²πͺ // The Best Way to Organize Your Notes. ////////////////////
///////////////////////////////////////////////////////////////////////
// Copyright (c) 2021 App Developers. All Rights Reserved. ////////////
///////////////////////////////////////////////////////////////////////

// Warn message in console
console.log("%cstudia\n%cThe Best Way to Organize Your Notes.", "font-family:'Courgette', cursive;color:#2291FF;font-size:40px;", "font-family:Arial;font-size:13px;color:#333;")
console.log("%cμ£Όμ: μ΄ κΈ°λ₯μ κ°λ°μλ€μ μν κ²μλλ€. μμ§ λͺ»νλ μ½λλ₯Ό μλ ₯νμ§ λ§μΈμ.", "font-family:Arial;color:red;font-size:15px;")

const hamburger = document.getElementsByClassName("nav_hamburger")[0];
const navbar = document.getElementById("navbar");
const sidenav = document.getElementById("sidenav");
const close_nav_button = document.getElementById("close_nav");

const signup_modal = document.getElementsByClassName("signup_popup")[0];
const signup_button = document.getElementById("signup_button");
const signup_google = document.getElementById("signup_with_google");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("bar_open");
    sidenav.classList.toggle("side_open");
})
close_nav_button.addEventListener("click", function () {
    hamburger.className = "nav_hamburger center";
    sidenav.className = "";
})


signup_button.addEventListener('click', function () {
    const email = document.getElementById("signup_id");
    const password = document.getElementById("signup_pw");
    const password_check = document.getElementById("signup_pw_check");
    const loader = document.getElementById("signup_loader");
    const error = document.getElementById("signup_log");

    loader.classList.add("loading")
    error.innerText = ""

    function shakeInput(elem) {
        elem.classList.add("signup_error");
    }

    function showError(msg) {
        error.innerText = msg
    }

    if (password.value === password_check.value) {
        // Password is valid
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then(() => {
                firebase.auth().currentUser.sendEmailVerification()
                    .then(() => {
                        // Verification Email Sent.
                        loader.classList.remove("loading");

                        location.href = "https://studia.blue/welcome/email"
                    }).catch((error) => {
                        // Error while sending email
                        loader.classList.remove("loading");
                        console.error(`Error while sending verification email :: ${error.code} : ${error.message}`);
                        alert(`μΈμ¦ λ©μΌ μ μ‘ μ€ μ€λ₯κ° λ°μνμμ΅λλ€. μ§μνμ λ¬Έμν΄μ£ΌμΈμ. (Error Code ${error.code})`);
                    })
            })
            .catch((error) => {
                // Error while signup
                loader.classList.remove("loading");
                console.error(`Error while Auth :: ${error.code} : ${error.message}`);
                switch (error.code) {
                    case "auth/invalid-email":
                        shakeInput(email);
                        showError("μ΄λ©μΌ μ£Όμκ° μλͺ»λμμ΅λλ€.")
                        break;
                    case "auth/email-already-in-use":
                        shakeInput(email);
                        showError("μ¬μ© μ€μΈ μ΄λ©μΌμλλ€.")
                        break;
                    case "auth/weak-password":
                        shakeInput(password);
                        showError("λΉλ°λ²νΈλ 6μ μ΄μμ΄μ΄μΌ ν©λλ€.")
                        break;
                    default:
                        console.error(`Error while Auth :: ${error.code} : ${error.message}`);
                        showError("μλ¬κ° λ°μνμ΅λλ€.")
                }
            })
    } else {
        // Password doesn't match
        shakeInput(password_check);
        showError("λΉλ°λ²νΈκ° μΌμΉνμ§ μμ΅λλ€.")
        loader.classList.remove("loading");
    }
});

// Signup with google
signup_google.addEventListener("click", function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    const loader = document.getElementById("signup_loader");

    firebase.auth()
        .signInWithPopup(provider)
        .then(() => {
            // Signed up successfully
            loader.classList.remove("loading");

            location.href = "https://studia.blue/welcome/google"
        }).catch((error) => {
            loader.classList.remove("loading");
            console.error(`Error while Google Auth :: ${error.code} : ${error.message}`);
        })
});