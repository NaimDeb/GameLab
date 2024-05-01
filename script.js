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
    if (scrollActuel > 100) {
        header.classList.add(toggleClass)
        header.classList.remove(headerColor)
    }
    else {
        header.classList.remove(toggleClass)
        header.classList.add(headerColor)
    }
});


// Pop up lorsqu'on clique sur le bouton dans la section contact

const montrerPopUp = document.querySelector('.btnMail')
const popUpContainer = document.querySelector('.popup_container')
const fermerPopUp = document.querySelector('.btn_close')

montrerPopUp.onclick = () => {
    popUpContainer.classList.add('active')
}
fermerPopUp.onclick = () => {
    popUpContainer.classList.remove('active')
}

// Envoie une requête GET à l'URL de l'api pour récupérer des données
fetch("gameLab.json")

// On transforme la réponse en json
  .then(rep => {
    return rep.json();
  })


  // Appel a la fonction ajoutDonnees avec comme paramètre le contenu du json
  .then(data => {
    ajoutDonnees(data);
  });


// Fonction regroupant toutes les autres fonctions permettant d'injecter l'HTML
function ajoutDonnees(data) {

    addHero(data)
    addServices(data)
    addReal(data)
    addTemoignage(data)
    addPartenaires(data)


}

// Fonction injectant nomCommercial, phraseAccroche et texteCallToAction au hero
function addHero(data) {

        //Ajout des trois premiers éléments du json dans le hero
        let hero = document.querySelector("#hero_content")

        hero.innerHTML += 
        `
        <h1 class="h1color marginauto pixel">${data.nomCommercial}</h1>
        <h2 class="white josefin-sans-gras">${data.phraseAccroche}</h2>
        <div class="container">
        <!-- Bouton call to action -->
        <a href="" id="calltoaction" class="btn btn_hero vt323">${data.texteCallToAction}</a>
        </div>
        `

}

// Fonction injectant la liste beneficesClients dans l'html
function addServices(data){
    // variable pour compter si pair ou impair
    let dummy = 0

    let services = document.querySelector(".services")

    data.beneficesClients.forEach(element => {

        dummy++

        // Si dummy est impair, le texte sera a gauche, si il est pair, le texte sera a droite
        if (dummy%2 === 0) {
        services.innerHTML +=
            `<p class="service_right" data-aos="fade-right"data-aos-duration=1000>"${element}"</p>`
        } else {
        services.innerHTML +=
            `<p class="service_left" data-aos="fade-left" data-aos-duration=1000>"${element}"</p>`
        }

        
    });

}

// Fonction injectant la liste d'objets realisations dans la section Réalisations
function addReal(data) {

    let realisation = document.querySelector("#realisation_content")

    data.realisations.forEach(element => {

        realisation.innerHTML += 
        `
        <!-- Case réalisation -->
        <div class="real_case">

            <!-- Image de réalisation -->
            <img src="${element.image}" alt=""
            class="img_real">

            <!-- Div texte -->
            <div class="real_txt white ">
                <h3 class="josefin-sans-gras">${element.type}</h3>
                <div class="separateur_mini"></div>
                <p class="josefin-sans">${element.description}</p>
                <a href="" class="btn btn_mini"><i class="fa-solid fa-plus"></i></a>

            </div>
        </div>
        <!-- Case réalisation Fin -->
        `
        
    });

}

// Fonction injectant la liste d'objets temoignagesClients dans l'html

function addTemoignage(data){
    // variable pour compter si pair ou impair
    let dummy = 0

    let temoignage = document.querySelector(".section_temoignage")

    data.temoignagesClients.forEach(element => {
    
        let star_rating = ""
        star_rating = ecrireStarRating(element.note)



        // On met le texte de la carte dans une variable pour ne pas la répéter dans le if
        let temoignage_txt = "" 
        temoignage_txt = 
        `
        <!-- Texte témoignage -->
        <div class="txt_temoignage">
            <p class="prenom_temoignage josefin-sans-gras">${element.prenom}</p>
            <p class="typePres_temoignage josefin-sans-gras">${element.typePrestation}</p>
            <p class="commentaire_temoignage josefin-sans">${element.commentaire}</p>
        </div>
        

        <!-- Témoignage star rating -->
        <div class="rating_temoignage flex" id="star_rating_content">
            ${star_rating}
        </div>
        `

        



        dummy++
        // Si dummy est impair, le texte sera a gauche, si il est pair, le texte sera a droite
        if (dummy%2 === 0) {
            temoignage.innerHTML +=
            `
            <!-- Témoignage Carte droite -->
            <div class="flex temoignage_div">

                
                <div class="carte_temoignage carte_temoignage_right flex" data-aos="fade-up-left">

                    <!-- Image client -->
                    <div class="img_client_placeholder img_client_right">${retournePremiereLettre(element.prenom)}</div>

                    ${temoignage_txt}

                    </div>
                </div>
            </div>
            `



        } else {
            temoignage.innerHTML +=
            `
            <!-- Témoignage Carte gauche -->
            <div class="flex temoignage_div">

            
                <div class="carte_temoignage flex" data-aos="fade-up-right">

                    <!-- Image client -->
                    <div class="img_client_placeholder img_client_left">C</div>

                    ${temoignage_txt}

                </div>
            </div>
            `
        }

        
    });

}

// Fonction injectant la liste d'image partenaires (que j'ai ajouté moi même au json) dans la section partenaires
function addPartenaires(data){

    let partenaires = document.querySelector("#partenaires_content")

    data.imagesPartenaires.forEach(element => {
        
    
    partenaires.innerHTML += 
    `
    <img src="${element}" 
    class="partenaire_img">
    `
    });
}

//Simple fonction retournant la première lettre d'une donnée (utilisée pour recevoir la première lettre du prénom)
function retournePremiereLettre(donnee){
    return donnee[0]
}

// Fonction qui retournera le texte a mettre dans le star rating (merci yanis pour le code)
function ecrireStarRating(donnee){

    let final = ""
    // Une première boucle pour ajouter les étoiles remplies, puis une autre boucle allant jusqu'a (5 - la note) pour ajouter les étoiles vides
    for (let i = 0; i < donnee; i++){

        final += `<p class="star">★</p>`

    }
    for (let i = 0; i < 5 - donnee; i++){

        final += `<p class="star">☆</p>`

    }


    return final
    }