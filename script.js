// Funzione per caricare la pagina
function loadPage() {
  // Creazione di un nuovo elemento div con id "title" e classe "title"
  let div_1 = document.createElement('div');
  div_1.setAttribute('id', 'title');
  div_1.setAttribute('class', 'title');
  div_1.innerHTML = 'TITLE';

  // Ottenimento dell'elemento con id "main"
  const main = document.getElementById('main');
  // Aggiunta del nuovo elemento div al contenuto dell'elemento con id "main"
  main.appendChild(div_1);

  // Chiamata alla funzione takeData() e successivamente alla funzione generateMenu()
  takeData().then(() => {
    generateMenu();
  });
}

let dati; // Dichiarazione della variabile dati come variabile globale
function takeData() {
  // Effettua una richiesta per ottenere il file JSON "products.json"
  return fetch('products.json')
    .then(response => response.json()) // Converte la risposta in formato JSON
    .then(data => {
      dati = data; // Assegna i dati ottenuti all'oggetto dati globale
    })
    .catch(error => {
      console.error(error); // Stampa eventuali errori nella console
    });
}

function generateMenu() {
  const keys = Object.keys(dati);
  const menu = document.createElement('ul');
  menu.setAttribute('id', 'menu');
  menu.setAttribute('class', 'menu');

  keys.forEach(key => {
    const menuItem = document.createElement('li');
    menuItem.textContent = key;
    menuItem.addEventListener('click', function() {
      createProductCards(key);
    });
    menu.appendChild(menuItem);
  });

  const menuContainer = document.getElementById('title');
  menuContainer.appendChild(menu);
}

function createProductCards(category) {
  // Rimuovo il div precedente per visualizzare le card in modo univoco
  let blank = document.getElementById('product-card');
  if (blank) {
    blank.remove();
  }

  // Creo il div che conterrà le card
  let productCard = document.createElement('div');
  productCard.setAttribute('id', 'product-card');
  productCard.setAttribute('class', 'product-card');
  menu.appendChild(productCard);

  // Itero il json per la creazione delle card
  var products = dati[category];
  for (var i = 0; i < products.length; i++) {
    var product = products[i];

    // Creare un elemento div per la card del prodotto
    var card = document.createElement('div');
    card.classList.add('card');

    // Aggiungere l'immagine del prodotto alla card
    var img = document.createElement('img');
    img.src = product.img;
    img.alt = product.title;
    card.appendChild(img);

    // Aggiungere il titolo del prodotto alla card
    var title = document.createElement('h2');
    title.textContent = product.title;
    card.appendChild(title);

    var price = document.createElement('p');

    if (product.sale) {
      var oldPrice = document.createElement('span');
      oldPrice.textContent = product.price + '€';
      oldPrice.classList.add('old-price');
      price.appendChild(oldPrice);

      var newPrice = parseFloat(product.price) - parseFloat(product.promo);
      var discountedPrice = document.createElement('span');
      discountedPrice.textContent = newPrice.toFixed(2) + '€';
      discountedPrice.classList.add('discounted-price');
      price.appendChild(discountedPrice);

      if (product.promo) {
        var promoLabel = document.createElement('span');
        promoLabel.textContent = 'PROMO';
        promoLabel.classList.add('promo-label');
        card.appendChild(promoLabel);
      }
    } else {
      price.textContent = 'Prezzo: ' + product.price + '€';
    }

    card.appendChild(price);

    // Aggiungi l'attributo "data-id" al div card con il valore dell'id del prodotto
    card.setAttribute('data-id', product.id);

    // Aggiungi il gestore di eventi click per aprire il modal
    card.addEventListener('click', function(event) {
      var productId = event.currentTarget.getAttribute('data-id');
      var selectedProduct = getProductById(productId);
      openModal(selectedProduct);
    });

    // Aggiungi il bottone "Carrello" alla card
    var addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Carrello';
    addToCartButton.classList.add('add-to-cart-button');
    addToCartButton.addEventListener('click', function(event) {
      event.stopPropagation();
      var productId = event.currentTarget.parentElement.getAttribute('data-id');
      var selectedProduct = getProductById(productId);
      addToCart(selectedProduct);
    });
    card.appendChild(addToCartButton);

    // Aggiungi la card del prodotto alla lista dei prodotti
    productCard.appendChild(card);
  }
}

function getProductById(productId) {
  var keys = Object.keys(dati);
  for (var i = 0; i < keys.length; i++) {
    var products = dati[keys[i]];
    for (var j = 0; j < products.length; j++) {
      if (products[j].id === productId) {
        return products[j];
      }
    }
  }
  return null;
}

var carrelloAcquisti = []; // Lista dei prodotti nel carrello

function addToCart(product) {
  carrelloAcquisti.push(product);
  updateCartCount();
}

function openModal(product) {
  // Crea il div del modal
  const modal = document.createElement('div');
  modal.classList.add('modal');

  // Crea il contenuto del modal
  const content = document.createElement('div');
  content.classList.add('modal-content');

  // Aggiungi l'immagine del prodotto al modal
  const img = document.createElement('img');
  img.src = product.img;
  img.alt = product.title;
  content.appendChild(img);

  // Aggiungi il titolo del prodotto al modal
  const title = document.createElement('h2');
  title.textContent = product.title;
  content.appendChild(title);

  // Aggiungi il prezzo del prodotto al modal
  const price = document.createElement('p');
  price.textContent = 'Prezzo: ' + product.price + '€';
  content.appendChild(price);

  // Aggiungi i dettagli del prodotto al modal
  const details = document.createElement('ul');
  for (const key in product.spec) {
    const detailItem = document.createElement('li');
    detailItem.textContent = key + ': ' + product.spec[key];
    details.appendChild(detailItem);
  }
  content.appendChild(details);

  // Aggiungi il bottone "Carrello" al modal
  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Carrello';
  addToCartButton.classList.add('add-to-cart-button');
  addToCartButton.addEventListener('click', function() {
    addToCart(product);
  });
  content.appendChild(addToCartButton);

  // Aggiungi il pulsante di chiusura al modal
  const closeButton = document.createElement('button');
  closeButton.classList.add('modal-close');
  closeButton.textContent = 'Chiudi';
  closeButton.addEventListener('click', function() {
    closeModal(modal);
  });
  content.appendChild(closeButton);

  // Aggiungi il contenuto al modal
  modal.appendChild(content);

  // Aggiungi il modal al documento
  document.body.appendChild(modal);

  // Disabilita lo scroll del body quando il modal è aperto
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  // Rimuovi il modal dal documento
  document.body.removeChild(modal);

  // Abilita lo scroll del body quando il modal è chiuso
  document.body.style.overflow = 'auto';
}

function updateCartCount() {
  const cartButton = document.getElementById('cart-button');
  cartButton.textContent = 'Carrello (' + carrelloAcquisti.length + ')';
}

function openCartSidebar() {
  // Creazione della sidebar del carrello
  var sidebar = document.createElement('div');
  sidebar.classList.add('cart-sidebar');

  // Creazione del titolo della sidebar
  var title = document.createElement('h2');
  title.textContent = 'Carrello Acquisti';
  sidebar.appendChild(title);

  // Creazione dell'elenco dei prodotti nel carrello
  var productList = document.createElement('ul');
  productList.classList.add('product-list');

  // Aggiungi i prodotti al carrello
  carrelloAcquisti.forEach(function(product) {
    var listItem = document.createElement('li');
    listItem.textContent = product.title + ' - Prezzo: ' + product.price + '€';

    var removeButton = document.createElement('button');
    removeButton.textContent = 'Rimuovi prodotto';
    removeButton.classList.add('remove-product-button');
    removeButton.addEventListener('click', function() {
      var listItem = this.parentNode;
      var productTitle = listItem.textContent.split(' - ')[0];
      var productToRemove = carrelloAcquisti.find(function(prod) {
        return prod.title === productTitle;
      });

      if (productToRemove) {
        carrelloAcquisti = carrelloAcquisti.filter(function(prod) {
          return prod !== productToRemove;
        });
        listItem.remove();
        updateCartCount();
      }
    });

    listItem.appendChild(removeButton);
    productList.appendChild(listItem);
  });

  // Aggiungi il totale dei prezzi
  var totalText = document.createElement('p');
  totalText.textContent = 'Totale: ' + calculateTotalPrice().toFixed(2) + '€';
  totalText.setAttribute('id', 'total-price');
  sidebar.appendChild(totalText);

  // Aggiungi la productList alla sidebar
  sidebar.appendChild(productList);

  // Aggiungi il pulsante "Nascondi carrello" alla sidebar
  var hideCartButton = document.createElement('button');
  hideCartButton.textContent = 'Nascondi carrello';
  hideCartButton.classList.add('hide-cart-button');
  hideCartButton.addEventListener('click', function() {
    closeCartSidebar();
  });
  sidebar.appendChild(hideCartButton);

  // Aggiungi la sidebar al documento
  document.body.appendChild(sidebar);
}




function closeCartSidebar() {
  const sidebar = document.querySelector('.cart-sidebar');
  document.body.removeChild(sidebar);
}



function calculateTotalPrice() {
  var totalPrice = 0;
  carrelloAcquisti.forEach(function(product) {
    var price = parseFloat(product.price);
    if (product.sale && product.promo) {
      price -= parseFloat(product.promo);
    }
    totalPrice += price;
  });
  return totalPrice;
}

// Aggiungi il bottone "Mostra carrello" in alto a destra
var showCartButton = document.createElement('button');
showCartButton.textContent = 'Mostra carrello';
showCartButton.classList.add('show-cart-button');
showCartButton.addEventListener('click', function() {
  openCartSidebar();
});
document.body.appendChild(showCartButton);




// creare il carrello
// creare bottone flottante "torna su"