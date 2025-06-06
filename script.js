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
    descripcion: "💍✨ Anillo de Plata Ley 925 con Esmeralda Natural 💚💫🌿 Pieza única para dama talla 8, elegante y sofisticada. 💎 Esmeralda natural en forma de corazón, sin perma, de las legendarias minas de Muzo, Colombia. 🌟 Montado en plata 925, símbolo de pureza y durabilidad."
  },
  {
    id: 4,
    nombre: "Anillo talla 8 con esmeralda cuadrada",
    precio: 280000,
    imagen: "imagenes/anillo-talla-8-cuadrada.jpg",
    descripcion: "Anillo en plata ley 925 con una esmeralda natural colombiana de corte cuadrado (princesa). Ideal para mujeres que aprecian joyería fina, detalles únicos y la belleza natural de las gemas colombianas. Talla 8."
  },
  {
    id: 5,
    nombre: "Esmeralda tallada en forma de lágrima",
    precio: 540000,
    imagen: "imagenes/lagrima-1.45-cls.jpg",
    descripcion: "💎 Esmeralda Colombiana Natural. Peso: 1.45 quilates. Corte: Forma de lágrima. Origen: Mina de Muzo, Boyacá. Condición: Natural, sin perma. Ideal para joyería personalizada o inversión."
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
  contenedor.innerHTML = "";
  productos.forEach(p => {
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
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total");
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - $${item.precio} <button onclick="eliminarDelCarrito(${index})" style="margin-left: 10px;">Eliminar</button>`;
    lista.appendChild(li);
    total += item.precio;
  });

  totalSpan.textContent = total;
  generarQRPagoNequiDaviplata();
}

function generarQRPagoNequiDaviplata() {
  const total = document.getElementById("total").textContent;
  const contenedor = document.getElementById("contenedorQR");
  contenedor.innerHTML = "";
  const instrucciones = document.createElement("div");
  instrucciones.innerHTML = `
    <p><strong>Escanea para pagar el total ($${total}):</strong></p>
    <p>Nequi (3164185832) o Daviplata (3209205321)</p>
    <canvas id="qr"></canvas>
    <p>O envía el pago manualmente y manda la captura al WhatsApp: <strong>3209205321</strong></p>
  `;
  contenedor.appendChild(instrucciones);

  const qr = new QRious({
    element: document.getElementById("qr"),
    value: `Pago Maverygord - Total: $${total} - Enviar a Nequi: 3164185832 o Daviplata: 3209205321`,
    size: 256
  });
}

function ampliarImagen(img) {
  const producto = productos.find(p => p.nombre === img.alt);
  if (!producto) return;
  const overlay = document.createElement("div");
  overlay.className = "overlay-imagen";
  overlay.innerHTML = `
    <div class="contenedor-imagen-ampliada">
      <img src="${img.src}" alt="${img.alt}" />
      <div class="descripcion-producto">
        <h2>${producto.nombre}</h2>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p>${producto.descripcion}</p>
      </div>
      <span class="cerrar" onclick="document.body.removeChild(this.parentNode.parentNode)">×</span>
    </div>
  `;
  document.body.appendChild(overlay);
}

function mostrarLogoAmpliado() {
  const overlay = document.createElement("div");
  overlay.className = "overlay-imagen";
  overlay.innerHTML = `
    <div class="contenedor-imagen-ampliada">
      <img src="imagenes/Maverygord-Esmeraldas.png" alt="Logo de Maverygord Esmeraldas" />
      <div class="descripcion-producto">
        <h2>Logo de Maverygord Esmeraldas</h2>
        <p><strong>Precio:</strong> No disponible</p>
        <p>Maverygord Esmeraldas es una empresa colombiana dedicada a la venta de esmeraldas naturales y joyas finas en plata y oro, reconocida por su compromiso con la calidad, la autenticidad y los precios justos. Fundada por un minero originario de Muzo, Boyacá —la cuna de las esmeraldas más valiosas del mundo—, nuestra empresa nace con la experiencia directa del corazón de la mina y el profundo conocimiento de la piedra preciosa más representativa de Colombia.

En Maverygord nos especializamos en esmeraldas 100% naturales, seleccionadas cuidadosamente por su color, pureza y procedencia ética. Cada pieza que ofrecemos refleja el legado de nuestras tierras y el trabajo honesto de quienes las extraen. Además, creamos joyas únicas en plata y oro que resaltan la belleza natural de las esmeraldas, combinando tradición minera con diseño artesanal.

Nuestra misión es llevar la auténtica esmeralda colombiana al mundo, ofreciendo piezas genuinas a precios accesibles y con garantía de calidad.</p>
      </div>
      <span class="cerrar" onclick="document.body.removeChild(this.parentNode.parentNode)">×</span>
    </div>
  `;
  document.body.appendChild(overlay);
}

// Iniciar
mostrarProductos();
