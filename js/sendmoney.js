const contactos = [];

function agregarContacto() {
  const nombre = document.getElementById("nombre").value;
  const banco = document.getElementById("banco").value;
  const rut = document.getElementById("rut").value;
  const cuenta = document.getElementById("cuenta").value;

  if (!nombre || !banco || !rut || !cuenta) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const nuevoContacto = {
    nombre: nombre,
    banco: banco,
    rut: rut,
    cuenta: cuenta,
  };

  contactos.push(nuevoContacto);
  actualizarListaContactos();
  actualizarSaldo();

  // Limpiar los campos del formulario después de agregar el contacto
  document.getElementById("nombre").value = "";
  document.getElementById("banco").value = "";
  document.getElementById("rut").value = "";
  document.getElementById("cuenta").value = "";
}

function actualizarListaContactos() {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = "";

  // Agregar cada contacto a la lista
  contactos.forEach((contacto) => {
    const contactoHTML = `
            <ul class="list-group-item d-flex justify-content-evenly">
                <input type="checkbox" class="checkbox" data-alias="${contacto.nombre}" data-banco="${contacto.banco}" data-cuenta="${contacto.cuenta}" data-rut="${contacto.rut}">
                <div class="contact-info">
                    <span class="contact-details"> Alias: ${contacto.nombre}, rut:${contacto.rut}, Banco: ${contacto.banco}, Cuenta: ${contacto.cuenta}</span>
                </div>
            </ul>
        `;
    contactList.innerHTML += contactoHTML;
  });
}

function enviarDinero() {
  const checkboxes = document.querySelectorAll(".checkbox:checked");
  const destinatarios = [];

  checkboxes.forEach((checkbox) => {
    const alias = checkbox.getAttribute("data-alias");
    const banco = checkbox.getAttribute("data-banco");
    const cuenta = checkbox.getAttribute("data-rut");
    const rut = checkbox.getAttribute("data-cuenta");
    destinatarios.push({ alias, rut, banco, cuenta });
  });

  destinatarios.forEach((destinatario) => {
    const { alias, banco, rut, cuenta } = destinatario;
    const montoInput = document.getElementById("ingresarMonto");

    const monto = parseFloat(montoInput.value);
    if (isNaN(monto) || monto <= 0) {
      alert("Por favor, ingrese un monto válido mayor que cero.");
      return;
    }

    const confirmacion = confirm(
      `¿Está seguro de transferir $${monto} a ${alias} en el banco ${banco}, Rut: ${rut}, Cuenta: ${cuenta}?`
    );
    if (confirmacion) {
      const listaEnvios = document.getElementById("listaEnvios");
      const nuevoEnvio = document.createElement("li");
      nuevoEnvio.textContent = `Se ha transferido $${monto} a ${alias} en el banco ${banco}, Rut: ${rut}, Cuenta: ${cuenta}`;
      listaEnvios.appendChild(nuevoEnvio);
      montoInput.value = 0;
      document.getElementById("nombre").value = "";
      document.getElementById("banco").value = "";
      document.getElementById("rut").value = "";
      document.getElementById("cuenta").value = "";
      alert(`Se ha transferido $${monto} a ${alias} correctamente.`);
    } else {
      alert("La transferencia ha sido cancelada.");
    }
  });
}
