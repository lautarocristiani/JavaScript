// CAMBIAR TITULO

let botonTitulo = document.getElementById("botonTitulo");

botonTitulo.onclick = () =>{
    let nuevoTitulo = document.getElementById("nuevoTitulo").value;
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = nuevoTitulo;
}

// OPERACION

let botonOperacion = document.getElementById("botonOperacion");

botonOperacion.onclick = () =>{
    let numero1 = Number(document.getElementById("numero1").value);
    let numero2 = Number(document.getElementById("numero2").value);;
    let respuestaOperacion = document.getElementById("respuestaOperacion");
    var operacion = document.getElementById('operacion');
    var signo = operacion.options[operacion.selectedIndex].value;
    switch (signo) {
        case "+":
            respuestaOperacion.innerHTML = numero1 + numero2;
            break;

        case "-":
            respuestaOperacion.innerHTML = numero1 - numero2;
            break;
    }
}