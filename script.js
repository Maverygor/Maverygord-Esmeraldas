// --- LISTA DE PRODUCTOS ---
const productos = [
  {
    id: 2,
    nombre: "Dije en plata con esmeralda natural",
    precio: 450000,
    imagen: "imagenes/dije-en-plata-dama.jpg",
    descripcion: "Hermoso dije en plata con una esmeralda natural..."
  },
  {
    id: 3,
    nombre: "Anillo talla 8 con esmeralda en forma de corazón",
    precio: 320000,
    imagen: "imagenes/anillo-talla-8-corazon.jpg",
    descripcion: "💍✨ Anillo de Plata Ley 925 con Esmeralda Natural..."
  },
  {
    id: 4,
    nombre: "Anillo talla 8 con esmeralda cuadrada",
    precio: 280000,
    imagen: "imagenes/anillo-talla-8-cuadrada.jpg",
    descripcion: "Anillo en plata ley 925 con una esmeralda natural..."
  },
  {
    id: 5,
    nombre: "Esmeralda tallada en forma de lágrima",
    precio: 540000,
    imagen: "imagenes/lagrima-1.45-cls.jpg",
    descripcion: "💎 Esmeralda Colombiana Natural. Peso: 1.45 quilates..."
  },
];

// --- CARRITO ---
let carrito = [];

// --- FORMATEAR PRECIO ---
function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO");
}

// --- MOSTRAR PRODUCTOS ---
function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="imagen-producto" onclick="ampliarImagen(this)" />
      <h3>${p.nombre}</h3>
      <p>Precio: $${formatearPrecio(p.precio)}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

// --- AGREGAR AL CARRITO ---
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
  actualizarContadorCarrito();

  // Mostrar último producto agregado en formulario
  document.getElementById("producto").value = producto.nombre;
}

// --- ELIMINAR DEL CARRITO ---
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  actualizarContadorCarrito();
}

// --- ACTUALIZAR CARRITO ---
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total");
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - $${formatearPrecio(item.precio)} 
      <button onclick="eliminarDelCarrito(${index})" style="margin-left: 10px;">Eliminar</button>`;
    lista.appendChild(li);
    total += item.precio;
  });

  totalSpan.textContent = formatearPrecio(total);
}

// --- ACTUALIZAR CONTADOR DEL CARRITO ---
function actualizarContadorCarrito() {
  document.getElementById("contador-carrito").textContent = carrito.length;
}

// --- ENVIAR FORMULARIO A WHATSAPP ---
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = this.nombre.value;
  const email = this.email.value;
  const telefono = this.telefono.value;
  const mensaje = this.mensaje.value;

  let productosTexto = carrito.map(p => `- ${p.nombre} ($${formatearPrecio(p.precio)})`).join("\n");
  if (productosTexto === "") {
    productosTexto = "⚠️ No se agregaron productos al carrito";
  }

  const numero = "573209205321";

  const texto = `👤 Nombre: ${nombre}
📧 Email: ${email}
📞 Teléfono: ${telefono}
🛒 Productos:
${productosTexto}
💬 Mensaje: ${mensaje}`;

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
});

// --- AMPLIAR IMAGEN ---
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
        <p><strong>Precio:</strong> $${formatearPrecio(producto.precio)}</p>
        <p>${producto.descripcion}</p>
      </div>
      <span class="cerrar" onclick="document.body.removeChild(this.parentNode.parentNode)">×</span>
    </div>
  `;
  document.body.appendChild(overlay);
}

// --- MOSTRAR LOGO AMPLIADO ---
function mostrarLogoAmpliado() {
  const overlay = document.createElement("div");
  overlay.className = "overlay-imagen";
  overlay.innerHTML = `
    <div class="contenedor-imagen-ampliada">
      <img src="imagenes/Maverygord-Esmeraldas.png" alt="Logo de Maverygord Esmeraldas" />
      <div class="descripcion-producto">
        <h2>Logo de Maverygord Esmeraldas</h2>
        <p><strong>Precio:</strong> No disponible</p>
        <p>Maverygord Esmeraldas es una empresa colombiana dedicada a la venta de esmeraldas naturales...</p>
      </div>
      <span class="cerrar" onclick="document.body.removeChild(this.parentNode.parentNode)">×</span>
    </div>
  `;
  document.body.appendChild(overlay);
}

// --- EJECUTAR ---
mostrarProductos();
