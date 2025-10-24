// TEMA: 9.1 Sintaxis básica de clase — 23/10/2023
// Este bloque muestra la creación de una clase Persona y cómo instanciar objetos a partir de ella.
// Aprendí la estructura básica de una clase con constructor y métodos.
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        return `Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`;
    }
}

const persona1 = new Persona("Alice", 30);
const persona2 = new Persona("Bob", 25);

// Mostrar resultados en el HTML
const output9_1 = document.getElementById('output-9-1');
output9_1.innerHTML += `<p>${persona1.saludar()}</p>`;
output9_1.innerHTML += `<p>${persona2.saludar()}</p>`;
console.log("9.1 Sintaxis básica de clase:", persona1.saludar());


// TEMA: 9.2 Herencia de clase — 23/10/2023
// Este bloque demuestra cómo una clase Estudiante hereda de Persona y añade sus propias propiedades y métodos.
// Aprendí a usar la palabra clave 'extends' para la herencia y 'super()' para llamar al constructor de la clase padre.
class Estudiante extends Persona {
    constructor(nombre, edad, carrera) {
        super(nombre, edad); // Llama al constructor de Persona
        this.carrera = carrera;
    }

    estudiar() {
        return `${this.nombre} está estudiando ${this.carrera}.`;
    }

    // Sobrescribir el método saludar
    saludar() {
        return `Hola, soy ${this.nombre}, tengo ${this.edad} años y estudio ${this.carrera}.`;
    }
}

const estudiante1 = new Estudiante("Carlos", 20, "Ingeniería de Sistemas");

const output9_2 = document.getElementById('output-9-2');
output9_2.innerHTML += `<p>${estudiante1.saludar()}</p>`;
output9_2.innerHTML += `<p>${estudiante1.estudiar()}</p>`;
console.log("9.2 Herencia de clase:", estudiante1.saludar());


// TEMA: 9.3 Propiedades y métodos estáticos — 23/10/2023
// Este bloque ilustra el uso de métodos y propiedades estáticas que pertenecen a la clase, no a las instancias.
// Aprendí que los miembros estáticos se acceden directamente desde la clase (e.g., Matematica.PI) y no requieren una instancia.
class Matematica {
    static PI = 3.14159; // Propiedad estática

    static sumar(a, b) { // Método estático
        return a + b;
    }

    static restar(a, b) { // Otro método estático
        return a - b;
    }
}

// Acceso a propiedades y métodos estáticos
const suma = Matematica.sumar(5, 3);
const resta = Matematica.restar(10, 4);
const piValor = Matematica.PI;

const output9_3 = document.getElementById('output-9-3');
output9_3.innerHTML += `<p>La suma de 5 y 3 es: ${suma}</p>`;
output9_3.innerHTML += `<p>La resta de 10 y 4 es: ${resta}</p>`;
output9_3.innerHTML += `<p>El valor de PI es: ${piValor}</p>`;
console.log("9.3 Propiedades y métodos estáticos: Suma =", suma, "Resta =", resta, "PI =", piValor);


// TEMA: 9.4 Propiedades y métodos privados y protegidos — 23/10/2023
// Este bloque muestra el uso de convenciones para propiedades "protegidas" (con _) y propiedades/métodos privados (con #).
// Aprendí la diferencia entre las propiedades protegidas (por convención, accesibles pero no recomendadas) y privadas (verdaderamente encapsuladas).
class CuentaBancaria {
    #saldo; // Propiedad privada (ES2020+)
    _titular; // Propiedad "protegida" por convención

    constructor(titular, saldoInicial) {
        this._titular = titular;
        this.#saldo = saldoInicial;
    }

    #generarNumeroCuenta() { // Método privado
        return Math.floor(Math.random() * 1000000);
    }

    depositar(cantidad) {
        if (cantidad > 0) {
            this.#saldo += cantidad;
            console.log(`Depósito de ${cantidad}. Nuevo saldo: ${this.#saldo}`);
        }
    }

    retirar(cantidad) {
        if (cantidad > 0 && cantidad <= this.#saldo) {
            this.#saldo -= cantidad;
            console.log(`Retiro de ${cantidad}. Nuevo saldo: ${this.#saldo}`);
        } else {
            console.log("Fondos insuficientes o cantidad inválida.");
        }
    }

    getSaldo() {
        return this.#saldo;
    }

    getNumeroCuentaVisible() {
        // Un método público que puede usar el método privado
        return `Número de cuenta generado (interno): ${this.#generarNumeroCuenta()}`;
    }
}

const miCuenta = new CuentaBancaria("Juan Perez", 1000);
miCuenta.depositar(200);
miCuenta.retirar(500);

const output9_4 = document.getElementById('output-9-4');
output9_4.innerHTML += `<p>Titular: ${miCuenta._titular}</p>`;
output9_4.innerHTML += `<p>Saldo actual: ${miCuenta.getSaldo()}</p>`;
output9_4.innerHTML += `<p>${miCuenta.getNumeroCuentaVisible()}</p>`;
output9_4.innerHTML += `<p class="console-output">Ver la consola para los detalles de depósitos/retiros.</p>`;
console.log("9.4 Propiedades y métodos privados y protegidos: Titular =", miCuenta._titular, "Saldo =", miCuenta.getSaldo());
// Intentar acceder a miCuenta.#saldo o miCuenta.#generarNumeroCuenta() directamente fuera de la clase dará un error.


// TEMA: 9.5 Ampliación de clases integradas — 23/10/2023
// Este bloque muestra cómo extender una clase nativa de JavaScript, en este caso, Array.
// Aprendí que puedo añadir funcionalidades personalizadas a tipos de datos existentes, lo cual es útil para métodos utilitarios.
class MiArrayExtendido extends Array {
    sumarTodos() {
        return this.reduce((acc, current) => acc + current, 0);
    }

    obtenerPares() {
        return this.filter(num => num % 2 === 0);
    }
}

const numeros = new MiArrayExtendido(1, 2, 3, 4, 5, 6);
const sumaTotal = numeros.sumarTodos();
const pares = numeros.obtenerPares();

const output9_5 = document.getElementById('output-9-5');
output9_5.innerHTML += `<p>Array original: [${numeros.join(', ')}]</p>`;
output9_5.innerHTML += `<p>Suma de todos los elementos: ${sumaTotal}</p>`;
output9_5.innerHTML += `<p>Números pares: [${pares.join(', ')}]</p>`;
console.log("9.5 Ampliación de clases integradas: Suma =", sumaTotal, "Pares =", pares);


// TEMA: 9.6 Comprobación de clase: "instanceof" — 23/10/2023
// Este bloque utiliza el operador 'instanceof' para verificar si un objeto es una instancia de una clase o de una de sus clases ancestro.
// Aprendí que 'instanceof' es crucial para la verificación de tipos en herencia y polimorfismo, y que también funciona con la cadena de prototipos.
class Animal { }
class Perro extends Animal { }
class Gato extends Animal { }

const unPerro = new Perro();
const unGato = new Gato();
const unaPersona = new Persona("Laura", 40); // Reutilizamos la clase Persona de 9.1

const output9_6 = document.getElementById('output-9-6');
output9_6.innerHTML += `<p>unPerro instanceof Perro: ${unPerro instanceof Perro}</p>`; // true
output9_6.innerHTML += `<p>unPerro instanceof Animal: ${unPerro instanceof Animal}</p>`; // true
output9_6.innerHTML += `<p>unPerro instanceof Object: ${unPerro instanceof Object}</p>`; // true
output9_6.innerHTML += `<p>unGato instanceof Perro: ${unGato instanceof Perro}</p>`;   // false
output9_6.innerHTML += `<p>unaPersona instanceof Persona: ${unaPersona instanceof Persona}</p>`; // true
output9_6.innerHTML += `<p>unaPersona instanceof Estudiante: ${unaPersona instanceof Estudiante}</p>`; // false
console.log("9.6 Comprobación de clase: instanceof. Ver resultados en HTML.");


// TEMA: 9.7 Mixins — 23/10/2023
// Este bloque demuestra la implementación de mixins en JavaScript para añadir funcionalidades reutilizables a las clases.
// Aprendí que los mixins son una forma de lograr reutilización de código similar a la herencia múltiple, pero sin la complejidad de esta.
// Se usan para "mezclar" comportamientos en una clase.
let SaludarMixin = {
    decirHola() {
        console.log(`Hola, soy ${this.nombre}.`);
    },
    decirAdios() {
        console.log(`Adiós de parte de ${this.nombre}.`);
    }
};

class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

// Aplica el mixin a la clase Usuario
Object.assign(Usuario.prototype, SaludarMixin);

const usuario1 = new Usuario("Maria");
usuario1.decirHola();
usuario1.decirAdios();

const output9_7 = document.getElementById('output-9-7');
output9_7.innerHTML += `<p>Usuario: ${usuario1.nombre}</p>`;
output9_7.innerHTML += `<p class="console-output">Ver la consola para los saludos del mixin.</p>`;
console.log("9.7 Mixins: 'decirHola' y 'decirAdios' fueron añadidos a Usuario.prototype.");