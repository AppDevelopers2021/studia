///////////////////////////////////////////////////////////////////////
// 𝓼𝓽𝓾𝓭𝓲𝓪 // The Best Way to Organize Your Notes. ////////////////////
///////////////////////////////////////////////////////////////////////
// Copyright (c) 2021 App Developers. All Rights Reserved. ////////////
///////////////////////////////////////////////////////////////////////

// Warn message in console
console.log("%cstudia\n%cThe Best Way to Organize Your Notes.", "font-family:'Courgette', cursive;color:#2291FF;font-size:40px;", "font-family:Arial;font-size:13px;color:#333;")
console.log("%c주의: 여기에 코드를 입력하면 해커가 Self-XSS라는 공격을 이용해 계정 비밀번호를 유출시킬 수 있습니다. 알지 못하는 코드를 입력하지 마세요.", "font-family:Arial;color:red;font-size:15px;")

const hamburger = document.getElementsByClassName("nav_hamburger")[0];
const navbar = document.getElementById("navbar");
const sidenav = document.getElementById("sidenav");
const close_nav_button = document.getElementById("close_nav");
const contextmenu = document.getElementById("contextmenu");
const contextmenu_edit = document.getElementById("context_menu_edit");
const contextmenu_copy = document.getElementById("context_menu_copy");
const contextmenu_delete = document.getElementById("context_menu_delete");
const blur_bg = document.getElementById("blur_bg");

const login_modal = document.getElementsByClassName("login_popup")[0];
const login_button = document.getElementById("login_button");
const login_google = document.getElementById("login_with_google");

const add_note_button = document.getElementsByClassName("add_note");
const add_note_modal = document.getElementsByClassName("add_note_popup")[0];
const add_note_text = document.getElementById("add_note_text");
const add_note_subject = document.getElementById("add_note_subject");
const add_note_submit = document.getElementById("add_note_submit");

const edit_note_button = document.getElementsByClassName("edit_note");
const edit_note_modal = document.getElementsByClassName("edit_note_popup")[0];
const edit_note_text = document.getElementById("edit_note_text");
const edit_note_subject = document.getElementById("edit_note_subject");
const edit_note_submit = document.getElementById("edit_note_submit");

const add_memo_button = document.getElementsByClassName("add_memo");
const add_memo_modal = document.getElementsByClassName("add_memo_popup")[0];
const add_memo_textarea = document.getElementById("add_memo_text");
const add_memo_submit = document.getElementById("add_memo_submit");

const add_reminder_button = document.getElementsByClassName("add_reminder");
const add_reminder_modal = document.getElementsByClassName("add_reminder_popup")[0];
const add_reminder_textarea = document.getElementById("add_reminder_text");
const add_reminder_submit = document.getElementById("add_reminder_submit");

const date_forward_button = document.getElementById("date_forward");
const date_backward_button = document.getElementById("date_back");

var database = firebase.database();
var selectedIdx;

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
var date_picker = new Pikaday({
    field: field,
    format: "YYYY/MM/DD",
    onSelect: () => {
        load()
    }
});
date_picker.setDate(new Date())

// console.log(date_picker.toString('YYYYMMDD'))

// SwiperJS
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal', // Swipe direction
    loop: true, // Infinite swiping
    simulateTouch: false, // Disable drag

    // Event handlers
    on: {
        slideChangeTransitionStart: (swiper) => {
            if (swiper.touches.diff < 0) {
                changeDate(true);
            } else if (swiper.touches.diff > 0) {
                changeDate(false);
            }
        }
    }
});

// Detect If User is Signed In
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User already signed in
        // Load calendar data
        load();
    } else {
        // User needs login
        // Show login modal
        blur_bg.className = "blur_filter blur";
        login_modal.className = "login_popup open";
    }
});

// Event listeners for login
login_button.addEventListener("click", function () {
    const email = document.getElementById("login_id");
    const password = document.getElementById("login_pw");
    const isPersistenceSet = document.getElementById("login_keep").checked;
    const loader = document.getElementById("login_loader");

    loader.classList.add("loading")

    function shakeInput(elem) {
        elem.classList.add("login_error");
    }

    if (isPersistenceSet) {
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
                        login_modal.className = "login_popup closed";
                        load();
                    })
                    .catch((error) => {
                        // Error while login
                        loader.classList.remove("loading");
                        switch (error.code) {
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
                        login_modal.className = "login_popup closed";
                        load;
                    })
                    .catch((error) => {
                        // Error while login
                        loader.classList.remove("loading");
                        switch (error.code) {
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
login_google.addEventListener("click", function () {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(() => {
            // Signed in successfully
            console.log("Logged in successfully.")
            blur_bg.className = "blur_filter";
            login_modal.className = "login_popup closed";
            load();
        }).catch((error) => {
            console.error(`Error while Google Auth :: ${error.code} : ${error.message}`);
        })
})

// Change date when swipe
function changeDate(isSwipeDirectionRight) {
    var temp_date = new Date(date_picker.toString('YYYY-MM-DD'));

    if (isSwipeDirectionRight) {
        // Mode to tomorrow
        temp_date.setDate(temp_date.getDate() + 1);
        date_picker.setDate(temp_date);
    } else {
        // Move to yesterday
        temp_date.setDate(temp_date.getDate() - 1);
        date_picker.setDate(temp_date);
    }
}

// When date change button is pressed
date_forward_button.addEventListener("click", () => {
    swiper.touches.diff = 0;
    swiper.slideNext();
    changeDate(true);
});
date_backward_button.addEventListener("click", () => {
    swiper.touches.diff = 0;
    swiper.slidePrev();
    changeDate(false);
});

// Parse JSON input and display
function parseJSON(json) {
    //console.log(json)
    var memo_content = document.getElementsByClassName("memo_content");
    i
    var reminder_content = document.getElementsByClassName("reminder_content");
    var note_container_list = document.getElementsByClassName("notes_container");

    // Write to memo
    if (json.memo) {
        for (var i = 0; i < memo_content.length; i++) {
            memo_content[i].innerText = json.memo;
        }
    } else {
        for (var i = 0; i < memo_content.length; i++) {
            memo_content[i].innerText = "";
        }
    }

    // Write to reminder
    if (json.reminder) {
        for (var i = 0; i < reminder_content.length; i++) {
            reminder_content[i].innerHTML = "";
            for (var j = 0; j < json.reminder.length; j++) {
                reminder_content[i].innerHTML += "<li class='reminder_elem'></li>";
                var reminder_li = reminder_content[i].getElementsByClassName("reminder_elem");
                reminder_li[reminder_li.length - 1].innerText = json.reminder[j];
            }
        }
    } else {
        for (var i = 0; i < reminder_content.length; i++) {
            reminder_content[i].innerHTML = "";
        }
    }

    // Write to notes
    for (var i = 0; i < note_container_list.length; i++) {
        var note_container = note_container_list[i];
        var notes_to_insert = json.note;
        note_container.innerHTML = ""

        if ((notes_to_insert) && (notes_to_insert.length > 0)) {
            // Note Exists
            for (var j = 0; j < notes_to_insert.length; j++) {
                // Insert Note
                var note_item = note_container.getElementsByClassName('note_item');
                var note_profile = note_container.getElementsByClassName('note_profile');
                var note_content = note_container.getElementsByClassName('note_content');
                var note_more = note_container.getElementsByClassName('note_more');
                note_container.innerHTML += '<div class="note_item"><div class="note_profile"></div><p class="note_content"></p><button class="note_more"><i class="fas fa-ellipsis-v"></i></button></div>';
                note_profile[note_profile.length - 1].innerText = notes_to_insert[j].subject;
                note_profile[note_profile.length - 1].setAttribute("data-subject", notes_to_insert[j].subject)
                note_content[note_content.length - 1].innerText = notes_to_insert[j].content;
                note_item[note_content.length - 1].setAttribute("data-index", j)
            }
        }
    }

    // Add Event Listener
    var note_more = document.getElementsByClassName("note_more");
    var note_item = document.getElementsByClassName("note_item");
    for (var i = 0; i < note_more.length; i++) {
        note_more[i].addEventListener('click', function (event) {
            contextmenu.hidden = false;
            contextmenu.style.top = event.currentTarget.getBoundingClientRect().top + 'px';
            contextmenu.style.left = (event.currentTarget.getBoundingClientRect().left - 130) + 'px';
            contextmenu.style.right = "auto";
            selectedIdx = event.currentTarget.parentElement.getAttribute("data-index");
        });
    }
    for (var i = 0; i < note_item.length; i++) {
        note_item[i].addEventListener('contextmenu', function (event) {
            event.preventDefault();
            contextmenu.hidden = false;
            contextmenu.style.top = event.pageY + 'px';
            contextmenu.style.right = (window.innerWidth - event.pageX - 130) + 'px';
            contextmenu.style.left = "auto";
            selectedIdx = event.currentTarget.getAttribute("data-index");
        }, false);
    }
}

// Retrieve data from DB
function load() {
    if (firebase.auth().currentUser) {
        var date = date_picker.toString("YYYYMMDD");
        var uid = firebase.auth().currentUser.uid;

        database.ref('calendar/' + uid + '/' + date).get().then((snapshot) => {
            if (snapshot.exists()) {
                parseJSON(snapshot.val());
            } else {
                // Show empty screen
                parseJSON({});
            }
        }).catch((error) => {
            console.error(`Error while fetching data :: ${error.code} : ${error.message}`);
        })
    }
}

// Close popup when blur is clicked
blur_bg.addEventListener("click", function (e) {
    e.preventDefault();

    // Only when logged in
    if (firebase.auth().currentUser) {
        // Un-Blur
        blur_bg.className = "blur_filter";

        // Close Modal
        add_note_modal.className = "add_note_popup closed";
        add_memo_modal.className = "add_memo_popup closed";
        add_reminder_modal.className = "add_reminder_popup closed";
        edit_note_modal.className = "edit_note_popup closed";
    }

})

// Add note popup
for (var i = 0; i < add_note_button.length; i++) {
    add_note_button[i].addEventListener("click", function () {
        blur_bg.className = "blur_filter blur";
        add_note_modal.className = "add_note_popup open";
    })
}

// Add memo popup
for (var i = 0; i < add_note_button.length; i++) {
    add_memo_button[i].addEventListener("click", function () {
        blur_bg.className = "blur_filter blur";
        add_memo_modal.className = "add_memo_popup open"

        // Set value
        add_memo_textarea.value = document.getElementsByClassName("memo_content")[0].innerText;
    })
}

// Add reminder popup
for (var i = 0; i < add_reminder_button.length; i++) {
    add_reminder_button[i].addEventListener("click", function () {
        blur_bg.className = "blur_filter blur";
        add_reminder_modal.className = "add_reminder_popup open"

        // Set value
        add_reminder_textarea.value = document.getElementsByClassName("reminder_content")[0].innerText;
    })
}

// Add note
add_note_submit.addEventListener("click", function () {
    // Get original data
    var date = date_picker.toString("YYYYMMDD");
    var uid = firebase.auth().currentUser.uid;

    database.ref('calendar/' + uid + '/' + date + '/note').get().then((snapshot) => {
        if (snapshot.exists()) {
            var original = snapshot.val();
            original.push({
                content: add_note_text.value,
                subject: add_note_subject.value
            })

            // Submit
            database.ref('calendar/' + uid + '/' + date + '/note').set(original).then(() => {
                load();

                blur_bg.className = "blur_filter"
                add_note_modal.className = "add_note_popup closed"
            }).catch((error) => {
                console.error(`Error while adding note (setData) :: ${error.code} : ${error.message}`);
            })
        } else {
            // DB is empty
            database.ref('calendar/' + uid + '/' + date + '/note').set([{
                content: add_note_text.value,
                subject: add_note_subject.value
            }]).then(() => {
                load();

                blur_bg.className = "blur_filter"
                add_note_modal.className = "add_note_popup closed"
            }).catch((error) => {
                console.error(`Error while adding note (setData) :: ${error.code} : ${error.message}`);
            })
        }
    }).catch((error) => {
        console.error(`Error while adding note (fetchData) :: ${error.code} : ${error.message}`);
    })
})

// Edit note
edit_note_submit.addEventListener("click", function () {
    var uid = firebase.auth().currentUser.uid;
    var date = date_picker.toString("YYYYMMDD");

    var subject = edit_note_subject.value;
    var content = edit_note_text.value;

    database.ref('calendar/' + uid + '/' + date + '/note/' + selectedIdx).set({'subject': subject, 'content': content}).then(() => {
        load();

        blur_bg.className = "blur_filter";
        edit_note_modal.className = "edit_note_popup closed";
    }).catch((error) => {
        console.error(`Error while editing note (setData) :: ${error.code} : ${error.message}`);
    });
});

// Add memo
add_memo_submit.addEventListener("click", function () {
    var date = date_picker.toString("YYYYMMDD");
    var uid = firebase.auth().currentUser.uid;

    database.ref('calendar/' + uid + '/' + date + '/memo').set(add_memo_textarea.value).then(() => {
        load();

        blur_bg.className = "blur_filter";
        add_memo_modal.className = "add_note_popup closed";
    }).catch((error) => {
        console.error(`Error while adding memo (addData) :: ${error.code} : ${error.message}`);
    })
})

// Add reminder
add_reminder_submit.addEventListener("click", function () {
    var date = date_picker.toString("YYYYMMDD");
    var uid = firebase.auth().currentUser.uid;

    database.ref('calendar/' + uid + '/' + date + '/reminder').set(add_reminder_textarea.value.split('\n')).then(() => {
        load();

        blur_bg.className = "blur_filter"
        add_reminder_modal.className = "add_note_popup closed"
    }).catch((error) => {
        console.error(`Error while adding reminder (addData) :: ${error.code} : ${error.message}`);
    })
})

// Context Menu
contextmenu_edit.addEventListener("click", function () {
    // Open Edit Popup
    blur_bg.className = "blur_filter blur";
    edit_note_modal.className = "edit_note_popup open";

    // Set default value
    edit_note_text.value = document.getElementsByClassName("notes_container")[0].getElementsByClassName("note_content")[selectedIdx].innerText;
    edit_note_subject.value = document.getElementsByClassName("notes_container")[0].getElementsByClassName("note_profile")[selectedIdx].innerText;
});

contextmenu_copy.addEventListener("click", function () {
    navigator.clipboard.writeText(document.getElementsByClassName("notes_container")[0].getElementsByClassName("note_content")[selectedIdx].innerText);
});

contextmenu_delete.addEventListener("click", function () {
    if(confirm("삭제하시겠습니까?")) {
        // Retrive Data from DB
        database.ref('calendar/' + firebase.auth().currentUser.uid + '/' + date_picker.toString("YYYYMMDD") + '/note').get().then((snapshot) => {
            var originalData = snapshot.val();
            originalData.splice(selectedIdx, 1);
            database.ref('calendar/' + firebase.auth().currentUser.uid + '/' + date_picker.toString("YYYYMMDD") + '/note').set(originalData).then(() => {
                load();
            }).catch((error) => {
                console.error(`Error while deleting note (setData) :: ${error.code} : ${error.message}`);
            });
        }).catch((error) => {
            console.error(`Error while deleting note (fetchData) :: ${error.code} : ${error.message}`);
        });
    }
})

document.addEventListener("click", function (event) {
    if (!(event.target == contextmenu || event.target.className == "note_more" || event.target.className == "fas fa-ellipsis-v")) {
        contextmenu.hidden = true;
    }
});