// Déclaration de variable pour le tableau récupéré à partir du localStorage
let cart = JSON.parse(localStorage.getItem("cart"));

// Déclaration de variable et initialisation du cumul des quantités
let quantities = 0;

// Déclaration de variable et initialisation du cumul des prix
let prices = 0;

// Si la panier est vide ou néant...
if (localStorage.length == 0 || cart == null || cart.length == 0) {
    
    // On change le contenu du titre
    const elH1 =  document.querySelector("h1");
    elH1.textContent = "Votre panier est vide";

    // On efface les éléments relatifs à la commande
    const elCart = document.querySelector("section");
    elCart.remove()

} // ...sinon...
else {
    // On parcourt le tableau
    for (let i = 0; i < cart.length; i++) {
            
        //====================================================
        // Inialisation du contenant principal
        //====================================================
        const cartItem = document.createElement("article");
        cartItem.classList.add("cart__item");
        cartItem.setAttribute("data-id", `{product-ID}`);
        cartItem.dataset.id = cart[i].id;
        cartItem.setAttribute("data-color", `{product-color}`);
        cartItem.dataset.color = cart[i].color;

        //====================================================
        // Inialisation du contenant de description
        //====================================================
        const cartItemContent = document.createElement("div");
        cartItemContent.classList.add("cart__item__content");
        const cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList.add("cart__item__content__description");

        // Image 
        const cartItemImg = document.createElement("div");
        cartItemImg.classList.add("cart__item__img");
        const cartImg = document.createElement("img");
        cartImg.alt = cart[i].alt;
        cartImg.src = cart[i].img;

        // Nom 
        const productName = document.createElement("h2");
        productName.textContent = cart[i].name;

        // Couleur
        const productColor = document.createElement("p");
        productColor.textContent = cartItem.dataset.color;

        // Prix
        const productPrice = document.createElement("p");
        productPrice.textContent = cart[i].price + " €";

        //====================================================
        // Inialisation du champ de saisie de la quantité
        //====================================================
        const cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.classList.add("cart__item__content__settings");
        const cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity"); 

        // Quantité
        const productQuantity = document.createElement("p");
        productQuantity.textContent = "Qté : ";
        const productQuantityInput = document.createElement("input");
        productQuantityInput.classList.add("itemQuantity"); 
        productQuantityInput.name = "itemQuantity";
        productQuantityInput.min = 1;
        productQuantityInput.max = 100;
        productQuantityInput.value = cart[i].quantity;

        productQuantityInput.setAttribute("type", "number");
    
        //====================================================
        // Inialisation de la suppression des produits
        //====================================================
        const cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete"); 

        // Bouton supprimer
        const productDelete = document.createElement("p");
        productDelete.classList.add("deleteItem"); 
        productDelete.textContent = "Supprimer";

        //====================================================
        // Inialisation du cumul des quantités
        //====================================================
        const productTotalQuantity = document.getElementById("totalQuantity");
        productTotalQuantity.textContent = quantities += parseInt(productQuantityInput.value);

        //====================================================
        // Inialisation du cumul des prix
        //====================================================
        const productTotalPrice = document.getElementById("totalPrice");
        productTotalPrice.textContent = prices += cart[i].price * parseInt(productQuantityInput.value);
        
        //====================================================
        // Insertion des éléments html
        //====================================================
        let cartItems = document.getElementById("cart__items");

        cartItem.appendChild(cartItemImg);
        cartItemImg.appendChild(cartImg);
        cartItem.appendChild(cartItemContent);
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContentDescription.appendChild(productName);
        cartItemContentDescription.appendChild(productColor);
        cartItemContentDescription.appendChild(productPrice);
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        cartItemContentSettingsQuantity.appendChild(productQuantity);
        cartItemContentSettingsQuantity.appendChild(productQuantityInput);
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
        cartItemContentSettingsDelete.appendChild(productDelete);
        cartItems.appendChild(cartItem);
        
        //====================================================
        // Ajout des nouvelles quantités
        //====================================================
        // On crée la fonction d'ajout de quantité
        productQuantityInput.addEventListener("change", function () {
            // Si la quantité est valide...
            if (productQuantityInput.value >=1 && productQuantityInput.value <= 100) {

                // Déclaration d'une variable pour la saisie de la quantité
                let itemQuantity = document.querySelectorAll("itemQuantity");

                // Initialisation de la nouvelle quantité
                itemQuantity.textContent = this.value;
                resultQuantity = itemQuantity.textContent;
                resultQuantity = parseInt(resultQuantity);

                // On sauvegarde la nouvelle quantité 
                cart[i].quantity = resultQuantity;
                localStorage.setItem("cart", JSON.stringify(cart));

                // la page cart est redirigé vers elle même avec les modifications apportées
                window.location.href = "./cart.html";
            }
            // ...sinon la quantité est inchangée
            else {
                alert("Veuillez saisir une quantité comprise entre 1 et 100!");

                // la page cart est redirigé vers elle même sans aucune modification...
                // ...évoquée préalablement
                window.location.href = "./cart.html";
            }
        });
        
        //====================================================
        // Suppréssion d'article
        //====================================================
        // Création de la fonction de suppréssion d'article
        productDelete.addEventListener("click", function(event) {
            // On crée une aletre de confirmation
            let msg = confirm("Souhaitez-vous vraiment supprimer cet article?");

            // Si la suppression est validée...
            if (msg) {
                // On cible l'article par son identifiant et sa couleur dans le localStorage
                // On filtre le tableau et supprime l'article
                let foundId = cartItem.getAttribute("data-id");
                let foundColor = cartItem.getAttribute("data-color");
                const findItem = cart.find(el => el.id == foundId && el.color == foundColor);
                cart = cart.filter(item => item != findItem);
        
                localStorage.setItem("cart", JSON.stringify(cart)); 
                window.location.href = "./cart.html";
            }
            // dans le cas contraire, la suppression est annulée
            else {
                return false
            }
        })

        //====================================================
        // Vérification des champs de saisie du formulaire
        //====================================================
        // Déclaration de variable pour les regexs 
        let matchFirstName = /^[a-zA-Zéèêîçôï]+(?:['\s\-a-zA-Zéèêîçôï]+)*$/;
        let matchLastName = /^[a-zA-Zéèêîçôï]+(?:['\s][a-zA-Zéèêîçôï]+)*$/;
        let matchAddress = /^[a-zA-Zéèêîçôï0-9]+(?:['\s\-\.a-zA-Zéèêîçôï0-9]+)*$/;
        let matchCity = /^[a-zA-Zéèêîçôï]+(?:['\-\s][a-zA-Zéèêîçôï]+)*$/;
        let matchEmail = /^\w+([\.-_]?\w+)*@\w+([\.-_]?\w+)*(\.\w{2,3})+$/;

        // Vérification du champ prénom
        const firstNameError = document.getElementById("firstNameErrorMsg");
        firstName.addEventListener("input", function (e) {
            if (matchFirstName.test(e.target.value)) {
                firstNameError.innerHTML = "";
            } else {
                firstNameError.innerHTML = "Le prénom n'est pas valide!";
                return false
            } 
        })

        // Vérification du champ nom de famille
        const lastNameError = document.getElementById("lastNameErrorMsg");
        lastName.addEventListener("input", function (e) {
            if (matchLastName.test(e.target.value)) {
                lastNameError.innerHTML = "";
            } else {
                lastNameError.innerHTML = "Le nom de famille n'est pas valide!";
                return false
            } 
        })

        // Vérification du champ adresse
        const addressError = document.getElementById("addressErrorMsg");
        address.addEventListener("input", function (e) {
            if (matchAddress.test(e.target.value)) {
                addressError.innerHTML = "";
            } else {
                addressError.innerHTML = "L'adresse n'est pas valide!";
                return false
            } 
        })

        // Vérification du champ ville
        const cityError = document.getElementById("cityErrorMsg");
        city.addEventListener("input", function (e) {
            if (matchCity.test(e.target.value)) {
                cityError.innerHTML = "";
            } else {
                cityError.innerHTML = "La ville n'est pas valide!";
                return false
            } 
        })

        // Vérification du champ email
        const emailError = document.getElementById("emailErrorMsg");
        email.addEventListener("input", function (e) {
            if (matchEmail.test(e.target.value)) {
                emailError.innerHTML = "";
            } else {
                emailError.innerHTML = "L'email n'est pas valide!";
                return false
            } 
        })

        //====================================================
        // validation du formulaire
        //====================================================
        const orderSend = document.getElementById("order");
        let firstNameField = document.getElementById("firstName");
        let lastNameField = document.getElementById("lastName");
        let addressField = document.getElementById("address");
        let cityField = document.getElementById("city");
        let emailField = document.getElementById("email");

        orderSend.addEventListener('click', event => {
            event.preventDefault();
            // Si tous les champs sont correctement saisis alors...
            if (firstNameField.value != "" && lastNameField.value != "" && 
                addressField.value !="" && cityField.value !="" && emailField.value !="" && 
                firstNameError.innerHTML != "Le prénom n'est pas valide!" && 
                lastNameError.innerHTML != "Le nom n'est pas valide!" && 
                addressError.innerHTML != "L'adresse n'est pas valide!" && 
                cityError.innerHTML != "La ville n'est pas valide!" && 
                emailError.innerHTML != "L'email n'est pas valide!") {
                    
                // Indexation de la fonction d'envoi du formulaire
                send();
            } 
            // ..sinon le formulaire n'est pas envoyé
            else {
                alert("Veuillez complétez le formulaire!");
                return false
            }
        });

        //====================================================
        // Fonction d'envoi du formulaire 
        //====================================================
        function send() {

            // Initialisation d'un tableau costumer
            let costumer = [];

            costumer.push(
                firstNameField.value,
                lastNameField.value,
                addressField.value,
                cityField.value,
                emailField.value,
                cart[i].id
            );

            // sauvegarde de costumer
            localStorage.setItem('costumer', costumer);
            
            // Récupération de cosutmer
            localStorage.getItem(costumer);
            
            // Redirection vers la page Confirmation, export de l'url et du paramètre id "costumerID"
            window.location.href = `./confirmation.html?id=${costumer[5]}`;
        } 
    }
}