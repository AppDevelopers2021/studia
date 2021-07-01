// JS 코드는 추가해도 좋습니다.
const popup = document.getElementsByClassName("popup")[0];
var database = firebase.database();
var uid;
var signin;
var setDate = new Date();

document.getElementsByClassName('hamburger')[0].addEventListener("click", function () {
    document.getElementsByClassName('sidenav')[0].style.width = "250px";
});

document.getElementsByClassName('close_nav')[0].addEventListener("click", function () {
    document.getElementsByClassName('sidenav')[0].style.width = "0"
});

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
        // User is signed in
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
            database.ref('calendar/' + uid).set({});
            console.log("done.");
        }
    }).catch((error) => {
        console.error(error);
    })
}

function addNote(note) {
    console.log(fetchData(setDate))
}