// On cible les paramètres de l'url envoyée à partir de la page panier
let url = new URLSearchParams(window.location.search);

// Via la méthode get on récupère le paramètre id
const orderId = url.get("id");

// On insère l'id dans le message de confirmation
document.getElementById("orderId").textContent += `${orderId}`;

localStorage.clear()