// TEMA: 4.1 Objetos 
// Este bloque explora la creación y manipulación básica de objetos en JavaScript.
// Se define un objeto, se accede a sus propiedades y se modifica una de ellas.
// Aprendimos que los objetos son colecciones de propiedades clave-valor.
console.log("--- TEMA 4.1: Objetos ---");
let usuario = {
    nombre: "linda",      // Propiedad "nombre" con valor "Juan"
    edad: 15,            // Propiedad "edad" con valor 30
    "es Admin": true     // Propiedad con nombre multi-palabra, requiere comillas
};

console.log("Nombre del usuario:", usuario.nombre); // Acceso a propiedad con notación de punto
console.log("Edad del usuario:", usuario["edad"]);  // Acceso a propiedad con notación de corchetes
console.log("¿Es administrador?", usuario["es Admin"]); // Acceso a propiedad multi-palabra

usuario.edad = 31; // Modificar una propiedad
console.log("Nueva edad del usuario:", usuario.edad);

// Añadir una nueva propiedad
usuario.email = "juan@example.com";
console.log("Email del usuario:", usuario.email);

// Eliminar una propiedad
delete usuario.edad;
console.log("Usuario después de eliminar edad:", usuario);

// Comprobar si una propiedad existe
console.log("¿El usuario tiene la propiedad 'nombre'?", "nombre" in usuario);
console.log("¿El usuario tiene la propiedad 'edad'?", "edad" in usuario);

// Iterar sobre las propiedades de un objeto
console.log("Propiedades del objeto usuario:");
for (let key in usuario) {
    console.log(`${key}: ${usuario[key]}`);
}

document.getElementById('output-4-1').innerText = "Resultados en la consola. Nombre: " + usuario.nombre + ", Email: " + usuario.email;
// Fin TEMA 4.1

// TEMA: 4.2 Referencias de objetos y copia — 24/10/2025
// Este bloque demuestra cómo los objetos se manejan por referencia.
// Al asignar un objeto a otra variable, no se crea una copia, sino una referencia al mismo objeto.
// Esto significa que los cambios en una variable afectan a la otra.
// Se muestra cómo hacer una copia superficial de un objeto.
console.log("\n--- TEMA 4.2: Referencias de objetos y copia ---");
let user = {
    name: "sofia",
    age: 25
};

let admin = user; // admin ahora referencia al mismo objeto que user
admin.age = 26;   // Modificamos la edad a través de 'admin'

console.log("Edad de user después de modificar con admin:", user.age); // user.age también es 26

// Comparación de objetos por referencia
console.log("¿Son user y admin el mismo objeto?", user === admin); // true

// Intentando hacer una "copia" con Object.assign para una copia superficial
let clon = {};
for (let key in user) {
    clon[key] = user[key];
}
// O mejor aún, con Object.assign()
let clon2 = Object.assign({}, user);
clon2.name = "Clonado";
console.log("Nombre del user original:", user.name); // Sigue siendo Pedro
console.log("Nombre del clon2:", clon2.name); // Es Clonado

// Con el operador spread (ES6+)
let clon3 = { ...user };
clon3.age = 50;
console.log("Edad del user original:", user.age); // Sigue siendo 26
console.log("Edad del clon3:", clon3.age); // Es 50

document.getElementById('output-4-2').innerText = "Resultados en la consola. user.age: " + user.age + ", clon2.name: " + clon2.name;
// Fin TEMA 4.2

// TEMA: 4.3 Recolección de basura — 24/10/2025
// Este tema es principalmente conceptual. JavaScript tiene un recolector de basura
// que automáticamente libera la memoria ocupada por objetos que ya no son accesibles
// o referenciados por ninguna parte del programa. Esto evita fugas de memoria y
// simplifica la gestión de la memoria para el desarrollador.
// No hay un código directo para "mostrar" la recolección de basura, ya que es un proceso interno.
// Aprendimos que JS gestiona la memoria automáticamente cuando un objeto se vuelve "inalcanzable".
console.log("\n--- TEMA 4.3: Recolección de basura ---");
let obj1 = { data: "datos importantes" };
let obj2 = obj1; // obj2 referencia a obj1

obj1 = null; // obj1 ya no referencia al objeto, pero obj2 sí
console.log("obj2 todavía tiene los datos:", obj2.data);

obj2 = null; // Ahora el objeto original ya no tiene referencias, será elegible para recolección de basura.
console.log("El objeto original ahora es inalcanzable y será recolectado.");
document.getElementById('tema-4-3').getElementsByTagName('h3')[0].insertAdjacentHTML('afterend', '<p>El recolector de basura de JavaScript libera automáticamente la memoria de objetos no referenciados.</p>');
// Fin TEMA 4.3

// TEMA: 4.4 Métodos de objeto, "this" — 24/10/2025
// Este bloque introduce los métodos (funciones dentro de objetos) y cómo usar la palabra clave `this`.
// `this` se refiere al objeto actual donde se ejecuta el método.
// Aprendimos cómo definir funciones como propiedades de objetos y el contexto de `this`.
console.log("\n--- TEMA 4.4: Métodos de objeto, 'this' ---");
let persona = {
    nombre: "santos",
    saludar: function() {
        // `this` se refiere al objeto 'persona'
        console.log("Hola, mi nombre es " + this.nombre);
    },
    presentar: function() {
        console.log(`Mi nombre es ${this.nombre} y tengo ${this.edad} años.`);
    },
    edad: 15
};

persona.saludar(); // Llama al método saludar

let otroSaludo = persona.saludar;
// otroSaludo(); // Si se llama así, 'this' sería 'window' (en modo no estricto) o undefined (en modo estricto).
// Esto demuestra que el valor de 'this' depende de cómo se invoca la función.

persona.presentar();

// Ejemplo con un objeto diferente para mostrar cómo 'this' cambia el contexto
let animal = {
    nombre: "Fido",
    tipo: "perro",
    hablar: function() {
        console.log(`Soy un ${this.tipo} llamado ${this.nombre}. ¡Guau!`);
    }
};

animal.hablar();

document.getElementById('output-4-4').innerText = "Resultados en la consola. Ver los saludos y presentaciones.";
// Fin TEMA 4.4

// TEMA: 4.5 Constructor, operador "new" — 24/10/2025
// Este bloque explica cómo crear funciones constructoras para generar múltiples objetos con la misma estructura.
// El operador `new` se usa para invocar la función constructora, la cual:
// 1. Crea un nuevo objeto vacío.
// 2. Asigna `this` a ese nuevo objeto.
// 3. Ejecuta el cuerpo de la función.
// 4. Retorna `this`.
// Aprendimos a estandarizar la creación de objetos similares.
console.log("\n--- TEMA 4.5: Constructor, operador 'new' ---");

// Función constructora
function Usuario(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    this.saludar = function() {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    };
}

// Crear instancias de Usuario usando 'new'
let usuario1 = new Usuario("linda", 15);
let usuario2 = new Usuario("sofia", 35);

console.log("Usuario 1:", usuario1);
usuario1.saludar();

console.log("Usuario 2:", usuario2);
usuario2.saludar();

// Es importante usar 'new'. Sin 'new', 'this' apuntaría al objeto global (window)
// let usuarioSinNew = Usuario("Error", 10); // Esto intentaría modificar window.nombre y window.edad
// console.log("Usuario sin new:", window.nombre); // Solo visible si no estás en modo estricto

document.getElementById('output-4-5').innerText = "Resultados en la consola. Objetos creados con constructor.";
// Fin TEMA 4.5

// TEMA: 4.6 Encadenamiento opcional "?." — 24/10/2025
// El operador de encadenamiento opcional (`?.`) permite acceder a propiedades
// anidadas de objetos sin tener que comprobar explícitamente si cada nivel
// de la cadena de propiedades existe. Si un intermedio es `null` o `undefined`,
// la expresión se detiene y devuelve `undefined` en lugar de lanzar un error.
// Aprendimos a escribir código más seguro y conciso al acceder a propiedades profundas.
console.log("\n--- TEMA 4.6: Encadenamiento opcional '?.' ---");

let userProfile = {
    name: "galeano",
    address: {
        street: "Calle Falsa 123",
        city: "Springfield"
    },
    contact: null // Esta propiedad es nula
};

// Acceso normal a propiedades existentes
console.log("Ciudad:", userProfile.address.city); // Springfield

// Intento de acceder a una propiedad de una propiedad nula (provoca error sin '?.')
// console.log("Teléfono:", userProfile.contact.phone); // TypeError: Cannot read properties of null (reading 'phone')

// Con encadenamiento opcional, evita el error
console.log("Teléfono (con ?. ):", userProfile.contact?.phone); // undefined
console.log("Código postal (con ?. ):", userProfile.address?.zipCode); // undefined (la propiedad zipCode no existe)

// Se puede usar también con llamadas a métodos
let adminUser = {
    name: "Boss",
    greet() {
        console.log("Hola, soy el jefe.");
    }
};

let guestUser = {};

adminUser.greet?.(); // Llama a greet()
guestUser.greet?.(); // No hace nada, no hay error

document.getElementById('output-4-6').innerText = "Resultados en la consola. Ver el uso de '?.' para evitar errores.";
// Fin TEMA 4.6

// TEMA: 4.7 Tipo de símbolo — 24/10/2025
// `Symbol` es un tipo de dato primitivo único e inmutable introducido en ES6.
// Se usa principalmente para crear identificadores de propiedades de objetos que
// son garantizadamente únicos, evitando colisiones de nombres, especialmente
// cuando se añaden propiedades a objetos de terceros.
// Aprendimos a crear propiedades "ocultas" o no enumerables fácilmente.
console.log("\n--- TEMA 4.7: Tipo de símbolo ---");

// Crear un Symbol
let id = Symbol("id"); // Descripción opcional para depuración
let id2 = Symbol("id");

console.log("¿Son los símbolos iguales?", id === id2); // false, cada Symbol es único

let userWithSymbol = {
    name: "Lucía",
    [id]: 123      // Usar Symbol como clave de propiedad (requiere corchetes)
};

console.log("ID del usuario (con Symbol):", userWithSymbol[id]); // Acceso por Symbol

// Symbol no es visible en un bucle for...in
console.log("Propiedades de userWithSymbol con for...in:");
for (let key in userWithSymbol) {
    console.log(key); // Solo imprime 'name'
}

// Para acceder a los Symbols, se usa Object.getOwnPropertySymbols
console.log("Symbols de userWithSymbol:", Object.getOwnPropertySymbols(userWithSymbol));

// Ejemplo de Symbol.for() y Symbol.keyFor() para Symbols globales
let globalId = Symbol.for("globalId"); // Crea o reutiliza un Symbol global
let globalIdAgain = Symbol.for("globalId");

console.log("¿Son los Symbols globales iguales?", globalId === globalIdAgain); // true
console.log("Descripción del Symbol global:", Symbol.keyFor(globalId)); // "globalId"

document.getElementById('output-4-7').innerText = "Resultados en la consola. Ver el uso y la unicidad de los Symbols.";
// Fin TEMA 4.7

// TEMA: 4.8 Conversión de objeto a primitivo — 24/10/2025
// Cuando un objeto se usa en un contexto donde se espera un valor primitivo (como una cadena,
// un número o un booleano), JavaScript intenta convertir el objeto. Este proceso se rige
// por el "hint" (sugerencia) de la operación (string, number, default).
// Los métodos internos `Symbol.toPrimitive`, `toString()`, y `valueOf()` son clave en esto.
// Aprendimos cómo los objetos pueden interactuar con operadores que esperan primitivos.
console.log("\n--- TEMA 4.8: Conversión de objeto a primitivo ---");

let producto = {
    nombre: "Manzana",
    precio: 1.5,
    // Método para la conversión a string
    toString() {
        return this.nombre;
    },
    // Método para la conversión a number
    valueOf() {
        return this.precio;
    },
    // Método para Symbol.toPrimitive (sugerencia 'string')
    [Symbol.toPrimitive](hint) {
        if (hint == "string") {
            return `Producto: ${this.nombre} ($${this.precio})`;
        }
        if (hint == "number") {
            return this.precio;
        }
        // Para hint == "default" o cualquier otro
        return this.nombre + " - " + this.precio;
    }
};

console.log("Producto como string (alert/template literal):", `${producto}`); // Usa Symbol.toPrimitive con hint "string"
console.log("Producto como número (operación aritmética):", +producto); // Usa Symbol.toPrimitive con hint "number"
console.log("Producto + 2:", producto + 2); // Usa Symbol.toPrimitive con hint "default"

let libro = {
    titulo: "El Gran Gato",
    paginas: 300
};
// Si no hay Symbol.toPrimitive, JavaScript usa toString() o valueOf()
console.log("Libro como string (conversión implícita):", String(libro)); // Usa libro.toString() por defecto
console.log("Libro + 10 (sin valueOf ni Symbol.toPrimitive):", libro + 10); // Llama a toString() y concatena

document.getElementById('output-4-8').innerText = "Resultados en la consola. Ver cómo los objetos se convierten a primitivos.";
// Fin TEMA 4.8