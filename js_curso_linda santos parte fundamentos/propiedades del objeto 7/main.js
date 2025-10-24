// main.js

// TEMA: 7.1 Banderas y descriptores de propiedad — 27/10/2023
// Este bloque explora las "banderas" que tienen las propiedades de los objetos en JavaScript:
// writable (se puede cambiar el valor), enumerable (se puede listar con for...in) y configurable (se puede borrar o cambiar sus banderas).
// También muestra cómo acceder a los descriptores de propiedad usando Object.getOwnPropertyDescriptor.

// 1. Crear un objeto simple
const user = {
    name: "sofia"
};

// 2. Obtener el descriptor de propiedad para 'name'
// Se espera que por defecto 'name' sea writable, enumerable y configurable (todos true).
const descriptorName = Object.getOwnPropertyDescriptor(user, 'name');
console.log("Descriptor de 'user.name' por defecto:", descriptorName);
// Aprendizaje: Las propiedades creadas de forma normal tienen todas las banderas en true.

// 3. Modificar una propiedad para que no sea escribible (writable: false)
Object.defineProperty(user, 'name', {
    writable: false
});

// Intentar cambiar el valor de 'name'. Esto no producirá un error en modo estricto,
// pero no cambiará el valor de la propiedad. En modo no estricto, fallaría silenciosamente.
user.name = "Pedro"; // En modo estricto, esto lanza un TypeError. Sin 'use strict', se ignora.
console.log("user.name después de intentar cambiar (writable: false):", user.name);
// Aprendizaje: Si writable es false, el valor de la propiedad no se puede modificar.

// 4. Modificar una propiedad para que no sea enumerable (enumerable: false)
const car = {
    brand: "Toyota",
    model: "Corolla"
};

Object.defineProperty(car, 'brand', {
    enumerable: false
});

let carProperties = [];
for (let key in car) {
    carProperties.push(key);
}
console.log("Propiedades de 'car' iteradas con for...in (brand no enumerable):", carProperties);
// Aprendizaje: Si enumerable es false, la propiedad no aparece en bucles como for...in.

// 5. Modificar una propiedad para que no sea configurable (configurable: false)
const settings = {
    version: "1.0"
};

Object.defineProperty(settings, 'version', {
    configurable: false
});

// Intentar eliminar la propiedad. Esto fallará.
delete settings.version;
console.log("settings.version después de intentar eliminar (configurable: false):", settings.version);
// Aprendizaje: Si configurable es false, la propiedad no se puede borrar ni sus banderas pueden ser cambiadas (excepto 'writable' a 'false').

// Inyectar resultados en el HTML para el tema 7.1
const output71 = document.getElementById('output-7-1');
output71.innerHTML = `
    <p><strong>Objeto 'user' con 'name':</strong></p>
    <pre>${JSON.stringify(user, null, 2)}</pre>
    <p><strong>Descriptor de 'user.name' por defecto:</strong></p>
    <pre>${JSON.stringify(descriptorName, null, 2)}</pre>
    <p><strong>Valor de 'user.name' después de setear 'writable: false' y intentar cambiarlo:</strong> ${user.name}</p>
    <p><strong>Propiedades de 'car' iteradas (con 'brand' no enumerable):</strong> ${carProperties.join(', ')}</p>
    <p><strong>Valor de 'settings.version' después de setear 'configurable: false' y intentar eliminarlo:</strong> ${settings.version}</p>
    <p class="console-output">Mira la consola (F12) para más detalles de los descriptores.</p>
`;


// TEMA: 7.2 Captadores y configuradores de propiedades (Getters y Setters) — 27/10/2023
// Este bloque explora cómo usar métodos "getter" (captador) y "setter" (configurador)
// para definir propiedades de objeto que se comportan como funciones cuando se leen o escriben, respectivamente.
// Esto permite añadir lógica personalizada al acceso de propiedades.

// 1. Objeto con getter y setter para una propiedad 'fullName'
const person = {
    firstName: "linda",
    lastName: "sofia",

    get fullName() {
        console.log("Getter de fullName ejecutado.");
        return `${this.firstName} ${this.lastName}`;
    },

    set fullName(value) {
        console.log("Setter de fullName ejecutado con valor:", value);
        [this.firstName, this.lastName] = value.split(' ');
    }
};

// 2. Acceder a la propiedad fullName (llama al getter)
console.log("Nombre completo de la persona (usando getter):", person.fullName);
// Aprendizaje: Acceder a 'person.fullName' invoca automáticamente la función 'get fullName()'.

// 3. Asignar un valor a la propiedad fullName (llama al setter)
person.fullName = "Carlos Ruiz";
console.log("Nuevo nombre completo (después de usar setter):", person.fullName);
console.log("Nuevo firstName:", person.firstName);
console.log("Nuevo lastName:", person.lastName);
// Aprendizaje: Asignar un valor a 'person.fullName' invoca automáticamente la función 'set fullName(value)'.

// 4. Ejemplo práctico: Propiedad 'age' con validación en el setter
const userWithAge = {
    _age: 0, // Usamos un prefijo _ para indicar que es una propiedad interna

    set age(value) {
        if (value < 0) {
            console.error("La edad no puede ser negativa.");
        } else {
            this._age = value;
            console.log("Edad asignada:", value);
        }
    },

    get age() {
        return this._age;
    }
};

// Asignar una edad válida
userWithAge.age = 15;
console.log("Edad del usuario (válida):", userWithAge.age);

// Intentar asignar una edad inválida
userWithAge.age = -5;
console.log("Edad del usuario (después de intentar inválida):", userWithAge.age);
// Aprendizaje: Los setters son útiles para validar datos o realizar acciones adicionales antes de guardar un valor.

// Inyectar resultados en el HTML para el tema 7.2
const output72 = document.getElementById('output-7-2');
output72.innerHTML = `
    <p><strong>Nombre completo inicial (getter):</strong> ${person.fullName}</p>
    <p><strong>Nombre completo después de usar setter:</strong> ${person.fullName}</p>
    <p><strong>firstName después de setter:</strong> ${person.firstName}</p>
    <p><strong>lastName después de setter:</strong> ${person.lastName}</p>
    <p><strong>Edad válida asignada a userWithAge:</strong> ${userWithAge.age}</p>
    <p><strong>Intentando asignar edad inválida (-5). La edad actual es:</strong> ${userWithAge.age}</p>
    <p class="console-output">Mira la consola (F12) para ver la ejecución de getters/setters y mensajes de error.</p>
`;