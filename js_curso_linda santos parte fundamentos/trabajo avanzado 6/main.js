// main.js - Código del curso JavaScript.info
// TEMA: 6.1 Recursión y pila — 24/10/2025
// Este bloque demuestra el concepto de recursión mediante ejemplos de cálculo factorial
// y la suma de una serie de números. La recursión es una función que se llama a sí misma
// hasta que se cumple una condición base. Es crucial entender cómo funciona la pila de llamadas.
// Función recursiva para calcular el factorial de un número
function factorial(n) {
    // Caso base: si n es 0 o 1, el factorial es 1
    if (n === 0 || n === 1) {
        console.log(`Factorial(${n}): Caso base alcanzado, retornando 1.`);
        return 1;
    } else {
        // Paso recursivo: n * factorial(n-1)
        console.log(`Factorial(${n}): Llamando a Factorial(${n-1}).`);
        return n * factorial(n - 1);
    }
}
// Función recursiva para sumar una serie de números de 1 a n
function sumNumbers(n) {
    if (n === 1) {
        console.log(`sumNumbers(${n}): Caso base, retornando 1.`);
        return 1;
    } else {
        console.log(`sumNumbers(${n}): Sumando ${n} + sumNumbers(${n-1}).`);
        return n + sumNumbers(n - 1);
    }
}
// Practicando e imprimiendo resultados
console.log("--- TEMA 6.1: Recursión y pila ---");
const numFactorial = 5;
const resFactorial = factorial(numFactorial);
console.log(`El factorial de ${numFactorial} es: ${resFactorial}`); // Esperado: 120
const numSum = 4;
const resSum = sumNumbers(numSum);
console.log(`La suma de números hasta ${numSum} es: ${resSum}`); // Esperado: 10 (1+2+3+4)
// Actualizar el HTML para mostrar un resumen del resultad
document.getElementById('output-6-1').innerHTML = `
    Factorial de ${numFactorial}: ${resFactorial}<br>
    Suma de 1 a ${numSum}: ${resSum}<br>
    <br><i>Resultados detallados y traza de pila en la consola (F12).</i>
`;
// TEMA: 6.2 Parámetros de descanso y sintaxis de propagación — 24/10/2025
// Este bloque explora dos características modernas de JavaScript:
// 1. Parámetros de descanso (rest parameters): Permiten representar un número indefinido
//    de argumentos como un array. Se usan con `...` en la definición de la función.
// 2. Sintaxis de propagación (spread syntax): Permite que un iterable (como un array
//    o una cadena) se expanda en lugares donde se esperan cero o más argumentos
//    (para llamadas a funciones) o elementos (para literales de array).
console.log("\n--- TEMA 6.2: Parámetros de descanso y sintaxis de propagación ---");
// Ejemplo de parámetros de descaso
function showNames(firstName, lastName, ...titles) {
    console.log(`Primer Nombre: ${firstName}`);
    console.log(`Apellido: ${lastName}`);
    console.log(`Títulos adicionales: ${titles.join(', ')}`);
    return `Hola, ${firstName} ${lastName}, tus títulos son: ${titles.join(', ')}`;
}
const showNamesResult = showNames("Julio", "Verne", "Escritor", "Novelista", "Aventurero");
console.log(showNamesResult);
// Ejemplo de sintaxis de propagación con arrays
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combinedArr = [...arr1, ...arr2, 7, 8]; // Combina arrays y añade elementos
console.log("Array combinado con spread:", combinedArr); // Esperado: [1, 2, 3, 4, 5, 6, 7, 8]

// Ejemplo de sintaxis de propagación para pasar argumentos a una función
function multiply(a, b, c) {
    return a * b * c;
}
let numbersToMultiply = [2, 3, 4];
const multiplyResult = multiply(...numbersToMultiply); // Expande el array en argumentos
console.log("Resultado de multiplicar con spread:", multiplyResult); // Esperado: 24
// Actualizar el HTML
document.getElementById('output-6-2').innerHTML = `
    <strong>Parámetros de descanso:</strong><br>
    ${showNamesResult}<br><br>
    <strong>Sintaxis de propagación (arrays):</strong><br>
    Array combinado: [${combinedArr.join(', ')}]<br><br>
    <strong>Sintaxis de propagación (argumentos):</strong><br>
    Multiplicación de [2, 3, 4]: ${multiplyResult}<br>
    <br><i>Resultados detallados en la consola (F12).</i>
`;
// TEMA: 6.3 Alcance variable, cierre — 24/10/2025
// Este bloque aborda el alcance (scope) de las variables en JavaScript y el concepto
// fundamental de los cierres (closures).
// - Alcance: Determina la accesibilidad de las variables. Puede ser global, de función
//   (para `var`) o de bloque (para `let` y `const`).
// - Cierre: Una función "recuerda" su entorno léxico (el alcance en el que fue declarada),
//   incluso cuando se ejecuta fuera de ese alcance. Esto le permite acceder a variables
//   de su alcance padre.
console.log("\n--- TEMA 6.3: Alcance variable, cierre ---");
// Alcance Global
let globalVar = "Soy global";
function outerFunction() {
    // Alcance de función (para `let` y `const`) o Alcance léxico
    let outerVar = "Soy de la función externa";
    function innerFunction() {
        // Alcance de función anidada (closure)
        let innerVar = "Soy de la función interna";
        console.log(`Dentro de innerFunction: ${globalVar}, ${outerVar}, ${innerVar}`);
        // innerFunction forma un cierre sobre outerVar y globalVar
    }
    console.log(`Dentro de outerFunction: ${globalVar}, ${outerVar}`);
    // console.log(innerVar); // Esto daría error, innerVar no está definida aquí
    return innerFunction; // Retornamos la función interna
}
// Llamadas y demostración
console.log(`Fuera de todo: ${globalVar}`);
// console.log(outerVar); // Esto daría error, outerVar no está definida aquí
const myClosure = outerFunction(); // myClosure ahora es innerFunction
myClosure(); // Cuando llamamos a myClosure, todavía puede acceder a outerVar
// Ejemplo de cierre práctico: contador
function makeCounter() {
    let count = 0; // Esta variable 'count' está en el alcance léxico de la función anónima retornada

    return function() {
        return count++; // La función anónima "cierra" sobre 'count'
    };
}
const counter1 = makeCounter();
const counter2 = makeCounter(); // Cada contador tiene su propia variable 'count'
console.log("Contador 1:", counter1()); // 0
console.log("Contador 1:", counter1()); // 1
console.log("Contador 2:", counter2()); // 0 (independiente de counter1)
console.log("Contador 1:", counter1()); // 2
// Actualizar el HTML
document.getElementById('output-6-3').innerHTML = `
    <strong>Alcance Global:</strong> Acceso a 'globalVar'.<br>
    <strong>Alcance de Función:</strong> 'outerVar' accesible dentro de 'outerFunction' y 'innerFunction'.<br>
    <strong>Cierre (Closure):</strong> 'innerFunction' (como 'myClosure') recuerda 'outerVar' incluso después de que 'outerFunction' terminó de ejecutarse.<br>
    <strong>Ejemplo de Contador con Closure:</strong><br>
    Contador 1: ${counter1()-1}, ${counter1()-1}, ${counter1()-1} (valores antes del incremento)<br>
    Contador 2: ${counter2()-1} (valor antes del incremento)<br>
    <br><i>Revisa la consola (F12) para ver la ejecución paso a paso y la demostración de cierres.</i>
`;
// TEMA: 6.4 El viejo "var" — 24/10/2025
// Este bloque se enfoca en las características de la palabra clave `var`, que fue
// la forma principal de declarar variables antes de ES6 (ES2015).
// A diferencia de `let` y `const`, `var` tiene alcance de función y hoisting.
// - Alcance de función: Las variables `var` solo son accesibles dentro de la función
//   en la que fueron declaradas, ignorando los bloques `if`, `for`, etc.
// - Hoisting: Las declaraciones `var` son "elevadas" al principio de su alcance de
//   función (o global), aunque su asignación permanezca en su lugar original. Esto
//   puede llevar a comportamientos inesperados (acceder a una variable antes de su
//   declaración aparente, pero con valor `undefined`).
console.log("\n--- TEMA 6.4: El viejo 'var' ---");
// 1. Alcance de función vs. Alcance de bloque
if (true) {
    var varInIf = "Soy var dentro de un if";
    let letInIf = "Soy let dentro de un if"; // Alcance de bloque
    const constInIf = "Soy const dentro de un if"; // Alcance de bloque
    console.log("Dentro del if (var):", varInIf);
    console.log("Dentro del if (let):", letInIf);
    console.log("Dentro del if (const):", constInIf);
}
console.log("Fuera del if (var):", varInIf); // varInIf es accesible aquí (alcance de función/global)
// console.log("Fuera del if (let):", letInIf); // Error: letInIf no está definida
// console.log("Fuera del if (const):", constInIf); // Error: constInIf no está definida
function showVarScope() {
    var funcVar = "Soy var dentro de una función";
    if (true) {
        var anotherVar = "Otra var dentro de un bloque en la función";
        console.log("Dentro del bloque en función (var):", anotherVar);
    }
    console.log("Fuera del bloque, pero dentro de función (var):", anotherVar); // accesible
    return funcVar;
}
console.log("Llamando showVarScope:", showVarScope());
// console.log(funcVar); // Error: funcVar no está definida fuera de la función
// 2. Hoisting con var
console.log("Antes de la declaración 'var':", hoistedVar); // undefined (declaración elevada, asignación no)
var hoistedVar = "He sido hoisted";
console.log("Después de la declaración 'var':", hoistedVar); // "He sido hoisted"
// console.log("Antes de la declaración 'let':", hoistedLet); // Error: Cannot access 'hoistedLet' before initialization
// let hoistedLet = "No soy hoisted de la misma manera";
// Actualizar el HTML
document.getElementById('output-6-4').innerHTML = `
    <strong>Alcance de 'var':</strong> 'varInIf' y 'anotherVar' son accesibles fuera de su bloque de declaración, pero dentro de su función (o globalmente).<br>
    <strong>Hoisting de 'var':</strong> 'hoistedVar' es accesible antes de su declaración (con valor 'undefined').<br>
    Esto contrasta con 'let'/'const' que tienen alcance de bloque y no permiten el acceso antes de la inicialización explícita.<br>
    <br><i>Revisa la consola (F12) para ver los errores de alcance de 'let'/'const' y el comportamiento de 'var'.</i>
`;
// TEMA: 6.5 Objeto global — 24/10/2025
// Este bloque explora el objeto global en JavaScript. Este objeto proporciona variables
// y funciones que están disponibles en cualquier parte del entorno de ejecución.
// - En entornos de navegador, el objeto global es `window`.
// - En Node.js, es `global`.
// - ECMAScript 2020 introdujo `globalThis` como una forma estandarizada de acceder
//   al objeto global, independientemente del entorno.
console.log("\n--- TEMA 6.5: Objeto global ---");
// Accediendo al objeto global en el navegador
console.log("El objeto global (window):", window);
console.log("Propiedad 'name' del objeto global:", window.name); // Una propiedad común
window.myGlobalVariable = "Hola desde una variable global creada explícitamente.";
console.log("Mi variable global en window:", window.myGlobalVariable);
// Usando globalThis (estandarizado)
console.log("El objeto global (globalThis):", globalThis);
globalThis.anotherGlobalVar = "Usando globalThis para una variable global.";
console.log("Mi variable global con globalThis:", globalThis.anotherGlobalVar);
// Funciones globales (que en realidad son métodos del objeto global)
console.log("Función alert es parte del objeto global:", typeof window.alert);
console.log("Función setTimeout es parte del objeto global:", typeof globalThis.setTimeout);
// NOTA: Las variables declaradas con `var` a nivel global se convierten en propiedades del objeto global.
var varOnGlobal = "Soy una var global.";
console.log("¿'varOnGlobal' es propiedad de window?", window.varOnGlobal === varOnGlobal);
// `let` y `const` a nivel global NO se convierten en propiedades del objeto global.
let letOnGlobal = "Soy una let global.";
console.log("¿'letOnGlobal' es propiedad de window?", window.letOnGlobal === undefined); // true
// Actualizar el HTML
document.getElementById('output-6-5').innerHTML = `
    <strong>Objeto global:</strong> En el navegador, es 'window'. 'globalThis' es la forma estandarizada de acceder a él.<br>
    <strong>Variables globales:</strong><br>
    - 'myGlobalVariable': ${window.myGlobalVariable}<br>
    - 'anotherGlobalVar': ${globalThis.anotherGlobalVar}<br>
    - Las variables 'var' declaradas globalmente (como 'varOnGlobal') se convierten en propiedades de 'window'.<br>
    - Las variables 'let'/'const' globales NO se convierten en propiedades de 'window'.<br>
    <br><i>Revisa la consola (F12) para inspeccionar el objeto global.</i>
`
// TEMA: 6.6 Objeto de función, NFE — 24/10/2025
// Este bloque explora el hecho de que las funciones en JavaScript son objetos de primera
// clase. Tienen propiedades y métodos, y pueden ser pasadas como argumentos, retornadas
// por otras funciones, etc.
// También se introduce el concepto de NFE (Named Function Expression), que es una
// expresión de función con un nombre interno, útil para la recursión y depuración.
console.log("\n--- TEMA 6.6: Objeto de función, NFE ---");
// 1. Funciones como objetos: Propiedades `name`, `length`
function greet(who, greeting = "Hola") {
    console.log(`${greeting}, ${who}!`);
}
console.log("Nombre de la función greet:", greet.name); // "greet"
console.log("Número de argumentos esperados (sin valores por defecto) en greet:", greet.length); // 1 (solo 'who')
// También podemos añadir propiedades personalizadas a las funciones
greet.customProperty = "Esta es una propiedad personalizada.";
console.log("Propiedad personalizada de greet:", greet.customProperty);

// 2. Named Function Expression (NFE)
let sayHi = function func(name) { // 'func' es el nombre interno, solo visible dentro de la función
    if (name) {
        console.log(`Hola, ${name}`);
    } else {
        console.log("No hay nombre, llamando a la propia función internamente.");
        func("Invitado"); // Podemos usar 'func' internamente para recursión o llamadas
    }
};
sayHi("Alice"); // Llamada normal a través de la variable externa
sayHi();        // Llamada interna usando el nombre 'func'
// console.log(func); // Error: func no está definida fuera de la expresión de función
console.log("Nombre de la función 'sayHi' (vista desde fuera):", sayHi.name); // "func" (el nombre interno)
// Otro ejemplo NFE: Contador en una función recursiva anónima
let countdown = function doCountdown(n) {
    if (n > 0) {
        console.log(`Contando: ${n}...`);
        setTimeout(() => doCountdown(n - 1), 1000); // Uso de 'doCountdown' internamente
    } else {
        console.log("¡Despegue!");
    }
};
// countdown(3); // Descomentar para ver el contador en la consola
// Actualizar el HTML
document.getElementById('output-6-6').innerHTML = `
    <strong>Funciones como objetos:</strong><br>
    - Propiedad 'name' de 'greet': ${greet.name}<br>
    - Propiedad 'length' de 'greet': ${greet.length} (argumentos sin valor por defecto)<br>
    - Propiedad personalizada 'greet.customProperty': ${greet.customProperty}<br><br>
    <strong>NFE (Named Function Expression):</strong><br>
    - 'sayHi("Alice")' y 'sayHi()' demuestran el uso del nombre interno 'func'.<br>
    - El nombre interno 'func' no es accesible desde fuera.<br>
    - Nombre de la función 'sayHi' (externo): ${sayHi.name} (muestra el nombre interno).<br>
    <br><i>Revisa la consola (F12) para ver las llamadas a funciones y los detalles del objeto.</i>
`;
// TEMA: 6.7 La sintaxis de la "nueva función" — 24/10/2025
// Este bloque explora el constructor `new Function`, que permite crear funciones a
// partir de cadenas de texto en tiempo de ejecución. Es una herramienta poderosa
// pero rara vez utilizada debido a riesgos de seguridad (evaluación de código arbitrario)
// y problemas de rendimiento. Sin embargo, es importante conocer su existencia.
// La sintaxis es: `new Function([arg1, arg2, ...argN], functionBody)`.
console.log("\n--- TEMA 6.7: La sintaxis de la 'nueva función' ---");

// Crear una función simple con new Function
let sum = new Function('a', 'b', 'return a + b');
console.log("Función 'sum' creada con new Function:", sum(2, 3)); // 5
// Crear una función sin argumentos, solo cuerpo
let sayHelloDynamic = new Function('console.log("Hola desde una función dinámica!");');
sayHelloDynamic(); // "Hola desde una función dinámica!"

// Un ejemplo más complejo: simular un closure (aunque no crea un cierre real como las funciones normales)
// new Function siempre crea funciones en el alcance global.
let createMultiplier = new Function('factor', 'return function(num) { return num * factor; };');
let multiplyBy5 = createMultiplier(5); // Esto no funciona como un closure normal.
// 'factor' dentro de la función interna NO está en un cierre léxico.
// Para ver el comportamiento real de new Function con variables externas:
// NOTA: new Function NO captura el alcance léxico exterior. Solo ve variables globales.
let globalValue = 10;
let dynamicFunc = new Function('return globalValue * 2;');
console.log("Función dinámica accediendo a variable global:", dynamicFunc()); // 20
let localValue = 20;
let dynamicFuncWithLocal = new Function('return localValue * 2;');
try {
    console.log("Función dinámica intentando acceder a variable local:", dynamicFuncWithLocal());
} catch (e) {
    console.error("Error al acceder a variable local con new Function:", e.message); // ReferenceError: localValue is not defined
}
// Actualizar el HTMl
document.getElementById('output-6-7').innerHTML = `
    <strong>Creando funciones dinámicamente:</strong><br>
    - Función 'sum(2, 3)': ${sum(2, 3)}<br>
    - 'sayHelloDynamic()' llamada (ver consola)<br><br>
    <strong>Limitaciones de alcance:</strong><br>
    - 'new Function' puede acceder a variables globales ('globalValue': ${dynamicFunc()}).<br>
    - Pero NO puede acceder a variables del alcance léxico exterior ('localValue'), resultando en un error.<br>
    <br><i>Revisa la consola (F12) para el error de alcance y los resultados.</i>
`;
// TEMA: 6.8 Programación: setTimeout y setInterval — 24/10/2025
// Este bloque introduce dos funciones clave para la programación asíncrona en JavaScript:
// - `setTimeout(func, delay, arg1, arg2...)`: Ejecuta `func` una vez después de `delay`
//   milisegundos. Retorna un ID que puede usarse con `clearTimeout`.
// - `setInterval(func, delay, arg1, arg2...)`: Ejecuta `func` repetidamente cada `delay`
//   milisegundos. Retorna un ID que puede usarse con `clearInterval`.
// Estas funciones no pausan la ejecución del script; solo programan tareas para el futuro.
console.log("\n--- TEMA 6.8: Programación: setTimeout y setInterval ---");

// 1. setTimeout
console.log("Inicio de setTimeout y setInterval demos.");

const timeoutId = setTimeout(() => {
    console.log("Mensaje de setTimeout: ¡Esto se ve después de 2 segundos!");
    document.getElementById('output-6-8').innerHTML += `
        <p><i>Mensaje de setTimeout (2s): ¡Esto se ve después de 2 segundos!</i></p>
    `;
}, 2000); // 2000 milisegundos = 2 segundos
// Podemos cancelar un setTimeout antes de que se ejecute
let delayedMessage = setTimeout(() => {
    console.log("Este mensaje de setTimeout NO debería aparecer.");
}, 1000);
clearTimeout(delayedMessage);
console.log("setTimeout cancelado antes de su ejecución.");
// 2. setInterval
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`Mensaje de setInterval: Contando... ${count}`);
    document.getElementById('output-6-8').innerHTML += `
        <p><i>Mensaje de setInterval: Contando... ${count}</i></p>
    `;
    if (count >= 3) {
        clearInterval(intervalId); // Detener el intervalo después de 3 conteos
        console.log("setInterval detenido después de 3 conteos.");
        document.getElementById('output-6-8').innerHTML += `
            <p><i>setInterval detenido después de 3 conteos.</i></p>
        `;
    }
}, 1500); // Se ejecuta cada 1.5 segundos
console.log("Fin de la configuración de setTimeout y setInterval demos.");
document.getElementById('output-6-8').innerHTML = `
    <p><i>La ejecución de setTimeout (2s) y setInterval (1.5s x 3) comenzará en la consola y se actualizará aquí.</i></p>
`;
// TEMA: 6.9 Decoradores y reenvío, llamar/aplicar — 24/10/2025
// Este bloque cubre:
// - Decoradores de funciones: Funciones que toman otra función y añaden nueva
//   funcionalidad, retornando una nueva función. No modifican la original.
// - Reenvío de llamadas: Cómo los decoradores o envoltorios pasan los argumentos y el
//   contexto (`this`) a la función original.
// - `call` y `apply`: Métodos para invocar una función con un `this` explícito y
//   argumentos dados. `call` toma argumentos individualmente, `apply` toma un array.
console.log("\n--- TEMA 6.9: Decoradores y reenvío, llamar/aplicar ---");

// Función original que vamos a "decorar"
function sayHiTo(user) {
    return `Hola, ${user}!`;
}
// Decorador que añade log al inicio y al final de la función
function loggingDecorator(func) {
    return function(...args) { // Usamos ...args para reenviar todos los argumentos
        console.log(`Llamando a '${func.name}' con argumentos: ${args}`);
        let result = func.apply(this, args); // Reenviamos 'this' y 'args' usando apply
        console.log(`Llamada a '${func.name}' finalizada, resultado: '${result}'`);
        return result;
    };
}
let sayHiLogged = loggingDecorator(sayHiTo); // sayHiLogged es la función decorada
const sayHiLoggedResult = sayHiLogged("Juan");
console.log("Resultado de sayHiLogged:", sayHiLoggedResult);

// Ejemplo de `call` y `apply`
function showDetails(age, city) {
    console.log(`Nombre: ${this.name}, Edad: ${age}, Ciudad: ${city}`);
    return `Detalles: ${this.name}, ${age}, ${city}`;
}
const person1 = { name: "Maria" };
const person2 = { name: "Pedro" };

// Usando call: argumentos pasados individualmente
console.log("Usando call:");
const detailsCall = showDetails.call(person1, 30, "Madrid"); // this = person1, args = 30, "Madrid"

// Usando apply: argumentos pasados como un array
console.log("Usando apply:");
const detailsApply = showDetails.apply(person2, [25, "Barcelona"]); // this = person2, args = [25, "Barcelona"]
// Actualizar el HTML
document.getElementById('output-6-9').innerHTML = `
    <strong>Decorador de función:</strong><br>
    - 'sayHiLogged("Juan")' ha sido decorada para añadir logs (ver consola). Resultado: '${sayHiLoggedResult}'.<br><br>
    <strong>Uso de 'call' y 'apply':</strong><br>
    - 'showDetails.call(person1, 30, "Madrid")' para 'Maria'. Detalles: '${detailsCall}'<br>
    - 'showDetails.apply(person2, [25, "Barcelona"])' para 'Pedro'. Detalles: '${detailsApply}'<br>
    <br><i>Revisa la consola (F12) para ver los logs del decorador y el funcionamiento de 'call' y 'apply'.</i>
`;
// TEMA: 6.10 Vinculación de funciones — 24/10/2025
// Este bloque explora el método `bind()`, que permite crear una nueva función que,
// cuando es llamada, tiene su palabra clave `this` establecida en un valor específico.
// `bind()` también puede preestablecer argumentos a la función. Es muy útil para
// asegurar que el contexto de `this` se mantenga en callbacks o en eventos.
console.log("\n--- TEMA 6.10: Vinculación de funciones ---");

const user = {
    firstName: "John",
    sayHi() {
        console.log(`Hola, ${this.firstName}!`);
        return `Hola, ${this.firstName}!`;
    }
};
// Problema: Si pasamos user.sayHi como un callback, pierde su 'this'
// setTimeout(user.sayHi, 1000); // Esto daría "Hola, undefined!" en un navegador normal
// Solución 1: Usar un envoltorio (wrapper)
const wrapperResult = "Hola desde wrapper!";
setTimeout(() => {
    user.sayHi();
    console.log("Solución 1 (wrapper): 'user.sayHi()' se llama correctamente.");
    document.getElementById('output-6-10').innerHTML += `
        <p><i>Solución 1 (wrapper): 'user.sayHi()' se llama correctamente.</i></p>
    `;
}, 1200);
// Solución 2: Usar `bind()` para fijar `this`
const sayHiBound = user.sayHi.bind(user);
const sayHiBoundResult = "Hola desde bind!";
setTimeout(() => {
    sayHiBound(); // Ahora `this` dentro de sayHi es `user`
    console.log("Solución 2 (bind): 'sayHiBound()' se llama correctamente.");
    document.getElementById('output-6-10').innerHTML += `
        <p><i>Solución 2 (bind): 'sayHiBound()' se llama correctamente.</i></p>
    `;
}, 2500);
// `bind()` también puede fijar argumentos
function multiply(a, b) {
    return a * b;
}
const multiplyByTwo = muliply.bind(null, 2); // Fija el primer argumento a 2, 'this' es null/global
console.log("multiplyByTwo(5) con bind de argumentos:", multiplyByTwo(5)); // 10
console.log("multiplyByTwo(10) con bind de argumentos:", multiplyByTwo(10)); // 20

// Actualizar el HTML
document.getElementById('output-6-10').innerHTML = `
    <strong>Problema del 'this' en callbacks:</strong> 'user.sayHi' perdería su contexto si se pasa directamente a 'setTimeout'.<br>
    <strong>Solución con 'bind()':</strong><br>
    - 'sayHiBound = user.sayHi.bind(user)' crea una nueva función con el 'this' fijo a 'user'.<br>
    - 'multiplyByTwo = multiply.bind(null, 2)' preestablece el primer argumento de 'multiply'.<br>
    - multiplyByTwo(5): ${multiplyByTwo(5)}<br>
    - multiplyByTwo(10): ${multiplyByTwo(10)}<br>
    <br><i>Ver la consola (F12) para la demostración de los 'setTimeout' que se ejecutarán en 1.2s y 2.5s.</i>
`;
// TEMA: 6.11 Funciones de flecha revisadas — 24/10/2025
// Este bloque repasa las funciones de flecha (arrow functions), que son una sintaxis
// concisa para escribir funciones. Su principal característica es cómo manejan `this`:
// no tienen su propio `this`, sino que lo toman del contexto léxico envolvente.
// Esto las hace ideales para callbacks o métodos que necesitan mantener el `this` del padre.
console.log("\n--- TEMA 6.11: Funciones de flecha revisadas ---");
// 1. Sintaxis concisa
const add = (a, b) => a + b;
console.log("Función de flecha 'add(2, 3)':", add(2, 3)); // 5

const greetUser = name => `Saludos, ${name}!`; // Un solo argumento sin paréntesis
console.log("Función de flecha 'greetUser(\"Ana\")':", greetUser("Ana"));

const sayHello = () => console.log("Hola mundo con flecha!"); // Sin argumentos con paréntesis vacíos
sayHello();
// 2. Ausencia de 'this' propio (this léxico)
const group = {
    title: "Nuestro Grupo",
    members: ["Pedro", "Laura"],

    showList() {
        this.members.forEach(member => {
            // Aquí, 'this' en la función de flecha se refiere a 'group', no a 'member' o global.
            console.log(`${this.title}: ${member}`);
            document.getElementById('output-6-11').innerHTML += `
                <p><i>${this.title}: ${member}</i></p>
            `;
        });
    },

    showListOld() {
        // En una función tradicional, 'this' dentro de forEach sería diferente
        this.members.forEach(function(member) {
            // console.log(`${this.title}: ${member}`); // Esto daría error o "undefined" para this.title
        });
    }
};
console.log("Demostración de 'this' léxico con funciones de flecha:");
group.showList();
// 3. Ausencia de 'arguments' propio
const showArgs = (...args) => console.log("Argumentos de flecha:", args); // Se usan parámetros de descanso
showArgs(1, 2, 3);
// 4. No puede ser usada como constructor (con `new`)
// const MyArrow = () => {};
// new MyArrow(); // Error: MyArrow is not a constructor
// Actualizar el HTML
document.getElementById('output-6-11').innerHTML = `
    <strong>Sintaxis concisa:</strong><br>
    - 'add(2, 3)': ${add(2, 3)}<br>
    - 'greetUser("Ana")': ${greetUser("Ana")}<br>
    - 'sayHello()' llamada (ver consola).<br><br>
    <strong>'this' léxico:</strong><br>
    - La función de flecha dentro de 'group.showList()' mantiene el 'this' de 'group', permitiendo acceder a 'this.title'.<br>
    <br><i>Ver la consola (F12) para los detalles y la demostración completa.</i>
`;