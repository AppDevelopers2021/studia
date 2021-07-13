// JS 코드는 추가해도 좋습니다.
let body = document.getElementsByClassName("body")[0];
let popup = document.getElementsByClassName("popup")[0];
let login_popup = document.getElementById("login-popup");
let memo_popup = document.getElementById("memo-popup");
let memo = document.getElementsByClassName("memo")[0];
let notes = document.getElementsByClassName("note-list")[0];
let notes_blank = document.getElementsByClassName("note-blank")[0];
let reminder = document.getElementsByClassName("reminder-list")[0];
var database = firebase.database();
var uid;
var signin;
var setDate = new Date();


function getDate(date) {
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

function showDate() {
    document.getElementsByClassName("date")[0].childNodes[0].innerText = ("0" + (1 + setDate.getMonth())).slice(-2) + "." + ("0" + setDate.getDate()).slice(-2);
}
showDate()

// Event Listener
var myDB = database.ref('calendar/' + uid + '/' + getDate(setDate));
myDB.on('value', function () {
    fetchData(getDate(setDate))
});

// Hamburger Buttons
document.getElementsByClassName('hamburger')[0].addEventListener("click", function () {
    document.getElementsByClassName('sidenav')[0].style.width = "250px";
});
document.getElementsByClassName('close_nav')[0].addEventListener("click", function () {
    document.getElementsByClassName('sidenav')[0].style.width = "0"
});

// Memo Popop
document.getElementsByClassName("memo")[0].addEventListener("click", function () {
    memo_popup.hidden = false;
});
document.getElementById("memo-close").addEventListener("click", function () {
    memo_popup.hidden = true;
});

// Add Note Popup
document.getElementById("add").addEventListener("click", function () {
    popup.hidden = false;
});
document.getElementById("note-close").addEventListener("click", function () {
    popup.hidden = true;
});
document.getElementById("save").addEventListener("click", function () {
    // Save note
    var subject = document.getElementById("subject").value;
    var content = document.getElementById("note").value;
    var note = {
        "content": content,
        "subject": subject
    };

    if (content != "") {
        addNote(note, getDate(setDate));
    }
});

// Add Memo Popup
document.getElementById("save-memo").addEventListener("click", function () {
    // Save note
    var memo = document.getElementById("memo-content").value;

    database.ref('calendar/' + uid + '/' + getDate(setDate) + '/memo').set(memo);
    memo_popup.hidden = true;
    fetchData(getDate(setDate))
});

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
    if (signin) {
        // Read data
        firebase.database().ref('calendar/' + uid + '/' + date).get().then((snapshot) => {
            if (snapshot.exists()) {
                showData(snapshot.val());
            } else {
                database.ref('calendar/' + uid + '/' + date).set({ memo: "", note: [], reminder: [] });
                fetchData(getDate(setDate));
            }
        }).catch((error) => {
            console.error(error);
        })
    }

}

function showData(json) {
    // Parse JSON Data
    notes.innerHTML = ''
    reminder.innerHTML = ''

    if (json.memo) {     /* json.memo is not null */
        memo.innerText = json.memo
        memo.classList += " active";
    } else {
        memo.innerText = "클릭하여 메모 추가"
        memo.className = "memo"
    }
    if (json.note) {     /* json.note is not null */
        var notes_list = json.note;
        notes_blank.hidden = true;
        for (var i = 0; i < notes_list.length; i++) {
            notes.innerHTML += '<div class="note_item"><div class="subject ' + notes_list[i].subject + '"></div><span class="content">' + notes_list[i].content + '</span></div>'
        }
    } else {
        notes_blank.hidden = false;
    }
    if (json.reminder) { /* json.reminder is not null */
        var reminder_list = json.reminder;
        for (var i = 0; i < reminder_list.length; i++) {
            reminder.innerHTML += '<li>' + reminder_list[i] + '</li>'
        }
    }
}

function addNote(note, date) {
    database.ref('calendar/' + uid + '/' + date + '/note').get().then((snapshot) => {
        if (snapshot.exists()) {
            var original = snapshot.val();
            original.push(note);
            database.ref('calendar/' + uid + '/' + date + '/note').set(original);
            document.getElementById("note-popup").hidden = true;
            fetchData(getDate(setDate));
        } else {
            database.ref('calendar/' + uid + '/' + date + '/note').set([note]);
            document.getElementById("note-popup").hidden = true;
            fetchData(getDate(setDate));
        }
    }).catch((error) => {
        console.error(error);
    })
}

document.getElementById("back").addEventListener("click", function() {
    setDate.setDate(setDate.getDate() -1);
    showDate();
    body.className = "body slideback"
    fetchData(getDate(setDate));
    setTimeout(() => {
        body.className = "body"
    }, 1000);
})

document.getElementById("forward").addEventListener("click", function() {
    setDate.setDate(setDate.getDate() +1);
    showDate();
    body.className = "body slideforward"
    fetchData(getDate(setDate));
    setTimeout(() => {
        body.className = "body"
    }, 1000);
})

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