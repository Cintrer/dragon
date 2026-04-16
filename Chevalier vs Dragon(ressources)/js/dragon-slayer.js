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

