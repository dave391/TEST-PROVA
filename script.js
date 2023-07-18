////////GESTIONE CARICAMENTO INIZIALE////////

// Funzione per caricare la pagina
function loadPage() {

  // Creo il div che conterrà il titolo
  const title = document.createElement('div');
  title.setAttribute('id', 'title');
  title.setAttribute('class', 'title');
  title.innerHTML = 'TITLE';

  // Ottengo l'elemento con id "main"
  const main = document.getElementById('main');
  // Aggiungo il nuovo elemento div al contenuto dell'elemento con id "main"
  main.appendChild(title);

  // Chiamo la funzione takeData() e successivamente la funzione generateMenu()
  takeData().then(() => {
    generateMenu();
    createScrollToTopContainer();
  });
}

////////GESTIONE RICHIESTA DA JSON////////

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

////////GESTIONE MENU'////////

// Genero il menu dinamico basato sui dati ottenuti
function generateMenu() {
  // Ottengo le chiavi dell'oggetto dati
  const keys = Object.keys(dati);
  // Creo un elemento <ul> per il menu
  const menu = document.createElement('ul');
  // Imposto gli attributi id e class per il menu
  menu.setAttribute('id', 'menu');
  menu.setAttribute('class', 'menu');

  // Itero ogni chiave
  for (let i = 0; i < keys.length; i++) {
    // Creo un elemento <li> per ogni voce del menu
    const menuItem = document.createElement('li');
    // Imposto il testo della voce del menu come la chiave corrente
    menuItem.textContent = keys[i];
    // Aggiungo un gestore di eventi click per la voce del menu
    menuItem.addEventListener('click', function() {
      // Creo le card dei prodotti usando la chiave corrente come parametro
      createProductCards(keys[i]);
    });
    // Aggiungo la voce del menu al menu
    menu.appendChild(menuItem);
  }

  // Ottengo il contenitore del menu con id "title"
  const menuContainer = document.getElementById('title');
  // Aggiungo il menu al contenitore
  menuContainer.appendChild(menu);
}

////////GESTIONE CARD////////

function createProductCards(category) {
  // Rimuovo il div precedente per fare in modo che le card si generino sempre nello stesso div
  let removeDiv = document.getElementById('product-card');
  if (removeDiv) {
    removeDiv.remove();
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
    card.setAttribute('id', 'card');
    card.setAttribute('class', 'card');

    // Aggiungo l'immagine del prodotto alla card
    var img = document.createElement('img');
    img.src = product.img;
    img.alt = product.title;
    card.appendChild(img);

    // Aggiungo il titolo del prodotto alla card
    var title = document.createElement('h2');
    title.textContent = product.title;
    card.appendChild(title);

    // Aggiungo il prezzo del prodotto alla card

  // Creo un nuovo elemento <p> per visualizzare il prezzo
  var price = document.createElement('p');

  // Verifico se il prodotto è in promozione
  if (product.sale) {
    // Se il prodotto è in promozione, creo un elemento <span> per il vecchio prezzo
    var oldPrice = document.createElement('span');
    // Imposto il testo del vecchio prezzo come il prezzo del prodotto seguito dal simbolo dell'euro
    oldPrice.textContent = product.price + '€';
    // Setto la classe e id 'old-price' al vecchio prezzo
    oldPrice.setAttribute('id', 'old-price');
    oldPrice.setAttribute('class', 'old-price')
    // Aggiungo il vecchio prezzo all'elemento <p>
    price.appendChild(oldPrice);

    // Calcolo il nuovo prezzo scontato sottraendo il valore promozionale dal prezzo del prodotto
    var newPrice = parseFloat(product.price) - parseFloat(product.promo);
    // Creo un nuovo elemento <span> per il prezzo scontato
    var discountedPrice = document.createElement('span');
    // Imposto il testo del prezzo scontato con due cifre decimali e il simbolo dell'euro
    discountedPrice.textContent = newPrice.toFixed(2) + '€';
    // setto la classe e id 'discounted-price' al prezzo scontato
    discountedPrice.setAttribute('id', 'discounted-price');
    discountedPrice.setAttribute('class', 'discounted-price');
    // Aggiungo il prezzo scontato all'elemento <p>
    price.appendChild(discountedPrice);

  
    // Creo un nuovo elemento <span> per l'etichetta "promo"
    var promoLabel = document.createElement('span');
    // Imposto il testo dell'etichetta promozionale come 'PROMO'
    promoLabel.textContent = 'PROMO';
    // Aggiungo la classe 'promo-label' all'etichetta promozionale
    promoLabel.setAttribute('id', 'promo-label');
    promoLabel.setAttribute('class', 'promo-label');
    // Aggiungo l'etichetta promozionale alla card
    card.appendChild(promoLabel);
   
  } else {
    // Se il prodotto non è in promozione, imposto il prezzo standard
    price.textContent = 'Prezzo: ' + product.price + '€';
  }

  // Aggiungo l'elemento <p> contenente il prezzo alla card
  card.appendChild(price);

  // Aggiungo l'attributo "data-id" al div card con il valore dell'id del prodotto (servirà dopo per la gestione dei click)
  card.setAttribute('data-id', product.id);

   // Aggiungo un listener di eventi al click sull'elemento card
  card.addEventListener('click', function(event) {
  // Ottengo l'ID del prodotto dall'attributo 'data-id' dell'elemento corrente
  var productId = event.currentTarget.getAttribute('data-id');
  // Ottengo il prodotto selezionato utilizzando l'ID ottenuto
  var selectedProduct = getProductById(productId);
  // Apro il modal con il prodotto selezionato
  openModal(selectedProduct);
  });


  // Aggiungo il bottone "Carrello" alla card
  var addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Carrello';
  addToCartButton.setAttribute('id', 'add-to-cart-button');
  addToCartButton.setAttribute('class', 'add-to-cart-button');
  // Aggiungo un listener di eventi al click sul pulsante "Carrello"
  addToCartButton.addEventListener('click', (event) => {
  // Interrompo la propagazione dell'evento per fare in modo che al click sul bottone non si apra anche il modal
  event.stopPropagation();
  // Ottengo il genitore dell'elemento corrente
  const parentElement = event.currentTarget.parentElement;
  // Ottengo l'ID del prodotto dal genitore utilizzando la proprietà 'dataset'
  const productId = parentElement.dataset.id;
  // Ottengo il prodotto selezionato utilizzando l'ID ottenuto
  const selectedProduct = getProductById(productId);
  // Aggiungo il prodotto al carrello utilizzando la funzione 'addToCart'
  addToCart(selectedProduct);
});
  // Aggiungo il pulsante "Carrello" all'elemento card
  card.appendChild(addToCartButton);

  // Aggiungo la card del prodotto all'elemento productCard (lista dei prodotti)
  productCard.appendChild(card);

  }
}

// Definisco una funzione per ottenere un prodotto tramite il suo ID
function getProductById(productId) {
  // Ottengo tutte le chiavi dell'oggetto dati
  var keys = Object.keys(dati);
  // Itero attraverso le chiavi
  for (var i = 0; i < keys.length; i++) {
    // Ottengo l'array di prodotti corrispondente alla chiave corrente
    var products = dati[keys[i]];
    // Itero attraverso i prodotti nell'array
    for (var j = 0; j < products.length; j++) {
      // Controllo se l'ID del prodotto corrente corrisponde all'ID cercato
      if (products[j].id === productId) {
        // Restituisco il prodotto corrente se l'ID corrisponde
        return products[j];
      }
    }
  }
  // Restituisco null se non viene trovato nessun prodotto con l'ID corrispondente
  return null;
}

////////GESTIONE CARRELLO////

var carrelloAcquisti = []; // Lista dei prodotti nel carrello

function addToCart(product) {
  carrelloAcquisti.push(product);
  updateCartCount();
}


////////GESTIONE POP-UP (MODALE)////

function openModal(product) {
  // Creo il div del modal
  const modal = document.createElement('div');
  modal.setAttribute('id', 'modal');
  modal.setAttribute('class', 'modal');

  // Creo il contenuto del modal
  const content = document.createElement('div');
  content.setAttribute('id', 'modal-content');
  content.setAttribute('class', 'modal-content');

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

 // Aggiungo un elemento <ul> per contenere i dettagli del prodotto
  // Creo un elemento <ul> per contenere i dettagli del prodotto
  const details = document.createElement('ul');
  // Itero su ogni chiave dell'oggetto "product.spec"
  for (const key in product.spec) {
  // Creo un elemento <li> per ogni dettaglio
  const detailItem = document.createElement('li');
  // Imposto il testo dell'elemento <li> 
  detailItem.textContent = key + ': ' + product.spec[key];
  // Aggiungo l'elemento <li> all'elemento <ul>
  details.appendChild(detailItem);
  }
  // Aggiungo l'elemento <ul> contenente i dettagli al contenuto del modal
  content.appendChild(details);


  // Aggiungo il bottone "Carrello" al modal
  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Carrello';
  addToCartButton.setAttribute('id', 'add-to-cart-button');
  addToCartButton.setAttribute('class', 'add-to-cart-button');
  // Aggiungo la funzione di "aggiungi al carrello"
  addToCartButton.addEventListener('click', function() {
  addToCart(product);
  });
  content.appendChild(addToCartButton);

  // Aggiungo il pulsante di chiusura al modal
  const closeButton = document.createElement('button');
  closeButton.setAttribute('id', 'modal-close');
  closeButton.setAttribute('class', 'modal-close');
  closeButton.textContent = 'Chiudi';
  // Aggiungo la funzione di chiusura del modal
  closeButton.addEventListener('click', function() {
  closeModal(modal);
  });
  content.appendChild(closeButton);

  // Aggiungo il contenuto al modal
  modal.appendChild(content);

  // Aggiungo il modal al documento
  document.body.appendChild(modal);

}
  // Funzione per chiudere il modal
function closeModal(modal) {
  // Rimuovo il modal dal documento
  document.body.removeChild(modal);
}

///////GESTIONE SIDEBAR PER VISUAALIZZAZIONE CARRELLO/////

function openCartSidebar() {
  // Creo la sidebar del carrello
  var sidebar = document.createElement('div');
  sidebar.setAttribute('id', 'cart-sidebar');
  sidebar.setAttribute('class', 'cart-sidebar');

  // Creo il titolo della sidebar
  var title = document.createElement('h2');
  title.textContent = 'Carrello Acquisti';
  sidebar.appendChild(title);

  // Creo l'elenco dei prodotti nel carrello
  var productList = document.createElement('ul');
  productList.setAttribute('id', 'product-list');
  productList.setAttribute('class', 'product-list');

  // Aggiungo i prodotti al carrello
  carrelloAcquisti.forEach(function(product) {
    // Creo un nuovo elemento <li> per ogni prodotto nel carrello
    var listItem = document.createElement('li');
    // Converto il prezzo del prodotto in un numero decimale utilizzando parseFloat()
    var productPrice = parseFloat(product.price);
    // Verifico se il prodotto è in promozione
    if (product.sale) {
      // Sottraggo il prezzo promozionale dal prezzo del prodotto
      productPrice -= parseFloat(product.promo);
    }
    // Imposto il testo del nuovo elemento <li> con il titolo del prodotto e il prezzo formattato
    listItem.textContent = product.title + ' - Prezzo: ' + productPrice.toFixed(2) + '€';
  
    // Creo un nuovo pulsante per rimuovere il prodotto dal carrello
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Rimuovi prodotto';
    removeButton.setAttribute('id', 'remove-product-button');
    removeButton.setAttribute('class', 'remove-product-button');
    
    // Aggiungo un listener per l'evento 'click' al pulsante di rimozione
    removeButton.addEventListener('click', function() {
      // Recupero l'elemento <li> genitore del pulsante di rimozione
      var listItem = this.parentNode;
      
      // Eseguo lo split del testo per ottenere il titolo del prodotto
      var productTitle = listItem.textContent.split(' - ')[0];
      
      // Trovo il prodotto da rimuovere nell'array 'carrelloAcquisti' in base al titolo
      var productToRemove = carrelloAcquisti.find(function(prod) {
        return prod.title === productTitle;
      });
  
      // Verifico se il prodotto è stato trovato nell'array 'carrelloAcquisti'
      if (productToRemove) {
        // Rimuovo il prodotto dall'array 'carrelloAcquisti' utilizzando il metodo filter()
        carrelloAcquisti = carrelloAcquisti.filter(function(prod) {
          return prod !== productToRemove;
        });
        
        // Rimuovo l'elemento <li> dal DOM
        listItem.remove();
        
        // Aggiorno il prezzo totale del carrello
        updateTotalPrice();
      }
    });
  
    // Aggiungo il pulsante di rimozione all'elemento <li>
    listItem.appendChild(removeButton);
    
    // Aggiungo l'elemento <li> al contenitore della lista dei prodotti nel carrello
    productList.appendChild(listItem);
  });
  

  // Aggiungo il totale dei prezzi
  var totalText = document.createElement('p');
  totalText.textContent = 'Totale: ' + calculateTotalPrice().toFixed(2) + '€';
  totalText.setAttribute('id', 'total-price');
  totalText.setAttribute('id', 'total-price');
  sidebar.appendChild(totalText);

  // Aggiungo la productList alla sidebar
  sidebar.appendChild(productList);

  // Aggiungo il pulsante "Nascondi carrello" alla sidebar
  var hideCartButton = document.createElement('button');
  hideCartButton.textContent = 'Nascondi carrello';
  hideCartButton.setAttribute('id', 'hide-cart-button');
  hideCartButton.setAttribute('class', 'hide-cart-button');
  // Aggiungo un listener sul bottone associato alla funzione di chiusura della sidebar
  hideCartButton.addEventListener('click', function() {
    closeCartSidebar();
  });
  sidebar.appendChild(hideCartButton);

  // Aggiungo la sidebar al documento
  document.body.appendChild(sidebar);
}
  // Funzione di chiusura della sidebar
function closeCartSidebar() {
  const sidebar = document.getElementById('cart-sidebar');
  document.body.removeChild(sidebar);
}

  // Funzione per calcolare il totale
  function calculateTotalPrice() {
    // Inizializzo il totale a 0
    var totalPrice = 0;
    // Itero sugli elementi del carrello degli acquisti
    for (var i = 0; i < carrelloAcquisti.length; i++) {
      // Ottengo il prodotto corrente
      var product = carrelloAcquisti[i];
      // Estraggo il prezzo del prodotto come valore numerico
      var price = parseFloat(product.price);
      // Controllo se il prodotto è in promozione
      if (product.sale ) {
        // Sottraggo il valore della promozione dal prezzo
        price -= parseFloat(product.promo);
      }
      // Aggiungo il prezzo del prodotto al totale
      totalPrice += price;
    }
  
    // Restituisco il totale calcolato
    return totalPrice;
  }
  

// Aggiungo il bottone "Mostra carrello" in alto a destra
var showCartButton = document.createElement('button');
showCartButton.textContent = 'Mostra carrello';
showCartButton.setAttribute('id', 'show-cart-button');
showCartButton.setAttribute('class', 'show-cart-button');
//  Aggiungo un listener associato alla funzione per aprire la sidebar
showCartButton.addEventListener('click', function() {
  openCartSidebar();
});
document.body.appendChild(showCartButton);


///////GESTIONE BOTTONE PER SCORRERE/////


// Creo il div che contiene il bottone "scroll-to-top" dinamicamente
function createScrollToTopContainer() {
  var container = document.createElement('div');
  container.setAttribute('id', 'scroll-top-container');
  container.setAttribute('class', 'scroll-top-container');

  // Creo il bottone "scroll-to-top" dinamicamente
  var button = document.createElement('button');
  button.setAttribute('id', 'scroll-top-button');
  button.setAttribute('class', 'scroll-top-button');
  button.textContent = 'Torna su';

  // Scrolla verso l'alto quando viene cliccato il bottone
  button.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Aggiungo il bottone al contenitore
  container.appendChild(button);

  // Aggiungo il div "scroll-top-container" al body
  document.body.appendChild(container);

  return container;
}
