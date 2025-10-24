// TEMA: 10.1 Manejo de errores, "try...catch" — 20/05/2024
// Este bloque demuestra cómo usar la estructura try...catch para manejar excepciones.
// Permite que el código se ejecute de forma segura, capturando errores sin detener el programa.

const output10_1 = document.getElementById('output-10-1');
let log10_1 = "--- Tema 10.1: try...catch ---\n\n";

try {
    log10_1 += "Iniciando bloque try...\n";
    // Código que podría generar un error
    // Por ejemplo, una variable no definida
    // alert(variableNoDefinida); // Esto generaría un ReferenceError
    log10_1 += "Código dentro de try ejecutado sin error aparente.\n";

    // Simular un error para que el catch se active
    throw new Error("¡Algo salió mal intencionalmente!");
    log10_1 += "Esta línea no se ejecutará si el throw anterior ocurre.\n";

} catch (error) {
    // Este bloque se ejecuta si ocurre un error en el bloque try
    log10_1 += "¡Error capturado en el bloque catch!\n";
    log10_1 += `Tipo de error: ${error.name}\n`; // Nombre del tipo de error (ej: ReferenceError, TypeError, Error)
    log10_1 += `Mensaje de error: ${error.message}\n`; // Mensaje descriptivo del error
    log10_1 += "La ejecución del programa continúa después del catch.\n";
} finally {
    // El bloque finally siempre se ejecuta, haya o no error.
    // Es útil para limpiar recursos o realizar acciones finales.
    log10_1 += "\nBloque finally siempre ejecutado.\n";
}

log10_1 += "\nEl programa continúa después del bloque try...catch...finally.\n";
output10_1.textContent = log10_1;

// Ejemplo práctico: Parsar JSON
log10_1 += "\n--- Ejemplo práctico: Parsar JSON ---\n";
let json = '{ "nombre": "Alice", "edad": 30 }';
try {
    let user = JSON.parse(json); // Parsea el JSON correctamente
    log10_1 += `Usuario parseado: ${user.nombre}, ${user.edad} años.\n`;

    let badJson = '{ "edad": 25 }'; // JSON incompleto para simular un error al acceder a 'nombre'
    let badUser = JSON.parse(badJson);
    // Intentamos acceder a una propiedad que podría no existir, aunque el JSON.parse funcione
    log10_1 += `Usuario con JSON incompleto (intentando acceder a nombre): ${badUser.nombre}\n`;
    // Nota: Acceder a badUser.nombre no lanza un error aquí, simplemente es undefined.
    // Un error se lanzaría si badUser fuera null/undefined y se intentara acceder a una propiedad.
    // Para demostrar un error de parseo:
    // let invalidJson = '{ "nombre": "Bob" }'; // JSON mal formado
    // JSON.parse(invalidJson); // Esto sí lanzaría un SyntaxError
} catch (error) {
    log10_1 += `¡Error al parsear JSON o acceder a propiedades! ${error.name}: ${error.message}\n`;
} finally {
    output10_1.textContent = log10_1;
}


// TEMA: 10.2 Errores personalizados, error de extensión — 20/05/2024
// Este bloque explica cómo crear y usar errores personalizados.
// Es útil cuando queremos diferenciar errores específicos de nuestra lógica de negocio.

const output10_2 = document.getElementById('output-10-2');
let log10_2 = "--- Tema 10.2: Errores personalizados ---\n\n";

// Paso 1: Definir una clase para nuestro error personalizado
// Extendemos de la clase Error estándar para que nuestro error herede sus propiedades (name, message, stack)
class ValidationError extends Error {
    constructor(message) {
        super(message); // Llama al constructor de la clase Error
        this.name = "ValidationError"; // Sobrescribimos el nombre del error para que sea más específico
        // Podemos añadir propiedades personalizadas si las necesitamos
        // this.code = 'VALIDATION_FAILED';
    }
}

class NetworkError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "NetworkError";
        this.status = status; // Propiedad personalizada para el código de estado de red
    }
}

log10_2 += "Clases ValidationError y NetworkError definidas.\n\n";

// Paso 2: Usar nuestro error personalizado en un bloque try...catch
function verificarEdad(edad) {
    if (isNaN(edad) || edad < 0) {
        throw new ValidationError("La edad debe ser un número positivo.");
    }
    if (edad < 18) {
        throw new ValidationError("Debe ser mayor de 18 años.");
    }
    return true;
}

try {
    log10_2 += "Intentando verificar edad (20 años)...\n";
    verificarEdad(20);
    log10_2 += "Edad verificada correctamente: 20 años.\n\n";

    log10_2 += "Intentando verificar edad (15 años)...\n";
    verificarEdad(15); // Esto lanzará un ValidationError
    log10_2 += "Esta línea no se ejecutará si la edad es menor a 18.\n";

} catch (error) {
    if (error instanceof ValidationError) {
        log10_2 += `¡Error de Validación capturado! Nombre: ${error.name}, Mensaje: ${error.message}\n`;
        // Podemos añadir lógica específica para este tipo de error
    } else {
        log10_2 += `¡Otro tipo de error capturado! Nombre: ${error.name}, Mensaje: ${error.message}\n`;
    }
    log10_2 += "La ejecución continúa después de capturar el error de validación.\n\n";
}

// Ejemplo con NetworkError
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new NetworkError(`Fallo en la red con estado ${response.status}`, response.status);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof NetworkError) {
            log10_2 += `¡Error de red! Estado: ${error.status}, Mensaje: ${error.message}\n`;
        } else {
            log10_2 += `¡Error inesperado! ${error.name}: ${error.message}\n`;
        }
        return null;
    }
}

// Simular una llamada a API fallida (URL incorrecta)
log10_2 += "Intentando obtener datos de una URL inexistente...\n";
fetchData('https://api.nonexistenturl.com/data')
    .then(data => {
        if (data) {
            log10_2 += `Datos recibidos: ${JSON.stringify(data)}\n`;
        } else {
            log10_2 += "No se pudieron obtener los datos.\n";
        }
        output10_2.textContent = log10_2; // Actualizar el contenido final
    });


// Es importante recordar que las promesas manejan sus propios errores con .catch()
// pero dentro de async/await, try/catch funciona de forma síncrona.
log10_2 += "Fin del bloque de errores personalizados.\n";
// La última actualización de output10_2.textContent se hará dentro del .then/.catch de fetchData
// para asegurar que el mensaje asíncrono se incluya.