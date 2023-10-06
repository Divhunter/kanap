//====================================================
// On cible les paramètres de l'url envoyée à partir de la page d'accueil
// On convertit les paramètres en chaine de caractère
//====================================================
let str = String(window.location);
let url = new URL(str);

// Déclaration de variables pour chaque paramètre 
let myId = url.searchParams.get("id");
let myAlt = url.searchParams.get("altTxt");
let myColors = url.searchParams.get("colors").split(",");
let myDescription = url.searchParams.get("description");
let myImg = url.searchParams.get("imageUrl");
let myName = url.searchParams.get("name");
let myPrice = url.searchParams.get("price");

//====================================================
// Initialisation et insertion des éléments html
//====================================================

// Image
const img = document.createElement("img");
img.alt = myDescription;
img.src = myImg;

let productContent = document.querySelector("section");
let itemImg = productContent.querySelector("div");
itemImg.appendChild(img);

//====================================================

// Name
let productName = document.getElementById("title");
productName.textContent = myName;

//====================================================

// Price
let productPrice = document.getElementById("price");
productPrice.textContent = myPrice;

//====================================================

// Description
let productDescription = document.getElementById("description");
productDescription.textContent = myDescription;

//====================================================

// Quantité
let myQuantity = []; 
myQuantity = document.getElementById("quantity").value;

myQuantity = parseInt(myQuantity);

//====================================================

// Options de couleur
    myColors.forEach(function(item) {
    const newOption = document.createElement("option");
    const newContent = document.createTextNode(item);
    newOption.appendChild(newContent);

    const currentSelect = document.getElementById("colors");
    currentSelect.add(newOption);
});

//====================================================
// Définition des fonction de l'élément cliquable
//====================================================
// Le bouton addToCart appelle la fonction addEventListener à laquelle est indexé la fonction btnProduct
document.getElementById("addToCart").addEventListener("click", btnProduct);

function btnProduct() {
    // Indexation de la fonction verifProduct
    verifProduct();
}

function verifProduct() {

    // Première condition: vérification de l'initialisation de l'id
    if (myId != undefined) {

        // Deuxième condition: vérification de la bonne saisie de la couleur
        if ((document.getElementById("colors").value != "undefined") && 
            (document.getElementById("colors").value != "")) {

            // Troisième condition: vérification de la bonne saisie de la quantité
            if ((document.getElementById("quantity").value > 0) && 
                (document.getElementById("quantity").value <= 100)) {

                    // indexation de la fonction addCart
                    addCart();

            } else {
                alert("Veuillez saisir une quantité valide!");
            }
        } else {
            alert("Veuillez saisir une couleur!");
        }
    } else {
        alert("Une erreur inatendue est survenue!");
        window.location = ("./index.html");
    }
} 

//====================================================
// Fonction addCart
//====================================================
// Création d'une class
class Product { 
    constructor(id, name, color, img, alt, price, quantity)
    {
        this.id = id;
        this.name = name;
        this.color = color;
        this.img = img;
        this.alt = alt;
        this.price = parseInt(price);
        this.quantity = parseInt(quantity);
    }
};

// Déclaration de variable pour l'objet
let object = new Product(); 

// Création de la fonction d'ajout au panier au clic
function addCart() {

    // Décaration de variable, définition d'un tableau (principal)...
    // ...destiné à être récupéré à partir du localStorage
    let cart = localStorage.getItem("cart");

    // Déclaration de variable pour la valeur de la quantité
    let productQuantity = document.getElementById("quantity").value;
        productQuantity = parseInt(productQuantity); 

    // Déclaration de variable pour la valeur de la couleur
    let productColor = document.getElementById("colors").value;

    // Si le tableau principal n'existe pas dans le localStorage
    if (cart == null) {

        // Déclaration de variable et initialisation d'un tableau transitoire ou éphémère
        let newCart = [];

        // On définit ses valeurs
        object.id = myId;
        object.name = myName;
        object.color = productColor;
        object.img = myImg;
        object.alt = myAlt;
        object.price = myPrice;
        object.quantity = productQuantity;

        // On insère l'objet avec les valeurs définies dans le tableau transitoire
        newCart.push(object);

        // On sauvegarde dans le localStorage le tableau principal... 
        // ...en y inculant les valeurs pécedemment définies du tableau transitoire
        localStorage.setItem("cart", JSON.stringify(newCart));
        alert("Vous avez ajouté " + productQuantity + " article(s) dans le panier");
         
    // Si le tableau existe dans le localStorage
    } else {

        // On récupère les valeurs du tableau à partir du localStorage et...
        // ...on lui associe la variable du tableau transitoire
        newCart = JSON.parse(cart);
        
        // On crée une fonction  qui gère la condition même id - même couleur 
        function filterByIdandColor(obj) {

            // Cette fonction retourne le callback à l'index -1
            if(obj.id == myId && obj.color == productColor) {
                return true;
            } else {
                return false;
            }
        }
        
        // On parcourt le tableau transitoire en ciblant un élément répondant à...
        // ...la fonction précédemment évoquée
        let found = newCart.findIndex(filterByIdandColor);

        // Dans le tableau, comme la position est forcément comprise entre 0 et l'infini,
        // l'argument est pris en compte
        if (found > -1) {
            // On additionne les quantités 
            newCart[found].quantity = newCart[found].quantity + parseInt(productQuantity);

            // On vérouille une quantité maximale à 100 dans le cas de cumuls de quantités
            if (newCart[found].quantity > 100) {
                newCart[found].quantity = 100;
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Vous avez atteint la quantitié maximale (100 unités) pour cet article!");
            } else {
                alert("Vous avez ajouté " + productQuantity + " article(s) dans le panier");
            }
        }
        // dans le cas contraire on ajoute un nouvel objet
        else {
            // Déclaraton de variable, initialisation de l'objet
            let newObject = new Product();

            newObject.id = myId;
            newObject.name = myName;
            newObject.color = productColor;
            newObject.img = myImg;
            newObject.alt = myAlt;
            newObject.price = myPrice;
            newObject.quantity = productQuantity;

            // On insère le nouvelle objet dans le tableau transitoire 
            newCart.push(newObject);
            alert("Vous avez ajouté " + productQuantity + " article(s) dans le panier");
        }

        // On sauvegarde dans le localStorage le tableau principal... 
        // ...avec les nouvelles valeurs du tableau transitoire
        localStorage.setItem("cart", JSON.stringify(newCart));
    } 
}