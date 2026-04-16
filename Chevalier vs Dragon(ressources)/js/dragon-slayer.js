'use strict';   

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/

let pvDragon;
let pvJoueur;
let pvJoueurMax; 
let pvDragonMax; 
let niveau; 
let classe; 

/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/

/**
 * Affiche l'état des points de vie, les barres de progression et les portraits
 */
function afficherEtatDuJeu() {
    document.write('<div class="game-state">');
    
    // --- PARTIE CHEVALIER ---
    document.write('<figure class="game-state_player">');
        // Bonus 1 : Portrait blessé si PV < 30%
        if (pvJoueur < (pvJoueurMax * 0.3)) {
            document.write('<img src="images/knight-wounded.png" alt="Chevalier blessé">');
        } else {
            document.write('<img src="images/knight.png" alt="Chevalier">');
        }
        document.write('<figcaption>');
            // Bonus 3 : Barre de vie dynamique
            document.write('<progress max="' + pvJoueurMax + '" value="' + pvJoueur + '"></progress>');
            document.write(pvJoueur <= 0 ? "GAME OVER" : pvJoueur + " PV");
        document.write('</figcaption>');
    document.write('</figure>');

    // --- PARTIE DRAGON ---
    document.write('<figure class="game-state_player">');
        if (pvDragon < (pvDragonMax * 0.3)) {
            document.write('<img src="images/dragon-wounded.png" alt="Dragon blessé">');
        } else {
            document.write('<img src="images/dragon.png" alt="Dragon">');
        }
        document.write('<figcaption>');
            document.write('<progress max="' + pvDragonMax + '" value="' + pvDragon + '"></progress>');
            document.write(pvDragon <= 0 ? "VAINCU" : pvDragon + " PV");
        document.write('</figcaption>');
    document.write('</figure>');
    
    document.write('</div>');
}

/**
 * Calcule les dégâts en appliquant les bonus/malus du README
 */
function calculerDegats(attaquant) {
    let degats = throwDices(3, 6); // Base 3D6
    let variation = 0;

    if (attaquant === "dragon") {
        // Difficulté
        if (niveau === 1) variation -= throwDices(2, 6); // Facile : -2D6%
        if (niveau === 3) variation += throwDices(1, 6); // Difficile : +1D6%
        // Bonus Chevalier : armure -1D10%
        if (classe === 1) variation -= throwDices(1, 10);
    } else {
        // Joueur
        if (niveau === 1) variation += throwDices(2, 6); // Facile : +2D6%
        if (niveau === 3) variation -= throwDices(1, 6); // Difficile : -1D6%
        // Bonus Mage : magie +1D10%
        if (classe === 3) variation += throwDices(1, 10);
    }

    degats += degats * (variation / 100);
    return Math.floor(degats);
}

/**
 * Déroulement d'un tour de combat
 */
function lancerTourDeCombat(numeroTour) {
    document.write('<h3>Tour n°' + numeroTour + '</h3>');

    let initJoueur = throwDices(10, 6);
    let initDragon = throwDices(10, 6);
    
    // Bonus Voleur : initiative +1D6%
    if (classe === 2) initJoueur += initJoueur * (throwDices(1, 6) / 100);

    if (initJoueur > initDragon) {
        let points = calculerDegats("joueur");
        pvDragon -= points;
        document.write('<figure class="game-round">');
        document.write('<img src="images/knight-winner.png">');
        document.write('<figcaption>Vous êtes plus rapide, vous infligez ' + points + ' dégâts !</figcaption>');
        document.write('</figure>');
    } else {
        let points = calculerDegats("dragon");
        pvJoueur -= points;
        document.write('<figure class="game-round">');
        document.write('<img src="images/dragon-winner.png">');
        document.write('<figcaption>Le dragon prend l\'avantage et vous inflige ' + points + ' dégâts !</figcaption>');
        document.write('</figure>');
    }
}

/**
 * Lance le combat jusqu'à la fin
 */
function jouerPartie() {
    let tour = 1;
    while (pvDragon > 0 && pvJoueur > 0) {
        lancerTourDeCombat(tour);
        afficherEtatDuJeu();
        tour++;
    }
}

/**
 * Message final du vainqueur
 */
function afficherFinDePartie() {
    document.write('<footer>');
    document.write('<h3>Fin de la partie</h3>');
    document.write('<figure class="game-end">');
    if (pvJoueur > 0) {
        document.write('<figcaption>Félicitations ! Vous avez terrassé la bête !</figcaption>');
        document.write('<img src="images/knight-winner.png" alt="Victoire">');
    } else {
        document.write('<figcaption>Vous avez péri... Le dragon règne sur le royaume.</figcaption>');
        document.write('<img src="images/dragon-winner.png" alt="Défaite">');
    }
    document.write('</figure>');
    document.write('</footer>');
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

// 1. Paramétrage
niveau = requestInteger("Difficulté : 1 (Facile), 2 (Normal), 3 (Difficile)", 1, 3);
classe = requestInteger("Votre Classe : 1 (Chevalier), 2 (Voleur), 3 (Mage)", 1, 3);

// 2. Tirage des PV
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

// 3. Initialisation des jauges et premier affichage
pvJoueurMax = pvJoueur;
pvDragonMax = pvDragon;

document.write('<h2>Le combat commence !</h2>');
afficherEtatDuJeu();

// 4. Lancement de l'action
jouerPartie();
afficherFinDePartie();