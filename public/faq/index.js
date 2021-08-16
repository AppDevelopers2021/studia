document.getElementsByClassName('hamburger')[0].addEventListener("click", function () {
    document.getElementsByClassName('sidenav')[0].style.width = "250px";
});

document.getElementsByClassName('close_nav')[0].addEventListener("click", function () {
    document.getElementsByClassName('sidenav')[0].style.width = "0"
});

// For Accordion
var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

// Open accordion in #
if (window.location.hash) {
    // Anchor Used!
    var hash = window.location.hash.substring(1);
    if (document.getElementById(hash)) {
        // Anchor found
        document.getElementById(hash).classList.toggle("active")
        var panel = document.getElementById(hash).nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }
}