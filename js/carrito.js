function mostrarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("deshabilitado");
        contenedorCarritoProductos.classList.remove("deshabilitado");
        contenedorCarritoAcciones.classList.remove("deshabilitado");
        contenedorCarritoComprado.classList.add("deshabilitado");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-elect");
            div.innerHTML = `
                <img class="carrito-elect-img" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-elect-titulo">
                    <small>Nombre</small>
                    <p class="carrito-elect-detalle">${producto.nombre}</p>
                </div>
                <div class="carrito-elect-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-elect-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-elect-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-elect-eliminar" id=${producto.id}><i class="fa-sharp fa-solid fa-trash"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        });
       
    } else {
        contenedorCarritoVacio.classList.remove("deshabilitado");
        contenedorCarritoProductos.classList.add("deshabilitado");
        contenedorCarritoAcciones.classList.add("deshabilitado");
        contenedorCarritoComprado.classList.add("deshabilitado");
    }

    actualizarTotal(); 
};

function EliminarProdDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    mostrarProductosCarrito();
    botonesEliminar = document.querySelectorAll(".carrito-indu-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", EliminarProdDelCarrito);
    });
};

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    mostrarProductosCarrito();
};

function actualizarTotal() {
    const total = productosEnCarrito.reduce((acu, prod) => acu + (prod.precio * prod.cantidad), 0);
    carritoAccionesTotal.innerText = `$${total}`;
};

function finalizarCompra() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("deshabilitado");
    contenedorCarritoProductos.classList.add("deshabilitado");
    contenedorCarritoAcciones.classList.add("deshabilitado");
    contenedorCarritoComprado.classList.remove("deshabilitado");
};