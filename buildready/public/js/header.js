const menuBtn = document.getElementById('open-menu');
const mobileMenu = document.getElementById('global-header');
const closeBtn = document.getElementById('close-menu');
const openBtn = document.getElementById('menuIcon');
const menus = document.getElementById('list');
const sections = document.querySelectorAll("section");
const logo = document.getElementById('logo');
const menuLogo = menuBtn.querySelectorAll('img');
const links = document.querySelectorAll("#list a");
const currentPath = window.location.pathname;
const footernav = document.querySelectorAll(".footer-nav a");
const footerlink = document.querySelectorAll(".footer-info a");

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('nav-mobile');
    menus.classList.toggle('block');
    closeBtn.classList.toggle('block');
    openBtn.classList.toggle('hidden');
    menuBtn.classList.toggle('bg-transparent');
    if (currentPath === "/" || currentPath.endsWith("/index.html") || currentPath == '/public/') logo.classList.toggle('mobile-logo');
    menuLogo.forEach(logo => logo.classList.toggle('filter-none'));
});

const path = window.location.pathname;

let basePath = "../"; 
if (!(path.includes("/projects/view") || path.includes("/properties/view") || path.includes("/articles/view"))) {
    links.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname; 
    
        if (linkPath === currentPath) {
            link.classList.add("active-nav");
        } else {
            link.classList.remove("active-nav");
        }
    });
    
    footernav.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
    
        if (linkPath === currentPath) {
            link.classList.add("active-link");
        } else {
            link.classList.remove("active-link");
        }
    });
    
    footerlink.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
    
        if (linkPath === currentPath) {
            link.classList.add("text-black");
        } else {
            link.classList.remove("text-black");
        }
    });
}
    