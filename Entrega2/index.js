// function suma() {
//     numero1 = document.getElementsByName("numero1")[0].value;
//     numero2 = document.getElementsByName("numero2")[0].value;
//     alert(parseInt(numero1) + parseInt(numero2));
// }

// function resta() {
//     numero1 = document.getElementsByName("numero1")[0].value;
//     numero2 = document.getElementsByName("numero2")[0].value;
//     alert(numero1 - numero2);
// }

// function multiplicacion() {
//     numero1 = document.getElementsByName("numero1")[0].value;
//     numero2 = document.getElementsByName("numero2")[0].value;
//     alert(numero1 * numero2);
// }

// function division() {
//     numero1 = document.getElementsByName("numero1")[0].value;
//     numero2 = document.getElementsByName("numero2")[0].value;
//     alert(numero1 / numero2);
// }

function operacion(operacion) {
    numero1 = document.getElementsByName("numero1")[0].value;
    numero2 = document.getElementsByName("numero2")[0].value;
    switch (operacion) {
        case "+":
            alert(parseInt(numero1) + parseInt(numero2));
            break;
        
        case "-":
            alert(numero1 - numero2);
            break;

        case "*":
            alert(numero1 * numero2);
            break;
        
        case "/":
            alert(numero1 / numero2);
            break;
    }
}