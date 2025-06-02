const productos = [
  { id: 1, nombre: "Anillo para dama, talla 7 y 1/2", precio: 350000 },
  { id: 2, nombre: "Dije en plata con esmeralda natural", precio: 35000 },
  { id: 3, nombre: "Producto C", precio: 2000 },
  { id: 4, nombre: "Producto D", precio: 15000 }
];

let carrito = [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = ''; // limpiar para evitar duplicados
  productos.forEach((p) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total");
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    lista.appendChild(li);
    total += item.precio;
  });
  totalSpan.textContent = total;
}

function mostrarPago() {
  document.getElementById("instrucciones-pago").classList.remove("oculto");
}

async function pagarPayU() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  document.getElementById("amountPayU").value = total;

  // Genera referencia única
  const referencia = `pedido_${Date.now()}`;
  document.getElementById("referenceCode").value = referencia;

  // Solicitar email cliente
  const emailCliente = prompt("Por favor, ingresa tu correo electrónico:");
  if (!emailCliente) {
    alert("El correo es obligatorio para continuar.");
    return;
  }
  document.getElementById("buyerEmail").value = emailCliente;

  // Generar firma llamando al backend
  try {
    const response = await fetch("http://localhost:3000/generar-firma", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        referenceCode: referencia,
        amount: total,
        currency: "COP"
      })
    });

    const data = await response.json();
    if (data.signature) {
      document.getElementById("signature").value = data.signature;

      // Enviar formulario para redirigir a PayU
      document.getElementById("formPayU").submit();
    } else {
      alert("Error al generar la firma.");
    }
  } catch (error) {
    alert("Error en la comunicación con el servidor.");
    console.error(error);
  }
}

// Inicializar
mostrarProductos();
