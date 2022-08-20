let respuesta = prompt("Ingrese que ciclo desea realizar (FOR / WHILE)").toLowerCase();

switch (respuesta) {
    case "for":
        alert("Usted ha seleccionado el CICLO FOR");
        let numero = parseInt(prompt("Escriba un número para ver su tabla"));
        for (let i = 1; i <= 10; i++) {
            alert(`${numero} x ${i} = ` +numero*i);
        }
        alert("Gracias por haberme seleccionado ^^");
        break;

    case "while":
        alert("Usted ha seleccionado el CICLO WHILE");
        let respuestaWhile = prompt("¿Me vas a aprobar?").toLowerCase();
        while (respuestaWhile != "si") {
            respuestaWhile = prompt("Creo que te confundiste con la respuesta... ¿Me vas a aprobar?").toLowerCase();
        }
        alert("MUCHAS GRACIAS MANU, SIEMPRE CONFIÉ EN VOS :3");
        break;

    default:
        alert("Usted no ha seleccionado el NINGÚN CICLO >:C");
        break;
}