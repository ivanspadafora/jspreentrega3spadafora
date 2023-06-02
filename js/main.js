// Array de Productos

const productos = [
    {
        id: 1,
        nombre: "Heladera",
        precio: 120000,
        color: "Blanco",
        imagen: "./assets/img/heladera.webp"
    },
    {
        id: 2,
        nombre: "Cocina",
        precio: 80000,
        color: "Acero Inoxidable",
        imagen: "./assets/img/cocina.webp"
    },
    {
        id: 3,
        nombre: "Lavarropas",
        precio: 150000,
        color: "Gris",
        imagen: "./assets/img/lavarropas.webp"
    },
    {
        id: 4,
        nombre: "Televisor",
        precio: 180000,
        color: "Negro",
        imagen: "./assets/img/televisor.webp"
    },
    {
        id: 5,
        nombre: "Celular",
        precio: 220000,
        color: "Azul",
        imagen: "./assets/img/celular.jpg"
    },
    {
        id: 6,
        nombre: "Aire Acondicionado",
        precio: 100000,
        color: "Blanco",
        imagen: "./assets/img/aireacondicionado.jpg"
    },
    {
        id: 7,
        nombre: "Microondas",
        precio: 60000,
        color: "Marrón",
        imagen: "./assets/img/microondas.png"
    },
    {
        id: 8,
        nombre: "Horno Eléctrico",
        precio: 90000,
        color: "Acero",
        imagen: "./assets/img/hornoelectrico.jpg"
    },
    {
        id: 9,
        nombre: "PC de Escritorio",
        precio: 250000,
        color: "Negro",
        imagen: "./assets/img/pc.jpg"
    },
    {
        id: 10,
        nombre: "Secarropas",
        precio: 50000,
        color: "Gris",
        imagen: "./assets/img/secarropas.jpg"
    },
    {
        id: 11,
        nombre: "Lavavajillas",
        precio: 300000,
        color: "Blanco",
        imagen: "./assets/img/lavavajillas.jpg"
    },
    {
        id: 12,
        nombre: "Tablet",
        precio: 110000,
        color: "Verde",
        imagen: "./assets/img/tablet.webp"
    }]
 
let productosEnCarrito = [];
const contenedorElect = document.querySelector("#contenedor-elect");
const contadorCarrito = document.querySelector("#contador-carrito");
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

function mostrarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.classList.add("col-lg-3");
        div.innerHTML = `
            <div class="card shadow card-elect">
                <img src="${producto.imagen}" class="card-img-top img-elect" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title titulo-elect">${producto.nombre}</h5>
                    <p class="precio-elect">${producto.color}</p>
                    <p class="precio-elect">$${producto.precio}</p>
                    <button class="btn-card boton-agregar-elect" id="${producto.id}"><span>Agregar</span></button>
                </div>
            </div>
        `;
    
        contenedorElect.append(div);   
    });   
};

function agregarProdAlCarrito(e) {
    
    const idBoton = parseInt(e.currentTarget.id);
    const productoAgregar = productos.find(producto => producto.id === parseInt(idBoton));

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const i = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[i]. cantidad++;
    } else {
        productoAgregar.cantidad = 1;
        productosEnCarrito.push(productoAgregar);
    }
    
    actualizarContadorCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));    
};

function actualizarContadorCarrito() {
    let contador = productosEnCarrito.reduce((acu, producto) => acu + producto.cantidad, 0);
    //contadorCarrito.innerHTML = contador;
};
 
/************************************************************************************************************/
 
mostrarProductos();
const botonesAgregar = document.querySelectorAll(".boton-agregar-elect");
                            
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarContadorCarrito();
} else {
    productosEnCarrito = [];
}

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarProdAlCarrito);
});