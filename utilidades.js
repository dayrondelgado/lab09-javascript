import {
  configuracionPorDefecto,
  configuracionUsuario,
  productosLaptops,
  productosAccesorios,
  productosMonitores
} from './datos.js';

export const obtenerCatalogo = () => [
  ...productosLaptops,
  ...productosAccesorios,
  ...productosMonitores
];

export const obtenerConfiguracion = () => ({
  ...configuracionPorDefecto,
  ...configuracionUsuario
});

export const formatearPrecio = (monto = 0, moneda = 'S/', decimales = 2) =>
  `${moneda} ${Number(monto).toFixed(decimales)}`;

export const calcularDescuento = (precio = 0, porcentaje = 0) => {
  const descuento = precio * (porcentaje / 100);
  return precio - descuento;
};

export const calcularPrecioConIGV = (precio = 0, igv = 0.18) =>
  precio + (precio * igv);

// Desestructuración de propiedades de producto.
export const describirProducto = (producto = {}) => {
  const {
    nombre = 'Producto desconocido',
    precio = 0,
    stock = 0,
    categoria = 'Sin categoría'
  } = producto;

  const estado = stock > 0 ? `Disponible (${stock} und.)` : 'AGOTADO';
  return `[${categoria}] ${nombre} - ${formatearPrecio(precio)} - ${estado}`;
};

export const resumenCliente = (cliente = {}) => {
  const {
    nombres = '',
    apellidos = '',
    email = 'Sin correo',
    direccion: {
      distrito = 'Sin distrito',
      ciudad = 'Sin ciudad'
    } = {}
  } = cliente;

  return `${nombres} ${apellidos} <${email}> - ${distrito}, ${ciudad}`;
};

export const buscarProductoPorId = (catalogo = [], id = null) =>
  catalogo.find(({ id: idProducto }) => idProducto === id) ?? null;

export const buscarClientePorId = (listaClientes = [], id = null) =>
  listaClientes.find(({ id: idCliente }) => idCliente === id) ?? null;

export const filtrarPorCategoria = (catalogo = [], categoria = '') =>
  catalogo.filter(({ categoria: categoriaProducto }) => categoriaProducto === categoria);

export const productosDisponibles = (catalogo = []) =>
  catalogo.filter(({ stock }) => stock > 0);

export const listarNombres = (catalogo = []) =>
  catalogo.map(({ nombre }) => nombre);

export const sumarMontos = (...precios) =>
  precios.reduce((total, precio) => total + precio, 0);

export const registrarEvento = (tipo = 'info', ...etiquetas) => {
  console.log(`[${tipo.toUpperCase()}] ${etiquetas.join(' | ')}`);
};

export const actualizarProducto = (producto = {}, cambios = {}) => ({
  ...producto,
  ...cambios
});

export const calcularPedido = (
  pedidoActual = { codigo: '', items: [] },
  catalogo = [],
  porcentajeDescuento = 0
) => {
  const config = obtenerConfiguracion();
  const items = pedidoActual.items ?? [];

  const subtotales = items.map(({ productoId, cantidad }) => {
    const producto = buscarProductoPorId(catalogo, productoId);
    return producto ? producto.precio * cantidad : 0;
  });

  const detalle = items.flatMap(({ productoId, cantidad }) => {
    const producto = buscarProductoPorId(catalogo, productoId);
    if (!producto) return [];

    const subtotal = producto.precio * cantidad;
    return [`${cantidad} x ${producto.nombre} = ${formatearPrecio(subtotal, config.moneda)}`];
  });

  const subtotalGeneral = sumarMontos(...subtotales);
  const conDescuento = calcularDescuento(subtotalGeneral, porcentajeDescuento);
  const total = calcularPrecioConIGV(conDescuento, config.igv);

  return {
    codigo: pedidoActual.codigo,
    detalle,
    subtotal: subtotalGeneral,
    descuento: porcentajeDescuento,
    total
  };
};

export const obtenerExtremos = (catalogo = []) => {
  if (catalogo.length === 0) return [null, null];

  const ordenados = [...catalogo].sort((a, b) => b.precio - a.precio);
  const [masCaro] = ordenados;
  const masBarato = ordenados[ordenados.length - 1];
  return [masCaro, masBarato];
};
