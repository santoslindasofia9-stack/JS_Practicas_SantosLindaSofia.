// main.js - Código del curso JavaScript.info
// Nombre: [Tu Nombre Completo]
// Curso: [Tu Grado y Grupo]
// Fecha: [Fecha Actual]

console.log("main.js cargado correctamente.");

// ======================================================================================
// TEMA: 3.1 Depuración en el navegador — [Fecha Actual]
// Este bloque demuestra cómo usar `console.log()` para mostrar mensajes en la consola
// del navegador. Es fundamental para depurar y entender el flujo de ejecución.
// Aquí se mostrarán mensajes que puedes ver presionando F12 en tu navegador
// y yendo a la pestaña "Console".
// Aprendí: La importancia de console.log para el debugging básico.
// ======================================================================================
console.log("3.1 Depuración: Mensaje de ejemplo en la consola.");
let debugVariable = "Hola desde la depuración!";
console.log("3.1 Depuración: Valor de debugVariable:", debugVariable);
console.warn("3.1 Depuración: Esto es una advertencia.");
console.error("3.1 Depuración: Esto es un error.");


// ======================================================================================
// TEMA: 11.1 Introducción: devoluciones de llamadas (Callbacks) — [Fecha Actual]
// Este bloque explora la programación asíncrona utilizando callbacks.
// Demuestra cómo una función puede recibir otra función como argumento y ejecutarla
// cuando una operación asíncrona ha terminado.
// Se ilustra el concepto de "Callback Hell" (infierno de callbacks) para mostrar
// las dificultades de anidar muchos callbacks.
// Aprendí: Qué son los callbacks, cómo se usan para asincronía y el problema del Callback Hell.
// ======================================================================================
console.log("\n--- 11.1 Callbacks ---");

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(null, src); // Éxito: sin error, con la fuente
    script.onerror = () => callback(new Error(`Error al cargar el script ${src}`)); // Error
    document.head.append(script);
}

// Ejemplo de callback simple
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js', (error, scriptSrc) => {
    if (error) {
        console.error('11.1 Callback: Falló la carga de lodash:', error);
        document.getElementById('output-11-1').innerHTML += `<p>Error al cargar lodash: ${error.message}</p>`;
    } else {
        console.log('11.1 Callback: Script lodash cargado:', scriptSrc);
        document.getElementById('output-11-1').innerHTML += `<p>Script lodash cargado: ${scriptSrc}</p>`;
        // Aquí podríamos usar _.isEmpty o alguna función de lodash
    }
});

// Ejemplo simplificado de Callback Hell
function step1(callback) {
    setTimeout(() => {
        console.log('11.1 Callback Hell: Paso 1 completado');
        document.getElementById('output-11-1').innerHTML += '<p>Callback Hell: Paso 1 completado</p>';
        callback();
    }, 1000);
}

function step2(callback) {
    setTimeout(() => {
        console.log('11.1 Callback Hell: Paso 2 completado');
        document.getElementById('output-11-1').innerHTML += '<p>Callback Hell: Paso 2 completado</p>';
        callback();
    }, 800);
}

function step3(callback) {
    setTimeout(() => {
        console.log('11.1 Callback Hell: Paso 3 completado (fin del Callback Hell)');
        document.getElementById('output-11-1').innerHTML += '<p>Callback Hell: Paso 3 completado</p>';
    }, 500);
}

// Anidamiento de callbacks (Callback Hell)
step1(() => {
    step2(() => {
        step3(() => {
            console.log('11.1 Callback Hell: Todas las operaciones completadas!');
            document.getElementById('output-11-1').innerHTML += '<p>Callback Hell: Todas las operaciones completadas!</p>';
        });
    });
});


// ======================================================================================
// TEMA: 11.2 Promesa — [Fecha Actual]
// Este bloque introduce las Promesas como una alternativa a los callbacks para manejar
// la asincronía de una manera más estructurada y legible.
// Muestra cómo crear una Promesa (con resolve y reject) y cómo consumirla usando `.then()`.
// Se explica el concepto de los estados de una Promesa: pending, fulfilled (resuelto) y rejected (rechazado).
// Aprendí: La estructura básica de una Promesa y cómo usar .then() para éxito o error.
// ======================================================================================
console.log("\n--- 11.2 Promesa ---");

const myPromise = new Promise((resolve, reject) => {
    console.log('11.2 Promesa: Promesa en estado "pending"');
    document.getElementById('output-11-2').innerHTML += '<p>Promesa en estado "pending"</p>';

    // Simular una operación asíncrona
    setTimeout(() => {
        let success = Math.random() > 0.5; // 50% de posibilidades de éxito
        if (success) {
            resolve("Datos obtenidos correctamente!"); // La promesa se cumple
        } else {
            reject(new Error("Fallo al obtener los datos.")); // La promesa se rechaza
        }
    }, 2000); // Esperar 2 segundos
});

myPromise
    .then(result => {
        console.log('11.2 Promesa: Éxito:', result);
        document.getElementById('output-11-2').innerHTML += `<p>Éxito: ${result}</p>`;
    })
    .catch(error => {
        console.error('11.2 Promesa: Error:', error.message);
        document.getElementById('output-11-2').innerHTML += `<p>Error: ${error.message}</p>`;
    })
    .finally(() => {
        console.log('11.2 Promesa: La promesa ha finalizado (independiente del éxito/error).');
        document.getElementById('output-11-2').innerHTML += '<p>La promesa ha finalizado.</p>';
    });

// Otra promesa que siempre resuelve
const alwaysResolvePromise = new Promise(resolve => {
    setTimeout(() => resolve("Esta promesa siempre resuelve."), 1500);
});

alwaysResolvePromise.then(message => {
    console.log('11.2 Promesa: ' + message);
    document.getElementById('output-11-2').innerHTML += `<p>${message}</p>`;
});


// ======================================================================================
// TEMA: 11.3 Promesas encadenadas — [Fecha Actual]
// Este bloque demuestra cómo encadenar múltiples operaciones asíncronas de manera secuencial
// utilizando `.then()`. Cada `.then()` devuelve una nueva promesa, permitiendo una secuencia
// de operaciones limpias sin anidamiento excesivo (adiós Callback Hell).
// Aprendí: Cómo ejecutar operaciones asíncronas en secuencia, pasando resultados de una a otra.
// ======================================================================================
console.log("\n--- 11.3 Promesas encadenadas ---");

function fetchUserData(userId) {
    return new Promise(resolve => {
        console.log(`11.3 Cadena: Buscando usuario ${userId}...`);
        document.getElementById('output-11-3').innerHTML += `<p>Buscando usuario ${userId}...</p>`;
        setTimeout(() => resolve({ id: userId, name: `Usuario ${userId}` }), 1000);
    });
}

function fetchUserPosts(user) {
    return new Promise(resolve => {
        console.log(`11.3 Cadena: Buscando posts para ${user.name}...`);
        document.getElementById('output-11-3').innerHTML += `<p>Buscando posts para ${user.name}...</p>`;
        setTimeout(() => resolve([{ title: "Post 1 de " + user.name }, { title: "Post 2 de " + user.name }]), 1000);
    });
}

fetchUserData(123)
    .then(user => {
        console.log('11.3 Cadena: Usuario obtenido:', user);
        document.getElementById('output-11-3').innerHTML += `<p>Usuario obtenido: ${user.name}</p>`;
        return fetchUserPosts(user); // Retorna una nueva promesa
    })
    .then(posts => {
        console.log('11.3 Cadena: Posts obtenidos:', posts);
        document.getElementById('output-11-3').innerHTML += `<p>Posts obtenidos para el usuario.</p>`;
        posts.forEach(post => document.getElementById('output-11-3').innerHTML += `<li>${post.title}</li>`);
        return 'Operación completa'; // Se puede retornar un valor no promesa
    })
    .then(finalMessage => {
        console.log('11.3 Cadena: Mensaje final:', finalMessage);
        document.getElementById('output-11-3').innerHTML += `<p>Mensaje final: ${finalMessage}</p>`;
    })
    .catch(error => {
        console.error('11.3 Cadena: Error en el encadenamiento:', error);
        document.getElementById('output-11-3').innerHTML += `<p>Error en el encadenamiento: ${error.message}</p>`;
    });


// ======================================================================================
// TEMA: 11.4 Manejo de errores con promesas — [Fecha Actual]
// Este bloque se enfoca en cómo gestionar errores en promesas utilizando `.catch()`.
// Se demuestra cómo un error en cualquier punto de una cadena de promesas será capturado
// por el `.catch()` más cercano o final. También se muestra la diferencia entre errores
// que se lanzan dentro del executor y errores dentro de un `.then()`.
// Aprendí: La importancia de .catch() y cómo los errores se propagan en las cadenas de promesas.
// ======================================================================================
console.log("\n--- 11.4 Manejo de errores ---");

function doSomethingRisky(willFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (willFail) {
                reject(new Error("¡Algo salió mal en la operación riesgosa!"));
            } else {
                resolve("Operación riesgosa completada con éxito.");
            }
        }, 1000);
    });
}

// Ejemplo con éxito
doSomethingRisky(false)
    .then(result => {
        console.log('11.4 Error: Éxito en la primera operación:', result);
        document.getElementById('output-11-4').innerHTML += `<p>Éxito: ${result}</p>`;
        return "Siguiente paso exitoso.";
    })
    .then(nextResult => {
        console.log('11.4 Error: Siguiente paso:', nextResult);
        document.getElementById('output-11-4').innerHTML += `<p>Siguiente paso: ${nextResult}</p>`;
    })
    .catch(error => { // Este catch no se ejecutará aquí
        console.error('11.4 Error: Capturado un error (no debería verse en este caso):', error.message);
        document.getElementById('output-11-4').innerHTML += `<p>Error (no esperado): ${error.message}</p>`;
    });

// Ejemplo con error
doSomethingRisky(true)
    .then(result => {
        console.log('11.4 Error: Éxito inesperado (esto no debería ocurrir):', result);
        document.getElementById('output-11-4').innerHTML += `<p>Éxito inesperado: ${result}</p>`;
    })
    .catch(error => { // Este catch capturará el error de doSomethingRisky(true)
        console.error('11.4 Error: Error capturado correctamente:', error.message);
        document.getElementById('output-11-4').innerHTML += `<p>Error capturado: ${error.message}</p>`;
        // Se puede relanzar un error o devolver un valor de recuperación
        return 'Valor de recuperación por error.';
    })
    .then(recoveryValue => {
        console.log('11.4 Error: Después del catch:', recoveryValue);
        document.getElementById('output-11-4').innerHTML += `<p>Después del catch: ${recoveryValue}</p>`;
    });

// Errores lanzados dentro de .then() también son capturados
Promise.resolve(1)
    .then(value => {
        console.log('11.4 Error: Valor inicial:', value);
        document.getElementById('output-11-4').innerHTML += `<p>Valor inicial: ${value}</p>`;
        throw new Error("Error en el segundo .then()!");
    })
    .then(value => { // Este .then() se saltará
        console.log('11.4 Error: Este .then() no se ejecutará.', value);
    })
    .catch(error => {
        console.error('11.4 Error: Error del segundo .then() capturado:', error.message);
        document.getElementById('output-11-4').innerHTML += `<p>Error en .then() capturado: ${error.message}</p>`;
    });


// ======================================================================================
// TEMA: 11.5 API de promesas — [Fecha Actual]
// Este bloque explora los métodos estáticos de la clase Promise que permiten trabajar
// con múltiples promesas simultáneamente: `Promise.all()`, `Promise.race()`,
// `Promise.allSettled()` y `Promise.any()`.
// Aprendí: Cómo gestionar colecciones de promesas para diferentes escenarios (todas resuelven, la primera que resuelve/rechaza, etc.).
// ======================================================================================
console.log("\n--- 11.5 API de promesas ---");

const p1 = new Promise(resolve => setTimeout(() => resolve(1), 1000));
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 2000));
const p3 = new Promise(resolve => setTimeout(() => resolve(3), 500));
const pError = new Promise((resolve, reject) => setTimeout(() => reject(new Error("Fallo pError")), 1500));

// Promise.all(): Espera a que todas las promesas se cumplan. Si una falla, todas fallan.
Promise.all([p1, p2, p3])
    .then(results => {
        console.log('11.5 API: Promise.all éxito:', results); // [1, 2, 3]
        document.getElementById('output-11-5').innerHTML += `<p>Promise.all éxito: ${results}</p>`;
    })
    .catch(error => {
        console.error('11.5 API: Promise.all error:', error.message);
        document.getElementById('output-11-5').innerHTML += `<p>Promise.all error: ${error.message}</p>`;
    });

Promise.all([p1, pError, p3]) // Una de ellas falla, entonces Promise.all falla
    .then(results => {
        console.log('11.5 API: Promise.all con error (no debería verse):', results);
    })
    .catch(error => {
        console.error('11.5 API: Promise.all con error capturado:', error.message); // Fallo pError
        document.getElementById('output-11-5').innerHTML += `<p>Promise.all con error capturado: ${error.message}</p>`;
    });

// Promise.race(): La primera promesa que se cumple o se rechaza, gana.
Promise.race([p1, p2, p3])
    .then(result => {
        console.log('11.5 API: Promise.race (primera en resolver/rechazar):', result); // 3 (p3 es la más rápida)
        document.getElementById('output-11-5').innerHTML += `<p>Promise.race: ${result}</p>`;
    })
    .catch(error => {
        console.error('11.5 API: Promise.race error:', error.message);
        document.getElementById('output-11-5').innerHTML += `<p>Promise.race error: ${error.message}</p>`;
    });

Promise.race([pError, p1]) // p1 es más rápida que pError
    .then(result => {
        console.log('11.5 API: Promise.race con error (gana p1):', result);
        document.getElementById('output-11-5').innerHTML += `<p>Promise.race (p1 gana): ${result}</p>`;
    })
    .catch(error => {
        console.error('11.5 API: Promise.race con error (no debería pasar aquí):', error.message);
    });

// Promise.allSettled(): Espera a que todas las promesas terminen, sin importar si resuelven o rechazan.
Promise.allSettled([p1, pError, p3])
    .then(results => {
        console.log('11.5 API: Promise.allSettled (todos los resultados):', results);
        document.getElementById('output-11-5').innerHTML += `<p>Promise.allSettled: Ver consola para los detalles de cada promesa.</p>`;
        results.forEach(res => {
            document.getElementById('output-11-5').innerHTML += `<p>${res.status === 'fulfilled' ? '✅' : '❌'} ${res.status}: ${res.status === 'fulfilled' ? res.value : res.reason.message}</p>`;
        });
    });

// Promise.any(): Devuelve la primera promesa que se cumple con éxito. Si todas fallan, rechaza.
Promise.any([pError, p1, p2])
    .then(result => {
        console.log('11.5 API: Promise.any (primera que resuelve):', result); // 1 (p1 resuelve primero después del error de pError)
        document.getElementById('output-11-5').innerHTML += `<p>Promise.any: ${result}</p>`;
    })
    .catch(error => {
        console.error('11.5 API: Promise.any error (todas fallaron):', error);
        document.getElementById('output-11-5').innerHTML += `<p>Promise.any error: Todas las promesas fallaron.</p>`;
    });


// ======================================================================================
// TEMA: 11.6 Promisificación — [Fecha Actual]
// Este bloque demuestra cómo convertir una función que utiliza el patrón de callbacks
// (especialmente con el formato `callback(error, result)`) en una función que devuelve una Promesa.
// Esto permite usar código antiguo basado en callbacks con el nuevo API de Promesas.
// Aprendí: Cómo adaptar funciones legacy a un estilo moderno de manejo de asincronía.
// ======================================================================================
console.log("\n--- 11.6 Promisificación ---");

// Función de callback "antigua"
function loadDataCallback(url, callback) {
    console.log(`11.6 Promisificación: Intentando cargar datos de ${url} (callback)...`);
    document.getElementById('output-11-6').innerHTML += `<p>Cargando ${url} (callback)...</p>`;
    setTimeout(() => {
        if (url.includes("error")) {
            callback(new Error(`Fallo al cargar ${url}`));
        } else {
            callback(null, `Datos de ${url} cargados exitosamente.`);
        }
    }, 1500);
}

// Función para promisificar
function promisify(func) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            func.call(this, ...args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    };
}

// Promisificando loadDataCallback
const loadDataPromise = promisify(loadDataCallback);

// Usando la función promisificada con .then/.catch
loadDataPromise("api/data/success")
    .then(data => {
        console.log('11.6 Promisificación: Datos cargados (promesa):', data);
        document.getElementById('output-11-6').innerHTML += `<p>✅ Éxito promesa: ${data}</p>`;
    })
    .catch(error => {
        console.error('11.6 Promisificación: Error al cargar (promesa):', error.message);
        document.getElementById('output-11-6').innerHTML += `<p>❌ Error promesa: ${error.message}</p>`;
    });

loadDataPromise("api/data/error")
    .then(data => {
        console.log('11.6 Promisificación: Datos cargados (promesa) (no debería verse):', data);
    })
    .catch(error => {
        console.error('11.6 Promisificación: Error al cargar (promesa, esperado):', error.message);
        document.getElementById('output-11-6').innerHTML += `<p>❌ Error promesa (esperado): ${error.message}</p>`;
    });


// ======================================================================================
// TEMA: 11.7 Microtareas — [Fecha Actual]
// Este bloque explica el concepto de microtareas en el bucle de eventos de JavaScript,
// que son tareas de alta prioridad (como los `.then()` de las promesas) que se ejecutan
// antes de las macrotareas (como `setTimeout` o eventos DOM).
// Ayuda a entender el orden de ejecución de código asíncrono.
// Aprendí: El orden de ejecución entre microtareas y macrotareas en el event loop.
// ======================================================================================
console.log("\n--- 11.7 Microtareas ---");

console.log('11.7 Microtareas: Inicio del script');
document.getElementById('output-11-7').innerHTML += '<p>Inicio del script</p>';

setTimeout(() => {
    console.log('11.7 Microtareas: setTimeout (Macrotarea)');
    document.getElementById('output-11-7').innerHTML += '<p>setTimeout (Macrotarea)</p>';
}, 0); // Se ejecuta en la próxima macrotarea

Promise.resolve()
    .then(() => {
        console.log('11.7 Microtareas: Promise.then (Microtarea 1)');
        document.getElementById('output-11-7').innerHTML += '<p>Promise.then (Microtarea 1)</p>';
    })
    .then(() => {
        console.log('11.7 Microtareas: Promise.then (Microtarea 2)');
        document.getElementById('output-11-7').innerHTML += '<p>Promise.then (Microtarea 2)</p>';
    });

console.log('11.7 Microtareas: Fin del script (sincrónico)');
document.getElementById('output-11-7').innerHTML += '<p>Fin del script (sincrónico)</p>';

// El orden de salida en consola debería ser:
// Inicio del script
// Fin del script (sincrónico)
// Promise.then (Microtarea 1)
// Promise.then (Microtarea 2)
// setTimeout (Macrotarea)
document.getElementById('output-11-7').innerHTML += '<p>Ver la consola para el orden de ejecución (sincrónico -> microtareas -> macrotareas).</p>';


// ======================================================================================
// TEMA: 11.8 Asíncrono/espera (async/await) — [Fecha Actual]
// Este bloque introduce `async` y `await` como una sintaxis más limpia y moderna
// para trabajar con promesas. Una función `async` siempre devuelve una promesa,
// y `await` pausa la ejecución de la función `async` hasta que la promesa esperada
// se resuelve (o rechaza), haciendo que el código asíncrono parezca síncrono.
// Aprendí: Cómo simplificar la lectura y escritura de código asíncrono con async/await,
// y el manejo de errores con try...catch.
// ======================================================================================
console.log("\n--- 11.8 Async/Await ---");

function simulateFetch(data, delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`Fallo en la carga de ${data}`));
            } else {
                resolve(data);
            }
        }, delay);
    });
}

async function fetchDataSequence() {
    try {
        console.log('11.8 Async/Await: Iniciando secuencia de datos...');
        document.getElementById('output-11-8').innerHTML += '<p>Iniciando secuencia de datos...</p>';

        const user = await simulateFetch("Usuario Objeto", 2000);
        console.log('11.8 Async/Await: Usuario obtenido:', user);
        document.getElementById('output-11-8').innerHTML += `<p>✅ Usuario obtenido: ${user}</p>`;

        const posts = await simulateFetch("Posts Array", 1500);
        console.log('11.8 Async/Await: Posts obtenidos:', posts);
        document.getElementById('output-11-8').innerHTML += `<p>✅ Posts obtenidos: ${posts}</p>`;

        const comments = await simulateFetch("Comentarios Objeto", 1000);
        console.log('11.8 Async/Await: Comentarios obtenidos:', comments);
        document.getElementById('output-11-8').innerHTML += `<p>✅ Comentarios obtenidos: ${comments}</p>`;

        console.log('11.8 Async/Await: Secuencia de datos completa.');
        document.getElementById('output-11-8').innerHTML += '<p>Secuencia de datos completa.</p>';

    } catch (error) {
        console.error('11.8 Async/Await: Error en la secuencia de datos:', error.message);
        document.getElementById('output-11-8').innerHTML += `<p>❌ Error en la secuencia: ${error.message}</p>`;
    }
}

async function fetchDataWithError() {
    try {
        console.log('11.8 Async/Await: Iniciando secuencia con error...');
        document.getElementById('output-11-8').innerHTML += '<p>Iniciando secuencia con error...</p>';

        const data1 = await simulateFetch("Dato 1", 1000);
        console.log('11.8 Async/Await: Dato 1 obtenido:', data1);
        document.