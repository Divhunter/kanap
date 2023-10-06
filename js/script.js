const products = [

  {
    "colors": ["Blue", "White", "Black"],
    "id": "107fb5b75607497b96722bda5b504926",
    "name": "Kanap Sinopé",
    "price": 1849,
    "imageUrl": "https://divhunter.github.io/kanap/assets/sinope.jpeg",
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt": "Photo d'un canapé bleu, deux places"
  },
  {
    "colors": ["Black/Yellow", "Black/Red"],
    "id": "415b7cacb65d43b2b5c1ff70f3393ad1",
    "name": "Kanap Cyllène",
    "price": 4499,
    "imageUrl": "https://divhunter.github.io/kanap/assets/cyllene.jpeg",
    "description": "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
    "altTxt": "Photo d'un canapé jaune et noir, quattre places"
  },
  {
    "colors": ["Green", "Red", "Orange"],
    "id": "055743915a544fde83cfdfc904935ee7",
    "name": "Kanap Calycé",
    "price": 3199,
    "imageUrl": "https://divhunter.github.io/kanap/assets/calyce.jpeg",
    "description": "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
    "altTxt": "Photo d'un canapé d'angle, vert, trois places"
  },
  {
    "colors": ["Pink", "White"],
    "id": "a557292fe5814ea2b15c6ef4bd73ed83",
    "name": "Kanap Autonoé",
    "price": 1499,
    "imageUrl": "https://divhunter.github.io/kanap/assets/autone.jpeg",
    "description": "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
    "altTxt": "Photo d'un canapé rose, une à deux place"
  },
  {
    "colors": ["Grey", "Purple", "Blue"],
    "id": "8906dfda133f4c20a9d0e34f18adcf06",
    "name": "Kanap Eurydomé",
    "price": 2249,
    "imageUrl": "https://divhunter.github.io/kanap/assets/eurydome.jpeg",
    "description": "Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.",
    "altTxt": "Photo d'un canapé gris, trois places"
  },
  {
    "colors": ["Grey", "Navy"],
    "id": "77711f0e466b4ddf953f677d30b0efc9",
    "name": "Kanap Hélicé",
    "price": 999,
    "imageUrl": "https://divhunter.github.io/kanap/assets/helice.jpeg",
    "description": "Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.",
    "altTxt": "Photo d'un canapé gris, deux places"
  },
  {
    "colors": ["Red", "Silver"],
    "id": "034707184e8e4eefb46400b5a3774b5f",
    "name": "Kanap Thyoné",
    "price": 1999,
    "imageUrl": "https://divhunter.github.io/kanap/assets/thyone.jpeg",
    "description": "EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.",
    "altTxt": "Photo d'un canapé rouge, deux places"
  },
  {
    "colors": ["Pink", "Brown", "Yellow", "White"],
    "id": "a6ec5b49bd164d7fbe10f37b6363f9fb",
    "name": "Kanap orthosie",
    "price": 3999,
    "imageUrl": "https://divhunter.github.io/kanap/assets/orthosie.jpeg",
    "description": "Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.",
    "altTxt": "Photo d'un canapé rose, trois places"
  }

];

localStorage.setItem('products', JSON.stringify(products));
 
let data = localStorage.getItem('products');
data = JSON.parse(data)
  
// Déclaration de variables, initialisation des tableaux, affectation des paramètres 
let paramId = [data[0].id, data[1].id, data[2].id, data[3].id,
                data[4].id, data[5].id, data[6].id, data[7].id];
let paramAlt = [data[0].altTxt, data[1].altTxt, data[2].altTxt, data[3].altTxt, 
                data[4].altTxt, data[5].altTxt, data[6].altTxt, data[7].altTxt];
let paramColors = [data[0].colors, data[1].colors, data[2].colors, data[3].colors, 
                    data[4].colors, data[5].colors, data[6].colors, data[7].colors];
let paramDescription = [data[0].description, data[1].description, data[2].description, 
                        data[3].description, data[4].description, data[5].description, 
                        data[6].description, data[7].description];
let paramImg = [data[0].imageUrl, data[1].imageUrl, data[2].imageUrl, data[3].imageUrl,
                data[4].imageUrl, data[5].imageUrl, data[6].imageUrl, data[7].imageUrl];
let paramName = [data[0].name, data[1].name, data[2].name, data[3].name,
                  data[4].name, data[5].name, data[6].name, data[7].name];
let paramPrice = [data[0].price, data[1].price, data[2].price, data[3].price, 
                  data[4].price, data[5].price, data[6].price, data[7].price];

// Instruction "FOR", création d'une boucle pour les paramètres
for (let i = 0; i < (paramId, paramAlt, paramColors, paramDescription, 
                    paramImg, paramName, paramPrice).length; i++) {

  // Définition de la fonction click
  const item = document.createElement("a");
  item.addEventListener("click", function(event) {

    // Prise en main de la fonction click
    event.preventDefault();

    // Redirection vers la page Produit avec export des paramètres dans l'url
    window.location.href = 
    ("./product.html?id=" + paramId[i] + "&altTxt=" + paramAlt[i] + "&colors=" + paramColors[i] 
                          + "&description=" + paramDescription[i] + "&imageUrl=" + paramImg[i]
                          + "&name=" + paramName[i] + "&price=" + paramPrice[i]);
  });

  // Initialisation des éléments html
  const itemContent = document.createElement("article");
  const productImg = document.createElement("img");
  productImg.alt = paramAlt[i];
  productImg.src = paramImg[i];
  const productName = document.createElement("h3");
  productName.textContent = paramName[i];
  const productDescription = document.createElement("p");
  productDescription.textContent = paramDescription[i];
  
  // Insertion des éléments html
  let items = document.getElementById("items")

  itemContent.appendChild(productImg);
  itemContent.appendChild(productDescription);
  itemContent.appendChild(productName);
  item.appendChild(itemContent);
  items.appendChild(item);
}