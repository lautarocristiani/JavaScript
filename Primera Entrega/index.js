const productos = [];
mostrar();

function agregar(){
    let nombre = document.querySelector("#nombre").value;
    let precio = parseInt(document.querySelector("#precio").value);
    let id = parseInt(document.querySelector("#idAgregar").value);
    productos.push({nombre: nombre, precio: precio, id: id});
    mostrar();
    console.log(Math.max(3, 2, 100));
}

function eliminar(){
    let idEliminar = parseInt(document.querySelector("#idEliminar").value);
    let encontro = 0;
    for (i = 0; i < productos.length; i++) {
        if (productos[i].id==idEliminar) {
            encontro++;
            productos.splice(i, 1);
            mostrar();
            alert("Producto eliminado con éxito.");
        }
    }
    if (encontro==0) {
        mostrar();
        alert("No se ha encontrado el producto ingresado.");
    }
}

function mostrar(){
    let limpiarLista = document.querySelectorAll("li");
        for (let i = 0; i < limpiarLista.length; i++) {
            limpiarLista[i].remove();
        }
    if (productos.length==0) {
        let lista = document.querySelector("#lista");
        let noProductos = document.createElement("h2");
        noProductos.className = "nolista";
        noProductos.innerText = "No hay productos en la lista!";
        lista.appendChild(noProductos);
    
    } else {
        if (document.querySelector(".nolista")!=null) {
            document.querySelector(".nolista").remove();
        }
        let lista = document.querySelector("#lista");
        let tabla = document.createElement("ul");
        lista.appendChild(tabla);
        productos.forEach(producto => {
            let p = document.createElement("li");
            p.innerHTML = `ID: ${producto.id} - Producto: ${producto.nombre} - Precio ${producto.precio}`;
            tabla.appendChild(p);
        })
        console.log(productos);
    }
}
