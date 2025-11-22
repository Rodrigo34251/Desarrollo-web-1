const form = document.getElementById("Formulario")
const input_Carnet = document.getElementById("Carnet");
const input_Nombre = document.getElementById("Nombre");
const input_Dui = document.getElementById("Dui");
const input_Nit = document.getElementById("Nit");
const input_Fecha = document.getElementById("Fecha");
const input_Correo = document.getElementById("Correo");
const input_Edad = document.getElementById("Edad");

const carnet_condicion = /^[A-Za-z]{2}\d{3}$/;
const nombre_condicion = /^[A-Za-zÑñ\s]+$/;
const dui_condicion = /^\d{8}-\d$/;
const nit_condicion = /^\d{4}-\d{6}-\d{3}-\d$/;
const fecha_condicion = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const email_condicion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const edad_condicion = /^\d{1,3}$/;

const estudiante = function (event) {
    event.preventDefault();
    const carnet = input_Carnet.value.trim();
    const nombre = input_Nombre.value.trim();
    const dui = input_Dui.value.trim();
    const nit = input_Nit.value.trim();
    const fecha = input_Fecha.value.trim();
    const correo = input_Correo.value.trim();
    const edad = input_Edad.value.trim();

    if (!carnet_condicion.test(carnet)){
        alert("El carnet debe contener 2 letras y 3 numeros");
        return;
    }

    if (!nombre_condicion.test(nombre)){
        alert("El nombre solo debe contener letras y espacios");
        return;
    }

    if (!dui_condicion.test(dui)){
        alert("Dui invalido, revise el formato del documento");
        return;
    }

        if (!nit_condicion.test(nit)){
        alert("Nit invalido, revise el formato del documento");
        return;
    }

    if (!fecha_condicion.test(fecha)){
        alert("Fecha de nacimiento invalida");
        return;
    }

        if (!email_condicion.test(correo)){
        alert("Correo invalido, compruebe el formato de su correo");
        return;
    }

        if (!edad_condicion.test(edad)){
        alert("Edad invalida, debe ser solo numeros");
        return;
    }

    alert ("Estudiante registrado correctamente");
    form.reset();
};

form.onsubmit = estudiante;