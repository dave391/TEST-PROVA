let body = document.querySelector('body');
let openCart = document.querySelector('.cartIcon');
let closeCart = document.querySelector('.closeCart');

//funzione per aprire il carrello cliccandoci sopra
openCart.addEventListener('click', ()=>{
    body.classList.add('active');
})

//funzione per chiudere il carrello cliccando sopra "chiudi"
closeCart.addEventListener('click', ()=> {
    body.classList.remove('active');
})

//array prodotti
let products = [
    {
        id: 178,
        name: 'COMPUTER',
        image: 'computer1.png',
        price: 500, 
        offer: false,
        details: [
            "Processore: xxxxx",
            "RAM: xxxx",
            "SSD: xxxx"
        ] 
        },
    {
        id: 209,
        name: 'COMPUTER',
        image: 'computer2.png',
        price: 200,
        offer: false,
        details: [
            "Processore: xxxxx",
            "RAM: xxxx",
            "SSD: xxxx"
        ] 
        },
    {
        id: 304,
        name: 'COMPUTER',
        image: 'computer3.png',
        price: 600,
        offer: true,
        details: [
            "Processore: xxxxx",
            "RAM: xxxx",
            "SSD: xxxx"
        ] 
    },
    {
        id: 425,
        name: 'COMPUTER',
        image: 'computer4.png',
        price: 400,
        offer: false,
        details: [
            "Processore: xxxxx",
            "RAM: xxxx",
            "SSD: xxxx"
        ] 
    },
    {
        id: 536,
        name: 'COMPUTER',
        image: 'computer5.png',
        price: 300,
        offer: false,
        details: [
            "Processore: xxxxx",
            "RAM: xxxx",
            "SSD: xxxx"
        ] 
    },

    {
        id: 699,
        name: 'SMARTPHONE',
        image: 'computer1.png',
        price: 500, 
        offer: false,
        details: [
            "Sistema operativo: xxxxx",
            "Capacità memoria: xxxx",
            "Dimensioni schermo: xxxx"
        ] 
        },
    {
        id: 714,
        name: 'SMARTPHONE',
        image: 'computer2.png',
        price: 200,
        offer: false,
        details: [
            "Sistema operativo: xxxxx",
            "Capacità memoria: xxxx",
            "Dimensioni schermo: xxxx"
        ] 
        },
    {
        id: 895,
        name: 'SMARTPHONE',
        image: 'computer3.png',
        price: 600,
        offer: false,
        details: [
            "Sistema operativo: xxxxx",
            "Capacità memoria: xxxx",
            "Dimensioni schermo: xxxx"
        ] 
    },
    {
        id: 935,
        name: 'SMARTPHONE',
        image: 'computer4.png',
        price: 400,
        offer: true,
        details: [
            "Sistema operativo: xxxxx",
            "Capacità memoria: xxxx",
            "Dimensioni schermo: xxxx"
        ] 
    },
    {
        id: 109,
        name: 'SMARTPHONE',
        image: 'computer5.png',
        price: 300,
        offer: false,
        details: [
            "Sistema operativo: xxxxx",
            "Capacità memoria: xxxx",
            "Dimensioni schermo: xxxx"
        ] 
    },
    {
        id: 112,
        name: 'TABLET',
        image: 'computer1.png',
        price: 500, 
        offer: true,
        details: [
            "Capacità memoria: xxxxx",
            "Dimensioni schermo: xxxx",
            "Risoluzione display: xxxx"
        ] 
        },
    {
        id: 125,
        name: 'TABLET',
        image: 'computer2.png',
        price: 200,
        offer: false,
        details: [
            "Capacità memoria: xxxxx",
            "Dimensioni schermo: xxxx",
            "Risoluzione display: xxxx"
        ] 
        },
    {
        id: 130,
        name: 'TABLET',
        image: 'computer3.png',
        price: 600,
        offer: false,
        details: [
            "Capacità memoria: xxxxx",
            "Dimensioni schermo: xxxx",
            "Risoluzione display: xxxx"
        ] 
    },
    {
        id: 148,
        name: 'TABLET',
        image: 'computer4.png',
        price: 400,
        offer: false,
        details: [
            "Capacità memoria: xxxxx",
            "Dimensioni schermo: xxxx",
            "Risoluzione display: xxxx"
        ] 
    },
    {
        id: 152,
        name: 'TABLET',
        image: 'computer5.png',
        price: 300,
        offer: false,
        details: [
            "Capacità memoria: xxxxx",
            "Dimensioni schermo: xxxx",
            "Risoluzione display: xxxx"
        ] 
    },
];

//per menu dinamico, richiamo le voci del menu e il div dove mettere i prodotti
let computerMenu = document.querySelector('.computer');
let smartphoneMenu = document.querySelector('.smartphone');
let tabletMenu = document.querySelector('.tablet');
let productBoxesDiv = document.querySelector('.productBoxes');

//apro la voce menu computer e inizializzo la funzione che inietta i prodotti del div dei prodotti
computerMenu.addEventListener('click', ()=>{
    productBoxesDiv.classList.add('show')
    initAppComputer();
}
);

//filtro l'array per scegliere i computer
let computer = products.filter(product => product.name === "COMPUTER");
console.log(computer);

//funzione per far apparire nel div dei prodotti i vari computer
function initAppComputer(){
        productBoxesDiv.innerHTML = '';
        computer.forEach((value, key) => {
            let newDiv = document.createElement('div');
            newDiv.classList.add('items');
            if(value.offer === false){
                newDiv.innerHTML = `
                <img src="img/${value.image}"/ width=100 heigth=100>
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()}€</div>
                <button onclick="reloadCart(${value.id})">Aggiungi al carrello</button>
                <button onclick="open_modal(${value.id})" class="openModal">Dettagli prodotto</button>`;
                productBoxesDiv.appendChild(newDiv);
            }else{
                newDiv.innerHTML = `
                <img src="img/${value.image}"/ width=100 heigth=100>
                <div class="title">${value.name}</div>
                <div class="price">${value.price.toLocaleString()}€</div>
                <button onclick="reloadCart(${value.id})">Aggiungi al carrello</button>
                <button onclick="open_modal(${value.id})" class="openModal">Dettagli prodotto</button>
                <img id="offerImage" src="img/offerta.png"/ width=50 heigth=50>`;
                productBoxesDiv.appendChild(newDiv);   
            }
        });
    };


//apro la voce menu smartphonr e inizializzo la funzione che inietta i prodotti del div dei prodotti
smartphoneMenu.addEventListener('click', ()=>{
    productBoxesDiv.classList.add('show')
    initAppSmartphone();
}
);

//filtro l'array per scegliere gli smartphone
let smartphone = products.filter(product => product.name === "SMARTPHONE");
console.log(smartphone);

//funzione per far apparire nel div dei prodotti i vari smartphone
function initAppSmartphone(){
    //if(productBoxesDiv.querySelector('.title') === null || products.name ==! "SMARTPHONE"){
        productBoxesDiv.innerHTML = '';
        smartphone.forEach((value, key) => {
            let newDiv = document.createElement('div');
            newDiv.classList.add('items');
            if(value.offer === false){
            newDiv.innerHTML = `
            <img src="img/${value.image}"/ width=100 heigth=100>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}€</div>
            <button onclick="reloadCart(${value.id})">Aggiungi al carrello</button>
            <button onclick="open_modal(${value.id})" class="openModal">Dettagli prodotto</button>`;
            productBoxesDiv.appendChild(newDiv);
        }else{
            newDiv.innerHTML = `
            <img src="img/${value.image}"/ width=100 heigth=100>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}€</div>
            <button onclick="reloadCart(${value.id})">Aggiungi al carrello</button>
            <button onclick="open_modal(${value.id})" class="openModal">Dettagli prodotto</button>
            <img id="offerImage" src="img/offerta.png"/ width=50 heigth=50>`;
            productBoxesDiv.appendChild(newDiv);   
        }
        });
    };
//};

//apro la voce menu tablet e inizializzo la funzione che inietta i prodotti del div dei prodotti
tabletMenu.addEventListener('click', ()=>{
    productBoxesDiv.classList.add('show')
    initAppTablet();
}
);

//filtro l'array per scegliere i tablet
let tablet = products.filter(product => product.name === "TABLET");
console.log(tablet);

//funzione per far apparire nel div dei prodotti i vari tablet
function initAppTablet(){
    productBoxesDiv.innerHTML = '';
    tablet.forEach((value, key) => {
    console.log(key)
    let newDiv = document.createElement('div');
    newDiv.classList.add('items');
    if(value.offer === false){
        newDiv.innerHTML = `
        <img src="img/${value.image}"/ width=100 heigth=100>
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}€</div>
        <button onclick="reloadCart(${value.id})">Aggiungi al carrello</button>
        <button onclick="open_modal(${value.id})" class="openModal">Dettagli prodotto</button>`;
        productBoxesDiv.appendChild(newDiv);
    }else{
        newDiv.innerHTML = `
        <img src="img/${value.image}"/ width=100 heigth=100>
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}€</div>
        <button onclick="reloadCart(${value.id})">Aggiungi al carrello</button>
        <button onclick="open_modal(${value.id})" class="openModal">Dettagli prodotto</button>
        <img id="offerImage" src="img/offerta.png"/ width=50 heigth=50>`;
        productBoxesDiv.appendChild(newDiv);   
        }
    });
};

//targettizzo gli elementi del modal
const openModal = document.querySelector('.openModal');
const productModal = document.querySelector('.productModal');
const closeModal = document.querySelector('.closeModal');
const modalContent = document.querySelector('.modal');

//funzione per aprire il modal richiamata nel bottone "Dettagli prodotto" creato dentro la funzione initApp()
function open_modal(id) {
    productModal.classList.add('show');
    infoModal(id);
};


//funzione per inserire nel modal i dati del prodotto
function infoModal(id){
    let newLi = document.createElement('li');
    modalContent.innerHTML = '';
    products.forEach((value) => {
    if(value['id'] === id) {
            newLi.innerHTML = `
            <img src="img/${value.image}"/width=200 heigth=200>
            <div id="productName">${value.name}</div>
            <div> cod:${value.id}</div>
            <div>${value.details}</div>
            <div>${value.price.toLocaleString()}€</div>
            <button class="closeModal" onclick="closingModal()">Chiudi</button>
            `;
            modalContent.appendChild(newLi);
    }});
};

function closingModal() {
    productModal.classList.remove('show');
};

//CARRELLO
//targettizzo gli elementi che mi servono per far funzionare il carrello
let listCart = document.querySelector('.listCart');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

//dichiaro un array vuoto dove andranno i prodotti del carrello
let listCards = [];


//funzione per caricare i prodotti nel carrello
var totalPrice = 0;

function reloadCart(id){
    let count = 0;
    products.forEach((value) => {
        let newLi = document.createElement('li');
        newLi.id = id;
        if(value['id'] === id) {
            totalPrice = totalPrice + value.price;
            listCards.push(id)
            newLi.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div> ${value.name} </div>
                <div>cod: ${value.id}</div>
                <div> ${value.price.toLocaleString()}€</div>
            `;
            listCart.appendChild(newLi);
        }
    quantity.innerText = listCards.length;
    total.innerText = totalPrice.toLocaleString() + ' €';
    })
}

