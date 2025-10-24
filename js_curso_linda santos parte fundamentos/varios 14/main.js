// TEMA: 14.1 Proxy y reflejo — 10/05/2024
// Este bloque demuestra cómo usar un Proxy para interceptar operaciones en un objeto.
// Un Proxy permite interceptar y personalizar operaciones fundamentales para objetos,
// como búsquedas de propiedades, asignaciones, enumeración, invocación de funciones, etc.
// Aprendí que los proxies son poderosos para validación, logging, o incluso para crear objetos virtuales.
console.log("--- 14.1 Proxy y reflejo ---");

let user = {
    name: "Juan",
    age: 30
};

let handler = {
    get(target, prop, receiver) {
        console.log(`GET ${prop}`); // Intercepta la lectura de propiedades
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        if (prop === 'age' && value < 18) {
            console.warn("La edad no puede ser menor de 18.");
            return false; // Rechaza la operación
        }
        console.log(`SET ${prop} = ${value}`); // Intercepta la escritura de propiedades
        return Reflect.set(target, prop, value, receiver);
    }
};

let userProxy = new Proxy(user, handler);

console.log(userProxy.name); // Acceso a la propiedad, se activa el 'get'
userProxy.age = 25;          // Modificación de la propiedad, se activa el 'set'
console.log(userProxy.age);

userProxy.age = 15;          // Intento de modificar a un valor inválido
console.log(userProxy.age);  // La edad no debería haber cambiado
document.getElementById('output-14-1').innerText = "Ver consola para resultados de Proxy (F12)";


// TEMA: 14.2 Eval ejecuta una cadena de código — 10/05/2024
// Este bloque muestra el uso de `eval()` para ejecutar código JavaScript que se pasa como una cadena.
// `eval()` es una función global que evalúa una cadena de JavaScript y la ejecuta.
// Aprendí que `eval()` es potente pero generalmente se considera una mala práctica de seguridad
// y rendimiento, ya que puede ejecutar cualquier código arbitrario y es difícil de optimizar.
console.log("\n--- 14.2 Eval ejecuta una cadena de código ---");

let codeString = 'let a = 10; let b = 20; console.log("Resultado de eval: " + (a + b));';
eval(codeString);

let x = 5;
let y = 7;
let expression = "x * y";
console.log(`Evaluando "${expression}": ` + eval(expression));

document.getElementById('output-14-2').innerText = `
Código ejecutado con eval:
let a = 10; let b = 20; console.log("Resultado de eval: " + (a + b));
(Ver consola para la salida)
`;


// TEMA: 14.3 Curry — 10/05/2024
// Este bloque demuestra la técnica de currificación (Curry), que transforma una función que toma múltiples
// argumentos en una secuencia de funciones, cada una tomando un solo argumento.
// Aprendí que la currificación mejora la reusabilidad de funciones y permite crear funciones más
// especializadas a partir de funciones genéricas.
console.log("\n--- 14.3 Curry ---");

// Función sin currificación
function add(a, b, c) {
    return a + b + c;
}
console.log("add(1, 2, 3): " + add(1, 2, 3));

// Función currificada
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) { // Si ya tenemos suficientes argumentos
            return func.apply(this, args);
        } else { // Si no, devolvemos una nueva función que espera los argumentos restantes
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

let curriedAdd = curry(add);

console.log("curriedAdd(1)(2)(3): " + curriedAdd(1)(2)(3));
console.log("curriedAdd(1, 2)(3): " + curriedAdd(1, 2)(3));
console.log("curriedAdd(1, 2, 3): " + curriedAdd(1, 2, 3));

const add5 = curriedAdd(5);
console.log("add5(10)(20): " + add5(10)(20)); // Esto es add(5, 10, 20)

document.getElementById('output-14-3').innerText = "Ver consola para resultados de Curry (F12)";


// TEMA: 14.4 Tipo de referencia — 10/05/2024
// Este bloque explora el concepto de Tipo de Referencia (Reference Type), que es una especificación interna de JavaScript
// utilizada por el motor para describir cómo acceder a una propiedad de un objeto o a una variable.
// No es un tipo de dato al que podamos acceder directamente en el código JavaScript, pero es fundamental
// para entender cómo operan cosas como `this` o la asignación de valores.
// Aprendí que el Tipo de Referencia consiste en una base (el objeto o entorno léxico) y un nombre de propiedad.
console.log("\n--- 14.4 Tipo de referencia ---");

// Aunque no podemos crear un "Tipo de Referencia" explícitamente, podemos observar su comportamiento
// en operaciones como la asignación o la evaluación de expresiones.
let myObject = {
    value: 10,
    getValue: function() {
        return this.value;
    }
};

let getValFn = myObject.getValue;
console.log("getValFn(): " + getValFn()); // 'this' aquí es global (window o undefined en modo estricto)

// Una "llamada de método" como myObject.getValue() crea un Tipo de Referencia {base: myObject, name: "getValue"}
// y asegura que 'this' dentro de la función sea 'myObject'.
console.log("myObject.getValue(): " + myObject.getValue());

// Un ejemplo donde el Tipo de Referencia es clave para `this`:
function showThis() {
    console.log("this en showThis: ", this);
}

showThis(); // 'this' es window/undefined

const objWithMethod = {
    name: "Mi Objeto",
    method: showThis
};

objWithMethod.method(); // 'this' es objWithMethod gracias al Tipo de Referencia de la llamada.

document.getElementById('output-14-4').innerText = "Ver consola para explicación y ejemplos de Tipo de Referencia (F12)";


// TEMA: 14.5 Bigint — 10/05/2024
// Este bloque demuestra el uso del tipo de dato `BigInt`, introducido para manejar números enteros
// de una magnitud arbitraria, más allá del límite de `Number.MAX_SAFE_INTEGER` (2^53 - 1).
// Aprendí que los `BigInt` se crean añadiendo `n` al final de un número entero o usando `BigInt()`.
// No se pueden mezclar con `Number` en operaciones directas; hay que convertir explícitamente.
console.log("\n--- 14.5 Bigint ---");

const maxSafe = Number.MAX_SAFE_INTEGER;
console.log("Número máximo seguro (Number.MAX_SAFE_INTEGER): " + maxSafe);
console.log("maxSafe + 1 === maxSafe + 2:", maxSafe + 1 === maxSafe + 2); // true, ¡error de precisión!

const largeNumber = 9007199254740991n; // Sufijo 'n' para BigInt
const largerNumber = largeNumber + 2n; // Operaciones con BigInt
console.log("Número grande con BigInt: " + largerNumber);
console.log("largeNumber + 1n === largeNumber + 2n:", (largeNumber + 1n) === (largeNumber + 2n)); // false, precisión correcta

const anotherBigInt = BigInt("12345678901234567890");
console.log("Otro BigInt desde string: " + anotherBigInt);

try {
    console.log(largeNumber + 1); // Esto causará un TypeError
} catch (e) {
    console.error("Error al mezclar BigInt y Number:", e.message);
}

document.getElementById('output-14-5').innerText = "Ver consola para resultados de BigInt (F12)";


// TEMA: 14.6 Unicode, componentes internos de cadena — 10/05/2024
// Este bloque explora cómo JavaScript maneja los caracteres Unicode y los componentes internos de las cadenas.
// JavaScript utiliza UTF-16 para representar cadenas, donde la mayoría de los caracteres comunes ocupan 1 unidad de código
// (16 bits), pero los caracteres suplementarios (emojis, etc.) ocupan 2 unidades de código (pares subrogados).
// Aprendí sobre `codePointAt()` para obtener el punto de código Unicode real y cómo `length` puede ser engañoso.
console.log("\n--- 14.6 Unicode, componentes internos de cadena ---");

let str = "Hola mundo";
console.log(`"${str}".length: ${str.length}`); // 10

let emojiStr = "😊 World";
console.log(`"${emojiStr}".length: ${emojiStr.length}`); // 8 (el emoji 😊 ocupa 2 unidades UTF-16)

// Acceso a caracteres por índice (puede ser problemático con pares subrogados)
console.log(`emojiStr[0]: ${emojiStr[0]}`); // Muestra la primera unidad de código (mitad del emoji)
console.log(`emojiStr[1]: ${emojiStr[1]}`); // Muestra la segunda unidad de código (otra mitad)

// Para obtener el punto de código Unicode real
console.log(`"😊".codePointAt(0): ${"😊".codePointAt(0).toString(16)}`); // 1f60a (punto de código real)
console.log(`"H".codePointAt(0): ${"H".codePointAt(0).toString(16)}`); // 48

// Iteración correcta sobre caracteres Unicode
console.log("Iterando sobre '😊 World':");
for (let char of emojiStr) {
    console.log(char);
}

document.getElementById('output-14-6').innerText = "Ver consola para resultados de Unicode (F12)";


// TEMA: 14.7 WeakRef y FinalizationRegistry — 10/05/2024
// Este bloque demuestra `WeakRef` (referencias débiles) y `FinalizationRegistry`.
// `WeakRef` permite tener una referencia a un objeto sin impedir que sea recolectado por el garbage collector.
// `FinalizationRegistry` permite registrar una función de limpieza que se llamará cuando un objeto registrado
// con él sea recolectado. Son útiles para gestionar recursos externos o cachés de forma eficiente.
// Aprendí que no se debe depender de estas funcionalidades para la lógica crítica, ya que el momento exacto
// de la recolección de basura no está garantizado.
console.log("\n--- 14.7 WeakRef y FinalizationRegistry ---");

let obj = {
    name: "Objeto para WeakRef"
};
let weakRef = new WeakRef(obj);

// Creamos un FinalizationRegistry para el objeto
const registry = new FinalizationRegistry((value) => {
    console.log(`Objeto con valor "${value}" ha sido recolectado por el garbage collector.`);
});

registry.register(obj, obj.name); // Registramos 'obj' con un valor para la función de limpieza

// El objeto puede ser accedido a través de weakRef.deref()
console.log("Accediendo al objeto via WeakRef.deref():", weakRef.deref()?.name);

// Para que el objeto sea recolectado, necesitamos que no haya otras referencias fuertes.
// Si establecemos 'obj = null', y esperamos un poco, el GC podría recolectarlo.
obj = null;

// En un entorno de navegador, a veces es difícil forzar el GC.
// Podrías necesitar abrir las herramientas de desarrollador y buscar opciones de GC.
// O simplemente observar que, si el GC se ejecuta, el mensaje del FinalizationRegistry aparecerá.
console.log("Obj ahora es null. Esperando posible recolección de basura...");

// Verificar si la referencia débil sigue activa (probablemente sí por un tiempo)
console.log("Accediendo de nuevo via WeakRef.deref() después de null:", weakRef.deref()?.name);

document.getElementById('output-14-7').innerText = "Ver consola para resultados de WeakRef y FinalizationRegistry (F12). \nLa recolección de basura es no determinista, por lo que el mensaje de FinalizationRegistry puede tardar o no aparecer inmediatamente.";