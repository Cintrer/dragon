'use strict';   

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/

let pvDragon;
let pvJoueur;
let pvJoueurMax; 
let pvDragonMax; 
let niveau; 
let classe; // 1 = Chevalier, 2 = Voleur, 3 = Mage

/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/

/**
 * Affiche l'état des PV avec barres de progression et images blessées
 */
function afficherEtatDuJeu() {
    document.write('<div class="game-state">');
    
    // --- JOUEUR ---
    document.write('<figure class="game-state_player">');
        // Bonus 1 : Image blessée si PV < 30%
        if (pvJoueur < (pvJoueurMax * 0.3)) {
            document.write('<img src="images/knight-wounded.png" alt="Chevalier blessé">');
        } else {
            document.write('<img src="images/knight.png" alt="Chevalier">');
        }
        document.write('<figcaption>');
            // Bonus 3 : Jauge de PV
            document.write('<progress max="' + pvJoueurMax + '" value="' + pvJoueur + '"></progress>');
            document.write(pvJoueur <= 0 ? "Game Over" : pvJoueur + " PV");
        document.write('</figcaption>');
    document.write('</figure>');

    // --- DRAGON ---
    document.write('<figure class="game-state_player">');
        if (pvDragon < (pvDragonMax * 0.3)) {
            document.write('<img src="images/dragon-wounded.png" alt="Dragon blessé">');
        } else {
            document.write('<img src="images/dragon.png" alt="Dragon">');
        }
        document.write('<figcaption>');
            document.write('<progress max="' + pvDragonMax + '" value="' + pvDragon + '"></progress>');
            document.write(pvDragon <= 0 ? "Vaincu !" : pvDragon + " PV");
        document.write('</figcaption>');
    document.write('</figure>');
    
    document.write('</div>');
}

/**
 * Logique d'un tour avec Bonus n°2 (Classes de personnages)
 */
function lancerTourDeCombat(numeroTour) {
    document.write('<h3>Tour n°' + numeroTour + '</h3>');

    // 1. Initiative de base
    let initiativeJoueur = throwDices(10, 6);
    let initiativeDragon = throwDices(10, 6);
    
    // BONUS CLASSE : Le Voleur (classe 2) est plus rapide (Initiative + 1D6%)
    if (classe === 2) {
        initiativeJoueur += initiativeJoueur * (throwDices(1, 6) / 100);
    }

    // 2. Dégâts de base
    let degats = throwDices(3, 6);

    // 3. Application des bonus/malus de difficulté et de classe
    if (initiativeJoueur > initiativeDragon) {
        // LE JOUEUR ATTAQUE
        // Bonus difficulté facile : +2D6% | malus difficile : -1D6%
        if (niveau === 1) degats += degats * (throwDices(2, 6) / 100);
        if (niveau === 3) degats -= degats * (throwDices(1, 6) / 100);
        
        // BONUS CLASSE : Le Mage (classe 3) fait +1D10% de dégâts
        if (classe === 3) degats += degats * (throwDices(1, 10) / 100);

        degats = Math.floor(degats); // On arrondit pour avoir des points entiers
        pvDragon -= degats;
        
        document.write('<figure class="game-round">');
            document.write('<img src="images/knight-winner.png" alt="Chevalier vainqueur">');
            document.write('<figcaption>Vous êtes plus rapide, vous infligez ' + degats + ' dégâts !</figcaption>');
        document.write('</figure>');
    } 
    else {
        // LE DRAGON ATTAQUE
        // Malus difficulté facile : -2D6% | bonus difficile : +1D6%
        if (niveau === 1) degats -= degats * (throwDices(2, 6) / 100);
        if (niveau === 3) degats += degats * (throwDices(1, 6) / 100);
        
        // BONUS CLASSE : Le Chevalier (classe 1) encaisse mieux (-1D10%)
        if (classe === 1) degats -= degats * (throwDices(1, 10) / 100);

        degats = Math.floor(degats);
        pvJoueur -= degats;

        document.write('<figure class="game-round">');
            document.write('<img src="images/dragon-winner.png" alt="Dragon vainqueur">');
            document.write('<figcaption>Le dragon est plus rapide, il vous inflige ' + degats + ' dégâts !</figcaption>');
        document.write('</figure>');
    }
}

function jouerPartie() {
    let tour = 1;
    while (pvDragon > 0 && pvJoueur > 0) {
        lancerTourDeCombat(tour);
        afficherEtatDuJeu();
        tour++;
    }
}

function afficherFinDePartie() {
    document.write('<footer>');
    document.write('<h3>Fin de la partie</h3>');
    document.write('<figure class="game-end">');
    if (pvJoueur > 0) {
        document.write('<figcaption>Bravo ! Le dragon est cuit !</figcaption>');
        document.write('<img src="images/knight-winner.png">');
    } else {
        document.write('<figcaption>Dommage... Vous avez fini en barbecue.</figcaption>');
        document.write('<img src="images/dragon-winner.png">');
    }
    document.write('</figure></footer>');
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

// 1. Configuration
niveau = requestInteger("Difficulté : 1 (Facile), 2 (Normal), 3 (Difficile)", 1, 3);
classe = requestInteger("Classe : 1 (Chevalier), 2 (Voleur), 3 (Mage)", 1, 3);

// 2. Points de vie
if (niveau === 1) {
    pvDragon = 100 + throwDices(5, 10);
    pvJoueur = 100 + throwDices(10, 10);
} else if (niveau === 3) {
    pvDragon = 100 + throwDices(10, 10);
    pvJoueur = 100 + throwDices(7, 10);
} else {
    pvDragon = 100 + throwDices(10, 10);
    pvJoueur = 100 + throwDices(10, 10);
}

// 3. Sauvegarde des PV Max et Affichage de départ
pvJoueurMax = pvJoueur;
pvDragonMax = pvDragon;

document.write('<h2>Que la fête commence !!</h2>');
afficherEtatDuJeu();

// 4. Lancement du jeu
jouerPartie();
afficherFinDePartie();