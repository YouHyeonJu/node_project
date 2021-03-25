const toggleBtn = document.querySelector('.navbar_toogleBtn');
const menu = document.querySelector('.navbar_menu');

toggleBtn.addEventListener('click', function () {
        menu.classList.toggle('active');
    });