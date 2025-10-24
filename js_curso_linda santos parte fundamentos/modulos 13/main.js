// Este archivo principal (main.js) demuestra el uso de módulos en JavaScript,
// incluyendo introducción, exportación/importación y carga dinámica.

// =========================================================================
// TEMA: 13.1 Módulos, introducción - 20/05/2024
// =========================================================================
// Este bloque introduce el concepto de módulos en JavaScript, que permiten
// dividir el código en archivos separados. Esto mejora la organización, la
// reutilización y ayuda a evitar colisiones de nombres de variables o funciones
// en el ámbito global.
//
// Aprendimos que para usar módulos, la etiqueta <script> en el HTML debe
// incluir el atributo `type="module"`. Esto activa el modo módulo, donde
// cada archivo es un módulo independiente con su propio ámbito (scope).
// Las variables y funciones declaradas dentro de un módulo no son accesibles
// desde fuera a menos que sean exportadas explícitamente.
//
// Para ver los resultados de este tema, se debe observar la consola del navegador (F12).

console.log("--- 13.1 Módulos, introducción ---");
console.log("Los módulos permiten organizar el código en archivos JavaScript separados.");
console.log("Cada módulo tiene su propio ámbito (scope) privado, evitando conflictos de nombres globales.");
console.log("Las variables y funciones solo son accesibles desde fuera si son exportadas.");
console.log("Para que un script actúe como módulo, su etiqueta <script> en HTML debe tener `type='module'`.");

// Ejemplo del ámbito de un módulo:
// Esta variable 'mensajeIntro' es local a este módulo (main.js).
// No se puede acceder a ella directamente desde otros módulos o scripts sin exportarla.
const mensajeIntro = "Esta variable 'mensajeIntro' es local al módulo main.js.";
console.log(mensajeIntro); // Se muestra porque estamos dentro del mismo módulo.

// Evidencia en el navegador:
// El mensaje "Los módulos permiten organizar..." y "Esta variable 'mensajeIntro'..."
// aparecerán en la consola del navegador.


// =========================================================================
// TEMA: 13.2 Exportación e importación - 20/05/2024
// =========================================================================
// Este bloque demuestra cómo compartir código entre módulos utilizando las
// palabras clave `export` e `import`.
//
// `export`: Se usa en un módulo para hacer que variables, funciones, clases, etc.,
// sean accesibles desde otros módulos. Puede haber exportaciones nombradas
// (varias por archivo) o una exportación por defecto (solo una por archivo).
//
// `import`: Se usa en un módulo para acceder a los elementos que han sido
// exportados por otro módulo.
//
// Para este ejemplo, estamos importando elementos desde `moduleA.js`.
//
// Para ver los resultados, observa la consola y el elemento `exportacion-importacion-output`
// en el HTML.

console.log("\n--- 13.2 Exportación e importación ---");

// -------------------------------------------------------------------------
// Importaciones nombradas:
// Se usan llaves {} para importar elementos específicos por su nombre exacto.
// Los nombres deben coincidir con los exportados en `moduleA.js`.
// -------------------------------------------------------------------------
import { nombreModuloA, saludarDesdeModuloA, contadorModuloA } from './moduleA.js';

// Usando la constante 'nombreModuloA' importada
console.log(`[Importado Nombrado] Constante: ${nombreModuloA}`);
document.getElementById('exportacion-importacion-output').innerHTML += `<p>Constante importada: ${nombreModuloA}</p>`;

// Usando la función 'saludarDesdeModuloA' importada
const saludoDesdeModulo = saludarDesdeModuloA("Invitado");
console.log(`[Importado Nombrado] Función: ${saludoDesdeModulo}`);
document.getElementById('exportacion-importacion-output').innerHTML += `<p>Función importada: ${saludoDesdeModulo}</p>`;

// Nota sobre variables importadas: Las importaciones de primitivos (como `contadorModuloA`
// en este caso) son copias, no referencias directas. Modificar `contadorModuloA` aquí
// no afectará la variable original en `moduleA.js`.
console.log(`[Importado Nombrado] Contador de ModuleA (copia): ${contadorModuloA}`);


// -------------------------------------------------------------------------
// Importación por defecto:
// Se importa sin llaves y se le puede dar cualquier nombre local.
// `moduleA.js` tiene una exportación por defecto de la clase `Producto`.
// -------------------------------------------------------------------------
import MiClaseProducto from './moduleA.js'; // 'MiClaseProducto' es el nombre local que le damos.

// Usando la clase importada por defecto para crear una instancia
const miProducto = new MiClaseProducto("Teclado Mecánico", 85);
console.log(`[Importado por Defecto] Clase: ${miProducto.getInfo()}`);
document.getElementById('exportacion-importacion-output').innerHTML += `<p>Clase importada (por defecto): ${miProducto.getInfo()}</p>`;

// Evidencia en el navegador:
// Los mensajes de consola y los párrafos añadidos al div 'exportacion-importacion-output'
// mostrarán los valores y resultados de las importaciones.


// =========================================================================
// TEMA: 13.3 Importaciones dinámicas - 20/05/2024
// =========================================================================
// Este bloque explora las importaciones dinámicas, una característica avanzada
// que permite cargar módulos en tiempo de ejecución. Esto significa que un módulo
// no se carga ni se parsea hasta que realmente se necesita, lo que es útil
// para optimizar el rendimiento de la aplicación (code splitting, lazy loading).
//
// Aprendimos que `import()` (como una función, no la declaración de import al inicio)
// devuelve una Promesa. Esta Promesa se resuelve con un objeto módulo que contiene
// todas las exportaciones del módulo cargado.
// Se usa principalmente para funcionalidades condicionales o que no son críticas
// en la carga inicial.
//
// Para este ejemplo, un módulo (`dynamicModule.js`) se cargará solo cuando el
// usuario haga clic en un botón.
//
// Para ver los resultados, haz clic en el botón en el HTML y observa la consola
// y el elemento `importaciones-dinamicas-output`.

console.log("\n--- 13.3 Importaciones dinámicas ---");

const cargarModuloBtn = document.getElementById('cargarModuloBtn');
const dynamicOutput = document.getElementById('importaciones-dinamicas-output');

// Se añade un 'EventListener' al botón para manejar el clic del usuario.
cargarModuloBtn.addEventListener('click', async () => {
    dynamicOutput.innerHTML = "Cargando módulo dinámicamente...";
    console.log("Intentando cargar 'dynamicModule.js'...");

    try {
        // La función `import()` devuelve una Promesa. Usamos `await` para esperar a que se resuelva.
        // La ruta al módulo debe ser relativa a `main.js`.
        const moduloDinamico = await import('./dynamicModule.js');

        // Una vez que la Promesa se resuelve, `moduloDinamico` es un objeto
        // que contiene todas las exportaciones del archivo `dynamicModule.js`.
        // Las exportaciones nombradas son propiedades de este objeto.
        // La exportación por defecto se accede a través de la propiedad `.default`.

        dynamicOutput.innerHTML = `Módulo dinámico cargado exitosamente!<br>`;
        dynamicOutput.innerHTML += `Mensaje desde módulo dinámico: <strong>${moduloDinamico.mensajeDinamico}</strong><br>`;
        dynamicOutput.innerHTML += `Resultado de sumar (5, 3) desde módulo dinámico: <strong>${moduloDinamico.sumar(5, 3)}</strong><br>`;

        // Si el módulo dinámico tiene una exportación por defecto
        if (moduloDinamico.default) {
            const instanciaDinamica = new moduloDinamico.default("Gadget Secreto");
            dynamicOutput.innerHTML += `Instancia de clase dinámica: <strong>${instanciaDinamica.obtenerNombre()}</strong>`;
        }

        console.log("Módulo dinámico cargado y ejecutado. Contenido:", moduloDinamico);

    } catch (error) {
        // Si hay un error durante la carga del módulo (ej. archivo no encontrado, error de sintaxis)
        dynamicOutput.innerHTML = `<span style="color: red;">Error al cargar el módulo dinámico: ${error.message}</span>`;
        console.error("Hubo un error al cargar el módulo dinámico:", error);
    }
});

// Evidencia en el navegador:
// Inicialmente, no hay nada en el div 'importaciones-dinamicas-output'.
// Al hacer clic en el botón, el contenido del div se actualizará con los resultados
// de la carga y ejecución del módulo dinámico. También se mostrarán mensajes en la consola.