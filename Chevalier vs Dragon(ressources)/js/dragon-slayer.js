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

function afficherEtatDuJeu() {
    document.write('<div class="game-state">');
    
    // --- JOUEUR ---
    document.write('<figure class="game-state_player">');
        if (pvJoueur < (pvJoueurMax * 0.3)) {
            document.write('<img src="images/knight-wounded.png" alt="Chevalier blessé">');
        } else {
            document.write('<img src="images/knight.png" alt="Chevalier">');
        }
        document.write('<figcaption>');
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
 * Gère les calculs de dégâts avec les bonus de classe et difficulté
 */
function calculerDegats(attaquant) {
    let degats = throwDices(3, 6);
    let variation = 0;

    if (attaquant === "dragon") {
        // Ajustement selon difficulté
        if (niveau === 1) variation = -throwDices(2, 6); // Facile : -2D6%
        if (niveau === 3) variation = throwDices(1, 6);  // Difficile : +1D6%
        
        // Bonus Chevalier : armure réduit les dégâts du dragon de 1D10%
        if (classe === 1) variation -= throwDices(1, 10);
    } else {
        // Attaquant est le Joueur
        if (niveau === 1) variation = throwDices(2, 6);  // Facile : +2D6%
        if (niveau === 3) variation = -throwDices(1, 6); // Difficile : -1D6%
        
        // Bonus Mage : boule de feu +1D10%
        if (classe === 3) variation += throwDices(1, 10);
    }

    degats += degats * (variation / 100);
    return Math.floor(degats);
}

function lancerTourDeCombat(numeroTour) {
    document.write('<h3>Tour n°' + numeroTour + '</h3>');

    let initJoueur = throwDices(10, 6);
    let initDragon = throwDices(10, 6);
    
    // Bonus Voleur : initiative +1D6%
    if (classe === 2) initJoueur += initJoueur * (throwDices(1, 6) / 100);

    if (initJoueur > initDragon) {
        let points = calculerDegats("joueur");
        pvDragon -= points;
        document.write('<figure class="game-round"><img src="images/knight-winner.png"><figcaption>Vous infligez ' + points + ' dégâts !</figcaption></figure>');
    } else {
        let points = calculerDegats("dragon");
        pvJoueur -= points;
        document.write('<figure class="game-round"><img src="images/dragon-winner.png"><figcaption>Le dragon inflige ' + points + ' dégâts !</figcaption></figure>');
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
    document.write('<footer><h3>Fin de la partie</h3><figure class="game-end">');
    if (pvJoueur > 0) {
        document.write('<figcaption>Gagné !</figcaption><img src="images/knight-winner.png">');
    } else {
        document.write('<figcaption>Perdu !</figcaption><img src="images/dragon-winner.png">');
    }
    document.write('</figure></footer>');
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

niveau = requestInteger("Difficulté : 1 (Facile), 2 (Normal), 3 (Difficile)", 1, 3);
classe = requestInteger("Classe : 1 (Chevalier), 2 (Voleur), 3 (Mage)", 1, 3);

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

pvJoueurMax = pvJoueur;
pvDragonMax = pvDragon;

document.write('<h2>Que la fête commence !!</h2>');
afficherEtatDuJeu();
jouerPartie();
afficherFinDePartie();z