/**
 * assertion generique
 *  - string
 *  - array
 *  - object
 * assertion dynamique (page, locator, request)
 * assertions elements multiples ?
 */


// generic :

// value of a string : toEqual
// value of a string with a regex : stringMatching
// value of a string : toContain
// number : toBeGreaterThan...
// instance d'une class : toBeInstanceOf
// toHaveLength
// toEqual
// toStrictEqual : valeur des objets avec undefined sont vérifiés, tableau avec valeurs vides sont vérifiés
// ajouter un .not()


// locator : 

// toBeVisible
// toBeHidden
// toHaveText
// toHaveValue
// toHaveValues
// toBeAttached (in the dom but not visible)
// toBeChecked...

// page :

// toHaveTitle
// toHaveURL


// requete (voir chapitre des API)