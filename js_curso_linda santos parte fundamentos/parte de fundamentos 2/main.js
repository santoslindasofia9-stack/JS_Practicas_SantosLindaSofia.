
"use strict";
// 2.1 ¡Hola mundo! 
console.log("2.1 ¡Hola mundo!");
console.log("El script 'main.js' se ha cargado correctamente.");

// 2.2 Estructura del código 
alert(linda)
alert(sofia)
alert(santos )
alert(galeano)

// 2.3 El modo moderno, "usar estricto" 
// Explicación: La directiva `"use strict"` habilita un modo más estricto para el código,
// ayudando a prevenir errores comunes y malas prácticas (ej. variables sin declarar).
// `"use strict";` // Ya declarado al inicio de este archivo
// variableNoDeclarada = "Esto generaría un ReferenceError en modo estricto"; // Descomenta para ver el error
let variableModoEstricto = "Esta variable está correctamente declarada.";
console.log(`2.3 "use strict" - Estado: ${variableModoEstricto}`);
// Observaciones: Es una buena práctica usar "use strict" para un código más robusto.

// 2.4 Variables 
// Explicación: `let` (variable reasignable, ámbito de bloque), `const` (constante, no reasignable, ámbito de bloque),
// `var` (antigua, ámbito de función, evitar).
let contadorEventos = 0;
contadorEventos = 5;
const IVA = 0.19;
var mensajeLegado = "Usando var, evitar en código nuevo.";

// Práctica: Mostrar los valores en el DOM.
const varSection = document.getElementById('tema-2-4');
if (varSection) {
    varSection.innerHTML += `<p>Variable <code>contadorEventos</code> (let): ${contadorEventos}</p>`;
    varSection.innerHTML += `<p>Constante <code>IVA</code> (const): ${IVA}</p>`;
    varSection.innerHTML += `<p>Variable <code>mensajeLegado</code> (var): ${mensajeLegado} (<i>Evitar su uso</i>)</p>`;
}
// Observaciones: Priorizar `const` y `let` sobre `var`.

// 2.5 Tipos de datos - 20/10/2025
// Explicación: `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint` (primitivos)
// y `object` (para estructuras más complejas como arrays, funciones, objetos literales).
let cantidadProductos = 150;        // number
let nombreCliente = "Juan Pérez";   // string
let productoDisponible = true;      // boolean
let valorInicial = null;            // null (typeof es 'object', error histórico)
let emailUsuario;                   // undefined
let idTransaccion = Symbol("trx-001"); // symbol
let poblacionMundial = 7900000000n; // bigint

// Práctica: Muestra el tipo de cada variable en la consola.
console.log(`2.5 Tipos de datos -`);
console.log(`  Tipo de 'cantidadProductos': ${typeof cantidadProductos}`);
console.log(`  Tipo de 'nombreCliente': ${typeof nombreCliente}`);
console.log(`  Tipo de 'valorInicial': ${typeof valorInicial} (¡'object'!)`);
// Observaciones: Entender el `typeof` para cada tipo es fundamental.

// 2.6 Interacción: alerta, aviso, confirmación - 20/10/2025
// Explicación: Funciones del navegador para interactuar con el usuario:
// `alert()` (mensaje), `prompt()` (entrada de texto), `confirm()` (pregunta sí/no). Son bloqueantes.

// Descomenta para probar:
// alert("2.6 Interacción: ¡Mensaje de alerta!");
// let usuarioNombre = prompt("Ingresa tu nombre:", "Anónimo");
// let estaDeAcuerdo = confirm("¿Estás de acuerdo?");

// Práctica: Pedir la edad y mostrar el resultado en el DOM.
const interactionSection = document.getElementById('tema-2-6');
if (interactionSection) {
    let edadInput = prompt("2.6 Interacción: ¿Cuál es tu edad?", "");
    if (edadInput !== null && edadInput.trim() !== "") {
        let edadNum = Number(edadInput);
        if (!isNaN(edadNum) && edadNum > 0) {
            interactionSection.innerHTML += `<p>Tu edad: <strong>${edadNum}</strong> años.</p>`;
        } else {
            interactionSection.innerHTML += `<p>Entrada de edad no válida: "${edadInput}".</p>`;
        }
    } else {
        interactionSection.innerHTML += `<p>Edad no ingresada.</p>`;
    }
}
// Observaciones: Usar estas funciones con moderación debido a su naturaleza bloqueante.
// 2.7 Conversiones de tipos - 20/10/2025
// Explicación: Conversión de valores entre tipos (ej. string a number, number a string, a boolean).
// Métodos: `String()`, `Number()`, `Boolean()`, `parseInt()`, `parseFloat()`.

console.log(`2.7 Conversiones de tipos -`);
let strNumero = "123";
let numA = Number(strNumero); // "123" -> 123
let strDecimal = "45.67";
let numB = parseFloat(strDecimal); // "45.67" -> 45.67
let numAString = String(789); // 789 -> "789"
let ceroABool = Boolean(0); // 0 -> false

// Práctica: Mostrar una conversión de string a número en el DOM.
const convSection = document.getElementById('tema-2-7');
if (convSection) {
    let cantidadStockTexto = "500";
    let cantidadStockNumero = parseInt(cantidadStockTexto);
    convSection.innerHTML += `<p>String "<code>${cantidadStockTexto}</code>" a Number: <code>${cantidadStockNumero}</code></p>`;
    convSection.innerHTML += `<p>Después de sumar 10: <code>${cantidadStockNumero + 10}</code></p>`;
}
// Observaciones: Cuidado con `NaN` (Not a Number) en conversiones fallidas.
// 2.8 Operadores básicos, matemáticas - 20/10/2025
// Explicación: Operadores aritméticos (+, -, *, /, %, **), de incremento/decremento (++, --),
// y de asignación compuesta (+=, -=, *=, etc.).
let operando1 = 15;
let operando2 = 4;
let resultado;

console.log(`2.8 Operadores básicos, matemáticas -`);
resultado = operando1 + operando2; // Suma
console.log(`  Suma (15 + 4): ${resultado}`);
operando1++; // Incremento
console.log(`  operando1 después de ++: ${operando1}`);
let k = 100;
k += 50; // Asignación compuesta
console.log(`  k después de k += 50: ${k}`);

// Observaciones: Comprender la precedencia de operadores y el uso de paréntesis.
// 2.9 Comparaciones - 20/10/2025
// Explicación: Comparan valores y devuelven `true` o `false`.
// `==` (igualdad flexible, con conversión de tipos), `===` (igualdad estricta, sin conversión de tipos),
// `!=`, `!==`, `>`, `<`, `>=`, `<=`.
let valA = 10;
let valB = "10";
let valC = 5;

console.log(`2.9 Comparaciones -`);
console.log(`  Igualdad flexible (10 == "10"): ${valA == valB}`); // true
console.log(`  Igualdad estricta (10 === "10"): ${valA === valB}`); // false
console.log(`  Mayor que (10 > 5): ${valA > valC}`); // true
console.log(`  null == undefined: ${null == undefined}`); // true
console.log(`  null === undefined: ${null === undefined}`); // false

// Observaciones: Se recomienda usar `===` y `!==` para evitar sorpresas por coerciones de tipo.
// 2.10 Ramificación condicional: si, '?' - 20/10/2025
// Explicación: `if-else if-else` para lógica condicional.
// Operador ternario `condicion ? valorSiTrue : valorSiFalse` para expresiones condicionales concisas.
let puntuacion = 85;
let nivel = "";

console.log(`2.10 Ramificación condicional: si, '?' -`);
if (puntuacion >= 90) {
    nivel = "Excelente";
} else {
    nivel = "Bueno";
}
console.log(`  Puntuación: ${puntuacion}, Nivel: ${nivel}`);

let mensajeEstado = (puntuacion >= 60) ? "Aprobado" : "Reprobado";
console.log(`  Puntuación: ${puntuacion}, Estado (ternario): ${mensajeEstado}`);

// Práctica: Mostrar el estado de una luz en el DOM.
const ifSection = document.getElementById('tema-2-10');
if (ifSection) {
    let luzEncendida = true;
    let estadoLuz = luzEncendida ? "Encendida" : "Apagada";
    ifSection.innerHTML += `<p>La luz está: <strong>${estadoLuz}</strong>.</p>`;
}
// Observaciones: `if-else` para bloques de código; ternario para asignaciones de valor.

// 2.11 Operadores lógicos - 20/10/2025
// Explicación: `&&` (AND), `||` (OR), `!` (NOT). Se usan para combinar booleanos.
// Tienen comportamiento de "cortocircuito" que devuelve el operando que causó la decisión.
let tieneLicencia = true;
let tieneVehiculo = false;

console.log(`2.11 Operadores lógicos -`);
console.log(`  Tiene licencia Y vehículo: ${tieneLicencia && tieneVehiculo}`); // false
console.log(`  Tiene licencia O vehículo: ${tieneLicencia || tieneVehiculo}`); // true
console.log(`  No tiene licencia: ${!tieneLicencia}`); // false

// Cortocircuito con &&: 10 && 0 && "final" -> 0 (primer falsy)
// Cortocircuito con ||: null || "texto" || undefined -> "texto" (primer truthy)

// Observaciones: Útiles para control de flujo y valores por defecto.
// 2.12 Operador de fusión nulo '??' - 20/10/2025
// Explicación: `??` (Nullish coalescing operator) devuelve el operando derecho si el izquierdo
// es `null` o `undefined`. A diferencia de `||`, no considera `0` o `''` como falsy.
let configuracionUsuario = null;
let valorPorDefectoNombre = "Usuario Anónimo";
let nombreAMostrar = configuracionUsuario ?? valorPorDefectoNombre; // "Usuario Anónimo"
console.log(`2.12 Operador de fusión nulo '??' - Nombre (null): ${nombreAMostrar}`);

let puntosObtenidos = 0; // Es 0, no null/undefined
let puntosPorDefecto = 100;
let puntosFinales = puntosObtenidos ?? puntosPorDefecto; // 0
console.log(`  Puntos (0): ${puntosFinales}`);

// Observaciones: Ideal para proporcionar valores por defecto solo cuando el valor es estrictamente `null` o `undefined`.// ******************************************************
// 2.13 Bucles: mientras y para - 20/10/2025
// Explicación: `while` (repite mientras la condición sea verdadera) y `for` (bucle más estructurado
// para un número conocido de iteraciones).
console.log(`2.13 Bucles: mientras y para -`);

// Bucle while
let contadorWhile = 0;
while (contadorWhile < 3) {
    console.log(`  Contador while: ${contadorWhile}`);
    contadorWhile++;
}

// Bucle for
for (let i = 0; i < 3; i++) {
    console.log(`  Contador for: ${i}`);
}

// Práctica: Generar una lista en el DOM.
const loopSection = document.getElementById('tema-2-13');
if (loopSection) {
    let ul = document.createElement('ul');
    for (let j = 1; j <= 5; j++) {
        let li = document.createElement('li');
        li.textContent = `Elemento de lista ${j}`;
        ul.appendChild(li);
    }
    loopSection.appendChild(ul);
}
// Observaciones: `for` es común para recorrer arrays o rangos; `while` para condiciones más dinámicas.
// 2.14 La declaración "switch" - 20/10/2025
// Explicación: Alternativa a `if-else if-else` para múltiples ramificaciones basadas en el valor de una única expresión.
// Usa `case` para cada valor posible y `break` para salir del `switch`. `default` es opcional.
let diaSemana = "Martes";
let actividad = "";

console.log(`2.14 La declaración "switch" -`);
switch (diaSemana) {
    case "Lunes":
        actividad = "Inicio de semana laboral.";
        break;
    case "Martes":
    case "Miércoles": // Múltiples casos para el mismo bloque
    case "Jueves":
        actividad = "Día intermedio.";
        break;
    case "Viernes":
        actividad = "¡Casi fin de semana!";
        break;
    default:
        actividad = "Fin de semana o día no reconocido.";
}
console.log(`  Hoy es ${diaSemana}: ${actividad}`);

// Práctica: Mostrar el color asociado a una fruta en el DOM.
const switchSection = document.getElementById('tema-2-14');
if (switchSection) {
    let fruta = "manzana";
    let colorFruta = "";
    switch (fruta) {
        case "manzana":
            colorFruta = "Rojo o verde";
            break;
        case "plátano":
            colorFruta = "Amarillo";
            break;
        default:
            colorFruta = "Desconocido";
    }
    switchSection.innerHTML += `<p>La ${fruta} es de color: <strong>${colorFruta}</strong>.</p>`;
}
// Observaciones: Los `break` son cruciales para evitar la "caída" (fall-through) al siguiente `case`.
// 2.15 Funciones - 20/10/2025
// Explicación: Bloques de código reutilizables. Se definen con la palabra clave `function`.
// Pueden aceptar parámetros y devolver un valor.
function saludar(nombre) {
    return `Hola, ${nombre}!`;
}
console.log(`2.15 Funciones - Saludo: ${saludar("Ana")}`);

function multiplicar(a, b) {
    return a * b;
}
console.log(`  Multiplicación de 6 y 7: ${multiplicar(6, 7)}`);

// Observaciones: Ayudan a organizar el código, evitar la repetición y mejorar la legibilidad.
// 2.16 Expresiones de funciones
// Explicación: Una función también puede ser creada como parte de una expresión.
// Esto significa que una función puede asignarse a una variable.
const decirAdios = function(nombre) { // La función es un valor asignado a la constante
    return `Adiós, ${nombre}.`;
};
console.log(`2.16 Expresiones de funciones - Despedida: ${decirAdios("Beto")}`);

// Una expresión de función puede ser anónima (sin nombre después de `function`).
const operacion = function(a, b, operador) {
    if (operador === '+') return a + b;
    if (operador === '-') return a - b;
    return "Operación no válida";
};
console.log(`  Operación (10 + 5): ${operacion(10, 5, '+')}`);

// Observaciones: Las expresiones de función no tienen "hoisting" completo como las declaraciones.
// Son útiles para callbacks o funciones que se pasan como argumentos.
// 2.17 Funciones de flecha, conceptos básicos 
// Explicación: Una sintaxis más concisa para definir funciones, especialmente para funciones anónimas.
// Ideales para casos de una sola línea o callbacks. No tienen su propio `this`.
// Sintaxis básica: `(param1, param2) => { cuerpo; }` o `(param) => expresion;`

// Función de flecha con un solo parámetro (paréntesis opcionales)
const duplicar = numero => numero * 2;
console.log(`2.17 Funciones de flecha - Duplicar 8: ${duplicar(8)}`);

// Función de flecha con múltiples parámetros
const restar = (a, b) => a - b;
console.log(`  Restar (15 - 3): ${restar(15, 3)}`);

// Función de flecha con bloque de código (necesita `return` explícito)
const saludarLargo = (nombre, hora) => {
    let mensaje = `Hola ${nombre}, son las ${hora}h.`;
    return mensaje;
};
console.log(`  Saludo largo: ${saludarLargo("Carla", 10)}`);

// Observaciones: Muy populares para hacer el código más compacto y legible,
// especialmente en `map`, `filter`, `forEach` de arrays.
// 2.18 Especiales de JavaScript - 20/10/2025
// Explicación: Este tema es un poco ambiguo y puede referirse a varios aspectos del lenguaje que no encajan en categorías anteriores.
// Podría incluir: Comportamiento de `this`, cierre (closures), IIFEs (Immediately Invoked Function Expressions),
// o la naturaleza de los objetos y la herencia por prototipos.
// Para esta práctica, cubriremos un ejemplo de "Closure" (Cierre), que es un concepto fundamental.

// Cierre (Closure): Una función "recuerda" su entorno léxico (las variables de su ámbito exterior)
// incluso después de que ese ámbito exterior haya terminado de ejecutarse.

function crearContador() {
    let count = 0; // Variable en el ámbito de 'crearContador'
    return function() { // Esta función interna es el cierre
        count++;
        return count;
    };
}

const miContador = crearContador(); // 'miContador' ahora es la función interna
console.log(`2.18 Especiales de JavaScript -`);
console.log(`  Contador 1: ${miContador()}`); // 1
console.log(`  Contador 2: ${miContador()}`); // 2
console.log(`  Contador 3: ${miContador()}`); // 3

// Crear otro contador independiente
const otroContador = crearContador();
console.log(`  Otro contador 1: ${otroContador()}`); // 1

// Observaciones: Los cierres son poderosos para mantener el estado y crear funciones más flexibles.
// `this` es otro tema "especial" que depende mucho del contexto de ejecución de la función.