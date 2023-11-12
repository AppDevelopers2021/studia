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

                        location.href = "https://studia-kr.web.app/welcome/email"
                    }).catch((error) => {
                        // Error while sending email
                        loader.classList.remove("loading");
                        console.error(`Error while sending verification email :: ${error.code} : ${error.message}`);
                        alert(`인증 메일 전송 중 오류가 발생하였습니다. 지원팀에 문의해주세요. (Error Code ${error.code})`);
                    })
            })
            .catch((error) => {
                // Error while signup
                loader.classList.remove("loading");
                console.error(`Error while Auth :: ${error.code} : ${error.message}`);
                switch (error.code) {
                    case "auth/invalid-email":
                        shakeInput(email);
                        showError("이메일 주소가 잘못되었습니다.")
                        break;
                    case "auth/email-already-in-use":
                        shakeInput(email);
                        showError("사용 중인 이메일입니다.")
                        break;
                    case "auth/weak-password":
                        shakeInput(password);
                        showError("비밀번호는 6자 이상이어야 합니다.")
                        break;
                    default:
                        console.error(`Error while Auth :: ${error.code} : ${error.message}`);
                        showError("에러가 발생했습니다.")
                }
            })
    } else {
        // Password doesn't match
        shakeInput(password_check);
        showError("비밀번호가 일치하지 않습니다.")
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

            location.href = "https://studia-kr.web.app/welcome/google"
        }).catch((error) => {
            loader.classList.remove("loading");
            console.error(`Error while Google Auth :: ${error.code} : ${error.message}`);
        })
});