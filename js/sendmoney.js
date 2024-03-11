// Obtener referencias a elementos del DOM
const montoInput = document.getElementById('ingresarMonto');
const contactos = document.querySelectorAll('#contactList input[type="checkbox"]');
const resultado = document.getElementById('resultado');
const btnEnviar = document.getElementById('btnEnviar');

// Datos de ejemplo de usuarios y transacciones
let usuarios = [
    { nombre: "Jose Sanchez", rut: "4.012.565-4", alias: "Jose Sanchez", banco: "Falabella" },
    { nombre: "Marlon Brandon", rut: "17.015.456-4", alias: "Marlon Brandon", banco: "Santander" }
];

let transacciones = [];

// Función para enviar dinero
function enviarDinero(monto, destinatario) {
    const transaccion = {
        monto: monto,
        destinatario: destinatario,
        fecha: new Date().toLocaleString()
    };
    transacciones.push(transaccion);
    actualizarTransacciones();
    return transaccion;
}

// Función para agregar un nuevo usuario
function agregarUsuario(nombre, rut, alias, banco) {
    const nuevoUsuario = { nombre, rut, alias, banco };
    usuarios.push(nuevoUsuario);
    actualizarUsuarios();
    return nuevoUsuario;
}

// Función para actualizar la lista de usuarios en la página
function actualizarUsuarios() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    usuarios.forEach(usuario => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-evenly';
        listItem.innerHTML = `
            <input type="checkbox">
            <div class="contact-info">
                <span class="contact-name">${usuario.nombre}</span>
                <span class="contact-details">RUT: ${usuario.rut}, Alias: ${usuario.alias}, Banco: ${usuario.banco}</span>
            </div>
        `;
        contactList.appendChild(listItem);
    });
}

// Función para actualizar la lista de transacciones en la página de transacciones
function actualizarTransacciones() {
    const transaccionesDiv = document.getElementById('transacciones');
    transaccionesDiv.innerHTML = '';
    transacciones.forEach(transaccion => {
        const transaccionItem = document.createElement('div');
        transaccionItem.className = 'transaccion-item';
        transaccionItem.innerHTML = `
            <p>Fecha: ${transaccion.fecha}</p>
            <p>Monto: $${transaccion.monto.toFixed(2)}</p>
            <p>Destinatario: ${transaccion.destinatario}</p>
        `;
        transaccionesDiv.appendChild(transaccionItem);
    });
}

// Evento para enviar dinero cuando se envía el formulario
btnEnviar.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que se recargue la página

    const monto = parseFloat(montoInput.value);
    const destinatariosSeleccionados = Array.from(contactos)
        .filter(contacto => contacto.checked)
        .map(contacto => contacto.parentElement.querySelector('.contact-name').textContent);

    if (isNaN(monto) || monto <= 0) {
        resultado.textContent = "Por favor, ingresa un monto válido.";
        return;
    }

    if (destinatariosSeleccionados.length === 0) {
        resultado.textContent = "Por favor, selecciona al menos un destinatario.";
        return;
    }

    destinatariosSeleccionados.forEach(destinatario => {
        enviarDinero(monto, destinatario);
    });

    resultado.textContent = "Transferencia realizada correctamente.";
});

// Actualizar la lista de usuarios al cargar la página
actualizarUsuarios();

// Actualizar la lista de transacciones al cargar la página de transacciones
actualizarTransacciones();
