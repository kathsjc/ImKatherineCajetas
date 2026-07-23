const menuBtn = document.getElementById('open-menu');
const mobileMenu = document.getElementById('header');
const closeBtn = document.getElementById('close-menu');
const openBtn = document.getElementById('menuIcon');
const menus = document.getElementById('list');
const navInfo = document.getElementById('nav-info');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('nav-mobile');
    menus.classList.toggle('block');
    closeBtn.classList.toggle('block');
    openBtn.classList.toggle('hidden');
    navInfo.classList.toggle('block');
});