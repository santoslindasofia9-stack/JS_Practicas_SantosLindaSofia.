// main.js - Prácticas del Curso JavaScript.info
// Autor: [Tu Nombre Completo]
// Fecha de elaboración: [Fecha de hoy, ej. 25/10/2023]

// Función auxiliar para registrar en la consola y el DOM
// Esto nos ayuda a enviar mensajes a las cajas de salida correspondientes en el HTML
function logOutput(sectionId, message, isDOMResult = false) {
    const outputElement = document.getElementById(`output-${sectionId}`);
    const resultElement = document.getElementById(`result-${sectionId}`);

    if (outputElement) {
        if (!outputElement.innerHTML.includes('<strong>Salida de Consola')) {
            outputElement.innerHTML = `<strong>Salida de Consola (${sectionId}):</strong><br>`; // Reiniciar si es el primer mensaje
        }
        outputElement.innerHTML += `<p>${message.replace(/\n/g, '<br>')}</p>`; // Reemplazar saltos de línea para HTML
        outputElement.scrollTop = outputElement.scrollHeight; // Scroll automático al final
    }
    if (isDOMResult && resultElement) {
        if (!resultElement.innerHTML.includes('<strong>Resultados en el DOM')) {
             resultElement.innerHTML = `<strong>Resultados en el DOM (${sectionId}):</strong><br>`; // Reiniciar si es el primer mensaje
        }
        resultElement.innerHTML += `<p>${message}</p>`;
        resultElement.scrollTop = resultElement.scrollHeight;
    }
    console.log(`[${sectionId}] ${message}`); // Siempre loguear en la consola del navegador
}

// =========================================================================================
// TEMA: 8.1 Herencia Prototípica — 25/10/2023
// Este bloque demuestra cómo funciona la herencia prototípica en JavaScript.
// Es un concepto clave donde un objeto puede tener otro objeto como su prototipo,
// heredando sus propiedades y métodos. Si una propiedad no se encuentra en el objeto,
// JavaScript la busca en su prototipo, y así sucesivamente en la cadena prototípica.
// Aprendí que esta es la forma fundamental de herencia en JavaScript antes de ES6 classes.
// =========================================================================================
logOutput('8-1', "--- Iniciando 8.1 Herencia Prototípica ---");

// 1. Definimos un objeto 'animal' que actuará como prototipo
let animal = {
    eats: true,
    sleeps: true,
    walk() {
        logOutput('8-1', "El animal camina.", true);
    }
};
logOutput('8-1', "Objeto 'animal' definido:", true);
logOutput('8-1', `Animal: ${JSON.stringify(animal)}`);

// 2. Creamos un objeto 'rabbit' que hereda de 'animal'
// Utilizamos Object.create() para establecer el prototipo explícitamente.
// rabbit.__proto__ apunta a animal
let rabbit = Object.create(animal);
rabbit.jumps = true; // Propiedad propia de rabbit
rabbit.color = "blanco";

logOutput('8-1', "Objeto 'rabbit' creado heredando de 'animal':", true);
logOutput('8-1', `Rabbit: ${JSON.stringify(rabbit)}`);

// 3. Accediendo a propiedades y métodos heredados
logOutput('8-1', `¿Rabbit come? (propiedad heredada de animal): ${rabbit.eats}`, true); // Accede a 'eats' de 'animal'
logOutput('8-1', `¿Rabbit duerme? (propiedad heredada de animal): ${rabbit.sleeps}`, true); // Accede a 'sleeps' de 'animal'
logOutput('8-1', `¿Rabbit salta? (propiedad propia de rabbit): ${rabbit.jumps}`, true); // Accede a 'jumps' de 'rabbit'

rabbit.walk(); // Llama al método 'walk' heredado de 'animal'

// 4. Sobreescribiendo un método heredado
// Si una propiedad o método existe en el objeto y en su prototipo,
// la del objeto prevalece.
rabbit.walk = function() {
    logOutput('8-1', "El conejo salta y camina enérgicamente!", true);
};
logOutput('8-1', "Método 'walk' sobreescrito en 'rabbit'.");
rabbit.walk(); // Ahora llama al método 'walk' propio de 'rabbit'

// 5. Demostrando la cadena de prototipos
logOutput('8-1', `Prototipo de rabbit (rabbit.__proto__ === animal): ${rabbit.__proto__ === animal}`); // true
logOutput('8-1', `Prototipo de animal (animal.__proto__ === Object.prototype): ${animal.__proto__ === Object.prototype}`); // true
logOutput('8-1', `Prototipo final (Object.prototype.__proto__ === null): ${Object.prototype.__proto__ === null}`); // true

// 6. Diferencia entre propiedades propias y heredadas (hasOwnProperty)
logOutput('8-1', "Iterando propiedades de 'rabbit' (for...in muestra heredadas):");
let rabbitProps = [];
for (let prop in rabbit) {
    // hasOwnProperty() devuelve true si la propiedad es propia del objeto, no heredada
    rabbitProps.push(`  ${prop}: ${rabbit[prop]} (Propia: ${rabbit.hasOwnProperty(prop)})`);
}
logOutput('8-1', rabbitProps.join('\n'), true);

logOutput('8-1', "--- Fin 8.1 Herencia Prototípica ---");


// =========================================================================================
// TEMA: 8.2 Prototipo F (funciones constructoras) — 25/10/2023
// Este bloque explora cómo las funciones constructoras en JavaScript utilizan
// la propiedad `prototype` para implementar la herencia. Cuando una función
// se usa como constructor (con `new`), el objeto creado tiene como prototipo
// el `F.prototype` de la función constructora. Esto es fundamental para
// compartir métodos entre múltiples instancias de un mismo "tipo" de objeto.
// Aprendí la importancia de `F.prototype` para la eficiencia y organización del código.
// =========================================================================================
logOutput('8-2', "--- Iniciando 8.2 Prototipo F ---");

// 1. Definimos una función constructora 'Person'
function Person(name) {
    this.name = name;
    // this.sayHi = function() { console.log(`Hola, soy ${this.name}`); }; // ¡NO RECOMENDADO! Crea un método para cada instancia.
}

// 2. Añadimos un método al `Person.prototype`
// Todos los objetos creados con `new Person()` heredarán este método.
Person.prototype.sayHi = function() {
    logOutput('8-2', `Hola, soy ${this.name} desde el prototipo.`, true);
};

Person.prototype.species = "Homo Sapiens"; // También podemos añadir propiedades

logOutput('8-2', "Función constructora 'Person' y su prototipo definidos.");
logOutput('8-2', `Person.prototype: ${JSON.stringify(Person.prototype)} (contiene sayHi y species)`);

// 3. Creamos instancias de 'Person'
let john = new Person("John");
let anna = new Person("Anna");

logOutput('8-2', "Instancias 'john' y 'anna' creadas:", true);
logOutput('8-2', `John: ${JSON.stringify(john)}`);
logOutput('8-2', `Anna: ${JSON.stringify(anna)}`);


// 4. Accedemos a métodos y propiedades heredadas
john.sayHi(); // "Hola, soy John desde el prototipo."
anna.sayHi(); // "Hola, soy Anna desde el prototipo."

logOutput('8-2', `Especie de John (heredada): ${john.species}`, true); // Homo Sapiens
logOutput('8-2', `Especie de Anna (heredada): ${anna.species}`, true); // Homo Sapiens

// 5. Demostrando la cadena prototípica con funciones constructoras
// La instancia (john) tiene como prototipo a Person.prototype
logOutput('8-2', `Prototipo de 'john' (john.__proto__ === Person.prototype): ${john.__proto__ === Person.prototype}`); // true
// Person.prototype tiene como prototipo a Object.prototype
logOutput('8-2', `Prototipo de Person.prototype (Person.prototype.__proto__ === Object.prototype): ${Person.prototype.__proto__ === Object.prototype}`); // true

// 6. Añadiendo una propiedad propia que oculta la del prototipo
john.species = "Super Sapiens"; // 'species' ahora es una propiedad propia de 'john'
logOutput('8-2', `Nueva especie de John (propia): ${john.species}`, true); // Super Sapiens
logOutput('8-2', `Especie de Anna (sigue heredando): ${anna.species}`, true); // Homo Sapiens
logOutput('8-2', `¿John tiene su propia propiedad 'species'? ${john.hasOwnProperty('species')}`); // true

logOutput('8-2', "--- Fin 8.2 Prototipo F ---");


// =========================================================================================
// TEMA: 8.3 Prototipos Nativos — 25/10/2023
// Este bloque explora cómo los objetos nativos de JavaScript (como Array,
// String, Function, Number, etc.) tienen sus propios prototipos incorporados.
// Estos prototipos contienen métodos estándar que usamos regularmente
// (ej., `Array.prototype.push`, `String.prototype.toUpperCase`).
// También demuestra cómo se pueden extender estos prototipos, aunque se enfatiza
// que esto debe hacerse con mucha cautela para evitar "pollution" o conflictos globales.
// Aprendí la estructura interna de los tipos de datos en JS y las implicaciones
// de modificar globalmente sus comportamientos.
// =========================================================================================
logOutput('8-3', "--- Iniciando 8.3 Prototipos Nativos ---");

// 1. Array.prototype
let myArray = [1, 2, 3];
logOutput('8-3', `Mi array: ${myArray}`);
logOutput('8-3', `¿myArray hereda de Array.prototype? ${myArray.__proto__ === Array.prototype}`); // true
logOutput('8-3', `¿Array.prototype hereda de Object.prototype? ${Array.prototype.__proto__ === Object.prototype}`); // true

// Extendiendo Array.prototype (¡con precaución!)
// Añadimos un método que devuelve el último elemento del array en mayúsculas.
// Usamos una comprobación `if` para evitar redefinir si ya existe.
if (!Array.prototype.lastUpper) {
    Array.prototype.lastUpper = function() {
        if (this.length === 0) {
            return "Array vacío";
        }
        // `this` dentro del método apunta al array que lo invoca
        const lastElement = this[this.length - 1];
        if (typeof lastElement === 'string') {
            return lastElement.toUpperCase();
        }
        return lastElement;
    };
}
logOutput('8-3', "Método 'lastUpper' añadido a Array.prototype.");

let fruits = ["apple", "banana", "kiwi"];
let numbers = [10, 20, 30];
logOutput('8-3', `Última fruta en mayúsculas: ${fruits.lastUpper()}`, true); // KIWI
logOutput('8-3', `Último número (sin mayúsculas): ${numbers.lastUpper()}`, true); // 30
logOutput('8-3', `Array vacío: ${[].lastUpper()}`, true); // Array vacío

// 2. String.prototype
let myString = "hello javascript";
logOutput('8-3', `Mi string: ${myString}`);
logOutput('8-3', `¿myString hereda de String.prototype? ${myString.__proto__ === String.prototype}`); // true

// Extendiendo String.prototype: un método para invertir la cadena
if (!String.prototype.reverseString) {
    String.prototype.reverseString = function() {
        return this.split('').reverse().join('');
    };
}
logOutput('8-3', "Método 'reverseString' añadido a String.prototype.");
logOutput('8-3', `String original: "${myString}"`);
logOutput('8-3', `String invertido: "${myString.reverseString()}"`, true); // tpircsavaj olleh

// 3. Function.prototype
// Incluso las funciones son objetos y heredan de Function.prototype
function sum(a, b) { return a + b; }
logOutput('8-3', `¿sum hereda de Function.prototype? ${sum.__proto__ === Function.prototype}`); // true
logOutput('8-3', `¿Function.prototype hereda de Object.prototype? ${Function.prototype.__proto__ === Object.prototype}`); // true

// NOTA IMPORTANTE: Modificar prototipos nativos globalmente es riesgoso y generalmente
// desaconsejado en producción. Puede causar conflictos con otras librerías o
// futuras versiones de JavaScript. Se hace aquí solo con fines educativos.

logOutput('8-3', "--- Fin 8.3 Prototipos Nativos ---");


// =========================================================================================
// TEMA: 8.4 Métodos prototipo, objetos sin __proto__ — 25/10/2023
// Este bloque se enfoca en las herramientas modernas para trabajar con prototipos
// y en la creación de objetos especiales sin un prototipo por defecto.
// Cubre `Object.getPrototypeOf()`, `Object.setPrototypeOf()`, `Object.create()`,
// y la creación de objetos "vacíos" con `Object.create(null)`.
// Aprendí a manipular la cadena de prototipos de forma explícita y a crear
// objetos más seguros para el almacenamiento de datos clave-valor.
// =========================================================================================
logOutput('8-4', "--- Iniciando 8.4 Métodos Prototipo, objetos sin __proto__ ---");

// 1. Object.getPrototypeOf(obj) y Object.setPrototypeOf(obj, proto)
// Permiten obtener y establecer el prototipo de un objeto.
let base = { value: 10 };
let derived = {};

logOutput('8-4', `Prototipo de 'base': ${Object.getPrototypeOf(base) === Object.prototype}`, true); // true
logOutput('8-4', `Prototipo de 'derived' antes de set: ${Object.getPrototypeOf(derived) === Object.prototype}`, true); // true

// Establecemos 'base' como prototipo de 'derived'
Object.setPrototypeOf(derived, base);
logOutput('8-4', "Establecido 'base' como prototipo de 'derived' usando Object.setPrototypeOf().");

logOutput('8-4', `Prototipo de 'derived' después de set: ${Object.getPrototypeOf(derived) === base}`, true); // true
logOutput('8-4', `Valor heredado en 'derived': ${derived.value}`, true); // 10 (heredado de base)

derived.newValue = 20;
logOutput('8-4', `Propiedad propia de 'derived': ${derived.newValue}`); // 20

// 2. Object.create(proto, [descriptors])
// Crea un nuevo objeto con el prototipo especificado y propiedades opcionales.
// Es la forma recomendada y más flexible de establecer herencia.

let protoCar = {
    brand: "Generic",
    drive() {
        logOutput('8-4', `Conduciendo un ${this.brand} (desde prototipo).`, true);
    }
};

let myCar = Object.create(protoCar, {
    model: {
        value: "Sedan",
        writable: true,
        enumerable: true,
        configurable: true
    },
    year: {
        value: 2023,
        writable: true,
        enumerable: true,
        configurable: true
    }
});
myCar.brand = "Toyota"; // Sobrescribe la propiedad heredada
logOutput('8-4', "Objeto 'myCar' creado con Object.create():");
logOutput('8-4', `Marca de mi coche: ${myCar.brand} (propia)`, true);
logOutput('8-4', `Modelo de mi coche: ${myCar.model}`, true);
myCar.drive(); // Conduciendo un Toyota (usa el drive del prototipo, pero con this.brand propio)
logOutput('8-4', `¿Prototipo de myCar es protoCar? ${Object.getPrototypeOf(myCar) === protoCar}`, true); // true

// 3. Objetos "sin __proto__" (Diccionarios puros)
// Se crean con Object.create(null). Estos objetos no heredan nada,
// ni siquiera de Object.prototype. Son ideales para almacenar datos
// de forma segura, ya que no hay métodos prototípicos que puedan
// colisionar con las claves que definamos (ej., 'toString', 'hasOwnProperty').

let cleanDictionary = Object.create(null);
cleanDictionary.name = "Alice";
cleanDictionary.age = 30;
// cleanDictionary.toString(); // Esto daría un error, ya que no hay método toString
// logOutput('8-4', cleanDictionary.toString()); // Descomenta para ver el error

logOutput('8-4', "Objeto 'cleanDictionary' creado con Object.create(null):", true);
logOutput('8-4', `Nombre en el diccionario: ${cleanDictionary.name}`, true); // Alice
logOutput('8-4', `Edad en el diccionario: ${cleanDictionary.age}`, true); // 30

logOutput('8-4', `¿'cleanDictionary' tiene propiedad 'name'? ${cleanDictionary.hasOwnProperty('name')}`); // true (hasOwnProperty funciona bien aquí)
// Nota: hasOwnProperty es una función global que se puede llamar en cualquier objeto,
// no es necesario que sea heredada para usarse así: {}.hasOwnProperty.call(obj, 'prop')
// Pero en un objeto creado con Object.create(null), el método directo `cleanDictionary.hasOwnProperty` no existiría.
// Para verificar, se usaría Object.prototype.hasOwnProperty.call(cleanDictionary, 'name').
logOutput('8-4', `¿'cleanDictionary' tiene hasOwnProperty (directamente)? ${cleanDictionary.hasOwnProperty === undefined}`); // true (no lo tiene directamente)
logOutput('8-4', `Verificación segura de propiedad: ${Object.prototype.hasOwnProperty.call(cleanDictionary, 'name')}`); // true

// Un objeto normal:
let normalObject = {};
normalObject.name = "Bob";
logOutput('8-4', `¿'normalObject' tiene hasOwnProperty (directamente)? ${normalObject.hasOwnProperty !== undefined}`); // true (lo hereda)

logOutput('8-4', "--- Fin 8.4 Métodos Prototipo, objetos sin __proto__ ---");