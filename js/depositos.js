let saldo = 0;

function actualizarSaldo() {
    document.getElementById("saldoActual").textContent = "$" + saldo.toFixed(2);
}

function realizarDeposito() {
    const monto = parseFloat(document.getElementById("monto").value);
        if (!isNaN(monto) && monto > 0) {
    saldo += monto;
    actualizarSaldo();
    alert("Depósito realizado correctamente.");
    } else {
    alert("Por favor ingresa un monto válido para depositar.");
    }
}

function realizarRetiro() {
    const monto = parseFloat(document.getElementById("monto").value);
        if (!isNaN(monto) && monto > 0 && monto <= saldo) {
    saldo -= monto;
    actualizarSaldo();
    alert("Retiro realizado correctamente.");
    } else {
    alert("Monto insuficiente o no válido para retirar.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    actualizarSaldo();
});