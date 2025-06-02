const productos = [
  { id: 1, nombre: "Anillo para dama, talla 7 y 1/2", precio: 350000, imagen: "imagenes/anillo-talla-7.5.jpg", descripcion: "Anillo elegante para dama en talla 7 y medio, fabricado con materiales de alta calidad. plata ley 925 con esmeralda natural en forma de lágrima!✨ 💎 Incrustado con una esmeralda natural tallada en forma de lágrima, sin perma, de 0.60 quilates.Una joya elegante y única, ideal para ocasiones especiales o como regalo.Valor: $350.000 COP" },
  { id: 2, nombre: "Dije en plata con esmeralda natural", precio: 450000, imagen: "imagenes/dije-en-plata-dama.jpg", descripcion: "Hermoso dije en plata con una esmeralda natural que destaca por su brillo y color. ¡Dije en plata 925 con esmeralda natural en forma de lágrima!✨ Dije para dama en plata ley 925, con una espectacular esmeralda natural tallada en forma de lágrima, sin perma, de 1 quilate.Una joya elegante, perfecta para realzar cualquier look o como regalo especial.Valor: $450.000 COP" },
  { id: 3, nombre: "", precio: 20000 },
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
      <img src="${p.imagen}" alt="${p.nombre}" class="imagen-producto" onclick="ampliarImagen(this)" />
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

function ampliarImagen(img) {
  // Buscar el producto con el mismo nombre (alt)
  const producto = productos.find(p => p.nombre === img.alt);
  if (!producto) return;

  const overlay = document.createElement("div");
  overlay.className = "overlay-imagen";
  overlay.innerHTML = `
    <div class="contenedor-imagen-ampliada" style="display: flex; gap: 20px; align-items: flex-start; max-width: 90%; max-height: 80%;">
      <img src="${img.src}" alt="${img.alt}" style="max-width: 50%; max-height: 100%; border-radius: 10px; box-shadow: 0 0 20px #000;" />
      <div class="descripcion-producto" style="color: white; max-width: 45%; overflow-y: auto;">
        <h2>${producto.nombre}</h2>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p>${producto.descripcion || "Descripción no disponible."}</p>
      </div>
      <span class="cerrar" onclick="document.body.removeChild(this.parentNode.parentNode)">×</span>
    </div>
  `;
  document.body.appendChild(overlay);
}
