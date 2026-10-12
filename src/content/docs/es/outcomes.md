---
title: "Resultados y puntaje"
description: "En qué puede terminar un cast, cuáles resultados entran al puntaje y cuáles se reportan aparte."
---

Un cast puede terminar de ocho maneras. Solo dos mueven el puntaje.

```sh
kalku info outcomes
```

| Resultado | Qué significa | En el puntaje |
|---|---|---|
| `killed` | Un test notó el defecto | Cuenta |
| `survived` | Corrieron todos los tests que alcanzan la línea, y ninguno lo notó | Cuenta |
| `timeout` | El wekufe pasó su plazo; un ciclo infinito no es un assert que falla | Se reporta aparte |
| `no_coverage` | Ningún test ejecuta el código donde está el wekufe, así que nada lo juzgó | Se reporta aparte |
| `compile_error` | El wekufe no compila, así que no dice nada sobre la suite | Se reporta aparte |
| `crashed` | El cast no produjo un veredicto: el kalku murió, no pudo correr sus tests, o el wekufe tomó más memoria que su techo | Se reporta aparte |
| `nondeterministic` | Se lanzó varias veces y no estuvo de acuerdo consigo mismo; un resultado en el que nadie debería confiar | Se reporta aparte |
| `equivalent` | El wekufe no se puede distinguir del original | Se reporta aparte |

## El puntaje

```
puntaje = killed / (killed + survived)
```

Y nada más. Los timeouts, las caídas y la cobertura faltante se muestran al lado del puntaje, nunca dentro de él: un ciclo infinito no es un assert que falla, y fingir que lo es infla el número.

```
score 60% · 3 killed · 2 survived · 1 compile error
```

## Qué cuenta como kill

- Un test solo cuenta como que mató a un wekufe si **pasa en el código original**. Un test que falla en ambos es un test roto, no un kill.
- Un timeout **nunca** cuenta como kill.
- Un site que ningún test alcanza es `no_coverage`, no un sobreviviente ni un kill.

## Un sobreviviente es un hoyo

Un wekufe que sobrevive es un hoyo en la suite, con un archivo, una línea y un diff. La respuesta habitual es escribir el test que falta. Cuando el wekufe de verdad no se puede distinguir del original, se declara como [mutante equivalente](../equivalents/), con una razón escrita.
