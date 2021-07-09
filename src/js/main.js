var $btn_hmbg = document.querySelector('.menu-btn');
var $nav = document.getElementById('nav');

$btn_hmbg.addEventListener('click', () => {
    $nav.classList.toggle('open');
    $btn_hmbg.classList.toggle('open');
})

