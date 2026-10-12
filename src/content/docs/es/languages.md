---
title: "Lenguajes"
description: "Los lenguajes que kalku mide hoy y cómo trabaja el kalku de cada uno."
---

kalku mide proyectos en Elixir, Rust, Python, Java y kaikai. Cada lenguaje tiene su propio **kalku**: un worker que sabe romper código en ese lenguaje y nada más.

| Lenguaje | kalku | Cómo |
|---|---|---|
| Elixir | nativo | kalku es dueño del ciclo: nodos BEAM calientes, carga en memoria, selección de tests por cobertura |
| kaikai | nativo (delgado) | Construido sobre `kai mutate`; así es como kalku se prueba a sí mismo |
| Rust | nativo | Los sites vienen de `syn`, el parser propio de Rust; **solo la edición 2024** (Rust 1.85 o posterior). Encuentra sites y los lanza, responde `abort` en el lugar, y selecciona tests por cobertura donde están las herramientas de LLVM |
| Python | nativo | Los sites vienen de `ast` y `tokenize`, el parser propio de Python; corre en el **intérprete del propio proyecto** (3.12 o posterior) solo con la biblioteca estándar. Cada corrida de la suite es un hijo creado con fork, así que `abort` es un kill y un wekufe nunca se filtra; la cobertura por test viene de `sys.monitoring`; se conservan las opciones de pytest del proyecto |
| Java | nativo | Los sites vienen de `javac`, el compilador del propio proyecto, a través de su API pública de árboles; corre en el **JDK del propio proyecto** (11 o posterior) sin dependencias. Construye el proyecto con Maven en el reni, compila cada wekufe en memoria y corre los tests en una JVM propia: JUnit 5 o posterior, JUnit 4 o TestNG. Maven o Gradle, uno o varios módulos |
| otros | driver | Envuelve un framework existente (Stryker, …), normaliza sus resultados y recalcula el puntaje. Todavía no está implementado |

## Lo que tienen en común

- **Los sites vienen del parser propio del lenguaje**, nunca de expresiones regulares ni de recorrer el texto.
- **Corren con las herramientas del propio proyecto:** su Elixir, su intérprete de Python, su JDK. kalku nunca elige qué versión de algo recibe el proyecto.
- **La cobertura por test** decide contra qué tests se lanza un wekufe, en Elixir, Rust, Python y Java.

## Notas por lenguaje

- **Elixir.** El kalku corre dentro del proyecto que mide. Por ahora usa un solo worker por proyecto, porque hay una sola ruta de build.
- **Rust.** La cobertura por test necesita las herramientas de LLVM (el componente `llvm-tools` de rustup). Sin ellas, cada cast corre la suite completa. Un paquete en una edición anterior a la 2024 se salta, y se dice por qué.
- **Python.** Necesita Python 3.12 o posterior, por `sys.monitoring`. Usa el entorno activo, luego `.venv` o `venv`, luego `python3`.
- **Java.** Java 8 no está soportado. Un JUnit 4 anterior a 4.12 se rechaza por su versión.
- **kaikai.** No reporta cobertura por test ni tiene un runtime caliente en el que recargar, así que cada wekufe reconstruye el paquete y corre la suite completa.

Qué spells ofrece cada lenguaje, y con qué formas, está en [Spells](../spells/).
