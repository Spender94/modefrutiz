
// Fonction pour gérer l'expansion de la fiche
document.getElementById("expand-btn").addEventListener("click", function () {
    var expandedSection = document.getElementById("fiche-expanded-section");
    var ficheContainer = document.getElementById("fiche-container");

    if (expandedSection.style.display === "none" || expandedSection.style.display === "") {
        expandedSection.style.display = "block";
        ficheContainer.style.height = "auto"; // Permet à la fiche de s'étendre en hauteur

        // Simuler un clic sur l'onglet "frutiz" pour afficher son contenu par défaut
        document.getElementById("frutiz-btn").click();
    } else {
        expandedSection.style.display = "none";
        ficheContainer.style.height = "auto"; // Revient à la hauteur de base
    }
});

// Fonction pour gérer les onglets de la fiche
function openTab(event, tabId) {
    var i, tabContent, tabButtons;

    // Cacher tous les contenus des onglets
    tabContent = document.getElementsByClassName("fiche-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Retirer la classe "active" de tous les boutons des onglets
    tabButtons = document.getElementsByClassName("fiche-menu-btn");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    // Afficher le contenu de l'onglet cliqué et ajouter la classe "active" au bouton cliqué
    document.getElementById(tabId).style.display = "block";
    event.currentTarget.className += " active";
}

// Ajouter des événements pour chaque bouton d'onglet de la fiche
document.getElementById("frutiz-btn").addEventListener("click", function (event) {
    openTab(event, "frutiz-section");
});

document.getElementById("perso-btn").addEventListener("click", function (event) {
    openTab(event, "perso-section");
});

document.getElementById("scores-btn").addEventListener("click", function (event) {
    openTab(event, "scores-section");
});

document.getElementById("bonus-btn").addEventListener("click", function (event) {
    openTab(event, "bonus-section");
});

// Sélectionner tous les boutons du menu fiche
const ficheMenuButtons = document.querySelectorAll('.fiche-menu-btn');

// Fonction pour rendre un bouton actif
function setActiveButton(button) {
    // Supprime la classe active de tous les boutons
    ficheMenuButtons.forEach(btn => btn.classList.remove('active'));

    // Ajoute la classe active au bouton cliqué
    button.classList.add('active');
}

// Attacher l'événement de clic à chaque bouton pour gérer l'état actif
ficheMenuButtons.forEach(button => {
    button.addEventListener('click', function() {
        setActiveButton(button);
    });
});

// Fonction pour le drag & drop de la fiche utilisateur
function makeDraggable(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = function(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Appliquer la fonction de drag & drop à la fiche utilisateur
makeDraggable(document.getElementById("fiche-container"));

// Fonction pour animer l'icône "Jeux" au survol
function animateJeuxIcon() {
    var icon = document.getElementById("jeux-icon");
    var frame = 1;
    var totalFrames = 15;

    function nextFrame() {
        if (frame <= totalFrames) {
            icon.src = `assets/icone_pack_frusion_disc_${frame}.svg`;
            frame++;
            setTimeout(nextFrame, 15); // Ajustez la vitesse de l'animation ici
        }
    }

    nextFrame();
}

// Réinitialiser l'icône "Jeux" à la première frame lorsqu'on retire le curseur
function resetJeuxIcon() {
    var icon = document.getElementById("jeux-icon");
    icon.src = "assets/icone_pack_frusion_disc_1.svg"; // Réinitialiser à la première image
}

document.getElementById("jeux-icon").addEventListener("mouseover", animateJeuxIcon);
document.getElementById("jeux-icon").addEventListener("mouseout", resetJeuxIcon);

// Fonction pour fermer la fiche utilisateur
document.getElementById("close-btn").addEventListener("click", function () {
    document.getElementById("fiche-container").style.display = "none";
});

// Fonction pour animer l'icône "Messagerie" au survol
function animateMailIcon() {
    var icon = document.getElementById("mail-icon");
    var frame = 1;
    var totalFrames = 15;

    function nextFrame() {
        if (frame <= totalFrames) {
            icon.src = `assets/icone_mail_${frame}.svg`;
            frame++;
            setTimeout(nextFrame, 15); // Ajustez la vitesse de l'animation ici
        }
    }

    nextFrame();
}

// Réinitialiser l'icône "Messagerie" à la première frame lorsqu'on retire le curseur
function resetMailIcon() {
    var icon = document.getElementById("mail-icon");
    icon.src = "assets/icone_mail_1.svg"; // Réinitialiser à la première image
}

document.getElementById("mail-icon").addEventListener("mouseover", animateMailIcon);
document.getElementById("mail-icon").addEventListener("mouseout", resetMailIcon);


// Ouverture et fermeture de la fenêtre de scores
document.querySelector('.desktop-icon img[alt="Scores Icon"]').addEventListener("click", function() {
    var scoresWindow = document.getElementById("scores-window");
    var existingTab = document.getElementById("scores-window-tab");

    // Si la fenêtre est déjà réduite, réouvrir à partir de l'onglet
    if (existingTab) {
        scoresWindow.style.display = "block";
        existingTab.remove();
    } else {
        scoresWindow.style.display = "block";
    }
});

document.getElementById("close-scores-btn").addEventListener("click", function() {
    document.getElementById("scores-window").style.display = "none";
});

// Fonction pour rendre la fenêtre de scores déplaçable
makeDraggable(document.getElementById("scores-window"));

function createMinimizedTab(windowId, title, iconSrc) {
    const dynamicTabsContainer = document.getElementById("dynamic-tabs");

    // Vérifiez si l'onglet existe déjà
    if (document.getElementById(`${windowId}-tab`)) {
        console.log("Onglet déjà existant, pas besoin d'en créer un nouveau");
        return;
    }

    const newTab = document.createElement("div");
    newTab.className = "dynamic-tab";
    newTab.id = `${windowId}-tab`;

    const icon = document.createElement("img");
    icon.src = iconSrc; // Utilisez l'icône passée en paramètre
    icon.alt = `${title} Icon`;

    const text = document.createElement("span");
    text.textContent = title;

    newTab.appendChild(icon);
    newTab.appendChild(text);

    newTab.addEventListener("click", function () {
        // Réaffiche la fenêtre et supprime l'onglet
        document.getElementById(windowId).style.display = "block";
        dynamicTabsContainer.removeChild(newTab);
    });

    dynamicTabsContainer.appendChild(newTab);
}


// Exemple d'utilisation pour minimiser la fenêtre "Scores"
document.getElementById("minimize-scores-btn").addEventListener("click", function() {
    const scoresWindow = document.getElementById("scores-window");

    // Vérifiez si l'onglet est déjà présent avant de minimiser
    if (!document.getElementById("scores-window-tab")) {
        scoresWindow.style.display = "none";
        createMinimizedTab("scores-window", "Scores");
    } else {
        scoresWindow.style.display = "none";
    }
});

const rowsPerPage = 10; // Nombre de lignes à afficher par page
let currentPage = 1;

function displayTablePage(page) {
    const table = document.getElementById("scores-table");
    const rows = table.getElementsByTagName("tr");
    const totalPages = Math.ceil((rows.length - 1) / rowsPerPage);

    // Cacher toutes les lignes
    for (let i = 1; i < rows.length; i++) {
        rows[i].style.display = "none";
    }

    // Afficher les lignes correspondant à la page actuelle
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage + 1;
    for (let i = start; i < end && i < rows.length; i++) {
        rows[i].style.display = "table-row";
    }

    // Activer/désactiver les boutons de pagination
    document.getElementById("prev-page").disabled = page === 1;
    document.getElementById("next-page").disabled = page === totalPages;
}

document.getElementById("prev-page").addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        displayTablePage(currentPage);
    }
});

document.getElementById("next-page").addEventListener("click", function () {
    const table = document.getElementById("scores-table");
    const rows = table.getElementsByTagName("tr");
    const totalPages = Math.ceil((rows.length - 1) / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayTablePage(currentPage);
    }
});

// Afficher la première page lors du chargement
displayTablePage(1);

// Fonction pour rendre un élément déplaçable
function makeIconDraggable(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = function(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Appliquer la fonction de drag & drop à chaque icône du bureau
makeIconDraggable(document.getElementById("mail-icon-container"));
makeIconDraggable(document.getElementById("forum-icon-container"));
makeIconDraggable(document.getElementById("liste-noire-icon-container"));
makeIconDraggable(document.getElementById("scores-icon-container"));
makeIconDraggable(document.getElementById("salons-icon-container"));
makeIconDraggable(document.getElementById("corbeille-icon-container"));
makeIconDraggable(document.getElementById("inventaire-icon-container"));
makeIconDraggable(document.getElementById("boutique-icon-container"));
makeIconDraggable(document.getElementById("jeux-icon-container"));
// Répétez l'appel pour chaque icône

// Fonction pour gérer l'ouverture et la fermeture de la fiche utilisateur
document.getElementById("avatar-container").addEventListener("click", function () {
    var ficheContainer = document.getElementById("fiche-container");

    // Vérifiez si la fiche est déjà ouverte
    if (ficheContainer.style.display === "none" || ficheContainer.style.display === "") {
        ficheContainer.style.display = "block"; // Ouvre la fiche utilisateur
    } else {
        ficheContainer.style.display = "none"; // Ferme la fiche utilisateur si elle est déjà ouverte
    }
});

// Fonction pour fermer la fiche utilisateur avec le bouton close
document.getElementById("close-btn").addEventListener("click", function () {
    document.getElementById("fiche-container").style.display = "none";
});

let zIndexCounter = 3; // Initialisation du compteur de z-index

function bringToFront(element) {
    zIndexCounter += 1;
    element.style.zIndex = zIndexCounter; // Incrémente le z-index de la fenêtre cliquée
}

// Appliquer à chaque fenêtre existante
document.querySelectorAll('.window').forEach(window => {
    window.addEventListener("mousedown", function() {
        bringToFront(window);
    });
});

// Par exemple, pour la fenêtre des scores
const scoresWindow = document.getElementById("scores-window");
scoresWindow.addEventListener("mousedown", function() {
    bringToFront(scoresWindow);
});

// Par exemple, pour la fiche utilisateur
const ficheContainer = document.getElementById("fiche-container");
ficheContainer.addEventListener("mousedown", function() {
    bringToFront(ficheContainer);
});

// Fonction pour ouvrir la fenêtre des salons
document.querySelector('.desktop-icon img[alt="Les Salons Icon"]').addEventListener("click", function() {
    var salonsWindow = document.getElementById("salons-window");
    salonsWindow.style.display = "block";
});

// Fonction pour fermer la fenêtre des salons
document.getElementById("close-salons-btn").addEventListener("click", function() {
    document.getElementById("salons-window").style.display = "none";
});

// Fonction pour minimiser la fenêtre des salons (similaire à scores)
document.getElementById("minimize-salons-btn").addEventListener("click", function() {
    const salonsWindow = document.getElementById("salons-window");
    salonsWindow.style.display = "none";
    createMinimizedTab("salons-window", "Salons");
});

// Fonction pour rendre la fenêtre de salons déplaçable
makeDraggable(document.getElementById("salons-window"));

// Fonction pour minimiser la fenêtre de salons
document.getElementById("minimize-salons-btn").addEventListener("click", function() {
    const salonsWindow = document.getElementById("salons-window");

    // Vérifiez si l'onglet est déjà présent avant de minimiser
    if (!document.getElementById("salons-window-tab")) {
        salonsWindow.style.display = "none";
        createMinimizedTab("salons-window", "Salons");
    } else {
        salonsWindow.style.display = "none";
    }
});

// Rendre la fenêtre de scores déplaçable
makeDraggable(document.getElementById("scores-window"));

// Fonction pour créer un onglet minimisé
function createMinimizedTab(windowId, title) {
    const dynamicTabsContainer = document.getElementById("dynamic-tabs");

    // Vérifiez si l'onglet existe déjà
    if (document.getElementById(`${windowId}-tab`)) {
        console.log("Onglet déjà existant, pas besoin d'en créer un nouveau");
        return;
    }

    const newTab = document.createElement("div");
    newTab.className = "dynamic-tab";
    newTab.id = `${windowId}-tab`;

    const icon = document.createElement("img");
    icon.src = "assets/scores_favicon.svg"; // Changez cette icône en fonction de la fenêtre
    icon.alt = `${title} Icon`;

    const text = document.createElement("span");
    text.textContent = title;

    newTab.appendChild(icon);
    newTab.appendChild(text);

    newTab.addEventListener("click", function() {
        // Réaffiche la fenêtre et supprime l'onglet
        document.getElementById(windowId).style.display = "block";
        dynamicTabsContainer.removeChild(newTab);
    });

    dynamicTabsContainer.appendChild(newTab);
}



// Réinitialiser le z-index de toutes les fenêtres au chargement
function resetWindowsZIndex() {
    document.querySelectorAll('.window').forEach(window => {
        window.style.zIndex = '1'; // ou une valeur de base de votre choix
    });
    zIndexCounter = 10; // Réinitialiser pour un meilleur contrôle
}

// Initialiser l'application des événements
resetWindowsZIndex();
applyBringToFront();

// Sélectionner les éléments à déplacer
const contactsTab = document.getElementById('contacts-tab');
const contactsBar = document.getElementById('contacts-bar');
const avatarContainer = document.getElementById('avatar-container');
const levelBar = document.getElementById('level-bar');
const emoteContainer = document.getElementById('emote-container');
const tabsContainer = document.getElementById('tabs-container');
const desktopArea = document.getElementById('desktop-area'); // Sélection du bureau

// Appliquer le décalage initial de 10px à l'ouverture de la page
avatarContainer.classList.add('shift-right');
levelBar.classList.add('shift-right');
emoteContainer.classList.add('shift-right');
tabsContainer.classList.add('shift-right');
desktopArea.classList.add('shift-right');

// Fonction pour basculer l'ouverture de la barre des contacts
contactsTab.addEventListener('click', () => {
    contactsBar.classList.toggle('open');

    if (contactsBar.classList.contains('open')) {
        // Déplace les éléments ciblés de 132px
        avatarContainer.style.transform = 'translateX(132px)';
        levelBar.style.transform = 'translateX(132px)';
        emoteContainer.style.transform = 'translateX(132px)';
        tabsContainer.style.transform = 'translateX(132px)';
        contactsTab.style.transform = 'translateX(132px)';

        // Déplace également les éléments du bureau
        desktopArea.style.transform = 'translateX(132px)';
    } else {
        // Réinitialise la position des éléments à 10px
        avatarContainer.style.transform = 'translateX(10px)';
        levelBar.style.transform = 'translateX(10px)';
        emoteContainer.style.transform = 'translateX(10px)';
        tabsContainer.style.transform = 'translateX(10px)';
        contactsTab.style.transform = 'translateX(8px)';

        // Réinitialise la position des éléments du bureau à 10px
        desktopArea.style.transform = 'translateX(10px)';
    }
});



// Ouverture et fermeture de la fenêtre de Jeux
document.querySelector('.desktop-icon img[alt="Jeux Icon"]').addEventListener("click", function() {
    const jeuxWindow = document.getElementById("jeux-window");
    const existingTab = document.getElementById("jeux-window-tab");

    // Si la fenêtre est déjà réduite, réouvrir à partir de l'onglet
    if (existingTab) {
        jeuxWindow.style.display = "block";
        existingTab.remove();
    } else {
        jeuxWindow.style.display = "block";
    }

    // Amener la fenêtre Jeux au premier plan lors de l'ouverture
    bringToFront(jeuxWindow);
});

document.getElementById("close-jeux-btn").addEventListener("click", function() {
    document.getElementById("jeux-window").style.display = "none";
});
// Fonction pour rendre un élément déplaçable
function makeIconDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = function (e) {
        e.preventDefault(); // Empêche les comportements par défaut qui pourraient causer des bugs visuels
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.position = 'absolute'; // Assure que l'élément est positionné correctement
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Ré-application de la fonction makeIconDraggable pour toutes les icônes du bureau
makeIconDraggable(document.getElementById("mail-icon-container"));
makeIconDraggable(document.getElementById("forum-icon-container"));
makeIconDraggable(document.getElementById("liste-noire-icon-container"));
makeIconDraggable(document.getElementById("scores-icon-container"));
makeIconDraggable(document.getElementById("salons-icon-container"));
makeIconDraggable(document.getElementById("corbeille-icon-container"));
makeIconDraggable(document.getElementById("inventaire-icon-container"));
makeIconDraggable(document.getElementById("boutique-icon-container"));
makeIconDraggable(document.getElementById("jeux-icon-container"));

// Sélection des éléments pour la gestion de la fenêtre de Jeux
const jeuxIcon = document.querySelector('.desktop-icon img[alt="Jeux Icon"]');
const jeuxWindow = document.getElementById('jeux-window');
const closeJeuxBtn = document.getElementById('close-jeux-btn');
const minimizeJeuxBtn = document.getElementById('minimize-jeux-btn');
const jeuxDetails = document.getElementById('jeux-details');

// Sélection des FD
const fdItems = document.querySelectorAll('.fd-item');

// Gestion de l'ouverture de la fenêtre de Jeux
jeuxIcon.addEventListener('click', function () {
    const existingTab = document.getElementById('jeux-window-tab');

    if (existingTab) {
        jeuxWindow.style.display = 'block';
        existingTab.remove();
    } else {
        jeuxWindow.style.display = 'block';
    }

    bringToFront(jeuxWindow); // Mettre la fenêtre de Jeux au premier plan
});

// Gestion de la fermeture de la fenêtre de Jeux
closeJeuxBtn.addEventListener('click', function () {
    jeuxWindow.style.display = 'none';
});

// Fonction pour rendre la fenêtre de Jeux déplaçable
makeDraggable(jeuxWindow);

document.getElementById("minimize-jeux-btn").addEventListener('click', function () {
    if (!document.getElementById("jeux-window-tab")) {
        jeuxWindow.style.display = 'none';
        createMinimizedTab('jeux-window', 'Jeux', 'assets/banane_favicon.svg'); // Icône spécifique pour Jeux
    } else {
        jeuxWindow.style.display = 'none';
    }
});


// Variables pour le drag & drop et la gestion du lecteur
let isDraggingFD = false;
let startXFD = 0;
let startYFD = 0;
let offsetXFD = 0;
let offsetYFD = 0;
let isInserted = false; // Indique si un FD est inséré dans le lecteur
const proximityRadius = 30; // Rayon de proximité pour insérer le FD dans le lecteur

// Sélection des éléments pour le lecteur Frusion
const lecteurFrusion = document.getElementById('lecteur-frusion');

// Empêcher le défilement et fixer les dimensions de la fenêtre de Jeux
jeuxWindow.style.overflow = 'hidden'; // Empêche le défilement
jeuxWindow.style.position = 'fixed'; // Garde la fenêtre en place sans changement de taille

// Assurer que jeuxDetails a des dimensions fixes pour éviter le défilement
jeuxDetails.style.overflow = 'hidden';
jeuxDetails.style.position = 'relative';

// Fonction pour rendre les FD déplaçables
fdItems.forEach(fd => {
    fd.addEventListener('pointerdown', (e) => {
        console.log('mousedown sur FD:', fd);
        if (isInserted) return; // Empêche le drag & drop si un FD est déjà inséré
        e.preventDefault();
        e.stopPropagation();

        // Sauvegarder les positions initiales du curseur et du FD pour des calculs précis
        startXFD = e.clientX;
        startYFD = e.clientY;
        const fdRect = fd.getBoundingClientRect();
        offsetXFD = startXFD - fdRect.left;
        offsetYFD = startYFD - fdRect.top;
        isDraggingFD = true;

        // Définir le FD comme absolu pour permettre un déplacement libre
        fd.style.position = 'absolute';
        fd.style.zIndex = '102'; // Assurer que le FD reste au-dessus des autres éléments

        // Commence à déplacer l'élément avec l'événement de déplacement
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);

        function onPointerMove(e) {
            if (!isDraggingFD) return;

            // Mise à jour de la position du FD basée sur les coordonnées du document
            const newX = e.clientX - offsetXFD;
            const newY = e.clientY - offsetYFD;

            fd.style.left = `${newX}px`;
            fd.style.top = `${newY}px`;

            // Vérifie la proximité avec le lecteur pour l'ouvrir
            checkProximity(fd.getBoundingClientRect(), lecteurFrusion.getBoundingClientRect());
        }

        function onPointerUp() {
            if (!isDraggingFD) return;
            isDraggingFD = false;

            // Retirer les événements de déplacement et de relâche
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);

            const fdRect = fd.getBoundingClientRect();
            const jeuxDetailsRect = jeuxDetails.getBoundingClientRect();

            // Si le FD est lâché dans jeuxDetails, il reste dans jeuxDetails
            if (
                fdRect.left >= jeuxDetailsRect.left &&
                fdRect.right <= jeuxDetailsRect.right &&
                fdRect.top >= jeuxDetailsRect.top &&
                fdRect.bottom <= jeuxDetailsRect.bottom
            ) {
                jeuxDetails.appendChild(fd);
                fd.style.left = `${fdRect.left - jeuxDetailsRect.left}px`;
                fd.style.top = `${fdRect.top - jeuxDetailsRect.top}px`;
            }
            // Si le FD est lâché à proximité du lecteur Frusion, l'insérer dans le lecteur
            else if (isWithinProximity(fdRect, lecteurFrusion.getBoundingClientRect())) {
                insertFdIntoLecteur(fd);
            } else {
                // Permettre le déplacement libre sur le bureau
                document.body.appendChild(fd);
                fd.style.left = `${fdRect.left}px`;
                fd.style.top = `${fdRect.top}px`;
            }
        }
    });
});

// Fonction pour vérifier si un FD est à proximité du lecteur Frusion
function isWithinProximity(fdRect, frusionRect) {
    const distance = Math.sqrt(
        Math.pow(fdRect.left + fdRect.width / 2 - (frusionRect.left + frusionRect.width / 2), 2) +
        Math.pow(fdRect.top + fdRect.height / 2 - (frusionRect.top + frusionRect.height / 2), 2)
    );

    return distance <= proximityRadius; // Rayon de 30px pour la détection
}

// Fonction pour vérifier la proximité entre un FD et le lecteur et ouvrir le lecteur si nécessaire
function checkProximity(fdRect, frusionRect) {
    if (isWithinProximity(fdRect, frusionRect)) {
        lecteurFrusion.style.top = '30px'; // Position du lecteur lorsqu'il s'ouvre
        lecteurFrusion.style.zIndex = '101';
    } else {
        lecteurFrusion.style.top = '30px'; // Position initiale du lecteur
    }
}

function insertFdIntoLecteur(fd) {
    // Récupérez les dimensions du lecteur et du FD
    const lecteurWidth = lecteurFrusion.clientWidth;
    const lecteurHeight = lecteurFrusion.clientHeight;
    const fdWidth = fd.clientWidth;
    const fdHeight = fd.clientHeight;

    // Calculez les positions pour centrer le FD dans le lecteur
    let centerX = (lecteurWidth - fdWidth) / 2;
    let centerY = (lecteurHeight - fdHeight) / 2;

    // Ajustements manuels pour le centrage parfait
    centerX -= 5; // Ajustez cette valeur pour déplacer horizontalement
    centerY -= 3; // Ajustez cette valeur pour déplacer verticalement

    // Positionnez le FD au centre du lecteur avec les ajustements
    fd.style.position = 'absolute';
    fd.style.left = `${centerX}px`;
    fd.style.top = `${centerY}px`;
    fd.style.transition = 'all 0.5s ease';
    fd.style.zIndex = '102';

    // Ajoutez le FD au lecteur
    lecteurFrusion.appendChild(fd);
    isInserted = true;

    // Animation de fermeture du lecteur et rotation du FD
    setTimeout(() => {
        lecteurFrusion.style.top = '-55px'; // Ajuster la position verticale si nécessaire
        lecteurFrusion.style.transition = 'top 0.5s ease';

        // Déclencher l'animation de rotation du FD
        setTimeout(() => {
            fd.classList.add('rotate');
            hideDesktopAndShowVideo(); // Appeler la fonction pour cacher le bureau et afficher la vidéo
        }, 500);
    }, 500);
}

// Fonction pour cacher les éléments du bureau et afficher la vidéo
function hideDesktopAndShowVideo() {
    // Cacher les icônes et fenêtres du bureau
    document.querySelectorAll('.desktop-icon, .window').forEach(element => {
        element.classList.add('hidden'); // Ajouter la classe 'hidden' pour masquer les éléments
    });

    // Afficher le conteneur de la vidéo
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.display = 'flex'; // Rend le conteneur de la vidéo visible

    // Lancer la vidéo
    const video = document.getElementById('video');
    video.play();
}




document.addEventListener('DOMContentLoaded', function () {
    // Sélection des éléments
    const chatWindow = document.getElementById('chat-window');
    const chatHeader = document.getElementById('chat-header');
    const chatContent = document.getElementById('chat-content');
    const chatScreen = document.getElementById('chat-screen');
    const userList = document.getElementById('user-list');
    const chatInputContainer = document.getElementById('chat-input-container');
    const openChatButton = document.getElementById('open-chat-button');
    const closeChatButton = document.getElementById('close-chat-btn');
    const minimizeChatButton = document.getElementById('minimize-chat-btn');
    const resizeHandle = document.getElementById('resize-handle');
    const feutresIcon = document.getElementById('feutres-icon');

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let zIndexCounter = 10;

    function openChatWindow() {
        if (chatWindow) {
            chatWindow.style.display = 'flex';
            adjustChatWindow();
            bringToFront(chatWindow);
        }
    }

    function closeChatWindow() {
        if (chatWindow) {
            chatWindow.style.display = 'none';
        }
    }

    function minimizeChatWindow() {
        if (chatWindow) {
            chatWindow.style.display = 'none';
            createMinimizedTab('chat-window', 'Chat');
        }
    }

// Fonction pour ajuster les dimensions des éléments internes de la fenêtre de chat
function adjustChatWindow() {
    const headerHeight = chatHeader?.offsetHeight || 0;
    const inputContainerHeight = chatInputContainer?.offsetHeight || 0;
    const availableHeight = chatWindow.offsetHeight - headerHeight - inputContainerHeight;

    // Ajuste la hauteur du contenu sans toucher à la largeur de la liste des utilisateurs
    chatContent.style.height = `${availableHeight}px`;
    chatScreen.style.flex = '2'; // Ajuste le flex-grow pour garder le ratio variable pour le chat
    userList.style.flex = '0 0 120px'; // Garde une largeur fixe pour la liste des utilisateurs connectés
}

    resizeHandle?.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.onmousemove = function (e) {
            chatWindow.style.width = `${e.clientX - chatWindow.offsetLeft}px`;
            chatWindow.style.height = `${e.clientY - chatWindow.offsetTop}px`;
            adjustChatWindow();
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    });

    function startDrag(e) {
        isDragging = true;
        offsetX = e.clientX - chatWindow.offsetLeft;
        offsetY = e.clientY - chatWindow.offsetTop;
    }

    function drag(e) {
        if (isDragging) {
            chatWindow.style.left = `${e.clientX - offsetX}px`;
            chatWindow.style.top = `${e.clientY - offsetY}px`;
        }
    }

    function stopDrag() {
        isDragging = false;
    }

    function createMinimizedTab(windowId, title) {
        const dynamicTabsContainer = document.getElementById('dynamic-tabs');
        if (!dynamicTabsContainer || document.getElementById(`${windowId}-tab`)) return;

        const newTab = document.createElement('div');
        newTab.className = 'dynamic-tab';
        newTab.id = `${windowId}-tab`;

        const icon = document.createElement('img');
        icon.src = 'assets/favicon_fraise.svg';
        icon.alt = `${title} Icon`;

        const text = document.createElement('span');
        text.textContent = title;

        newTab.appendChild(icon);
        newTab.appendChild(text);

        newTab.addEventListener('click', function () {
            chatWindow.style.display = 'flex';
            adjustChatWindow();
            dynamicTabsContainer.removeChild(newTab);
        });

        dynamicTabsContainer.appendChild(newTab);
    }

    function bringToFront(element) {
        zIndexCounter += 1;
        element.style.zIndex = zIndexCounter;
    }

    // Attacher l'événement au clic spécifique sur l'élément "Laboratoire Kiwix (2)"
    document.querySelectorAll('.salon-item').forEach(item => {
        if (item.textContent.trim() === 'Laboratoire Kiwix (2)') {
            item.addEventListener('click', openChatWindow);
        }
    });

    // Événements pour ouvrir, fermer et minimiser la fenêtre de chat
    openChatButton?.addEventListener('click', openChatWindow);
    closeChatButton?.addEventListener('click', closeChatWindow);
    minimizeChatButton?.addEventListener('click', minimizeChatWindow);

    feutresIcon?.addEventListener('click', function () {
        document.getElementById('feutres-section').style.display = 'block';
        adjustChatWindow();
    });

    chatHeader?.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    openChatWindow(); // Ouvre la fenêtre automatiquement au chargement de la page
});



// Sélection des éléments supplémentaires
const feutresSection = document.getElementById('pen-selection');
const togglePenIcon = document.getElementById('toggle-pen');

// Événement pour ouvrir la section feutres
togglePenIcon?.addEventListener('click', function () {
    if (feutresSection.style.display === 'none' || feutresSection.style.display === '') {
        feutresSection.style.display = 'block'; // Affiche la section feutres
    } else {
        feutresSection.style.display = 'none'; // Cache la section feutres
    }
    adjustChatWindow();
});

// Fonction pour formater l'heure dans le style [HH:MM:SS]
function formatTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `[${hours}:${minutes}:${seconds}]`;
}

// Fonction pour ajouter un message au chat
function addMessageToChat(message) {
    const chatScreen = document.getElementById('messages-container'); // Conteneur des messages dans le chat
    const username = 'kasparov'; // Remplacez par le nom d'utilisateur si nécessaire
    const formattedTime = formatTime(); // Formate l'heure comme avant

    // Créer un nouvel élément de paragraphe pour le message
    const messageElement = document.createElement('p');

    // Créer un élément <span> pour le pseudo et le mettre en gras via le CSS
    const usernameElement = document.createElement('span');
    usernameElement.textContent = `${username}`;
    usernameElement.classList.add('pseudo'); // Ajoute une classe pour cibler avec le CSS

    // Ajouter le texte du message
    const messageText = document.createTextNode(` : ${message}`);

    // Ajouter l'heure au début du message
    const timeElement = document.createElement('span');
    timeElement.textContent = `${formattedTime} `;
    
    // Ajouter les éléments dans le paragraphe
    messageElement.appendChild(timeElement);
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(messageText);

    // Ajouter le message à l'écran de chat
    chatScreen.appendChild(messageElement);

    // Faire défiler vers le bas pour afficher le nouveau message
    chatScreen.scrollTop = chatScreen.scrollHeight;
}

// Ajouter un événement pour détecter l'appui sur la touche Entrée dans le champ d'entrée
const chatInput = document.getElementById('chat-input');
chatInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && chatInput.value.trim() !== '') {
        event.preventDefault(); // Empêche le comportement par défaut de la touche Entrée
        addMessageToChat(chatInput.value.trim()); // Ajoute le message au chat
        chatInput.value = ''; // Vide le champ d'entrée après l'envoi
    }
});

// Fonction pour amener une fenêtre au premier plan
function bringToFront(element) {
    // Ajuster si nécessaire pour éviter que Salons dépasse le z-index des autres
    zIndexCounter += 1;
    element.style.zIndex = zIndexCounter;
}

// Appliquer à toutes les fenêtres existantes et ajouter des événements de clic
function applyBringToFront() {
    document.querySelectorAll('.window').forEach(window => {
        window.addEventListener('mousedown', function() {
            bringToFront(window);
        });
    });

    // Ajout manuel si la fenêtre des Salons est exclue du sélecteur général
    const salonsWindow = document.getElementById("salons-window");
    if (salonsWindow) {
        salonsWindow.addEventListener('mousedown', function() {
            bringToFront(salonsWindow);
        });
    }
}


// Fonction pour ajuster la position des fenêtres à l'intérieur de desktopArea avec une marge de 50px
function adjustWindowPosition(windowElement) {
    const desktopRect = desktopArea.getBoundingClientRect();
    const windowRect = windowElement.getBoundingClientRect();

    // Calculer les nouvelles positions ajustées pour que la fenêtre reste dans desktopArea
    // et inclut une marge de 50px par rapport au top
    let adjustedX = Math.max(desktopRect.left, Math.min(windowRect.left, desktopRect.right - windowRect.width));
    let adjustedY = Math.max(desktopRect.top + 50, Math.min(windowRect.top, desktopRect.bottom - windowRect.height));

    // Appliquer les nouvelles positions ajustées
    windowElement.style.position = 'absolute';
    windowElement.style.left = `${adjustedX}px`;
    windowElement.style.top = `${adjustedY}px`;
}

// Fonction pour ouvrir une fenêtre en respectant les règles de positionnement dans desktopArea
function openWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    if (windowElement) {
        windowElement.style.display = 'block';
        adjustWindowPosition(windowElement); // Ajuste la position pour rester dans desktopArea avec la marge
        bringToFront(windowElement); // Met la fenêtre au premier plan
    }
}

// Appliquer cette fonction à chaque fenêtre spécifique
document.getElementById('jeux-icon').addEventListener('click', () => openWindow('jeux-window'));
document.getElementById('chat-icon').addEventListener('click', () => openWindow('chat-window'));
document.getElementById('salons-icon').addEventListener('click', () => openWindow('salons-window'));
document.getElementById('scores-icon').addEventListener('click', () => openWindow('scores-window'));
document.getElementById('fiche-icon').addEventListener('click', () => openWindow('fiche-container'));


