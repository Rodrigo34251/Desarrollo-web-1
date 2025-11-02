const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
const numeroIntentos = 3;
let intentos = 1;

function generarNumeroAleatorio() {
    let mensaje;
    const parrafo = document.querySelector("#idParrafo");

    if (intentos <= numeroIntentos) {
        let numero = prompt(
            "¿Qué número se ha generado (Intento " + intentos + ")?"
        );

        if (numero == numeroAleatorio) {
            mensaje = `¡Es sorprendente, pudiste adivinar el numero oculto (${numeroAleatorio})! 
            Refresque la pagina para volver a jugar.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Su numero de intentos ha terminado. 
            El número oculto era: ${numeroAleatorio}. Refresque la pagina para volver a jugar.`;
        } else if (numero < numeroAleatorio) {
            mensaje = `El numero que buscas es mas alto. 
            Vuelve a intentar. Te quedan ${ numeroIntentos - intentos} intentos.`;
        } else {
            mensaje = `El numero que buscas es mas bajo. 
            Vuelve a intentar. Te quedan ${ numeroIntentos - intentos} intentos.`;
        }

        intentos++;
    } else {
        mensaje = `Su numero de intentos ha terminado. 
        El número oculto era: ${numeroAleatorio}. Refresque la pagina para volver a jugar.`;
    }

    parrafo.innerHTML = mensaje;
}
