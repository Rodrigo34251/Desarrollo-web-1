const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmdPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");
const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAgregarPais");
const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");
const idModal = document.getElementById("idModal");

let arrayPaciente = [];
let editarInfo = null;

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    inputNombre.focus();
};

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true ? "Hombre": 
        inputRdFemenino.checked == true ? "Mujer": "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        if (editarInfo === null) {
            arrayPaciente.push(new Array(nombre, apellido, fechaNacimiento, sexo  , labelPais, direccion));
        } else {
            arrayPaciente[editarInfo] = new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion);
            editarInfo = null;
            buttonAgregarPaciente.textContent = "Guardar datos";
        }

        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        toast.show();
        
        imprimirPacientes()
        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};


function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element, index) => {
        $fila += `<tr>
            <td scope="row" class="text-center fw-bold">${contador}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" onclick="editarPaciente(${index})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" onclick="eliminarPaciente(${index})">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;

        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
<table class="table table-striped table-hover table-bordered">
    <tr>
        <th scope="col" class="text-center" style="width:5%">#</th>
        <th scope="col" class="text-center" style="width:15%">Nombre</th>
        <th scope="col" class="text-center" style="width:15%">Apellido</th>
        <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
        <th scope="col" class="text-center" style="width:10%">Sexo</th>
        <th scope="col" class="text-center" style="width:10%">Pais</th>
        <th scope="col" class="text-center" style="width:25%">Dirección</th>
        <th scope="col" class="text-center" style="width:10%">Opciones</th>
    </tr>
    ${imprimirFilas()}
</table>
</div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;
};

let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        cmbPais.appendChild(option);
        contadorGlobalOption++;

        mensaje.innerHTML = "País agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

const editarPaciente = (index) => {
    const p = arrayPaciente[index];
    if(!p) return;
    inputNombre.value = p[0];
    inputApellido.value = p[1];
    inputFechaNacimiento.value = p[2];
    if (p[3]=== "Hombre"){
        inputRdMasculino.checked = true;
        inputRdFemenino.checked = false;
    } else {
        inputRdMasculino.checked = false;
        inputRdFemenino.checked = true;
    }
    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text === p[4]) {cmbPais.selectedIndex = i; break}

        inputDireccion.value = p[5];
        editarInfo = index;
        if (buttonAgregarPaciente) buttonAgregarPaciente.textContent = "Actualizar";
    }
};

const eliminarPaciente = (index) => {
    if (index >= 0 && index < arrayPaciente.length) {
        arrayPaciente.splice(index, 1);
        imprimirPacientes();
        mensaje.innerHTML = "Paciente eliminado";
        toast.show();
    }
};

buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

limpiarForm();
