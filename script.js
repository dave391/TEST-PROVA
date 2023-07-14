

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
  // Ottiene le chiavi dell'oggetto dati
  const keys = Object.keys(dati);

  // Creazione di un nuovo elemento ul (lista non ordinata)
  const menu = document.createElement('ul');
        menu.setAttribute('id', 'menu');
        menu.setAttribute('class', 'menu');

  // Itera attraverso le chiavi dell'oggetto dati
  keys.forEach(key => {
    // Creazione di un nuovo elemento li (elemento di lista)
    const menuItem = document.createElement('li');
    menuItem.textContent = key; // Imposta il testo dell'elemento di lista sulla chiave corrente
    menu.appendChild(menuItem); // Aggiunge l'elemento di lista alla lista
  });

  // Ottiene l'elemento con id "title"
  const menuContainer = document.getElementById('title');
  // Aggiunge la lista al contenuto dell'elemento con id "title"
  menuContainer.appendChild(menu);
}




