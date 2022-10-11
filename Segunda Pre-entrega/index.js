class Producto{
    constructor(nombre, precio, id){
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
    }
}

document.getElementById("productosPredeterminados").addEventListener("click", productosPredeterminados);
document.getElementById("botonAgregar").addEventListener("click", agregar);
document.getElementById("botonEliminar").addEventListener("click", eliminar);
document.getElementById("botonModificar").addEventListener("click", modificar);
document.getElementById("botonLimpiar").addEventListener("click", limpiarLista);
document.getElementById("botonAgregarCarrito").addEventListener("click", agregarCarrito);
document.getElementById("botonLimpiarCarrito").addEventListener("click", limpiarCarrito);
mostrar();
mostrarCarrito();

// FUNCIONES LISTA PRODUCTOS

function productosPredeterminados() {
    let lista = [];
    fetch('productos.json')
        .then((r) => r.json())
        .then((data) => {
            data.forEach(p => {
                lista.push(new Producto(p.nombre, p.precio, p.id));
        });
        localStorage.setItem("listaProductos", JSON.stringify(lista));
        mostrar();
    })
}

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
            Swal.fire({
                icon: 'success',
                text: 'Producto agregado con éxito!'
              })    
            mostrar();
        }
    } else{
        for (const p of listaProductos) {
            listaAgregar.push(new Producto(p.nombre, p.precio, p.id))
        }
        if (Number.isNaN(precio) || Number.isNaN(id) || listaAgregar.find((p) => p.id == id) || listaAgregar.find((p) => p.nombre.toUpperCase() == nombre.toUpperCase())) {
            Swal.fire({
                icon: 'error',
                text: 'Ingrese correctamente los valores'
              }) 
        } else {
            listaAgregar.push(new Producto(nombre, precio, id));
            localStorage.setItem("listaProductos", JSON.stringify(listaAgregar));
            Swal.fire({
                icon: 'success',
                text: 'Producto agregado con éxito!',
              })   
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
            Swal.fire({
                icon: 'success',
                text: 'Producto eliminado con éxito!'
              })   
        }
    }
    if (encontro == 0) {
        Swal.fire({
            icon: 'warning',
            text: 'No se ha encontrado el producto ingresado'
          })   
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
        (async () => {

            const { value: respuesta } = await Swal.fire({
              title: 'Multiple inputs',
              html:
              '<label>Ingrese el nuevo ID</label>' +
              '<input id="idModificar2" class="swal2-input"><br><br>' +
              '<label>Ingrese el nuevo Nombre</label>' +
              '<input id="nombreModificar" class="swal2-input"><br><br>' +
              '<label>Ingrese el nuevo Precio</label>' +
              '<input id="precioModificar" class="swal2-input">',
              focusConfirm: false,
              preConfirm: () => {
                return [
                    parseInt(document.getElementById('idModificar2').value),
                    document.getElementById('nombreModificar').value,
                    parseInt(document.getElementById('precioModificar').value)
                ]
              }
            })
            if (Number.isNaN(respuesta[0]) || listaModificar.find((p) => p.id == respuesta[0]) || respuesta[1] == "" || listaModificar.find((p) => p.nombre.toUpperCase() == respuesta[1].toUpperCase()) || Number.isNaN(respuesta[2])) {
                Swal.fire({
                    icon: 'error',
                    text: 'Ingrese correctamente los valores'
                })
            } else {
                listaModificar.forEach(producto => {
                    if (producto.id == idModificar) {
                        producto.id = respuesta[0];
                        producto.nombre = respuesta[1];
                        producto.precio = respuesta[2];
                    }});
                    localStorage.setItem("listaProductos", JSON.stringify(listaModificar));
                    mostrar();
            }
            })()
        } else {
            Swal.fire({
                icon: 'error',
                text: 'El ID ingresado no se encuentra en la lista'
              }) 
              mostrar();
    }
}


function mostrar() {
    let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
    let limpiarLista = document.querySelectorAll(".itemLista");
    for (let i = 0; i < limpiarLista.length; i++) {
        limpiarLista[i].remove();
    }
    let listaMostrar = [];
    if (listaProductos == null || listaProductos.length == 0) {
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
            Swal.fire({
                icon: 'error',
                text: 'Ingrese correctamente los valores'
              }) 
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
            Swal.fire({
                icon: 'error',
                text: 'Ingrese correctamente los valores'
              }) 
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