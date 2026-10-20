import {
  tienda,
  clientes,
  pedido,
  ubicacionAlmacen
} from './datos.js';

import {
  obtenerCatalogo,
  obtenerConfiguracion,
  formatearPrecio,
  calcularDescuento,
  describirProducto,
  resumenCliente,
  buscarProductoPorId,
  buscarClientePorId,
  filtrarPorCategoria,
  productosDisponibles,
  listarNombres,
  sumarMontos,
  registrarEvento,
  actualizarProducto,
  calcularPedido,
  obtenerExtremos
} from './utilidades.js';

console.log('==============================================');
console.log(`  ${tienda.nombre} - RUC ${tienda.ruc}`);
const { calle, distrito, ciudad } = tienda.direccion;
console.log(`  ${calle}, ${distrito} - ${ciudad}`);
console.log('==============================================');

const config = obtenerConfiguracion();
console.log('\n--- 1. Configuración del sistema ---');
console.log(config);

const catalogo = obtenerCatalogo();
console.log(`\n--- 2. Catálogo completo (${catalogo.length} productos) ---`);
catalogo.forEach(producto => console.log(describirProducto(producto)));

console.log('\n--- 3. Filtros ---');
console.log('Monitores:', listarNombres(filtrarPorCategoria(catalogo, 'Monitores')));
console.log('Con stock:', `${productosDisponibles(catalogo).length} de ${catalogo.length}`);

const [masCaro, masBarato] = obtenerExtremos(catalogo);
console.log('\n--- 4. Extremos de precio ---');
console.log(`Más caro  : ${masCaro.nombre} (${formatearPrecio(masCaro.precio)})`);
console.log(`Más barato: ${masBarato.nombre} (${formatearPrecio(masBarato.precio)})`);

console.log('\n--- 5. Clientes registrados ---');
clientes.forEach((cliente, indice) => {
  console.log(`${indice + 1}. ${resumenCliente(cliente)}`);
});

console.log('\n--- 6. Descuentos y formatos ---');
console.log('Sin descuento     : ' + formatearPrecio(calcularDescuento(1000)));
console.log('Con 15% descuento : ' + formatearPrecio(calcularDescuento(1000, 15)));
console.log('Formato en dólares: ' + formatearPrecio(250, '$'));
console.log('Con 3 decimales   : ' + formatearPrecio(99.5, 'S/', 3));

console.log('\n--- 7. Pedido ---');
const cliente = buscarClientePorId(clientes, pedido.clienteId);
if (cliente) {
  const descuentoCliente = cliente.tipo === 'frecuente' ? 10 : 0;
  const resultado = calcularPedido(pedido, catalogo, descuentoCliente);

  console.log(`Pedido : ${resultado.codigo}`);
  console.log(`Cliente: ${cliente.nombres} ${cliente.apellidos} (${cliente.tipo})`);
  resultado.detalle.forEach(item => console.log(`  - ${item}`));
  console.log('Subtotal          : ' + formatearPrecio(resultado.subtotal));
  console.log(`Descuento aplicado: ${resultado.descuento}%`);
  console.log('Total (con IGV)   : ' + formatearPrecio(resultado.total));
} else {
  console.log('No se encontró el cliente del pedido.');
}

console.log('\n--- 8. Actualización de stock ---');
const teclado = buscarProductoPorId(catalogo, 5);
if (teclado) {
  const tecladoActualizado = actualizarProducto(teclado, { stock: 20 });
  console.log('Original   : ' + describirProducto(teclado));
  console.log('Actualizado: ' + describirProducto(tecladoActualizado));
}

console.log('\n--- 9. Suma de montos variables ---');
console.log('Ventas del día: ' + formatearPrecio(sumarMontos(1200, 350.5, 89.9, 2499.9)));

const [latitud, longitud] = ubicacionAlmacen;
console.log('\n--- 10. Ubicación del almacén ---');
console.log(`Latitud: ${latitud} | Longitud: ${longitud}`);

console.log('\n--- 11. Eventos ---');
registrarEvento('info', 'Sistema iniciado', 'Catálogo cargado', 'Pedido procesado');
registrarEvento('alerta', 'Producto agotado', teclado?.nombre ?? 'Teclado');

console.log('\n==============================================');
console.log('  Fin de la ejecución');
console.log('==============================================');
