// JS 코드는 추가해도 좋습니다.
const popup = document.getElementsByClassName("popup")[0];
let login_popup = document.getElementById("login-popup");
var database = firebase.database();
var uid;
var setDate = new Date();


// Hamburger Buttons
document.getElementsByClassName('hamburger')[0].addEventListener("click", function () {
    document.getElementsByClassName('sidenav')[0].style.width = "250px";
});
document.getElementsByClassName('close_nav')[0].addEventListener("click", function () {
    document.getElementsByClassName('sidenav')[0].style.width = "0"
});

// Login Popup
document.getElementById("login").addEventListener("click", function () {
    login_popup.hidden = false;
    login_popup.style.opacity = 1;
});
document.getElementById("login-close").addEventListener("click", function () {
    login_popup.hidden = true;
    login_popup.style.opacity = 0;
});

// Add Note Popup
document.getElementById("add").addEventListener("click", function () {
    popup.hidden = false;
})
document.getElementById("save").addEventListener("click", function () {
    // Save note
    var subject = document.getElementById("subject").value;
    var content = document.getElementById("note").value;
    var note = {
        "content": content,
        "subject": subject
    };

    addNote(note);
})

function getDate(date) {
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

// Get User info.
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        uid = user.uid;
        signin = true;

        fetchData(getDate(setDate));
    } else {
        // User is not signed in
        signin = false;
    }
})

function fetchData(date) {
    // Read data
    database.ref('calendar/' + uid + '/' + date).get().then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available!");
            console.log("Creating new...");
            database.ref('calendar/' + uid + '/' + date).set({memo: "", note: [], reminder: []});
            console.log("done.");
        }
    }).catch((error) => {
        console.error(error);
    })
}

function addNote(note) {
    console.log(fetchData(setDate))
}

document.getElementById("confirm").addEventListener('click', function (evt) {
    document.getElementById("confirm").style.cursor = "wait";

    var email = document.getElementById("email").value;
    var pw = document.getElementById("pw").value;
    var keep = document.getElementById("keep").value;
    var log = document.getElementById("error");
    log.innerText = ''

    // Set Persistence
    if (keep) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                // Set to LOCAL
                return firebase.auth().signInWithEmailAndPassword(email, pw)
                    .then((userCredential) => {
                        // Signed In
                        var user = userCredential.user;
                        login_popup.hidden = true;
                        login_popup.style.opacity = 0;
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.error('Error while login: ' + errorCode + ' : ' +
                            errorMessage)
                        if (errorCode == "auth/wrong-password") {
                            log.innerText = "비밀번호가 잘못되었습니다."
                        } else if (errorCode == "auth/user-not-found") {
                            log.innerText = "계정을 찾을 수 없습니다."
                        } else if (errorCode == "auth/invalid-email") {
                            log.innerText = "잘못된 이메일 주소입니다."
                        } else {
                            log.innerText = "에러가 발생하였습니다."
                        }
                    })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error('Error while setting persistence: ' + errorCode + ' : ' +
                    errorMessage)
            })
    } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                // Set to SESSION
                return firebase.auth().signInWithEmailAndPassword(email, pw)
                    .then((userCredential) => {
                        // Signed In
                        var user = userCredential.user;
                        login_popup.hidden = true;
                        login_popup.style.opacity = 0;
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.error('Error while login: ' + errorCode + ' : ' +
                            errorMessage)
                        if (errorCode == "auth/wrong-password") {
                            log.innerText = "비밀번호가 잘못되었습니다."
                        } else if (errorCode == "auth/user-not-found") {
                            log.innerText = "계정을 찾을 수 없습니다."
                        } else if (errorCode == "auth/invalid-email") {
                            log.innerText = "잘못된 이메일 주소입니다."
                        } else {
                            log.innerText = "에러가 발생하였습니다."
                        }
                    })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error('Error while setting persistence: ' + errorCode + ' : ' +
                    errorMessage)
            })
    }
    document.getElementById("confirm").style.cursor = "none";

});

// Login with google
document.getElementById("google").addEventListener("click", function () {
    var log = document.getElementById("error");
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            login_popup.hidden = true;
            login_popup.style.opacity = 0;
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            log.innerText = "Error " + errorCode + ": " + errorMessage;
        })
});