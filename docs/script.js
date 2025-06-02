const productos = [
  {
    id: 1,
    nombre: "Anillo para dama, talla 7 y 1/2",
    precio: 350000,
    imagen: "imagenes/anillo-talla-7.5.jpg",
    descripcion: "Anillo elegante para dama en talla 7 y medio, fabricado con materiales de alta calidad. Plata ley 925 con esmeralda natural en forma de lágrima!✨ 💎 Incrustado con una esmeralda natural tallada en forma de lágrima, sin perma, de 0.60 quilates. Una joya elegante y única, ideal para ocasiones especiales o como regalo. Valor: $350.000 COP"
  },
  {
    id: 2,
    nombre: "Dije en plata con esmeralda natural",
    precio: 450000,
    imagen: "imagenes/dije-en-plata-dama.jpg",
    descripcion: "Hermoso dije en plata con una esmeralda natural que destaca por su brillo y color. ¡Dije en plata 925 con esmeralda natural en forma de lágrima!✨ Con una espectacular esmeralda natural tallada, sin perma, de 1 quilate. Una joya elegante, perfecta para realzar cualquier look o como regalo especial. Valor: $450.000 COP"
  },
  {
    id: 3,
    nombre: "Anillo talla 8 con esmeralda en forma de corazón",
    precio: 320000,
    imagen: "imagenes/anillo-talla-8-corazon.jpg",
    descripcion: "💍✨ Anillo de Plata Ley 925 con Esmeralda Natural 💚💫🌿 Pieza única para dama talla 8, elegante y sofisticada. 💎 Esmeralda natural en forma de corazón, sin perma, de las legendarias minas de Muzo, Colombia. 🌟 Montado en plata 925, símbolo de pureza y durabilidad. 🎁 Ideal para regalar amor, elegancia y conexión con la naturaleza. 🔒 Autenticidad garantizada 📦 Entrega segura y rápida"
  },
  {
    id: 4,
    nombre: "Anillo talla 8 con esmeralda cuadrada",
    precio: 280000,
    imagen: "imagenes/anillo-talla-8-cuadrada.jpg",
    descripcion: "💍✨ Anillo de Dama con Esmeralda Cuadrada – Talla 8 💚 Elegancia atemporal y distinción en una sola joya. Este hermoso anillo está elaborado en plata ley 925 y luce una esmeralda natural de corte cuadrado, cuidadosamente seleccionada por su brillo y color intenso. 💎 Características: Piedra: Esmeralda natural colombiana 🇨🇴 Corte: Cuadrado (princesa) Montura: Plata ley 925 Talla: 8 (ajustable si se requiere) Perfecto para mujeres que aprecian la joyería fina, los detalles únicos y la belleza natural de las gemas colombianas. Ideal para regalar o para consentirte con una joya auténtica y con estilo. 📦 Incluye estuche de regalo"
  },
  {
    id: 5,
    nombre: "Esmeralda tallada en forma de lágrima",
    precio: 540000,
    imagen: "imagenes/lagrima-1.45-cls.jpg",
    descripcion: "💎 Maverygord Esmeraldas – Belleza Natural de Muzo. Pieza única disponible: ✨ Esmeralda Colombiana Natural. Peso: 1.45 quilates. Corte: Forma de lágrima. Origen: Mina de Muzo, Boyacá – reconocida mundialmente por sus esmeraldas de alta calidad. Condición: Natural, sin perma (sin tratamientos). Precio: $540.000 COP. Esta esmeralda combina elegancia y autenticidad. Su tonalidad verde intensa y su forma de lágrima la convierten en una piedra ideal para una joya personalizada o una inversión valiosa. 🔒 Compra segura | Autenticidad garantizada | Envíos nacionales"
  },
  {
    id: 6,
    nombre: "Producto vacío",
    precio: 20000,
    imagen: "imagenes/vacio.jpg",
    descripcion: "Producto genérico sin descripción definida."
  }
];

let carrito = [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = '';
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

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio}
      <button onclick="eliminarDelCarrito(${index})" style="margin-left: 10px; background-color: #c6d2b6; color: red;">Eliminar</button>
    `;
    lista.appendChild(li);
    total += item.precio;
  });

  totalSpan.textContent = total;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
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

  const referencia = `pedido_${Date.now()}`;
  document.getElementById("referenceCode").value = referencia;

  const emailCliente = prompt("Por favor, ingresa tu correo electrónico:");
  if (!emailCliente) {
    alert("El correo es obligatorio para continuar.");
    return;
  }
  document.getElementById("buyerEmail").value = emailCliente;

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
      document.getElementById("botonSubmitPayU").click();
    } else {
      alert("Error al generar la firma.");
    }
  } catch (error) {
    alert("Error en la comunicación con el servidor.");
    console.error(error);
  }
}

function ampliarImagen(img) {
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

// ✅ NUEVA FUNCIÓN para ampliar el logo desde el header
function mostrarLogoAmpliado() {
  const overlay = document.createElement("div");
  overlay.className = "overlay-imagen";
  overlay.innerHTML = `
    <div class="contenedor-imagen-ampliada" style="display: flex; gap: 20px; align-items: flex-start; max-width: 90%; max-height: 80%;">
      <img src="imagenes/Maverygord-Esmeraldas.png" alt="Logo de Maverygord Esmeraldas" style="max-width: 50%; max-height: 100%; border-radius: 10px; box-shadow: 0 0 20px #000;" />
      <div class="descripcion-producto" style="color: white; max-width: 45%; overflow-y: auto;">
        <h2>Logo de Maverygord Esmeraldas</h2>
        <p><strong>Precio:</strong> No disponible</p>
        <p>Maverygord Esmeraldas es una empresa colombiana dedicada a la venta de esmeraldas naturales y joyas finas en plata y oro, reconocida por su compromiso con la calidad, la autenticidad y los precios justos. Fundada por un minero originario de Muzo, Boyacá —la cuna de las esmeraldas más valiosas del mundo—, nuestra empresa nace con la experiencia directa del corazón de la mina y el profundo conocimiento de la piedra preciosa más representativa de Colombia.

En Maverygord nos especializamos en esmeraldas 100% naturales, seleccionadas cuidadosamente por su color, pureza y procedencia ética. Cada pieza que ofrecemos refleja el legado de nuestras tierras y el trabajo honesto de quienes las extraen. Además, creamos joyas únicas en plata y oro que resaltan la belleza natural de las esmeraldas, combinando tradición minera con diseño artesanal.

Nuestra misión es llevar la auténtica esmeralda colombiana al mundo, ofreciendo piezas genuinas a precios accesibles y con garantía de calidad.
.</p>
      </div>
      <span class="cerrar" onclick="document.body.removeChild(this.parentNode.parentNode)">×</span>
    </div>
  `;
  document.body.appendChild(overlay);
}

// Inicializar al cargar
mostrarProductos();
