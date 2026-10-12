---
title: "Spells"
description: "Los tipos de defecto que lanza kalku, qué simula cada uno y qué forma toman en cada lenguaje."
---

Un **spell** (o *kalkutun*, el daño que obra un kalku) es un tipo de defecto. Cada wekufe es tu programa con exactamente un spell lanzado en un lugar.

El binario los documenta:

```sh
kalku info spells
```

## El catálogo

Estos seis son los que lanza una corrida si no dices otra cosa, en orden de valor diagnóstico:

| Spell | Qué hace | Defecto que simula | La pista cuando sobrevive |
|---|---|---|---|
| `arm` | Borra una cláusula de un `case`, un `cond` o una función de varias cabezas | Un caso que deja de manejarse | *No test fails without this clause. Assert what only it returns, in a case that takes it.* |
| `compare` | Corre una comparación a través de su frontera: `>=` a `>`, `<` a `<=` | Un error por uno en una condición | *No test tells this comparison apart from a shifted one. Add a case at the boundary where the two sides are equal.* |
| `connect` | Cambia `and` por `or`, y al revés | Una condición que nunca o siempre se cumple | *No test has exactly one side of this condition true. Add a case for each side on its own.* |
| `negate` | Invierte una condición | Una guarda invertida | *No test tells the two branches of this condition apart. Assert what only one of them does.* |
| `literal` | Perturba un literal: un número, un string, un booleano | Una semilla o un caso base equivocados | *No test depends on this exact value.* |
| `call` | Elimina una llamada, dejando su argumento o nada | Un paso que en silencio no hace nada | *No test observes what this call does. Assert what it returns or what it changes.* |

Las pistas salen de una plantilla fija por spell, rellenada con el site. No las genera un modelo: son deterministas y honestas sobre lo que kalku sabe de verdad.

Con `spells` en [`.kalku.toml`](../configuration/) eliges cuáles se lanzan.

## Otros spells que el binario nombra

`kalku info spells` lista tres más, fuera del conjunto por defecto:

| Spell | Qué hace |
|---|---|
| `await` | Le quita el plazo a una espera, o la espera a una llamada |
| `supervise` | Cambia lo que pasa cuando un proceso muere: el reinicio, el enlace, el atrapar la salida |
| `foreign` | Lo que haya hecho el operador de un framework existente; el spell de un driver |

`await` y `supervise` son los spells de concurrencia. El [documento de diseño](https://github.com/lnds/kalku/blob/main/docs/design.md) explica sus reglas: un cuelgue no es un kill, un kill inestable no es evidencia, y se piden por nombre.

## En cada lenguaje

Los sites vienen siempre del parser propio del lenguaje, nunca de recorrer el texto. Y nunca se proponen dentro de tests, comentarios o documentación.

### Elixir

| Spell | Formas |
|---|---|
| `arm` | Borra una cláusula de `case`, `cond`, `with … else`, `receive` o de una función de varias cláusulas |
| `compare` | `>=`→`>`, `<`→`<=`, `==`→`!=`, en expresiones y en guardas `when` |
| `connect` | `and`↔`or`, `&&`↔`\|\|` |
| `negate` | `if`↔`unless`, `c` → `not c` en condiciones |
| `literal` | `0`→`1`, `n`→`n+1`, `true`↔`false`, `:ok`↔`:error`, `""` por un string no vacío |
| `call` | Quita una etapa de un pipe (`\|> f()`), `f(x)` → `x` |

### Rust

| Spell | Formas |
|---|---|
| `arm` | Borra un brazo de un `match`, solo cuando queda un comodín: sin él, quien rechaza el wekufe es el compilador y no un test |
| `compare` | `>=`↔`>`, `<`↔`<=`, `==`↔`!=`, en expresiones y en guardas de `match` |
| `connect` | `&&`↔`\|\|`, salvo en una cadena de `let` |
| `negate` | `if c` → `if !(c)`, y quitar un `!` |
| `literal` | `n`→`n+1` para decimales simples dentro del rango de su tipo, `true`↔`false`, un string no vacío → `""` |

`call` no se ofrece en Rust: quitar una llamada casi nunca conserva los tipos, así que propondría errores de compilación y poco más.

### Python

| Spell | Formas |
|---|---|
| `arm` | Borra un `case` de un `match`, completo |
| `compare` | `>=`↔`>`, `<=`↔`<`, `==`↔`!=`, `is`↔`is not`, `in`↔`not in` |
| `connect` | `and`↔`or`, un operador a la vez en una cadena |
| `negate` | `not x` pasa a `x`, y una condición `c` pasa a `not (c)` (`if`, `elif`, `while`, una expresión condicional) |
| `literal` | `n`→`n+1` para decimales simples, `True`↔`False`, un string no vacío → `""` |
| `call` | Una llamada que es una sentencia completa, con `await` o sin él, pasa a `pass` |

### Java

| Spell | Formas |
|---|---|
| `arm` | Borra un `case` de un `switch`, sentencia o expresión, solo mientras quede un `default` |
| `compare` | `>=`↔`>`, `<=`↔`<`, `==`↔`!=` |
| `connect` | `&&`↔`\|\|` |
| `negate` | Se quita un `!`, y la condición `c` de un `if` pasa a `!(c)` |
| `literal` | `n`→`n+1` para literales decimales `int` y `long` dentro del rango de su tipo, `true`↔`false`, un string o bloque de texto no vacío → `""` |
| `call` | Una llamada que es una sentencia completa pasa a la sentencia vacía `;` |
