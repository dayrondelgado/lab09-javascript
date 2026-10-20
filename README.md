# Laboratorio 09 – Refactorización a ES6+ y modularización

Proyecto TecnoStore resuelto respetando la estructura solicitada en la guía del laboratorio.

## Estructura

- `index.html`: carga la aplicación con `<script type="module" src="app.js"></script>`.
- `datos.js`: exporta los objetos, arreglos y datos simulados.
- `utilidades.js`: importa los datos que necesita y exporta las funciones reutilizables.
- `app.js`: importa los datos y utilidades y ejecuta el programa principal.
- `salida-esperada.txt`: salida de referencia proporcionada con el proyecto inicial.

## Cambios aplicados

- Reemplazo de `var` por `const` y `let` según el uso de cada variable.
- Conversión de funciones y callbacks a arrow functions.
- Parámetros por defecto en las funciones.
- Desestructuración de objetos, objetos anidados y arreglos.
- Operador spread para combinar arreglos y objetos, y para pasar subtotales como argumentos.
- Operador rest en `sumarMontos` y `registrarEvento`, sin usar `arguments`.
- Uso de `filter`, `map`, `find`, `reduce`, `forEach`, `flatMap` y `sort`.
- Modularización real con `export` e `import` en tres archivos JavaScript.

## Cómo ejecutar

1. Descomprime el ZIP.
2. Abre la carpeta `lab09-javascript` en Visual Studio Code.
3. Si no tienes Live Server, instala la extensión **Live Server**.
4. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.
5. Abre las herramientas del navegador con `F12` y revisa la pestaña **Console**.

No abras `index.html` directamente con doble clic (`file://`), ya que los navegadores pueden bloquear la carga de módulos por CORS.

## Verificación

La salida de la consola debe conservar los resultados de negocio de `salida-esperada.txt`, incluyendo 8 productos, 7 productos con stock, el total del pedido de S/ 3322.68 y las ventas del día de S/ 4140.30.
