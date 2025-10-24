// TEMA: 3.1 Depuración en el navegador 
// Este bloque demuestra cómo usar las herramientas de depuración del navegador,
// específicamente `console.log()` para mostrar mensajes y cómo usar `debugger;`
// para pausar la ejecución del código.
// Aprendí que la consola es fundamental para entender el flujo del programa
function calcularSuma(a, b) {
    let resultado = a + b;
    console.log(`Depuración 3.1: Calculando suma de ${a} y ${b}.`); // Mensaje informativo
    // debugger; // Descomentar para pausar la ejecución aquí y abrir las Developer Tools
    return resultado;
}

let num1 = 5;
let num2 = 10;
let sumaTotal = calcularSuma(num1, num2);
console.log(`Depuración 3.1: La suma total es: ${sumaTotal}`); // Mostrar el resultado final

// Mostramos el resultado en el DOM
document.getElementById('output-3-1').innerHTML = `
    <p>Revisa la consola (F12) para ver los mensajes de depuración.</p>
    <p>Suma de ${num1} y ${num2} es: ${sumaTotal}</p>
`;


// TEMA: 3.2 Estilo de codificación
// Este bloque ilustra la importancia de un buen estilo de codificación:
// indentación consistente, nombres de variables descriptivos, espacios alrededor
// de operadores y uso de llaves. Un buen estilo mejora la legibilidad y
// mantenibilidad del código.
// Aprendí que no es solo cuestión de estética, sino de eficiencia y colaboración.

// Mal estilo (ejemplo a evitar):
/*
function get_data(d){let x=d*2;return x;}
*/

// Buen estilo (ejemplo recomendado):
function obtenerDatosProcesados(datoEntrada) {
    const factorMultiplicacion = 2; // Nombre de variable descriptivo
    let resultadoProceso = datoEntrada * factorMultiplicacion; // Espacios alrededor de operadores
    return resultadoProceso; // Indentación consistente
}

const valorInicial = 7;
const valorProcesado = obtenerDatosProcesados(valorInicial);

// Aquí podríamos añadir un linter como ESLint para asegurar el estilo
// document.getElementById('output-3-2').innerHTML = `Valor inicial: ${valorInicial}, Valor procesado: ${valorProcesado}`;

document.getElementById('code-3-2').textContent = `
// Buen estilo (ejemplo recomendado):
function obtenerDatosProcesados(datoEntrada) {
    const factorMultiplicacion = 2;
    let resultadoProceso = datoEntrada * factorMultiplicacion;
    return resultadoProceso;
}

const valorInicial = 7;
const valorProcesado = obtenerDatosProcesados(valorInicial);
`;
document.getElementById('output-3-2').innerHTML = `
    <p>Revisa el código en el HTML para el ejemplo de buen estilo.</p>
    <p>Valor inicial: ${valorInicial}, Valor procesado: ${valorProcesado}</p>
`;


// TEMA: 3.3 Comentarios — 20/10/2024
// Este es un ejemplo de un comentario de varias líneas, explicando la finalidad
// del bloque de código o de una función compleja.
// Los comentarios son esenciales para explicar "por qué" se hizo algo, no solo "qué" hace.
// Aprendí a usar diferentes tipos de comentarios para diferentes propósitos:
// // Comentario de una línea para explicaciones rápidas.
/* Comentario de múltiples líneas
   para detalles más extensos,
   como la descripción de una función. */
/**
 * Comentario JSDoc para documentar funciones,
 * parámetros y valores de retorno.
 * @param {number} a - El primer número.
 * @param {number} b - El segundo número.
 * @returns {number} La suma de los dos números.
 */
function sumarNumeros(a, b) {
    // Esta es una suma simple.
    return a + b;
}

const sumando1 = 8;
const sumando2 = 12;
const resultadoSuma = sumarNumeros(sumando1, sumando2);
document.getElementById('output-3-3').innerHTML += `<p>La suma de ${sumando1} y ${sumando2} es: ${resultadoSuma}.</p>`;


// TEMA: 3.4 Código ninja — 20/10/2024
// El "código ninja" se refiere a código extremadamente conciso pero difícil
// de leer y mantener. Aunque a veces parece inteligente, prioriza la brevedad
// sobre la claridad. Es mejor evitarlo en proyectos colaborativos.
// Aprendí que la legibilidad es más importante que la concisión extrema.

// Ejemplo de código "ninja" (a evitar):
const calcularTotalNinja = (p, c) => p * (1 + c);

// Equivalente más legible:
function calcularPrecioFinal(precioBase, impuestoPorcentaje) {
    const tasaImpuestoDecimal = impuestoPorcentaje / 100;
    const precioFinal = precioBase * (1 + tasaImpuestoDecimal);
    return precioFinal;
}

const precioProducto = 100;
const impuesto = 21; // 21%

const totalNinja = calcularTotalNinja(precioProducto, impuesto / 100);
const totalLegible = calcularPrecioFinal(precioProducto, impuesto);

document.getElementById('code-3-4').textContent = `
// Código "ninja" (a evitar):
const calcularTotalNinja = (p, c) => p * (1 + c);

// Equivalente más legible:
function calcularPrecioFinal(precioBase, impuestoPorcentaje) {
    const tasaImpuestoDecimal = impuestoPorcentaje / 100;
    const precioFinal = precioBase * (1 + tasaImpuestoDecimal);
    return precioFinal;
}
`;
document.getElementById('output-3-4').innerHTML = `
    <p>Precio con código "ninja" (21%): ${totalNinja.toFixed(2)}</p>
    <p>Precio con código legible (21%): ${totalLegible.toFixed(2)}</p>
    <p>El código legible es más fácil de entender a primera vista.</p>
`;


// TEMA: 3.5 Pruebas automatizadas con Mocha — 20/10/2024
// Este bloque explica la importancia de las pruebas automatizadas para
// asegurar que el código funcione como se espera y evitar regresiones.
// Mocha es un framework popular para pruebas en JavaScript. Aquí, solo simulamos
// la lógica de prueba para un ejemplo simple.
// Aprendí que las pruebas son cruciales para un desarrollo robusto y sin errores.

// Función a ser probada
function esPar(numero) {
    return numero % 2 === 0;
}

// Simulando la estructura de una prueba con Mocha (esto no ejecuta pruebas reales aquí)
// En un entorno de pruebas real, tendríamos archivos de prueba separados.
const output35 = document.getElementById('output-3-5');
output35.innerHTML = '<h3>Simulación de pruebas unitarias para `esPar(numero)`</h3>';

function runTest(description, testFunction) {
    try {
        testFunction();
        output35.innerHTML += `<p style="color: green;">✓ ${description}</p>`;
    } catch (e) {
        output35.innerHTML += `<p style="color: red;">✗ ${description} - ${e.message}</p>`;
    }
}

runTest('esPar(2) debería ser true', () => {
    if (!esPar(2)) throw new Error('Falló para 2');
});

runTest('esPar(3) debería ser false', () => {
    if (esPar(3)) throw new Error('Falló para 3');
});

runTest('esPar(0) debería ser true', () => {
    if (!esPar(0)) throw new Error('Falló para 0');
});

output35.innerHTML += '<p>Estas son simulaciones. Las pruebas reales usarían un framework como Mocha/Chai.</p>';


// TEMA: 3.6 Polipastos y transpiladores — 20/10/2024
// Este bloque aborda la compatibilidad del código JavaScript moderno con
// navegadores más antiguos. Los "polipastos" (polyfills) son trozos de código
// que implementan funcionalidades modernas en entornos antiguos. Los
// "transpiladores" (transpilers, como Babel) convierten código de una versión
// reciente de JS (ES6+) a una versión compatible con navegadores más viejos (ES5).
// Aprendí que son herramientas esenciales para escribir código moderno sin
// preocuparse excesivamente por la compatibilidad de navegadores.

// Ejemplo de funcionalidad moderna que podría necesitar un polyfill/transpilador
// Array.prototype.includes() se introdujo en ES2016
const frutas = ['manzana', 'banana', 'cereza'];

let mensaje36 = "";

if (frutas.includes('banana')) {
    mensaje36 += '<p>El array incluye "banana" (funcionalidad moderna).</p>';
} else {
    mensaje36 += '<p>El array NO incluye "banana" (posiblemente un navegador antiguo sin polyfill).</p>';
}

// Otro ejemplo: uso de `const` y `let` o arrow functions, que son transpiladas.
const miFuncionFlecha = () => {
    return "Esto es una función flecha.";
};
mensaje36 += `<p>${miFuncionFlecha()}</p>`;
mensaje36 += '<p>Para navegadores antiguos, un transpilador (como Babel) convertiría el código moderno a ES5.</p>';

document.getElementById('output-3-6').innerHTML = mensaje36;