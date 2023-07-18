
// Funzione per caricare la pagina
function loadPage() {
  // Creo un nuovo elemento div con id "title" e classe "title"
  let div_1 = document.createElement('div');
  div_1.setAttribute('id', 'title');
  div_1.setAttribute('class', 'title');
  div_1.innerHTML = 'TITLE';

  // Ottengo l'elemento con id "main"
  const main = document.getElementById('main');
  // Aggiungo il nuovo elemento div al contenuto dell'elemento con id "main"
  main.appendChild(div_1);

  // Chiamo la funzione takeData() e successivamente la funzione generateMenu()
  takeData().then(() => {
    generateMenu();
    createScrollToTopContainer();
  });
}

let dati; // Dichiaro la variabile dati come variabile globale
function takeData() {
  // Effettuo una richiesta per ottenere il file JSON "products.json"
  return fetch('products.json')
    .then(response => response.json()) // Converto la risposta in formato JSON
    .then(data => {
      dati = data; // Assegno i dati ottenuti all'oggetto dati globale
    })
    .catch(error => {
      console.error(error); // Stampo eventuali errori nella console
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

    // Creo un elemento div per la card del prodotto
    var card = document.createElement('div');
    card.classList.add('card');

    // Aggiungo l'immagine del prodotto alla card
    var img = document.createElement('img');
    img.src = product.img;
    img.alt = product.title;
    card.appendChild(img);

    // Aggiungo il titolo del prodotto alla card
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

    // Aggiungo l'attributo "data-id" al div card con il valore dell'id del prodotto
    card.setAttribute('data-id', product.id);

    // Aggiungo il gestore di eventi click per aprire il modal
    card.addEventListener('click', function(event) {
      var productId = event.currentTarget.getAttribute('data-id');
      var selectedProduct = getProductById(productId);
      openModal(selectedProduct);
    });

    // Aggiungo il bottone "Carrello" alla card
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

    // Aggiungo la card del prodotto alla lista dei prodotti
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
  // Creo il div del modal
  const modal = document.createElement('div');
  modal.classList.add('modal');

  // Creo il contenuto del modal
  const content = document.createElement('div');
  content.classList.add('modal-content');

  // Aggiungo l'immagine del prodotto al modal
  const img = document.createElement('img');
  img.src = product.img;
  img.alt = product.title;
  content.appendChild(img);

  // Aggiungo il titolo del prodotto al modal
  const title = document.createElement('h2');
  title.textContent = product.title;
  content.appendChild(title);

  // Aggiungo il prezzo del prodotto al modal
  const price = document.createElement('p');
  price.textContent = 'Prezzo: ' + product.price + '€';
  content.appendChild(price);

  // Aggiungo i dettagli del prodotto al modal
  const details = document.createElement('ul');
  for (const key in product.spec) {
    const detailItem = document.createElement('li');
    detailItem.textContent = key + ': ' + product.spec[key];
    details.appendChild(detailItem);
  }
  content.appendChild(details);

  // Aggiungo il bottone "Carrello" al modal
  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Carrello';
  addToCartButton.classList.add('add-to-cart-button');
  addToCartButton.addEventListener('click', function() {
    addToCart(product);
  });
  content.appendChild(addToCartButton);

  // Aggiungo il pulsante di chiusura al modal
  const closeButton = document.createElement('button');
  closeButton.classList.add('modal-close');
  closeButton.textContent = 'Chiudi';
  closeButton.addEventListener('click', function() {
    closeModal(modal);
  });
  content.appendChild(closeButton);

  // Aggiungo il contenuto al modal
  modal.appendChild(content);

  // Aggiungo il modal al documento
  document.body.appendChild(modal);

  // Disabilito lo scroll del body quando il modal è aperto
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  // Rimuovo il modal dal documento
  document.body.removeChild(modal);

  // Abilito lo scroll del body quando il modal è chiuso
  document.body.style.overflow = 'auto';
}

function updateCartCount() {
  const cartButton = document.getElementById('cart-button');
  cartButton.textContent = 'Carrello (' + carrelloAcquisti.length + ')';
}

function openCartSidebar() {
  // Creo la sidebar del carrello
  var sidebar = document.createElement('div');
  sidebar.classList.add('cart-sidebar');

  // Creo il titolo della sidebar
  var title = document.createElement('h2');
  title.textContent = 'Carrello Acquisti';
  sidebar.appendChild(title);

  // Creo l'elenco dei prodotti nel carrello
  var productList = document.createElement('ul');
  productList.classList.add('product-list');

  // Aggiungo i prodotti al carrello
  carrelloAcquisti.forEach(function(product) {
    var listItem = document.createElement('li');
    var productPrice = parseFloat(product.price);

    if (product.sale && product.promo) {
      productPrice -= parseFloat(product.promo);
    }

    listItem.textContent = product.title + ' - Prezzo: ' + productPrice.toFixed(2) + '€';

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
        updateTotalPrice();
      }
    });

    listItem.appendChild(removeButton);
    productList.appendChild(listItem);
  });

  // Aggiungo il totale dei prezzi
  var totalText = document.createElement('p');
  totalText.textContent = 'Totale: ' + calculateTotalPrice().toFixed(2) + '€';
  totalText.setAttribute('id', 'total-price');
  sidebar.appendChild(totalText);

  // Aggiungo la productList alla sidebar
  sidebar.appendChild(productList);

  // Aggiungo il pulsante "Nascondi carrello" alla sidebar
  var hideCartButton = document.createElement('button');
  hideCartButton.textContent = 'Nascondi carrello';
  hideCartButton.classList.add('hide-cart-button');
  hideCartButton.addEventListener('click', function() {
    closeCartSidebar();
  });
  sidebar.appendChild(hideCartButton);

  // Aggiungo la sidebar al documento
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

// Aggiungo il bottone "Mostra carrello" in alto a destra
var showCartButton = document.createElement('button');
showCartButton.textContent = 'Mostra carrello';
showCartButton.classList.add('show-cart-button');
showCartButton.addEventListener('click', function() {
  openCartSidebar();
});
document.body.appendChild(showCartButton);

// Creo il div che contiene il bottone "scroll-to-top" dinamicamente
function createScrollToTopContainer() {
  var container = document.createElement('div');
  container.id = 'scroll-to-top-container';
  container.classList.add('scroll-to-top-container');

  // Creo il bottone "scroll-to-top" dinamicamente
  var button = document.createElement('button');
  button.id = 'scroll-to-top-button';
  button.className = 'scroll-to-top-button';
  button.textContent = 'Torna su';

  // Scrolla verso l'alto quando viene cliccato il bottone
  button.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Aggiungo il bottone al contenitore
  container.appendChild(button);

  // Aggiungo il div "scroll-to-top-container" al body
  document.body.appendChild(container);

  return container;
}
