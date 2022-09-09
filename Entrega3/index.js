const producto = [];


function agregar(){
    let productoAgregar = prompt("Ingrese el producto que desea agregar")
    producto.push(productoAgregar);
}

function eliminar(){
    let productoEliminar = prompt("Ingrese el producto que desea eliminar");
    let encontro = 0;
    for (i = 0; i < producto.length; i++) {
        if (producto[i].toUpperCase()==productoEliminar.toUpperCase()) {
            encontro++;
            producto.splice(i, 1);
            alert("Producto eliminado con éxito.");
        }
    }
    if (encontro==0) {
        alert("No se ha encontrado el producto ingresado.");
    }
}

function mostrar(){
    if (producto.length == 0) {
        alert("No hay ningún producto en la lista");
    } else {
        let mensaje ="";
        for (i = 1; i <= producto.length; i++) {
            mensaje = mensaje +"\nProducto " +i +": " +producto[i-1];
        }
        alert(mensaje);
    }
}
1
function pedir() {
    let respuesta = parseInt(prompt("Que desea realizar?\n1 ---> Agregar un producto\n2 ---> Eliminar un producto\n3 ---> Mostrar lista de productos"));
    switch(respuesta) {
        case 1:
            agregar();
            break;
        case 2:
            eliminar();
            break;
        case 3:
            mostrar();
            break;
        default:
            alert("No seleccionó ninguna acción, por favor intentelo nuevamente.")
            break;
    }
}

let continuar = 2;
do {
    pedir();
    continuar = parseInt(prompt("Desea continuar?\n1 ---> Si\n2 ---> No"));
} while (continuar == 1);
