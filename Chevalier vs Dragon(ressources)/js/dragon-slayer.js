'use strict';   

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/

// Initialisation des variables globales
let pvDragon;
let pvJoueur;
let niveau; 


/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/
/*
* Affiche les points de vie actuels dans le document HTML
 */
function afficherEtatDuJeu() {
    // On écrit le code HTML directement comme dans la maquette
    document.write('<div class="game-state">');
    
        // Affichage du Chevalier
        document.write('<figure class="game-state_player">');
            document.write('<img src="images/knight.png" alt="Chevalier">');
            document.write('<figcaption>' + pvJoueur + ' PV</figcaption>');
        document.write('</figure>');

        // Affichage du Dragon
        document.write('<figure class="game-state_player">');
            document.write('<img src="images/dragon.png" alt="Dragon">');
            document.write('<figcaption>' + pvDragon + ' PV</figcaption>');
        document.write('</figure>');
    
    document.write('</div>');
}

/**
 * Détermine qui attaque et calcule les dégâts
 */
function lancerTourDeCombat(numeroTour) {
    // 1. On affiche le numéro du tour
    document.write('<h3>Tour n°' + numeroTour + '</h3>');

    // 2. Calcul de l'initiative (10D6 chacun)
    let initiativeJoueur = throwDices(10, 6);
    let initiativeDragon = throwDices(10, 6);
    
    // Dégâts de base : 3D6
    let degats = throwDices(3, 6);

    // 3. Comparaison de l'initiative
    if (initiativeJoueur > initiativeDragon) {
        // Le joueur gagne l'initiative
        pvDragon = pvDragon - degats;
        
        document.write('<figure class="game-round">');
            document.write('<img src="images/knight-winner.png" alt="Chevalier vainqueur">');
            document.write('<figcaption>Vous êtes plus rapide, vous infligez ' + degats + ' dégâts !</figcaption>');
        document.write('</figure>');
    } 
    else {
        // Le dragon gagne l'initiative
        pvJoueur = pvJoueur - degats;

        document.write('<figure class="game-round">');
            document.write('<img src="images/dragon-winner.png" alt="Dragon vainqueur">');
            document.write('<figcaption>Le dragon est plus rapide, il vous inflige ' + degats + ' dégâts !</figcaption>');
        document.write('</figure>');
    }
}

/**
 * Lance la boucle principale du jeu
 */
function jouerPartie() {
    let tour = 1;

    // Tant que tout le monde est en vie (PV > 0)
    while (pvDragon > 0 && pvJoueur > 0) {
        lancerTourDeCombat(tour);
        afficherEtatDuJeu();
        tour++;
    }
}


/**
 * Affiche l'état du jeu avec le bonus des images amochées (Bonus n1)
 */
function afficherEtatDuJeu() {
    document.write('<div class="game-state">');
    
    // --- CHEVALIER ---
    document.write('<figure class="game-state_player">');
        // Bonus 1 : Si PV < 30%, on change l'image
        // On considère que 100 PV est la base (ou on simplifie pour le moment)
        if (pvJoueur < 30) {
            document.write('<img src="images/knight-wounded.png" alt="Chevalier amoché">');
        } else {
            document.write('<img src="images/knight.png" alt="Chevalier">');
        }
        
        // Si le joueur est mort, on écrit Game Over, sinon ses PV
        if (pvJoueur <= 0) {
            document.write('<figcaption>Game Over</figcaption>');
        } else {
            document.write('<figcaption>' + pvJoueur + ' PV</figcaption>');
        }
    document.write('</figure>');

    // --- DRAGON ---
    document.write('<figure class="game-state_player">');
        if (pvDragon < 30) {
            document.write('<img src="images/dragon-wounded.png" alt="Dragon amoché">');
        } else {
            document.write('<img src="images/dragon.png" alt="Dragon">');
        }

        if (pvDragon <= 0) {
            document.write('<figcaption>Vaincu !</figcaption>');
        } else {
            document.write('<figcaption>' + pvDragon + ' PV</figcaption>');
        }
    document.write('</figure>');
    
    document.write('</div>');
}

/**
 * Affiche l'écran final de victoire ou défaite
 */
function afficherFinDePartie() {
    document.write('<footer>');
    document.write('<h3>Fin de la partie</h3>');
    document.write('<figure class="game-end">');

    if (pvJoueur > 0) {
        // Le joueur a gagné
        document.write('<figcaption>Vous avez terrassé le dragon ! Félicitations Chevalier !</figcaption>');
        document.write('<img src="images/knight-winner.png" alt="Chevalier vainqueur">');
    } else {
        // Le dragon a gagné
        document.write('<figcaption>Vous avez perdu le combat, le dragon vous a carbonisé !</figcaption>');
        document.write('<img src="images/dragon-winner.png" alt="Dragon vainqueur">');
    }

    document.write('</figure>');
    document.write('</footer>');
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

// 1. Demander la difficulté (1=Facile, 2=Normal, 3=Difficile)
// On utilise la fonction du prof dans utilities.js
niveau = requestInteger("Choisir la difficulté :\n1. Facile / 2. Normal / 3. Difficile", 1, 3);

// 2. Calcul des points de vie selon le niveau
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

// 3. Affichage initial de l'état du jeu
document.write('<h2>Que la fête commence !!</h2>');
afficherEtatDuJeu();

// 4. On lance le combat !
jouerPartie();

// 5. Une fois que la boucle est finie, on affiche le résultat final
afficherFinDePartie();