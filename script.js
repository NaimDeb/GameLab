// Initiation pour le script AOS
AOS.init();


// Intégration Map Leaflet

var map = L.map('map').setView([45.429359, 4.40946], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([45.429359, 4.40946]).addTo(map)
    .bindPopup(`
    <h2 class="map_h2">Gamelab Saint-Etienne</h2>
    <p class="map_p">7 Rue Terrenoire, 42100</p>
    `)
    .openPopup();

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


