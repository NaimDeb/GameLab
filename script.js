// Initiation pour le script AOS
AOS.init();

//Changement du bg color du header quand on scroll
// Event listener au scroll qui ajoute la classe toggleClass a partir d'un seuil de scroll
// Aidé avec https://webdesign.tutsplus.com/create-an-animated-sticky-header-on-scroll-with-a-bit-of-javascript--cms-93428t
const header = document.querySelector(".header")
const toggleClass = "toggleHeader";
const headerColor = "header_color";

window.addEventListener("scroll", () => {
    const scrollActuel = window.scrollY;
    if (scrollActuel > 250) {
        header.classList.add(toggleClass)
        header.classList.remove(headerColor)
    }
    else {
        header.classList.remove(toggleClass)
        header.classList.add(headerColor)
    }
});