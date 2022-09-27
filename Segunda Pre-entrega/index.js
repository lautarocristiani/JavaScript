class Producto{
    constructor(nombre, precio, id){
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
    }
}

mostrar();
mostrarCarrito();

// FUNCIONES LISTA PRODUCTOS

function agregar() {
    let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    let listaAgregar = [];
    let nombre = document.getElementById("nombre").value;
    let precio = parseInt(document.getElementById("precio").value);
    let id = parseInt(document.getElementById("idAgregar").value);
    if (listaProductos == null) {
        if (Number.isNaN(precio) || Number.isNaN(id) || listaAgregar.find((p) => p.id == id) || listaAgregar.find((p) => p.nombre.toUpperCase() == nombre.toUpperCase())) {
            alert("Ingrese correctamente los valores");
        } else {
            listaAgregar.push(new Producto(nombre, precio, id));
            localStorage.setItem("listaProductos", JSON.stringify(listaAgregar));
            alert("Producto agregado con éxito");
            mostrar();
        }
    } else{
        for (const p of listaProductos) {
            listaAgregar.push(new Producto(p.nombre, p.precio, p.id))
        }
        if (Number.isNaN(precio) || Number.isNaN(id) || listaAgregar.find((p) => p.id == id) || listaAgregar.find((p) => p.nombre.toUpperCase() == nombre.toUpperCase())) {
            alert("Ingrese correctamente los valores");
        } else {
            listaAgregar.push(new Producto(nombre, precio, id));
            localStorage.setItem("listaProductos", JSON.stringify(listaAgregar));
            alert("Producto agregado con éxito");
            mostrar();
        }
    }
}



function eliminar(){
    let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    let idEliminar = parseInt(document.querySelector("#idEliminar").value);
    let encontro = 0;
    let listaEliminar = [];
    for (const p of listaProductos) {
        listaEliminar.push(new Producto(p.nombre, p.precio, p.id))
    }
    for (i = 0; i < listaEliminar.length; i++) {
        if (listaEliminar[i].id==idEliminar) {
            encontro++;
            listaEliminar.splice(i, 1);
            localStorage.setItem("listaProductos", JSON.stringify(listaEliminar))
            mostrar();
            alert("Producto eliminado con éxito.");
        }
    }
    if (encontro == 0) {
        alert("No se ha encontrado el producto ingresado.");
    }
}



function modificar() {
    let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    let idModificar = parseInt(document.querySelector("#idModificar").value);
    let listaModificar = [];
    for (const p of listaProductos) {
        listaModificar.push(new Producto(p.nombre, p.precio, p.id))
    }
    let resultado = listaModificar.find((p) => p.id == idModificar);
    if (resultado != null) {
        let id = parseInt(prompt("Ingrese el nuevo ID del producto"));
        while (Number.isNaN(id) || listaModificar.find((p) => p.id == id)) {
            id = parseInt(prompt("Ingrese correctamente el nuevo ID"));
        }
        let nombre = prompt("Ingrese el nuevo nombre del producto");
        while (nombre == "" || listaModificar.find((p) => p.nombre.toUpperCase() == nombre.toUpperCase())) {
            nombre = prompt("Ingrese correctamente el nuevo NOMBRE");
        }
        let precio = parseInt(prompt("Ingrese el nuevo precio del producto"));
        while (Number.isNaN(precio)) {
            precio = parseInt(prompt("Ingrese correctamente el nuevo PRECIO"));
        }
        listaModificar.forEach(producto => {
            if (producto.id == idModificar) {
                producto.id = id;
                producto.nombre = nombre;
                producto.precio = precio;
            }});
            localStorage.setItem("listaProductos", JSON.stringify(listaModificar));
        } else {
        alert("El ID ingresado no se encuentra en la lista")
    }
    mostrar();
}



function mostrar() {
    let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    let limpiarLista = document.querySelectorAll(".itemLista");
    for (let i = 0; i < limpiarLista.length; i++) {
        limpiarLista[i].remove();
    }
    let listaMostrar = [];
    if (listaProductos == null) {
        let contenedor = document.querySelector("#contenedor");
        let noProductos = document.createElement("h3");
        noProductos.className = "nolista";
        noProductos.innerHTML = "No hay productos en la lista!";
        contenedor.append(noProductos);
    } else {
        for (const p of listaProductos) {
            listaMostrar.push(new Producto(p.nombre, p.precio, p.id))
        }
        if (document.querySelector(".nolista")!=null) {
            document.querySelector(".nolista").remove();
        }
        let contenedor = document.querySelector("#contenedor");
        listaMostrar.forEach(producto => {
            let p = document.createElement("h3");
            p.className = "itemLista"
            p.innerHTML = `ID: ${producto.id} --- Producto: ${producto.nombre} --- Precio: ${producto.precio}`;
            contenedor.append(p);
        })
    }
}

function limpiarLista() {
    localStorage.clear();
    mostrar();
}

// FUNCIONES CARRITO

function agregarCarrito() {
    let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    let listaCarrito = JSON.parse(sessionStorage.getItem("listaCarrito"));
    let listaAgregar = [];
    let id = parseInt(document.getElementById("idCarrito").value);
    let cantidad = parseInt(document.getElementById("cantidadCarrito").value);
    if (listaCarrito == null) {
        if (Number.isNaN(id) || Number.isNaN(cantidad) || listaProductos.some((p) => p.id == id)) {
            listaProductos.forEach(p => {
                if (p.id == id) {
                    for (let i = 0; i < cantidad; i++) {
                        listaAgregar.push(new Producto(p.nombre, p.precio, p.id));
                    }
                }
            });
            sessionStorage.setItem("listaCarrito", JSON.stringify(listaAgregar));
            mostrarCarrito();
        } else {
            alert("Ingrese correctamente los valores");
        }
    } else{
        for (const p of listaCarrito) {
            listaAgregar.push(new Producto(p.nombre, p.precio, p.id))
        }
        if (Number.isNaN(id) || Number.isNaN(cantidad) || listaProductos.find((p) => p.id == id)) {
            listaProductos.forEach(p => {
                if (p.id == id) {
                    for (let i = 0; i < cantidad; i++) {
                        listaAgregar.push(new Producto(p.nombre, p.precio, p.id));
                    }
                }
            });
            sessionStorage.setItem("listaCarrito", JSON.stringify(listaAgregar));
            mostrarCarrito();
        } else {
            alert("Ingrese correctamente los valores");
        }
    }
}

function mostrarCarrito() {
    let listaCarrito = JSON.parse(sessionStorage.getItem("listaCarrito"));
    let limpiarLista = document.querySelectorAll(".itemCarrito");
    for (let i = 0; i < limpiarLista.length; i++) {
        limpiarLista[i].remove();
    }
    let listaMostrar = [];
    if (listaCarrito == null) {
        let contenedor = document.querySelector("#contenedorCarrito");
        if (document.querySelector(".noCarrito")) {
            
        } else {
            let noProductos = document.createElement("h3");
            noProductos.className = "noCarrito";
            noProductos.innerHTML = "No hay productos en el carrito!";
            if(document.querySelector(".total")){
                document.querySelector(".total").remove();
            }
            contenedor.append(noProductos);
        }
    } else {
        for (const p of listaCarrito) {
            listaMostrar.push(new Producto(p.nombre, p.precio, p.id))
        }
        if (document.querySelector(".noCarrito")!=null) {
            document.querySelector(".noCarrito").remove();
        }
        if (document.querySelector(".total")!=null) {
            document.querySelector(".total").remove();
        }
        let contenedor = document.querySelector("#contenedorCarrito");
        let t = 0;
        let contador = 1;
        listaMostrar.forEach(producto => {
            t += producto.precio;
            let p = document.createElement("h3");
            p.className = "itemCarrito"
            p.innerHTML = `${contador}) Producto: ${producto.nombre} --- Precio: ${producto.precio}`;
            contenedor.append(p);
            contador++;
        })
        let total = document.createElement("h3");
        total.className = "total";
        total.innerHTML = "El total es: " + t;
        contenedor.append(total);
    }
}

function limpiarCarrito() {
    sessionStorage.clear();
    mostrarCarrito();
}