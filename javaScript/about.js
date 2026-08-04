const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".Header nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}