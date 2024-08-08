const formulario = document.getElementById('formularioVentas');
const productos = document.getElementById('productos');
const subtotal = document.getElementById('subtotal');
const impuestos = document.getElementById('impuestos');
const total = document.getElementById('total');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const fecha = document.getElementById('fecha').value;
  const numeroVenta = document.getElementById('numero-venta').value;
  const cliente = document.getElementById('cliente').value;
  const productosVendidos = [];

  // Recorrer las filas de productos y calcular el subtotal
  for (let i = 1; i <= productos.rows.length; i++) {
    const producto = document.getElementById(`producto-${i}`).value;
    const cantidad = parseInt(document.getElementById(`cantidad-${i}`).value);
    const precio = parseFloat(document.getElementById(`precio-${i}`).value);
    const subtotalProducto = cantidad * precio;
    productosVendidos.push({ producto, cantidad, precio, subtotalProducto });
  }

  // Calcular impuestos y total
  const subtotalTotal = productosVendidos.reduce((acc, producto) => acc + producto.subtotalProducto, 0);
  const impuestosTotal = subtotalTotal * 0.16; // 16% de impuestos
  const totalTotal = subtotalTotal + impuestosTotal;

  // Mostrar resultados
  subtotal.value = subtotalTotal.toFixed(2);
  impuestos.value = impuestosTotal.toFixed(2);
  total.value = totalTotal.toFixed(2);

  // Generar nota de venta
  const notaVenta = `
    Fecha: ${fecha}
    Número de Venta: ${numeroVenta}
    Cliente: ${cliente}
    Productos:
    ${productosVendidos.map((producto) => `${producto.producto} x ${producto.cantidad} @ ${producto.precio} = ${producto.subtotalProducto}`).join('\n')}
    Subtotal: ${subtotalTotal.toFixed(2)}
    Impuestos: ${impuestosTotal.toFixed(2)}
    Total: ${totalTotal.toFixed(2)}
  `;
  console.log(notaVenta);
});