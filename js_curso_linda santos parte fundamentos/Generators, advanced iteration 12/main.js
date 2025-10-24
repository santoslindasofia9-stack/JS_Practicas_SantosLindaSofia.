
// TEMA: 12.1 Generadores - 26/05/2024
// Este bloque explora la funcionalidad de las funciones generadoras en JavaScript,
// que permiten pausar y reanudar la ejecución, produciendo una secuencia de valores
// a través de la palabra clave `yield`.
// Aprendimos a crear iteradores personalizados de manera más sencilla.
// =========================================================================

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const generator = idGenerator();

const output12_1 = document.getElementById('output-12-1');
if (output12_1) {
    let content = "<h3>Ejemplo de Generadores (idGenerator)</h3>";
    content += `<p>Primer ID: ${generator.next().value}</p>`;
    content += `<p>Segundo ID: ${generator.next().value}</p>`;
    content += `<p>Tercer ID: ${generator.next().value}</p>`;
    output12_1.innerHTML = content;
}
console.log("12.1 Generadores: IDs generados:", generator.next().value, generator.next().value);


// Otro ejemplo: un generador para una secuencia Fibonacci
function* fibonacciGenerator() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b]; // Destructuring assignment para actualizar a y b
    }
}

const fibGen = fibonacciGenerator();
console.log("12.1 Generadores - Fibonacci:", fibGen.next().value, fibGen.next().value, fibGen.next().value, fibGen.next().value, fibGen.next().value);


// =========================================================================
// TEMA: 12.2 Async iteration and generators - 26/05/2024
// Este bloque introduce la iteración asíncrona y los generadores asíncronos,
// que permiten manejar secuencias de valores que se resuelven de forma asíncrona
// (por ejemplo, datos de red o eventos con retardo).
// Aprendimos a usar `for await...of` y `async function*`.
// =========================================================================

async function* asyncNumberGenerator() {
    let num = 1;
    while (num <= 5) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simula una operación asíncrona
        yield num++;
    }
}

const output12_2 = document.getElementById('output-12-2');
if (output12_2) {
    output12_2.innerHTML = "<h3>Ejemplo de Generadores Asíncronos</h3><p>Generando números...</p>";

    (async () => {
        let content = "<p>Números generados de forma asíncrona:</p><ul>";
        for await (let number of asyncNumberGenerator()) {
            content += `<li>${number}</li>`;
            output12_2.innerHTML = "<h3>Ejemplo de Generadores Asíncronos</h3>" + content; // Actualizar dinámicamente
            console.log("12.2 Async iteration and generators: Número asíncrono:", number);
        }
        content += "</ul><p>Generación asíncrona completada.</p>";
        output12_2.innerHTML = "<h3>Ejemplo de Generadores Asíncronos</h3>" + content;
    })();
} else {
    console.warn("12.2 Async iteration and generators: Elemento 'output-12-2' no encontrado.");
}