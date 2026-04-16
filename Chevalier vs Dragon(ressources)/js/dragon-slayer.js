'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/



/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/




/*************************************************************************************************/

// Le fichier `Projet/index.js` contenait une tentative de fonctions.
// On les ajoute ici SANS écraser celles déjà présentes dans `js/utilities.js`.
// (Sinon la version de `throwDices` de `utilities.js` serait remplacée.)

function throwDices_from_root(nDices, nbSides)
{
    let results = 0;
    for (let i = 0; i < nDices; i++)
    {
        results += getRandomInteger(1, nbSides);
    }
    return results;
}

function grtRandomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + 1;
}

/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/