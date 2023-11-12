fetch('https://studia-kr.web.app/sidebar.html')
.then(res => res.text())
.then(text => {
    let oldElem = document.getElementById('replace_sidebar');
    let newElem = document.createElement('div');
    newElem.innerHTML = text;
    oldElem.parentNode.replaceChild(newElem, oldElem);
})